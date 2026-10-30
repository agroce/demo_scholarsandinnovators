# Unit 1 Assignment Proposals (Chapters 1–3)

*Draft proposals for Alex to judge. They are aimed at an upper-division undergraduate SE course. Each is a 1–3 week team or individual project. They range from hands-on technical work to reflective and design-oriented work. Each entry includes the idea, its tie to the interviews, deliverables, a grading sketch, and risks or variants. A short comparison and suggested pairing is at the end.*

---

## A1. "A Pair of Artifacts": Measuring Correlated Failure in LLM-Assisted Testing

**Chapters:** Krishnamurthi (correlated failure, means of verification), Ball (benchmark validity), Liskov (specifications).

**The idea.** Shriram says using one LLM to write both code and tests is "dancing this close to the fire." This assignment has students *measure* it instead of taking it on authority.

Each team gets a short English specification for a small, tricky library: an interval set, a date-range parser, a rate limiter, or a semantic-version comparator. The instructor also keeps a hidden, carefully tested reference implementation.

1. Generate an implementation with an LLM from the spec.
2. Build **three test suites**:
   - **T1:** tests written by the *same* LLM session that wrote the code.
   - **T2:** tests from a *fresh* LLM session that sees only the spec, never the code.
   - **T3:** property-based tests (Hypothesis) written by the students from the spec, ideally before they read the generated code.
3. Evaluate each suite by (a) **bugs found** in the LLM implementation, judged against the reference, and (b) **mutation score** against the reference implementation, using mutmut or universalmutator.
4. Analyze which suites miss the same bugs the code has, and whether the misses look correlated.

**Deliverables.** The code, the three suites, a results table, and a 4–6 page report that answers: *Did your data support Shriram's claim? What would make two artifacts "different enough"?*

**Grading sketch.** Experimental design and fairness (25%), correctness of measurement (25%), quality of T3 (20%), analysis and honest discussion of threats to validity (30%).

**Risks and variants.** Results vary by model and spec, which is fine because the point is the method. Pin the model version for reproducibility. For classes without LLM access, swap in "a classmate wrote the code, and you wrote tests after reading it" vs. "tests written from the spec alone." Same question, human version.

---

## A2. The Substitution Hunt: Finding Real LSP Violations

**Chapters:** Liskov (behavioral subtyping, spec vs. implementation), Krishnamurthi (OCL and specs as a different modality).

**The idea.** Students hunt for *real* violations of the substitution principle in widely used libraries and show them with executable **contract tests**. A contract test is an abstract test class written against the supertype's specification and run against every subtype.

Seed list (students must also find at least one case not on this list):
- `java.util.Stack extends Vector`: a "stack" you can insert into the middle of.
- `java.sql.Timestamp extends java.util.Date`: the Javadoc itself warns that `equals` is not symmetric between them. It says the relationship "really denotes implementation inheritance, and not type inheritance", which is Liskov's distinction stated by the JDK authors.
- `java.util.Properties extends Hashtable`: a string-to-string map that accepts any `Object`.
- Unmodifiable collections that throw `UnsupportedOperationException`. This one is a debatable case: Java's `List` spec calls those operations "optional." Is that an LSP escape hatch or a weak specification?
- Python: subclasses of `dict` that override `__getitem__` but not `get`, so the two disagree.

**Deliverables.** For each case: (1) a written *specification* of the relevant supertype behavior, in pre/postcondition or OCL style; (2) a contract test that passes on a conforming implementation and fails on the violator; (3) a proposed redesign, such as composition instead of inheritance or splitting the interface; (4) one paragraph on *why* the library designers might have made the choice. That last part is Shriram's "kernel of truth": respect before critique.

**Grading sketch.** Specification precision (30%), test quality (30%), redesign (20%), historicist explanation (20%).

**Risks.** Students may claim violations that aren't real. Require that the spec be quoted from official documentation where possible. The "optional operation" case makes a good class debate.

---

## A3. Derive the Process: A Historicist Methodology Workshop

**Chapters:** Krishnamurthi (teaching methodology backwards, Kuhn), Ball ("I'm not a methodology guy but... people still matter"), Liskov (the software crisis).

**The idea.** This scales up Shriram's in-class exercise. Each team gets an **era card** with real constraints and must *derive* a development process from first principles before reading anything about that era's actual methods:

| Era card | Constraints (examples) |
|---|---|
| 1958: Defense contractor | Punch cards, overnight turnaround, assembly, a single mainframe, a fixed-price government contract |
| 1975: Bank back office | COBOL, terminals, nightly batch runs, auditors, a system that must never lose money |
| 1994: Shrink-wrap software | C++, release on CD, no patches after ship, a retail launch date fixed months ahead |
| 2012: Web startup | Continuous deploy, A/B tests, 4 engineers, an 8-week runway |
| 2026: Agentic team | Coding agents produce most code, humans review; Shriram's "means of verification" problem |

