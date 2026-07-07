// World Cup Math — core game logic: math problem generation, difficulty
// tuning, the character roster, and local persistence. No React in here.

export type Screen = "menu" | "locker" | "match" | "results";

export interface Problem {
  text: string;
  answer: number;
  choices: number[]; // 4 options, shuffled, includes answer
}

export interface Difficulty {
  id: "rookie" | "pro" | "worldclass" | "legend";
  label: string;
  tagline: string;
  icon: string;
  questionTime: number; // seconds allowed per question
  counterChance: number; // chance a miss becomes a 2-zone counterattack
  gen: () => Problem;
}

export type HairStyle = "fringe" | "long" | "bun" | "curly" | "spiky" | "short";

export interface PlayerDef {
  id: string;
  name: string;
  flag: string;
  role: string;
  skin: string;
  hairStyle: HairStyle;
  hairColor: string;
  beanie?: string; // beanie color — drawn over hair when present
  jacket: string;
  jacketTrim: string;
  pants: string;
  accessory?: "ball" | "tablet";
}

export interface MatchSummary {
  goalsFor: number;
  goalsAgainst: number;
  correct: number;
  wrong: number;
  bestStreak: number;
  fastest: number | null; // seconds, fastest correct answer
}

export interface MatchRecord {
  name: string;
  flag: string;
  difficulty: string;
  points: number;
  score: string; // "3 - 1"
  accuracy: number; // 0..100
  date: number;
}

// ---------------------------------------------------------------- helpers

const ri = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build 4 unique choices from an answer plus plausible distractors. */
function makeChoices(answer: number, candidates: number[]): number[] {
  const set = new Set<number>();
  for (const c of shuffle(candidates)) {
    if (set.size >= 3) break;
    if (Number.isInteger(c) && c >= 0 && c !== answer) set.add(c);
  }
  let guard = 0;
  while (set.size < 3 && guard++ < 50) {
    const c = answer + (Math.random() < 0.5 ? -1 : 1) * ri(1, 4 + guard);
    if (c >= 0 && c !== answer) set.add(c);
  }
  return shuffle([answer, ...set]);
}

// ------------------------------------------------------------- generators

function genRookie(): Problem {
  if (Math.random() < 0.55) {
    const a = ri(2, 10);
    const b = ri(1, 10);
    const ans = a + b;
    return {
      text: `${a} + ${b} = ?`,
      answer: ans,
      choices: makeChoices(ans, [ans - 1, ans + 1, ans + 2, ans - 2, ans + 10]),
    };
  }
  const b = ri(1, 9);
  const a = b + ri(1, 10);
  const ans = a - b;
  return {
    text: `${a} − ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [ans + 1, ans - 1, ans + 2, a + b, ans - 2]),
  };
}

function genPro(): Problem {
  const kind = Math.random();
  if (kind < 0.35) {
    const a = ri(11, 60);
    const b = ri(11, 39);
    const ans = a + b;
    return {
      text: `${a} + ${b} = ?`,
      answer: ans,
      choices: makeChoices(ans, [ans - 10, ans + 10, ans - 1, ans + 1, ans + 2]),
    };
  }
  if (kind < 0.65) {
    const b = ri(11, 45);
    const a = b + ri(5, 50);
    const ans = a - b;
    return {
      text: `${a} − ${b} = ?`,
      answer: ans,
      choices: makeChoices(ans, [ans + 10, ans - 10, ans + 1, ans - 1, ans + 2]),
    };
  }
  const a = ri(2, 6);
  const b = ri(2, 9);
  const ans = a * b;
  return {
    text: `${a} × ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [(a + 1) * b, (a - 1) * b, a * (b + 1), a + b, ans + 2]),
  };
}

