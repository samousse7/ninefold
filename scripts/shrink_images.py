"""Prepare card illustrations in images/cards so the game loads fast.

- PNG and WebP images are converted to JPEG (same name, .jpg extension),
  and any reference to the old file name in index.html is updated.
- Images wider than MAX_WIDTH are resized, keeping their proportions.
"""
from pathlib import Path
import re
from PIL import Image, ImageOps

MAX_WIDTH = 640
ROOT = Path(__file__).resolve().parent.parent
FOLDER = ROOT / "images" / "cards"
GAME = ROOT / "index.html"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

renamed = {}
changed = 0
for path in sorted(FOLDER.glob("*")):
    ext = path.suffix.lower()
    if ext not in EXTS:
        continue
    convert = ext in (".png", ".webp")
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if im.width <= MAX_WIDTH and not convert:
            continue
        before = path.stat().st_size
        if im.width > MAX_WIDTH:
            h = round(im.height * MAX_WIDTH / im.width)
            im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            bg = Image.new("RGB", im.size, (0, 0, 0))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        target = path.with_suffix(".jpg") if convert else path
        if convert and target.exists():
            print(f"{path.name}: skipped, {target.name} already exists")
            continue
        im.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    if convert:
        path.unlink()
        renamed[path.name] = target.name
    changed += 1
    print(f"{path.name} -> {target.name}: {before // 1024} KB -> {target.stat().st_size // 1024} KB")

if renamed and GAME.exists():
    text = GAME.read_text(encoding="utf-8")
    new = text
    for old, repl in renamed.items():
        new = re.sub(r'(["\'])' + re.escape(old) + r'\1', lambda m: m.group(1) + repl + m.group(1), new)
    if new != text:
        GAME.write_text(new, encoding="utf-8")
        print("Updated file names in index.html")

print(f"{changed} image(s) processed")
