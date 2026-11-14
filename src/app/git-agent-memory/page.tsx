import type { Metadata } from "next";
import Guide from "@/components/Guide";
import { DOCS } from "@/lib/marketing";
const title = "Git-backed team memory for coding agents";
const description =
  "How Rekal connects captured reasoning to code commits, shares eligible history through Git and rebuilds local search indexes across agents and teammates.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://rekal.dev/git-agent-memory" },
  openGraph: { title, description, url: "https://rekal.dev/git-agent-memory" },
  twitter: { title, description, card: "summary_large_image", images: ["/og-v2.png"] },
};
export default function Page() {
  return (
    <Guide
      title={title}
      intro="The repository already gives your team a way to distribute code. Rekal uses Git to distribute eligible project reasoning too."
    >
      <h2>Three places, three responsibilities</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Where</th>
              <th>What it holds</th>
              <th>Shared?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Local ledger</th>
              <td>
                Captured conversations and repository note revisions, plus
                bookkeeping.
              </td>
              <td>The database file itself is not pushed.</td>
            </tr>
            <tr>
              <th>Git transport branches</th>
              <td>
                Compressed eligible records on <code>rekal/&lt;email&gt;</code>.
              </td>
              <td>Yes, through your configured remote.</td>
            </tr>
            <tr>
              <th>Local search index</th>
              <td>
                Derived search data, embeddings, current prose and configured
                local note snapshots.
              </td>
              <td>No.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>A normal Git workflow</h2>
      <p>
        Initialize once. Commit to capture context. Push to export eligible
        records. A teammate runs <code>rekal sync</code> before searching the
        shared history. Transport uses separate branches, so captured memory is
        not appended to your code-commit messages and does not require rewriting
        product history.
      </p>
      <h2>The export boundary matters</h2>
      <p>
        Association with merged commits controls export eligibility. It does not
        classify individual sentences or guarantee that a session contains only
        merged work. Review source scope before capture and remote access before
        sharing. Secret redaction is best effort, not a guarantee that sensitive
        material can never be recorded.
      </p>
      <h2>Switching tools and working with multiple agents</h2>
      <p>
        Supported adapters normalize captured sessions into a common searchable
        record. The agent performing retrieval does not need to be the tool that
        originally produced the session. Notes keep source identity and scope,
        so a teammate’s observation remains attributable rather than silently
        replacing your working notes.
      </p>
      <p>
        Concurrent agents and machines can disagree. Retrieval supplies evidence
        for the consuming agent to assess; timestamps do not solve semantic
        conflicts or establish which statement is true.
      </p>
      <h2>Rebuildable does not mean everything is recoverable</h2>
      <p>
        The index is disposable when its sources are retained. A rebuild can
        restore search over captured ledger records and available files. It
        cannot restore deleted personal notes or remote records lost through an
        incompatible writer. Upgrade all writers of memory-bearing branches;
        read the migration guide before mixing versions.
      </p>
      <h2>Keep the interface small</h2>
      <pre>
        <code>
          {
            'rekal sync\nrekal "what did we learn about webhook retries?"\nrekal query --ref <returned-reference>'
          }
        </code>
      </pre>
      <p>
        Follow returned continuations for more context. Use current code and
        tests to confirm whether a historical decision still applies.
      </p>
      <p>
        <a href={`${DOCS}/usage.md`}>Usage and sharing details →</a> ·{" "}
        <a href={`${DOCS}/upgrading.md`}>Upgrade guide →</a>
      </p>
    </Guide>
  );
}
