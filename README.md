# Rekal website

Source for [rekal.dev](https://rekal.dev), built with Next.js static export and deployed through GitHub Pages. The CLI lives in [rekal-dev/rekal-cli](https://github.com/rekal-dev/rekal-cli).

## Develop and verify

Use Node 22, then `npm ci`, `npm run dev`. Before publishing, run:

```sh
npm run build
python3 scripts/check-marketing.py
```

`out/` is the deployment artifact. The Pages workflow runs on main. The World Cup Math application and research paper are separate existing routes; preserve them when changing the marketing site.

## Content contract

- Positioning: **Carry the reasoning forward.** Git-backed project history, local retrieval, original conversation evidence and native note revisions.
- Everyday agent interface: search → read a returned reference → follow its continuation. SQL and advanced retrieval remain secondary.
- Distinguish session adapters from native note discovery. Claude project notes default on; other sources need configuration.
- Git export is gated by commit association, not semantic classification of every sentence. Local note sources remain index-only. Never claim all data stays on the machine.
- The CLI has no usage telemetry. The website uses analytics; do not conflate them.
- Describe Claude Code native memory and the independent Claude-mem project separately. Review their primary sources when updating comparisons.
- Historical answer accuracy, retrieval recall and evidence coverage are separate metrics. Publish methodology links; no unsupported head-to-head superiority or token-saving percentage.
- Do not advertise an unpublished binary as available. Verify release assets before changing version-specific installation or availability text.

## Search and sharing

Each guide has its own title, description, canonical URL and social metadata. Shared defaults live in `src/lib/marketing.ts`; homepage FAQ text also generates its structured data. Actual page content is exported in HTML without waiting for JavaScript. Update `public/sitemap.xml` when adding routes. `public/og-v2.png` is the social image.

Search landing pages answer real questions:

- `/claude-code-memory`: native notes, capture, privacy, configuration and references.
- `/compare/claude-mem`: workflow comparison, fit, limits and primary sources.
- `/git-agent-memory`: team transport, ownership and rebuild boundaries.

SEO work improves crawlability and relevance; it does not guarantee rankings. After deployment, inspect these URLs in the owner's Search Console, submit the sitemap and measure impressions/clicks before making further changes.
