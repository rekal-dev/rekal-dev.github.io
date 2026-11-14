export const REPO = "https://github.com/rekal-dev/rekal-cli";
export const DOCS = `${REPO}/blob/main/docs`;
export const TITLE = "Rekal — AI coding agent memory for Claude Code & Codex";
export const DESCRIPTION =
  "Keep project memory across Claude Code, Codex and your team. Search past coding conversations and native notes locally, read original sources, and share via Git.";
export const FAQS = [
  {
    q: "What does Rekal add when my agent already has memory?",
    a: "Your agent keeps writing its own notes. Rekal preserves captured conversations and repository note revisions with Git checkpoints, so another session, tool or teammate can retrieve the evidence. It does not write back to native memory files.",
  },
  {
    q: "Which agents does Rekal support?",
    a: "Session capture supports Claude Code, Cursor, Copilot, Codex, Gemini, Kiro and OpenCode. Native note discovery defaults to Claude project memory. Other Markdown note sources require configuration; session capture and note discovery are different capabilities.",
  },
  {
    q: "Is Claude-mem the same as Claude Code memory?",
    a: "No. Claude Code has its own instruction files and auto memory. Claude-mem is a separate open-source memory project. Rekal adds a Git-backed record and source retrieval; it does not require either a Claude-mem installation or a hosted memory account.",
  },
  {
    q: "What is shared with my team?",
    a: "Eligible captured conversations and repository note revisions travel through your Git remote on separate Rekal branches. Export is gated by association with merged commits. A commit association does not guarantee every captured sentence concerns merged work. Explicit local note sources remain index-only.",
  },
  {
    q: "Does my memory leave my machine?",
    a: "Capture, search and default embeddings run locally. Git push sends eligible records to your configured remote. An explicitly configured HTTP embedding backend receives text. Rekal CLI has no usage telemetry; this website uses analytics.",
  },
  {
    q: "How do I disable native memory capture?",
    a: 'Set "memory": false in .rekal/config.json. This stops new native capture and local note indexing. It does not erase previously captured or published repository notes.',
  },
  {
    q: "Can I upgrade without rewriting Git history?",
    a: "Yes. No force push or code-commit rewrite is required. Upgrade all writers of memory-bearing branches and follow the upgrade guide. The index can be rebuilt from retained records; reindexing cannot recover deleted native files or records dropped by an incompatible writer.",
  },
];
