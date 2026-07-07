// Tiny WebAudio synth — no audio assets needed. All effects are short
// oscillator envelopes so the game stays a single static bundle.

let ctx: AudioContext | null = null;
let muted = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.12,
) {
  const c = ac();
  if (!c || muted) return;
  const t = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const sound = {
  setMuted(m: boolean) {
    muted = m;
  },
  isMuted: () => muted,
  click() {
    tone(660, 0, 0.08, "triangle", 0.08);
  },
  correct() {
    tone(523, 0, 0.12, "triangle");
    tone(784, 0.09, 0.16, "triangle");
  },
  wrong() {
    tone(196, 0, 0.22, "sawtooth", 0.08);
    tone(147, 0.1, 0.26, "sawtooth", 0.08);
  },
  goal() {
    tone(523, 0, 0.14, "square", 0.07);
    tone(659, 0.12, 0.14, "square", 0.07);
    tone(784, 0.24, 0.14, "square", 0.07);
    tone(1047, 0.36, 0.4, "square", 0.09);
  },
  concede() {
    tone(330, 0, 0.18, "sawtooth", 0.07);
    tone(262, 0.15, 0.22, "sawtooth", 0.07);
    tone(196, 0.32, 0.35, "sawtooth", 0.07);
  },
  whistle() {
    tone(2200, 0, 0.16, "square", 0.05);
    tone(2200, 0.2, 0.16, "square", 0.05);
  },
  finalWhistle() {
    tone(2200, 0, 0.14, "square", 0.05);
    tone(2200, 0.18, 0.14, "square", 0.05);
    tone(2200, 0.36, 0.45, "square", 0.05);
  },
};
