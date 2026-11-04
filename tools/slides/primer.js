// Builds a pre-reading primer deck + markdown from a data module:
//   node primer.js p2.js out.pptx out.md
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaQuoteLeft, FaLightbulb, FaBookOpen, FaQuestion, FaMicrophone } = require("react-icons/fa");
const { applyTheme } = require("./apply_theme.js");

const D = require(path.resolve(process.argv[2]));
const OUT = process.argv[3], MD = process.argv[4];

const HEX = { ink: "1C2B2A", inkSoft: "2F4744", white: "FFFFFF", tint: "EEF3F1", verm: "C8423A", gold: "E0A43A", teal: "1F7A74", slate: "5B6B69", sand: "F6E7C8", line: "D5DFDC" };
const THEME = {
  name: "Scholars and Innovators Primer", headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: { dk1: HEX.ink, lt1: HEX.white, dk2: HEX.inkSoft, lt2: HEX.tint, accent1: HEX.verm, accent2: HEX.gold, accent3: HEX.teal, accent4: HEX.slate, accent5: HEX.sand, accent6: "8A5A44", hlink: HEX.teal, folHlink: HEX.slate },
};
async function icon(Comp, color) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: "256" }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
}
// **bold**, _italic_, `code` inline markup -> runs; "\n" -> line breaks
function runs(str, base = {}) {
  const out = [];
  const lines = str.split("\n");
  lines.forEach((line, li) => {
    const re = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`)/g;
    let last = 0, m; const start = out.length;
    while ((m = re.exec(line))) {
      if (m.index > last) out.push({ text: line.slice(last, m.index), options: { ...base } });
      const t = m[0];
      if (t.startsWith("**")) out.push({ text: t.slice(2, -2), options: { ...base, bold: true } });
      else if (t.startsWith("`")) out.push({ text: t.slice(1, -1), options: { ...base, fontFace: "Courier New" } });
      else out.push({ text: t.slice(1, -1), options: { ...base, italic: true } });
      last = m.index + t.length;
    }
    if (last < line.length || out.length === start) out.push({ text: line.slice(last), options: { ...base } });
    if (li < lines.length - 1) out[out.length - 1].options.breakLine = true;
  });
  return out;
}
// body: array of strings; "- x" is a bullet, otherwise paragraph
function bodyRuns(items, fs) {
  const all = [];
  items.forEach((it, i) => {
    const bullet = it.startsWith("- ");
    const txt = bullet ? it.slice(2) : it;
    const r = runs(txt, { fontSize: fs });
    r[0].options = { ...r[0].options, bullet: bullet ? true : false, paraSpaceAfter: bullet ? 6 : 10 };
    if (i < items.length - 1) r[r.length - 1].options = { ...r[r.length - 1].options, breakLine: true };
    all.push(...r);
  });
  return all;
}

