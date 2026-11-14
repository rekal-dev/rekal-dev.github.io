# Rekal 2.0 web refresh

## Release status — 14 November 2026

v2.0.1 is published at commit `986450cbf1ac428066131d229ceafd1f04200906`.
Release run 43554344827 passed validation, all three builds, both Linux baseline
container contract suites and archive checksums. Linux builds use Ubuntu 24.04
and reject GLIBC symbol requirements above 2.39. The older v2.0.0 AMD64 binary
required GLIBC 2.43; its immutable assets remain unchanged.

The website's main branch deploys automatically through GitHub Pages.

## Search intent

| Page | Reader's question | Next step |
|---|---|---|
| Home | How do agents retain project reasoning? | Install in one repository |
| Claude Code memory | What does Rekal add to native notes? | Read boundaries and configure sources |
| Claude-mem comparison | Which memory workflow fits me? | Compare source models and setup |
| Git agent memory | How can teammates own and share history? | Review transport and migration |

Do not add near-duplicate pages for keyword variations or unsupported product
comparisons. Keep each page useful independently and link to primary sources.

## Verify before merging

1. `npm ci` and `npm run build`.
2. `python3 scripts/check-marketing.py` checks rendered HTML and local links.
3. Check desktop/mobile layouts, keyboard navigation, install copying and guides.
4. Review release availability text and compare it with the actual published tag.
5. Deploy via the existing GitHub Pages workflow and check its final status.

## Measure after deployment

Use the owner's verified Google Search Console property. Submit
`https://rekal.dev/sitemap.xml`, inspect the new canonical URLs and check indexing.
If ownership is not configured, complete Google's verification using the actual
provided token; do not invent one. No Search Console submission has been made by
this code change.

Compare non-brand impressions, relevant query clicks and landing-page engagement
over the next several weeks. Search rankings and rich-result eligibility are not
guaranteed. The visible FAQ and structured FAQ data share one source; this prevents
content drift but does not promise Google will show a FAQ rich result.

The social card is `/og-v2.png`. Existing shares may cache old metadata. Do not
post announcements until the release and website are actually available.
