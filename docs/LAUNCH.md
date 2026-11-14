# Rekal 2.0 web refresh

## Release status — 14 November 2026

v2.0.0 is published at commit `8b3dfe74793c860abf17a7e06e5903b7abf7bf2a`.
Release run 43550133449 succeeded; tag ancestry includes PRs #88, #89 and #90.
All three platform archives and checksums.txt are present. The downloaded Linux
AMD64 checksum matches, but execution on this environment fails because the
archive requires GLIBC 2.43. The website discloses this compatibility limitation;
full runtime verification remains blocked. Do not describe the release as fully
smoke-tested or disable its watch until this is resolved.

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
