# Sample Syllabus: Software Engineering Through Its Scholars and Innovators

*A sample upper-division undergraduate software engineering course built on* Scholars & Innovators in Modern Programming. *It assumes a 15-week semester with two 75-minute meetings a week. Adapt it freely: notes for other calendars are at the end. Bracketed items are placeholders for your institution.*

---

## Course description

Software engineering is the discipline of building software that works, keeps working as it changes, and serves the people who depend on it. This course covers the standard core of the field: process, requirements, design, modularity, architecture, construction, testing, verification, operations, security, and professional practice. It teaches that core through twelve long interviews with people who shaped it, including the inventors of data abstraction, model checkers, AWK, Extreme Programming, software architecture, and Alloy.

Each week has two halves. Before the first meeting, students read a **primer** that teaches one standard SE topic directly, the way a textbook would. In the second meeting, the class discusses the week's **interview**, where students see that topic argued over, applied, doubted, and connected to everything else by someone who spent a career on it. The primers give students the vocabulary. The interviews show them that the field is a live conversation, not a finished body of rules.

## Prerequisites

[Data structures; at least one course with a substantial programming project. Familiarity with Git is helpful but is covered in the Week 5 primer.]

## Learning outcomes

By the end of the course, students will be able to:

1. **Explain and compare** the major software process models, from Royce's 1970 paper through agile and DevOps, and choose among them for a given project's risk and cost of change.
2. **Write specifications** at several levels: requirements, module interfaces with representation invariants, temporal properties, and lightweight formal models.
3. **Apply modularity and abstraction** to decompose a system, and evaluate a design by how it absorbs change.
4. **Describe and select** verification and validation techniques (testing, static analysis, model checking, and proof) and explain what each can and cannot establish.
5. **Design tests and debug systematically**, using coverage, mutation, property-based testing, and scientific debugging.
6. **Recognize architectural styles** and reason about their quality-attribute trade-offs.
7. **Identify security risks** in a design, build a threat model, and connect security practice to its foundations.
8. **Evaluate claims** about software engineering, including claims made by famous people, against evidence.
9. **Articulate their own position** on recurring debates in the field: up-front vs. incremental design, formal vs. informal methods, and what AI changes and what it doesn't.

## Materials

- **Required:** Alex Groce, *Scholars & Innovators in Modern Programming* (Apress).
- **Course repository:** <https://github.com/agroce/scholarsandinnovators>. Primers, chapter notes, slides, and assignments.
- **Software:** Git, a Python or Java environment, and, for specific assignments, Spin, Alloy, and a property-based testing library (Hypothesis or jqwik). All are free.

## How each chapter works

Each chapter takes two consecutive meetings: a primer meeting, then an interview meeting. (In the schedule below these sometimes straddle a week boundary.)

| When | What students do | Repo materials |
|---|---|---|
| **Before the primer meeting** | Read the chapter's primer (about 45–60 minutes). | `chapters/NN-*/primer.md` (or `primer.pptx`) |
| **Primer meeting** | Lecture and exercises on the standard topic. The primer's "check yourself" questions make good openers. | `primer.pptx` |
| **Before the interview meeting** | Read the interview chapter, with the chapter notes alongside. | The book; `notes.md` |
| **Interview meeting** | Quiz in the first 20 minutes, then discussion of the interview, organized around its themes and key terms. | `quiz.md`, `slides.pptx` |

Chapter notes box every key SE term with a definition and how the interviewee uses it. Students should treat these boxes as the course glossary: the unit tests draw their term questions from them.

## Schedule