// pptxgenjs writes an <a:pPr> before every run of a multi-run paragraph; only the
// first (leading) one is valid. Strip the rest so bullets survive and the XML is clean.
async function fixParagraphs(file) {
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))) {
    let xml = await zip.file(name).async("string");
    xml = xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (whole, inner) => {
      const firstR = inner.indexOf("<a:r>");
      if (firstR < 0) return whole;
      const head = inner.slice(0, firstR);
      const tail = inner.slice(firstR).replace(/<a:pPr\b[^>]*\/>|<a:pPr\b[^>]*>[\s\S]*?<\/a:pPr>/g, "");
      return "<a:p>" + head + tail + "</a:p>";
    });
    zip.file(name, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

const plain = (s) => s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1").replace(/`([^`]+)`/g, "$1");

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = `Primer for Chapter ${D.num}: ${D.title}`;
  pres.author = "Alex Groce";
  pres.subject = "Scholars & Innovators in Modern Programming — pre-reading primer";
  const C = pres.SchemeColor;
  const IC = {
    quote: await icon(FaQuoteLeft, HEX.verm), bulb: await icon(FaLightbulb, HEX.ink),
    book: await icon(FaBookOpen, HEX.white), q: await icon(FaQuestion, HEX.white), mic: await icon(FaMicrophone, HEX.white),
  };
  const footer = `Primer · Ch. ${D.num} · ${D.name}`;
  pres.defineSlideMaster({
    title: "TITLE", background: { color: C.text1 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.4, w: 11.7, h: 0.5, fontSize: 16, color: C.accent2, bold: true, charSpacing: 3 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.0, w: 11.7, h: 1.5, fontSize: 44, bold: true, color: C.background1, fontFace: "Cambria", align: "left" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.6, w: 11.7, h: 1.2, fontSize: 22, italic: true, color: C.accent5, fontFace: "Cambria" }, text: "" } },
      { placeholder: { options: { name: "byline", type: "body", x: 0.8, y: 6.0, w: 11.7, h: 0.6, fontSize: 14, color: "B8C7C4" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "SECTION", background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "num", type: "body", x: 0.8, y: 2.0, w: 6, h: 0.8, fontSize: 18, bold: true, color: C.accent2, charSpacing: 3 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.8, w: 11.7, h: 1.4, fontSize: 40, bold: true, color: C.background1, fontFace: "Cambria", align: "left" }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.3, w: 11.7, h: 1.4, fontSize: 20, color: "D7E2DF" }, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: "B8C7C4", align: "right" },
  });
  for (const [nm, bg] of [["CONTENT", C.background1], ["TINT", C.background2]]) {
    pres.defineSlideMaster({
      title: nm, background: { color: bg },
      objects: [
        { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 32, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", align: "left" }, text: "" } },
        { text: { text: footer, options: { x: 0.6, y: 6.95, w: 8, h: 0.3, fontSize: 10, color: HEX.slate } } },
      ],
      slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: HEX.slate, align: "right" },
    });
  }

  const md = [];
  md.push(`# Primer for Chapter ${D.num} (${D.name}): ${D.title}`, "");
  md.push(`*${D.subtitle}*`, "");
  md.push(`*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the ${D.name} interview.*`, "");

  let s, sec = "Introduction", alt = 0;
  pres.addSection({ title: sec });
  s = pres.addSlide({ masterName: "TITLE", sectionTitle: sec });
  s.addText(`PRIMER · READ BEFORE CHAPTER ${D.num}`, { placeholder: "kicker" });
  s.addText(D.title, { placeholder: "title" });
  s.addText(D.subtitle, { placeholder: "body" });
  s.addText(`Background for the ${D.name} interview · Scholars & Innovators in Modern Programming`, { placeholder: "byline" });

  // why slide
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
  s.addText("What this primer covers, and why", { placeholder: "title" });
  s.addText(bodyRuns(D.covers, 17), { x: 0.6, y: 1.5, w: 7.2, h: 5.2, valign: "top", color: C.text1, isTextBox: true, objectName: "covers" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.2, y: 1.55, w: 4.5, h: 5.0, rectRadius: 0.1, fill: { color: C.text2 }, line: { type: "none" }, objectName: "why-card" });
  s.addShape(pres.shapes.OVAL, { x: 8.5, y: 1.85, w: 0.6, h: 0.6, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "why-icon-bg" });
  s.addImage({ data: IC.mic, x: 8.65, y: 2.0, w: 0.3, h: 0.3, objectName: "why-icon" });
  s.addText("Why read this first", { x: 9.25, y: 1.85, w: 3.3, h: 0.6, fontSize: 18, bold: true, color: C.background1, fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true, objectName: "why-head" });
  s.addText(runs(D.why, { fontSize: 15, color: "E8EFED" }), { x: 8.5, y: 2.65, w: 3.95, h: 3.7, valign: "top", margin: 0, isTextBox: true, objectName: "why-text" });
  md.push("## What this primer covers, and why", "", ...D.covers.map((c) => (c.startsWith("- ") ? c : c + "\n")), "", `> **Why read this first.** ${D.why}`, "");

  const BOX = {
    primary: { fill: HEX.inkSoft, color: HEX.white, line: null },
    light: { fill: HEX.tint, color: HEX.ink, line: HEX.line },
    accent: { fill: HEX.verm, color: HEX.white, line: null },
    gold: { fill: HEX.gold, color: HEX.ink, line: null },
    teal: { fill: HEX.teal, color: HEX.white, line: null },
    ghost: { fill: HEX.white, color: HEX.ink, line: HEX.line },
    note: { fill: null, color: HEX.slate, line: null },
    dashed: { fill: HEX.white, color: HEX.slate, line: HEX.slate, dash: true },
  };
  function side(b, sd) {
    if (sd === "r") return [b.x + b.w, b.y + b.h / 2];
    if (sd === "l") return [b.x, b.y + b.h / 2];
    if (sd === "t") return [b.x + b.w / 2, b.y];
    return [b.x + b.w / 2, b.y + b.h];
  }
  function seg(slide, p, q, opts, arrowEnd, name) {
    const x = Math.min(p[0], q[0]), y = Math.min(p[1], q[1]);
    const w = Math.abs(q[0] - p[0]), h = Math.abs(q[1] - p[1]);
    const o = { x, y, w: Math.max(w, 0.001), h: Math.max(h, 0.001), line: { color: opts.color, width: opts.width || 1.75, dashType: opts.dashed ? "dash" : "solid" }, objectName: name };
    if (arrowEnd) o.line.endArrowType = "triangle";
    if (opts.startArrow && arrowEnd !== undefined && opts._first) o.line.beginArrowType = "triangle";
    if (q[0] < p[0]) o.flipH = true;
    if (q[1] < p[1]) o.flipV = true;
    slide.addShape(pres.shapes.LINE, o);
  }

  for (let si = 0; si < D.slides.length; si++) {
    const S = D.slides[si];
    if (S.type === "section") {
      sec = S.title; pres.addSection({ title: sec });
      s = pres.addSlide({ masterName: "SECTION", sectionTitle: sec });
      s.addText(S.kicker || "PART", { placeholder: "num" });
      s.addText(S.title, { placeholder: "title" });
      if (S.subtitle) s.addText(S.subtitle, { placeholder: "body" });
      md.push(`---`, "", `# ${S.title}`, "", S.subtitle ? `*${S.subtitle}*\n` : "");
      if (S.notes) s.addNotes(S.notes);
      continue;
    }
    alt++;
    const master = (S.type === "diagram" || S.type === "timeline") ? "CONTENT" : (alt % 2 ? "CONTENT" : "TINT");
    const cardFill = master === "TINT" ? C.background1 : C.background2;
    const cardHex = master === "TINT" ? HEX.white : HEX.tint;
    s = pres.addSlide({ masterName: master, sectionTitle: sec });
    if (S.title) s.addText(S.title, { placeholder: "title" });
    md.push(`## ${S.title || ""}`, "");

    if (S.type === "text") {
      const hasC = !!S.callout;
      s.addText(bodyRuns(S.body, S.fs || 17), { x: 0.6, y: 1.45, w: hasC ? 7.5 : 12.1, h: 5.3, valign: "top", color: C.text1, isTextBox: true, objectName: "body" });
      if (hasC) {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: 1.55, w: 4.2, h: 5.0, rectRadius: 0.1, fill: { color: cardFill }, line: { type: "none" }, objectName: "callout-card" });
        s.addShape(pres.shapes.OVAL, { x: 8.8, y: 1.8, w: 0.55, h: 0.55, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "callout-icon-bg" });
        s.addImage({ data: IC.bulb, x: 8.93, y: 1.93, w: 0.29, h: 0.29, objectName: "callout-icon" });
        s.addText(S.callout.label, { x: 9.5, y: 1.8, w: 3.0, h: 0.55, fontSize: 16, bold: true, color: C.text1, fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true, objectName: "callout-label" });
        s.addText(runs(S.callout.text, { fontSize: S.callout.fs || 14, color: HEX.ink }), { x: 8.8, y: 2.55, w: 3.65, h: 3.85, valign: "top", margin: 0, isTextBox: true, objectName: "callout-text" });
      }
      S.body.forEach((b) => md.push(b.startsWith("- ") ? b : b + "\n"));
      md.push("");
      if (hasC) md.push(`> **${S.callout.label}.** ${S.callout.text}`, "");
    }

    if (S.type === "quote") {
      s.addImage({ data: IC.quote, x: 0.9, y: 1.6, w: 0.8, h: 0.8, objectName: "quote-icon" });
      s.addText(S.quote, { x: 0.9, y: 2.55, w: 11.4, h: 2.3, fontSize: S.quote.length > 260 ? 22 : 26, italic: true, color: C.text1, fontFace: "Cambria", valign: "top", margin: 0, isTextBox: true, objectName: "quote" });
      s.addText(`— ${S.by}`, { x: 0.9, y: 4.95, w: 11.4, h: 0.45, fontSize: 16, bold: true, color: C.accent1, margin: 0, isTextBox: true, objectName: "quote-by" });
      if (S.context) s.addText(runs(S.context, { fontSize: 15, color: HEX.slate }), { x: 0.9, y: 5.5, w: 11.4, h: 1.2, valign: "top", margin: 0, isTextBox: true, objectName: "quote-context" });
      md.push(`> "${S.quote}"`, `>`, `> — ${S.by}`, "", S.context ? S.context + "\n" : "");
    }

    if (S.type === "compare") {
      const n = S.cols.length, gap = 0.3, cw = (12.1 - (n - 1) * gap) / n;
      const top = S.intro ? 2.15 : 1.5;
      if (S.intro) s.addText(runs(S.intro, { fontSize: 15, color: HEX.ink }), { x: 0.6, y: 1.35, w: 12.1, h: 0.7, valign: "middle", margin: 0, isTextBox: true, objectName: "intro" });
      S.cols.forEach((col, i) => {
        const x = 0.6 + i * (cw + gap), h = 6.7 - top;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: top, w: cw, h, rectRadius: 0.08, fill: { color: cardFill }, line: { type: "none" }, objectName: `col-card-${i}` });
        s.addText(col.head, { x: x + 0.25, y: top + 0.15, w: cw - 0.5, h: 0.55, fontSize: n > 3 ? 16 : 18, bold: true, color: [HEX.verm, HEX.teal, HEX.inkSoft, "8A5A44", HEX.slate][i % 5], fontFace: "Cambria", valign: "middle", margin: 0, isTextBox: true, objectName: `col-head-${i}` });
        s.addText(bodyRuns(col.items, S.fs || (n > 4 ? 13 : n === 4 ? 14 : 15)), { x: x + 0.25, y: top + 0.8, w: cw - 0.5, h: h - 0.95, valign: "top", color: C.text1, margin: 0, isTextBox: true, objectName: `col-body-${i}` });
      });
      if (S.intro) md.push(S.intro, "");
      S.cols.forEach((col) => { md.push(`**${col.head}**`, "", ...col.items.map((x) => (x.startsWith("- ") ? x : "- " + x)), ""); });
    }

    if (S.type === "timeline") {
      const ev = S.events, n = ev.length, ly = 3.95;
      const x0 = 0.9, x1 = 12.4, step = (x1 - x0) / Math.max(1, n - 1);
      s.addShape(pres.shapes.LINE, { x: 0.6, y: ly, w: 12.1, h: 0, line: { color: HEX.slate, width: 2 }, objectName: "tl-axis" });
      ev.forEach((e, i) => {
        const cx = n === 1 ? 6.65 : x0 + i * step, up = i % 2 === 0;
        s.addShape(pres.shapes.OVAL, { x: cx - 0.13, y: ly - 0.13, w: 0.26, h: 0.26, fill: { color: e[3] ? C.accent1 : C.text2 }, line: { color: C.background1, width: 2 }, objectName: `tl-dot-${i}` });
        s.addShape(pres.shapes.LINE, { x: cx, y: up ? ly - 0.55 : ly + 0.13, w: 0, h: 0.42, line: { color: HEX.line, width: 1 }, objectName: `tl-tick-${i}` });
        const bw = Math.min(2.6, step * 1.9), bx = Math.max(0.6, Math.min(12.7 - bw, cx - bw / 2));
        const by = up ? 1.45 : ly + 0.6, bh = up ? ly - 0.6 - 1.45 : 6.75 - (ly + 0.6);
        s.addText([
          { text: e[0], options: { bold: true, fontSize: 18, color: e[3] ? HEX.verm : HEX.inkSoft, fontFace: "Cambria", breakLine: true } },
          { text: e[1], options: { bold: true, fontSize: 14, color: HEX.ink, breakLine: !!e[2] } },
          ...(e[2] ? [{ text: e[2], options: { fontSize: 12.5, color: HEX.slate } }] : []),
        ], { x: bx, y: by, w: bw, h: bh, valign: up ? "bottom" : "top", align: "center", margin: 0, isTextBox: true, objectName: `tl-text-${i}` });
      });
      ev.forEach((e) => md.push(`- **${e[0]}** — ${e[1]}${e[2] ? ": " + e[2] : ""}`));
      md.push("");
    }

    if (S.type === "diagram") {
      const byId = {};
      (S.boxes || []).forEach((b, i) => {
        byId[b.id] = b;
        const st = BOX[b.style || "light"];
        const o = { x: b.x, y: b.y, w: b.w, h: b.h, objectName: `box-${b.id}` };
        if (b.shape !== "oval") o.rectRadius = 0.08; // an ellipse has no corner adjust; writing one makes PowerPoint repair the file
        o.fill = st.fill ? { color: st.fill } : { type: "none" };
        o.line = st.line ? { color: st.line, width: 1.25, dashType: st.dash ? "dash" : "solid" } : { type: "none" };
        if (st.fill || st.line) s.addShape(b.shape === "oval" ? pres.shapes.OVAL : pres.shapes.ROUNDED_RECTANGLE, o);
        if (b.text) s.addText(runs(b.text, { fontSize: b.fs || 14, color: st.color, bold: b.bold !== false && b.style !== "note" }), { x: b.x + 0.05, y: b.y, w: b.w - 0.1, h: b.h, align: b.align || "center", valign: "middle", margin: 2, isTextBox: true, italic: b.style === "note", objectName: `boxtext-${b.id}` });
      });
      (S.arrows || []).forEach((a, i) => {
        const A = byId[a.from], B = byId[a.to];
        let fs = a.fromSide, ts = a.toSide;
        if (!fs || !ts) {
          const horiz = (A.x + A.w <= B.x) || (B.x + B.w <= A.x);
          if (horiz) { fs = fs || (A.x < B.x ? "r" : "l"); ts = ts || (A.x < B.x ? "l" : "r"); }
          else { fs = fs || (A.y < B.y ? "b" : "t"); ts = ts || (A.y < B.y ? "t" : "b"); }
        }
        const pts = [side(A, fs), ...(a.via || []), side(B, ts)];
        const opts = { color: a.color ? HEX[a.color] : (a.dashed ? HEX.slate : HEX.inkSoft), dashed: a.dashed, width: a.width };
        for (let k = 0; k < pts.length - 1; k++) seg(s, pts[k], pts[k + 1], opts, k === pts.length - 2 && a.head !== false, `arrow-${i}-${k}`);
        if (a.label) {
          const mid = pts[Math.floor((pts.length - 1) / 2)], nxt = pts[Math.floor((pts.length - 1) / 2) + 1];
          const lx = (mid[0] + nxt[0]) / 2, ly2 = (mid[1] + nxt[1]) / 2;
          s.addText(a.label, { x: lx - 1.1 + (a.lx || 0), y: ly2 - 0.32 + (a.ly || 0), w: 2.2, h: 0.3, fontSize: 11, italic: true, color: HEX.slate, align: "center", margin: 0, isTextBox: true, objectName: `arrow-label-${i}` });
        }
      });
      if (S.caption) s.addText(runs(S.caption, { fontSize: 14, color: HEX.slate }), { x: 0.6, y: S.captionY || 6.15, w: 12.1, h: 0.65, valign: "top", margin: 0, isTextBox: true, objectName: "caption" });
      md.push(S.mdDiagram ? "```\n" + S.mdDiagram + "\n```\n" : "");
      if (S.caption) md.push(S.caption, "");
    }

    if (S.type === "check") {
      S.questions.forEach((q, i) => {
        const y = 1.5 + i * (5.2 / S.questions.length), h = 5.2 / S.questions.length - 0.12;
        s.addShape(pres.shapes.OVAL, { x: 0.6, y: y + h / 2 - 0.27, w: 0.54, h: 0.54, fill: { color: C.accent3 }, line: { type: "none" }, objectName: `q-dot-${i}` });
        s.addText(String(i + 1), { x: 0.6, y: y + h / 2 - 0.27, w: 0.54, h: 0.54, align: "center", valign: "middle", fontSize: 16, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: `q-num-${i}` });
        s.addText(runs(q, { fontSize: 16, color: HEX.ink }), { x: 1.4, y, w: 11.3, h, valign: "middle", margin: 0, isTextBox: true, objectName: `q-${i}` });
      });
      S.questions.forEach((q, i) => md.push(`${i + 1}. ${q}`));
      md.push("");
    }

    if (S.type === "reading") {
      s.addText(S.items.map((t, i) => ({ text: plain(t), options: { bullet: true, breakLine: i < S.items.length - 1, paraSpaceAfter: 8, fontSize: S.items.length > 10 ? 14 : 16 } })),
        { x: 0.6, y: 1.5, w: 12.1, h: 5.2, valign: "top", color: C.text1, isTextBox: true, objectName: "reading" });
      S.items.forEach((t) => md.push(`- ${t}`));
      md.push("");
    }
    if (S.notes) { s.addNotes(S.notes); md.push(S.notes, ""); }
  }

  await pres.writeFile({ fileName: OUT });
  await fixParagraphs(OUT);
  await applyTheme(OUT, THEME);
  fs.writeFileSync(MD, md.join("\n").replace(/\n{3,}/g, "\n\n"));
  console.log("wrote", OUT, pres.slides.length, "slides;", MD);
})();
