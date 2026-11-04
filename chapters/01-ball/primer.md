# Primer for Chapter 1 (Ball): How Do We Know Software Works?

*The verification and validation landscape: testing, static analysis, model checking, and proof*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Ball interview.*

## What this primer covers, and why

**Main topic: the verification and validation (V&V) landscape.** Verification vs. validation; the four big families of techniques (testing, static analysis, model checking, deductive proof); soundness, completeness, and false alarms; why everything is an approximation (Rice's theorem); state explosion and abstraction; choosing by cost and risk.

**Shorter history:** from Turing's 1949 "Checking a Large Routine" through Floyd and Hoare, model checking, SLAM, and the SMT revolution to modern fuzzing, plus the failures that motivated it all (Therac-25, Ariane 5, Knight Capital, Heartbleed).

> **Why read this first.** Tom Ball's career sits right where these families meet. SLAM combined model checking, predicate abstraction, and theorem proving to check Windows drivers. The interview moves quickly between "static analysis," "dynamic analysis," "symbolic execution," "model checking," "automated vs. interactive proof," and "property-based testing." This primer gives you the map so you can follow him. Later interviews (Holzmann, Zeller) build on it.

## Verification, validation, and some vocabulary

- **Verification**: are we building the product _right_? Does the software meet its specification?
- **Validation**: are we building the _right_ product? Does the specification (and so the software) meet users' real needs?
A **defect** (fault, bug) is a flaw in the code. When executed it may cause an **error** (a wrong internal state), which may cause a **failure** (visibly wrong behavior). Most V&V techniques are ways of finding defects before users see failures.

Every technique checks the program against **something else**: expected outputs, a property, a model, a specification. Krishnamurthi (Chapter 2) calls this needing "a pair of artifacts to check against." If that something else is wrong, the check is too.

> **Four families.** **Testing**: run the program on chosen inputs and check the results.

**Static analysis**: reason about the code without running it.

**Model checking**: exhaustively explore every state of a (finite) model.

**Deductive verification**: prove the code meets a specification, with machine help.

Plus human **review** and runtime **monitoring**.

## Dijkstra's warning

> "Program testing can be used to show the presence of bugs, but never to show their absence!"
>
> — Edsger W. Dijkstra, Notes on Structured Programming, 1970

The most quoted sentence in software verification. It doesn't say testing is useless. Testing is how almost all software is checked. It says testing alone gives no _guarantee_. Dijkstra's alternative was to construct programs together with proofs of their correctness. Fifty years later, as Ball describes, proof tools are finally good enough to do that for some critical software.

## The four families compared

**Testing**

- **Checks:** specific executions
- **Guarantee:** none beyond the tests run
- **Finds:** real bugs, almost no false alarms
- **Cost:** low to start; maintaining tests is "a tax" (Ball)
- **Tools:** xUnit, PBT, fuzzers

**Static analysis**

- **Checks:** all paths, approximately
- **Guarantee:** sound tools can rule out whole bug classes
- **Finds:** many issues, sometimes with **false alarms**
- **Cost:** cheap to run; triage takes effort
- **Tools:** type checkers, linters, Coverity, Infer, CodeQL

**Model checking**

- **Checks:** every state of a finite model
- **Guarantee:** property holds _for the model_
- **Finds:** subtle concurrency and protocol bugs, with a **counterexample**
- **Cost:** modeling effort; state explosion
- **Tools:** Spin, NuSMV, TLA+/TLC, CBMC

**Deductive proof**

- **Checks:** all executions, against a spec
- **Guarantee:** strongest; only as good as the spec
- **Finds:** anything the spec rules out
- **Cost:** high, expert-intensive
- **Tools:** Dafny, Lean, Coq/Rocq, Isabelle, F*

These families overlap and combine. Symbolic execution is part testing, part static analysis (Ball: 'a blending of both'). Bounded model checking uses SAT solvers. Static analyzers can be built from abstract interpretation (sound) or heuristics (unsound but practical). SLAM used model checking, abstraction, and a theorem prover together.

## Soundness, completeness, and false alarms

```
                     tool reports bug        tool reports no bug
real bug             TRUE POSITIVE           FALSE NEGATIVE (missed)
no bug               FALSE POSITIVE (alarm)  TRUE NEGATIVE
```

No tool can be sound, complete, and fully automatic for all programs (see next slide). **Verifiers** usually choose soundness and accept false alarms. **Bug-finders** (most industrial static analyzers, fuzzers) choose few false alarms and accept missed bugs. Krishnamurthi (Ch. 2) describes "model checking" itself drifting from the first kind to the second.

## Why everything is an approximation

**Rice's theorem** (1953): every non-trivial question about what an arbitrary program _does_ ("can this pointer be null?", "does this loop terminate?", "can these two threads both enter the critical section?") is **undecidable**. No algorithm answers it correctly for all programs.

So every automated tool gives something up:

- **Over-approximate** (consider more behaviors than are possible): sound, but raises false alarms. Abstract interpretation, type systems, SLAM's predicate abstraction.
- **Under-approximate** (consider fewer behaviors): no false alarms, but misses bugs. Testing, fuzzing, bounded model checking.
- **Ask a human**: interactive proof assistants, annotations, loop invariants.
Practical tools work anyway because real programs are not adversarial puzzles. Krishnamurthi (Ch. 2): "we throw SAT solvers at undecidable problems... undecidable, schmundecidable."

> **In Chapter 1.** Ball on static vs. dynamic: "when you want to try to summarize infinite behavior concisely, maybe that's one way to say that's some sort of static analysis." Over-approximation summarizes; testing samples.

## The assurance spectrum

```
code review & unit tests → PBT & fuzzing → static analysis → model checking → deductive proof
(cheap, partial, routine) ─────────────────────────────────▶ (expensive, strong, specialist)
```

In practice teams **combine** techniques in layers, each catching some of what others miss. How far right to go depends on the **cost of failure**: Ball's "return on investment," Zeller's "slope" (Ch. 5), and Holzmann's JPL (Ch. 4).

## Static analysis in one slide

Static analysis examines code without running it. You already use some: **type checkers** and compiler warnings are static analyses.

- **Lint** (Stephen Johnson, Bell Labs, 1978): flagged suspicious C constructs. It gave its name to a whole category of tools.
- **Data-flow analysis**: tracks facts ("x may be null here") along control-flow paths. Ball's Wisconsin training included program slicing and data-flow analysis.
- **Abstract interpretation** (Patrick and Radhia Cousot, 1977): a mathematical framework for _sound_ static analysis. Astrée proved the absence of runtime errors in Airbus flight-control software in the 2000s.
- **Industrial bug-finders**: Coverity (from Dawson Engler's Stanford research), Facebook/Meta's Infer, GitHub CodeQL. These tune for few false alarms.
- **Interactive analyzers** such as Holzmann's Cobra (Ch. 4) answer queries during code review.

> **The social problem.** Analyzers fail in practice less from weak algorithms than from **false alarms and bad workflow**. Developers ignore tools that cry wolf. Successful deployments (at Google, Meta, Microsoft) report few, actionable warnings at code-review time.

A good industrial reading: A. Bessey et al., "A Few Billion Lines of Code Later: Using Static Analysis to Find Bugs in the Real World," CACM 2010 (Coverity). Also C. Sadowski et al., "Lessons from Building Static Analysis Tools at Google," CACM 2018.

## Model checking in one picture

```
Model ─┐
       ├─▶ Model checker (explores every reachable state) ─┬─▶ ✓ property holds (for this model)
Property┘                                                   └─▶ ✗ counterexample trace
```

Developed independently by **Clarke and Emerson** (1981) and **Queille and Sifakis** (1982); Clarke, Emerson, and Sifakis shared the 2007 Turing Award. The killer feature is the **counterexample**: "We model checking people always want to know about the counterexamples!" (Groce, Ch. 1). The killer problem is **state explosion**: _n_ boolean variables can mean 2ⁿ states.

## Fighting state explosion: abstraction and solvers

- **Symbolic model checking** (Ken McMillan, early 1990s): represent huge sets of states compactly with binary decision diagrams (BDDs). It made hardware verification industrial.
- **Partial order reduction** (Peled, Godefroid, Valmari): skip redundant orderings of independent concurrent actions. It is built into Spin (Ch. 4).
- **Bounded model checking** (Biere, Cimatti, Clarke, Zhu, 1999): unroll the system _k_ steps and ask a **SAT solver** whether a bug is reachable. Ball: "the SAT solvers were getting better."
- **Abstraction and refinement (CEGAR)**: check a simplified model. If its counterexample is spurious, refine the abstraction and repeat. SLAM's **predicate abstraction** is the software version.
- **SMT solvers** (Z3, Yices, CVC): SAT plus theories of integers, arrays, and bit-vectors. Now the engine under symbolic execution, verifiers like Dafny, and much more.

> **SLAM in context.** SLAM (Ball and Rajamani, around 2000–2002) = C code → **predicate abstraction** (using a theorem prover) → **boolean program** → **model checking** → counterexample → **refine** with new predicates. Shipped as the Static Driver Verifier. Ball: "we couldn't ship with Simplify!"

## Deductive verification: proving programs correct

- **Floyd** (1967) attached assertions to flowcharts; **Hoare** (1969) gave the axiomatic rules: `{P} S {Q}`. If P holds before S runs, Q holds after.
- **Loop invariants** carry proofs through loops. Finding them is the hard, creative part (Zeller and Groce discuss LLMs suggesting them, Ch. 5).
- **Verification condition generation**: tools like Dafny turn code plus specs into logical formulas and hand them to an SMT solver (automated). Proof assistants like Lean and Coq/Rocq let humans guide proofs the machine checks (interactive).
- **Landmarks**: the CompCert verified C compiler (Leroy, 2006 onward); the seL4 verified OS microkernel (2009); Project Everest's verified TLS and cryptography (Ball, Ch. 1); AWS's use of TLA+ and automated reasoning.

> **The catch.** A proof is only as good as its **specification** ("verified against what?" asks Zeller, Ch. 5). And proofs are expensive, so they go where failure is unacceptable: kernels, compilers, crypto, flight software. Ball: apply them "where the return on investment makes sense."

## Failures that shaped the field

**Therac-25 (1985–87)**

- Radiation therapy machine; race conditions in its software caused massive overdoses in six known accidents, several of them fatal.
- Hardware interlocks from earlier models had been removed and their job left to software.
- **Lesson:** concurrency bugs; never trust software alone for safety; independent review (Leveson & Turner, 1993).

**Ariane 5, Flight 501 (1996)**

- Rocket self-destructed 37 seconds after launch.
- Reused Ariane 4 code converted a 64-bit float to a 16-bit integer; the faster rocket overflowed it.
- **Lesson:** reuse changes assumptions; specify and check ranges. Abstract-interpretation tools later targeted exactly this class of runtime error.

**Knight Capital (2012)**

- Trading firm lost about $440 million in 45 minutes.
- A deployment missed one server; a repurposed flag reactivated old, dead code.
- **Lesson:** deployment and configuration are part of the software; dead code is a hazard.

**Heartbleed (2014)**

- Missing bounds check in OpenSSL's heartbeat extension leaked server memory, including keys.
- Found by a Google engineer and, independently, by Codenomicon using fuzzing.
- **Lesson:** critical infrastructure needs systematic testing; led to more funding and OSS-Fuzz.

## A short history of verification, part 1

- **1949** — Turing: "Checking a Large Routine"
- **1967** — Floyd: assertions on flowcharts
- **1969** — Hoare logic: {P} S {Q}
- **1970** — Dijkstra: "presence, not absence"
- **1977** — Abstract interpretation; LTL: Cousots; Pnueli
- **1978** — lint: Johnson, Bell Labs
- **1981** — Model checking: Clarke & Emerson; Queille & Sifakis

## A short history of verification, part 2

- **1990** — Fuzz testing: Miller et al.: Unix utilities crash
- **1997** — Spin paper (TSE): Holzmann; ACM award 2001
- **2000** — QuickCheck: property-based testing
- **2002** — SLAM: Ball & Rajamani, POPL
- **2008** — Z3: de Moura & Bjørner
- **2009** — seL4: verified OS kernel
- **2016** — OSS-Fuzz: continuous fuzzing of open source

## Check yourself before reading Chapter 1

1. Explain the difference between verification and validation with an example where a program passes one and fails the other.
2. Why can't a static analyzer be sound, complete, and automatic for all programs? Which property do most industrial bug-finders give up?
3. What does a model checker produce when a property fails, and why is that so useful?
4. What is state explosion? Name two techniques for fighting it.
5. Place unit testing, fuzzing, static analysis, model checking, and proof on the assurance spectrum, and give one system for which the high end is justified.

## Further reading

- E. W. Dijkstra, Notes on Structured Programming (EWD249), 1970.
- C. A. R. Hoare, "An Axiomatic Basis for Computer Programming," CACM, 1969.
- E. M. Clarke, E. A. Emerson, J. Sifakis, "Model Checking: Algorithmic Verification and Debugging" (Turing Lecture), CACM, 2009.
- T. Ball and S. K. Rajamani, "The SLAM Project: Debugging System Software via Static Analysis," POPL 2002.
- A. Bessey et al., "A Few Billion Lines of Code Later," CACM, 2010.
- N. G. Leveson and C. S. Turner, "An Investigation of the Therac-25 Accidents," IEEE Computer, 1993.
- J. L. Lions et al., Ariane 5 Flight 501 Failure: Report by the Inquiry Board, 1996.
- B. P. Miller, L. Fredriksen, B. So, "An Empirical Study of the Reliability of UNIX Utilities," CACM, 1990.
- C. Newcombe et al., "How Amazon Web Services Uses Formal Methods," CACM, 2015.
