// 5アプリの本体アイコンだけを並べた確認用（node apps-preview.js → apps-preview.html / apps-preview.png）
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const { ICONS, svg } = require("./icons");
const a = ["pia", "kura", "en", "nami", "kaze"].map((n) => ICONS.find((i) => i[0] === n));
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fff;font-family:'Yu Gothic UI'"><div style="display:flex;gap:28px;padding:24px">${a.map((i) => `<div style="text-align:center"><img src="svg/${i[0]}.svg" width="120"><div style="display:flex;gap:10px;justify-content:center;align-items:end;margin-top:10px"><img src="svg/${i[0]}.svg" width="32"><img src="svg/${i[0]}.svg" width="16"></div><div>${i[4]}</div></div>`).join("")}</div><div style="display:flex;gap:4px;background:#DEE1E6;padding:8px 8px 0;margin:0 24px">${a.map((i) => `<div style="background:#fff;border-radius:8px 8px 0 0;padding:7px 10px;font-size:12px;display:flex;gap:6px;align-items:center;width:140px"><img src="svg/${i[0]}.svg" width="16">${i[4]}</div>`).join("")}</div></body>`;
fs.writeFileSync(path.join(__dirname, "apps-preview.html"), html);
execFileSync("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=820,300", "--screenshot=" + path.join(__dirname, "apps-preview.png"), "file:///" + path.join(__dirname, "apps-preview.html").split(path.sep).join("/")], { stdio: "ignore" });
console.log("ok");
