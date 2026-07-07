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

// ---------------------------------------------------------------- music
// A cheery 4-bar chiptune loop (A — F#m — D — E), fully synthesized.

const BPM = 112;
const BAR = (60 / BPM) * 4;
const EIGHTH = BAR / 8;

// eighth-note arpeggios per bar (chord tones, root–3rd–5th patterns)
const MELODY: number[][] = [
  [440, 554.37, 659.25, 554.37, 880, 659.25, 554.37, 659.25], // A
  [369.99, 440, 554.37, 440, 739.99, 554.37, 440, 554.37], // F#m
  [293.66, 369.99, 440, 369.99, 587.33, 440, 369.99, 440], // D
  [329.63, 415.3, 493.88, 415.3, 659.25, 493.88, 415.3, 493.88], // E
];
const BASS = [110, 92.5, 73.42, 82.41]; // A2, F#2, D2, E2

let musicOn = false;
let musicGain: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let schedTimer: ReturnType<typeof setInterval> | null = null;
let nextBarTime = 0;
let barIndex = 0;

function musicBus(c: AudioContext): GainNode {
  if (!musicGain) {
    musicGain = c.createGain();
    musicGain.gain.value = 1;
    musicGain.connect(c.destination);
  }
  return musicGain;
}

function noise(c: AudioContext): AudioBuffer {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 0.1, c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

function note(
  c: AudioContext,
  bus: GainNode,
  freq: number,
  t: number,
  dur: number,
  type: OscillatorType,
  gain: number,
) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + dur + 0.03);
}

function scheduleBar(c: AudioContext, t: number, bar: number) {
  const bus = musicBus(c);
  const mel = MELODY[bar % 4];
  const root = BASS[bar % 4];
  for (let i = 0; i < 8; i++) {
    const ti = t + i * EIGHTH;
    note(c, bus, mel[i], ti, EIGHTH * 0.9, "triangle", 0.045); // melody
    note(c, bus, i % 2 === 0 ? root : root * 2, ti, EIGHTH * 0.85, "triangle", 0.065); // bass
    // hi-hat tick
    const hat = c.createBufferSource();
    hat.buffer = noise(c);
    const hg = c.createGain();
    hg.gain.setValueAtTime(0.018, ti);
    hg.gain.exponentialRampToValueAtTime(0.0001, ti + 0.03);
    hat.connect(hg).connect(bus);
    hat.start(ti);
    // kick on beats 1 and 3
    if (i === 0 || i === 4) {
      const k = c.createOscillator();
      const kg = c.createGain();
      k.frequency.setValueAtTime(140, ti);
      k.frequency.exponentialRampToValueAtTime(45, ti + 0.1);
      kg.gain.setValueAtTime(0.08, ti);
      kg.gain.exponentialRampToValueAtTime(0.0001, ti + 0.12);
      k.connect(kg).connect(bus);
      k.start(ti);
      k.stop(ti + 0.15);
    }
  }
}

export const music = {
  isPlaying: () => musicOn,
  start() {
    const c = ac();
    if (!c || musicOn) return;
    musicOn = true;
    musicBus(c).gain.value = 1;
    nextBarTime = c.currentTime + 0.05;
    schedTimer = setInterval(() => {
      if (!musicOn) return;
      // keep the context alive — browsers suspend it when the tab sleeps
      if (c.state === "suspended") void c.resume();
      // if we fell behind (tab was asleep), jump ahead instead of
      // bursting all the missed bars at once
      if (nextBarTime < c.currentTime - 0.1) nextBarTime = c.currentTime + 0.05;
      while (nextBarTime < c.currentTime + 0.6) {
        scheduleBar(c, nextBarTime, barIndex++);
        nextBarTime += BAR;
      }
    }, 150);
  },
  stop() {
    musicOn = false;
    if (schedTimer) {
      clearInterval(schedTimer);
      schedTimer = null;
    }
    if (musicGain && ctx) {
      musicGain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      const g = musicGain;
      setTimeout(() => {
        if (!musicOn && g === musicGain) g.gain.value = 0;
      }, 400);
    }
  },
};

export const sound = {
  // mutes sound effects only — the soundtrack has its own 🎵 toggle
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