function genWorldClass(): Problem {
  const kind = Math.random();
  if (kind < 0.5) {
    const a = ri(3, 12);
    const b = ri(3, 12);
    const ans = a * b;
    return {
      text: `${a} × ${b} = ?`,
      answer: ans,
      choices: makeChoices(ans, [(a + 1) * b, (a - 1) * b, a * (b + 1), a * (b - 1), ans + 4]),
    };
  }
  if (kind < 0.8) {
    const b = ri(3, 12);
    const q = ri(3, 12);
    const a = b * q;
    return {
      text: `${a} ÷ ${b} = ?`,
      answer: q,
      choices: makeChoices(q, [q + 1, q - 1, q + 2, b, q - 2]),
    };
  }
  const a = ri(45, 160);
  const b = ri(18, 90);
  const ans = a + b;
  return {
    text: `${a} + ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [ans - 10, ans + 10, ans - 1, ans + 1, ans - 100]),
  };
}

function genLegend(): Problem {
  const kind = Math.random();
  if (kind < 0.4) {
    // two-step: a × b ± c
    const a = ri(3, 12);
    const b = ri(3, 9);
    const c = ri(2, 15);
    const plus = Math.random() < 0.5;
    const ans = plus ? a * b + c : Math.max(0, a * b - c);
    return {
      text: `${a} × ${b} ${plus ? "+" : "−"} ${c} = ?`,
      answer: ans,
      choices: makeChoices(ans, [ans + 1, ans - 1, ans + 10, ans - 10, a * b]),
    };
  }
  if (kind < 0.7) {
    // missing factor
    const a = ri(3, 12);
    const b = ri(3, 12);
    return {
      text: `${a} × ? = ${a * b}`,
      answer: b,
      choices: makeChoices(b, [b + 1, b - 1, b + 2, a, b - 2]),
    };
  }
  const b = ri(4, 12);
  const q = ri(6, 15);
  const a = b * q;
  return {
    text: `${a} ÷ ${b} = ?`,
    answer: q,
    choices: makeChoices(q, [q + 1, q - 1, q + 2, q - 2, b]),
  };
}

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "rookie",
    label: "Rookie",
    tagline: "Add & subtract to 20",
    icon: "⚽",
    questionTime: 15,
    counterChance: 0,
    gen: genRookie,
  },
  {
    id: "pro",
    label: "Pro",
    tagline: "Bigger sums & early times tables",
    icon: "🥈",
    questionTime: 12,
    counterChance: 0.2,
    gen: genPro,
  },
  {
    id: "worldclass",
    label: "World Class",
    tagline: "Times tables to 12 & division",
    icon: "🥇",
    questionTime: 10,
    counterChance: 0.35,
    gen: genWorldClass,
  },
  {
    id: "legend",
    label: "Legend",
    tagline: "Two-step & missing numbers",
    icon: "🏆",
    questionTime: 10,
    counterChance: 0.5,
    gen: genLegend,
  },
];

// ----------------------------------------------------------------- roster

// All 32 nations of the classic World Cup line-up, plus India and China.
// Kit colors follow each national team; names are common kids' names from
// each country.
export const ROSTER: PlayerDef[] = [
  {
    id: "mia", name: "Mia", flag: "🇺🇸", role: "The Playmaker",
    skin: "#f6cfae", hairStyle: "long", hairColor: "#2d2320",
    beanie: "#8e5bd6", jacket: "#efe6d2", jacketTrim: "#d9c9a8",
    pants: "#4a6584", accessory: "ball",
  },
  {
    id: "leo", name: "Leo", flag: "🇧🇷", role: "The Striker",
    skin: "#f3c39a", hairStyle: "fringe", hairColor: "#7a4a21",
    beanie: "#7fb6dd", jacket: "#f5cf3d", jacketTrim: "#2f9e58",
    pants: "#2b4c9b",
  },
  {
    id: "zoe", name: "Zoe", flag: "🇯🇵", role: "The Strategist",
    skin: "#f6cfae", hairStyle: "long", hairColor: "#1d1a1e",
    jacket: "#3057c0", jacketTrim: "#dfe7f7", pants: "#1d2438",
    accessory: "tablet",
  },
  {
    id: "sofi", name: "Sofi", flag: "🇦🇷", role: "The Maestro",
    skin: "#f6cfae", hairStyle: "long", hairColor: "#6b4a2f",
    jacket: "#9ecfec", jacketTrim: "#f3f7fa", pants: "#23272e",
  },
  {
    id: "kai", name: "Kai", flag: "🇫🇷", role: "The Rocket",
    skin: "#e8b48c", hairStyle: "spiky", hairColor: "#23201f",
    jacket: "#2c4a8c", jacketTrim: "#d94f4f", pants: "#2e3440",
  },
  {
    id: "ava", name: "Ava", flag: "🇩🇪", role: "The Captain",
    skin: "#f9d9b8", hairStyle: "bun", hairColor: "#d9a441",
    jacket: "#eef0f2", jacketTrim: "#2b2b2b", pants: "#3a3a42",
  },
  {
    id: "rio", name: "Rio", flag: "🇪🇸", role: "The Magician",
    skin: "#d9a06b", hairStyle: "curly", hairColor: "#3a2a1d",
    jacket: "#d94040", jacketTrim: "#f2c53c", pants: "#41372e",
  },
  {
    id: "oli", name: "Oli", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", role: "The Engine",
    skin: "#fadcc0", hairStyle: "short", hairColor: "#c0622f",
    jacket: "#eef0f2", jacketTrim: "#c94a4a", pants: "#3a4756",
  },
  {
    id: "cris", name: "Cris", flag: "🇵🇹", role: "The Ace",
    skin: "#e8b48c", hairStyle: "short", hairColor: "#2b2118",
    jacket: "#a63232", jacketTrim: "#2f7a4d", pants: "#1d3a2a",
  },
  {
    id: "daan", name: "Daan", flag: "🇳🇱", role: "The Tornado",
    skin: "#fadcc0", hairStyle: "spiky", hairColor: "#d98e3a",
    jacket: "#e8863a", jacketTrim: "#f5f5f5", pants: "#2b3a55",
  },
  {
    id: "noa", name: "Noa", flag: "🇧🇪", role: "The Dynamo",
    skin: "#f6cfae", hairStyle: "curly", hairColor: "#3a2a1d",
    jacket: "#c93b3b", jacketTrim: "#f2c53c", pants: "#26262c",
  },
  {
    id: "ivana", name: "Ivana", flag: "🇭🇷", role: "The Comet",
    skin: "#f9d9b8", hairStyle: "bun", hairColor: "#8a5a2d",
    jacket: "#f2f2f4", jacketTrim: "#d94040", pants: "#38445a",
  },
  {
    id: "lena", name: "Lena", flag: "🇨🇭", role: "The Rock",
    skin: "#fadcc0", hairStyle: "long", hairColor: "#d9a441",
    jacket: "#e04545", jacketTrim: "#f5f5f5", pants: "#2e3440",
  },
  {
    id: "freja", name: "Freja", flag: "🇩🇰", role: "The Viking",
    skin: "#fadcc0", hairStyle: "long", hairColor: "#f0d9a8",
    jacket: "#b83232", jacketTrim: "#f5f5f5", pants: "#3a4149",
  },
  {
    id: "kuba", name: "Kuba", flag: "🇵🇱", role: "The Eagle",
    skin: "#f9d9b8", hairStyle: "short", hairColor: "#caa050",
    jacket: "#f2f2f4", jacketTrim: "#d94040", pants: "#b83232",
  },
  {
    id: "luka", name: "Luka", flag: "🇷🇸", role: "The Falcon",
    skin: "#f6cfae", hairStyle: "short", hairColor: "#2b2118",
    jacket: "#b83232", jacketTrim: "#2c4a8c", pants: "#2c4a8c",
  },
  {
    id: "gwen", name: "Gwen", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", role: "The Dragon",
    skin: "#fadcc0", hairStyle: "curly", hairColor: "#b5432a",
    jacket: "#c93b3b", jacketTrim: "#f5f5f5", pants: "#2b3a2f",
  },
  {
    id: "diego", name: "Diego", flag: "🇲🇽", role: "The Wizard",
    skin: "#d9a06b", hairStyle: "fringe", hairColor: "#2b2118",
    jacket: "#2f7a4d", jacketTrim: "#f5f5f5", pants: "#3a4756",
  },
  {
    id: "liam", name: "Liam", flag: "🇨🇦", role: "The Blizzard",
    skin: "#f6cfae", hairStyle: "fringe", hairColor: "#6b4a2f",
    beanie: "#d94040", jacket: "#d94040", jacketTrim: "#f5f5f5",
    pants: "#2e3440",
  },
  {
    id: "mateo", name: "Mateo", flag: "🇨🇷", role: "The Volcano",
    skin: "#e8b48c", hairStyle: "curly", hairColor: "#2b2118",
    jacket: "#d94040", jacketTrim: "#f5f5f5", pants: "#2c4a8c",
  },
  {
    id: "vale", name: "Vale", flag: "🇪🇨", role: "The Spark",
    skin: "#d9a06b", hairStyle: "long", hairColor: "#2b2118",
    jacket: "#f2c53c", jacketTrim: "#2c4a8c", pants: "#2c4a8c",
  },
  {
    id: "facu", name: "Facu", flag: "🇺🇾", role: "The Brave",
    skin: "#e8b48c", hairStyle: "short", hairColor: "#3a2a1d",
    jacket: "#8ec3e6", jacketTrim: "#f5f5f5", pants: "#26262c",
  },
  {
    id: "minji", name: "Minji", flag: "🇰🇷", role: "The Tiger",
    skin: "#f9d9b8", hairStyle: "bun", hairColor: "#1d1a1e",
    jacket: "#d94040", jacketTrim: "#26262c", pants: "#26262c",
  },
  {
    id: "arya", name: "Arya", flag: "🇮🇷", role: "The Cheetah",
    skin: "#e8b48c", hairStyle: "short", hairColor: "#1d1a1e",
    jacket: "#f2f2f4", jacketTrim: "#2f7a4d", pants: "#2e3a33",
  },
  {
    id: "faisal", name: "Faisal", flag: "🇸🇦", role: "The Fox",
    skin: "#d9a06b", hairStyle: "short", hairColor: "#1d1a1e",
    jacket: "#2f8a4d", jacketTrim: "#f5f5f5", pants: "#e8e8ec",
  },
  {
    id: "hamad", name: "Hamad", flag: "🇶🇦", role: "The Pearl",
    skin: "#c98a5a", hairStyle: "curly", hairColor: "#1d1a1e",
    jacket: "#7a2938", jacketTrim: "#f5f5f5", pants: "#2e3440",
  },
  {
    id: "ruby", name: "Ruby", flag: "🇦🇺", role: "The Roo",
    skin: "#fadcc0", hairStyle: "long", hairColor: "#d98e3a",
    jacket: "#f2c53c", jacketTrim: "#2f7a4d", pants: "#2f7a4d",
  },
  {
    id: "nina", name: "Nina", flag: "🇸🇳", role: "The Guardian",
    skin: "#a76a3f", hairStyle: "curly", hairColor: "#171310",
    jacket: "#f0f3f0", jacketTrim: "#2f9e58", pants: "#2c3542",
  },
  {
    id: "yasmin", name: "Yasmin", flag: "🇲🇦", role: "The Atlas",
    skin: "#d9a06b", hairStyle: "curly", hairColor: "#2b2118",
    jacket: "#c93b3b", jacketTrim: "#2f7a4d", pants: "#24513a",
  },
  {
    id: "youssef", name: "Youssef", flag: "🇹🇳", role: "The Jet",
    skin: "#e8b48c", hairStyle: "short", hairColor: "#2b2118",
    jacket: "#f2f2f4", jacketTrim: "#d94040", pants: "#b83232",
  },
  {
    id: "samuel", name: "Samuel", flag: "🇨🇲", role: "The Lion",
    skin: "#8a5430", hairStyle: "short", hairColor: "#171310",
    jacket: "#2f7a4d", jacketTrim: "#d94040", pants: "#b8932a",
  },
  {
    id: "kofi", name: "Kofi", flag: "🇬🇭", role: "The Star",
    skin: "#8a5430", hairStyle: "curly", hairColor: "#171310",
    jacket: "#f2f2f4", jacketTrim: "#26262c", pants: "#26262c",
  },
  {
    id: "aarav", name: "Aarav", flag: "🇮🇳", role: "The Genius",
    skin: "#c98a5a", hairStyle: "fringe", hairColor: "#1d1a1e",
    jacket: "#2e6bd6", jacketTrim: "#f2932c", pants: "#26324a",
    accessory: "tablet",
  },
  {
    id: "harper", name: "Harper", flag: "🇨🇳", role: "The Great Wall",
    skin: "#f9d9b8", hairStyle: "long", hairColor: "#1d1a1e",
    jacket: "#d94040", jacketTrim: "#f2c53c", pants: "#26262c",
    accessory: "ball",
  },
  {
    id: "naomi", name: "Naomi", flag: "🇨🇳", role: "The Firecracker",
    skin: "#f9d9b8", hairStyle: "bun", hairColor: "#1d1a1e",
    jacket: "#f2c53c", jacketTrim: "#d94040", pants: "#26262c",
  },
  {
    id: "lina", name: "Lina", flag: "🇨🇳", role: "The Panda",
    skin: "#f9d9b8", hairStyle: "curly", hairColor: "#1d1a1e",
    jacket: "#f2f2f4", jacketTrim: "#26262c", pants: "#26262c",
    accessory: "tablet",
  },
];

// ------------------------------------------------------------ match rules

export const MATCH_SECONDS = 90; // 1 real second = 1 match minute
export const START_ZONE = 2; // midfield
export const GOAL_ZONE = 4; // reach it → you score
export const OWN_ZONE = 0; // pushed here → opponent scores
export const HOT_STREAK = 3; // streak length that doubles your advance

export function computePoints(s: MatchSummary): number {
  const total = s.correct + s.wrong;
  const accuracy = total > 0 ? s.correct / total : 0;
  const win = s.goalsFor > s.goalsAgainst;
  const draw = s.goalsFor === s.goalsAgainst;
  return (
    s.goalsFor * 100 +
    s.correct * 10 +
    s.bestStreak * 5 +
    Math.round(accuracy * 50) +
    (win ? 150 : draw ? 50 : 0)
  );
}

export function computeStars(s: MatchSummary): number {
  const total = s.correct + s.wrong;
  const accuracy = total > 0 ? s.correct / total : 0;
  let stars = 0;
  if (s.goalsFor > s.goalsAgainst) stars++;
  if (accuracy >= 0.7) stars++;
  if (accuracy >= 0.9 && s.bestStreak >= HOT_STREAK) stars++;
  return stars;
}

// ------------------------------------------------------------ persistence

const STORE_KEY = "wcm-records-v1";

export function loadRecords(): MatchRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as MatchRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRecord(rec: MatchRecord): MatchRecord[] {
  const all = [...loadRecords(), rec]
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    // storage unavailable (private mode etc.) — leaderboard just won't persist
  }
  return all;
}
