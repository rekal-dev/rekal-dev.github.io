import type { Metadata } from "next";
import Guide from "@/components/Guide";
import { DOCS } from "@/lib/marketing";
const title = "Rekal vs Claude-mem: choosing agent memory";
const description =
  "Compare Git-backed project history with Claude-mem’s observation workflow. Understand source retrieval, native Claude notes, team sharing and local storage.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://rekal.dev/compare/claude-mem" },
  openGraph: {
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
    title,
    description,
    url: "https://rekal.dev/compare/claude-mem",
  },
  twitter: { title, description, card: "summary_large_image", images: ["/og-v2.png"] },
};
export default function Page() {
  return (
    <Guide
      title={title}
      intro="Both help agents reuse prior context. The useful choice is how you want memory captured, read and shared."
    >
      <p>
        Claude Code auto memory, Claude-mem and Rekal are three different
        things. Claude Code has native instructions and notes. Claude-mem is an
        independent open-source memory project. Rekal is a Git-backed project
        record with local retrieval.
      </p>
      <h2>Compare the working model</h2>
      <div className="overflow-x-auto">
        <table>
          <caption>Product models, reviewed 14 November 2026</caption>
          <thead>
            <tr>
              <th>Question</th>
              <th>Rekal</th>
              <th>Claude-mem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>How is context captured?</th>
              <td>
                Commit-time checkpoints of supported sessions and repository
                note revisions.
              </td>
              <td>
                Lifecycle hooks feed a worker that processes observations and
                summaries.
              </td>
            </tr>
            <tr>
              <th>What does the agent read?</th>
              <td>
                Conversation passages, labelled note revisions and current prose
                pointers; bounded source reads.
              </td>
              <td>
                Search results, timelines and observation details through
                progressive retrieval.
              </td>
            </tr>
            <tr>
              <th>Where does it live?</th>
              <td>
                A local ledger and rebuildable index. Eligible records travel
                through Git.
              </td>
              <td>
                A local SQLite database and worker; hosted sync is an additional
                offering.
              </td>
            </tr>
            <tr>
              <th>What is the team workflow?</th>
              <td>
                Push eligible history on separate per-author branches; teammates
                run sync.
              </td>
              <td>
                CMEM offers hosted sync and a TeamBrain pilot; consult its
                current scope.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>When Rekal is a good fit</h2>
      <p>
        Choose Rekal when the code repository is the natural boundary for shared
        reasoning. You want to recover why a change happened, inspect captured
        conversation evidence, and make that history available across supported
        coding tools. Local embeddings are the default, and no hosted memory
        account is required.
      </p>
      <h2>When your current memory may be enough</h2>
      <p>
        If Claude’s existing notes already give you the continuity you need,
        keep using them. If you prefer Claude-mem’s observation workflow and
        viewer, evaluate that experience directly. Adding Rekal makes sense when
        Git transport, commit association or cross-agent evidence retrieval
        solves a gap you actually have.
      </p>
      <h2>Can I use them together?</h2>
      <p>
        Rekal captures conventional Claude project notes without taking over
        note-writing. That is native Claude memory integration, not a Claude-mem
        database connector. Rekal does not provide bidirectional synchronization
        with Claude-mem or Mem0. Additional Markdown sources need explicit
        configuration.
      </p>
      <h2>No unsupported score comparisons</h2>
      <p>
        Rekal’s historical answer-accuracy results and recent evidence-coverage
        diagnostic measure different things. Neither establishes superiority
        over Claude-mem. A fair comparison needs the same questions, capture
        policy, answer model, judge and context budget.
      </p>
      <h2>Sources and boundaries</h2>
      <p>
        This comparison uses the projects’ public descriptions, not a joint
        benchmark or endorsement. Capabilities change; check the linked
        documentation before choosing.
      </p>
      <ul>
        <li>
          <a href="https://docs.claude-mem.ai/architecture/overview">
            Claude-mem architecture
          </a>
        </li>
        <li>
          <a href="https://cmem.ai/">CMEM product and team offering</a>
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/memory">
            Anthropic: Claude Code memory
          </a>
        </li>
        <li>
          <a href={`${DOCS}/design/native-memory.md`}>
            Rekal native memory contract
          </a>
        </li>
      </ul>
    </Guide>
  );
}
