import downloads from "@/lib/download-metrics.json";
import type { Metadata } from "next";
import TerminalDemo from "@/components/TerminalDemo";
import Nav from "@/components/Nav";
import InstallCommand from "@/components/InstallCommand";
import GitHubButton from "@/components/GitHubButton";
import AgentsStrip from "@/components/AgentsStrip";
import { REPO, DOCS, FAQS, TITLE, DESCRIPTION } from "@/lib/marketing";
export const metadata: Metadata = {
  alternates: { canonical: "https://rekal.dev/" },
};
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Rekal",
      url: "https://rekal.dev/",
      description: DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS ARM64, Linux AMD64, Linux ARM64",
      license: "https://opensource.org/licenses/Apache-2.0",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      downloadUrl: `${REPO}/releases/latest`,
      sameAs: [REPO],
    },
    {
      "@type": "WebSite",
      name: "Rekal",
      url: "https://rekal.dev/",
      description: TITLE,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
export default function Home() {
  return (
    <>
      <div className="field" aria-hidden />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="px-5 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16 max-w-6xl mx-auto">
          <div className="grid gap-8 lg:gap-10">
          <div className="hero-intro">
          <p className="eyebrow mb-6">Git-backed memory for AI coding agents</p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.03] max-w-4xl">
            Carry the context
            <br />
            <span className="gradient-text">forward.</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl mt-7">
            Your project’s memory, across sessions, agents and teammates.
            Ask your agent to Rekal context from your team and past work
            for the task at hand.
          </p>
          <p className="mt-5 text-foreground">
            Captured with commits. Searchable locally. Shared through Git.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#install" className="btn btn-primary">
              Get started
            </a>
            <a href="#demo" className="btn">
              Watch the team handoff ↓
            </a>
          </div>
          <ul className="hero-proof" aria-label="Built for your existing workflow">
            <li>Apache-2.0</li><li>No Rekal subscription</li><li>No memory server</li>
          </ul>
          </div>
          <div id="demo" className="scroll-mt-20 min-w-0"><TerminalDemo /></div>
          </div>
        </section>
        <AgentsStrip />
        <section id="why" className="section-wrap">
          <p className="eyebrow">The reason to keep a record</p>
          <h2>
            Code records the change.
            <br />
            Keep the reasoning with it.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              [
                "Put past context to work",
                "Recover constraints, attempted fixes and rejected alternatives from earlier sessions.",
              ],
              [
                "Change agents, keep context",
                "Give the next tool access to the project record, including captured conversations from other supported agents.",
              ],
              [
                "Bring teammates up to speed",
                "Share eligible project history through the Git remote you already use. Teammates sync it into their own local index.",
              ],
            ].map(([h, p]) => (
              <article key={h} className="card p-6">
                <h3 className="text-lg font-semibold">{h}</h3>
                <p className="text-muted leading-relaxed mt-3">{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="memory" className="section-wrap border-t border-border">
          <p className="eyebrow">Works with the memory you already use</p>
          <h2>
            Your agent writes the notes.
            <br />
            Rekal keeps the trail.
          </h2>
          <p className="section-copy">
            Claude’s project memory is useful working context. Rekal
            captures its revisions alongside conversations, so a note can lead
            you back to the record. The agent decides what to read and what to
            conclude.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <article className="card p-6">
              <h3 className="font-semibold text-lg">
                Repository notes, preserved
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                Conventional Claude project memory is discovered by default at
                checkpoint time. The first successful scan records a baseline;
                later scans append changes or deletion markers.
              </p>
            </article>
            <article className="card p-6">
              <h3 className="font-semibold text-lg">Personal sources, local</h3>
              <p className="text-muted mt-3 leading-relaxed">
                Personal and account-wide sources are opt-in. Sources configured
                as local are searchable snapshots in the local index. They do
                not enter the shared ledger.
              </p>
            </article>
          </div>
          <p className="section-copy">
            Rekal does not intercept distillation or write back to native
            memory. A remembered note is context, not proof of current code
            behavior.
          </p>
          <div className="flex flex-wrap gap-5"><a className="text-accent" href="/claude-code-memory">Claude Code memory →</a><a className="text-accent" href="/codex-memory">Project memory for Codex →</a></div>
        </section>
        <section id="read" className="section-wrap border-t border-border">
          <p className="eyebrow">Agent first</p>
          <h2>Just ask your agent.</h2>
          <p className="section-copy">
            Ask your coding agent to Rekal the context it needs for the job.
            It searches your team’s shared history and your past work, reads
            the original sources and uses what matters for the task at hand.
          </p>
          <blockquote className="ask-agent-card mt-8">
            <span className="eyebrow">Your next prompt</span>
            <p>Please Rekal the context around invoice exports, then add date filters.</p>
          </blockquote>
          <p className="section-copy">
            Past decisions, project notes and original conversations stay within
            reach. Your agent checks the current code and decides what matters.
          </p>
          <details className="card p-5 my-6">
            <summary className="cursor-pointer text-sm text-muted">Prefer the CLI? See the commands</summary>
            <pre className="overflow-x-auto text-sm leading-8 mt-4"><code>{'rekal "invoice export conventions"\nrekal query --ref <returned-reference>'}</code></pre>
            <p className="text-sm text-muted mt-3">Follow returned continuations for more context. JSON and SQL are available for advanced use.</p>
          </details>
          <a className="text-accent" href={`${DOCS}/usage.md`}>
            Read the retrieval guide →
          </a>
        </section>
        <section id="team" className="section-wrap border-t border-border">
          <p className="eyebrow">Git is the transport</p>
          <h2>Project memory your team can own.</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              [
                "Commit → capture",
                "Append captured sessions and repository note revisions to the local ledger, associated with a code checkpoint.",
              ],
              [
                "Push → share",
                "Send eligible records on separate rekal/<email> branches. Your product branch and code commits stay intact.",
              ],
              [
                "Sync → recall",
                "Run rekal sync to bring teammates’ records into your own local search index. Embeddings and indexes stay local.",
              ],
            ].map(([h, p]) => (
              <article className="card p-6" key={h}>
                <h3 className="font-semibold">{h}</h3>
                <p className="text-muted mt-3 leading-relaxed">{p}</p>
              </article>
            ))}
          </div>
          <p className="section-copy">
            Sharing is gated by association with merged commits. That is an
            export rule, not a sentence-level privacy filter: captured sessions
            or notes can include context beyond the merged work. Redaction is
            best effort.
          </p>
          <a className="text-accent" href="/git-agent-memory">
            Understand storage, sharing and rebuilds →
          </a>
        </section>
        <section
          id="benchmarks"
          className="section-wrap border-t border-border"
        >
          <p className="eyebrow">Evidence, with the method attached</p>
          <h2>Measured retrieval. Inspectable results.</h2>
          <p className="section-copy">
            Historical agent evaluations reported these results. They are not a
            fresh answer-quality benchmark or a head-to-head comparison with
            Claude-mem.
          </p>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left">
              <caption className="sr-only">
                Historical Rekal agent benchmark results
              </caption>
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Answer accuracy</th>
                  <th>Recall@20</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>LoCoMo</th>
                  <td>90.57%</td>
                  <td>98.61%</td>
                </tr>
                <tr>
                  <th>LongMemEval</th>
                  <td>86.60%</td>
                  <td>99%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="section-copy">
            A separate 400-question LoCoMo diagnostic found complete annotated
            evidence coverage of 54.50% with multiple passages and 56.25% with
            passages plus extractive notes, using 17.9% more source text. It
            used no answer model, judge or Claude distillation. Evidence
            coverage is a different metric from answer accuracy.
          </p>
          <div className="flex flex-wrap gap-6 text-accent">
            <a href={`${DOCS}/research/RUN.md`}>
              Historical evaluation method →
            </a>
            <a
              href={`${DOCS}/research/runs/2026-11-14-locomo-memory/README.md`}
            >
              Diagnostic results and limits →
            </a>
          </div>
        </section>
        <section id="install" className="section-wrap border-t border-border">
          <p className="eyebrow">Start with one repository</p>
          <h2>Install once. Commit as normal.</h2>
          <div className="my-8">
            <InstallCommand />
          </div>
          <pre className="card p-6 overflow-x-auto leading-8">
            <code>
              {
                'export PATH="$HOME/.local/bin:$PATH"\nrekal version\ncd your-project\nrekal init\n# Work with your coding agent, then commit normally\nrekal "what did we change and why?"'
              }
            </code>
          </pre>
          <p className="section-copy">
            The PATH line makes Rekal available immediately in Bash or Zsh.
            In Fish, use <code>fish_add_path &quot;$HOME/.local/bin&quot;</code> instead.
          </p>
          <p className="section-copy">
            Your first search needs captured context. Already have local agent
            history in this repository? Run <code>rekal checkpoint</code> to
            capture it now, or <code>rekal sync</code> for history shared by
            teammates. Ask about your actual work, then open a returned source
            with <code>rekal query --ref &lt;returned-reference&gt;</code>.
            A new repository with no captured history can return no matches.
          </p>
          <p className="section-copy">
            Rekal is available for macOS ARM64 and Linux AMD64/ARM64.
          </p>
          <div className="flex flex-wrap gap-6 text-accent">
            <a href={`${REPO}/releases/latest`}>Downloads and checksums →</a>
            <a href="/install.sh">Inspect the installer →</a>
          </div>
        </section>
        <section id="faq" className="section-wrap border-t border-border">
          <p className="eyebrow">Practical questions</p>
          <h2>Before you connect your memory.</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer font-semibold">
                  {f.q}
                </summary>
                <p className="text-muted mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="section-wrap">
          <div className="ring-grad p-8 sm:p-12">
            <h2>Let the next agent start with the why.</h2>
            <p className="section-copy">
              Local search. A shared record. Your Git workflow.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a className="btn btn-primary" href="#install">
                Install Rekal
              </a>
              <GitHubButton />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-6 py-10">
        <div id="downloads" className="max-w-5xl mx-auto mb-7 text-sm text-muted">
          <a href="/download-metrics.json" className="inline-flex items-baseline gap-2" title="Release archive downloads, including repeats and tests; excludes checksum files">
            <strong className="text-2xl font-mono text-foreground">{downloads.archive_downloads.toLocaleString("en-US")}</strong>
            <span>downloads</span>
          </a>
          <p className="text-xs mt-2">Across all releases · updated {downloads.captured_at.slice(0, 10)} UTC · refreshed daily</p>
        </div>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 text-sm text-muted">
          <span className="font-mono text-accent">❯ rekal</span>
          <a href={REPO}>Source · Apache-2.0</a>
          <a href={`${DOCS}/usage.md`}>Docs</a>
          <a href="/paper">Research paper</a>
          <a href={`${REPO}/blob/main/SOUL.md`}>Design principles</a>
          <a href={`${REPO}/blob/main/SECURITY.md`}>Security</a>
        </div>
      </footer>
    </>
  );
}
