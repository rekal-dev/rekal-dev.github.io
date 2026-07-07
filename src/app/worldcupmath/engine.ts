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
    beanie: "#7fb6dd", jacket: "#a8cbe8", jacketTrim: "#7fa8cc",
    pants: "#333a45",
  },
  {
    id: "zoe", name: "Zoe", flag: "🇯🇵", role: "The Strategist",
    skin: "#f6cfae", hairStyle: "long", hairColor: "#1d1a1e",
    jacket: "#efe6d2", jacketTrim: "#d9c9a8", pants: "#4a6584",
    accessory: "tablet",
  },
  {
    id: "kai", name: "Kai", flag: "🇫🇷", role: "The Rocket",
    skin: "#e8b48c", hairStyle: "spiky", hairColor: "#23201f",
    jacket: "#d94f4f", jacketTrim: "#b23a3a", pants: "#2e3440",
  },
  {
    id: "ava", name: "Ava", flag: "🇩🇪", role: "The Captain",
    skin: "#f9d9b8", hairStyle: "bun", hairColor: "#d9a441",
    jacket: "#4fae6b", jacketTrim: "#3c8a53", pants: "#31415a",
  },
  {
    id: "rio", name: "Rio", flag: "🇪🇸", role: "The Magician",
    skin: "#d9a06b", hairStyle: "curly", hairColor: "#3a2a1d",
    jacket: "#f2b53c", jacketTrim: "#d09420", pants: "#41372e",
  },
  {
    id: "nina", name: "Nina", flag: "🇳🇬", role: "The Wall",
    skin: "#a76a3f", hairStyle: "curly", hairColor: "#171310",
    jacket: "#3fa66b", jacketTrim: "#2f8452", pants: "#2c3542",
  },
  {
    id: "oli", name: "Oli", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", role: "The Engine",
    skin: "#fadcc0", hairStyle: "short", hairColor: "#c0622f",
    jacket: "#eef0f2", jacketTrim: "#c94a4a", pants: "#3a4756",
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