Teams present their derived process. *Then* they research what practitioners of that era actually did and present the gap. Was the real method better or worse adapted to the constraints than theirs, and why?

**Deliverables.** A process diagram plus rationale (before research), a research memo with at least 3 sources, and a 10-minute presentation run as a **crit** (A7) by another team.

**Grading sketch.** Quality of reasoning from constraints (40%), research (25%), honest comparison (25%), crit participation (10%).

**Why it's interesting.** The 2026 card has no textbook answer, so students produce genuine proposals. Comparing the 1958 and 2026 cards also shows that process follows the cost of change, which links to Shriram's "make it 10x cheaper."

---

## A4. Rep Invariants Meet Property-Based Testing: Model-Based Testing of an ADT

**Chapters:** Liskov (rep invariant, abstraction function), Ball (invariants, "the tools are just so much better"), Krishnamurthi (pair of artifacts, PBT).

**The idea.** Liskov and Guttag's textbook says "of course, the compiler can't check these behavioral aspects." Fifty years later, tools can check them *dynamically*. Students:

1. Implement a non-trivial ADT with a clever representation: an interval set over integers stored as sorted, non-overlapping, non-adjacent ranges; an LRU cache; or a rope.
2. Write the **rep invariant** as an executable `check_rep()`.
3. Write the **abstraction function** as executable code mapping the representation to a simple *model* (for example, a Python `set`).
4. Use Hypothesis's *stateful testing* (`RuleBasedStateMachine`) to run random operation sequences on both the implementation and the model, checking `AF(impl) == model` and `check_rep()` after every step.
5. Run mutation testing (mutmut or universalmutator) and strengthen the properties until surviving mutants are explained or killed.

**Deliverables.** Code, the property suite, the mutation report, and a 2-page reflection: *Which mutants survived, and why? What part of the spec were you missing?*

**Grading sketch.** Correct RI and AF (25%), stateful test design (30%), mutation analysis (25%), reflection (20%).

**Why it's good.** It makes Liskov's abstract ideas concrete and executable, and shows students that the AF *is* Shriram's "second artifact." It's probably the strongest *technical* assignment for this unit.

---

## A5. Breadcrumbs: Writing Down a Codebase's Oral Culture

