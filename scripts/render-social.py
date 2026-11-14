"""Generate the social card from the current positioning, without external assets."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
image = Image.new('RGB', (1200, 630), '#08080a')
draw = ImageDraw.Draw(image)
for x in range(0, 1200, 48): draw.line((x, 0, x, 630), fill='#16161a')
for y in range(0, 630, 48): draw.line((0, y, 1200, y), fill='#16161a')
font = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
for text, xy, size, fill in [
 ('› rekal', (70, 48), 36, '#22d3ee'),
 ('Carry the context', (70, 160), 72, '#e8e8ec'),
 ('forward.', (70, 250), 72, '#22d3ee'),
 ('Your project’s memory, across sessions,', (70, 390), 30, '#b5b5c0'),
 ('agents and teammates.', (70, 432), 30, '#b5b5c0'),
 ('Git-backed memory for AI coding agents · rekal.dev', (70, 540), 24, '#b5b5c0'),
]: draw.text(xy, text, font=ImageFont.truetype(font, size), fill=fill)
image.save(Path(__file__).resolve().parents[1] / 'public' / 'og-v2.png')
