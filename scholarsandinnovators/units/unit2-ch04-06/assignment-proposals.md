# Unit 2 Assignment Proposals (Chapters 4–6)

*Assignment designs for instructors to choose from. They are aimed at an upper-division undergraduate SE course. This unit is the most hands-on so far: debugging (Zeller, Kernighan), unhappy paths and test design (Zeller, Kernighan, Holzmann), model checking and static analysis (Holzmann), and process measurement (Holzmann). Each entry includes the idea, its tie to the interviews, deliverables, a grading sketch, and risks or variants. A comparison and suggested pairing is at the end.*

---

## B1. Build Your Own Delta Debugger

**Chapters:** Zeller (delta debugging, "almost embarrassingly simple"), Kernighan (narrowing down).

**The idea.** Students implement `ddmin` from the paper, then use it on real failures.

1. Implement ddmin over a list of elements (characters, lines, or tokens) with a user-supplied `test(input) → PASS | FAIL | UNRESOLVED` function.
2. Apply it to **three failures**: (a) an instructor-provided Python program that crashes on a large input; (b) a fuzzer-found crash in a small open-source parser (JSON, INI, or Markdown), or a seeded one; (c) a failing *version difference*, applying ddmin to the set of changed lines between a passing and a failing commit (Zeller's original "Yesterday, my program worked" setting).
3. Compare against naive bisection and count the test executions each needs.
4. Extension: implement a **hierarchical** variant that reduces syntax-tree nodes instead of characters, and compare the results.

**Deliverables.** The tool, the three minimized failures, an execution-count comparison table, and a 2-page reflection: *When did ddmin produce a reduced input that triggered a different bug ("slippage")? How did you design the test function to prevent it?*

**Grading sketch.** Correctness of ddmin, verified against instructor tests (35%); the three applications (30%); comparison (15%); reflection on test-function design (20%).

**Why it's good.** It is "almost embarrassingly simple" to code but subtle to *use* well. The slippage problem teaches the oracle lesson concretely. Zeller's *Debugging Book* (debuggingbook.org) has a reference implementation to check against, so students should write theirs before looking.

---

## B2. Unhappy Paths: A Red Team / Blue Team Input Validation Tournament

**Chapters:** Zeller (happy path as worst practice, Unicode digits, injection), Kernighan (boundary testing; web forms that reject spaces in card numbers), Holzmann ("it passed a couple of tests").

**The idea.** **Blue teams** build a small web API (signup, address entry, or payments-like data), validating inputs and handling failure gracefully. **Red teams** get the API spec, but not the code, and have one week to find inputs that cause 500 errors, accept invalid data, reject valid data (Kernighan's complaint), or corrupt state. Red teams must use at least one automated technique: a grammar-based fuzzer from *The Fuzzing Book*, Hypothesis, or a fuzzer such as Schemathesis.

Scoring: red teams earn points per distinct, reproducible finding, reduced with delta debugging (B1 can feed in). Blue teams keep points for findings they fix within 48 hours with a regression test.

**Deliverables.** Blue: code, tests, and a post-mortem listing every finding with its *root cause* and the phase it was introduced in (Holzmann). Red: a findings log with minimized inputs and a short "unhappy path taxonomy" of what kinds of inputs worked.

**Grading sketch.** Not just raw points. Quality of tests and fixes (Blue, 40%); diversity and reproducibility of findings (Red, 40%); post-mortem quality (20%).

**Risks.** Teams need a sandbox so nothing touches real systems. Set clear rules: no denial-of-service and no attacks on infrastructure. The Unicode, length, and injection cases usually produce good surprises.

---

## B3. Model Check a Protocol with Spin

**Chapters:** Holzmann (Spin, LTL, Büchi automata, "always my mistake"), Ball (Ch. 1: counterexamples), Shriram (Ch. 2: safety and liveness).

**The idea.** Students model a small concurrent protocol in **Promela**, state its correctness properties in **LTL**, and use Spin to find and fix bugs from counterexamples. Candidate systems, from simplest to hardest:
- Peterson's mutual exclusion, then a broken "simplified" variant
- An elevator controller with door and motor processes
- The alternating bit protocol over a lossy channel
- A simplified two-phase commit (ties to Liskov's transactions, Ch. 3)
- A model of a real bug: e.g., a check-then-act race in a team's own project

Each team writes at least two safety properties and one liveness property, introduces at least one realistic bug, and shows the counterexample trace Spin produces.

**Deliverables.** Promela models, LTL properties, annotated counterexample traces, and a 3-page report: *What did writing the model reveal before Spin ran?* (compare Holzmann's "writing the manual") *Which property was hardest to state? What did you leave out of the model, and could that hide a real bug?*

**Grading sketch.** Model fidelity and clarity (30%); property quality (30%); counterexample analysis (25%); reflection on abstraction (15%).

**Why it's good.** Model checking appears in three interviews. Spin is free and runs everywhere, and its own documentation is good. It is often the first time students see a tool that *exhaustively* proves a property or shows a concrete counterexample.

---

## B4. How Far Do Bugs Travel? A Defect Phase Audit

**Chapters:** Holzmann (defect injection and detection, "how far bugs travel"), Kernighan (verification vs. validation), Zeller (MSR).

**The idea.** Students apply Holzmann's JPL method to real data. Option A: their own semester project, if bugs are tracked from the start. Option B: an open-source project with a disciplined issue tracker, mined with PyDriller or the GitHub API.

1. Sample 40–60 fixed bugs.
2. For each, classify the **phase introduced** (requirements, design, code, configuration or environment) and the **phase detected** (code review, CI test, manual test, user report, production incident), using the issue discussion and the fixing commit.
3. Build the injection × detection matrix and compute the "distance traveled."
4. For the five bugs that traveled farthest, write a root cause analysis: *what check, at which phase, would have caught it?*
5. Recommend three process changes ranked by expected effect.

**Deliverables.** The labeled dataset (CSV) with an inter-rater agreement check (two students independently label 15 bugs; report Cohen's κ), the matrix, the five RCAs, and the recommendations.

**Grading sketch.** Labeling rigor and agreement (30%); analysis (25%); root cause quality (25%); actionable recommendations (20%).

**Why it's good.** It turns a process idea into an empirical study (Zeller's MSR), and students learn how hard it is to say *where* a bug was introduced.

---

## B5. Write a Coding Standard and Enforce It

**Chapters:** Holzmann (JPL coding standard, Power of Ten, Cobra's pattern queries), Kernighan (*Elements of Programming Style*; "don't use the arithmetic IF"), Liskov (Ch. 3: "compilers should enforce modularity").

**The idea.** Teams write a **10-rule coding standard** for a language and domain they choose: Python data pipelines, embedded C, or a TypeScript web app. Every rule must be (a) justified by a failure it prevents, citing a real bug or CVE where possible, and (b) **mechanically checkable**. They implement the checks with a pattern-based tool (Semgrep, CodeQL, tree-sitter queries, or Holzmann's Cobra), run them on two open-source projects, and triage the results.

Two twists:
- One rule must be a modernized version of a rule from *The Elements of Programming Style* or the Power of Ten. What changed and why?
- One rule must target something an LLM coding assistant commonly gets wrong in that domain, documented with examples.

**Deliverables.** The standard (rule, rationale, example violation, example fix), the checker rules, a triage report (true positives, false positives, "technically violating but fine"), and a one-page reflection on which rules were worth the friction (Shriram, Ch. 2).

**Grading sketch.** Rule quality and justification (35%); working checks (30%); honest triage, including false-positive rates (25%); reflection (10%).

---

## B6. Write the Manual First

**Chapters:** Holzmann ("perhaps the most important part is writing the manual"), Kernighan (programs for other people; the feedback loop), Shriram (Ch. 2: multi-representational design).

**The idea.** Students design a small command-line tool or library for a classmate's actual need, such as a grade-calculator CLI, a log summarizer, or a citation formatter. They write the complete **user manual first**: a man page or README with usage, every option, every error message, and worked examples. Then:
1. A different team reads *only* the manual and tries to predict the output of ten example invocations. Every wrong prediction is a design or documentation defect.
2. The authors revise the manual, and record each change caused by "this is really stupid, it shouldn't work this way."
3. Only then do they implement, using the manual's examples as acceptance tests.
4. Finally, they give the tool to a real user (Kernighan's feedback loop) and log what the user did that nobody expected.

**Deliverables.** Manual v1, the prediction-test results, manual v2 with a change log, the implementation and tests, and user feedback notes.

**Grading sketch.** Change log quality: how many real design flaws the manual exposed (35%); manual clarity (25%); implementation conforming to the manual (25%); user feedback analysis (15%).

**Why it's interesting.** It tests Holzmann's claim directly. It also makes a useful contrast with TDD (Zeller, Ch. 5): documentation-driven development is a different "write the spec first" discipline.

---

## B7. Debugging as Experiment: The Scientific Debugging Log

**Chapters:** Zeller (scientific debugging; "adapt your model to reality"; AI can't experiment), Kernighan ("detective work"), Holzmann ("always my mistake").

**The idea.** Each student gets three seeded-bug programs of increasing difficulty: an off-by-one, a state-corruption bug far from its symptom, and a concurrency or ordering bug. They must keep a **scientific debugging log** for each: hypothesis, prediction, experiment, observation, conclusion. Every code change must be justified by a logged hypothesis.

Then the AI comparison: students give the same bugs to an LLM agent, once with code only and once with permission to run the program and tests. They log the agent's hypotheses and experiments in the same format.

**Deliverables.** The logs, the fixes with regression tests, and a 2–3 page comparison: *Where did the AI's reasoning look like scientific debugging, and where did it guess? Did the ability to run experiments change its success, as Zeller predicts?*

**Grading sketch.** Log quality, with hypotheses that are falsifiable and experiments that discriminate (40%); correct fixes and tests (25%); AI comparison analysis (35%).

**Risks.** Bugs must be fresh so LLMs haven't seen them. Generate seeded-bug variants each term (mutation tools help).

---

## B8. Hype Cycle Case Study (Writing)

**Chapters:** Kernighan (good idea → "structured lunch breaks" → absorbed), Zeller (TDD advocacy), Holzmann (a scientific waterfall), Shriram (Ch. 2: "kernel of truth").

**The idea.** A research essay of about 2,500 words. Choose a methodology or technology and trace it through Kernighan's cycle:
1. The germ: the original problem and the original insight, from primary sources.
2. The balloon: overextension, consultants, certifications, the "structured lunch breaks" moment. Find a concrete absurd example.
3. The absorption: what became standard practice, and where it is now known *not* to apply.
4. A prediction: apply the cycle to something currently ballooning, such as "vibe coding," microservices, or AI agents in CI.

Suggested subjects: structured programming, CASE tools, UML, design patterns, XP and TDD, Scrum certification, microservices, DevOps, "shift-left," Kubernetes, and NoSQL vs. SQL.

**Deliverables.** The essay with at least 8 sources (at least 3 primary), and a one-slide summary presented in class.

**Grading sketch.** Use of primary sources (25%); accuracy and nuance (30%); identifying the kernel (25%); quality of the prediction (20%).

---

## Comparison and a suggested pairing

| | Technical depth | Setup cost for instructor | Reflection / writing | Novelty for students |
|---|---|---|---|---|
| B1 Delta debugger | High | Low (seed failures) | Low–Medium | Medium |
| B2 Unhappy-path tournament | Medium | Medium (sandbox, rules) | Medium | High |
| B3 Spin model checking | High | Low–Medium | Medium | High |
| B4 Defect phase audit | Medium | Low | High | High |
| B5 Coding standard | Medium | Low | Medium | Medium |
| B6 Manual first | Low–Medium | Low | High | High |
| B7 Scientific debugging log | Medium | Medium (fresh bugs) | High | High |
| B8 Hype cycle essay | Low | Low | High | Medium |

**Suggested pairing.** **B3** (Spin) plus **B4** (defect audit) make the most "Holzmann" unit, and they pair well with the Unit 1 assignments without repeating them. For a testing-focused course, **B1 → B2** chain well: the delta debugger built in B1 is used to minimize B2's tournament findings. **B7** is probably the most timely, since it puts Zeller's prediction about AI and experimentation to a direct test. If you run only one assignment from this unit, run that one.