**Chapters:** Ball (oral culture, breadcrumbs, the "double-edged sword"), Krishnamurthi (expert blind spot), Liskov (maintaining someone else's code).

**The idea.** Each team adopts an unfamiliar, active, medium-sized open-source project.

1. **Recover the oral culture.** Mine issues, PR review comments, and commit messages for unwritten rules: "we never do X in module Y," "tests for Z must run in this order." If possible, interview a maintainer for 20 minutes, with the instructor helping arrange it.
2. **Write the breadcrumbs.** Produce a contributor guide aimed at *both* a new human contributor and a coding agent. In practice that might be a `CONTRIBUTING.md` plus an `AGENTS.md` or `CLAUDE.md`.
3. **Test the breadcrumbs.** Choose 3–5 small "good first issues." Attempt each with a coding agent *without* the guide, then *with* it. Alternatively, swap guides with another team and have humans attempt the issues. Record outcomes.
4. **Reflect on Ball's double-edged sword.** Who benefits from this documentation? Did writing it change *your* understanding?

**Deliverables.** The guide, an experiment log, a 3–4 page report, and optionally a PR to the project if the maintainers want the documentation.

**Grading sketch.** Evidence of real oral-culture recovery (30%), guide quality (25%), experiment rigor (25%), reflection (20%).

**Risks.** Agent access and cost; the human-swap variant avoids both. Projects must be chosen with care so students don't spam maintainers. Have the instructor approve projects and require that any PR be wanted.

---

## A6. Compiler Bugs from Test-Dead Code: EMI on a Toy Compiler

**Chapters:** Ball (test-dead code, static vs. dynamic blur), Krishnamurthi (pair of artifacts: original vs. variant), Liskov (meaning vs. syntax).

**The idea.** The instructor provides a small compiler or optimizer for a toy language. A few hundred lines of Python works, for example a tiny imperative language compiled to a stack machine, with constant folding, dead-code elimination, and loop-invariant hoisting. Several subtle optimizer bugs are seeded but not disclosed. Students implement **Equivalence Modulo Inputs**:

1. Write or generate test programs with fixed inputs, and collect statement coverage.
2. Create variants by deleting, inserting, or mutating statements in *uncovered* regions.
3. Compile and run original and variant on the same input. Any output difference means a compiler bug.
4. Reduce each bug-triggering program to a minimal case (a simple delta-debugging step).

**Deliverables.** The EMI tool, bug reports with minimized programs, and a short essay: *Is EMI a static or dynamic technique? Defend your answer against Ball's "any straw man... can sort of be broken down."*

**Grading sketch.** Working EMI pipeline (35%), number and quality of seeded bugs found (30%), minimization (15%), essay (20%).

**Risks.** It needs instructor setup: build the toy compiler and seed the bugs once, then reuse it each year. Best for a stronger class or as an honors option.

---

## A7. The Crit: Multi-Representational Design Review

**Chapters:** Krishnamurthi (design is multimodal and multi-step; RISD crits; OCL and sequence charts), Liskov (specifications), Ball (people matter).

**The idea.** Teams design (but do not implement) a feature for a realistic system, such as offline sync for a note-taking app or a conflict-resolution policy for a shared calendar. They must produce **at least four representations**, each of which "captures some things and doesn't capture some other things":

- HtDP-style purpose statements and **examples** for key operations ("specs from below")
- Types or interfaces and **invariants** in an OCL-like notation ("specs from above")
- A **sequence diagram** (Mermaid) for the hardest scenario
- A **state machine** for one key entity
- Optionally, a one-page **failure-model** statement à la Liskov: what can fail, and how (crash? Byzantine-ish clients?)

Then hold a structured **crit**. Another team presents first, while the reviewers have only the artifacts. Reviewers use prompts such as "what does this representation hide?", "where do two representations disagree?", and "what would a novice misunderstand?" Teams then revise.

**Deliverables.** The design dossier (v1), crit notes taken by the *reviewed* team, the revised dossier (v2), and a 1-page change log tied to specific crit comments.

**Grading sketch.** Graded on the *delta*: quality of v2 relative to v1 and how well crit feedback was used (40%). Also: coverage and consistency of representations (30%), quality of critique given to others (30%).

**Why it's interesting.** It is the classroom version of Shriram's open question, "Could you imagine a PL class that did crits?", and it gives practice in the design review culture Groce saw at JPL.

---

## A8. Test an Interviewee's Claim: A Mini Empirical Study

**Chapters:** All three, plus Shriram's warning against hero worship and Liskov's "understand what you don't understand."

**The idea.** Each student or pair picks one *checkable* claim from the interviews and designs a small empirical study to support or challenge it with real data. Candidate claims:

- Shriram: "Every single language that started off as some sort of scripting language has gotten a gradual typing system." Survey the top 20 dynamic languages for gradual typing, its timeline, and adoption.
- Liskov: Without compiler-enforced modularity, teams break encapsulation. Mine Python repositories for external access to `_private` members and compare with how often Java code uses reflection to bypass `private`.
- Ball: Testing is decided by "gut feel" per layer. Mine 30 GitHub projects' CI configs and test directories. What fraction test the GUI automatically compared with the core logic?
- Shriram: CI has made running "every damn thing... on every single commit" normal. Measure what actually runs per commit across a sample of projects, and estimate its compute cost.

**Deliverables.** A preregistered one-page plan (hypothesis, data source, method) submitted *before* data collection, then a 5-page report with data, scripts, and threats to validity.

**Grading sketch.** Preregistration quality (20%), method (30%), honesty of conclusions, including null results (30%), reproducibility (20%).

**Why it's interesting.** It builds the habit of *critical distance* Shriram describes ("I think my job is to be critical"), and it introduces mining software repositories as a research method.

---

## Comparison and a suggested pairing

| | Technical depth | Setup cost for instructor | Reflection / writing | Novelty for students |
|---|---|---|---|---|
| A1 Pair of Artifacts | High | Medium (spec + reference impl) | Medium | High |
| A2 Substitution Hunt | Medium | Low | Medium | Medium |
| A3 Derive the Process | Low | Low | High | High |
| A4 RI/AF + PBT | High | Low | Low–Medium | Medium |
| A5 Breadcrumbs | Medium | Medium (project vetting) | High | High |
| A6 EMI | Very high | High (one-time) | Low | High |
| A7 The Crit | Medium | Low | High | High |
| A8 Test a Claim | Medium | Low | High | Medium |

**Suggested pairing for one unit:** one technical assignment (**A4** if you want Liskov's ideas made concrete, **A1** if you want the most current, AI-relevant question) plus one design or reflective assignment (**A3** or **A7**). A3 and A7 combine naturally: A3's presentations can be run as A7-style crits. A1 and A4 also chain well. A4's executable abstraction function is exactly the "independent second artifact" that A1 asks about.
