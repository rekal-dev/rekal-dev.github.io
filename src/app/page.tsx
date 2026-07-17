import Terminal from "@/components/Terminal";
import InstallCommand from "@/components/InstallCommand";
import GitHubButton from "@/components/GitHubButton";
import FadeIn from "@/components/FadeIn";
import SpotlightCard from "@/components/SpotlightCard";
import CountUp from "@/components/CountUp";
import Pipeline from "@/components/Pipeline";
import Nav from "@/components/Nav";
import Magnetic from "@/components/Magnetic";

const PAPER_URL = "https://arxiv.org/abs/2607.14390";
const PAPER_PDF_URL = "https://arxiv.org/pdf/2607.14390";

function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-24 sm:pt-44">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <FadeIn>
          <span className="chip mb-7 bg-green/10 border border-green/30 hover:border-green/50 transition-colors cursor-pointer">
            <span className="chip-dot" style={{ backgroundColor: "#22c55e" }} />
            <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
              Research published on arXiv
            </a>
          </span>
        </FadeIn>
        <h1 className="text-[2.6rem] leading-[1.12] sm:text-6xl font-bold tracking-tight mb-6">
          <span className="reveal-clip">
            <span className="reveal-line">Your agent starts every</span>
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
            The <span className="text-foreground">why</span> behind your code — decisions, rejected paths,
            the dead-ends your team already ruled out — captured at every commit and recalled next
            session. Stored in git, not someone else&apos;s cloud.
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
            <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-faint hover:text-accent transition-colors tracking-wide">
              Read the paper on arXiv {'->'}
            </a>
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
  { cmd: 'rekal "…"', d: "Three-signal hybrid search (BM25 + LSA + Nomic). Scored JSON with the best-matching turn for progressive drill-down." },
  { cmd: "rekal --commit", d: "Anchor on a commit and walk back to the session that produced it — the why-chain behind any change." },
  { cmd: "--role human_steering", d: "Return only the mid-course corrections — the highest-signal turns for intent and unstated preferences." },
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
  const skills = [
    { name: "rekal", tag: "search", d: "The base skill — search and progressively drill. The entry point the rest build on." },
    { name: "rekal-provenance", tag: "why-chain", d: "Artifact &rarr; commit &rarr; session &rarr; intent. Understand how any change was made, and why." },
    { name: "rekal-reflect", tag: "self-learning", d: "Mine your own steering corrections into explicit rules, so a mistake happens once." },
    { name: "rekal-distill", tag: "map", d: "Read memory as four libraries — context, decision, rules, boundary — and zoom a topic." },
    { name: "rekal-census", tag: "full scan", d: "Exhaustively summarise a bounded slice of the whole corpus. Coverage, not relevance." },
  ];
  return (
    <section id="skills" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead
          eyebrow="Agent skills"
          title="Playbooks, not just a search box"
          sub="rekal init installs a suite of Claude Code skills, so the agent reaches for the right memory workflow on its own."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {skills.map((s, i) => (
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
              href="https://github.com/rekal-dev/rekal-cli#agent-skills"
              className="p-6 h-full flex items-center justify-center text-sm text-muted hover:text-accent transition-colors"
            >
              Read the skill docs {'->'}
            </SpotlightCard>
          </FadeIn>
        </div>
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
    { t: "Immutable", d: "Append-only wire format. No byte is modified after it is written. The record is the record." },
    { t: "Intent next to code", d: "Distributed through git orphan branches. No sync server. Works with any remote." },
    { t: "Thin on the wire", d: "A multi-MB session becomes a few hundred bytes. Indexes and embeddings are computed locally." },
    { t: "Secure by design", d: "No external calls. The embedding model ships inside the binary. No API keys, no accounts." },
    { t: "Simple", d: "One binary, everything embedded — database engine, embedding model, compression dictionary." },
    { t: "Agent first", d: "Three-signal ranking, structured JSON, progressive drill-down. The agent owns its token budget." },
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

function Research() {
  const answers = [
    {
      problem: "Where does training signal come from?",
      lit: "Human annotation, or LLM judges grading themselves",
      git: "the commit",
      how: "Every commit labels the sessions that produced it. Ground truth is mined from structure the tool already records — never annotated.",
    },
    {
      problem: "How does compiled memory stay fresh?",
      lit: 'Consolidation daemons; maintenance "deferred to future work"',
      git: "rebuild + diff",
      how: "The index is disposable — freshness by deletion. Materialized views regenerate deterministically, so drift arrives as a reviewable diff.",
    },
    {
      problem: "Who verifies what enters shared memory?",
      lit: "Self- or consensus-judged admission",
      git: "the merge",
      how: "Only experience that survived review, CI, and merge reaches the team. The verifier is external, and it already exists.",
    },
    {
      problem: "How does private memory cross a boundary?",
      lit: "One pool, implicitly readable and writable everywhere",
      git: "the review",
      how: "Cross-repo memory is index-only and structurally unpushable. Its one egress is a wiki page on a PR — origins labeled, reviewer watching.",
    },
  ];

  const results = [
    { metric: "≈60×", label: "best retrieval vs grep floor", d: "Five ranking mechanisms tested; two kept. Pooled MRR ≈0.31 across eight corpora." },
    { metric: "0.83", label: "answer sufficiency", d: "Decision synthesis reconstructs why-arcs across sessions. Raw retrieval scores only 0.07–0.20." },
    { metric: "382–980", label: "tokens per answer", d: "Router dispatches to structural map, episodes, and synthesis. Three orders of magnitude below the full transcript." },
    { metric: "zero", label: "labeling cost", d: "Ground truth mined from commit–session links. Reproducible on any Rekal user's own history." },
  ];

  return (
    <section id="paper" className="py-28 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHead
          eyebrow="Research"
          title="Why Git Is the Memory Solution for the Agentic Development Lifecycle"
          sub="Four problems the agent-memory literature treats as open research. Four git primitives your team already uses. The paper argues they are the same list — then measures it."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-14">
          {answers.map((a, i) => (
            <FadeIn key={a.git} delay={i * 0.07}>
              <SpotlightCard className="p-6 h-full">
                <div className="text-xs font-mono text-faint mb-2">{a.problem}</div>
                <div className="text-sm text-muted line-through decoration-border mb-3">{a.lit}</div>
                <h3 className="font-semibold mb-2">
                  <span className="text-accent font-mono">{'->'} {a.git}</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">{a.how}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        <div className="mt-20">
          <FadeIn>
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted mb-6">Empirical results</h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {results.map((r, i) => (
              <FadeIn key={r.metric} delay={0.05 + i * 0.07}>
                <SpotlightCard className="p-6">
                  <div className="font-mono text-2xl font-bold text-accent mb-2">{r.metric}</div>
                  <div className="text-sm font-medium mb-2">{r.label}</div>
                  <p className="text-xs text-muted leading-relaxed">{r.d}</p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.35}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted max-w-2xl leading-relaxed">
              RekalBench — self-labeled, repo-grounded intent recall — measures retrievability,
              token cost, drill strategies, and whether a materialized wiki layer earns its keep.
              Fully local, runnable by any Rekal user on their own store. Every result is replicable
              at zero labeling cost.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Magnetic>
                <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read on arXiv
                </a>
              </Magnetic>
              <Magnetic>
                <a href={PAPER_PDF_URL} target="_blank" rel="noopener noreferrer" className="btn">
                  Download PDF
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/rekal-dev/rekal-cli/tree/main/docs/research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Research details
                </a>
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 1, prefix: "", suffix: "", l: "Binary", d: "Everything embedded — DB, model, compression" },
    { value: 0, prefix: "", suffix: "", l: "Servers", d: "Data never leaves git and your machine" },
    { value: 0, prefix: "", suffix: "", l: "API keys", d: "The embedding model ships in the binary" },
    { value: 300, prefix: "~", suffix: "B", l: "On the wire", d: "A full session, after zstd + interning" },
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
    a: 'The agent runs rekal "<problem>", which returns scored prior context as JSON using a three-signal hybrid search (BM25 + LSA + Nomic embeddings), then drills into the exact session and turns it needs.',
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
            <div className="space-y-3">
              <p className="text-xs font-mono text-faint">
                Research published:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
                <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors font-medium underline underline-offset-4">
                  arXiv:2607.14390
                </a>
                <span className="hidden sm:inline text-faint">•</span>
                <span className="text-faint italic">
                  &quot;Why Git Is the Memory Solution for the Agentic Development Lifecycle&quot;
                </span>
              </div>
            </div>
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
        <Research />
        <Install />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
