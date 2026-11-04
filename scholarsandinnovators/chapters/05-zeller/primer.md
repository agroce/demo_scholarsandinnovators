# Primer for Chapter 5 (Zeller): Testing and Debugging Fundamentals

*Test levels, test design, coverage, oracles, test generation, the debugging process, plus a short history of version control*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Zeller interview.*

## What this primer covers, and why

**Main topic: testing and debugging.** Vocabulary; levels of testing and the test pyramid; black-box and white-box test design; coverage criteria (statement, branch, MC/DC); mutation analysis; the oracle problem; automatic test generation; regression testing and flaky tests; the debugging process (Zeller's TRAFFIC) and debugging as science.

**Shorter history:** version control from SCCS (Bell Labs, 1972) to Git, and why version histories became research data.

> **Why read this first.** Zeller names unit tests and version control among the biggest advances in software engineering. His worst practice is "only checking the happy path," his favorite process is test-driven development, and his own best-known work, delta debugging, automates part of debugging. The interview assumes you know how testing is organized and what makes a test suite good. This primer covers the standard material (much of it found in every SE textbook) so you can see where Zeller's work fits.

## Testing vocabulary

- **System under test (SUT)**: the code being tested.
- **Test case**: an input (or sequence of actions) plus an **expected result**. A **test suite** is a collection of test cases.
- **Test oracle**: whatever decides if the result is correct: an expected value, an assertion, a property, another implementation, a human.
- **Fixture / test harness**: the setup, teardown, and scaffolding that let tests run automatically.
- **Test adequacy criterion**: a rule for deciding when a suite is "enough" (coverage, mutation score).
- **Regression test**: a test kept to make sure fixed bugs and working features stay that way.
Remember the chain from the Chapter 1 primer: a **defect** may cause an infected **state**, which may cause a visible **failure**. A test can only see failures, and only for the inputs it tries.

> **Dijkstra, again.** "Program testing can be used to show the presence of bugs, but never to show their absence!"

Holzmann (Ch. 4): the worst practice is "the belief that once you pass a couple of basic tests for your software that you're good to go."

## Levels of testing and the test pyramid

```
          Acceptance / end-to-end      (few, slow, realistic)
            System tests
         Integration tests
   Unit tests                          (many, fast, isolated)
```

**Unit** tests check single functions or classes in isolation; **integration** tests check that components work together; **system** tests check the whole system against its requirements; **acceptance** tests check it against users' needs. Mike Cohn's **test pyramid** (2009) recommends many fast unit tests and few slow end-to-end tests. Compare the V-model (Chapter 2 primer), which pairs each level with a design level.

## Designing tests: black-box and white-box

**Black-box (specification-based)**

- Derive tests from the **specification**, not the code.
- **Equivalence partitioning**: split inputs into classes the program should treat alike; test one per class.
- **Boundary-value analysis**: test at and just beyond each boundary (Kernighan, Ch. 6: zero numbers, one, two).
- **Decision tables / combinatorial testing**: cover combinations of conditions; pairwise testing covers every pair of parameter values cheaply.
- **Negative tests**: invalid and hostile inputs (Zeller's unhappy paths).

**White-box (structural)**

- Derive or evaluate tests from the **code's structure**.
- **Statement coverage**: every statement executed.
- **Branch coverage**: every branch outcome taken.
- **Condition / MC/DC coverage**: each condition shown to affect the decision.
- **Path coverage**: every path; usually impossible with loops.
- Also data-flow coverage (definition-use pairs).

**Example: three test cases from a spec**

- Spec: _age_ is valid if 13 ≤ age ≤ 120.
- Partitions: below range, in range, above range, not a number.
- Boundaries: 12, 13, 120, 121.
- Unhappy: −1, "thirteen", 13.5, empty, "١٣" (Arabic-Indic digits).
- One partition-plus-boundary suite: {12, 13, 50, 120, 121, "x"}.

## Coverage criteria, with a tiny example

Consider: `if (a && b) { x = 1; }`

- **Statement coverage**: one test (a = T, b = T) executes every statement.
- **Branch coverage**: two tests: one where the `if` is true (T, T) and one where it is false (e.g., F, T).
- **MC/DC** (modified condition/decision coverage): show each condition _independently_ changes the outcome. Three tests: (T, T) → true, (F, T) → false, (T, F) → false. MC/DC is required for the most critical avionics software (DO-178C Level A).
**Coverage is necessary but not sufficient.** 100% coverage says code _ran_, not that results were _checked_. A test with no assertions can reach 100% coverage.

**Goodhart's law** applies: when coverage becomes a target, teams write tests that execute code without checking it.

> **Coverage in the book.** Ball (Ch. 1) describes "dynamically dead code": code not covered by a test, which the EMI technique mutates to find compiler bugs.

Coverage-guided fuzzers (AFL, libFuzzer) use coverage as a **search signal**, keeping inputs that reach new code.

## Mutation analysis: testing the tests

If coverage says code ran, **mutation analysis** asks whether the tests would notice if the code were _wrong_.

1. Make many small syntactic changes (**mutants**): `<` → `<=`, `+` → `-`, delete a statement, replace a variable.

2. Run the test suite on each mutant. A mutant is **killed** if some test fails.

3. The **mutation score** is the fraction of (non-equivalent) mutants killed. Surviving mutants point to weak or missing checks.

Proposed in the 1970s (DeMillo, Lipton, and Sayward's "Hints on Test Data Selection," 1978). It rests on the **competent programmer hypothesis** (real bugs are small mistakes) and the **coupling effect** (tests that catch simple faults tend to catch complex ones).

Main difficulty: **equivalent mutants**, changes that don't alter behavior and so can never be killed.

> **In the book.** Groce (Ch. 2): "if you want to look at ways of thinking about whether your testing is any good, mutation analysis is my favorite thing, but it doesn't do the whole trick."

Zeller (Ch. 5) also lists mutation testing among his research directions.

## The oracle problem: how do we know the answer is right?

Generating inputs is often easy. Knowing the correct output is often hard. Barr, Harman, et al. (2015) call this the **test oracle problem**. Common answers:

**Specified oracles**

- Expected values written by a human
- Assertions and contracts in the code
- Formal specifications

**Derived oracles**

- **Differential**: compare two implementations (compilers, parsers)
- **Metamorphic**: check relations between runs (sin(x) = sin(π−x); EMI in Ch. 1)
- **Properties**: PBT's `reverse(reverse(xs)) == xs`
- **Regression**: compare to the previous version

**Implicit oracles**

- Crashes, hangs, exceptions
- Sanitizers (memory errors, undefined behavior)
- Assertion failures
- Mostly what fuzzers use: "didn't crash"

**Human oracles**

- Manual testing, exploratory testing
- User acceptance testing
- Holzmann's suggestion for AI: "You ask it questions. If the answers are bizarre, then it's not working right."

## Generating tests automatically

- **Random testing and fuzzing**: Barton Miller's 1990 study crashed a large fraction of Unix utilities with random input. Today: **coverage-guided** fuzzers (AFL, 2013; libFuzzer) and **grammar-based** fuzzers that produce valid structured input (_The Fuzzing Book_). Google's OSS-Fuzz runs continuously on critical open source.
- **Property-based testing**: QuickCheck (2000), Hypothesis. Random inputs, properties as oracles, automatic shrinking of failures.
- **Symbolic and concolic execution**: DART (2005), KLEE (2008). Solve path constraints to reach new code (Ball, Ch. 1).
- **Search-based test generation**: EvoSuite (Fraser and Arcuri) evolves unit test suites for Java to maximize coverage.
- **Feedback-directed random testing**: Randoop builds call sequences for object-oriented APIs.
- **LLM-based generation**: fast and fluent, but beware Shriram's **correlated failure** when the same model writes code and tests (Ch. 2).

> **The reduction step.** Generated failing inputs are usually huge and unreadable. **Test-case reduction** (Zeller's delta debugging, Ch. 5) shrinks them to something a human can debug. Generation and reduction go together.

## Regression testing in practice

- **Continuous integration** runs the regression suite on every change (Shriram, Ch. 2: "the commit becomes my way of saying, this is a transaction boundary").
- **Test selection and prioritization**: when the full suite is too slow, run tests affected by the change first (change impact analysis).
- **Flaky tests** pass and fail on the same code: timing, concurrency, test-order dependence, network, randomness. They erode trust in the whole suite. Large companies report flakiness as one of their biggest testing costs (Luo et al., FSE 2014, is a good starting study).
- **Test maintenance**: tests are code and need refactoring too. Ball (Ch. 1): "maintaining test infrastructure is a tax you pay."
- **Smoke tests** and **staged rollouts** complement automated suites (Ball, Ch. 1).

> **TDD in one line.** Write a failing test, make it pass, refactor (Kent Beck). Zeller (Ch. 5) calls TDD his favorite process. Shriram (Ch. 2) thinks it's "not a good idea." Read both before deciding.

## Debugging as a process: Zeller's TRAFFIC

```
T Track the problem → R Reproduce → A Automate and simplify → F Find possible origins → F Focus on likely origins → I Isolate the infection chain → C Correct (and add a regression test)
```

From Zeller's _Why Programs Fail_. Debugging is a systematic search from the failure back to the defect along the **infection chain**, not inspired guessing. Step **A** is where automation pays most: a small, reliable, automatic reproduction makes every later step faster. That is the job delta debugging does.

## Debugging as science

```
Observe failure → Hypothesis → Prediction → Experiment → Observation ─(confirmed)→ Diagnosis
                       ▲                                   │
                       └──────── refine or reject ─────────┘
```

**Scientific debugging**: form a hypothesis about the cause, derive a prediction, run an experiment, and refine or reject. Keep a written log so you don't repeat experiments. Zeller: "50% of software development is essentially testing and debugging, which are, in their essence, experimental sciences."

## A debugging toolbox

- **Logging and print statements**: crude but universal. Make them structured and leave useful ones in.
- **Interactive debuggers**: breakpoints, stepping, watchpoints, inspecting state (gdb, IDE debuggers). Some support **reverse** or omniscient debugging (rr, time-travel debuggers).
- **Assertions**: turn assumptions into checks that fail close to the defect, shortening the infection chain.
- **Binary search over history**: `git bisect` finds the commit that introduced a bug in about log₂(n) steps.
- **Delta debugging**: automatically minimize failing inputs or changes.
- **Statistical fault localization**: rank suspicious lines by how often they execute in failing vs. passing tests (e.g., Tarantula, Jones, Harrold, and Stasko, 2002).
- **Sanitizers and dynamic analysis**: AddressSanitizer, Valgrind, race detectors.

> **Kernighan's version (Ch. 6).** Students had "not a clue about how to take a big set of possibilities and narrow it down to the point where you could start to see what went on." Nearly every tool on this slide is a way of narrowing down.

---

# Version control

*From one programmer's history file to research data on millions of projects*

## A short history of version control

- **1972** — SCCS: Marc Rochkind, Bell Labs
- **1982** — RCS: Walter Tichy; per-file revisions
- **1986** — CVS: Grune; multi-file, concurrent edits
- **2000** — Subversion: centralized, atomic commits
- **2002** — BitKeeper for Linux: distributed; proprietary
- **2005** — Git & Mercurial: Torvalds; Mackall
- **2008** — GitHub: pull requests, social coding

## Version control concepts

**Core ideas**

- **Commit**: a recorded snapshot or change with an author, time, and message.
- **Branch**: an independent line of development.
- **Merge**: combine branches; **conflicts** when both changed the same lines.
- **Tag / release**: a named version.

**Centralized vs. distributed**

- **Centralized** (CVS, Subversion): one server holds the history; clients check out working copies.
- **Distributed** (Git, Mercurial): every clone holds full history; work offline; many workflows.
- **Pull requests** (GitHub, 2008) made review part of the version control workflow (see Chapter 6 primer).

**History as data**

- `git blame`, `git log`, `git bisect` turn history into a debugging tool.
- Zeller's first delta debugging work isolated failure-causing **changes** between versions.
- **Mining software repositories** (Zimmermann, Zeller et al., 2004) treats millions of histories as research data, now also training data for AI tools.

## Check yourself before reading Chapter 5

1. For `if (a || b) x = 1;`, give a minimal test set for statement coverage, branch coverage, and MC/DC.
2. Why can a test suite have 100% branch coverage and a low mutation score? What does each measure tell you?
3. Name three kinds of test oracle. Which kind does a typical fuzzer use, and why?
4. Walk through TRAFFIC for a bug you've fixed recently. Which step took longest?
5. What does `git bisect` do, and why does it need only about log₂(n) steps?

## Further reading

- A. Zeller, Why Programs Fail: A Guide to Systematic Debugging (2nd ed.), 2009; and The Debugging Book (debuggingbook.org).
- A. Zeller et al., The Fuzzing Book (fuzzingbook.org).
- P. Ammann and J. Offutt, Introduction to Software Testing (2nd ed.), Cambridge, 2016.
- G. J. Myers, The Art of Software Testing, 1979 (3rd ed. 2011).
- R. A. DeMillo, R. J. Lipton, F. G. Sayward, "Hints on Test Data Selection: Help for the Practicing Programmer," IEEE Computer, 1978.
- E. T. Barr, M. Harman, P. McMinn, M. Shahbaz, S. Yoo, "The Oracle Problem in Software Testing: A Survey," IEEE TSE, 2015.
- Q. Luo, F. Hariri, L. Eloussi, D. Marinov, "An Empirical Analysis of Flaky Tests," FSE 2014.
- W. F. Tichy, "RCS — A System for Version Control," Software: Practice and Experience, 1985.
- S. Chacon and B. Straub, Pro Git (free online at git-scm.com/book).