| Wk | Meeting 1 | Meeting 2 | Quiz (at the interview meeting) and assignments |
|---|---|---|---|
| **Unit 1: How we know, how we work, how we decompose** | | | |
| 1 | Course introduction. *What is software engineering?* NATO 1968; the course's structure. | Primer 1: **Verification and validation** (testing, static analysis, model checking, proof; soundness; famous failures) | |
| 2 | Ch. 1 discussion: **Thomas Ball** (SLAM, static vs. dynamic analysis, synthesis, breadcrumbs for AI) | Primer 2: **Software process models** (SAGE, Royce *with* the loops, V-model, spiral, agile, DevOps) | Quiz 1 |
| 3 | Ch. 2 discussion: **Shriram Krishnamurthi** (re-deriving the waterfall, PL as SE's materials science, education) | Primer 3: **Modularity and abstraction** (Parnas, KWIC, coupling and cohesion, specifications, SOLID) | Quiz 2 |
| 4 | Ch. 3 discussion: **Barbara Liskov** (data abstraction, CLU, substitution, specifications) | **Unit 1 test** | Quiz 3; Unit 1 assignment out |
| **Unit 2: Requirements, testing, and the craft of code** | | | |
| 5 | Primer 4: **Requirements and the economics of defects**; project management and estimation | Ch. 4 discussion: **Gerard Holzmann** (Spin, JPL, defect phases, coding standards) | Quiz 4 |
| 6 | Primer 5: **Testing and debugging**; version control | Ch. 5 discussion: **Andreas Zeller** (delta debugging, scientific debugging, mining repositories) | Quiz 5; Unit 1 assignment due |
| 7 | Primer 6: **Construction, maintenance, and technical debt**; the Unix philosophy | Ch. 6 discussion: **Brian Kernighan** (style, tools, AWK, the waterfall as contract, hype) | Quiz 6 |
| 8 | **Unit 2 test** | Workshop: Unit 2 assignment kickoff, or catch-up | Unit 2 assignment out |
| **Unit 3: Running, attacking, and trusting software** | | | |
| 9 | Primer 7: **Software in production** (DevOps, observability, SLOs, incidents); APIs as contracts | Ch. 7 discussion: **Jean Yang** (Jeeves, Akita, observation when you can't prove, research to startup) | Quiz 7 |
| 10 | Primer 8: **Secure software development** (OWASP, threat modeling, supply chain, prompt injection); ethics | Ch. 8 discussion: **Keith Hoodlet** (AppSec practice, bug bounties, AI risk, social impact) | Quiz 8; Unit 2 assignment due |
| 11 | Primer 9: **Dependability and security foundations** (fault tolerance, Saltzer–Schroeder, reference monitors); invariants and runtime verification | Ch. 9 discussion: **Fred B. Schneider** (state machine replication, safety and liveness, enforceable policies) | Quiz 9 |
| 12 | **Unit 3 test** | Primer 10: **Software architecture** (styles, quality attributes, ADRs); is SE engineering? | Unit 3 assignment out |
| **Unit 4: Design at every scale** | | | |
| 13 | Ch. 10 discussion: **Mary Shaw** (architecture, engineering maturity, reflective practice) | Primer 11: **XP, TDD, and the human side of software**; design economics | Quiz 10 |
| 14 | Ch. 11 discussion: **Kent Beck** (XP, TDD, Tidy First, the genie) | Primer 12: **Software design and specification** (domain models, concept design, Alloy); history of formal specification | Quiz 11; Unit 3 assignment due |
| 15 | Ch. 12 discussion: **Daniel Jackson** (concept design, Alloy, the essence of software) | **Synthesis:** the book's recurring debates (see below); course wrap-up | Quiz 12 |
| Finals | **Unit 4 test** (in the final exam slot), *or* capstone presentations | | Unit 4 assignment due |

Units 3 and 4 overlap in Week 12 so that Shaw's primer gets its own meeting. If your calendar allows, give the Unit 3 test a separate review day instead.

## Assignments

Each unit has eight assignment designs in `units/unitN-*/assignment-proposals.md`. Assign **one per unit** (two for an intensive course). Each file ends with a suggested pairing. A sample choice for a general SE course:

| Unit | Assignment | Why |
|---|---|---|
| 1 | **A4.** Rep invariants meet property-based testing | Makes Liskov concrete; teaches a testing skill used for the rest of the course |
| 2 | **B7.** Scientific debugging log | Tests Zeller's claims about AI and experimentation directly |
| 3 | **C3.** Threat model, then attack, then fix | The practice-to-foundations arc from Hoodlet to Schneider |
| 4 | **D6.** The capstone interview: your own chapter | Pairs interview someone who builds software and write it up as a chapter, with notes in this repo's format. It can replace the Unit 4 test. |

For a testing- or verification-heavy course, substitute **B3** (Spin), **C5** (invariants, monitors, fuzzing), and **D3** (Alloy). For a writing-intensive course, substitute **A3** (derive the process), **B8** (hype cycle case study), and **D5** (is SE engineering?).

## Assessment

| Component | Weight | Notes |
|---|---|---|
| Chapter quizzes (12) | 15% | ~20 minutes, at the start of each interview meeting. Lowest two dropped. |
| Unit tests (4) | 35% | 75 minutes each: term matching, multiple choice, short answer, an applied problem, and a synthesis essay. |
| Unit assignments (4) | 40% | 10% each. Rubrics are in the proposal files. |
| Discussion | 10% | Each student co-leads one interview discussion, plus regular participation. |

[Letter-grade cutoffs per institutional policy.]

**Discussion leading.** Pairs of students sign up for one interview. They come with three questions: one about a claim they doubt, one connecting the interview to an earlier chapter, and one for the instructor. The connections slide at the end of each deck and the discussion questions in each `notes.md` are good starting points.

## The book's recurring debates

Several questions come up in interview after interview. Track them through the semester; Week 15's synthesis session, Unit 4's essay, and the capstone all come back to them.

- **Up-front design vs. incremental design.** Royce and the waterfall (Ch. 2), Beck's "Tidy First" and XP (Ch. 11), and Jackson's concept design (Ch. 12) give three different answers. Shaw (Ch. 10) argues that the real question is which choices you get to make at all.
- **How do we know software works?** Proof, model checking, testing, and observation in production (Ball, Holzmann, Zeller, Yang, Schneider). What does each give you, and what does each miss?
- **What AI changes.** Almost every interviewee was asked. Their answers range from "more of what it already was" to "the bottleneck is now specification." Compare them.
- **Is software engineering engineering?** Shaw's maturation model, Holzmann's JPL standards, and Kernighan's craft view.
- **Krishnamurthi's design question,** which Groce asked of nearly everyone: what is good design, and how do we teach it?

## Course policies

**Use of AI tools.** This course is partly *about* AI's effect on software engineering, and several assignments ask you to use AI tools deliberately and report what happened. Unless an assignment says otherwise: you may use AI tools for code, you must say how you used them, and you are responsible for every line you submit. You may not use AI to write quiz or test answers, or the reflective writing in assignments, which is graded as your own thinking. [Adjust to your institution's policy.]

**Late work.** [e.g., 10% per day, up to three days; two free late days per semester.]

**Academic integrity.** [Institutional statement.]

**Accessibility.** [Institutional statement.]

## Adapting the schedule

- **Quarter system (10 weeks).** Pair chapters and their primers within weeks: chapters 1 and 2 in week 1, and so on (six weeks for twelve chapters). Run the unit tests as two midterms (Chapters 1–6 and 7–12). Assign two assignments instead of four.
- **Three meetings a week.** Use the third meeting as a lab for the current unit's assignment, or split each primer across two meetings. Primers 2 and 4 have multiple parts and divide naturally.
- **Graduate seminar.** Drop quizzes. Assign the primers as optional review, and pair each interview with one of the original papers listed in its `notes.md`. Make D6 (the capstone interview) the term project.
- **Textbook order.** The chapters follow the book, not a textbook table of contents. The primers are self-contained enough to reorder, so a course that wants requirements first can start with Primer 4. See `primers/coverage-map.md` for which standard topic lives where.
- **Using another textbook.** The primers can stand in for textbook chapters. If you keep a textbook, `primers/coverage-map.md` shows which of its chapters to assign alongside each interview.
