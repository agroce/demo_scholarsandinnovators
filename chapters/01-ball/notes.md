# Chapter 1 — Thomas Ball: Explorer of Code and Verification

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All the terms are collected in a [term index](#key-term-index) at the end.

---

## About Tom Ball

Ball worked at Bell Labs from 1993 to 1999 and at Microsoft Research (MSR) from 1999 to 2025. At MSR he co-led the **SLAM** project with Sriram Rajamani. SLAM became the **Static Driver Verifier (SDV)**, which shipped in the Windows Driver Kit. It is one of the landmark cases of formal methods paying off in an industrial product. Ball later managed MSR's Software Reliability Group and co-managed the Research in Software Engineering (RiSE) group. More recently he has worked on **Microsoft MakeCode** and the **micro:bit**, a credit-card-sized device used to teach computing.

His path into computing ran from 1980s Apple II game programming (in BASIC, then 6502 machine language) to compilers at Cornell, then program analysis at Wisconsin under Tom Reps and Susan Horwitz. That bottom-up route shapes much of what he says in the interview.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Origins (Apple II → Cornell → Wisconsin) | Learning "bottom up"; building your own tools |
| What has changed / what hasn't | Layers of abstraction vs. "details really matter" |
| SLAM, contracts, Lean, Rust | Formalizing interface behavior; return on investment |
| Research culture and the "AI tsunami" | Time to go deep vs. pressure for quick returns |
| Testing in practice | "It depends": risk, layer, and gut feel decide what gets tested |
| Static vs. dynamic analysis | The line between them has blurred |
| AI and software development | Synthesis for end users, "oral culture," and breadcrumbs for agents |
| What didn't I ask? | Methodology, distributed teams, computing literacy for everyone |

---

## Theme 1: Abstraction is abundant, but details still matter

Ball says the biggest change since he started is **"just so many layers of abstraction now."** When he started, programmers built their own tools (a sprite editor, for example). Today GitHub, Codespaces, and free VMs come built in. What has changed least is that "details really matter":

> "There's this huge discontinuity that happens with software compared to mathematical, continuous functions."

In engineering fields built on continuous mathematics, a small change in input usually means a small change in output. Software is discrete: one wrong bit or one off-by-one can turn correct behavior into catastrophe.

> [!NOTE]
> **KEY TERM: Abstraction (layers of abstraction)**
>
> **Definition.** Abstraction means hiding details that don't matter for a given purpose, so a component can be used through a simpler model of what it does. Modern software is a *stack* of abstractions: hardware, OS, VMs and containers, language runtimes, libraries and frameworks, cloud services. Each layer lets the layer above ignore how it works.
>
> **In the interview.** Ball sees the growth of the abstraction stack as the biggest change in software development. He also warns that the field needs people who can work "close to the iron." Somebody has to build and maintain each layer, and AI systems in particular are bringing "new hardware, new compilers, and new programming languages."

> [!NOTE]
> **KEY TERM: Interface vs. implementation (API)**
>
> **Definition.** An *interface* (for libraries and services, an **API**, or Application Programming Interface) is the set of operations a component offers, with their types and documented behavior. The *implementation* is the code that provides that behavior. Good abstraction means clients should only need the interface.
>
> **In the interview.** Ball points out that in practice, interfaces and their documentation are often *not enough*. People "want to peek behind the interface" because of implementation errors or corner cases nobody documented. He recalls that with Java you could decompile bytecode to see what an API really did. Popular APIs gather community knowledge (for example, on Stack Overflow) because the official description of the software is incomplete. Compare Liskov (Chapter 3): her whole approach depends on interfaces carrying *behavioral specifications*, not just type signatures.

**Discussion.** Joel Spolsky called this the "Law of Leaky Abstractions": every non-trivial abstraction leaks to some degree. Ball's point about AI connects here. Prompts and agent instructions are a new form of English documentation that people write to get past the limits of an interface.

---

## Theme 2: SLAM — formalizing what an interface expects

Asked which of his own contributions matters most to an ambitious developer, Ball picks SLAM and its approach to "formalizing certain aspects of the expected behavior of an interface." Windows device drivers have to follow rules the kernel API imposes. Examples: acquire a spin lock before releasing it, and never acquire it twice. A driver that breaks these rules can crash the whole machine (the "blue screen of death"). SLAM checked drivers against such rules automatically.

Ball places this in a long tradition: "pre- and post-conditions, and Eiffel and design by contract... programming with invariants." His point is that "what's changed is again, the tools are just so much better."

> [!NOTE]
> **KEY TERM: Model checking**
>
> **Definition.** A technique that exhaustively explores the states of a model of a system to decide whether the model satisfies a property, often one written in temporal logic. If the property fails, the model checker produces a **counterexample**. Model checking was developed in the early 1980s by Clarke and Emerson and, independently, by Queille and Sifakis. It succeeded first in hardware verification.
>
> **In the interview.** The chapter introduction calls SLAM "the most visible evidence that model checking was not limited to hardware" but could work on real software. Ball says he learned model checking at Bell Labs (Holzmann's SPIN, Kurshan), and that much of his career was spent moving between program analysis and model checking. See also Shriram (Chapter 2), who describes how the *meaning* of "model checking" drifted from sound and complete analysis of a model toward bug-finding exploration of real programs.

> [!NOTE]
> **KEY TERM: Predicate abstraction**
>
> **Definition.** A way to build a finite, checkable model of a program with infinitely many states. You choose a set of boolean predicates over program variables (for example, `x > 0` or `lock_held == true`) and track only whether each predicate is true or false. The abstract model *over-approximates* the real program: any behavior the program can have, the model can also have. The technique comes from Graf and Saïdi (1997). SLAM used it in a loop called **CEGAR** (counterexample-guided abstraction refinement). If the abstract model shows a bug that the real program can't actually reach, the tool adds predicates to refine the model and tries again.
>
> **In the interview.** Ball names "Graf and Saidi predicate abstraction" and symbolic execution as foundations SLAM built on. This is how SLAM made *software* model checking practical. The model only tracks facts relevant to the API rule being checked.

> [!NOTE]
> **KEY TERM: Counterexample**
>
> **Definition.** A concrete witness that a property does *not* hold. For a model checker, this is usually an execution trace that leads to a violation. Counterexamples make verification tools useful for debugging, because they show *how* things go wrong and don't just report *that* they do.
>
> **In the interview.** When discussing how to evaluate LLMs, Ball says "we want both positive and negative examples." Groce replies, "We model checking people always want to know about the counterexamples!" Knowing a concept means more than producing correct examples. You also have to recognize violations.

> [!NOTE]
> **KEY TERM: Preconditions and postconditions**
>
> **Definition.** A *precondition* is what must be true when a function or operation is called. A *postcondition* is what the function guarantees when it returns, provided the precondition held. The idea goes back to Hoare's 1969 axiomatic semantics: `{P} S {Q}` means that if `P` holds before `S` runs and `S` terminates, then `Q` holds afterward.
>
> **In the interview.** Ball traces SLAM back to "pre- and post- conditions." Later he jokes that "Formal verification says: if we just documented pre- and post-conditions, we'd have such a better life." He then notes that people are now writing very similar annotations, just aimed at AI agents. (Liskov's chapter is all about specifications built from these ideas.)

> [!NOTE]
> **KEY TERM: Design by contract**
>
> **Definition.** A design method associated with Bertrand Meyer and the Eiffel language. Each routine has an explicit *contract* (preconditions, postconditions, and class invariants), ideally checked at run time. The caller is responsible for the precondition. The routine is responsible for the postcondition.
>
> **In the interview.** Ball names "Eiffel and design by contract" as the intellectual ancestors of SLAM's interface rules. (Groce brings Meyer up again in Chapter 3, with Liskov.)

> [!NOTE]
> **KEY TERM: Invariant**
>
> **Definition.** A property that is always true at certain points in a program's execution. A *loop invariant* holds at the start of every loop iteration. A *class* or *representation invariant* holds for every object whenever it is visible to clients. A *system invariant* holds in every reachable state.
>
> **In the interview.** Ball: "people have understood this programming with invariants for a long time, and what's changed is again, the tools are just so much better." Compare Liskov's **representation invariant** (Chapter 3).

---

## Theme 3: Proof tools, new languages, and return on investment

Ball points ambitious developers toward two technologies: **Rust** and **Lean**. Senior developers he knows are moving from C++ to Rust. Lean has had "a tremendous impact with the mathematics community" and is increasingly used for software verification. He credits its metaprogramming, IDE integration, and documentation. He tells the story of Leonardo de Moura, co-author of the **Z3** SMT solver, coming to his office to say he wanted to do *interactive* rather than *automated* theorem proving. He also repeats de Moura's slogan about **optimizing without fear**: if you have a proof of correctness and the proof is easy to update, you can try aggressive optimizations you would otherwise avoid.

He keeps qualifying all this enthusiasm. "There's no silver bullet." Verification belongs where "the return on investment makes sense." He lists the places it has: Windows drivers, Project Everest (verified cryptographic protocols), Amazon, ACL2 in hardware, and Ken McMillan's work at Cadence.

> [!NOTE]
> **KEY TERM: Formal verification — automated vs. interactive theorem proving**
>
> **Definition.** *Formal verification* uses mathematical proof to show that a program or design meets a specification for **all** inputs, not just the ones tested. An *automated* theorem prover or solver (such as Z3) tries to find proofs without human help. That works well for decidable or restricted problems. An *interactive* theorem prover, or **proof assistant** (Lean, Coq/Rocq, Isabelle, ACL2), has a human guide the proof while the machine checks every step. It can handle much richer properties, at the cost of human effort.
>
> **In the interview.** Ball describes SLAM's bet on automated theorem proving at a time when the available tool (Simplify) was "dog slow" and couldn't even be shipped because of its license. He calls Lean, a proof assistant written in Lean itself, a huge step forward. (Ball half-remembers Coq's new name as "Rooster." Coq was renamed **Rocq** in 2025.)

> [!NOTE]
> **KEY TERM: SAT and SMT solvers**
>
> **Definition.** A *SAT solver* decides whether a boolean formula has a satisfying assignment. An *SMT* (Satisfiability Modulo Theories) solver extends this to formulas over richer theories: integers, arrays, bit-vectors, and so on. Both problems are hard in theory (SAT is NP-complete, and some SMT theories are undecidable), yet modern solvers handle huge real-world instances. They are the engines inside many verification, symbolic execution, and test-generation tools.
>
> **In the interview.** Ball recalls that in the early 2000s "it wasn't very clear... that we're going to have the SMT revolution." SLAM was a bet that solvers would get faster, "as Bill Gates did." Z3 (de Moura and Bjørner) later became one of the most widely used SMT solvers. Shriram (Chapter 2) jokes that "we throw SAT solvers at undecidable problems."

> [!NOTE]
> **KEY TERM: "No silver bullet" / return on investment (ROI) of quality techniques**
>
> **Definition.** In "No Silver Bullet" (1986/87), Fred Brooks argued that no single technology or management technique would improve software productivity by an order of magnitude, because most of the difficulty is *essential* (it lies in the problem itself) rather than *accidental*. In quality assurance, the related idea is that every technique (testing, static analysis, formal proof) has a cost, and it should go where the expected benefit justifies that cost.
>
> **In the interview.** Ball uses both phrases. Verification should be applied "where they're most useful and where the return on investment makes sense," and AI coding tools are also "no silver bullet." Groce's answer in Chapter 2 makes the same point: "every bug has its own favorite method to find it."

> [!NOTE]
> **KEY TERM: Memory safety and ownership (Rust)**
>
> **Definition.** A program is *memory safe* if it can't access memory it shouldn't. That rules out buffer overflows, use-after-free, and double free. Rust enforces memory safety without a garbage collector through its **ownership and borrowing** type system: each value has one owner, references are checked by the compiler, and data can't be mutably aliased.
>
> **In the interview.** Ball sees Rust "becoming much more central to systems programming" while admitting it is hard to "make good use of the type system and not clone everything." When discussing testing, he hopes stronger interfaces like Rust's mean "we don't have to worry as much about memory safety, we don't have to maybe test for that." Shriram (Chapter 2) jokes about systems researchers becoming Rust evangelists.

> [!NOTE]
> **KEY TERM: Dependent types**
>
> **Definition.** A type system where types can depend on *values*. For example, `Vector n` is the type of lists of exactly length `n`, and a function's return type can mention its argument. With dependent types, propositions can be written as types and proofs as programs (the Curry–Howard correspondence). That is the basis of proof assistants like Lean and Coq/Rocq.
>
> **In the interview.** Ball: "Once you have programs that have types. But the types also have programs in them! You really must bend your mind around this whole idea. But it is so powerful!" He argues that if mathematicians can master this, "we should have a core of software engineers who also are on top of this."

---

## Theme 4: Testing in practice — "it depends"

Asked whether testing has kept up with software complexity, Ball doesn't claim it has. He describes the MakeCode team as typical. The compiler has regression tests. The large GUI portion gets user testing, manual testing, and a weekly **smoke test**, but no automated GUI testing, even though "that's been a huge, huge research topic." He says choices like these come down to "gut feel," with the right technique depending on "the layer, the software component... [and] the risk of it failing."

He also notes that Microsoft "got rid of the testing discipline" (dedicated testers). It relies instead on Beta, Insider, and staged release "rings," "but we still get bitten by these bad bugs."

> [!NOTE]
> **KEY TERM: Regression testing**
>
> **Definition.** Re-running existing tests after a change to check that behavior that used to work still works. A *regression* is a bug where previously correct behavior breaks. Regression suites are usually automated and run on every change.
>
> **In the interview.** The MakeCode compiler has "a set of tests, to make sure we don't regress the compiler." Ball contrasts the well-tested compiler with the barely tested GUI. Shriram (Chapter 2) traces the analytics behind regression testing to Weyuker and Ostrand's work at Bell Labs.

> [!NOTE]
> **KEY TERM: Smoke test**
>
> **Definition.** A quick, shallow test of a build's most important functions ("does it turn on without smoke coming out?"). It catches glaring breakage before deeper testing or release. Smoke tests trade thoroughness for speed.
>
> **In the interview.** The MakeCode team does "a weekly smoke test of things just to make sure it's still stable." It is the main safety net for code that has no automated tests.

> [!NOTE]
> **KEY TERM: Unit tests, integration tests, and compositional verification**
>
> **Definition.** A *unit test* exercises one small component in isolation. An *integration test* exercises several components together. *Compositional* reasoning checks the parts separately, plus their interface assumptions, and concludes the whole is correct without analyzing it all at once. It is the main way verification scales.
>
> **In the interview.** Ball calls composition "super tough." Device drivers are "plugins to the operating system," and "I take your software and compose it with my software" is where bugs hide. He mentions research that factors integration tests into unit tests (Saff, Ernst, and colleagues, on test factoring). He also notes the catch: "If I don't have the units, I don't have the unit tests."

> [!NOTE]
> **KEY TERM: Property-based testing (PBT)**
>
> **Definition.** Instead of writing individual input/output examples, the tester states a *property* that should hold for all inputs (for example, `reverse(reverse(xs)) == xs`). A framework (QuickCheck, Hypothesis, and others) generates many random or systematic inputs to look for a counterexample, then usually *shrinks* any failure to a minimal case.
>
> **In the interview.** Ball lists PBT and symbolic execution as advances that are available, but notes "it's still quite a bit of work... to integrate that tool into your test framework." Shriram (Chapter 2) gives a fuller history of PBT.

> [!NOTE]
> **KEY TERM: Monitoring and profiling**
>
> **Definition.** *Profiling* measures where a program spends its time or resources, such as which paths, functions, or lines run and how often. *Monitoring* observes a running production system (metrics, logs, traces) to detect failures and performance problems. Both are forms of **dynamic analysis**.
>
> **In the interview.** Ball worked on path profiling with Jim Larus. He says that with cloud systems "you simply can't go inside. You must monitor at the API level." Observing deployed behavior has become central because many components are black boxes.

> [!NOTE]
> **KEY TERM: Staged rollout (release rings) and the testing discipline**
>
> **Definition.** A *staged rollout* releases software to progressively larger groups: internal "dogfooding," "friends and family," Insider or Beta rings, then everyone. Problems surface while few users are affected. A *testing discipline* is a dedicated professional role (often "SDET," Software Development Engineer in Test) responsible for testing, separate from developers.
>
> **In the interview.** "At Microsoft we got rid of the testing discipline. And was that a good choice?" Ball doesn't know. He notes the move to rings and Insider builds, and that "we still get bitten by these bad bugs."

**A phrase worth remembering:** "maintaining test infrastructure is a tax you pay. But how much are you willing to pay?"

---

## Theme 5: Static vs. dynamic analysis — a blurred line

Groce asks about Ball's 1999 paper "The Concept of Dynamic Analysis" (the "twelve days of Christmas" paper). Ball calls it two "throwaway ideas" and is a little embarrassed it was accepted. Asked whether static and dynamic analysis are more clearly separated now, he says the line is "much more blurred."

> [!NOTE]
> **KEY TERM: Static analysis vs. dynamic analysis**
>
> **Definition.** *Static analysis* reasons about a program without running it, usually over-approximating all possible behaviors. Examples are type checking, data-flow analysis, and abstract interpretation. *Dynamic analysis* observes actual executions, so it is precise about the runs it sees but sees only those. Examples are testing, profiling, and runtime monitoring. The classic trade-off: static analysis can be sound but imprecise (false alarms), while dynamic analysis is precise but incomplete (missed bugs).
>
> **In the interview.** Ball suggests one way to draw the line: "when you want to try to summarize infinite behavior concisely, maybe that's one way to say that's some sort of static analysis." He then admits "any sort of straw man you propose can sort of be broken down."

> [!NOTE]
> **KEY TERM: Symbolic execution**
>
> **Definition.** Running a program on *symbolic* inputs (variables like `α`) instead of concrete values, and collecting a *path condition*, the constraints on the inputs that lead down each branch. A constraint solver can then find concrete inputs for a chosen path, or prove a path infeasible. Symbolic execution dates back to the 1970s (King, Boyer et al.). Mixing it with concrete execution gives **concolic** testing.
>
> **In the interview.** Ball calls symbolic execution "a blending of both, dynamic, because you're picking a control flow path. But it's static because you're not necessarily fixing the inputs."

> [!NOTE]
> **KEY TERM: Partial evaluation**
>
> **Definition.** Specializing a program for some inputs that are known in advance, leaving the rest symbolic, which produces a faster residual program. For example, specializing an interpreter to a fixed source program effectively compiles it (the first Futamura projection).
>
> **In the interview.** Ball cites partial evaluation, "where some subset of inputs are given and some others are left symbolic," as another technique that is both static and dynamic.

> [!NOTE]
> **KEY TERM: Dead code and test-dead code (Equivalence Modulo Inputs)**
>
> **Definition.** *Dead code* never runs on any input. *Test-dead* (or dynamically dead) code simply didn't run on a particular test. The **Equivalence Modulo Inputs (EMI)** technique (Le, Afshari, and Su, PLDI 2014) changes test-dead code (for example, deleting or inserting statements) and recompiles. For that test input, the program's output must not change. If it does, the *compiler* has a bug. This is a kind of **metamorphic testing**: you check a relationship between runs instead of knowing the correct output.
>
> **In the interview.** Ball calls the idea "brilliant": "if you inject code into the dead spot and you run the test again, you expect the same behavior." Then he asks whether it is static or dynamic. "It's some blending of the two."

---

## Theme 6: AI — synthesis, understanding, and "breadcrumbs"

Ball, who calls himself "sort of a skeptic," gives one of the more measured AI discussions in the book.

1. **Program synthesis for end users.** The best near-term value may go to people who never see the program. His example is Excel's **Flash Fill**, which builds string transformations from a few examples.
2. **Understanding vs. defining.** An LLM can *define* poker, but can it *play* poker, follow the rules, and recognize an illegal move? Benchmarks designed for humans may not test machine understanding. A model may pass "for the wrong reasons."
3. **Breadcrumbs for agents.** Large codebases have an **oral culture**, knowledge that lives only in people's heads. To get agents to work, teams now write down that knowledge. "Eventually, you tell it so much that you may not be needed anymore..." Ball calls this a "double-edged sword."

> [!NOTE]
> **KEY TERM: Program synthesis / programming by example (PBE)**
>
> **Definition.** *Program synthesis* automatically builds a program from a higher-level description of intent: a logical specification, a natural-language description, or examples. *Programming by example* is synthesis from input/output examples. Flash Fill (Gulwani, POPL 2011) is the best-known deployed case. A user types a few reformatted cells, and Excel infers the transformation.
>
> **In the interview.** Ball describes a "rebirth of program synthesis" with LLMs. He stresses that for end users "that program is just thrown away. In fact, the program in the case of Flash Fill is never even seen," and validation is done by the user looking at results.

> [!NOTE]
> **KEY TERM: Oral culture (tribal knowledge) of a codebase**
>
> **Definition.** Knowledge about a system (why things are designed as they are, which parts are fragile, unwritten conventions) that is passed on in conversation, pair programming, and mentoring instead of being documented. Sometimes called *tribal knowledge*. Teams lose it when people leave.
>
> **In the interview.** Ball recalls that at Bell Labs people talked about "the oral culture" around huge codebases like the 5ESS switch. LLMs can't just "ingest a huge code base and understand it." Instead, developers are "leaving breadcrumbs" and decomposing tasks, writing down oral culture for machines. Compare Liskov's and Shriram's emphasis on specifications as a second, independent statement of intent.

> [!NOTE]
> **KEY TERM: Benchmark validity and survivorship bias**
>
> **Definition.** A benchmark (or test, or quiz) is *valid* if passing it actually shows the ability it claims to measure. *Survivorship bias* is drawing conclusions only from cases that "survived" a filter. The classic example is Abraham Wald's WWII analysis: armor should go where returning bombers had *no* bullet holes, because planes hit there didn't come back.
>
> **In the interview.** Ball cites work arguing that LLM benchmarks "were designed for humans." Because an LLM "is not a human," passing may not mean human-level understanding, and it "may break in other ways that we should be testing for." He and Groce bring up the bullet-hole plane: "The bad cases are invisible." The same problem applies to any test suite. Tests show what was checked, not what was missed.

> [!NOTE]
> **KEY TERM: Vibe coding**
>
> **Definition.** An informal term (coined by Andrej Karpathy in 2025) for building software by prompting an AI and accepting its output with little or no review of the code itself, steering by whether the result *seems* to work.
>
> **In the interview.** Ball lists "AI and vibe coding" as the latest example of tech's "insane infatuation with the new." Earlier he described the gap between code that "sort of works" and code that does what you want.

---

## Theme 7: Research culture, hype, and people

- **Deep time.** Ball credits Bell Labs and MSR with giving "big blocks of uninterrupted time to go deep." He worries that pressure for "quick returns" on AI investments threatens this. When everyone moves in one direction, "it's maybe good to do something else!"
- **Infatuation with the new.** Ball calls "this insane infatuation with the new" a widespread unhealthy practice, from JavaScript frameworks to AI hype. "Money changes everything."
- **Big companies vs. startups.** Large companies have compliance requirements, check boxes, and "security first" policies, while startups are "just trying to survive." His example is GDPR compliance, which varies with size and visibility.
- **Methodology and people.** Ball's own answer to "what didn't I ask?" was methodology (Scrum and similar) and *distributed software development*, including remote work after COVID. "People still matter a lot." This suggestion led Groce to ask later interviewees about methodology (see Chapter 2).
- **Computing literacy.** Not everyone will be a software engineer, but everyone needs basic understanding of computing, the way drivers need some intuition about physics.

> [!NOTE]
> **KEY TERM: Software development methodology (process model)**
>
> **Definition.** A structured approach to organizing software work: how requirements are gathered, how work is planned, how teams coordinate, and how releases happen. Examples include waterfall, spiral, and Agile families such as Scrum (time-boxed sprints, a product backlog, daily stand-ups) and Kanban.
>
> **In the interview.** "I'm not a methodology guy but I do think people still matter a lot and how you organize teams." Ball points Groce toward this gap. He also mentions Jim Herbsleb's research on **distributed software development** at Bell Labs and says GitHub and the Internet have "radically" changed team coordination.

---

## Connections to other chapters

- **Chapter 2 (Krishnamurthi):** Groce quotes Ball's "details matter" answer back to Shriram, who instead argues that "nothing" has stayed constant except humans. Shriram's "means of production vs. means of verification" thesis echoes Ball's worry that AI-generated code "sort of works" without doing what you want. The methodology question Groce asks Shriram came from Ball.
- **Chapter 3 (Liskov):** Ball's pre/postconditions and interface rules are a direct descendant of Liskov's specification-centric view of abstraction. Both predict that specifications will matter *more* with AI-generated code.

## Discussion questions

1. Ball says software has a "huge discontinuity" compared to continuous mathematical functions. Give an example of a one-character bug with outsized consequences. Does this property make testing fundamentally harder than testing a bridge?
2. Ball's MakeCode team uses automated tests for the compiler but only manual and smoke testing for the GUI. Defend this choice in terms of risk and return on investment, then argue against it.
3. Is symbolic execution a static or a dynamic analysis? Propose a definition that separates the two, then try to break it with one of Ball's examples.
4. Ball suggests that the more we document a system for AI agents, the less we may be needed. Is "leaving breadcrumbs" for agents different from writing good documentation for human newcomers?
5. When "a lot of people are just moving in the same direction," Ball says, "it's maybe good to do something else!" What would that mean for your own choice of projects or career?

## Further reading

- T. Ball and S. K. Rajamani, "The SLAM Project: Debugging System Software via Static Analysis," POPL 2002.
- T. Ball et al., "Thorough Static Analysis of Device Drivers," EuroSys 2006.
- T. Ball, "The Concept of Dynamic Analysis," ESEC/FSE 1999.
- S. Graf and H. Saïdi, "Construction of Abstract State Graphs with PVS," CAV 1997.
- V. Le, M. Afshari, and Z. Su, "Compiler Validation via Equivalence Modulo Inputs," PLDI 2014.
- S. Gulwani, "Automating String Processing in Spreadsheets Using Input-Output Examples," POPL 2011.
- F. P. Brooks, Jr., "No Silver Bullet: Essence and Accidents of Software Engineering," *IEEE Computer*, 1987.
- C. A. R. Hoare, "An Axiomatic Basis for Computer Programming," *CACM*, 1969.

---

## Key term index

| Term | Theme |
|---|---|
| Abstraction (layers of abstraction) | 1 |
| Interface vs. implementation (API) | 1 |
| Model checking | 2 |
| Predicate abstraction (CEGAR) | 2 |
| Counterexample | 2 |
| Preconditions and postconditions | 2 |
| Design by contract | 2 |
| Invariant | 2 |
| Formal verification: automated vs. interactive theorem proving | 3 |
| SAT and SMT solvers | 3 |
| "No silver bullet" / ROI of quality techniques | 3 |
| Memory safety and ownership (Rust) | 3 |
| Dependent types | 3 |
| Regression testing | 4 |
| Smoke test | 4 |
| Unit tests, integration tests, compositional verification | 4 |
| Property-based testing | 4 |
| Monitoring and profiling | 4 |
| Staged rollout / testing discipline | 4 |
| Static analysis vs. dynamic analysis | 5 |
| Symbolic execution | 5 |
| Partial evaluation | 5 |
| Dead code / test-dead code (EMI) | 5 |
| Program synthesis / programming by example | 6 |
| Oral culture (tribal knowledge) | 6 |
| Benchmark validity and survivorship bias | 6 |
| Vibe coding | 6 |
| Software development methodology | 7 |
