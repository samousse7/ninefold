"""Prepare the game for offline play. Run by the GitHub Action after each upload.

1. Music: compresses MP3s that are larger than needed (about 40% smaller,
   no audible difference on a tablet) and converts WAV/M4A/FLAC/OGG to MP3.
   Already-compressed files are left alone, so running it twice changes nothing.
2. Lists the opponent portraits (images/opponents) and region backgrounds
   (images/regions) in index.html.
3. Offline list: writes the list of game files, with a fingerprint of each,
   into sw.js. Any change to a file gives sw.js a new version, which makes the
   game show "New version available" to players.
"""
from pathlib import Path
import hashlib, json, re, shutil, subprocess

ROOT = Path(__file__).resolve().parent.parent
MUSIC = ROOT / "music"
SW = ROOT / "sw.js"
AUDIO_IN = {".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"}
MAX_BITRATE = 140_000  # compress anything above this
QUALITY = "6"          # LAME VBR quality, about 120 kbps


def bitrate(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries",
                          "format=bit_rate", "-of", "default=nw=1:nk=1", str(path)],
                         capture_output=True, text=True).stdout.strip()
    return int(out) if out.isdigit() else 0


def compress_music():
    if not shutil.which("ffmpeg"):
        print("ffmpeg not found, music left as is")
        return
    for path in sorted(MUSIC.glob("*")):
        ext = path.suffix.lower()
        if ext not in AUDIO_IN:
            continue
        if ext == ".mp3" and bitrate(path) <= MAX_BITRATE:
            continue
        target = path.with_suffix(".mp3")
        tmp = path.with_name(path.stem + ".tmp.mp3")
        before = path.stat().st_size
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(path), "-map", "0:a:0", "-map_metadata", "-1",
                        "-ar", "44100", "-c:a", "libmp3lame", "-q:a", QUALITY, str(tmp)], check=True)
        if ext != ".mp3":
            path.unlink()
        tmp.replace(target)
        print(f"{path.name} -> {target.name}: {before // 1024} KB -> {target.stat().st_size // 1024} KB")


def asset_list():
    files = [ROOT / "index.html", ROOT / "manifest.webmanifest"]
    files += sorted((ROOT / "icons").glob("*.png"))
    files += sorted((ROOT / "fonts").glob("*.woff2"))
    for folder in ("cards", "opponents", "regions"):
        files += sorted(p for p in (ROOT / "images" / folder).glob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"})
    files += sorted(MUSIC.glob("*.mp3"))
    table = {}
    for f in files:
        if f.is_file():
            table[f.relative_to(ROOT).as_posix()] = hashlib.sha1(f.read_bytes()).hexdigest()[:10]
    return table


def write_list(marker, folder, label):
    """Tell the game which images exist in a folder, e.g. images/opponents/*.jpg."""
    game = ROOT / "index.html"
    names = sorted(p.stem for p in (ROOT / "images" / folder).glob("*.jpg"))
    text = game.read_text(encoding="utf-8")
    pat = r"/\*" + marker + r"\*/.*?/\*END\*/"
    new = re.sub(pat, lambda m: "/*" + marker + "*/" + json.dumps(names) + "/*END*/", text, flags=re.S)
    if new != text:
        game.write_text(new, encoding="utf-8")
        print(f"index.html updated: {len(names)} {label}")


def write_sw(table):
    version = hashlib.sha1(json.dumps(table, sort_keys=True).encode()).hexdigest()[:10]
    lines = ",\n".join(f'  {json.dumps(k)}: "{v}"' for k, v in table.items())
    block = f'/*ASSETS*/\nconst VERSION = "{version}";\nconst ASSETS = {{\n{lines}\n}};\n/*END*/'
    text = SW.read_text(encoding="utf-8")
    new = re.sub(r"/\*ASSETS\*/.*?/\*END\*/", lambda m: block, text, flags=re.S)
    if new != text:
        SW.write_text(new, encoding="utf-8")
        print(f"sw.js updated: version {version}, {len(table)} files")
    else:
        print("sw.js already up to date")


compress_music()
write_list("PORTRAITS", "opponents", "opponent portrait(s)")
write_list("SCENES", "regions", "region background(s)")
write_sw(asset_list())
