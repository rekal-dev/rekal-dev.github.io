import type { Metadata } from "next";
import Guide from "@/components/Guide";
import { DOCS } from "@/lib/marketing";
const title = "Claude Code memory, with a Git-backed history";
const description =
  "Keep Claude’s native project notes and use Rekal to preserve revisions, search conversations and share eligible context across agents through Git.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://rekal.dev/claude-code-memory" },
  openGraph: {
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    title,
    description,
    url: "https://rekal.dev/claude-code-memory",
  },
  twitter: { title, description, card: "summary_large_image", images: ["/og-v2.png"] },
};
export default function Page() {
  return (
    <Guide
      title={title}
      intro="Claude can keep its own notes. Rekal adds a retained project record that another session, agent or teammate can search."
    >
      <h2>Keep the native memory workflow</h2>
      <p>
        Claude Code supports persistent instructions and auto memory. Rekal does
        not replace those mechanisms or decide what Claude should remember. It
        captures supported project note files and preserves their observed
        revisions alongside conversation history.
      </p>
      <h2>When does memory capture begin?</h2>
      <ol>
        <li>
          Install Rekal and run <code>rekal init</code> in the repository.
        </li>
        <li>
          Continue working with Claude Code. A commit triggers the checkpoint
          hook.
        </li>
        <li>
          The first successful memory scan records the existing notes as a
          baseline. Later checkpoints append changed revisions or deletion
          markers.
        </li>
        <li>
          Search with <code>rekal &quot;why did we choose this design?&quot;</code>. Read
          a returned reference with{" "}
          <code>rekal query --ref &lt;reference&gt;</code>.
        </li>
      </ol>
      <p>
        Discovery covers the conventional Claude project memory directory in the
        primary worktree. Custom memory locations require an explicit path.
        Missing default directories are quiet no-ops; Rekal does not invent a
        historical timeline for notes that existed before onboarding.
      </p>
      <h2>Which memory is shared?</h2>
      <p>
        Default repository notes follow the same merged-commit export gate as
        captured conversations. Configure personal sources as local if they
        should only be searchable on your machine. A nonempty source list
        replaces default discovery, so include the Claude project source if you
        want to keep it.
      </p>
      <pre>
        <code>
          {
            '{\n  "memory_sources": [\n    {"name": "claude-project", "adapter": "claude", "scope": "repo"},\n    {"name": "personal-notes", "adapter": "markdown", "scope": "local",\n     "path": "/absolute/path/to/personal/notes"}\n  ]\n}'
          }
        </code>
      </pre>
      <p>
        Merge this into <code>.rekal/config.json</code>. Settings stay local to
        the repository. Explicit local sources enter only the local index; their
        files remain the source of truth.
      </p>
      <h2>Read notes and evidence as different sources</h2>
      <p>
        A note can guide an investigation; it is not guaranteed to be correct.
        Search also returns captured conversation leads and pointers to current
        project prose. A note reference addresses that note or revision, not an
        inferred link to the exact conversation that caused Claude to write it.
        Follow available source references and commit associations to
        investigate.
      </p>
      <h2>History has limits</h2>
      <p>
        Repository note revisions retain observed changes. Observation time is
        not proof of when a fact became true. Personal local notes retain only
        the current searchable snapshot; rebuilding cannot restore a deleted
        native file. Rekal does not overwrite Claude’s files when you read or
        sync history.
      </p>
      <h2>Turn it off</h2>
      <p>
        Set <code>&quot;memory&quot;: false</code> in the repository’s Rekal
        configuration. This stops new native capture and local note indexing,
        but does not erase old ledger records or published copies.
      </p>
      <p>
        <a href={`${DOCS}/design/native-memory.md`}>
          Full configuration, timestamps, identity and privacy boundaries →
        </a>
      </p>
      <p>
        Native Claude behavior reference:{" "}
        <a href="https://code.claude.com/docs/en/memory">
          Anthropic’s memory documentation
        </a>
        . Reviewed 14 November 2026.
      </p>
    </Guide>
  );
}
