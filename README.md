# Scholars & Innovators in Modern Programming — Classroom Materials

Companion materials for *Scholars & Innovators in Modern Programming* (Alex Groce, Apress), for instructors and students using the book in software engineering courses.

## What's here

```
syllabus.md           Sample 15-week syllabus: schedule, assignment choices, grading, adaptations
primers/
  coverage-map.md     Which standard SE topics each primer covers (SWEBOK-style map, overlaps, gaps)
chapters/
  01-ball/            Chapter 1 — Thomas Ball
  02-krishnamurthi/   Chapter 2 — Shriram Krishnamurthi
  03-liskov/          Chapter 3 — Barbara Liskov
  04-holzmann/        Chapter 4 — Gerard Holzmann
  05-zeller/          Chapter 5 — Andreas Zeller
  06-kernighan/       Chapter 6 — Brian Kernighan
  07-yang/            Chapter 7 — Jean Yang
  08-hoodlet/         Chapter 8 — Keith Hoodlet
  09-schneider/       Chapter 9 — Fred B. Schneider
  10-shaw/            Chapter 10 — Mary Shaw
  11-beck/            Chapter 11 — Kent Beck
  12-jackson/         Chapter 12 — Daniel Jackson
    primer.pptx       Pre-reading: one standard SE topic in depth, plus a shorter side topic or history
    primer.md         The same primer as a reading (Markdown)
    notes.md          Chapter notes: themes, boxed key-term definitions tied to the interview, discussion questions, further reading
    slides.pptx       Lecture slides: themes, quotes, key terms (speaker notes included)
    quiz.md           ~20-minute chapter quiz
    quiz-key.md       Answer key and rubric
units/
  unit1-ch01-03/
    test.md                   75-minute unit test on Chapters 1–3
    test-key.md               Answer key and rubrics
    assignment-proposals.md   Eight assignment designs for the unit
  unit2-ch04-06/              Same structure for Chapters 4–6
  unit3-ch07-09/              Same structure for Chapters 7–9
  unit4-ch10-12/              Same structure for Chapters 10–12
tools/slides/         Generators for the decks (edit chN.js or pN.js, rebuild)
```

## Primers: the standard SE topics

The interviews range widely, but they don't line up with a textbook's table of contents. Each chapter therefore has a **primer** for students to read *before* the chapter. It teaches one major topic every SE course covers, chosen for where it matters most in the interview, plus a shorter history or side topic:

| Ch | Primer topic | Shorter topic |
|---|---|---|
| 1 | Verification and validation | Verification history; famous failures |
| 2 | Software process models (Royce's waterfall, with its loops, through agile and DevOps) | Programming languages and SE |
| 3 | Modularity and abstraction | Conway's law |
| 4 | Requirements and the economics of defects | Project management and estimation |
| 5 | Testing and debugging | Version control |
| 6 | Construction, maintenance, and technical debt | The Unix philosophy |
| 7 | Software in production: DevOps, observability, incidents | APIs as contracts |
| 8 | Secure software development | Ethics and social impact |
| 9 | Dependability and security foundations | Invariants and runtime verification |
| 10 | Software architecture | Is software engineering engineering? |
| 11 | XP, TDD, and the human side of software | Design economics |
| 12 | Software design and specification | A history of formal specification |

See `primers/coverage-map.md` for how these map onto SWEBOK knowledge areas, the deliberate overlaps, and the remaining gaps.

## How the key terms work

Each chapter's `notes.md` boxes every important SE term with:
- **Definition**: a self-contained definition suitable for an upper-division SE course.
- **In the interview**: how the interviewee uses the term, with quotations, so students connect the vocabulary to the conversation.

The boxes use GitHub's alert syntax (`> [!NOTE]`), so they render as callouts on GitHub. To make PDFs, use pandoc 3.1.10 or later (the first release with the `alerts` extension) with `-f gfm`, where alerts are on by default. Any other Markdown-to-PDF tool also works; the boxes then fall back to block quotes.

## Rebuilding the slides

```bash
cd tools/slides
npm install pptxgenjs react react-dom react-icons sharp jszip
node build.js ch1.js ../../chapters/01-ball/slides.pptx
node primer.js p1.js ../../chapters/01-ball/primer.pptx ../../chapters/01-ball/primer.md
```

Each `chN.js` file holds that chapter's slide content: themes, quotes, term definitions, and speaker notes. Each `pN.js` holds a primer's content; `primer.js` writes both the deck and the Markdown reading from it.

## A note on answer keys

If this repository is public, students can read the quiz and test keys. Instructors who reuse questions for grading may want to keep keys in a private copy.

## License

Course materials are licensed CC BY 4.0, and the code in `tools/` is MIT licensed. Quotations from the interviews remain under the book's copyright. See `LICENSE.md` for details.
