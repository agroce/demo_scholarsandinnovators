// Builds a chapter deck from a data module: node build.js ch1.js out.pptx
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaKey, FaQuoteLeft, FaLink, FaComments, FaUserGraduate } = require("react-icons/fa");
const { applyTheme } = require("./apply_theme.js");

const data = require(path.resolve(process.argv[2]));
const OUT = process.argv[3];

const HEX = {
  ink: "1C2B2A", inkSoft: "2F4744", white: "FFFFFF", tint: "EEF3F1",
  verm: "C8423A", gold: "E0A43A", teal: "1F7A74", slate: "5B6B69", sand: "F6E7C8",
};
const THEME = {
  name: "Scholars and Innovators",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.inkSoft, lt2: HEX.tint,
    accent1: HEX.verm, accent2: HEX.gold, accent3: HEX.teal, accent4: HEX.slate,
    accent5: HEX.sand, accent6: "8A5A44", hlink: HEX.teal, folHlink: HEX.slate,
  },
};

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = `Chapter ${data.num}: ${data.name}`;
  pres.author = "Alex Groce";
  pres.subject = "Scholars & Innovators in Modern Programming — classroom slides";
  const C = pres.SchemeColor;
  const W = 13.333;

  const ICON = {
    keyGold: await icon(FaKey, HEX.ink),
    quote: await icon(FaQuoteLeft, HEX.verm),
    link: await icon(FaLink, HEX.white),
    talk: await icon(FaComments, HEX.white),
    grad: await icon(FaUserGraduate, HEX.white),
  };

  const footer = `Ch. ${data.num} · ${data.name}`;
  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "TITLE", background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.5, w: 11.7, h: 0.5, fontSize: 16, color: C.accent2, bold: true, charSpacing: 3 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.1, w: 11.7, h: 1.4, fontSize: 48, bold: true, color: C.background1, fontFace: "Cambria", align: "left" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.6, w: 11.7, h: 1.0, fontSize: 24, italic: true, color: C.accent5, fontFace: "Cambria" }, text: "" } },
      { placeholder: { options: { name: "byline", type: "body", x: 0.8, y: 6.2, w: 11.7, h: 0.5, fontSize: 14, color: "B8C7C4" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "SECTION", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "num", type: "body", x: 0.8, y: 2.0, w: 3, h: 1.2, fontSize: 60, bold: true, color: C.accent2, fontFace: "Cambria" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 3.2, w: 11.7, h: 1.4, fontSize: 40, bold: true, color: C.background1, fontFace: "Cambria", align: "left" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.6, w: 11.7, h: 1.0, fontSize: 20, color: "D7E2DF" }, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: "B8C7C4", align: "right" },
  });
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle" }, text: "" } },
      { text: { text: footer, options: { x: 0.6, y: 6.95, w: 8, h: 0.3, fontSize: 10, color: HEX.slate } } },
    ],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: HEX.slate, align: "right" },
  });
  pres.defineSlideMaster({
    title: "TINT", background: { color: C.background2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle" }, text: "" } },
      { text: { text: footer, options: { x: 0.6, y: 6.95, w: 8, h: 0.3, fontSize: 10, color: HEX.slate } } },
    ],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: HEX.slate, align: "right" },
  });

  const bullets = (items, fs = 18) =>
    items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 10, fontSize: fs } }));

  // ---------- 1. Title ----------
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Introduction" });
  s.addText(`CHAPTER ${data.num}`, { placeholder: "kicker" });
  s.addText(data.name, { placeholder: "title" });
  s.addText(data.subtitle, { placeholder: "body" });
  s.addText("Scholars & Innovators in Modern Programming · Alex Groce", { placeholder: "byline" });
  s.addNotes(data.titleNotes || "");

  // ---------- 2. About ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Introduction" });
  s.addText(`Who is ${data.shortName}?`, { placeholder: "title" });
  s.addText(bullets(data.about, 18), { x: 0.6, y: 1.45, w: 6.4, h: 5.2, valign: "top", color: C.text1, isTextBox: true, objectName: "about-bullets" });
  // career path: vertical chips
  const path_ = data.path;
  const py0 = 1.5, ph = 0.62, pgap = (5.2 - path_.length * ph) / Math.max(1, path_.length - 1);
  s.addShape(pres.shapes.LINE, { x: 7.95, y: py0 + ph / 2, w: 0, h: (path_.length - 1) * (ph + pgap), line: { color: HEX.gold, width: 2, dashType: "dash" }, objectName: "path-line" });
  path_.forEach((p, i) => {
    const y = py0 + i * (ph + pgap);
    s.addShape(pres.shapes.OVAL, { x: 7.75, y: y + ph / 2 - 0.2, w: 0.4, h: 0.4, fill: { color: C.accent1 }, line: { color: C.background1, width: 2 }, objectName: `path-dot-${i}` });
    s.addText([{ text: p[0], options: { bold: true, color: C.accent1, fontSize: 13, breakLine: true } }, { text: p[1], options: { color: C.text1, fontSize: 15 } }],
      { x: 8.35, y, w: 4.4, h: ph, valign: "middle", margin: 0, isTextBox: true, objectName: `path-text-${i}` });
  });
  s.addNotes(data.aboutNotes || "");

  // ---------- 3. Roadmap ----------
  s = pres.addSlide({ masterName: "TINT", sectionTitle: "Introduction" });
  s.addText("The big ideas in this interview", { placeholder: "title" });
  const n = data.themes.length;
  const cols = n > 6 ? 3 : 2, rows = Math.ceil(n / cols);
  const gx = 0.3, gy = 0.25, cw = (12.1 - (cols - 1) * gx) / cols, chh = Math.min(1.35, (5.3 - (rows - 1) * gy) / rows);
  data.themes.forEach((t, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = 0.6 + c * (cw + gx), y = 1.5 + r * (chh + gy);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: chh, rectRadius: 0.08, fill: { color: C.background1 }, line: { color: "D5DFDC", width: 1 }, objectName: `road-card-${i}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + chh / 2 - 0.3, w: 0.6, h: 0.6, fill: { color: C.text2 }, line: { type: "none" }, objectName: `road-num-bg-${i}` });
    s.addText(String(i + 1), { x: x + 0.2, y: y + chh / 2 - 0.3, w: 0.6, h: 0.6, align: "center", valign: "middle", fontSize: 20, bold: true, color: C.accent2, fontFace: "Cambria", margin: 0, isTextBox: true, objectName: `road-num-${i}` });
    s.addText([{ text: t.short, options: { bold: true, fontSize: 17, color: C.text1, breakLine: true } }, { text: t.tag, options: { fontSize: 13, color: HEX.slate } }],
      { x: x + 0.95, y: y + 0.08, w: cw - 1.1, h: chh - 0.16, valign: "middle", margin: 0, isTextBox: true, objectName: `road-text-${i}` });
  });
  s.addNotes("Roadmap for the session. " + data.themes.map((t, i) => `${i + 1}. ${t.short}: ${t.tag}`).join(" "));

  // ---------- themes ----------
  for (let i = 0; i < data.themes.length; i++) {
    const t = data.themes[i];
    const sec = `${i + 1}. ${t.short}`;
    pres.addSection({ title: sec });

    // theme slide: bullets + quote card
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(t.title, { placeholder: "title" });
    s.addText(bullets(t.points, 19), { x: 0.6, y: 1.45, w: 6.6, h: 5.2, valign: "top", color: C.text1, isTextBox: true, objectName: "theme-bullets" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.6, y: 1.55, w: 5.1, h: 4.9, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: "quote-card" });
    s.addImage({ data: ICON.quote, x: 7.95, y: 1.85, w: 0.6, h: 0.6, objectName: "quote-icon" });
    s.addText(t.quote, { x: 7.95, y: 2.6, w: 4.45, h: 3.1, fontSize: t.quote.length > 220 ? 17 : 19, italic: true, color: C.text1, fontFace: "Cambria", valign: "top", margin: 0, isTextBox: true, objectName: "quote-text" });
    s.addText(`— ${t.quoteBy || data.shortName}`, { x: 7.95, y: 5.8, w: 4.45, h: 0.4, fontSize: 14, bold: true, color: C.accent1, margin: 0, isTextBox: true, objectName: "quote-by" });
    s.addNotes(t.notes || "");

    // term slides, up to 4 per slide
    for (let k = 0; k < t.terms.length; k += 4) {
      const chunk = t.terms.slice(k, k + 4);
      s = pres.addSlide({ masterName: "TINT", sectionTitle: sec });
      s.addText(`Key terms: ${t.short}` + (t.terms.length > 4 ? ` (${k / 4 + 1}/${Math.ceil(t.terms.length / 4)})` : ""), { placeholder: "title" });
      const two = chunk.length <= 3;
      const kc = chunk.length === 3 ? 3 : (chunk.length === 1 ? 1 : 2), kw = (12.1 - (kc - 1) * 0.3) / kc, kh = two ? 4.9 : 2.4;
      chunk.forEach((term, j) => {
        const x = 0.6 + (j % kc) * (kw + 0.3), y = 1.5 + Math.floor(j / kc) * (kh + 0.25);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: kw, h: kh, rectRadius: 0.08, fill: { color: C.background1 }, line: { color: "D5DFDC", width: 1 }, shadow: { type: "outer", color: "000000", opacity: 0.08, blur: 6, offset: 2, angle: 90 }, objectName: `term-card-${j}` });
        s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.25, w: 0.5, h: 0.5, fill: { color: C.accent2 }, line: { type: "none" }, objectName: `term-icon-bg-${j}` });
        s.addImage({ data: ICON.keyGold, x: x + 0.36, y: y + 0.36, w: 0.28, h: 0.28, objectName: `term-icon-${j}` });
        s.addText(term[0], { x: x + 0.9, y: y + 0.15, w: kw - 1.1, h: kc === 3 ? 0.8 : 0.7, fontSize: 18, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true, objectName: `term-name-${j}` });
        s.addText(term[1], { x: x + 0.3, y: y + (kc === 3 ? 1.15 : 0.95), w: kw - 0.6, h: kh - (kc === 3 ? 1.3 : 1.1), fontSize: two ? (kc === 3 ? 17 : (kc === 1 ? 22 : 18)) : 16, color: C.text1, valign: "top", margin: 0, isTextBox: true, objectName: `term-def-${j}` });
      });
      s.addNotes("Usage in the interview — " + chunk.map((tm) => `${tm[0]}: ${tm[2] || ""}`).join("  |  "));
    }
  }

  // ---------- wrap-up ----------
  pres.addSection({ title: "Wrap-up" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Wrap-up" });
  s.addText("Connections across the book", { placeholder: "title" });
  data.connections.forEach((c, i) => {
    const x = 0.6 + i * 6.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.55, w: 5.9, h: 5.0, rectRadius: 0.1, fill: { color: C.background2 }, line: { type: "none" }, objectName: `conn-card-${i}` });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 1.8, w: 0.6, h: 0.6, fill: { color: C.accent3 }, line: { type: "none" }, objectName: `conn-icon-bg-${i}` });
    s.addImage({ data: ICON.link, x: x + 0.45, y: 1.95, w: 0.3, h: 0.3, objectName: `conn-icon-${i}` });
    s.addText(c[0], { x: x + 1.05, y: 1.8, w: 4.6, h: 0.6, fontSize: 20, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true, objectName: `conn-title-${i}` });
    s.addText(bullets(c[1], 15), { x: x + 0.3, y: 2.6, w: 5.3, h: 3.8, valign: "top", color: C.text1, isTextBox: true, objectName: `conn-body-${i}` });
  });

  s = pres.addSlide({ masterName: "SECTION", sectionTitle: "Wrap-up" });
  s.addText("?", { placeholder: "num" });
  s.addText("Discussion", { placeholder: "title" });
  s.addText("Pick one question per group · 10 minutes · report back", { placeholder: "body" });

  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Wrap-up" });
  s.addText("Questions to argue about", { placeholder: "title" });
  data.discussion.forEach((q, i) => {
    const y = 1.5 + i * (5.2 / data.discussion.length);
    const h = 5.2 / data.discussion.length - 0.15;
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: y + h / 2 - 0.27, w: 0.54, h: 0.54, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `disc-dot-${i}` });
    s.addText(String(i + 1), { x: 0.6, y: y + h / 2 - 0.27, w: 0.54, h: 0.54, align: "center", valign: "middle", fontSize: 16, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: `disc-num-${i}` });
    s.addText(q, { x: 1.4, y, w: 11.3, h, fontSize: 17, color: C.text1, valign: "middle", margin: 0, isTextBox: true, objectName: `disc-q-${i}` });
  });

  // term recap
  const all = data.themes.flatMap((t) => t.terms.map((x) => x[0]));
  s = pres.addSlide({ masterName: "TINT", sectionTitle: "Wrap-up" });
  s.addText("Key terms from this chapter", { placeholder: "title" });
  const rc = 3, perCol = Math.ceil(all.length / rc), rw = (12.1 - 0.4) / rc;
  for (let c = 0; c < rc; c++) {
    const items = all.slice(c * perCol, (c + 1) * perCol);
    if (!items.length) continue;
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "25C6" }, breakLine: i < items.length - 1, paraSpaceAfter: 4 } })),
      { x: 0.6 + c * (rw + 0.2), y: 1.5, w: rw, h: 5.2, fontSize: all.length > 27 ? 14 : 15, color: C.text1, valign: "top", isTextBox: true, objectName: `recap-col-${c}` });
  }
  s.addNotes("Full definitions, with quotations showing how each term is used in the interview, are in notes.md for this chapter.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT, "slides:", pres.slides.length);
})();
