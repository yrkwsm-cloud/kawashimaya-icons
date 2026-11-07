// PIA・KURA のファビコン／ショートカット用アイコン（自作SVG）。2026-11-03 河島さん「オリジナルのかわいいやつに。一発でわかるように」
//   node icons.js            → svg/*.svg と preview.html（一覧）
//   node export.js           → png/<名前>-<サイズ>.png と ico/<名前>.ico（Chromeのheadlessで描く）
// 角丸タイル＋白い記号。PIAは暖色、KURAは青緑の系統で、機能ごとに色を変えてタブの中で見分けられるようにする。
const fs = require("fs");
const path = require("path");

const W = "#fff", INK = "#3B2F2A";
const S = (d, w = 5) => `<path d="${d}" fill="none" stroke="${W}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const F = (d, c = W) => `<path d="${d}" fill="${c}"/>`;
const C = (x, y, r, c = W) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const R = (x, y, w, h, r, c = W) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
// かわいい顔（目・ほっぺ・口）
const face = (cx, cy, s = 1, ink = INK) => `${C(cx - 7 * s, cy, 2.6 * s, ink)}${C(cx + 7 * s, cy, 2.6 * s, ink)}`
  + `${C(cx - 11.5 * s, cy + 5 * s, 2.8 * s, "#FF9AA8")}${C(cx + 11.5 * s, cy + 5 * s, 2.8 * s, "#FF9AA8")}`
  + `<path d="M${cx - 3.5 * s} ${cy + 5 * s} q${3.5 * s} ${3.5 * s} ${7 * s} 0" fill="none" stroke="${ink}" stroke-width="${2.2 * s}" stroke-linecap="round"/>`;

// 5アプリ（pia・kura・en・nami・kaze）の本体アイコン（2026-11-07 河島さん「共通したトーンで、シンプルで洗練されたシンボルに」）。
//   無地の角丸タイル＋白い線1本の記号。線の太さ・余白・角丸を5つでそろえる。色はアプリ切り替えの色と同じ
const L = (d, w = 5.5) => S(d, w);
// 2026-11-07夜 河島さん「もうちょっとシンプルに」→ 案から選択：PIA＝C（弧と点）・KURA＝A（家の輪郭）・en＝そのまま・nami＝B（塗りの波）・kaze＝B（丸い棒3本）。比較は candidates.js
const APP = {
  pia:  ["#F2994A", `<path d="M32 14a18 18 0 1 1-18 18" fill="none" stroke="${W}" stroke-width="6.5" stroke-linecap="round"/>` + C(32, 32, 5)],
  kura: ["#C98A2B", L("M15 30L32 17l17 13v17H15z", 6.5)],
  en:   ["#D9668C", `<circle cx="25" cy="32" r="12" fill="none" stroke="${W}" stroke-width="5.5"/><circle cx="39" cy="32" r="12" fill="none" stroke="${W}" stroke-width="5.5"/>`],
  nami: ["#2E9C78", F("M12 31c5.3-6 10.7-6 16 0s10.7 6 16 0c3-3.5 5.5-4.5 8-3v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z")],
  kaze: ["#3E73C2", R(12, 20, 30, 7, 3.5) + R(22, 31, 30, 7, 3.5) + R(12, 42, 20, 7, 3.5)],
};

// [名前, 上の色, 下の色, 記号, 説明, 無地]
const ICONS = [
  // ---- 5アプリの本体 ----
  ["en", APP.en[0], APP.en[0], APP.en[1], "en（メール配信）", 1],
  ["nami", APP.nami[0], APP.nami[0], APP.nami[1], "nami（発信）", 1],
  ["kaze", APP.kaze[0], APP.kaze[0], APP.kaze[1], "kaze（広告）", 1],
  // ---- PIA 本体と機能（?tab=） ----
  ["pia", APP.pia[0], APP.pia[0], APP.pia[1], "PIA（本体）", 1],
  ["pia-dandori", "#FFAE73", "#FF8A4C", R(13, 16, 38, 34, 7) + R(13, 16, 38, 10, 7, "#FFE2CC") + R(19, 10, 5, 11, 2.5) + R(40, 10, 5, 11, 2.5) + [0, 1, 2].map((i) => [0, 1].map((j) => R(19 + i * 10, 31 + j * 9, 6, 5, 1.5, "#FF8A4C")).join("")).join(""), "スケジュール"],
  ["pia-nippo", "#FFC857", "#F5A623", R(14, 12, 30, 40, 6) + [22, 30, 38].map((y) => R(20, y, 18, 3, 1.5, "#F5A623")).join("") + `<g transform="rotate(40 44 34)">${R(40, 14, 9, 30, 3, "#FF6A4D")}${F("M40 44h9l-4.5 8z", "#FFE2CC")}</g>`, "日報"],
  ["pia-track", "#FF8585", "#F2545B", C(32, 36, 18) + C(32, 36, 13, "#F2545B") + R(28, 9, 8, 8, 2.5) + S("M32 36V27M32 36l6 4", 4.5), "計測"],
  ["pia-board", "#F9A8C9", "#EC6FA0", C(23, 24, 8) + C(42, 26, 7) + F("M9 50c0-10 6-15 14-15s14 5 14 15z") + F("M33 50c1-8 4-12 9-12s11 4 11 12z"), "みんな"],
  ["pia-report", "#FFC36B", "#F39C34", R(13, 34, 9, 18, 3) + R(27.5, 22, 9, 30, 3) + R(42, 13, 9, 39, 3), "レポート"],
  ["pia-project", "#F7B06A", "#E8893A", F("M10 20a5 5 0 0 1 5-5h11l5 6h18a5 5 0 0 1 5 5v19a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5z") + R(10, 27, 44, 4, 1, "#E8893A"), "プロジェクト"],
  ["pia-goals", "#F47C8C", "#E04A62", C(32, 32, 20) + C(32, 32, 14, "#E04A62") + C(32, 32, 8.5) + C(32, 32, 3.5, "#E04A62"), "目標と未来"],
  ["pia-growth", "#8EDBB8", "#4DB38A", S("M32 52V30", 5) + F("M32 32c-2-10-10-15-20-14 1 10 9 16 20 14z") + F("M32 28c1-10 9-16 19-15 0 10-8 16-19 15z") + R(18, 50, 28, 4, 2), "ふり返り"],
  ["pia-connect", "#FF9BC4", "#F0659E", F("M32 52C14 40 9 31 9 23a11 11 0 0 1 23-4 11 11 0 0 1 23 4c0 8-5 17-23 29z") + C(26, 25, 2.2, "#F0659E") + C(38, 25, 2.2, "#F0659E") + `<path d="M28.5 31q3.5 3 7 0" fill="none" stroke="#F0659E" stroke-width="2.2" stroke-linecap="round"/>`, "つながり"],
  ["pia-memo", "#D6B48C", "#B98A57", R(15, 14, 34, 40, 6) + [22, 32, 42].map((x) => R(x - 2, 9, 4, 10, 2, "#7A5530")).join("") + [27, 35, 43].map((y) => R(21, y, 22, 3, 1.5, "#B98A57")).join(""), "メモ"],
  ["pia-kintai", "#B7A3F0", "#8C6FE0", R(14, 13, 36, 41, 6) + R(24, 9, 16, 9, 3, "#5D46B0") + S("M23 35l6 6 12-13", 5).replace(W, "#8C6FE0").replace(W, "#8C6FE0"), "各種申請"],
  // ---- メモの小窓（?memo=）・ミニ ----
  ["pia-memo-todo", "#7FD39B", "#43A96A", R(12, 12, 40, 40, 10) + S("M21 32l8 8 15-17", 6).replace(W, "#43A96A"), "ToDoメモ"],
  ["pia-memo-note", "#FFD964", "#F2B705", F("M13 13h38v26L39 51H13z") + F("M39 51V39h12z", "#FFE79A") + R(19, 20, 22, 3.5, 1.7, "#F2B705") + R(19, 28, 16, 3.5, 1.7, "#F2B705"), "付箋メモ"],
  ["pia-memo-text", "#9DB8DE", "#6E92C6", F("M16 9h22l11 11v35H16z") + F("M38 9v11h11z", "#D5E2F3") + [28, 35, 42].map((y, i) => R(22, y, i === 2 ? 14 : 21, 3, 1.5, "#6E92C6")).join(""), "テキストメモ"],
  ["pia-mini", "#FFA98F", "#FF7457", R(10, 14, 44, 36, 7) + R(10, 14, 44, 9, 7, "#FFD2C4") + C(16, 18.5, 2, "#FF7457") + C(22, 18.5, 2, "#FF7457") + R(30, 32, 18, 13, 3.5, "#FF7457") + face(39, 37, 0.42, W), "PIAミニ"],
  // ---- PIAの別画面（キャラの4つ・目標ボード） ----
  ["pia-review", "#FF9CB8", "#F2668B", F("M10 18a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H28l-10 9v-9a8 8 0 0 1-8-8z") + F("M32 37c-8-5-11-9-11-13a5.5 5.5 0 0 1 11-2 5.5 5.5 0 0 1 11 2c0 4-3 8-11 13z", "#F2668B"), "お客様の声（コエミ）"],
  ["pia-arari", "#FFD27A", "#EBA831", C(32, 32, 20) + C(32, 32, 15.5, "#EBA831") + S("M24 22l8 10 8-10M32 32v13M25 34h14M25 40h14", 4), "粗利速報（アラりん）"],
  ["pia-ship", "#86C3F2", "#4C9BE0", F("M10 24l22-10 22 10v22L32 56 10 46z") + F("M10 24l22 10 22-10", "#D8EAFB") + S("M32 34v22", 3).replace(W, "#4C9BE0") + S("M21 19l22 10", 4).replace(W, "#F2C14E"), "配送数（オペリン）"],
  ["pia-make", "#BCA3EE", "#9071DB", R(26, 8, 12, 8, 2.5) + F("M24 16h16v6c6 3 9 8 9 14v12a6 6 0 0 1-6 6H21a6 6 0 0 1-6-6V36c0-6 3-11 9-14z") + R(19, 34, 26, 12, 3, "#9071DB") + face(32, 38, 0.45, W), "製造数（メイカ）"],
  ["pia-okr", "#7FCFC4", "#3FA597", R(15, 9, 5, 46, 2.5) + F("M20 12h26l-6 9 6 9H20z"), "目標ボード"],
  // ---- KURA 本体と各タブ（?v=） ----
  ["kura", APP.kura[0], APP.kura[0], APP.kura[1], "KURA（本体）", 1],
  ["kura-home", "#3DB3A2", "#1F8C7E", F("M32 10L9 30h7v21h32V30h7z") + R(27, 37, 10, 14, 3, "#1F8C7E"), "ホーム"],
  ["kura-list", "#5FAE96", "#2F8A72", F("M10 22l22-10 22 10v24L32 56 10 46z") + F("M10 22l22 10 22-10", "#D6EEE5") + S("M32 32v24", 3).replace(W, "#2F8A72"), "原価一覧"],
  ["kura-zure", "#6AA8E0", "#3B7FC4", C(28, 28, 16) + C(28, 28, 10.5, "#3B7FC4") + S("M40 40l12 12", 8) + S("M23 28h10", 3.5), "ずれ一覧"],
  ["kura-make", "#7F9CD0", "#5675B5", R(14, 9, 36, 46, 7) + R(19, 14, 26, 11, 3, "#5675B5") + [0, 1, 2].map((i) => [0, 1, 2].map((j) => R(19 + i * 9.5, 30 + j * 8, 7, 5.5, 2, "#5675B5")).join("")).join(""), "試算表"],
  ["kura-tana", "#F2A07B", "#E07A5F", F("M10 30V14a4 4 0 0 1 4-4h16l24 24-20 20z") + C(19, 19, 4, "#E07A5F"), "棚卸（在庫額）"],
  ["kura-zaiko", "#6DB3C6", "#3E8FA6", R(6, 18, 32, 24, 4) + F("M38 25h9l9 10v7H38z") + C(17, 46, 6, "#245E6E") + C(46, 46, 6, "#245E6E") + C(17, 46, 2.5) + C(46, 46, 2.5), "在庫・欠品"],
  ["kura-review", "#F08A6E", "#DB5E3E", C(32, 32, 21) + R(28.5, 17, 7, 20, 3.5, "#DB5E3E") + C(32, 44, 4, "#DB5E3E"), "要確認"],
  ["kura-yosoku", "#8CC071", "#5E9A45", S("M10 52h44", 4) + S("M12 44l12-12 9 7 18-20", 6) + F("M43 14h10v10z"), "需要予測"],
  ["kura-hatchu", "#5DBB8F", "#2E9567", S("M8 14h7l6 28h26l5-20H18", 5) + C(24, 50, 4.5) + C(44, 50, 4.5), "発注"],
  ["kura-norm", "#A3C95A", "#73A12A", F("M14 50C12 28 26 12 52 12c0 26-14 40-38 38z") + S("M16 48C24 38 32 30 42 22", 3.5).replace(W, "#73A12A"), "NORM"],
  ["kura-req", "#F7D06A", "#E5AE2A", F("M32 8a16 16 0 0 1 9 29v6H23v-6a16 16 0 0 1 9-29z") + R(23, 46, 18, 4, 2) + R(26, 52, 12, 4, 2) + face(32, 24, 0.5, "#B07A0A"), "改良リクエスト"],
];

const svg = ([name, c1, c2, glyph, , flat]) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">`
  + (flat ? `<rect x="1" y="1" width="62" height="62" rx="15" fill="${c1}"/>` : `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`
  + `<rect x="1" y="1" width="62" height="62" rx="15" fill="url(#g)"/><rect x="1" y="1" width="62" height="30" rx="15" fill="#fff" opacity=".10"/>`) + `${glyph}</svg>`;

