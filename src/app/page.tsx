import Terminal from "@/components/Terminal";
import InstallCommand from "@/components/InstallCommand";
import GitHubButton from "@/components/GitHubButton";
import FadeIn from "@/components/FadeIn";
import SpotlightCard from "@/components/SpotlightCard";
import CountUp from "@/components/CountUp";
import Pipeline from "@/components/Pipeline";
import Nav from "@/components/Nav";
import Magnetic from "@/components/Magnetic";

// Canonical home of the published paper. The /paper page on this site mirrors
// it with the abstract, an inline PDF, and BibTeX.
const PAPER_URL = "https://arxiv.org/abs/2607.14390";

function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-24 sm:pt-44">
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
              <span className="text-foreground">Zero preprocessing</span> · pure query-time inference{" "}
              <span className="text-accent">{'->'}</span>
            </span>
          </a>
        </FadeIn>
        <h1 className="text-[2.6rem] leading-[1.12] sm:text-6xl font-bold tracking-tight mb-6">
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
          <p className="text-lg text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            No preprocessing. No memory layers. No external service. <span className="text-foreground">Every query runs full inference locally</span> — lexical, graph, deep semantics, all at query time. Agents recall intent in seconds, with confidence. The why behind every change, stored in git.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center gap-4 mb-4">
            <InstallCommand />
            <div className="flex items-center gap-3">
              <Magnetic>
                <a href="#how" className="btn btn-primary">
                  See how it works
                </a>
              </Magnetic>
              <Magnetic>
                <GitHubButton />
              </Magnetic>
            </div>
            <p className="text-xs font-mono text-faint tracking-wide">
              Claude Code · Cursor · Copilot · Codex · Gemini · OpenCode. Zero preprocessing, pure query inference.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="relative z-10 w-full mt-16">
        <Terminal />
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="px-6 py-16">
      <Pipeline />
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <FadeIn>
      <p className="eyebrow text-center mb-4">{eyebrow}</p>
      <h2 className="text-3xl sm:text-[2.6rem] font-bold text-center tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-muted text-center max-w-xl mx-auto mt-4 leading-relaxed">{sub}</p>}
    </FadeIn>
  );
}

function Problem() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHead eyebrow="The gap" title="Code has git. Intent has nothing." />
        <FadeIn delay={0.1}>
          <p className="text-lg text-muted leading-relaxed mt-8">
            Every line, every author — recorded forever. But the reasoning behind the code has no
            ledger. The conversations where you and your AI weighed approaches, rejected
            alternatives, and decided vanish the moment the session ends. Next week a fresh agent
            re-proposes the exact thing you already threw away, because nothing remembers that you did.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg mt-6">
            <span className="text-foreground font-medium">Rekal is the ledger for the why.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

type HowRow = { cmd: string; d: string };

const DEV_ROWS: HowRow[] = [
  { cmd: "git commit", d: "Post-commit hook runs rekal checkpoint — the active AI session lands in an append-only local database." },
  { cmd: "git push", d: "Pre-push hook runs rekal push — only merged work is encoded (zstd + interning) onto your orphan branch. Unmerged spikes stay local." },
  { cmd: "rekal sync", d: "Pull teammates’ merged intent when you want it. Manual by design — you decide when to import team context." },
];

const AGENT_ROWS: HowRow[] = [
  { cmd: 'rekal "…"', d: "Full inference at query time: lexical (BM25) + graph embeddings (LSA) + deep retrieval (Nomic). No preprocessing. Scored JSON with turn, confidence, and provenance." },
  { cmd: "rekal --commit", d: "Graph-backed: anchor on a commit, walk to the session that produced it. Complete decision lineage, no memory layers." },
  { cmd: "--role human_steering", d: "Just the steering turns — mid-course corrections. Highest signal for intent, no noise, ~78 token answers." },
];

