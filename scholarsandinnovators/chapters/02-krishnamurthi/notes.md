# Chapter 2 — Shriram Krishnamurthi: Champion of Letting a Thousand Languages Bloom

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. Notes marked **Key idea** are Shriram's own framings rather than standard terminology. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Shriram Krishnamurthi

Shriram is a professor at Brown University and a core member of the **Racket** team, which won the 2018 SIGPLAN Software Award. He co-wrote *How to Design Programs* (HtDP) and is the sole author of *Programming Languages: Application and Interpretation* (PLAI). With Kathi Fisler and others he wrote *A Data-Centric Introduction to Computing* (DCIC). He received the first SIGPLAN Robin Milner Young Researcher Award and the SIGSOFT Influential Educator Award. His recent research draws heavily on cognitive science and education research.

This is the longest interview in the first unit and the one with the most ideas per page. Read it slowly.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Bangalore, programming on paper | The *disadvantages* of interactivity; friction as a design tool |
| Scarcity → abundance | **Means of production vs. means of verification** (the chapter's central thesis) |
| Misconceptions | Mistakes vs. misconceptions; root causes are "two levels of education deeper" |
| What hasn't changed? "Nothing." | Data-driven programs; diagonalization; humans as the only constant |
| The power of language | "Anytime you make something 10x cheaper, it changes the way you use it"; Erlang; language-oriented programming |
| Expressiveness keeps rising | The Blub paradox; gradual typing; coroutines return |
| Safety and liveness | A temporal-logic idea applied to a research portfolio |
| Heroes | Admiration vs. hero worship; keeping critical distance |
| Testing and verification | PBT, model checking's change of meaning, CI, **correlated failure**, TDD |
| Teaching | Teaching methodology *backwards*; data-centric intro computing |
| What didn't I ask? | Design: multi-representational artifacts, UML/OCL, crits, PL as "materials science" |
| Postscript | Shriram updates his views on LLMs after agentic coding tools |

---

## Theme 1: Scarcity, abundance, and the hidden value of friction

Shriram learned to program in a two-month summer course in which he "touched a computer twice." He wrote everything on paper first. He once spent a summer writing what turned out to be a **meta-circular interpreter** in BASIC and then two days typing it in. He doesn't romanticize this, but he argues that we "don't talk enough about the disadvantages of interactivity":

> "It's too easy to change a character and run a program, right?... if you can only run a program once every 12 hours, that's got to give you some discipline that may actually be of use."

He has shown with an undergraduate that an *artificial delay* makes people create stronger passwords. He jokes about building exponential back-off into the IDE's "run" button.

He also names the cost. A "narrow waist" that builds discipline can also be "a filter that kicks people out." The challenge for teaching is to build the discipline without losing the people.

> [!NOTE]
> **KEY TERM: Batch processing vs. interactive programming**
>
> **Definition.** In *batch* computing, jobs (often on punched cards) were submitted to an operator and run later, sometimes hours later, so each run was costly. In *interactive* computing (time-sharing, REPLs, modern IDEs), feedback comes in seconds. Interactivity makes experimenting much cheaper. It may also encourage trial-and-error edits over reasoning ahead of time.
>
> **In the interview.** Shriram argues that batch constraints forced "learning how to compose offline before you get to type something in," which helps "thinking and planning." He wonders about "the cognitive and other affective consequences of not having everything instantly always available."

> [!NOTE]
> **KEY TERM: Meta-circular interpreter**
>
> **Definition.** An interpreter for a language written *in that same language* (or a close relative), usually reusing the host language's features to implement the same features of the interpreted language. The classic example is the Lisp `eval`/`apply` interpreter from McCarthy and *SICP*. Writing interpreters is the central teaching technique of PLAI.
>
> **In the interview.** As a teenager Shriram wrote one without knowing the term, in BASIC, which forced him to "construct your own control structures and module structures... because that was the only way you're going to be able to keep the complexity in your head."

---

## Theme 2: Means of production vs. means of verification

This is the chapter's central idea and one of the most-quoted ideas in the book.

Shriram's analogy is food. If you grow your own food, you know where the seeds, water, and fertilizer came from. When food is industrialized and arrives from a foreign farm through five distributors, a ship, a port, and a truck, "we now need regulators... checkers... all these mechanisms because we don't have trust in how the pieces got here."

> "When the means of production becomes really easy or scalable, highly scalable, then the means of verification have to scale up, and production is no longer the hard part. Verification becomes the hard part."

Code followed the same arc. First you wrote every line yourself. Then you used friends' code, then libraries, then the Internet, and now "you just get code at request from prose." He insists this is *not* special to software: "as usual, CS and programming people think we're unique snowflakes."

He adds the calculus analogy. Three centuries ago two people knew calculus. Now tens of millions learn it every year, none as well as Newton. "This is success." But a tool's sophistication must be matched by *appropriate* understanding. Otherwise you get "Garbage in garbage out, p-value reported, off we go!"

> [!TIP]
> **KEY IDEA: Means of production vs. means of verification**
>
> **Statement.** When producing an artifact becomes cheap and scalable, the bottleneck moves to establishing *trust* in it: testing, verification, review, and provenance. Verification effort has to grow with production.
>
> **In the interview.** Shriram applies this to libraries, the open Internet, and above all LLM-generated code: "gen-AI means the emphasis is on verification." At the end of the interview: "if nobody else is doing the verification for you, and you didn't grow the thing yourself, are you gonna eat it?" He even suggests LLMs "might be the best thing that happened to us, for those of us who care about testing and verification."

> [!NOTE]
> **KEY TERM: Software supply chain**
>
> **Definition.** All the components, tools, and processes that go into a piece of software: third-party libraries and their own dependencies, build tools, package registries, CI systems, and now AI code generators. *Supply-chain security* tries to make sure each link can be trusted. Examples include software bills of materials (SBOMs), signed builds, and reproducible builds.
>
> **In the interview.** Shriram uses the food, drug, and other supply chains to explain why verification must grow with production. The term is the industry name for exactly the problem his analogy describes.

> [!NOTE]
> **KEY TERM: Mistake vs. misconception (proximate vs. root cause)**
>
> **Definition.** In education research, a *mistake* is a one-off error: a typo, a misread question, a wrong checkbox. A *misconception* (some researchers say "alternate conception") is a *consistent* wrong mental model that produces errors in a predictable pattern. Engineering has a parallel distinction between a *proximate cause* (the immediate trigger of a failure) and a *root cause* (the underlying condition that made it possible).
>
> **In the interview.** Shriram's example is a Stack Overflow user "having trouble parsing this HTML using my regular expression!" A better regex fixes the proximate problem. The root problem is a misunderstanding of what regular expressions can recognize. Fixing it may require going "two levels of education deeper."

---

## Theme 3: What hasn't changed? "Nothing."

Groce asks what has changed least. Shriram first quotes Alan Perlis (Epigram 44): "Sometimes I think the only universal in the computing field is the fetch-execute cycle." He then gives a "radical answer": *nothing*, except perhaps transistors, and humans.

His main example is **data-driven programs**. When he started, "the only way a program got better was by somebody manually changing the code." Now you can leave the program the same, add data, and "the program gets better magically." He describes journalists writing about self-driving cars who explain that every decision comes from an `if` statement a programmer wrote: "you're right, and yet you are so wrong." "The ifs are in the data."

> [!NOTE]
> **KEY TERM: Data-driven (learned) software**
>
> **Definition.** Software whose behavior comes mainly from data (training sets, learned model weights) rather than from hand-written logic. Most important decisions in such a system are encoded in parameters learned from data, not in code a person can read.
>
> **In the interview.** Shriram argues this kind of computing has "thrown out all the rules" and that curricula haven't kept up. He and Fisler argued in *CACM* that the rise of data science curricula is "a stinging indictment of computer science curricula."

> [!NOTE]
> **KEY TERM: Undecidability (and practical approximation)**
>
> **Definition.** A problem is *undecidable* if no algorithm answers it correctly for every input. The halting problem is the classic example. By Rice's theorem, every non-trivial question about a program's *behavior* is undecidable. Practical tools work around this by approximating: they bound the search, accept "unknown" as an answer, or allow false alarms or missed bugs.
>
> **In the interview.** "We routinely... throw SAT solvers at undecidable problems. We do some finite approximation, and we get a good enough answer... undecidable, schmundecidable." To Shriram this shows the field's "fearlessness" and "irreverence."

> [!NOTE]
> **KEY TERM: Diagonalization**
>
> **Definition.** A proof technique from Cantor, later used by Turing, to show that some sets are uncountable and some problems are undecidable. You list all candidates and build a new object that differs from the *i*-th candidate in the *i*-th position, so it can't be anywhere on the list.
>
> **In the interview.** Shriram uses diagonalization as a metaphor for CS culture: "line up everything and just go through and change all of the assumptions." Sequential, imperative, classical, fault-free: every assumption has been "flipped." He also describes his backwards software engineering course (Theme 8) as "the diagonalization instinct in me."

---

## Theme 4: The power of language — make it cheap and it changes how you use it

Asked what one idea from his work a working programmer should know, Shriram answers: "we underestimate the power of language." Language design is his creative outlet, his answer to his father's question, "Why don't you go into graphics?"

He builds his main point from a Joe Armstrong essay on Erlang. Java threads were so heavyweight that developers built **thread pools** and work-stealing to get by with about 25 threads. Armstrong's question: what if your object-oriented language only allowed 25 *objects*? You would spend all your time rationing objects and never invent design patterns. Cheap allocation (good garbage collectors, bump-pointer allocation) is what made patterns of many cooperating objects possible. Erlang made *processes* cheap, which made patterns of many processes possible: **concurrency-oriented programming**.

Shriram's generalization:

> "Anytime you make something 10x cheaper, it changes the way you use it."

His examples: international phone calls (once a week-long ordeal, now instant), IP packets (cheap enough to resend that TCP's reliability patterns become possible), and his own goal: **language-oriented programming** in Racket, making new languages cheap enough that you can "let a thousand languages bloom."

> [!NOTE]
> **KEY TERM: Thread pool**
>
> **Definition.** A fixed set of pre-created worker threads that take tasks from a queue. It avoids the cost of creating a thread per task and caps the number of threads when threads are expensive.
>
> **In the interview.** Shriram treats the thread pool as a symptom of scarcity. Developers managed scarce threads like a "secretarial pool" instead of using threads freely. Armstrong's point is that the right fix is a runtime with *cheap* threads, not better pooling.

> [!NOTE]
> **KEY TERM: Concurrency-oriented programming (lightweight processes)**
>
> **Definition.** Joe Armstrong's term for Erlang's style. The Erlang VM provides very cheap, isolated processes that communicate only by message passing. Programs are built from huge numbers of them, including supervisor processes that watch others and restart them when they fail ("let it crash").
>
> **In the interview.** Shriram stresses that "by simply calling Erlang a functional language you're missing what's important." Functional purity matters mainly because "if the threads were stateful, then a thread dying is a problem."

> [!NOTE]
> **KEY TERM: Language-oriented programming and domain-specific languages (DSLs)**
>
> **Definition.** A *domain-specific language* is a small language designed for one problem area (SQL, regular expressions, Makefiles, HTML). *Language-oriented programming*, a central idea in Racket, means solving problems by *creating* languages suited to them. The host system makes defining a new language (syntax, semantics, tooling) cheap.
>
> **In the interview.** "Building programming languages is really hard for us... Racket's language-oriented programming is the same: we'll make it so easy to build a language that you can now go and experiment with languages." He calls it a "workbench" for experiments, like a woodworking bench in a basement.

> [!NOTE]
> **KEY TERM: Friction**
>
> **Definition.** Informally, any cost (time, effort, money, attention) that makes an action less likely. Designers of tools, processes, and interfaces can *remove* friction to encourage a behavior or *add* it on purpose to discourage one.
>
> **In the interview.** Friction connects the whole interview. Shriram *adds* friction to make people think (password delays, back-off on "run") and *removes* it to encourage good practice (cheap threads, cheap languages, CI that runs automatically on commit, Mermaid diagrams built into GitHub). "Every time you add friction you reduce the likelihood somebody will use it."

---

## Theme 5: Expressiveness keeps rising — and the Blub paradox

Shriram draws a language timeline for his PL classes: assembly; COBOL and FORTRAN; Pascal; C and C++ ("it's both high-level and low-level... what could go wrong?"); Java; Python; Rust. "Your favorite language is just the 17th one that everyone said will be the last thing you need to know." The trend is toward "richer and richer expressiveness of programmer intent." He predicts that in 20 years a "nontrivial number of programmers" will use proof-assistant-based languages.

Two specific trends:
- **Gradual typing.** "Every single language that started off as some sort of scripting language has gotten a gradual typing system." TypeScript is the largest example.
- **Control abstractions come back.** Coroutines were written off in the 1970s and then came back as async/await, generators, goroutines, and worker threads. "They all call it async, but they mean different things."

He jokes that the systems researchers who told him PL was "done" now evangelize Rust: "We have won."

> [!NOTE]
> **KEY TERM: Gradual typing**
>
> **Definition.** A type system that lets typed and untyped code be mixed in one program, so a dynamically typed codebase can add static types a piece at a time. Examples: TypeScript (for JavaScript), Python type hints with mypy or Pyright, Typed Racket. A key research question is what happens at the *boundary* between typed and untyped code (runtime checks, or none).
>
> **In the interview.** Shriram calls this an unavoidable trend: "the programs get big enough that we need something else." TypeScript "was just typed JavaScript" and is now seen "as its own language."

> [!NOTE]
> **KEY TERM: Coroutines and async**
>
> **Definition.** A *coroutine* is a routine that can suspend itself and be resumed later, keeping its local state. *Generators*, *async/await*, and goroutines are related mechanisms. They let programs express interleaved or event-driven computation, such as waiting on network I/O, without blocking a thread.
>
> **In the interview.** In his web programming research, Shriram noticed that web interactions are "like coroutining," though coroutines were "the one thing we were sure we didn't need." Today's "whole menagerie of control" shows how basic control constructs turned out to be insufficient.

> [!NOTE]
> **KEY TERM: The Blub paradox**
>
> **Definition.** From Paul Graham's essay "Beating the Averages" (2001). A programmer fluent in a hypothetical language "Blub" sees less powerful languages as obviously lacking. When looking at *more* powerful languages, they see only "weird" features they don't need, because they think *in* Blub. Programmers therefore systematically underrate languages more expressive than their own.
>
> **In the interview.** Shriram tries to "constantly ask myself, in what way am I being a Blub programmer?" He grants that "some pushback is very healthy," since adopting everything would be "a nightmare." He objects to "needless, antagonistic pushback" against the steady 5-to-20-year flow of ideas from academia to industry.

---

## Theme 6: Safety and liveness — in programs and in a research career

> [!NOTE]
> **KEY TERM: Safety and liveness properties**
>
> **Definition.** Two basic kinds of correctness property for systems that run over time (Lamport, 1977; formalized by Alpern and Schneider, 1985). A **safety property** says *something bad never happens*, for example "two processes are never in the critical section at once." A violation shows up in a finite trace. A **liveness property** says *something good eventually happens*, for example "every request is eventually answered." No finite trace can show a violation, because the good thing might still happen later. Every property is the intersection of a safety property and a liveness property.
>
> **In the interview.** Shriram, who learned verification from Moshe Vardi, uses the terms for his *research portfolio*. "Safety" is short-term, near-certain impact (which can have "a short shelf-life," tied to a technology like Scala that may fade). "Liveness" is long-term, speculative work that "might never have impact" but is what "make[s] a scientific dent in the world." He tries to keep one of each. Funding models need the same mix. (Groce adds that NSF and DARPA proposals often smuggle "liveness in under the guise of safety.")

---

## Theme 7: Heroes vs. hero worship

Shriram declines to name heroes. He separates "the hero versus hero worship." Hero worship "leads to like a lack of judgment, and it leads to defensiveness." His example: a worshipper of Douglas Crockford harassed him online over JavaScript, while Shriram was in fact collaborating with Crockford. His current intellectual influences are cognitive scientists and education researchers. He recalls Butler Lampson's advice in *Programmers at Work* to study the humanities ("learn to think, read, write"). Groce and Shriram agree that admiring someone well means admitting their weak work: "think about all the horrible Shakespeare plays."

**Takeaway for students:** "I think my job is to be critical... Otherwise I won't do good science." The same applies to methodologies (Theme 8) and to the interviewees in this book.

---

## Theme 8: Testing and verification — huge progress, new dangers

Shriram says testing and verification have advanced "hugely... It's unthinkable, the differences." He also thinks software engineers "dropped the ball" on property-based testing and PL people had to pick it up (Haskell's QuickCheck).

> [!NOTE]
> **KEY TERM: Property-based testing (PBT) — history**
>
> **Definition.** (See Chapter 1 for the basic definition.) Modern PBT is usually dated to **QuickCheck** for Haskell (Claessen and Hughes, ICFP 2000). Ports and descendants now exist for nearly every major language, such as Hypothesis for Python and jqwik for Java.
>
> **In the interview.** "The idea that there are large-scale PBT [Property-Based Testing] frameworks for almost every major language now, that was unthinkable." Shriram finds it "weird that of all things, Haskell, the most typed language, is the one that made PBT a thing," and mentions Debra Richardson's earlier work on similar ideas in software engineering.

> [!NOTE]
> **KEY TERM: Soundness and completeness (and the changing meaning of "model checking")**
>
> **Definition.** A verification technique is **sound** (for proving correctness) if, when it says "no bugs," there really are none: it never misses a real bug. It is **complete** if every correct program can be shown correct: it never raises a false alarm. Bug-finding tools usually give up soundness in this sense to scale.
>
> **In the interview.** "Model checking used to mean a sound and complete analysis over a model of a system. And it became exploration of a program. That is, a bug-finding technique." Shriram credits people like Dawson Engler for the shift and says he "gave up on that battle." Students should notice when a technical term's meaning has drifted. (Groce, whose PhD advisor was Ed Clarke, co-inventor of model checking, works in exactly this area.)

> [!NOTE]
> **KEY TERM: Concolic testing**
>
> **Definition.** Short for *conc*rete + symb*olic* execution (DART, CUTE, and KLEE are well-known tools). The program runs on concrete inputs while symbolic constraints for the path taken are recorded. One branch condition is then negated, and a solver produces new concrete inputs that drive execution down a different path.
>
> **In the interview.** Listed among "state exploration techniques, symbolic evaluation techniques... concolic evaluation." These are techniques where "we're going to use solvers to find the path that gets us to some point and then use that to drive test suites."

> [!NOTE]
> **KEY TERM: Mutation testing (mutation analysis)**
>
> **Definition.** A way to evaluate a test suite. Small syntactic changes (*mutants*) are inserted into the program, such as replacing `<` with `<=`, deleting a statement, or swapping a variable. A good suite should fail on ("kill") most mutants. The *mutation score* is the fraction killed. Mutants that survive point to weaknesses in the tests. The changes are made by *mutation operators*.
>
> **In the interview.** Shriram lists "mutation testing, mutation operators, generators for PBT" among the advances. Earlier, Groce names mutation analysis his "favorite thing" for judging tests, while admitting "it doesn't do the whole trick."

> [!NOTE]
> **KEY TERM: Continuous integration (CI)**
>
> **Definition.** The practice of merging changes into a shared mainline often, with an automated system (GitHub Actions, Travis CI, Jenkins) that builds and runs tests, linters, and analyses on every push or pull request.
>
> **In the interview.** Shriram calls the commit "a transaction boundary," a natural moment to say "this is a good time to run the big tests." CI removes the friction of remembering to test: "if I have to do it myself and manually remember when to do it, I won't." He also raises an unusual concern, the energy cost: "throwing CO2 into the atmosphere... I think we could maybe do a little less of some of this."

> [!NOTE]
> **KEY TERM: Correlated failure and independent artifacts**
>
> **Definition.** Failures are *correlated* when two supposedly independent checks fail in the same way for the same reason, so together they catch no more than one would alone. Verification works by comparing **two independently produced artifacts**: code vs. specification, code vs. tests, old version vs. new version, implementation A vs. implementation B (*differential testing*, *N-version programming*). Each check is only as strong as the two artifacts are independent.
>
> **In the interview.** "It really irritates me, and people use LLMs to generate the tests, this is just a classic example of correlated failure... the whole point here is you want a pair of artifacts to check against. It sort of doesn't matter what the pair is, provided they're different!" When Groce describes one LLM writing the spec, the code, and the tests: "Why are you dancing this close to the fire?"

> [!NOTE]
> **KEY TERM: Change impact analysis**
>
> **Definition.** Working out which parts of a system, which behaviors, and which tests a change could affect. It is used to select regression tests, guide review, and judge whether confidence in an old version carries over to a new one.
>
> **In the interview.** Shriram calls it a way to "transfer confidence": "I had a thing that worked... Now, I have a new thing... We're going to look at what changed, and see whether those changes are reasonable." The old and new versions form "a pair of artifacts."

> [!NOTE]
> **KEY TERM: Verification condition (VC)**
>
> **Definition.** A logical formula generated from a program and its specification (pre/postconditions, invariants). If the formula is valid, the program meets its specification. Verifiers like Dafny generate VCs and pass them to an SMT solver.
>
> **In the interview.** Shriram warns against extracting "verification conditions from the program" *without an independent specification*: "the program is definitionally correct... Of course it's going to tell you it passed." That can detect *changes in meaning* (regressions) but not whether the program is right.

> [!NOTE]
> **KEY TERM: Test-driven development (TDD)**
>
> **Definition.** A practice popularized by Kent Beck as part of Extreme Programming. Write a failing test, write the least code that makes it pass, refactor, and repeat ("red–green–refactor"). Supporters say it forces thinking about requirements first and leaves a regression suite behind.
>
> **In the interview.** "I do happen to think TDD is not a good idea." When TDD was strictly required in an intro course, students wrote "a long sequence of trivial breaking tests," doing "the least amount of work to get the token." Groce suggests TDD's real value may be that it "slows you down and makes you act so weirdly, it's almost as if you have someone else writing the test." That is an attempt to create *independent* artifacts.

---

## Theme 9: Teaching software engineering — methodology *backwards*

Shriram's proudest teaching moment was running a software engineering course in reverse. Students first built a real system for an external client *with no prescribed methodology*. In the last month, he had them imagine they were 1955 developers with punch cards and assembly code building a defense system, and *derive* a development process from first principles. They reinvented the **waterfall model** and came away *respecting* it before discussing its weaknesses.

The idea comes from Thomas Kuhn's *historicist* approach: judge earlier scientists by what they could observe and test at the time. It is "easy to look at people... before the Copernican Revolution, and say, 'Oh, a bunch of idiots!'" A related teaching point: well-crafted definitions look obvious. Ask students to write the definition themselves, give counterexamples to each attempt, and they will see the real one as "pretty clever."

> [!NOTE]
> **KEY TERM: Waterfall model (and its successors)**
>
> **Definition.** A sequential process model. Requirements, design, implementation, verification, and maintenance happen in order, each phase "flowing" into the next. It is often traced to Winston Royce's 1970 paper, which actually warned about the pure version and proposed feedback loops. Successors include iterative and incremental models, Boehm's **spiral model** (risk-driven iteration), and **Agile** methods. **COCOMO** (Boehm's Constructive Cost Model) is a parametric model for estimating effort from projected code size.
>
> **In the interview.** "It is the most mocked thing in software engineering." Shriram's students re-derived it as a *reasonable* response to 1955 constraints, when changes were very expensive. A common textbook sequence, as he and Groce joke, mocks the waterfall and then "draw[s] more loops."

> [!NOTE]
> **KEY TERM: Agile (and "the kernel of truth")**
>
> **Definition.** A family of iterative methods (Scrum, XP, Kanban) based on the 2001 *Agile Manifesto*. It values working software, customer collaboration, short iterations, and responding to change.
>
> **In the interview.** Shriram's general rule for methodologies: "The most extreme version of it is kind of obviously not quite right... But if you step back there's always some deep kernel of truth." The skill is to "extract the kernel of truth" without "getting caught up in the battle about it."

> [!NOTE]
> **KEY TERM: Expert blind spot**
>
> **Definition.** A term from education research (Nathan, Koedinger, and colleagues). Experts are systematically bad at predicting what novices will find hard, because their own knowledge has become automatic and invisible to them.
>
> **In the interview (postscript).** Shriram cites it to explain why his Spring 2026 course on programming with agents is "designed precisely to help us understand the student perspective". The only remedy is "having the students themselves tell us."

On intro computing, Shriram thinks "we've made very little progress" in curriculum. His alternative is **data-centric** intro computing (DCIC). It starts with **tables**, "the most important data structure in the world," and real data students care about. Limits of tables then motivate data structures. It also teaches Pyret and Python *side by side*, the way people learn a second natural language.

---

## Theme 10: Design — multi-representational, multi-step, and social

Shriram's answer to "what didn't I ask?" is about **design**. He calls PL and SE "the material science of computer science." We make the bricks and steel everyone else builds with, except that we can invent new materials any day. He asks what computing can learn from real design disciplines, such as the Rhode Island School of Design down the hill from Brown.

Main points:
- **Design is multimodal, multi-representational, and multi-step.** Frank Lloyd Wright drew floor plans and elevations before building Fallingwater. The Apple mouse patent has circuit and timing diagrams. Each representation "captures some things and doesn't capture some other things." Software developers too often start by "typing DEF space."
- **UML deserves more credit than it gets, though not for its most popular diagram.** Class diagrams just restate the code. OCL constraints and message sequence charts give a *different* view of behavior.
- **HtDP's design recipe** builds several artifacts before code: a contract, a purpose statement, examples. "The examples are actually a spec... specs from below. The types are specs from above."
- **Crits.** Shriram and Joe Politz asked a RISD professor how designers run *crits* and have tried them for software designs.
- **Programming languages as social objects.** Beyond the mathematical and engineering views of a language, Shriram proposes a third: the social. What would a language designed for *groups* look like? He wants tools for working with "a family of programs" "in the small" (his six versions of the PLAI interpreter).

> [!NOTE]
> **KEY TERM: UML, OCL, and message sequence charts**
>
> **Definition.** The **Unified Modeling Language (UML)** is a standard family of diagram notations for software design: class, sequence, state machine, activity diagrams, and more. The **Object Constraint Language (OCL)** is UML's textual language for invariants, preconditions, and postconditions over models. **Message sequence charts (MSCs)**, and UML sequence diagrams, show the messages exchanged between components over time in one scenario.
>
> **In the interview.** "The class diagram is just a simplification of the code... OCL is fundamentally different from the code. It's telling you something about the behavior." Groce notes that MSCs are a favorite of Gerard Holzmann (SPIN). Shriram: "when somebody like Holzmann likes something, you should just shut up and listen."

> [!NOTE]
> **KEY TERM: The design recipe (HtDP): contracts, purpose statements, examples**
>
> **Definition.** *How to Design Programs* teaches a step-by-step recipe for each function. (1) Define the data. (2) Write a **signature/contract** (input and output types) and a **purpose statement** (one line on what it computes). (3) Write **examples**, which later become tests. (4) Write a template from the data definition. (5) Write the body. (6) Test.
>
> **In the interview.** Shriram's model of multi-representational design: "Each one is a different modality." Examples are "specs from below" (concrete); types are "specs from above" (abstract, with "some lossiness").

> [!NOTE]
> **KEY TERM: Software product lines (feature-oriented software engineering)**
>
> **Definition.** A *software product line* is a family of related programs built from shared core assets plus variable *features*. Examples are a line of phone firmware or car configurations. *Feature-oriented software development* organizes code around features that can be combined to produce each variant.
>
> **In the interview.** Shriram's teaching materials face this problem "in the small": "I've got six overlapping programs that are all a family of programs." Groce supplies the term ("Product-lines"). Shriram notes "the tools for this are nonexistent" at small scale.

> [!NOTE]
> **KEY TERM: Design critique ("crit")**
>
> **Definition.** A structured review used in art, architecture, and design education. A designer presents work in progress, and peers and instructors critique it against the design goals. The aim is to improve the design and the designer's judgment, not to grade.
>
> **In the interview.** Shriram asks, "What would a crit be like? Could you imagine a PL class that did crits?" Groce notes that JPL "spends half its time doing this" for designs.

**Social and cognitive dimensions.** Shriram cites Meyerovich and Rabkin's *Socio-PLT* work on language adoption ("people cite it, but nobody does much with it"). He calls programming languages "the ultimate human-computer interface," one the HCI community has largely ignored.

---

## Postscript: updating on new facts

A few months after the interview, Shriram asked to update his comments on LLMs: "programming changed in a fundamental way in November 2025 with Claude Code... this is one of the 5 most important programming technologies I've seen." Groce kept the original answer for "historical integrity." The tools changed, not his reasoning: his earlier claims (production gets cheap, so verification must scale; correlated failure; pairs of artifacts) are untouched, and the postscript applies them, concluding that education has to change and that students must tell experts what they experience. **Class discussion:** how should an expert update when the facts change? What in the earlier interview anticipated this, and what didn't?

---

## Connections to other chapters

- **Chapter 1 (Ball):** Shriram explicitly disagrees with Ball's "details matter" as the field's constant. Both stress verification and see Lean and Rust as signs of rising expressiveness. Ball suggested the methodology question that produces Shriram's backwards-course story.
- **Chapter 3 (Liskov):** Liskov's "specifications are gonna matter tremendously" with AI fits the means-of-verification thesis. Her course with Guttag, organized around specification and proof, matches Shriram's derive-it-yourself teaching (Liskov: "teach from first principles"). Shriram's view of examples as "specs from below" pairs well with Liskov's specification-first view of types.

## Discussion questions

1. Apply "means of production vs. means of verification" to something outside software, such as journalism, scientific papers, or photos. Who plays the role of the regulators and checkers there?
2. Give two examples of "make something 10x cheaper, it changes the way you use it" in software tools you use. Can you think of a case where making something cheaper made outcomes *worse*?
3. In what way are *you* a Blub programmer? Name a language feature you dismissed and then came to value, or one you still dismiss.
4. Shriram says using an LLM to write both code and tests creates correlated failure. Design a workflow that uses LLMs but keeps two genuinely independent artifacts.
5. Imagine you are a developer in 1955 with punch cards building a payroll system. Derive a process. Which waterfall stages do you invent, and why?
6. Shriram argues TDD is "not a good idea," and Groce suggests its value may be an artificial independence. Which do you find more convincing? Use your own experience writing tests.

## Further reading

- M. Felleisen, R. B. Findler, M. Flatt, S. Krishnamurthi, *How to Design Programs* (2nd ed.), MIT Press. Free online at htdp.org.
- S. Krishnamurthi, *Programming Languages: Application and Interpretation*. Free online at plai.org.
- K. Fisler, S. Krishnamurthi, B. Lerner, J. G. Politz, *A Data-Centric Introduction to Computing*. Free online at dcic-world.org.
- S. Krishnamurthi and K. Fisler, "Data-Centricity: A Challenge and Opportunity for Computing Education," *CACM*, 2020.
- P. Graham, "Beating the Averages," 2001 (the Blub paradox).
- A. J. Perlis, "Epigrams on Programming," *SIGPLAN Notices*, 1982.
- K. Claessen and J. Hughes, "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs," ICFP 2000.
- B. Alpern and F. B. Schneider, "Defining Liveness," *Information Processing Letters*, 1985.
- M. Felleisen et al., "A Programmable Programming Language," *CACM*, 2018 (Racket and language-oriented programming).
- L. A. Meyerovich and A. S. Rabkin, "Socio-PLT: Principles for Programming Language Adoption," Onward! 2012.
- T. S. Kuhn, *The Structure of Scientific Revolutions*, 1962.

---

## Key term index

| Term | Theme |
|---|---|
| Batch processing vs. interactive programming | 1 |
| Meta-circular interpreter | 1 |
| *Key idea:* Means of production vs. means of verification | 2 |
| Software supply chain | 2 |
| Mistake vs. misconception (proximate vs. root cause) | 2 |
| Data-driven (learned) software | 3 |
| Undecidability (and practical approximation) | 3 |
| Diagonalization | 3 |
| Thread pool | 4 |
| Concurrency-oriented programming | 4 |
| Language-oriented programming / DSLs | 4 |
| Friction | 4 |
| Gradual typing | 5 |
| Coroutines and async | 5 |
| The Blub paradox | 5 |
| Safety and liveness properties | 6 |
| Property-based testing (history) | 8 |
| Soundness and completeness | 8 |
| Concolic testing | 8 |
| Mutation testing | 8 |
| Continuous integration | 8 |
| Correlated failure and independent artifacts | 8 |
| Change impact analysis | 8 |
| Verification condition | 8 |
| Test-driven development | 8 |
| Waterfall model (spiral, COCOMO) | 9 |
| Agile | 9 |
| Expert blind spot | 9 |
| UML, OCL, message sequence charts | 10 |
| The design recipe (HtDP) | 10 |
| Software product lines | 10 |
| Design critique ("crit") | 10 |
