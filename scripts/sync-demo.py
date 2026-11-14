"""Sync the canonical CLI demo into the website; never fetch at runtime."""
import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]) / "scripts/docs/demo-story.json"
raw = source.read_text()
story = json.loads(raw)
if not isinstance(story, list) or len(story) != 2:
    raise ValueError("Expected two demo participants")
for person in story:
    for field in ("name", "agent", "label"):
        if not isinstance(person.get(field), str) or not person[field].strip():
            raise ValueError(f"Missing participant {field}")
    rows = person.get("rows")
    if not isinstance(rows, list) or not rows:
        raise ValueError("Expected demo rows")
    previous = -1
    for row in rows:
        at = row.get("at")
        if type(at) not in (int, float) or not 0 <= at <= 300 or at < previous:
            raise ValueError("Demo timestamps must be ordered seconds between 0 and 300")
        previous = at
        if row.get("kind") not in ("prompt", "answer", "tool", "status"):
            raise ValueError("Unknown demo row kind")
        if not isinstance(row.get("text"), str) or not row["text"].strip():
            raise ValueError("Empty demo row")
# Validate everything before replacing the checked-in development snapshot.
(root / "src/lib/demo-story.json").write_text(raw)
print(f"Synced demo from {source}")
