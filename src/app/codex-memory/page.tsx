import Link from "next/link";
import type { Metadata } from "next";
import Guide from "@/components/Guide";
import { DOCS } from "@/lib/marketing";
const title = "Project memory for Codex, across sessions and agents";
const description = "Use Rekal with Codex to find earlier coding conversations, read original decisions and bring eligible team history into a local index through Git.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://rekal.dev/codex-memory" },
  openGraph: { title, description, url: "https://rekal.dev/codex-memory", images: [{ url: "/og-v2.png", width: 1200, height: 630 }] },
  twitter: { title, description, card: "summary_large_image", images: ["/og-v2.png"] },
};
export default function Page() {
  return <Guide title={title} intro="Give a Codex session access to the reasoning already captured for the project—even when it came from Claude Code or a teammate.">
    <h2>Start with a question about the code</h2>
    <p>A retry policy is easy to see in a diff. The failed experiment behind it may only be in an earlier conversation. Rekal gives Codex a way to search that retained record and inspect the source before proposing a change.</p>
    <pre><code>{'rekal "why do webhook retries use jitter?"\nrekal query --ref <returned-reference>'}</code></pre>
    <p>Copy an actual reference returned by search. Results are source leads, not an authoritative answer. The agent still needs to compare historical reasoning with current files and tests.</p>
    <h2>Set up one repository</h2>
    <ol><li>Install a compatible Rekal binary using the <Link href="/#install">installation instructions</Link>.</li><li>Run <code>rekal init</code> in your repository. It installs hooks, the recall skill and supported instruction-file pointers.</li><li>Work with Codex and commit normally. The Codex adapter discovers supported local rollout transcripts for capture.</li><li>Run <code>rekal sync</code> to import eligible records that teammates have already pushed.</li></ol>
    <h2>What carries across from another agent?</h2>
    <p>Captured conversations and repository note revisions can be searched together after sync. Claude project note discovery is enabled by default; this does not mean every agent has the same native memory format or that Rekal writes notes back into Codex.</p>
    <p>Personal sources explicitly configured as local stay in the local index. Shared records travel on separate Rekal Git branches, subject to the export rules. A Git association is not a sentence-level privacy filter.</p>
    <h2>What if the history is missing?</h2>
    <p>Rekal can retrieve only retained records it has captured or imported. It cannot recreate a deleted transcript. Check capture and sync status before treating an empty search as evidence that a discussion never happened.</p>
    <p>See the <a href={`${DOCS}/usage.md`}>capture and retrieval guide</a>, <a href="/claude-code-memory">Claude memory integration</a> and <a href="/git-agent-memory">team sharing model</a>.</p>
  </Guide>;
}
