/* Ninefold offline support.
   Keeps a copy of the game, card images, fonts and music on the device so it
   plays without internet. The file list below is rebuilt automatically by
   scripts/build_offline.py (run by the GitHub Action), so never edit it by hand.
   A new list means a new version: the game then shows "New version available". */

/*ASSETS*/
const VERSION = "5648683e7a";
const ASSETS = {
  "index.html": "3f4c5ab9c3",
  "manifest.webmanifest": "0f389e690a",
  "icons/apple-touch-icon.png": "049c5cd7fc",
  "icons/icon-192.png": "4aab68718b",
  "icons/icon-512.png": "3567a55e9a",
  "icons/icon-maskable-512.png": "dbee26d5d6",
  "fonts/alegreya-sans-latin-400-normal.woff2": "123cd4a1e1",
  "fonts/alegreya-sans-latin-500-normal.woff2": "005c64e2da",
  "fonts/alegreya-sans-latin-700-normal.woff2": "403b09118b",
  "fonts/alegreya-sans-latin-800-normal.woff2": "4abf3e8a29",
  "fonts/alegreya-sans-latin-ext-400-normal.woff2": "0b02ba71b0",
  "fonts/alegreya-sans-latin-ext-500-normal.woff2": "bdb8ca2365",
  "fonts/alegreya-sans-latin-ext-700-normal.woff2": "1d21b0dc84",
  "fonts/alegreya-sans-latin-ext-800-normal.woff2": "5a11a25f84",
  "fonts/cinzel-decorative-latin-700-normal.woff2": "1a21ed4ee2",
  "fonts/cinzel-decorative-latin-900-normal.woff2": "d0ed024509",
  "fonts/cinzel-decorative-latin-ext-700-normal.woff2": "fba82a4be1",
  "fonts/cinzel-decorative-latin-ext-900-normal.woff2": "19a5a4a492",
  "fonts/cinzel-latin-500-normal.woff2": "71a81880a2",
  "fonts/cinzel-latin-700-normal.woff2": "e30aae05f7",
  "fonts/cinzel-latin-ext-500-normal.woff2": "cb62cb66f0",
  "fonts/cinzel-latin-ext-700-normal.woff2": "36bda3c0a2",
  "images/cards/bahamut.jpg": "df8f50eb2e",
  "images/cards/bile-toadstool.jpeg": "412eddd6f5",
  "images/cards/black-paladin.jpeg": "f722d0b68f",
  "images/cards/bog-slug.jpeg": "eace5e93d6",
  "images/cards/bone-walker.jpeg": "b2868ada08",
  "images/cards/brine-squid.jpeg": "30e41a4681",
  "images/cards/brine-wyrmling.jpeg": "fc64a693ad",
  "images/cards/burrow-rat.jpg": "1e418ea09c",
  "images/cards/cernunnos.jpg": "29c13226a1",
  "images/cards/cinder-hound.jpeg": "bb2df45a41",
  "images/cards/clockwork-sentinel.jpeg": "fcfd73fc9c",
  "images/cards/comet-beast.jpeg": "99fcc863a0",
  "images/cards/crag-goat.jpeg": "58681d4f6e",
  "images/cards/crimson-wyvern.jpeg": "d532cf92c5",
  "images/cards/crystal-mantid.jpeg": "96c9755cb6",
  "images/cards/deep-octopod.jpeg": "2e7f2c0aeb",
  "images/cards/dread-seer.jpeg": "5ad1da5e68",
  "images/cards/dune-bison.jpeg": "9c1f9a4625",
  "images/cards/dusk-bat.jpeg": "c5e7c07461",
  "images/cards/elder-treant.jpeg": "b0af9c5a8f",
  "images/cards/elder-whale.jpeg": "4aa03650d2",
  "images/cards/ember-moth.jpeg": "77ab2f4b85",
  "images/cards/fae-matriarch.jpeg": "a151d6f70b",
  "images/cards/fen-gnat.jpeg": "b4632de850",
  "images/cards/frost-hare.jpeg": "a4087afb7a",
  "images/cards/frost-troll.jpeg": "f38612b154",
  "images/cards/fujin.jpg": "60e54fd52a",
  "images/cards/gale-sparrow.jpeg": "01afa3fd8d",
  "images/cards/ghoul-knight.jpeg": "019340f181",
  "images/cards/glacier-bear.jpeg": "0b3344ccdb",
  "images/cards/glade-fox.jpeg": "85f4ef1a23",
  "images/cards/gloom-owl.jpeg": "b2e87a5d67",
  "images/cards/grave-emperor.jpeg": "661a959064",
  "images/cards/gust-harpy.jpeg": "163abfa429",
  "images/cards/harvest-lich.jpeg": "55360705f1",
  "images/cards/hedge-witch.jpeg": "74192f58b5",
  "images/cards/hollow-eye.jpeg": "54dbc673dd",
  "images/cards/hollow-shade.jpeg": "2f83da6082",
  "images/cards/husk-beetle.jpeg": "e1c06b551a",
  "images/cards/ifrit.jpg": "70c76308b7",
  "images/cards/ironhorn-rhino.jpeg": "582a0adb47",
  "images/cards/lava-titan.jpeg": "d88868d3b8",
  "images/cards/marsh-basilisk.jpeg": "4af68f59b1",
  "images/cards/mask-goblin.jpeg": "fa38c5fa25",
  "images/cards/mirage-djinn.jpeg": "532bca771d",
  "images/cards/mire-toad.jpeg": "e89bbd692c",
  "images/cards/moss-golem.jpeg": "f837fb0d2e",
  "images/cards/night-count.jpeg": "8ea41b83e7",
  "images/cards/night-panther.jpeg": "9391e066a6",
  "images/cards/obsidian-golem.jpeg": "4fafb5b55f",
  "images/cards/ogre-brute.jpeg": "1889c0d65c",
  "images/cards/pale-grub.jpeg": "f9d219f9b4",
  "images/cards/plague-wurm.jpeg": "c81c66064f",
  "images/cards/prism-peacock.jpeg": "dffb4ceb17",
  "images/cards/pyre-lion.jpeg": "d66ac3a4f0",
  "images/cards/raijin.jpg": "4dff25e188",
  "images/cards/reed-viper.jpeg": "1277bc98dd",
  "images/cards/reef-shark.jpeg": "2ae6571499",
  "images/cards/reef-siren.jpeg": "c98f6b07bb",
  "images/cards/ridge-ram.jpeg": "2c21800efa",
  "images/cards/rime-penguin.jpeg": "579ff96bf7",
  "images/cards/seraph.jpg": "d3befb35c6",
  "images/cards/silk-spider.jpeg": "fb66c6d362",
  "images/cards/sky-lancer.jpeg": "627dea2d5d",
  "images/cards/spark-fly.jpeg": "ad227d07c3",
  "images/cards/spine-hog.jpeg": "1af404c120",
  "images/cards/star-drifter.jpeg": "9fadc76b6d",
  "images/cards/stone-tortoise.jpeg": "f1a790bec9",
  "images/cards/storm-elemental.jpeg": "5a26ae5ec8",
  "images/cards/storm-mammoth.jpeg": "beab57059e",
  "images/cards/sun-tiger.jpeg": "d40fde5011",
  "images/cards/thicket-ape.jpeg": "06ae7be266",
  "images/cards/thorn-sovereign.jpeg": "7fe1a88fc0",
  "images/cards/thunder-stag.jpeg": "6f58a8da11",
  "images/cards/tidal-behemoth.jpeg": "5e230e4d67",
  "images/cards/tide-crab.jpeg": "b068bf77d5",
  "images/cards/titan.jpg": "55ce92e459",
  "images/cards/tusk-boar.jpeg": "b39a7f8e14",
  "images/cards/tyrant-rex.jpeg": "57522cef88",
  "images/cards/venom-scorpion.jpeg": "8028709d72",
  "images/cards/void-spawn.jpeg": "fe070c8387",
  "images/cards/volt-lizard.jpeg": "bb61658003",
  "images/cards/wild-unicorn.jpeg": "9c33294774",
  "images/cards/wraith-widow.jpeg": "c48442d579",
  "images/cards/yuki-onna.jpg": "ef470b0254",
  "images/opponents/cadet-pip.jpg": "4d4367c1c9",
  "images/opponents/headmaster-rowan.jpg": "92ff056c55",
  "images/opponents/instructor-tobin.jpg": "a5930d86c6",
  "images/opponents/librarian-marla.jpg": "8b23146f40",
  "images/regions/ashgrove-academy.jpg": "7b3d4db10c",
  "music/ashgrove.mp3": "cb053b4681",
  "music/port-ravel.mp3": "a93278ddc2",
  "music/title.mp3": "f3a3952af0"
};
/*END*/

