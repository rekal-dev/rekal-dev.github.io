import Terminal from "@/components/Terminal";
import InstallCommand from "@/components/InstallCommand";
import GitHubButton from "@/components/GitHubButton";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Nav from "@/components/Nav";
import Magnetic from "@/components/Magnetic";
import AgentsStrip from "@/components/AgentsStrip";
import RotatingWord from "@/components/RotatingWord";

const PAPER_URL = "https://arxiv.org/abs/2607.14390";

function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-16 sm:pt-44">
      <div className="relative z-10 w-full text-center max-w-3xl mx-auto">
        <FadeIn>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="chip mb-7"
          >
            <span className="chip-dot" />
            <span>
              Team memory in <span className="text-foreground">git</span>
              {" · "}
              arXiv:2607.14390{" "}
              <span className="text-accent">{'->'}</span>
            </span>
          </a>
        </FadeIn>
        <h1 className="text-[2.6rem] leading-[1.12] sm:text-6xl font-bold tracking-tight mb-5">
          <span className="reveal-clip">
            <span className="reveal-line">Your coding agent starts every</span>
          </span>
          <span className="reveal-clip">
            <span className="reveal-line" style={{ "--rd": "0.12s" } as React.CSSProperties}>
              session blank. <span className="gradient-live">Rekal is the</span>
            </span>
          </span>
          <span className="reveal-clip">
            <span className="reveal-line gradient-live" style={{ "--rd": "0.24s" } as React.CSSProperties}>
              memory it&apos;s missing.
            </span>
          </span>
        </h1>
        <FadeIn delay={0.12}>
          <p className="text-lg text-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Captures the why at every commit. Shared with your team over plain git — on your machine, not someone else&apos;s cloud.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center gap-4">
            <InstallCommand />
            <div className="flex items-center gap-3">
              <Magnetic>
                <a href="#install" className="btn btn-primary">
                  Get started
                </a>
              </Magnetic>
              <Magnetic>
                <GitHubButton />
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="relative z-10 w-full mt-14">
        <Terminal />
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <FadeIn>
      <p className="eyebrow text-center mb-4">{eyebrow}</p>
      <h2 className="text-3xl sm:text-[2.6rem] font-bold text-center tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-muted text-center max-w-lg mx-auto mt-3 leading-relaxed">{sub}</p>}
    </FadeIn>
  );
}

