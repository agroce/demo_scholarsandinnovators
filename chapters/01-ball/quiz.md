# Quiz — Chapter 1: Thomas Ball

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** Ball says the biggest change in software development since he started is:

- (a) the end of the need for compilers
- (b) the rise of object-oriented programming
- (c) the move from waterfall to Agile methods
- (d) the sheer number of layers of abstraction and freely available tools

**2.** According to Ball, what has changed *least*?

- (a) C is still the dominant systems language
- (b) Testing is still mostly manual
- (c) Programmers still need to understand machine language
- (d) Details still matter, because small errors can cause disproportionate failures

**3.** SLAM and the Static Driver Verifier were landmark applications of which technique to industrial software?

- (a) Mutation testing
- (b) Random GUI testing
- (c) Abstraction-based model checking
- (d) Code review checklists

**4.** In *predicate abstraction*, a program is modeled by:

- (a) replacing all loops with recursion
- (b) translating it into a different programming language
- (c) tracking only the truth values of a chosen set of boolean predicates over program state
- (d) running it on randomly chosen inputs

**5.** Ball describes the MakeCode team's testing as:

- (a) outsourced to a dedicated testing department
- (b) regression tests for the compiler, but mostly manual/user testing and a weekly smoke test for the GUI
- (c) formally verified end to end
- (d) fully automated, including the GUI

**6.** The "test-dead code" technique Ball calls "brilliant" (Equivalence Modulo Inputs) finds compiler bugs by:

- (a) deleting all code that is never called
- (b) modifying code that a given test does not execute and checking that the output for that test is unchanged
- (c) comparing two compilers' outputs on random programs
- (d) proving the compiler correct in Lean

**7.** Ball's example of program synthesis where the program "is never even seen" by the user is:

- (a) Excel's Flash Fill
- (b) GitHub Copilot
- (c) VS Code extensions
- (d) Lean's metaprogramming

---

## Part B — Short answer (3–5 sentences each)

**8.** Ball calls symbolic execution "a blending of both" static and dynamic analysis. Explain what makes it partly static and what makes it partly dynamic.

**9.** Ball and Groce bring up the WWII bomber with bullet holes. Explain the analogy and how it applies to evaluating LLMs with benchmarks designed for humans, or to any test suite.

---

## Part C — Short essay (1–2 paragraphs)

**10.** Ball says developers are "leaving breadcrumbs" for AI agents, writing down a codebase's "oral culture" so agents can make progress. He calls this a "double-edged sword." Explain both edges. Then say whether you think this documentation is fundamentally different from the pre- and postconditions that formal verification has always asked for, and why.