const CORE = "nf-core-" + VERSION;   // game page, icons, fonts: replaced on each version
const MEDIA = "nf-media";            // images and music: kept between versions, by content
const BASE = self.registration.scope;
const isMedia = p => p.startsWith("images/") || p.startsWith("music/");
const keyFor = p => new URL(p + "?h=" + ASSETS[p], BASE).href;

function pathOf(url) {
  const u = new URL(url);
  if (u.origin !== new URL(BASE).origin || !u.href.startsWith(BASE)) return null;
  let p = decodeURIComponent(u.pathname.slice(new URL(BASE).pathname.length));
  if (p === "") p = "index.html";
  return p;
}

async function download(cache, p) {
  const res = await fetch(new Request(new URL(p, BASE).href, { cache: "reload" }));
  if (!res.ok) throw new Error(p + " " + res.status);
  await cache.put(keyFor(p), res);
}

// Download several files at a time; returns how many failed.
async function fill(cache, paths, required) {
  let failed = 0, i = 0;
  const worker = async () => {
    while (i < paths.length) {
      const p = paths[i++];
      if (await cache.match(keyFor(p))) continue;
      try { await download(cache, p); }
      catch (e) { if (required) throw e; failed++; }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return failed;
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const all = Object.keys(ASSETS);
    const core = await caches.open(CORE), media = await caches.open(MEDIA);
    await fill(core, all.filter(p => !isMedia(p)), true);
    await fill(media, all.filter(p => p.startsWith("images/")), true);
    await fill(media, all.filter(p => p.startsWith("music/")), false);
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys())
      if (name.startsWith("nf-core-") && name !== CORE) await caches.delete(name);
    const media = await caches.open(MEDIA);
    const keep = new Set(Object.keys(ASSETS).filter(isMedia).map(keyFor));
    for (const req of await media.keys()) if (!keep.has(req.url)) await media.delete(req);
    await self.clients.claim();
    // music that could not be fetched during install is retried here
    fill(media, Object.keys(ASSETS).filter(p => p.startsWith("music/")), false);
  })());
});