function Problem() {
  return (
    <section id="why" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <p className="eyebrow text-center mb-4">The gap</p>
          <h2 className="text-3xl sm:text-[2.6rem] font-bold tracking-tight leading-tight">
            Code has git. <RotatingWord className="gradient-live" /> has nothing.
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            Attached to the commit — not archived somewhere else.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/** Entire-style metric strip: big number + short label. */
function MetricStrip({
  eyebrow,
  stats,
}: {
  eyebrow: string;
  stats: { value: number; prefix?: string; suffix?: string; l: string }[];
}) {
  const cols =
    stats.length <= 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";
  return (
    <section className="border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow text-center pt-8 pb-2">{eyebrow}</p>
        <div className={`grid ${cols}`}>
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.06}>
              <div
                className={`text-center px-4 py-8 ${
                  i < stats.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-border"
                    : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl font-bold font-mono gradient-text tabular-nums">
                  <CountUp
                    value={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                  />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-faint mt-2">
                  {s.l}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benchmarks() {
  return (
    <MetricStrip
      eyebrow="Benchmarks"
      stats={[
        { value: 90.6, suffix: "%", l: "LoCoMo" },
        { value: 86.6, suffix: "%", l: "LongMemEval" },
        { value: 98.6, suffix: "%", l: "Recall@20" },
      ]}
    />
  );
}

function Compression() {
  // README: Raw JSONL 8.5 MB → Wire 54 KB (~158×); recall median ~150 ms.
  return (
    <div className="border-b border-border">
      <MetricStrip
        eyebrow="Compression & store"
        stats={[
          { value: 158, prefix: "~", suffix: "×", l: "wire vs JSONL" },
          { value: 54, suffix: " KB", l: "wire size" },
          { value: 150, prefix: "~", suffix: " ms", l: "recall latency" },
          { value: 7.5, prefix: "~", suffix: "K", l: "tokens / query" },
        ]}
      />
    </div>
  );
}

function Team() {
  const points = [
    {
      t: "Orphan branches",
      d: "Session history rides rekal/<email> — never touches your product branch or PRs.",
    },
    {
      t: "Merged work only",
      d: "Dead-ends stay local. What lands on main is what the team inherits.",
    },
    {
      t: "rekal sync",
      d: "Fetch teammates' branches and fold their sessions into your local store.",
    },
  ];
  return (
    <section id="team" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="eyebrow text-center mb-4">Team</p>
          <h2 className="text-3xl sm:text-[2.6rem] font-bold tracking-tight leading-tight text-center mb-4">
            Memory that travels with the code
          </h2>
          <p className="text-muted text-center leading-relaxed max-w-xl mx-auto">
            Shared over plain git — no memory server. Push on commit; sync when you want team context.
          </p>
        </FadeIn>
        <div className="mt-12 grid sm:grid-cols-3 gap-8 sm:gap-6">
          {points.map((p, i) => (
            <FadeIn key={p.t} delay={i * 0.06}>
              <div className="text-center sm:text-left">
                <p className="font-mono text-[11px] text-accent mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-semibold mb-2">{p.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const substrates = [
    { name: "tree", tag: "grep · now", d: "Present-tense code. grep and read at HEAD." },
    { name: "knowledge", tag: "prose · HEAD", d: "Conventions and docs the team knows now." },
    { name: "map", tag: "structure", d: "How the repo is organized." },
    { name: "ledger", tag: "reasoning · past", d: "Why it was written that way." },
  ];
  return (
    <section id="skills" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead
          eyebrow="Agent skill"
          title="One skill. Four substrates."
          sub="A router. Silence when memory isn’t the tool."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-12 border border-border rounded-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border">
          {substrates.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.06}>
              <article className="p-6 h-full">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <code className="font-mono text-sm text-accent">{s.name}</code>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-faint shrink-0">{s.tag}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNot() {
  const rows = [
    { q: "01", t: "Not a MEMORY.md", d: "Rots. Hand-maintained. Rekal captures at every commit." },
    { q: "02", t: "Not a memory SaaS", d: "Intent stays in git and on your machine." },
    { q: "03", t: "Not just git log", d: "Log shows what changed. Rekal shows why." },
  ];
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 border border-border rounded-2xl overflow-hidden">
          {rows.map((r, i) => (
            <FadeIn key={r.q} delay={i * 0.08}>
              <article
                className={`p-7 h-full ${
                  i < rows.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
                }`}
              >
                <p className="font-mono text-xs text-accent mb-3">{r.q}</p>
                <h3 className="font-semibold mb-2">{r.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{r.d}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHead eyebrow="Install" title="Then commit as normal." />
        <FadeIn delay={0.1}>
          <div className="ring-grad inline-block text-left font-mono text-sm px-6 py-5 space-y-1 mt-10">
            <p><span className="text-accent">❯</span> <span className="text-foreground">cd your-project</span></p>
            <p><span className="text-accent">❯</span> <span className="text-foreground">rekal init</span></p>
            <p className="text-faint pl-4"># done</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Which agents?",
    a: "Claude Code, Codex, Gemini, OpenCode — captured at commit. Also works with Cursor and Copilot.",
  },
  {
    q: "How does team memory work?",
    a: "Orphan branches per author. Only merged work reaches the wire. rekal sync folds teammates' sessions into your local index.",
  },
  {
    q: "Does intent leave my machine?",
    a: "No cloud memory API. It rides git on your remote — same push/fetch you already use. No telemetry.",
  },
  {
    q: "How does recall work?",
    a: 'rekal "<problem>" returns scored seeds with confidence — drill, follow a pointer, or stay silent.',
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <SectionHead eyebrow="FAQ" title="Questions" />
        <div className="mt-10 space-y-2">
          {FAQS.map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.05}>
              <details className="card group px-5 py-4 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-medium list-none text-sm sm:text-base">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted leading-relaxed mt-3">{f.a}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="ring-grad glow-accent text-center px-8 py-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Free. Local. Forever.
            </h2>
            <p className="text-muted mb-8">No accounts. No telemetry. The CLI is the product.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Magnetic>
                <a href="#install" className="btn btn-primary">Install Rekal</a>
              </Magnetic>
              <Magnetic>
                <GitHubButton />
              </Magnetic>
            </div>
            <p className="text-xs font-mono text-faint">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground transition-colors"
              >
                arXiv:2607.14390
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-accent">❯</span>
          <span className="font-bold">rekal</span>
          <span className="text-xs text-faint">Apache-2.0</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="https://github.com/rekal-dev/rekal-cli" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="/paper" className="hover:text-foreground transition-colors">Paper</a>
          <a href="https://discord.gg/eNNabp4b" className="hover:text-foreground transition-colors">Discord</a>
          <a href="https://github.com/rekal-dev/rekal-cli/issues" className="hover:text-foreground transition-colors">Issues</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <div className="field" aria-hidden />
      <div className="stage" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <AgentsStrip />
        <Problem />
        <Team />
        <Benchmarks />
        <Compression />
        <Skills />
        <WhyNot />
        <Install />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
