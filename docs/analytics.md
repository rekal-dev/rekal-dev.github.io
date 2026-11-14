# Acquisition measurements

## Website actions (GA4: G-WCNBK5HH2Z)

The `install_action` event has an `action` parameter:

| action | Meaning |
| --- | --- |
| `command_copy` | Installer command successfully copied |
| `releases_open` | Release page or asset link clicked on the website |
| `installer_view` | Installer source link clicked on the website |

In GA4, create an event-scoped custom dimension for `action` to break down these
values in reports. Use Realtime to verify receipt. These events are intent,
not installs. They depend on browser JavaScript and analytics availability.
No clipboard content, arbitrary link URL, or shell information is included.

## Release downloads

The **Download metrics** Actions workflow snapshots GitHub's public release-asset
counters daily. Each run has a summary and JSON artifact retained for 90 days.
Compare counters by asset ID between snapshots to estimate download changes.
Replacement/deletion of an asset resets/removes its counter; tag/name alone is
not a stable identifier. Archive totals exclude checksums.txt. All totals can
include bots, CI, repeat downloads and our own installation tests.

Run locally: `python3 scripts/download-metrics.py`.

## What is not measured

GitHub Pages serves `/install.sh` as a static file. A curl request does not run
GA4, so website analytics cannot count script requests, README copies, successful
installs or active CLI users. The installer and CLI have no new telemetry.

Counting actual script requests requires request logs or an edge proxy in front
of that URL. That would still count requests, not successful installations.
