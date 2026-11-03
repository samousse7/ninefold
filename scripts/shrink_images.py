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

# ---- Opponent portraits (images/opponents) ----
# Any name works ("Cadet Pip.png", "cadet_pip.jpeg"...): each file becomes
# a square-friendly JPEG named in lowercase with hyphens, e.g. cadet-pip.jpg,
# which is the name the game looks for.
import unicodedata

PORTRAITS = ROOT / "images" / "opponents"
PORTRAIT_MAX = 512


def slug(name):
    s = unicodedata.normalize("NFKD", name)
    s = "".join(ch for ch in s if not unicodedata.combining(ch)).lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


done = 0
if PORTRAITS.exists():
    for path in sorted(PORTRAITS.glob("*")):
        ext = path.suffix.lower()
        if ext not in EXTS:
            continue
        target = PORTRAITS / (slug(path.stem) + ".jpg")
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im)
            if target == path and im.width <= PORTRAIT_MAX:
                continue
            if im.width > PORTRAIT_MAX:
                im = im.resize((PORTRAIT_MAX, round(im.height * PORTRAIT_MAX / im.width)), Image.LANCZOS)
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
                bg = Image.new("RGB", im.size, (0, 0, 0))
                bg.paste(im, mask=im.split()[-1])
                im = bg
            else:
                im = im.convert("RGB")
            im.save(target if target != path else path, "JPEG", quality=84, optimize=True, progressive=True)
        if target != path:
            path.unlink()
        done += 1
        print(f"portrait {path.name} -> {target.name}")
print(f"{done} portrait(s) processed")
