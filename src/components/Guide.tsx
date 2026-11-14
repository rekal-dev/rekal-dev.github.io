import Link from "next/link";
import type { ReactNode } from "react";
import { REPO } from "@/lib/marketing";
export default function Guide({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-border px-6 py-5">
        <nav
          className="max-w-4xl mx-auto flex flex-wrap justify-between gap-4"
          aria-label="Guide navigation"
        >
          <Link href="/" className="font-mono text-accent">
            ❯ rekal
          </Link>
          <Link href="/#install">Install Rekal</Link>
        </nav>
      </header>
      <main id="main" className="guide max-w-4xl mx-auto px-6 py-16">
        <p className="eyebrow">Rekal 2.0 guide</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4 mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted leading-relaxed">{intro}</p>
        {children}
        <aside className="card p-6 mt-12">
          <h2>Keep exploring</h2>
          <ul>
            <li>
              <Link href="/claude-code-memory">
                Claude Code memory and Rekal
              </Link>
            </li>
            <li>
              <Link href="/compare/claude-mem">Rekal vs Claude-mem</Link>
            </li>
            <li>
              <Link href="/git-agent-memory">Git-backed team memory</Link>
            </li>
            <li>
              <a href={`${REPO}/blob/main/docs/upgrading.md`}>Upgrade guide</a>
            </li>
          </ul>
        </aside>
      </main>
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
        <a href={REPO}>Rekal · Apache-2.0 · Source and documentation</a>
      </footer>
    </>
  );
}
