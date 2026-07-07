"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chibi, Football, type ChibiState } from "./Chibi";
import {
  GOAL_ZONE,
  HOT_STREAK,
  MATCH_SECONDS,
  OWN_ZONE,
  START_ZONE,
  type Difficulty,
  type MatchSummary,
  type PlayerDef,
  type Problem,
} from "./engine";
import { sound } from "./sound";

type Phase = "kickoff" | "play" | "resolve" | "goal" | "concede" | "fulltime";

interface Feedback {
  text: string;
  tone: "good" | "bad" | "goal" | "concede" | "info";
}

const PASS_LINES = ["Great pass!", "Brilliant!", "What a run!", "Lovely touch!"];
const BALL_X = [10, 30, 50, 70, 88]; // % across the pitch per zone

export default function Match({
  me,
  op,
  difficulty,
  onEnd,
}: {
  me: PlayerDef;
  op: PlayerDef;
  difficulty: Difficulty;
  onEnd: (s: MatchSummary) => void;
}) {
  const [phase, setPhase] = useState<Phase>("kickoff");
  const [countdown, setCountdown] = useState<string | null>("3");
  const [clock, setClock] = useState(0);
  const [zone, setZone] = useState(START_ZONE);
  const [scores, setScores] = useState({ me: 0, op: 0 });
  const [streak, setStreak] = useState(0);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [qLeft, setQLeft] = useState(difficulty.questionTime);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [myState, setMyState] = useState<ChibiState>("idle");
  const [opState, setOpState] = useState<ChibiState>("idle");
  const [netShake, setNetShake] = useState<"left" | "right" | null>(null);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [shake, setShake] = useState(false);

  // Authoritative values for use inside timers (avoids stale closures).
  const phaseRef = useRef<Phase>("kickoff");
  const zoneRef = useRef(START_ZONE);
  const streakRef = useRef(0);
  const scoresRef = useRef({ me: 0, op: 0 });
  const clockRef = useRef(0);
  const problemRef = useRef<Problem | null>(null);
  const qStartRef = useRef(0);
  const statsRef = useRef({
    correct: 0,
    wrong: 0,
    bestStreak: 0,
    fastest: null as number | null,
  });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const endedRef = useRef(false);

  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const goPhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const endMatch = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    goPhase("fulltime");
    sound.finalWhistle();
    setFeedback({ text: "FULL TIME", tone: "info" });
    setMyState(scoresRef.current.me >= scoresRef.current.op ? "cheer" : "stumble");
    setOpState(scoresRef.current.op > scoresRef.current.me ? "cheer" : "idle");
    later(() => {
      onEnd({
        goalsFor: scoresRef.current.me,
        goalsAgainst: scoresRef.current.op,
        ...statsRef.current,
      });
    }, 2000);
  }, [goPhase, later, onEnd]);

  const nextQuestion = useCallback(() => {
    if (endedRef.current) return;
    if (clockRef.current >= MATCH_SECONDS) {
      endMatch();
      return;
    }
    const p = difficulty.gen();
    problemRef.current = p;
    setProblem(p);
    setSelected(null);
    setFeedback(null);
    setQLeft(difficulty.questionTime);
    qStartRef.current = performance.now();
    setMyState("idle");
    setOpState("idle");
    goPhase("play");
  }, [difficulty, endMatch, goPhase]);

  const handleCorrect = useCallback(
    (elapsed: number) => {
      sound.correct();
      const st = statsRef.current;
      st.correct += 1;
      if (st.fastest === null || elapsed < st.fastest) st.fastest = elapsed;
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      if (newStreak > st.bestStreak) st.bestStreak = newStreak;

      const hot = newStreak >= HOT_STREAK;
      const newZone = Math.min(GOAL_ZONE, zoneRef.current + (hot ? 2 : 1));
      zoneRef.current = newZone;
      setZone(newZone);
      setMyState("run");
      setOpState("stumble");

      if (newZone === GOAL_ZONE) {
        goPhase("goal");
        later(() => {
          setMyState("kick");
        }, 150);
        later(() => {
          setNetShake("right");
          sound.goal();
          setConfettiBurst((n) => n + 1);
          scoresRef.current = { ...scoresRef.current, me: scoresRef.current.me + 1 };
          setScores(scoresRef.current);
          setMyState("cheer");
          setFeedback({ text: "GOAL!", tone: "goal" });
        }, 650);
        later(() => {
          setNetShake(null);
          zoneRef.current = START_ZONE;
          setZone(START_ZONE);
          nextQuestion();
        }, 2500);
      } else {
        goPhase("resolve");
        setFeedback(
          hot
            ? { text: "🔥 On fire! Double advance!", tone: "good" }
            : { text: PASS_LINES[Math.floor(Math.random() * PASS_LINES.length)], tone: "good" },
        );
        later(nextQuestion, 1000);
      }
    },
    [goPhase, later, nextQuestion],
  );

  const handleMiss = useCallback(
    (timedOut: boolean) => {
      sound.wrong();
      statsRef.current.wrong += 1;
      streakRef.current = 0;
      setStreak(0);
      const counter = Math.random() < difficulty.counterChance;
      const newZone = Math.max(OWN_ZONE, zoneRef.current - (counter ? 2 : 1));
      zoneRef.current = newZone;
      setZone(newZone);
      setMyState("stumble");
      setOpState("run");
      setShake(true);
      later(() => setShake(false), 500);

      if (newZone === OWN_ZONE) {
        goPhase("concede");
        later(() => {
          setNetShake("left");
          sound.concede();
          scoresRef.current = { ...scoresRef.current, op: scoresRef.current.op + 1 };
          setScores(scoresRef.current);
          setOpState("cheer");
          setFeedback({ text: `${op.name} scores!`, tone: "concede" });
        }, 550);
        later(() => {
          setNetShake(null);
          zoneRef.current = START_ZONE;
          setZone(START_ZONE);
          nextQuestion();
        }, 2300);
      } else {
        goPhase("resolve");
        setFeedback(
          timedOut
            ? { text: "⏱ Too slow — intercepted!", tone: "bad" }
            : counter
              ? { text: `${op.name} counter-attacks!`, tone: "bad" }
              : { text: "Tackled!", tone: "bad" },
        );
        later(nextQuestion, 1100);
      }
    },
    [difficulty.counterChance, goPhase, later, nextQuestion, op.name],
  );

  const answer = useCallback(
    (choice: number) => {
      if (phaseRef.current !== "play" || selected !== null) return;
      const p = problemRef.current;
      if (!p) return;
      setSelected(choice);
      const elapsed = (performance.now() - qStartRef.current) / 1000;
      if (choice === p.answer) handleCorrect(elapsed);
      else handleMiss(false);
    },
    [handleCorrect, handleMiss, selected],
  );

  // ---- kickoff countdown
  useEffect(() => {
    const seq: [string | null, number][] = [
      ["3", 0],
      ["2", 750],
      ["1", 1500],
      ["⚽", 2250],
      [null, 2900],
    ];
    seq.forEach(([v, ms]) =>
      later(() => {
        setCountdown(v);
        if (v === "⚽") sound.whistle();
        if (v === null) nextQuestion();
      }, ms),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- match clock (1 real second = 1 match minute)
  useEffect(() => {
    if (phase === "kickoff" || phase === "fulltime") return;
    const id = setInterval(() => {
      clockRef.current += 1;
      setClock(clockRef.current);
      if (clockRef.current >= MATCH_SECONDS && phaseRef.current === "play") {
        endMatch();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [phase, endMatch]);

  // ---- per-question countdown
  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      setQLeft((q) => {
        const next = q - 0.1;
        if (next <= 0 && phaseRef.current === "play") {
          clearInterval(id);
          setSelected(-1); // lock input
          handleMiss(true);
          return 0;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [phase, problem, handleMiss]);

  // ---- keyboard answers (1–4)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = ["1", "2", "3", "4"].indexOf(e.key);
      if (idx >= 0 && problemRef.current) answer(problemRef.current.choices[idx]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer]);

  const ballX =
    phase === "goal" ? 96.5 : phase === "concede" ? 3 : BALL_X[zone];
  const timeFrac = Math.max(0, qLeft / difficulty.questionTime);
  const timerColor =
    timeFrac > 0.5 ? "#4ade80" : timeFrac > 0.25 ? "#fbbf24" : "#f87171";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-3 pb-6 pt-3 sm:gap-4">
      {/* ------------------------------------------------ scoreboard HUD */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101d36]/90 px-3 py-2 shadow-lg sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xl sm:text-2xl">{me.flag}</span>
          <span className="truncate text-sm font-bold text-white sm:text-base">{me.name}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            key={`me-${scores.me}`}
            initial={{ scale: 1.6, color: "#4ade80" }}
            animate={{ scale: 1, color: "#ffd54a" }}
            className="font-mono text-2xl font-bold sm:text-3xl"
          >
            {scores.me}
          </motion.span>
          <div className="flex flex-col items-center rounded-lg bg-black/40 px-2 py-0.5">
            <span className={`font-mono text-sm font-bold text-white sm:text-base ${clock >= 80 ? "wcm-pulse text-red-300" : ""}`}>
              {Math.min(clock, MATCH_SECONDS)}&apos;
            </span>
            <span className="text-[9px] uppercase tracking-widest text-white/50">
              {difficulty.label}
            </span>
          </div>
          <motion.span
            key={`op-${scores.op}`}
            initial={{ scale: 1.6, color: "#f87171" }}
            animate={{ scale: 1, color: "#ffd54a" }}
            className="font-mono text-2xl font-bold sm:text-3xl"
          >
            {scores.op}
          </motion.span>
        </div>
        <div className="flex min-w-0 items-center justify-end gap-2">
          <span className="truncate text-sm font-bold text-white sm:text-base">{op.name}</span>
          <span className="text-xl sm:text-2xl">{op.flag}</span>
        </div>
      </div>

      {/* ------------------------------------------------------- pitch */}
      <div
        className={`relative h-56 overflow-hidden rounded-2xl border border-white/10 shadow-xl sm:h-72 ${shake ? "wcm-shake" : ""}`}
      >
        {/* stands */}
        <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#0c1631] to-[#1b2c55]">
          <div className="wcm-flood absolute -left-10 -top-10 h-32 w-40" />
          <div className="wcm-flood absolute -right-10 -top-10 h-32 w-40" />
          <div className="wcm-crowd absolute inset-x-0 top-2 h-[55%] opacity-80" />
          <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-[#0a1128] py-1 text-[10px] font-bold uppercase tracking-widest text-[#ffd54a] sm:text-xs">
            <div className="wcm-marquee">
              {Array.from({ length: 2 }).map((_, i) => (
                <span key={i}>
                  &nbsp;⚽ WORLD CUP MATH &nbsp;•&nbsp; BRAIN POWER &nbsp;•&nbsp; MATH IS FUN
                  &nbsp;•&nbsp; {me.name.toUpperCase()} vs {op.name.toUpperCase()} &nbsp;•
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* pitch turf */}
        <div className="wcm-pitch-stripes absolute inset-x-0 bottom-0 h-[58%]">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 60">
            <g stroke="rgba(255,255,255,0.65)" strokeWidth="0.45" fill="none">
              <line x1="50" y1="0" x2="50" y2="60" />
              <ellipse cx="50" cy="30" rx="9" ry="12" />
              <rect x="0" y="12" width="10" height="36" />
              <rect x="90" y="12" width="10" height="36" />
            </g>
          </svg>

          {/* zone chevrons showing which way you attack */}
          <div className="absolute right-2 top-1 text-[10px] font-bold text-white/60">
            you attack →
          </div>
        </div>

        {/* goals */}
        <div
          className={`wcm-net absolute left-0 top-[30%] h-[34%] w-[7%] rounded-r border-2 border-l-0 border-white/90 bg-white/10 ${netShake === "left" ? "wcm-net-shake" : ""}`}
        />
        <div
          className={`wcm-net absolute right-0 top-[30%] h-[34%] w-[7%] rounded-l border-2 border-r-0 border-white/90 bg-white/10 ${netShake === "right" ? "wcm-net-shake" : ""}`}
        />

        {/* players + ball */}
        <motion.div
          className="absolute bottom-[6%] z-10"
          animate={{ left: `${Math.max(2, Math.min(80, ballX - 12))}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <Chibi p={me} state={myState} size={64} />
        </motion.div>
        <motion.div
          className="absolute bottom-[6%] z-10"
          animate={{ left: `${Math.max(6, Math.min(86, ballX + 2))}%` }}
          transition={{ type: "spring", stiffness: 110, damping: 17 }}
        >
          <Chibi p={op} state={opState} size={64} flip />
        </motion.div>
        <motion.div
          className="absolute z-10"
          animate={{
            left: `${ballX}%`,
            bottom: phase === "goal" || phase === "concede" ? "38%" : "5%",
            rotate: ballX * 12,
          }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        >
          <Football size={20} />
        </motion.div>

        {/* confetti on goals */}
        <AnimatePresence>
          {confettiBurst > 0 && <Confetti key={confettiBurst} />}
        </AnimatePresence>

        {/* kickoff countdown */}
        <AnimatePresence>
          {countdown && (
            <motion.div
              key={countdown}
              initial={{ scale: 2.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <span className="text-6xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* feedback banner */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              key={feedback.text + phase}
              initial={{ scale: 0.5, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="pointer-events-none absolute inset-x-0 top-[38%] z-20 flex justify-center"
            >
              <span
                className={`rounded-2xl px-5 py-2 text-xl font-black shadow-2xl sm:text-3xl ${
                  feedback.tone === "goal"
                    ? "bg-[#ffd54a] text-[#1a2b12]"
                    : feedback.tone === "good"
                      ? "bg-emerald-500 text-white"
                      : feedback.tone === "bad" || feedback.tone === "concede"
                        ? "bg-red-500 text-white"
                        : "bg-white text-[#12203c]"
                }`}
              >
                {feedback.tone === "goal" ? "⚽ GOAL!" : feedback.text}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --------------------------------------------------- math zone */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101d36]/95 shadow-xl">
        {/* question timer bar */}
        <div className="h-1.5 w-full bg-black/40">
          <div
            className="h-full transition-[width] duration-100 ease-linear"
            style={{ width: `${timeFrac * 100}%`, background: timerColor }}
          />
        </div>

        <div className="flex flex-col items-center gap-3 px-4 py-4 sm:gap-4 sm:py-5">
          <div className="flex w-full items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              Solve to advance
            </span>
            <AnimatePresence>
              {streak >= 2 && (
                <motion.span
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-xs font-bold text-orange-300"
                >
                  🔥 Streak ×{streak}
                  {streak === HOT_STREAK - 1 ? " — one more for a double move!" : ""}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={problem?.text ?? phase}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-4xl font-bold tracking-wide text-white sm:text-5xl"
              aria-live="polite"
            >
              {phase === "kickoff"
                ? "Get ready…"
                : phase === "fulltime"
                  ? "Full time!"
                  : problem?.text ?? ""}
            </motion.div>
          </AnimatePresence>

          <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3">
            {(problem?.choices ?? []).map((c, i) => {
              const revealed = selected !== null;
              const isAnswer = problem !== null && c === problem.answer;
              const isPicked = selected === c;
              return (
                <motion.button
                  key={`${problem?.text}-${i}`}
                  whileHover={phase === "play" && !revealed ? { scale: 1.03 } : {}}
                  whileTap={phase === "play" && !revealed ? { scale: 0.96 } : {}}
                  onClick={() => answer(c)}
                  disabled={phase !== "play" || revealed}
                  className={`relative rounded-xl border-2 py-3.5 font-mono text-2xl font-bold transition-colors sm:py-4 sm:text-3xl ${
                    revealed && isAnswer
                      ? "border-emerald-400 bg-emerald-500/90 text-white"
                      : revealed && isPicked
                        ? "border-red-400 bg-red-500/90 text-white"
                        : revealed
                          ? "border-white/10 bg-white/5 text-white/30"
                          : "border-white/15 bg-white/10 text-white hover:border-[#ffd54a]/70 hover:bg-white/15"
                  }`}
                >
                  <span className="absolute left-2 top-1.5 hidden text-[10px] font-bold text-white/30 sm:block">
                    {i + 1}
                  </span>
                  {c}
                </motion.button>
              );
            })}
            {!problem &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border-2 border-white/10 bg-white/5 py-3.5 sm:py-4">
                  <span className="invisible font-mono text-2xl sm:text-3xl">0</span>
                </div>
              ))}
          </div>

          {/* possession meter */}
          <div className="flex items-center gap-1.5" aria-label="field position">
            <span className="text-[10px] font-bold text-red-300/80">← defend</span>
            {[0, 1, 2, 3, 4].map((z) => (
              <span
                key={z}
                className={`h-2 w-2 rounded-full transition-all ${
                  z === zone ? "scale-125 bg-[#ffd54a]" : "bg-white/20"
                }`}
              />
            ))}
            <span className="text-[10px] font-bold text-emerald-300/80">→ shoot here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const colors = ["#ffd54a", "#4ade80", "#60a5fa", "#f472b6", "#f87171", "#a78bfa"];
  // deterministic scatter keeps this component pure across re-renders
  const jitter = (i: number, salt: number) => {
    const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className="wcm-confetti"
          style={{
            left: `${jitter(i, 1) * 100}%`,
            width: 5 + jitter(i, 2) * 5,
            height: 8 + jitter(i, 3) * 6,
            background: colors[i % colors.length],
            animationDelay: `${jitter(i, 4) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}
