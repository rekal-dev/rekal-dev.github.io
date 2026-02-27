import Terminal from "@/components/Terminal";
import InstallCommand from "@/components/InstallCommand";
import FadeIn from "@/components/FadeIn";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="font-mono text-lg font-bold tracking-tight text-foreground">
          rekal
        </a>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
            How it works
          </a>
          <a href="#install" className="text-sm text-muted hover:text-foreground transition-colors">
            Install
          </a>
          <a
            href="https://discord.gg/eNNabp4b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            Discord
          </a>
          <a
            href="https://github.com/rekal-dev/rekal-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-dim)_0%,_transparent_70%)] opacity-[0.07]" />
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <FadeIn>
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">
            Open Source · Apache 2.0
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            The <span className="text-accent">why</span> behind every
            <br />line of code
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-muted max-w-xl mx-auto mb-8">
            Git-anchored intent ledger with built-in RAG. Your agent starts every session knowing exactly why — with minimal token cost.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <InstallCommand />
        </FadeIn>
      </div>
      <Terminal />
    </section>
  );
}

function Problems() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase text-center">
            Two problems
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight">
            Everything flows from them
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-8 h-full">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <span className="text-accent text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Intent has no ledger</h3>
              <p className="text-muted leading-relaxed">
                Code has git. Every line, every change, every author — recorded forever.
                But the reasoning behind the code has nothing. The conversations where
                decisions were made vanish the moment the session ends.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                The code says <span className="text-foreground font-medium">what</span>.
                The intent says <span className="text-foreground font-medium">why</span>.
                And the why has no permanent record.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-8 h-full">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <span className="text-accent text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Agents can&apos;t remember</h3>
              <p className="text-muted leading-relaxed">
                An AI agent starts every session blank. It reads the code but doesn&apos;t
                know why it looks the way it does. It doesn&apos;t know what was tried and
                rejected last week.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                Humans have institutional memory — imperfect, but real.
                Agents have <span className="text-foreground font-medium">none</span>.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "25:1", label: "Compression ratio", detail: "19 MB → 757 KB on the wire" },
    { value: "~200ms", label: "Search latency", detail: "At 14k turns, three-signal hybrid" },
    { value: "0", label: "External dependencies", detail: "Single binary, everything embedded" },
    { value: "0", label: "API calls", detail: "Embedding model ships in the binary" },
  ];

  return (
    <section className="py-24 px-6 border-y border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent font-mono">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
              <div className="text-xs text-muted mt-1">{stat.detail}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase text-center">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight">
            Two personas, one flow
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-16">
            You commit and push as normal. Your agent recalls what it needs.
          </p>
        </FadeIn>

        {/* Developer touchpoints */}
        <FadeIn delay={0.1}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center">
              <span className="text-green text-sm">&#9654;</span>
            </span>
            Developer touchpoints
          </h3>
        </FadeIn>
        <div className="space-y-4 mb-12">
          <FadeIn delay={0.15}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5">git commit</code>
              <p className="text-sm text-muted">
                Post-commit hook runs <code className="text-accent text-xs bg-accent/10 px-1.5 py-0.5 rounded">rekal checkpoint</code> — snapshots your active AI session into an append-only local database.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5">git push</code>
              <p className="text-sm text-muted">
                Pre-push hook runs <code className="text-accent text-xs bg-accent/10 px-1.5 py-0.5 rounded">rekal push</code> — encodes only your data into compact wire format (zstd + string interning) and pushes to your orphan branch.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5">rekal sync</code>
              <p className="text-sm text-muted">
                Pull your team&apos;s session data from remote. Intentionally manual — you decide when to import team context.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Agent touchpoints */}
        <FadeIn delay={0.3}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-accent text-sm">&#9654;</span>
            </span>
            Agent touchpoints
          </h3>
        </FadeIn>
        <div className="space-y-4">
          <FadeIn delay={0.35}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5 whitespace-nowrap">rekal &quot;query&quot;</code>
              <p className="text-sm text-muted">
                Three-signal hybrid search (BM25 + LSA + Nomic). Returns scored JSON with the best-matching turn index for progressive drill-down.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5 whitespace-nowrap">rekal query</code>
              <p className="text-sm text-muted">
                Drill into a session with <code className="text-accent text-xs bg-accent/10 px-1.5 py-0.5 rounded">--offset</code> and <code className="text-accent text-xs bg-accent/10 px-1.5 py-0.5 rounded">--limit</code> for pagination, or <code className="text-accent text-xs bg-accent/10 px-1.5 py-0.5 rounded">--role human</code> for intent only. Full session when needed.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="rounded-xl border border-border bg-card p-5 flex gap-5 items-start">
              <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded shrink-0 mt-0.5 whitespace-nowrap">rekal --file</code>
              <p className="text-sm text-muted">
                Scoped search filtered by file path. The agent controls how much context it loads — minimal tokens by default.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  const beliefs = [
    { title: "Immutable", desc: "Append-only wire format. No byte is ever modified after written. The record is the record." },
    { title: "Intent next to code", desc: "Distributed through git orphan branches. No sync server. Works with any remote." },
    { title: "Thin on the wire", desc: "A 2–10 MB session becomes ~300 bytes. Indexes and embeddings computed locally." },
    { title: "Secure by design", desc: "No external calls. Embedding model ships inside the binary. No API keys. No accounts." },
    { title: "Simple", desc: "Single binary, everything embedded. Database engine, embedding model, compression — one file." },
    { title: "Agent first", desc: "Three-signal ranking. Structured JSON output. The agent controls the token budget." },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase text-center">
            Beliefs
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight">
            Opinionated by design
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="py-32 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Get started
          </h2>
          <p className="text-muted mb-8">
            Single binary. Zero dependencies. Takes 10 seconds.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-6">
            <InstallCommand />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="font-mono text-sm text-muted space-y-1">
            <p>cd your-project</p>
            <p>rekal init</p>
            <p className="text-accent"># done. commit and push as normal.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Enterprise() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <div className="rounded-xl border border-border bg-card p-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              The CLI is free and local — forever.
            </h2>
            <p className="text-muted max-w-lg mx-auto leading-relaxed">
              No plans for enterprise yet. If Rekal gets adoption and teams need dashboards,
              analytics, or cross-repo search — we&apos;ll build it. Until then, the CLI is the product.
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
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-foreground">rekal</span>
          <span className="text-xs text-muted">Apache-2.0</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href="https://github.com/rekal-dev/rekal-cli" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://discord.gg/eNNabp4b" className="hover:text-foreground transition-colors">
            Discord
          </a>
          <a href="https://github.com/rekal-dev/rekal-cli/issues" className="hover:text-foreground transition-colors">
            Issues
          </a>
          <a href="https://github.com/rekal-dev/rekal-cli/blob/main/docs/DEVELOPMENT.md" className="hover:text-foreground transition-colors">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <Stats />
        <HowItWorks />
        <Beliefs />
        <Install />
        <Enterprise />
      </main>
      <Footer />
    </>
  );
}
