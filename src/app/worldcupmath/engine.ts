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

/**
 * Addition inside [minAddend, maxSum] that usually crosses a tens
 * boundary (a carry), e.g. 47 + 35.
 */
function carryAdd(minAddend: number, maxSum: number): Problem {
  let a = ri(minAddend, maxSum - minAddend);
  let b = ri(minAddend, maxSum - a);
  for (let i = 0; i < 60; i++) {
    a = ri(minAddend, maxSum - minAddend);
    b = ri(minAddend, maxSum - a);
    if ((a % 10) + (b % 10) >= 10) break; // force the carry
  }
  const ans = a + b;
  // forgetting the carry is the classic mistake → ans − 10
  return {
    text: `${a} + ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [ans - 10, ans + 10, ans - 1, ans + 1, ans - 100]),
  };
}

/**
 * Subtraction inside [minResult-ish, maxMinuend] that usually needs
 * borrowing across tens, e.g. 56 − 18.
 */
function borrowSub(minSubtrahend: number, maxMinuend: number): Problem {
  let a = ri(minSubtrahend * 2, maxMinuend);
  let b = ri(minSubtrahend, a - 4);
  for (let i = 0; i < 60; i++) {
    a = ri(minSubtrahend * 2, maxMinuend);
    b = ri(minSubtrahend, a - 4);
    if (a % 10 < b % 10) break; // force the borrow
  }
  const ans = a - b;
  // classic mistake: subtracting the smaller digit from the larger in
  // every column instead of borrowing (56 − 18 → "42")
  const columnError =
    Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) * 10 +
    Math.abs((a % 10) - (b % 10));
  return {
    text: `${a} − ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [columnError, ans + 10, ans - 10, ans + 1, ans - 1]),
  };
}

// Level 1 — add & subtract within 100, crossing tens (e.g. 56 − 18)
function genLevel1(): Problem {
  return Math.random() < 0.5 ? carryAdd(12, 100) : borrowSub(13, 99);
}

// Level 2 — add & subtract within 200
function genLevel2(): Problem {
  return Math.random() < 0.5 ? carryAdd(25, 200) : borrowSub(24, 199);
}

// Level 3 — three-number chains, e.g. 19 + 6 − 11
function genLevel3(): Problem {
  const a = ri(15, 99);
  const b = ri(6, 45);
  const c = ri(6, 45);
  // wrong = getting the last sign backwards, the classic chain mistake
  const variants = [
    { text: `${a} + ${b} − ${c}`, ans: a + b - c, startsWithSub: false },
    { text: `${a} + ${b} + ${c}`, ans: a + b + c, startsWithSub: false },
    { text: `${a} − ${b} + ${c}`, ans: a - b + c, startsWithSub: true },
    { text: `${a} − ${b} − ${c}`, ans: a - b - c, startsWithSub: true },
  ];
  // keep every running total non-negative (kids solve left to right)
  const ok = variants.filter((v) => v.ans >= 0 && (!v.startsWithSub || a - b >= 0));
  const v = ok[Math.floor(Math.random() * ok.length)];
  const wrong = v.text.endsWith(`+ ${c}`) ? v.ans - 2 * c : v.ans + 2 * c;
  return {
    text: `${v.text} = ?`,
    answer: v.ans,
    choices: makeChoices(v.ans, [wrong, v.ans + 10, v.ans - 10, v.ans + 1, v.ans - 1]),
  };
}

// Level 4 — times tables to 12
function genLevel4(): Problem {
  const a = ri(2, 12);
  const b = ri(2, 12);
  const ans = a * b;
  return {
    text: `${a} × ${b} = ?`,
    answer: ans,
    choices: makeChoices(ans, [(a + 1) * b, (a - 1) * b, a * (b + 1), a * (b - 1), a + b]),
  };
}

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "rookie",
    label: "Rookie",
    tagline: "Add & subtract to 100 — like 56 − 18",
    icon: "⚽",
    questionTime: 15,
    counterChance: 0,
    gen: genLevel1,
  },
  {
    id: "pro",
    label: "Pro",
    tagline: "Bigger sums & differences to 200",
    icon: "🥈",
    questionTime: 14,
    counterChance: 0.2,
    gen: genLevel2,
  },
  {
    id: "worldclass",
    label: "World Class",
    tagline: "Three-number chains — like 19 + 6 − 11",
    icon: "🥇",
    questionTime: 20,
    counterChance: 0.35,
    gen: genLevel3,
  },
  {
    id: "legend",
    label: "Legend",
    tagline: "Times tables to 12",
    icon: "🏆",
    questionTime: 10,
    counterChance: 0.5,
    gen: genLevel4,
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
