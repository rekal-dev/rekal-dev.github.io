import type { Metadata } from "next";
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
      codeRepository: REPO,
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
        <section className="px-6 pt-36 pb-16 max-w-6xl mx-auto">
          <p className="eyebrow mb-6">Git-backed memory for AI coding agents</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.06] max-w-4xl">
            Carry the reasoning
            <br />
            <span className="gradient-text">forward.</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl mt-7">
            The decision. The rejected approach. The note that explains why.
            Keep them connected to your code, ready for the next agent and the
            next teammate.
          </p>
          <p className="mt-5 text-foreground">
            Capture at commit time. Search locally. Share through Git.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#install" className="btn btn-primary">
              Get started
            </a>
            <a href="#read" className="btn">
              See how recall works ↓
            </a>
          </div>
          <p className="text-sm text-muted mt-5">
            One binary · Local embeddings by default · Apache-2.0
          </p>
          <div className="card mt-14 overflow-hidden">
            <div className="border-b border-border px-6 py-3 text-xs font-mono text-muted">
              Illustrative workflow · the same project, a different agent
            </div>
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border">
                <p className="eyebrow">Yesterday · Claude Code</p>
                <h2 className="text-xl font-semibold mt-4">
                  “We tried fixed retries. They caused a thundering herd.”
                </h2>
                <p className="text-muted mt-4 leading-relaxed">
                  The discussion and project note are captured with the commit.
                  Eligible records travel on your next push.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="eyebrow">Today · Codex + a teammate</p>
                <h2 className="text-xl font-semibold mt-4">
                  “Why did we choose jittered backoff?”
                </h2>
                <p className="text-muted mt-4 leading-relaxed">
                  Sync the project history. Find the decision. Read the
                  conversation behind it before changing the design.
                </p>
              </div>
            </div>
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
                "Resume without re-investigating",
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
            Claude’s project memory is useful working context. Rekal 2.0
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
          <a className="text-accent" href="/claude-code-memory">
            How Claude Code memory works with Rekal →
          </a>
        </section>
        <section id="read" className="section-wrap border-t border-border">
          <p className="eyebrow">Agent first</p>
          <h2>Search. Read. Continue.</h2>
          <p className="section-copy">
            A small starting point, with detail on demand. Search returns
            conversation leads, matching notes and pointers to current project
            prose. Read the source you need; follow its continuation when you
            need more.
          </p>
          <div className="card p-6 sm:p-8 mt-8">
            <pre className="overflow-x-auto text-sm sm:text-base leading-8">
              <code>
                {
                  'rekal "why did we drop batching?"\n\n# Copy a reference returned by search\nrekal query --ref <returned-reference>\n\n# Follow the printed more: command to continue'
                }
              </code>
            </pre>
          </div>
          <p className="section-copy">
            References identify sources. Notes keep their source and scope
            labels. Add <code>--json</code> for programs; advanced evidence
            retrieval and SQL stay available when the task needs them.
          </p>
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
        <section id="compare" className="section-wrap border-t border-border">
          <p className="eyebrow">Choose the memory that fits your workflow</p>
          <h2>Already using Claude memory or Claude-mem?</h2>
          <p className="section-copy">
            Keep what works. Rekal’s focus is a Git-backed project record:
            original conversation evidence, native note revisions and retrieval
            across supported agents. You may not need another memory tool if
            your existing setup already covers your work.
          </p>
          <a className="btn btn-primary mt-5" href="/compare/claude-mem">
            Compare Rekal and Claude-mem →
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
            fresh 2.0 answer-quality benchmark or a head-to-head comparison with
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
                'cd your-project\nrekal init\n# Work and commit normally\nrekal "why did we choose this approach?"'
              }
            </code>
          </pre>
          <p className="section-copy">
            macOS ARM64 · Linux AMD64 and ARM64. The installer resolves the
            latest published release. Check the release page for version status
            before using the 2.0 read and native-memory workflow described here.
          </p>
          <p className="section-copy">
            Upgrading? Follow the migration guide and upgrade every writer of
            memory-bearing branches. No force push or code-commit rewrite is
            needed.
          </p>
          <div className="flex flex-wrap gap-6 text-accent">
            <a href={`${REPO}/releases/latest`}>Downloads and checksums →</a>
            <a href={`${DOCS}/upgrading.md`}>Upgrade guide →</a>
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
