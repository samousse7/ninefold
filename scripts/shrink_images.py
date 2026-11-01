"""Shrink card illustrations in images/cards so the game loads fast.

Images wider than MAX_WIDTH are resized in place, keeping their name and format,
so the CARD_ART list in index.html never needs to change.
"""
from pathlib import Path
from PIL import Image, ImageOps

MAX_WIDTH = 640
FOLDER = Path(__file__).resolve().parent.parent / "images" / "cards"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

changed = 0
for path in sorted(FOLDER.glob("*")):
    if path.suffix.lower() not in EXTS:
        continue
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if im.width <= MAX_WIDTH:
            continue
        before = path.stat().st_size
        h = round(im.height * MAX_WIDTH / im.width)
        im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
        ext = path.suffix.lower()
        if ext in (".jpg", ".jpeg"):
            im.convert("RGB").save(path, "JPEG", quality=82, optimize=True, progressive=True)
        elif ext == ".png":
            im.save(path, "PNG", optimize=True)
        else:
            im.save(path, "WEBP", quality=82)
    changed += 1
    print(f"{path.name}: {before // 1024} KB -> {path.stat().st_size // 1024} KB")

print(f"{changed} image(s) shrunk")