function HowColumn({ tone, title, rows, base }: { tone: string; title: string; rows: HowRow[]; base: number }) {
  return (
    <div>
      <FadeIn delay={base}>
        <h3 className="text-sm font-mono uppercase tracking-wider mb-5 flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs" style={{ background: `${tone}1a`, color: tone }}>▲</span>
          {title}
        </h3>
      </FadeIn>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <FadeIn key={r.cmd} delay={base + 0.06 * (i + 1)}>
            <SpotlightCard className="p-5 flex gap-4 items-start">
              <code className="shrink-0 mt-0.5 text-xs font-mono text-accent bg-accent/10 border border-accent/15 rounded-md px-2 py-1 whitespace-nowrap">{r.cmd}</code>
              <p className="text-sm text-muted leading-relaxed">{r.d}</p>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead
          eyebrow="How it works"
          title="You commit. Your agent recalls."
          sub="Two roles, one flow. Nothing to babysit — capture is automatic, recall is on demand."
        />
        <div className="grid md:grid-cols-2 gap-10 mt-14">
          <HowColumn tone="#4ade80" title="Developer" rows={DEV_ROWS} base={0.1} />
          <HowColumn tone="#22d3ee" title="Agent" rows={AGENT_ROWS} base={0.2} />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const substrates = [
    {
      name: "tree",
      tag: "grep · now",
      d: "Present-tense code questions. grep and read at HEAD. What does this function do, where is it defined, what files touch this pattern.",
    },
    {
      name: "knowledge",
      tag: "prose · HEAD",
      d: "What the team knows now. Conventions, docs, CLAUDE.md, architecture decisions at HEAD. Hybrid search returns scored pointers with confidence gates.",
    },
    {
      name: "map",
      tag: "structure",
      d: "How the repo is organized. A generated structural map, refreshed when stale. Breadth-and-shape orientation to the codebase.",
    },
    {
      name: "ledger",
      tag: "reasoning · past",
      d: "Why decisions were made. Reasoning behind commits: what was tried, what was rejected, the conversation that shaped the code. Progressive drill to full sessions.",
    },
  ];
  return (
    <section id="skills" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead
          eyebrow="The agent skill"
          title="One skill. Four substrates."
          sub="rekal init installs a single Claude Code skill — a router. It classifies each question and dispatches it to the right substrate. A silence gate ensures near-misses are ignored, never padded."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {substrates.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.07}>
              <SpotlightCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-3">
                  <code className="font-mono text-sm text-accent">{s.name}</code>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-faint border border-border rounded px-1.5 py-0.5">{s.tag}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
          <FadeIn delay={0.35}>
            <SpotlightCard
              as="a"
              href="https://github.com/rekal-dev/rekal-cli#agent-skill"
              className="p-6 h-full flex items-center justify-center text-sm text-muted hover:text-accent transition-colors"
            >
              Read the skill docs {'->'}
            </SpotlightCard>
          </FadeIn>
        </div>
        <FadeIn delay={0.4}>
          <p className="text-center font-mono text-xs text-faint mt-10 tracking-wide">
            grep for code that is · knowledge for prose that is · ledger for the why that was
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function WhyNot() {
  const rows = [
    { alt: "a MEMORY.md / notes file", gap: "Rots, hand-maintained, tied to one branch.", win: "Captured automatically at every commit. Immutable. Branch-aware." },
    { alt: "a RAG / memory SaaS", gap: "Your code’s intent lives on someone else’s server.", win: "Never leaves git and your machine. No server, no API, no telemetry." },
    { alt: "editor rules (Cursor/Copilot)", gap: "Per-user, per-editor, not shared history.", win: "Team-wide, editor-agnostic, travels with the repo." },
    { alt: "git log / git blame", gap: "Tell you what changed, never why.", win: "The conversation and reasoning behind the change." },
  ];
  return (
    <section id="why" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead eyebrow="Why Rekal" title="Why not just…?" />
        <div className="mt-14 space-y-3">
          {rows.map((r, i) => (
            <FadeIn key={r.alt} delay={i * 0.08}>
              <div className="card p-6 grid md:grid-cols-[1fr_1fr_1.2fr] gap-4 md:gap-6 md:items-center">
                <div className="font-mono text-sm text-foreground">
                  <span className="text-faint">instead of</span>
                  <br />
                  {r.alt}
                </div>
                <div className="text-sm text-muted flex items-start gap-2">
                  <span className="text-[#ff5f57] mt-0.5">✕</span>
                  {r.gap}
                </div>
                <div className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-green mt-0.5">✓</span>
                  {r.win}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  const beliefs = [
    { t: "Zero preprocessing", d: "No indexing pipeline. No embedding queue. No delays. Sessions stored raw, inference at query time." },
    { t: "Query-time inference", d: "Full search stack runs locally on demand: lexical + graph + deep semantics. No preprocessing overhead, ever." },
    { t: "Intent in git", d: "Decision ledger travels with the repo. No external service. No separate system. Team-wide, persistent." },
    { t: "Local-only", d: "No API calls, no external embeddings, no servers. Everything embedded in the binary. Privacy native." },
    { t: "Single binary", d: "Database, inference, graph engine, compression — all built in. Just init and commit. Zero config." },
    { t: "Agent-native", d: "Scored JSON, drill-down interface, silence gates, confidence, provenance. Built for agent consumption." },
  ];
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHead eyebrow="Beliefs" title="Opinionated by design" sub="Rekal is built on beliefs. When a choice conflicts with one, the choice loses." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {beliefs.map((b, i) => (
            <FadeIn key={b.t} delay={i * 0.06}>
              <SpotlightCard className="p-6 h-full">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 text-accent text-sm">✦</div>
                <h3 className="font-semibold mb-2">{b.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.d}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}


function Stats() {
  const stats = [
    { value: 7.5, prefix: "~", suffix: "K tokens", l: "Context per query", d: "Progressive drill-down: answer, then episodes, then full transcript. Agent controls token spend." },
    { value: 2, prefix: "~", suffix: "s", l: "Latency", d: "Complete search pipeline runs locally, no server roundtrips" },
    { value: 90.6, prefix: "", suffix: "%", l: "LoCoMo accuracy", d: "Beats SotA RAG. Confidence-gated routing. No hallucination padding." },
    { value: 1, prefix: "", suffix: "", l: "Binary", d: "Everything embedded — DB, model, inference, compression" },
  ];
  return (
    <section className="py-20 px-6 border-y border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeIn key={s.l} delay={i * 0.08}>
            <div className="text-center">
              <div className="text-4xl font-bold font-mono gradient-text tabular-nums">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-sm font-medium mt-2">{s.l}</div>
              <div className="text-xs text-faint mt-1 leading-snug">{s.d}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHead eyebrow="Get started" title="Single binary. Ten seconds." sub="Requirements: git, macOS or Linux. Nothing to configure." />
        <FadeIn delay={0.1}>
          <div className="flex justify-center mt-10 mb-6">
            <InstallCommand />
          </div>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div className="ring-grad inline-block text-left font-mono text-sm px-6 py-5 space-y-1">
            <p><span className="text-accent">❯</span> <span className="text-foreground">cd your-project</span></p>
            <p><span className="text-accent">❯</span> <span className="text-foreground">rekal init</span></p>
            <p className="text-faint pl-4"># done. commit and push as normal.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Which AI coding agents does Rekal work with?",
    a: "Rekal ships tested session adapters for Claude Code, Codex, Gemini, and OpenCode, and captures sessions from all of them automatically at every commit.",
  },
  {
    q: "Does my code or its intent leave my machine?",
    a: "No. Rekal never sends data to a server. Intent is stored on a git orphan branch — no server, no API, no telemetry — and the embedding model ships inside the binary.",
  },
  {
    q: "Why not just use a MEMORY.md file or a RAG SaaS?",
    a: "A notes file rots, is hand-maintained, and is tied to one branch; a memory SaaS puts your code’s intent on someone else’s server. Rekal captures context automatically at every commit, immutably and branch-aware, and keeps everything in git and on your machine.",
  },
  {
    q: "How does an AI agent recall past context with Rekal?",
    a: 'The agent runs rekal "<problem>", which returns scored prior sessions plus a knowledge block — pointers into the repo\'s prose at HEAD — as JSON, using hybrid search (BM25 + LSA + Nomic embeddings). A confidence gate then decides: read the knowledge pointer, drill into the episode, or stay silent.',
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.06}>
              <details className="card group px-6 py-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-medium list-none">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted leading-relaxed mt-4">{f.a}</p>
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
    <section className="pb-28 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="ring-grad glow-accent text-center px-8 py-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The CLI is free and local — forever.
            </h2>
            <p className="text-muted max-w-lg mx-auto leading-relaxed mb-8">
              No accounts, no telemetry, no plans to gate it. If teams eventually need dashboards or
              cross-org search, we&apos;ll build that on top. Until then, the CLI is the product.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Magnetic>
                <a href="#install" className="btn btn-primary">Install Rekal</a>
              </Magnetic>
              <Magnetic>
                <GitHubButton />
              </Magnetic>
            </div>
            <p className="text-xs font-mono text-faint leading-relaxed">
              The research behind it: &quot;Why Git Is the Memory Solution for the Agentic
              Development Lifecycle&quot; —{" "}
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground transition-colors underline underline-offset-4"
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
    <footer className="border-t border-border py-12 px-6">
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
          <a href="https://github.com/rekal-dev/rekal-cli/blob/main/docs/DEVELOPMENT.md" className="hover:text-foreground transition-colors">Docs</a>
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
        <Flow />
        <Problem />
        <Stats />
        <HowItWorks />
        <Skills />
        <WhyNot />
        <Beliefs />
        <Install />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
