"""Validate exported marketing routes, metadata, structured data and local links."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1] / "out"
ROUTES = ["/", "/compare/claude-mem", "/claude-code-memory", "/git-agent-memory"]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.canonical = []
        self.descriptions = []
        self.links = []
        self.ids = set()
        self.in_schema = False
        self.schemas = []
        self.buffer = ""
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1": self.h1 += 1
        if "id" in a: self.ids.add(a["id"])
        if tag == "link" and a.get("rel") == "canonical": self.canonical.append(a["href"])
        if tag == "meta" and a.get("name") == "description": self.descriptions.append(a["content"])
        if tag == "a" and "href" in a: self.links.append(a["href"])
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_schema = True
            self.buffer = ""
    def handle_data(self, data):
        if self.in_schema: self.buffer += data
    def handle_endtag(self, tag):
        if tag == "script" and self.in_schema:
            self.schemas.append(json.loads(self.buffer))
            self.in_schema = False

def file_for(route):
    if route == "/": return ROOT / "index.html"
    p = ROOT / route.lstrip("/")
    return next((f for f in (p, p.with_suffix(".html"), p / "index.html") if f.is_file()), p)

pages = {}
for route in ROUTES:
    page = Page()
    page.feed(file_for(route).read_text())
    assert page.h1 == 1, (route, "expected one h1")
    assert page.canonical == ["https://rekal.dev" + route.rstrip("/")], (route, page.canonical)
    assert len(page.descriptions) == 1 and page.descriptions[0], route
    pages[route] = page
assert len({p.descriptions[0] for p in pages.values()}) == len(ROUTES)
for route, page in pages.items():
    for link in page.links:
        u = urlsplit(link)
        if u.scheme or u.netloc: continue
        target = u.path or route
        assert target.startswith("/"), (route, link, "use rooted links")
        assert file_for(target).is_file(), (route, link, "missing target")
        if u.fragment and target in pages:
            assert u.fragment in pages[target].ids, (route, link, "missing anchor")
main = pages["/"]
schemas = main.schemas[0]["@graph"]
faq = next(s for s in schemas if s["@type"] == "FAQPage")
html = file_for("/").read_text()
assert len(faq["mainEntity"]) == 7
assert "90.57%" in html and "56.25%" in html
assert (ROOT / "og-v2.png").is_file()
for route in ROUTES:
    assert "https://rekal.dev" + route in (ROOT / "sitemap.xml").read_text()
print("PASS: exported marketing metadata, headings, schema, links, anchors, metrics and sitemap")