self.addEventListener("message", event => {
  if (event.data === "skip") self.skipWaiting();
  if (event.data === "status" && event.ports[0]) status().then(s => event.ports[0].postMessage(s));
});

async function status() {
  const out = { version: VERSION, game: [0, 0], images: [0, 0], music: [0, 0] };
  const core = await caches.open(CORE), media = await caches.open(MEDIA);
  for (const p of Object.keys(ASSETS)) {
    const g = p.startsWith("images/") ? "images" : p.startsWith("music/") ? "music" : "game";
    out[g][1]++;
    if (await (isMedia(p) ? media : core).match(keyFor(p))) out[g][0]++;
  }
  return out;
}

// Audio players ask for byte ranges; answer them from the stored file.
async function ranged(req, res) {
  const range = req.headers.get("range");
  if (!range) return res;
  const blob = await res.blob(), size = blob.size;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  let start = 0, end = size - 1;
  if (m && m[1]) { start = +m[1]; if (m[2]) end = Math.min(+m[2], size - 1); }
  else if (m && m[2]) start = Math.max(0, size - +m[2]);
  if (start >= size) return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes"
    }
  });
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  let p = pathOf(req.url);
  if (p === null) return;
  if (!(p in ASSETS)) return; // not part of the game: normal network request
  event.respondWith((async () => {
    const hit = await caches.match(keyFor(p));
    if (hit) return ranged(req, hit);
    // not stored yet: fetch it, and keep a copy for next time
    if (req.headers.get("range")) {
      event.waitUntil(caches.open(isMedia(p) ? MEDIA : CORE).then(c => download(c, p)).catch(() => {}));
      return fetch(req);
    }
    const res = await fetch(req);
    if (res.ok && res.status === 200) {
      const copy = res.clone();
      event.waitUntil(caches.open(isMedia(p) ? MEDIA : CORE).then(c => c.put(keyFor(p), copy)));
    }
    return res;
  })());
});