if (require.main === module) {
  const dir = path.join(__dirname, "svg"); fs.mkdirSync(dir, { recursive: true });
  for (const ic of ICONS) fs.writeFileSync(path.join(dir, ic[0] + ".svg"), svg(ic));
  const cell = (ic) => `<div class="c"><div class="row">${[128, 48, 32, 16].map((s) => `<img src="svg/${ic[0]}.svg" width="${s}" height="${s}">`).join("")}</div><b>${ic[4]}</b><small>${ic[0]}</small></div>`;
  fs.writeFileSync(path.join(__dirname, "preview.html"), `<!doctype html><meta charset="utf-8"><style>
body{font-family:"Yu Gothic UI",Meiryo,sans-serif;background:#FBFAF7;margin:24px;color:#333}h2{margin:18px 0 10px;font-size:20px}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.c{background:#fff;border-radius:14px;padding:12px;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.row{display:flex;align-items:flex-end;gap:10px}b{display:block;margin-top:8px;font-size:15px}small{color:#999;font-size:11px}
.tabs{display:flex;gap:4px;background:#DEE1E6;padding:8px 8px 0;border-radius:10px 10px 0 0;flex-wrap:wrap}.t{background:#fff;border-radius:8px 8px 0 0;padding:7px 10px;font-size:12px;display:flex;gap:6px;align-items:center;width:130px}
</style><h2>5アプリ</h2><div class="tabs">${["pia","kura","en","nami","kaze"].map((n) => ICONS.find((i) => i[0] === n)).map((ic) => `<div class="t"><img src="svg/${ic[0]}.svg" width="16">${ic[4]}</div>`).join("")}</div><div class="g" style="grid-template-columns:repeat(5,1fr);margin-top:14px">${["pia","kura","en","nami","kaze"].map((n) => cell(ICONS.find((i) => i[0] === n))).join("")}</div><h2>ブラウザのタブでの見え方（16px）</h2><div class="tabs">${ICONS.slice(3, 15).map((ic) => `<div class="t"><img src="svg/${ic[0]}.svg" width="16">${ic[4]}</div>`).join("")}</div>
<h2>PIA</h2><div class="g">${ICONS.filter((i) => i[0].startsWith("pia")).map(cell).join("")}</div>
<h2>KURA</h2><div class="g">${ICONS.filter((i) => i[0].startsWith("kura")).map(cell).join("")}</div>`);
  console.log("svg", ICONS.length);
}
module.exports = { ICONS, svg };
