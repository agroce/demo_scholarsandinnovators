# Unit 4 Assignment Proposals (Chapters 10–12)

*Assignment designs for instructors to choose from. They are aimed at an upper-division undergraduate SE course. The final unit is about design at every scale: architecture and engineering (Shaw), the human and incremental side of building software (Beck), and concepts and specification (Jackson). Several proposals work as capstones that draw on the whole book. Each entry includes the idea, its tie to the interviews, deliverables, a grading sketch, and risks or variants. A comparison and suggested pairing is at the end.*

---

## D1. Study a Good One: An Architecture Exemplar Report

**Chapters:** Shaw ("let's study some good ones"; exemplars; ADLs; frameworks hide architecture), Jackson (Lightroom), Schneider (Ch. 9, Unix's conceptual integrity), Kernighan (Ch. 6).

**The idea.** Teams pick a well-regarded open-source system: for example, SQLite, Redis, Git, nginx, the Lua interpreter, xv6, or a small compiler. They write the architecture document the project never had, as Shaw and Michael Jackson argue students should study exemplars before writing.

1. Recover the **architecture** from code, docs, and history: components, connectors, and the architectural **styles** used (is SQLite a pipe-and-filter compiler feeding a virtual machine? where is the layering?).
2. Document it with at least **three views** (Kruchten 4+1 or C4), each with a key.
3. Identify **five key decisions** and write each as an **ADR** (context, decision, consequences), using commit history and mailing lists as evidence.
4. Find one place where the code has **drifted or eroded** from the architecture, and one **quality attribute scenario** the architecture clearly serves.
5. Write a **critique**, as in a design crit: what is admirable, and what would you change?

**Deliverables.** A 10–15 page architecture document with diagrams and ADRs, and a 15-minute presentation and crit in class.

**Grading sketch.** Accuracy and depth of recovered architecture (30%); views and ADR quality (30%); erosion and scenario analysis (20%); critique (20%).

**Why it's good.** It is exactly what Shaw says CS education lacks, and it produces an artifact that next year's students can read. Projects such as SQLite have excellent primary sources.

**Risks.** Systems must be small enough to understand in three weeks; provide a vetted list. Require evidence for every claim about rationale; students otherwise invent motives.

---

## D2. Concept Design and Synchronization of a Familiar App

**Chapters:** Jackson (concepts, synchronizations, design reuse, multiplicity), Shaw (problem setting), Yang (Ch. 7, user research).

**The idea.**

1. **Analyze.** Pick a widely used app (a calendar, a messaging app, a note app, a course system) and identify **8–12 concepts**. For each, write the purpose, state (relationally), actions, and operational principle. Find at least two **design flaws** in Jackson's terms: a concept with two purposes, two concepts for one purpose, or a synchronization that breaks a concept's operational principle. Support each with a reproducible scenario.
2. **Redesign.** Propose a fix at the concept level, and validate it with **three users** using Yang's standard: a short interview about real use over the past month, not a 30-minute think-aloud.
3. **Build a slice.** Implement 3–4 concepts as independent modules or services, plus synchronizations, with an LLM permitted to generate concept implementations from your specifications (as in Jackson's class). Record prompts in the repository.

**Deliverables.** Concept catalog, flaw analysis, redesign with user evidence, the code slice with specs and prompts committed, and a 2-page reflection: *Did writing concept specs first change what the LLM produced?*

**Grading sketch.** Concept analysis (30%); flaw identification and scenarios (20%); redesign and user evidence (20%); implementation and prompt provenance (20%); reflection (10%).

**Why it's good.** It applies Jackson's method end to end and tests his claim that concept specifications give LLMs "a new kind of leverage."

---

## D3. Find the Bug in the Design: An Alloy Project

**Chapters:** Jackson (Alloy, relations, small scope hypothesis), Shaw (spec as a second view; debugging the spec as much as the code), Schneider (Ch. 9, safety properties), Holzmann (Ch. 4, model checking).

**The idea.** Students model a small but real design in **Alloy 6** and use the analyzer to find flaws before any code is written. Options:
- A file sharing scheme (folders, links, permissions, revocation): "can someone retain access after being removed?"
- A course registration system with prerequisites, caps, and waitlists
- The tennis court reservation system from the Unit 4 test
- A simplified version of a published protocol, as Zave did with Chord

Requirements: state the design relationally, write at least **four assertions** (including one with mutable state and a temporal property), find at least **two counterexamples**, fix the model, and record what each counterexample taught you. Then write a short **property-based test** suite for an implementation (provided, or a team's own) that checks the same assertions, and compare what each found.

**Deliverables.** The Alloy model (versioned to show its evolution), annotated counterexamples, the test suite, and a 3-page report: *What did the model reveal that tests didn't, and vice versa? How much time did you spend debugging the spec?* (Shaw's experience.)

**Grading sketch.** Model quality (30%); assertions and counterexamples (30%); tests and comparison (20%); report (20%).

**Why it's good.** Alloy gives fast, visual feedback, which makes students' first formal method feel useful rather than punishing. Comparing it with tests connects to Beck's "specification as search oracle."

---

## D4. Tidy First: A Refactoring Journal

**Chapters:** Beck (Tidy First, structure vs. behavior changes, features-versus-futures, "nothing beats repetition"), Kernighan (Ch. 6), the Ch. 6 primer (refactoring, technical debt).

**The idea.** Each student takes a messy but working codebase (an instructor-provided "legacy" program with tests, or an old project of their own) and makes **three requested behavior changes**. The rules:

1. Every commit is **either** a tidying (structure only) **or** a behavior change, never both.
2. Before each behavior change, decide whether to **tidy first, after, later, or never**, and record the reason in a journal entry, in Beck's economic terms: how likely the code is to change again, and what option the tidying buys.
3. Tests must pass after every commit.
4. At the end, **redo the third change from scratch** on a fresh copy, and compare (Beck's repetition).

**Deliverables.** The commit history (graded as a document), the journal, and a 2-page reflection on how separating structure from behavior changed code review, and what the second attempt taught.

**Grading sketch.** Discipline of commit separation (30%); quality of tidyings (20%); journal reasoning (30%); reflection (20%).

**Why it's good.** It is small, cheap to run, and makes design economics concrete. The commit history is easy to grade and shows students what reviewable change looks like.

---

## D5. Is Software Engineering Engineering? A Field Study

**Chapters:** Shaw (maturity model, routine design, liability, licensing), Beck (Hammurabi, skin in the game), Jackson (uneven quality), Holzmann (Ch. 4), Hoodlet (Ch. 8).

**The idea.** Students interview a **practicing engineer from another discipline** (civil, mechanical, electrical, chemical, aerospace) and a **software developer** working in a regulated or high-stakes area if possible. Ask both the same questions: how they know a design will work; what handbooks, codes, or standards they use; what happens when something fails; who is liable; how they were trained; whether they've ever reused a design from a "room of flat files."

Then write an essay placing the software developer's practice on Shaw's craft → commercial → professional scale, using both interviews and at least three chapters of the book.

**Deliverables.** Interview notes (with consent), a 6–8 page essay, and a one-paragraph proposal for one change (licensing, liability, a handbook, an exemplar library, a curriculum change) that would move software toward engineering.

**Grading sketch.** Interview quality (25%); analysis using Shaw's model (35%); use of the book (20%); proposal (20%).

**Why it's good.** It brings the question from the 1968 NATO conference into students' own lives, with evidence they gathered themselves. Hillel Wayne's "Crossover Project" is a model for the interviews.

**Risks.** Students need help finding interviewees; alumni networks and engineering departments help. Cover informed consent.

---

## D6. The Capstone Interview: Your Own Chapter

**Chapters:** the whole book.

**The idea.** In pairs, students interview someone who builds or thinks about software: a developer, tester, architect, open-source maintainer, SRE, security engineer, or researcher. They use the book's core questions (how they started, what's changed and what hasn't, the most important idea, heroes, exemplary systems, worst practices, methodology, design, AI, what they're working on, "what should I have asked?") plus three questions of their own, prompted by specific chapters.

Then they write it up as a book chapter: a short introduction, the edited interview, and **chapter notes** in this repository's format, with 6–10 key SE terms boxed and defined, each tied to the interview, plus a connections section linking the interviewee to at least four of the book's interviewees.

**Deliverables.** The edited interview (approved by the interviewee), the chapter notes, and a 5-minute presentation.

**Grading sketch.** Interview quality and follow-up questions (30%); editing (20%); notes and key terms (30%); connections to the book (20%).

**Why it's good.** It is the book's own method turned into a capstone. It requires students to recognize SE concepts in someone's spoken account, which is the hardest test of understanding, and often produces interviews worth sharing (with permission) with future classes.

**Risks.** Interviewee recruitment; allow alumni, internship supervisors, and open-source maintainers by video. Get written approval before anything is shared.

---

## D7. Incremental vs. Up-Front: A Design Duel

**Chapters:** Beck (incremental design, "you never get to round two," Explore/Expand/Extract), Jackson (Agile's damage to design, concept reuse), Shaw (frameworks remove choices), Krishnamurthi (Ch. 2, process history).

**The idea.** Pairs of teams build the same small system, such as the tennis court reservation system or a shared-expense app, under opposite rules for two weeks:

- **Team Up-Front** spends the first week only on design: concept catalog, relational model (optionally in Alloy), architecture with ADRs. Week 2 is implementation.
- **Team Incremental** must ship a working, tested increment by day 2 and every two days after, with TDD and continuous tidying, and no design documents beyond notes.

On day 10 the instructor issues the same **surprise change** to both, one that cuts across concepts (group bookings; recurring reservations; a new fairness rule). Teams implement it and record effort and defects.

**Deliverables.** Both teams' code, artifacts, and change logs; a joint report comparing the two approaches with measurements; and each student's individual 1-page position: *Beck or Jackson?*

**Grading sketch.** Quality of each team's work under its rules (40%); joint report with honest measurement (30%); individual position (30%).

**Why it's good.** The book's sharpest disagreement becomes an experiment. Either outcome is instructive, and the shared surprise change makes comparison fair.

**Risks.** Small samples prove nothing. Frame it as an argument with evidence, not a controlled study (Zeller's standard, Ch. 5).

---

## D8. Design for Delight: Removing Friction

**Chapters:** Jackson (delight, friction, three stages, ready-to-hand, enshittification), Shaw (problem setting), Beck (human relationships), Yang (Ch. 7, design discipline).

**The idea.** Students choose a piece of **software their university community uses daily** (a registration system, the dining app, a printing system, the LMS) and run a friction study.

1. **Log friction** for one week from at least five users: every wait, extra click, confusion, workaround. Time the worst ones.
2. **Classify** each friction by Jackson's three stages: interaction design, concept design, or second-order effects.
3. For the top three, **trace the cause** where possible: an interface issue, a concept with two purposes, a synchronization that violates a principle, or an enterprise-software constraint.
4. Propose fixes, and **prototype** one: a clickable mockup or a working redesign of one flow. Test it with the same users.

**Deliverables.** The friction log and classification, cause analysis, prototype, before-and-after user results, and a short essay on whether the software could ever be ready-to-hand, and what stands in the way (often enterprise procurement, which links back to Kernighan and Pahlka).

**Grading sketch.** Study rigor (30%); classification and causes (30%); prototype and evaluation (25%); essay (15%).

**Why it's good.** Every student has felt this friction. It ends the book on Jackson's question, software that "contributed in some positive way to the quality of our lives," with something students can actually improve.

---

## Comparison and a suggested pairing

| | Technical depth | Setup cost for instructor | Reflection / writing | Novelty for students |
|---|---|---|---|---|
| D1 Architecture exemplar | Medium–High | Low (vetted list) | High | High |
| D2 Concept design + LLM | Medium–High | Low–Medium | Medium | Very high |
| D3 Alloy project | High | Low | Medium | High |
| D4 Tidy First journal | Medium | Low–Medium (legacy code) | Medium | Medium |
| D5 Is SE engineering? | Low | Low | High | High |
| D6 Capstone interview | Low–Medium | Low | Very high | Very high |
| D7 Design duel | Medium–High | Medium | Medium | High |
| D8 Design for delight | Medium | Low | Medium–High | High |

**Suggested pairing.** **D3 + D2** gives a Jackson-centered design unit: first specify and analyze, then design concepts and build with an LLM. **D1** is the clearest response to Shaw's call to study exemplars and pairs well with either. **D6** is the natural capstone for a course built on the book, and could replace a final exam. **D7** is the most fun to run if the class is large enough to pair teams; it directly stages the Beck–Jackson disagreement.
