# Scholars & Innovators in Modern Programming — Classroom Materials

Companion materials for *Scholars & Innovators in Modern Programming* (Alex Groce, Apress), for instructors and students using the book in software engineering courses.

## READ THIS FIRST

This repository offers a way to transform my book, *Scholars &
Innovators in Modern Programming*, into a **full course on software
engineering** that covers the core of the field (roughly, the
SWEBOK knowledge areas), and covers some critical, enduring topics in considerable depth.  You may
think of it as a "mixin," a component that adds new behavior to
something without modifying it: it takes the book and turns it into a
one-semester course on software engineering.  I think it's a good
course, and I would like to offer a few reasons for that belief:

* Most software engineering textbooks and curricula offer up ideas from software
  engineering as a menagerie of definitions, loosely connected by
  some kind of
  relevance to making mid- and large-scale software: you walk through the
  zoo, gawking first at waterfall (bad) and agile (maybe good), then
  at UML, and unit tests, and maybe a small exhibit with REST and the
  cloud and GitHub all sitting around grooming each other.  This book differs from
  that practice in two ways.  First, every idea visited is grounded in
  at least one *person* who helped shape that idea (in some cases
  winning a Turing Award or other major accolade of our community
  for it) or popularize it in the field.  Teaching data structures,
  algorithms, or programming language basics as if red-black trees,
  switch statements, and arrays were found lying about on the
  ground may work fine; however, software engineering is more about the learned
  experience of people who tried to figure out how to build complex
  systems and understand them, and the ideas are less "facts" than
  arguments and beliefs.  Second, this book connects all these ideas
  together by certain common themes:  how do we organize software?
  how do we know what we want a software system to do?  how do we know
  if, in fact, it does those things?  And, more concretely and
  centrally for software engineering as a discipline, how much do we
  plan up front, and how much do we test and check along the way?

* This connects to a further goal: to be "AI-durable" for five to ten
  years.  Many software engineering texts are closely coupled to
  recent, or already outdated, practices of software development,
  where humans write almost all the code, and the particular
  management practices of large companies and projects are central.
  The agentic/LLM world upends all this, but it does not upend
  questions such as "what did we want to build?  how do we know we
  built it?  how do we split it up into parts, and how do we glue
  those parts together so changing one part doesn't break the whole
  thing?  when should we plan and when should we wing it and look at
  what we got?"  I claim that even if humans were entirely absent from
  the loop, and software systems were developed for the inscrutable
  purposes of artificial intelligences, such as producing paperclips,
  many of the questions this course addresses would still be important
  to software development.  Models for scheduling and budgeting were
  developed for a world where humans must write every line of code.
  They also assume most code is original, when most code that actually
  runs is drawn from libraries and frameworks described, if at all, in
  an SBOM.  Such models are unlikely to survive.  The ideas emphasized
  here are meant to outlast them: to remain relevant, within
  reasonable limits, whatever the future holds for the shape and
  origin of software.

* Finally, while there is a surprising amount of agreement between
  people from different camps, this book does not present software
  engineering as a settled, dull matter.  Kent Beck and Daniel
  Jackson agree on a number of points, including certain virtues of
  agile ideas and of specification and checking, yet offer very
  different opinions about the overall value of agile practices.
  Software engineering is a lively, living field, shaped by very smart
  people thinking hard about very hard problems with no simple,
  mathematical answers subject to proof or refutation.  The ideas here
  are complicated, and there is a lot to think about, including what
  evidence we really have for different practices.  Students, even
  undergraduates, need to understand this if they are to be
  responsible, intelligent, capable software engineers, whatever the
  role of software engineer may entail in the future.

Alex Groce

Flagstaff, Arizona

November 2026

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
