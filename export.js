// svg/*.svg → png/<名前>-<サイズ>.png（背景は透明）と ico/<名前>.ico（16・32・48・256のPNGを詰めたICO）
// 描くのは Chrome の headless（画像ライブラリを入れずに済むように）。node export.js [名前...]
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { ICONS, svg } = require("./icons");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SIZES = [16, 32, 48, 180, 256, 512];
const out = (d) => { const p = path.join(__dirname, d); fs.mkdirSync(p, { recursive: true }); return p; };
const pngDir = out("png"), icoDir = out("ico"), tmp = out(".work");

function shot(ic, size) {
  const html = path.join(tmp, "s.html");
  fs.writeFileSync(html, `<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg(ic)}`);
  const png = path.join(pngDir, `${ic[0]}-${size}.png`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--default-background-color=00000000", `--window-size=${size},${size}`, `--screenshot=${png}`, "file:///" + html.replace(/\\/g, "/")], { stdio: "ignore" });
  return png;
}
// ICO はPNGをそのまま入れられる（Vista以降）。ヘッダ6バイト＋1枚16バイトの目録＋PNG本体
function ico(files) {
  const bufs = files.map((f) => fs.readFileSync(f.png));
  const head = Buffer.alloc(6 + 16 * bufs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(bufs.length, 4);
  let off = head.length;
  bufs.forEach((b, i) => {
    const s = files[i].size, o = 6 + 16 * i;
    head.writeUInt8(s >= 256 ? 0 : s, o); head.writeUInt8(s >= 256 ? 0 : s, o + 1);
    head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6); head.writeUInt32LE(b.length, o + 8); head.writeUInt32LE(off, o + 12);
    off += b.length;
  });
  return Buffer.concat([head, ...bufs]);
}

const want = process.argv.slice(2);
for (const ic of ICONS.filter((i) => !want.length || want.includes(i[0]))) {
  const files = SIZES.map((size) => ({ size, png: shot(ic, size) }));
  fs.writeFileSync(path.join(icoDir, ic[0] + ".ico"), ico(files.filter((f) => [16, 32, 48, 256].includes(f.size))));
  process.stdout.write(ic[0] + " ");
}
console.log("\nok");
