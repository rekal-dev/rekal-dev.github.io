import Link from "next/link";
import Terminal from "@/components/Terminal";
import InstallCommand from "@/components/InstallCommand";
import GitHubButton from "@/components/GitHubButton";
import FadeIn from "@/components/FadeIn";
import SpotlightCard from "@/components/SpotlightCard";
import CountUp from "@/components/CountUp";
import Pipeline from "@/components/Pipeline";

function Nav() {
  const links = [
    { href: "#how", label: "How it works" },
    { href: "#skills", label: "Skills" },
    { href: "#why", label: "Why Rekal" },
    { href: "#install", label: "Install" },
  ];
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight">
          <span className="text-accent">❯</span>
          <span>rekal</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="https://github.com/rekal-dev/rekal-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-24 sm:pt-44">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <FadeIn>
          <span className="chip mb-7">
            <span className="chip-dot" />
            Beta · works with Claude Code
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="text-[2.6rem] leading-[1.08] sm:text-6xl font-bold tracking-tight mb-6">
            Your agent starts every
            <br className="hidden sm:block" /> session blank.{" "}
            <span className="gradient-text">Rekal is the
            <br className="hidden sm:block" /> memory it&apos;s missing.</span>
          </h1>
        </FadeIn>
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
              <a href="#how" className="btn btn-primary">
                See how it works
              </a>
              <GitHubButton />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.28}>
          <p className="text-xs font-mono text-faint tracking-wide mt-3">
            Cursor · Codex · Windsurf · Copilot — on the way
          </p>
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
    { name: "rekal-provenance", tag: "why-chain", d: "Artifact → commit → session → intent. Understand how any change was made, and why." },
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
              Read the skill docs →
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
            <div className="flex items-center justify-center gap-3">
              <a href="#install" className="btn btn-primary">Install Rekal</a>
              <GitHubButton />
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
        <CTA />
      </main>
      <Footer />
    </>
  );
}
