# Rekal — SEO & launch checklist

Two things to finish wiring the site for search + social. Each ends with
"hand back to Claude" — the exact value to paste so the change gets made and
deployed.

---

## 1. Google Search Console (indexing + search data)

Proves you own rekal.dev so Google reports impressions, clicks, and crawl
status, and lets you submit the sitemap.

### Steps
1. Go to **https://search.google.com/search-console** and sign in.
2. Click **Add property** → choose the **"URL prefix"** box (not "Domain").
3. Enter `https://rekal.dev` → **Continue**.
4. Expand the **"HTML tag"** verification method. It shows a line like:
   ```html
   <meta name="google-site-verification" content="AbC123_xxxxxxxxxxxxxxxxxx" />
   ```
5. Copy **only the `content="..."` value** (the token). That's what to hand back.
6. **Do NOT click "Verify" yet** — the tag has to be live on the site first.

### Hand back to Claude
> "Google token: `AbC123_xxxxxxxxxxxxxxxxxx`"

Claude adds it to `src/app/layout.tsx` (`verification: { google: "..." }`),
deploys, and tells you when it's live. **Then** you click **Verify** in Search
Console.

### After verifying
- In Search Console → **Sitemaps** → submit `sitemap.xml`
  (full URL: `https://rekal.dev/sitemap.xml`). Already live on the site.
- Indexing takes days to weeks — normal. Check back in "Pages" and
  "Performance".

---

## 2. X / Twitter (share cards)

The link already unfurls with a branded card (the OG image is built and live).
Two optional extras:

### a) Attribution (credits your account on shared links) — needs a handle
If you have (or make) an X account for Rekal, the card can show
"@yourhandle". Otherwise skip — the card works without it.

**Hand back to Claude**
> "X handle: `@rekaldev`"   *(or)*   "No X handle"

Claude adds `twitter:site` / `twitter:creator` meta and deploys.

### b) Preview the card before posting
X removed its old Card Validator. Now:
- **Quickest:** paste `https://rekal.dev` into a tweet compose box (don't
  post) — the image + title preview below it.
- **Or** paste the URL into **https://www.opengraph.xyz** or
  **https://metatags.io** — renders every platform's preview at once.

### c) If the preview looks stale (old bare text, no image)
That's X's scraper cache, not a bug. It refreshes within ~a day. To force a
fresh fetch once, share `https://rekal.dev/?v=1` (any throwaway query string).

### d) Posting the launch
Ask Claude to **"draft the launch tweet"** — you'll get a hook + the card +
install line, ready to paste. Best paired with the demo GIF once it exists.

---

## Quick reference — what to paste back to Claude

| Item | What to send |
|------|--------------|
| Google verification | `Google token: <the content value>` |
| X attribution | `X handle: @...`  or  `No X handle` |
| Launch tweet | `draft the launch tweet` |

Nothing here is blocking — the site is already live, SEO-optimized, and
sharing a real card. These just add search-console visibility and X
attribution.
