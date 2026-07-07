"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import "./wcm.css";
import { Chibi } from "./Chibi";
import Match from "./Match";
import {
  DIFFICULTIES,
  ROSTER,
  computePoints,
  computeStars,
  loadRecords,
  saveRecord,
  type Difficulty,
  type MatchRecord,
  type MatchSummary,
  type PlayerDef,
  type Screen,
} from "./engine";
import { sound } from "./sound";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Game() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [me, setMe] = useState<PlayerDef>(ROSTER[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [opponent, setOpponent] = useState<PlayerDef>(ROSTER[1]);
  const [summary, setSummary] = useState<MatchSummary | null>(null);
  const [records, setRecords] = useState<MatchRecord[]>([]);
  const [muted, setMuted] = useState(false);
  const [matchNo, setMatchNo] = useState(0);

  useEffect(() => {
    // hydrate persisted state from localStorage after mount — reading it
    // during render would mismatch the statically prerendered HTML
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(loadRecords());
    const m = window.localStorage.getItem("wcm-muted") === "1";
    setMuted(m);
    sound.setMuted(m);
  }, []);

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    sound.setMuted(m);
    try {
      window.localStorage.setItem("wcm-muted", m ? "1" : "0");
    } catch {}
    if (!m) sound.click();
  };

  const startMatch = () => {
    sound.whistle();
    const others = ROSTER.filter((p) => p.id !== me.id);
    setOpponent(others[Math.floor(Math.random() * others.length)]);
    setSummary(null);
    setMatchNo((n) => n + 1);
    setScreen("match");
  };

  const onMatchEnd = (s: MatchSummary) => {
    setSummary(s);
    const total = s.correct + s.wrong;
    const rec: MatchRecord = {
      name: me.name,
      flag: me.flag,
      difficulty: difficulty.label,
      points: computePoints(s),
      score: `${s.goalsFor} – ${s.goalsAgainst}`,
      accuracy: total > 0 ? Math.round((s.correct / total) * 100) : 0,
      date: Date.now(),
    };
    setRecords(saveRecord(rec));
    setScreen("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#0a1128] text-white">
      {/* top bar */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 pt-4">
        <button
          onClick={() => {
            sound.click();
            setScreen("menu");
          }}
          className="flex items-center gap-1.5 text-sm font-bold text-white/70 transition-colors hover:text-white"
        >
          ⚽ <span className="tracking-wide">World Cup Math</span>
        </button>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-white/40 transition-colors hover:text-white/80"
          >
            rekal.dev
          </Link>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-sm transition-colors hover:bg-white/15"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {screen === "menu" && (
          <motion.div key="menu" {...fadeUp} transition={{ duration: 0.25 }}>
            <Menu
              records={records}
              onPlay={() => {
                sound.click();
                setScreen("locker");
              }}
            />
          </motion.div>
        )}

        {screen === "locker" && (
          <motion.div key="locker" {...fadeUp} transition={{ duration: 0.25 }}>
            <Locker
              me={me}
              setMe={setMe}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              onStart={startMatch}
              onBack={() => {
                sound.click();
                setScreen("menu");
              }}
            />
          </motion.div>
        )}

        {screen === "match" && (
          <motion.div key={`match-${matchNo}`} {...fadeUp} transition={{ duration: 0.25 }}>
            <Match me={me} op={opponent} difficulty={difficulty} onEnd={onMatchEnd} />
          </motion.div>
        )}

        {screen === "results" && summary && (
          <motion.div key="results" {...fadeUp} transition={{ duration: 0.25 }}>
            <Results
              me={me}
              op={opponent}
              summary={summary}
              onReplay={startMatch}
              onLocker={() => {
                sound.click();
                setScreen("locker");
              }}
              onMenu={() => {
                sound.click();
                setScreen("menu");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------- menu */

function Menu({ records, onPlay }: { records: MatchRecord[]; onPlay: () => void }) {
  const podium = records.slice(0, 3);
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 pb-10 pt-6">
      {/* hero stadium card */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <div className="relative bg-gradient-to-b from-[#0c1631] to-[#1b2c55] pb-0 pt-8">
          <div className="wcm-flood absolute -left-12 -top-12 h-40 w-52" />
          <div className="wcm-flood absolute -right-12 -top-12 h-40 w-52" />
          <div className="wcm-crowd absolute inset-x-0 top-0 h-24 opacity-60" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="relative z-10 text-center"
          >
            <div className="text-2xl font-black tracking-[0.3em] text-white drop-shadow-lg sm:text-3xl">
              WORLD CUP
            </div>
            <div className="-mt-1 text-6xl font-black tracking-wide text-[#ffd54a] drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] sm:text-7xl">
              MATH
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
              Solve fast · Score goals
            </div>
          </motion.div>

          {/* three champions on the pitch */}
          <div className="wcm-pitch-stripes relative mt-6 flex items-end justify-center gap-4 pb-2 pt-3 sm:gap-10">
            <Chibi p={ROSTER[1]} state="idle" size={64} />
            <Chibi p={ROSTER[0]} state="cheer" size={72} />
            <Chibi p={ROSTER[2]} state="idle" size={64} />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onPlay}
        className="w-full max-w-xs rounded-2xl bg-[#ffd54a] py-4 text-2xl font-black tracking-wide text-[#1a2510] shadow-[0_6px_0_#c9a227] transition-shadow hover:shadow-[0_4px_0_#c9a227]"
      >
        ▶ PLAY
      </motion.button>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        {/* how to play */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-[#ffd54a]">
            How to play
          </h2>
          <ol className="space-y-2.5 text-sm text-white/80">
            <li className="flex gap-2.5">
              <span>🧮</span> Answer math questions to dribble toward your opponent&apos;s goal.
            </li>
            <li className="flex gap-2.5">
              <span>⚽</span> Reach the goal zone and your next correct answer scores!
            </li>
            <li className="flex gap-2.5">
              <span>🔥</span> A 3-answer streak doubles your advance — but a miss gets you tackled.
            </li>
            <li className="flex gap-2.5">
              <span>⏱</span> 90 match minutes on the clock. Most goals wins the cup.
            </li>
          </ol>
        </div>

        {/* hall of fame */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-[#ffd54a]">
            Hall of fame
          </h2>
          {podium.length === 0 ? (
            <p className="text-sm text-white/50">
              No matches yet — your best results will appear here.
            </p>
          ) : (
            <ol className="space-y-2">
              {podium.map((r, i) => (
                <li
                  key={r.date}
                  className="flex items-center justify-between rounded-lg bg-black/25 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>{["🥇", "🥈", "🥉"][i]}</span>
                    <span>{r.flag}</span>
                    <span className="font-bold">{r.name}</span>
                    <span className="text-white/40">· {r.difficulty}</span>
                  </span>
                  <span className="font-mono font-bold text-[#ffd54a]">{r.points} pts</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <p className="text-xs text-white/30">
        A math playground on rekal.dev — no ads, no accounts, progress saved on this device.
      </p>
    </div>
  );
}

/* ------------------------------------------------------ locker room */

function Locker({
  me,
  setMe,
  difficulty,
  setDifficulty,
  onStart,
  onBack,
}: {
  me: PlayerDef;
  setMe: (p: PlayerDef) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-bold text-white/70 transition-colors hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest text-[#ffd54a] sm:text-xl">
          Locker room
        </h1>
        <span className="w-16" />
      </div>

      <section>
        <h2 className="mb-1 text-sm font-bold uppercase tracking-widest text-white/50">
          Select your math champion
        </h2>
        <p className="mb-2.5 text-xs text-white/35">
          All 32 World Cup nations, plus India 🇮🇳 and China 🇨🇳 — {ROSTER.length} champions.
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5">
          {ROSTER.map((p) => {
            const active = p.id === me.id;
            return (
              <motion.button
                key={p.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.click();
                  setMe(p);
                }}
                className={`flex flex-col items-center rounded-2xl border-2 px-1 pb-2 pt-1.5 transition-colors ${
                  active
                    ? "border-[#ffd54a] bg-[#ffd54a]/10 shadow-[0_0_24px_rgba(255,213,74,0.15)]"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <Chibi p={p} state={active ? "cheer" : "idle"} size={52} />
                <span className="mt-0.5 flex items-center gap-1 text-xs font-bold">
                  <span>{p.flag}</span> {p.name}
                </span>
                <span className="text-[9px] leading-tight text-white/45">{p.role}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2.5 text-sm font-bold uppercase tracking-widest text-white/50">
          Choose your level
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DIFFICULTIES.map((d) => {
            const active = d.id === difficulty.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  sound.click();
                  setDifficulty(d);
                }}
                className={`rounded-2xl border-2 px-3 py-3 text-left transition-colors ${
                  active
                    ? "border-[#ffd54a] bg-[#ffd54a]/10"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="text-lg">{d.icon}</div>
                <div className="text-sm font-black">{d.label}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-white/50">{d.tagline}</div>
              </button>
            );
          })}
        </div>
      </section>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-1 w-full rounded-2xl bg-[#4ade80] py-4 text-xl font-black tracking-wide text-[#0c2313] shadow-[0_6px_0_#2f9e58] transition-shadow hover:shadow-[0_4px_0_#2f9e58]"
      >
        KICK OFF → {me.name} · {difficulty.label}
      </motion.button>
      <p className="text-center text-xs text-white/35">
        A mystery opponent from the roster will face you on the pitch.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------- results */

function Results({
  me,
  op,
  summary,
  onReplay,
  onLocker,
  onMenu,
}: {
  me: PlayerDef;
  op: PlayerDef;
  summary: MatchSummary;
  onReplay: () => void;
  onLocker: () => void;
  onMenu: () => void;
}) {
  const win = summary.goalsFor > summary.goalsAgainst;
  const draw = summary.goalsFor === summary.goalsAgainst;
  const stars = computeStars(summary);
  const points = computePoints(summary);
  const total = summary.correct + summary.wrong;
  const accuracy = total > 0 ? Math.round((summary.correct / total) * 100) : 0;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 pb-10 pt-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`w-full rounded-3xl border px-6 py-7 text-center shadow-2xl ${
          win
            ? "border-[#ffd54a]/50 bg-gradient-to-b from-[#3d3413] to-[#1c1a0c]"
            : draw
              ? "border-white/20 bg-gradient-to-b from-[#22304f] to-[#101d36]"
              : "border-red-400/30 bg-gradient-to-b from-[#3a1c22] to-[#1c1014]"
        }`}
      >
        <div className="text-5xl">{win ? "🏆" : draw ? "🤝" : "💪"}</div>
        <h1
          className={`mt-2 text-4xl font-black tracking-wide sm:text-5xl ${
            win ? "text-[#ffd54a]" : draw ? "text-white" : "text-red-300"
          }`}
        >
          {win ? "VICTORY!" : draw ? "DRAW!" : "GOOD EFFORT!"}
        </h1>

        <div className="mt-3 flex items-center justify-center gap-3 text-2xl font-bold">
          <span className="flex items-center gap-2">
            <span>{me.flag}</span> {me.name}
          </span>
          <span className="rounded-xl bg-black/40 px-4 py-1 font-mono text-3xl text-[#ffd54a]">
            {summary.goalsFor} – {summary.goalsAgainst}
          </span>
          <span className="flex items-center gap-2">
            {op.name} <span>{op.flag}</span>
          </span>
        </div>

        {/* stars */}
        <div className="mt-4 flex justify-center gap-2 text-4xl">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.25, type: "spring", stiffness: 300, damping: 12 }}
              className={i < stars ? "" : "opacity-25 grayscale"}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="font-mono text-4xl font-black text-[#ffd54a]"
          >
            +{points}
          </motion.span>
          <span className="pb-1 text-sm font-bold uppercase tracking-widest text-white/50">
            points
          </span>
        </div>
      </motion.div>

      {/* stat cards */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Accuracy" value={`${accuracy}%`} icon="🎯" />
        <StatCard label="Correct" value={`${summary.correct}/${total}`} icon="✅" />
        <StatCard label="Best streak" value={`${summary.bestStreak}🔥`} icon="⚡" />
        <StatCard
          label="Fastest answer"
          value={summary.fastest !== null ? `${summary.fastest.toFixed(1)}s` : "—"}
          icon="⏱"
        />
      </div>

      <div className="flex w-full flex-col gap-2.5 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          className="flex-1 rounded-2xl bg-[#ffd54a] py-3.5 text-lg font-black text-[#1a2510] shadow-[0_5px_0_#c9a227]"
        >
          ⟳ Play again
        </motion.button>
        <button
          onClick={onLocker}
          className="flex-1 rounded-2xl border-2 border-white/15 bg-white/5 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
        >
          Locker room
        </button>
        <button
          onClick={onMenu}
          className="flex-1 rounded-2xl border-2 border-white/15 bg-white/5 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
        >
          Main menu
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3.5 text-center">
      <div className="text-lg">{icon}</div>
      <div className="font-mono text-xl font-bold text-white">{value}</div>
      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
        {label}
      </div>
    </div>
  );
}
