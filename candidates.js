// 5アプリ本体アイコンの「もっとシンプル」案（2026-11-07夜 河島さん）。node candidates.js → candidates.html / candidates.png
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const W = "#fff";
const L = (d, w = 6) => `<path d="${d}" fill="none" stroke="${W}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const F = (d) => `<path d="${d}" fill="${W}"/>`;
const COL = { pia: "#F2994A", kura: "#C98A2B", en: "#D9668C", nami: "#2E9C78", kaze: "#3E73C2" };
const NAME = { pia: "PIA", kura: "KURA", en: "en", nami: "nami", kaze: "kaze" };
const SETS = {
  "今": {
    pia: `<circle cx="32" cy="32" r="18" fill="none" stroke="${W}" stroke-width="5.5"/>` + L("M32 22v10l7 5", 5.5),
    kura: L("M10 27l7-11h30l7 11z", 5.5) + L("M17 27v23h30V27", 5.5) + L("M17 38h30", 4),
    en: `<circle cx="25" cy="32" r="12" fill="none" stroke="${W}" stroke-width="5.5"/><circle cx="39" cy="32" r="12" fill="none" stroke="${W}" stroke-width="5.5"/>`,
    nami: L("M11 26c5-6 9-6 14 0s9 6 14 0 9-6 14 0", 5.5) + L("M11 40c5-6 9-6 14 0s9 6 14 0 9-6 14 0", 5.5),
    kaze: L("M11 26h26a7 7 0 1 0-7-7", 5.5) + L("M11 37h32a7 7 0 1 1-7 7", 5.5),
  },
  "A 一筆（線1本だけ）": {
    pia: L("M32 23v9h7", 6.5) + `<circle cx="32" cy="32" r="19" fill="none" stroke="${W}" stroke-width="6.5"/>`,
    kura: L("M15 30L32 17l17 13v17H15z", 6.5),
    en: `<circle cx="32" cy="32" r="16" fill="none" stroke="${W}" stroke-width="6.5"/>`,
    nami: L("M12 34c5-7 10-7 15 0s10 7 15 0 7-5 10-3", 6.5).replace("M12 34c5-7 10-7 15 0s10 7 15 0 7-5 10-3", "M11 33c5.3-7 10.7-7 16 0s10.7 7 16 0 7-5 10 0"),
    kaze: L("M12 26h28", 6.5) + L("M12 38h40", 6.5),
  },
  "B 塗りの形": {
    pia: F("M32 13a19 19 0 1 1-19 19h19z"),
    kura: F("M32 13l20 16v20a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V29z"),
    en: `<circle cx="32" cy="32" r="15.5" fill="none" stroke="${W}" stroke-width="9"/>`,
    nami: F("M12 31c5.3-6 10.7-6 16 0s10.7 6 16 0c3-3.5 5.5-4.5 8-3v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"),
    kaze: `<rect x="12" y="20" width="30" height="7" rx="3.5" fill="${W}"/><rect x="22" y="31" width="30" height="7" rx="3.5" fill="${W}"/><rect x="12" y="42" width="20" height="7" rx="3.5" fill="${W}"/>`,
  },
  "C 点と弧": {
    pia: `<path d="M32 14a18 18 0 1 1-18 18" fill="none" stroke="${W}" stroke-width="6.5" stroke-linecap="round"/><circle cx="32" cy="32" r="5" fill="${W}"/>`,
    kura: L("M13 31L32 16l19 15", 6.5) + `<rect x="24" y="35" width="16" height="15" rx="3" fill="${W}"/>`,
    en: `<circle cx="32" cy="32" r="15" fill="none" stroke="${W}" stroke-width="6.5"/><circle cx="32" cy="32" r="5" fill="${W}"/>`,
    nami: L("M11 28c5.3-7 10.7-7 16 0s10.7 7 16 0 7-5 10 0", 6.5) + L("M21 44h22", 6.5),
    kaze: L("M12 30h26a7 7 0 1 0-7-7", 6.5) + L("M12 42h18", 6.5),
  },
};
const svg = (c, g) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="k"><rect x="1" y="1" width="62" height="62" rx="15"/></clipPath></defs><rect x="1" y="1" width="62" height="62" rx="15" fill="${c}"/><g clip-path="url(#k)">${g}</g></svg>`;
const uri = (s) => "data:image/svg+xml;base64," + Buffer.from(s).toString("base64");
const rows = Object.entries(SETS).map(([title, set]) => {
  const ks = Object.keys(COL);
  return `<div class="set"><h3>${title}</h3><div class="big">${ks.map((k) => `<div><img src="${uri(svg(COL[k], set[k]))}" width="84"><div class="sm"><img src="${uri(svg(COL[k], set[k]))}" width="32"><img src="${uri(svg(COL[k], set[k]))}" width="16"></div></div>`).join("")}</div><div class="tabs">${ks.map((k) => `<div class="t"><img src="${uri(svg(COL[k], set[k]))}" width="16">${NAME[k]}</div>`).join("")}</div></div>`;
}).join("");
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:16px 20px;background:#fff;font-family:"Yu Gothic UI",Meiryo,sans-serif;color:#333}h3{margin:0 0 8px;font-size:16px}.set{margin-bottom:18px}.big{display:flex;gap:22px}.sm{display:flex;gap:8px;align-items:end;justify-content:center;margin-top:6px}.tabs{display:flex;gap:4px;background:#DEE1E6;padding:6px 6px 0;margin-top:8px;width:max-content}.t{background:#fff;border-radius:7px 7px 0 0;padding:6px 10px;font-size:12px;display:flex;gap:6px;align-items:center;width:88px}</style>${rows}`;
const out = path.join(__dirname, "candidates.html");
fs.writeFileSync(out, html);
module.exports = { SETS, COL };
if (require.main === module) {
  execFileSync("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=620,860", "--screenshot=" + path.join(__dirname, "candidates.png"), "file:///" + out.split(path.sep).join("/")], { stdio: "ignore" });
  console.log("ok");
}
