# Chapter 9 — Fred B. Schneider: Systems with Integrity

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Fred B. Schneider

Schneider is the Samuel B. Eckert Professor of Computer Science at Cornell. His work spans formal methods, fault-tolerant distributed systems, and computer security, which he sees as one subject: how to build **trustworthy systems**. He received the 2018 **Dijkstra Prize** for "Defining Liveness" (with Bowen Alpern, 1985) and the final IEEE Emanuel R. Piore Award (2012). He is a fellow of the ACM, IEEE, and AAAS, and a member of the U.S. National Academy of Engineering, its Norwegian counterpart, and the American Academy of Arts and Sciences. With David Gries he wrote *A Logical Approach to Discrete Math*, and he is writing a security textbook.

Claire Le Goues suggested him as the ideal representative of the "systems" side of software engineering, and noted he is "a little intense." Groce suggests that describes many of the best scientists and engineers.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Queens high school; donated computers | Machine language and plugboard wiring; Cornell with no CS major |
| Batch vs. today | Mental simulation vs. trial and error; documentation's decline |
| Continuities | Modularization; the belief that the right language will remove bugs; Rust's ownership |
| His one area | Trustworthy systems: assurance, fault tolerance, security |
| What every programmer needs | Formal logic and assertional reasoning: invariants |
| Research drivers | Future problems vs. future solutions; explanation as a driver |
| Reference monitors | Only safety properties are enforceable; inlined reference monitors |
| Heroes and systems | Dijkstra, Lamport, Lampson; Unix's conceptual integrity |
| Worst practice and the divide | C and memory management; "the divide is not about projects—it's about people" |
| Methodology | Agile as engineering prototyping |
| Design | Good architecture is extensible; buildings aren't |
| AI | "One more step of 'magic'"; assurance and accountability |
| Good work | First, best, or last paper |
| Now | Laws of security; hyperproperties; runtime verification; information flow and accountability |

---

## Theme 1: From plugboards to PhD courses

Schneider's high school in Queens couldn't afford computers, so an "aggressive" math chairman got used ones donated, apparently from Bronx High School of Science. With no courses, students taught themselves "machine language programming" and learned "to wire those control boards" of older card-programmable machines. At Cornell in 1971 there was no undergraduate CS major. He planned to be an electrical engineer, but found "too much electrical engineering was cookbook, while all of the computer programming was fun." Because he already knew programming, he took Cornell's PhD-level CS courses as an undergraduate.

## Theme 2: Mental simulation vs. trial and error; documentation's decline

Cornell students then wrote PL/C (a teaching dialect of PL/I) on punched cards, in batches that ran "maybe every hour," so "it was really expensive to discover that a semicolon was missing." Programmers then could "understand everything about how a program you wrote would execute." Today "programmers have little hope of understanding exactly how their program works or its run-time environment," because of high-level languages and powerful libraries.

The working style changed too. With easy debugging, "a programmer today can use trial and error experimentation." With hour-long turnaround, "you mentally simulated the program."

But **documentation** has gotten worse, so "you often can't do mental simulation today even if you wanted to." He knew OS/360 down to "the communications vector table at hex location 10." His explanation for the decline: graphical interfaces were meant to be self-documenting, "functionality could be discovered by observation and experimentation," and vendors were spared keeping code and documentation consistent. "Software developers had an incentive not to be providing documentation."

Compare Holzmann (Ch. 4) and Shriram (Ch. 2) on batch computing teaching care, and Kernighan (Ch. 6), for whom interactive computing was "a giant step forward."

> [!NOTE]
> **KEY TERM: Mental simulation (desk checking)**
>
> **Definition.** Tracing a program's execution by hand or in your head, with specific values, to predict what it will do before running it. In the batch era it was the main way to find bugs before a costly run. It remains the basis of code review and of reasoning with invariants.
>
> **In the interview.** "Rather than think about whether a piece of code is going to work, today it's really easy to just try it... you didn't just guess and experiment—you mentally simulated the program."

> [!NOTE]
> **KEY TERM: API documentation and specifications**
>
> **Definition.** A description of what a library or interface does, precise enough that a client can use it correctly without reading its code: parameters, results, preconditions, side effects, errors, and interactions between options. Incomplete documentation forces clients into experimentation and makes them depend on observed, not promised, behavior (Hyrum's law, Ch. 3 primer).
>
> **In the interview.** With LaTeX, he reads the documentation "but then have to try 10 different versions to figure out how the parameters interact. And this happens in production-grade programming languages, too."

---

## Theme 3: Continuities — modularization and the language that will fix everything

The big debate of 1975, "how to modularize a big program?", is still open. **Parnas**'s paper "still, I think, is a defining work." Ed Yourdon wrote about decomposition by **coupling** between modules, "which we would now think of as invariant that linked modules." Yet "we never ask our students to conceptualize an architecture for a large program or system," only to modify big programs we give them.

A second continuity: the "widely-held belief that if only we designed the right language, then many bugs in our programs would disappear." In the 70s the target was concurrency and security bugs; in 2025, "memory management and races."

On Rust: "In theory, I think Rust is great," but he can't assign it to master's students who've never used it. "The learning curve seems too steep." He explains what Rust's **ownership** model buys. In C, the original programmer designs an ownership model for memory, but "somebody needs to make changes 5 years later, the ownership model for that module isn't fully documented, and a small change, which ought to work, breaks that ownership model." That "can't happen in Rust, because the ownership model is part of the Rust language syntax."

> [!NOTE]
> **KEY TERM: Coupling (as shared invariants)**
>
> **Definition.** The degree to which modules depend on one another (see the Chapter 3 primer). Schneider recasts it logically: two modules are coupled to the extent that a correctness **invariant** relates their states, so a change in one can break a property the other relies on. Low coupling means few cross-module invariants.
>
> **In the interview.** Yourdon's coupling is "what we would now think of as invariant that linked modules."

> [!NOTE]
> **KEY TERM: Ownership (memory ownership model)**
>
> **Definition.** A discipline stating which part of a program is responsible for each piece of memory: who may read it, who may modify it, and who must free it. In C it is a convention held in programmers' heads and comments. **Rust** makes it part of the type system: each value has one owner, references are borrowed under checked rules, and the compiler rejects programs that violate them, preventing use-after-free and data races.
>
> **In the interview.** C's undocumented ownership models break under later changes. In Rust "the ownership model is part of the Rust language syntax. But the overhead of writing the first version is going to be way higher."

---

## Theme 4: One area — trustworthy systems

"I've worked on a bunch of topics that people would regard as being from different areas. I see myself, however, as having worked in only one area: how to build trustworthy systems." Trustworthy systems need **assurance** (so he works in formal methods), must "tolerate hardware failures and software failures" (fault tolerance), and must "tolerate malevolence" (security).

He describes fault tolerance and security research as "somewhat niche": if you need it, you need an expert. What *every* programmer needs is assurance.

> [!NOTE]
> **KEY TERM: Trustworthiness (dependability)**
>
> **Definition.** The property that a system does what it is supposed to do, and nothing else, despite environmental disruption, human error, hardware and software failures, and attack. The 1999 National Research Council report *Trust in Cyberspace*, which Schneider edited, used this definition. It combines correctness, reliability, availability, safety, and security. (The Chapter 9 primer covers dependability concepts.)
>
> **In the interview.** His "one area," with three pillars: formal methods for assurance, fault tolerance, and security.

> [!NOTE]
> **KEY TERM: Assurance**
>
> **Definition.** Justified confidence that a system has a property, together with the evidence for it: proofs, analyses, tests, reviews, process records. Assurance is about *knowing* a system is right, not only its *being* right. Higher-consequence systems require stronger evidence. (Ball's assurance spectrum, Ch. 1 primer.)
>
> **In the interview.** "The stuff that every programmer needs to understand is about assurance. We need to write programs that don't have bugs." AI-generated code, he later argues, is an assurance problem.

> [!NOTE]
> **KEY TERM: Fault tolerance**
>
> **Definition.** The ability of a system to keep providing correct service despite faults in some of its components, typically through **redundancy** (replicated hardware, processes, or data) and protocols that detect, mask, or recover from failures. Faults may be crashes, or arbitrary (**Byzantine**) misbehavior.
>
> **In the interview.** Trustworthy systems "need to tolerate hardware failures and software failures." His current work makes machine-learning model training tolerate failures "with grace," instead of relying on costly checkpoint/restart.

---

## Theme 5: Formal logic is our math; assertional reasoning

Schneider's central message for programmers: "As a programmer, you don't need calculus—you need formal logic, yet many programmers don't know how to negate a Boolean expression, and they don't know how to work with quantifiers."

He and David Gries wrote *A Logical Approach to Discrete Math* because Cornell undergraduates "weren't facile with manipulating preconditions and postconditions, and the other building blocks for assertional reasoning." The book presents logic as **equational** formula manipulation, like high school algebra. He worries that universities are "drifting towards teaching less of it and more about probabilistic reasoning, because that is the math for machine learning."

The key application is the **invariant**: "if you can't easily work with invariants, then you don't have the mental tools to understand the corner cases for loops or to understand whether a data structure you've designed correctly implements whatever abstraction you had in mind. And without invariants, you can't analyze whether a concurrent program will exhibit a race condition." He doesn't want assertions everywhere: programmers "just need to know it well enough so that they can use it comfortably when they should."

Groce notes Holzmann (Ch. 4) said much the same. Schneider: "Right, you need to have a specification."

> [!NOTE]
> **KEY TERM: Assertional reasoning (Hoare logic)**
>
> **Definition.** Reasoning about programs with logical **assertions** about the program state at each point. A **Hoare triple** `{P} S {Q}` says: if precondition P holds before statement S runs and S terminates, then postcondition Q holds afterward. Rules for each statement type let you prove whole programs correct (Hoare, 1969). Dijkstra's weakest preconditions are a related calculus.
>
> **In the interview.** "Programmers need to understand assertional reasoning. They don't need to use it all the time." Hoare's 1969 paper is his example of research that anticipated a solution 50 years early.

> [!NOTE]
> **KEY TERM: Invariant**
>
> **Definition.** An assertion that remains true as the state changes. A **loop invariant** holds before and after every iteration, and together with the exit condition implies the loop's result. A **representation invariant** holds for every valid value of a data type (Liskov, Ch. 3). A **system invariant** in a concurrent program holds at every step, whatever the interleaving, for example "at most one process is in the critical section."
>
> **In the interview.** "This idea of an assertion that continues to hold even though the state is changing is a key idea for programmers and computer scientists. Yet our students don't understand it."

> [!NOTE]
> **KEY TERM: Quantifiers and Boolean negation**
>
> **Definition.** The universal quantifier ∀ ("for all") and existential quantifier ∃ ("there exists") express properties of collections: ∀i. 0 ≤ i < n ⇒ a[i] ≤ a[i+1] says an array is sorted. Negation swaps them: ¬∀x.P ≡ ∃x.¬P. De Morgan's laws negate compound Boolean expressions: ¬(A ∧ B) ≡ ¬A ∨ ¬B. Errors here produce wrong loop conditions, wrong guards, and wrong tests.
>
> **In the interview.** "Many programmers don't know how to negate a Boolean expression, and they don't know how to work with quantifiers."

> [!NOTE]
> **KEY TERM: Race condition**
>
> **Definition.** A bug in which the result depends on the timing or interleaving of concurrent operations, typically when threads access shared data without proper synchronization. Races are hard to find by testing because the bad interleaving may be rare. Reasoning with invariants that must hold at every step is the classic way to rule them out.
>
> **In the interview.** "Without invariants, you can't analyze whether a concurrent program will exhibit a race condition."

---

## Theme 6: Research driven by future solutions, and by explanation

Many of his results "are outgrowths from consulting assignments." But he distinguishes research "driven by anticipating future problems or by anticipating future solutions." His example of the latter is Hoare's 1969 axiomatic-verification paper: "only now in 2025 are people producing large systems that have machine-checked verifications that are based on assertions. So that's over 50 years."

A second driver: "trying to understand exactly what's going on in a family of problems or solutions." His story:

1. In the late 1990s, he and Robbert van Renesse built a mobile-agent system with a security scheme. Writing the paper, "it occurred to me that I didn't know what policies our security scheme was capable of enforcing."
2. That became the general question: what policies can a **reference monitor** enforce? "The processor hardware that manages memory accesses is a reference monitor, operating systems are reference monitors. And yet, until 2000, nobody had asked."
3. The answer: reference monitors "can only enforce security policies that are safety properties," properties that forbid observable "bad things." Information flow is not a safety property, so it cannot be enforced this way.
4. A safety property can be recognized by an automaton, which can be written as a case statement. Insert it between every pair of instructions, then let an optimizer remove the checks that have no effect: an **inlined reference monitor**.
5. With his student Úlfar Erlingsson, an inlined reference monitor implemented Java's stack-inspection security model faster than the JVM's own implementation.

"Trying to explain something led us not only to an improved explanation... but also to a new class of mechanisms."

> [!NOTE]
> **KEY TERM: Reference monitor**
>
> **Definition.** A mechanism that observes every security-relevant action a program attempts and allows or blocks it according to a policy (Anderson, 1972). A reference monitor must be always invoked, tamper-proof, and small enough to verify. Examples: memory-management hardware, an OS kernel's access checks, a browser enforcing the same-origin policy (Ch. 8).
>
> **In the interview.** "Reference monitors are everywhere!... And yet, until 2000, nobody had asked: what policies could be enforced by reference monitors?"

> [!NOTE]
> **KEY TERM: Safety and liveness properties**
>
> **Definition.** A **safety property** says "something bad never happens" (no two processes in the critical section; no unauthorized file read). If violated, it is violated at a specific point you can observe. A **liveness property** says "something good eventually happens" (every request is eventually answered). It can never be refuted by a finite observation, since the good thing might still happen. Alpern and Schneider (1985) proved every property is the intersection of a safety and a liveness property.
>
> **In the interview.** Reference monitors "can only enforce security policies that are safety properties—properties that proscribe 'bad things' that are observable." His 2018 Dijkstra Prize was for defining liveness.

> [!NOTE]
> **KEY TERM: Security automaton and inlined reference monitor (IRM)**
>
> **Definition.** A **security automaton** is a state machine that tracks a program's actions and rejects any execution that violates a safety policy (for example, "no network send after reading a secret file"). An **inlined reference monitor** compiles that automaton into the program itself, inserting checks before relevant instructions, so no separate monitor process or kernel support is needed. Optimization removes checks that can't matter.
>
> **In the interview.** "We have developed a new class of enforcement mechanisms: inlined reference monitors." It later became one foundation of runtime verification.

---

## Theme 7: Heroes, and a system with conceptual integrity

1. **Edsger Dijkstra**, for his "creativity in identifying problems that were important and his metaphors in solving them," and for introspection: explaining where a solution came from, "a mandate to not be pulling rabbits out of hats."
2. **Leslie Lamport**, "brilliant at inventing the right abstractions." Lamport's "time / clocks" paper led to Schneider's decade of work on the **state machine approach** to replication.
3. **Butler Lampson**, "very good at going between practice and theory... really nice practical solutions that have beautiful theoretical underpinnings."

His exemplary system is **Unix**: "small, it was simple, and it had conceptual integrity. The whole idea that everything could be a file is wonderful." It was the first system he knew in which designers "picked a single, simple abstraction and were able to make all things of interest look like instances of that abstraction."

> [!NOTE]
> **KEY TERM: State machine replication (the state machine approach)**
>
> **Definition.** A general method for building fault-tolerant services: model the service as a deterministic state machine, run copies (replicas) on several machines, and ensure every replica processes the same requests in the same order (using logical clocks, or consensus protocols such as Paxos and Raft). Correct replicas then stay identical, and the service survives the failure of some of them. Schneider's 1990 tutorial is the standard reference.
>
> **In the interview.** His work "for over a decade on the state machine approach," which grew from Lamport's paper on time and clocks.

> [!NOTE]
> **KEY TERM: Logical clocks (Lamport clocks)**
>
> **Definition.** Counters that order events in a distributed system without synchronized physical time (Lamport, 1978). Each process increments its clock on every event and attaches it to messages; a receiver advances its clock past any timestamp it sees. This yields an ordering consistent with causality ("happened before"), which replicas can use to agree on request order.
>
> **In the interview.** Lamport's "time / clocks" paper was the basis of Schneider's first work as an assistant professor.

> [!NOTE]
> **KEY TERM: Conceptual integrity**
>
> **Definition.** Brooks's term (*The Mythical Man-Month*, 1975) for a design that reflects one coherent set of ideas, so that a user who understands a few concepts can predict the rest. Brooks called it "the most important consideration in system design." Jackson's concept design (Ch. 12) is a modern attempt to make it systematic.
>
> **In the interview.** Unix's "everything is a file": "That kind of conceptual parsimony is, I think, a model."

---

## Theme 8: Worst practice, and the real divide

The worst practice: "it's C and memory management. The fact that people still use C, I don't understand, and I'm hoping Rust is going to fix that problem." C++ "has idiosyncrasies because it is built on top of C" and "is a big problem for software assurance," though he appreciates the pragmatism of compatibility (compare Kernighan, Ch. 6).

On flagship vs. ordinary development: "the divide is not about projects—it's about people." Windows, and open source, contain pieces by "really good people" you can count on, and pieces by "mediocre people (or worse)." He tells his security students: "You've been submitting programming assignments for the last 4 years that are not well-tested, and they are buggy. Next year, you're going to be writing programs at a company. Nothing is going to change magically about your programming skills."

Research does reach practice ("it does percolate down"), faster when it's done inside companies, and not only through languages: "research in testing gets adopted independent of the programming language."

## Theme 9: Agile is prototyping

Schneider gives the book's most engineering-centered justification of Agile. "If you look at almost any branch of engineering, there is a standard practice of building models and building prototypes." You prototype because "you don't understand all the dimensions of what you're going to build." "The whole idea that you would write a spec and then somebody would go off and implement that spec was naïve, and it is not what engineering does... So we're now trying out prototyping, and we call it Agile development."

One difference from physical engineering: "you have to fully retest each successive software prototype." So it helps to prototype "with a toolchain that automates the development and the testing for you." Groce adds the temptation peculiar to software: our prototypes are "real" and can be used, unlike a balsa-wood model.

> [!NOTE]
> **KEY TERM: Prototyping (evolutionary vs. throwaway)**
>
> **Definition.** Building a partial or approximate version of a system to learn something: what users need, whether a design works, how components interact. **Throwaway** prototypes are discarded after they answer the question. **Evolutionary** prototypes are grown into the product, which is what iterative and agile methods do. That requires regression testing at every step.
>
> **In the interview.** "We're basically prototyping. We're building a sequence of higher-functionality prototypes." Compare Royce's "do it twice" (Ch. 2 primer) and Brooks's "plan to throw one away" (Ch. 6).

> [!NOTE]
> **KEY TERM: Regression testing**
>
> **Definition.** Re-running existing tests after a change to check that previously working behavior still works. Automated regression suites make frequent change affordable, which is why iterative methods depend on them.
>
> **In the interview.** "You have to fully retest each successive software prototype," so the toolchain should automate it.

---

## Theme 10: Design and architecture

Schneider loves design as a topic, reads about it, and lives in a mid-century modern house. But: "I don't think computer science does a good job of teaching design to our students. But I don't think electrical engineering does a good job of teaching design, either." Architecture schools do.

His definition: "A system has a good architecture if you can extend that system to address anticipated as well as unforeseen needs." A good architecture also defines "pieces, so that you can understand the whole from understanding the components." Buildings and bridges rarely need **extensibility** ("The bridge is unlikely to be extended"), so their design lessons don't transfer well. Our weakness is costly: a weapon system's electronics take ten years to build, and by then computing has changed, but the architecture may not support upgrades.

Asked for design books he recommends: "No." He enjoyed Petroski ("engineering's about failure") and Billington on bridge aesthetics, but neither "helps me to design or build better software systems." He plans to read Bill Addis on structural engineering design.

> [!NOTE]
> **KEY TERM: Extensibility**
>
> **Definition.** The ease with which a system can be extended with new capabilities without redesigning it: through well-chosen interfaces, plug-in points, and separation of concerns. It is closely related to Parnas's "design for change" (Ch. 3 primer) and to the quality attribute *modifiability* in architecture (Ch. 10 primer).
>
> **In the interview.** Schneider's test of a good architecture: extension "to address anticipated as well as unforeseen needs."

> [!NOTE]
> **KEY TERM: Compositionality**
>
> **Definition.** The property that a system's behavior, or its correctness, can be understood from the behavior of its components and how they are combined. Compositional designs let you reason about, test, and verify parts separately. Emergent behavior (Yang, Ch. 7) is what happens when this fails.
>
> **In the interview.** A good architecture defines "pieces, so that you can understand the whole from understanding the components."

---

## Theme 11: AI — one more step of magic, and no one accountable

Two concerns. First, AI "amplifies my earlier comment that programmers today do not understand the full stack." Isn't that like calling a display routine you don't understand? No: "The screen-update code has been built and inspected by people who you trust, but the AI generated code has not been looked at by anyone." That's an **assurance** problem, more serious for high-consequence systems: "until we understand how to incentivize having assurance about AI outputs, I think we're skating on thin ice."

Second, **accountability**: "Who should be considered accountable for outputs produced by an AI? There's a societal infrastructure that's missing for handling accountability when actions by a mechanism do not come with an explanation."

On teaching: "students need to understand programming well enough to be able to look at some code and know whether it's going to work or not." On jobs: just as online classes during COVID didn't replace in-person teaching, AI will be "useful in certain aspects of software development, but it's not going to replace programmers. The risk of errors in AI generated objects and actions is too great."

He mentions Microsoft recoding big parts of Windows into Rust with AI agents as a test case for "refactoring and translation." *(Instructor note: check the current status of this effort before presenting it as fact.)*

> [!NOTE]
> **KEY TERM: Accountability**
>
> **Definition.** The ability to determine who (or what) is responsible for an action or outcome, with evidence strong enough to support consequences: audit logs, signatures, provenance, and clear assignment of responsibility. In security, accountability supports **deterrence**: people misbehave less if they can be identified and held responsible.
>
> **In the interview.** "We haven't thought about deterrence through accountability for AI systems." His research asks how to define accountability for information leaks, as laws such as GDPR require.

---

## Theme 12: Doing good work

"First of all, I work on things that I think are fun." He doesn't predict impact or audience when starting, and his biggest-impact results were often found while he was pursuing some other goal. For example, his inlined reference monitor papers became "a foundation for so-called 'runtime verification' (RV)" in software engineering, which he never anticipated.

His aspiration: "to write the first paper, the best paper, or the last paper in an area." That means staying with a problem "rather than writing-up a snapshot to meet a conference deadline."

## Theme 13: What he's working on now

**Laws of security.** Since 2008 he has pursued a "science of security," which he says might better be called "laws of security": "What are the classes of policies, mechanisms, and attacks, and how do they relate?" "Unlike chemists, we don't (yet) have a periodic table." **Hyperproperties** (with Michael Clarkson) and the safety/liveness work are steps toward classifying policies.

**Runtime verification.** With Owolabi Legunsen, he sees **runtime verification** as possibly "the next big step forward for system testing." RV can "check properties that are temporal as opposed to just input-output," fits into nightly Agile builds, and "could also force developers to write specs." He hopes it has fuzzing's impact, "except that we do understand how and why RV works while we don't understand why fuzz testing is so effective."

Groce connects this to his Bitcoin fuzzing experience: near-100% code coverage, yet fuzzing kills far fewer mutants than hand-written tests, because it detects only crashes and generic invariants. Schneider: "One way to analyze testing is by assessing how much of the code has been exercised. But another way... is by assessing how much of the specification has been exercised."

**Fault-tolerant ML training**, as a graceful alternative to checkpoint/restart.

**Information flow and accountability.** Shannon's definition, that X flows to Y if learning Y tells you something about X, can't distinguish **causal** from **correlational** flow. That matters for laws like GDPR: to prove who leaked your birthdate, you need to know which copy leaked. With Elisavet Kozyri he is working on a formal definition of accountability.

His answer to "what should I have asked?": "In anticipation of this question, I carefully engineered my answers to the earlier ones."

> [!NOTE]
> **KEY TERM: Hyperproperty**
>
> **Definition.** A property of *sets* of executions rather than of individual executions (Clarkson and Schneider, 2008/2010). Many security policies are hyperproperties: **noninterference** compares pairs of runs that differ only in secret inputs and requires identical public outputs. Hyperproperties can't be checked by watching a single execution, which is why ordinary reference monitors can't enforce information flow.
>
> **In the interview.** His work on hyperproperties "was intended to be a step" toward classifying security policies, the "periodic table" security lacks.

> [!NOTE]
> **KEY TERM: Runtime verification (RV)**
>
> **Definition.** Checking a running system's execution against a formal specification, often written in temporal logic or as automata, using monitors generated from the spec. RV sits between testing and formal verification: it checks rich properties precisely, but only on the executions observed. JavaMOP, developed by Grigore Roşu's group with contributions from Legunsen, is a widely used RV system.
>
> **In the interview.** RV checks "properties that are temporal as opposed to just input-output" and "fits naturally into Agile-development tool chains."

> [!NOTE]
> **KEY TERM: Specification coverage vs. code coverage**
>
> **Definition.** **Code coverage** measures how much of the code tests execute (statements, branches). **Specification coverage** asks how much of the intended behavior tests actually *check*. A test suite can execute every line and still check almost nothing if its oracle only detects crashes. Mutation testing (Ch. 5 primer) measures checking power more directly.
>
> **In the interview.** "If the only things that testing can detect are crashes, then there's a lot of the spec that is not being exercised... RV lets you write and test specs."

> [!NOTE]
> **KEY TERM: Checkpoint/restart**
>
> **Definition.** A fault-tolerance technique that periodically saves a computation's full state to stable storage, and after a failure restarts from the latest saved state. It is simple and general, but saving large states (such as a model being trained) is expensive, and work since the last checkpoint is lost.
>
> **In the interview.** "Today, checkpoint/restart is used, which can be expensive." His group is designing training that tolerates failures "with grace."

> [!NOTE]
> **KEY TERM: Causal vs. correlational information flow**
>
> **Definition.** Shannon-style definitions say information flows from X to Y if observing Y reduces uncertainty about X. But if X and A are correlated, Y also reveals A, even though nothing was copied from A. A **causal** flow means Y was computed from X. A **correlational** flow means Y merely carries information about A because A and X are related. Legal accountability, such as identifying which copy of a secret leaked, needs the causal notion.
>
> **In the interview.** "One is a causal flow and the other is a correlational flow. Shannon's definition does not distinguish, and nobody has offered a definition that does."

---

## Connections to other chapters

- **Chapter 1 (Ball):** Assurance across the spectrum; both lament what students don't learn about specifications.
- **Chapter 2 (Krishnamurthi):** Shriram's waterfall from constraints; Schneider's Agile from engineering prototyping. Shriram's language-centric view meets Schneider's "if only we designed the right language" skepticism.
- **Chapter 3 (Liskov):** Representation invariants; Parnas; modularity as the open question. Liskov's replication work and Schneider's state machine approach are two foundations of fault-tolerant systems.
- **Chapter 4 (Holzmann):** Both insist programmers need specifications and logic; safety/liveness is the basis of Holzmann's LTL.
- **Chapter 5 (Zeller):** RV vs. fuzzing; specification coverage vs. code coverage; oracles.
- **Chapter 6 (Kernighan):** Unix's conceptual integrity, from a user who admired it; C's lack of help; C++'s pragmatic compatibility.
- **Chapter 7 (Yang):** Information flow: Yang enforced it in languages; Schneider shows why monitors can't, and asks what it should mean. Observation vs. assertional reasoning.
- **Chapter 8 (Hoodlet):** Practice (same-origin policy, process isolation) meets foundations (policies, mechanisms, reference monitors). Both want students able to judge AI code.

## Discussion questions

1. Write the negation of "every request receives a response within 2 seconds" using quantifiers. Then state it as a safety property and as a liveness property. Which one could a reference monitor enforce?
2. Schneider says programmers need formal logic, not calculus. Look at your program's required math courses. Do you agree with his priorities?
3. Is "Agile is prototyping" a fair description? What does it leave out, compared with the Chapter 2 primer?
4. Schneider's test of architecture is extensibility to "unforeseen needs." How can anyone design for needs they can't foresee? Give one technique and one example.
5. "The divide is not about projects—it's about people." If so, what should a software organization, or a university, do differently?
6. Who should be accountable when AI-generated code causes harm: the developer who accepted it, the vendor, or someone else? Use Schneider's assurance argument.

## Further reading

- F. B. Schneider (ed.), *Trust in Cyberspace*, National Academies Press, 1999.
- B. Alpern and F. B. Schneider, "Defining Liveness," *Information Processing Letters*, 1985.
- F. B. Schneider, "Implementing Fault-Tolerant Services Using the State Machine Approach: A Tutorial," *ACM Computing Surveys*, 1990.
- F. B. Schneider, "Enforceable Security Policies," *ACM TISSEC*, 2000.
- Ú. Erlingsson and F. B. Schneider, "IRM Enforcement of Java Stack Inspection," *IEEE S&P*, 2000.
- M. R. Clarkson and F. B. Schneider, "Hyperproperties," *Journal of Computer Security*, 2010.
- D. Gries and F. B. Schneider, *A Logical Approach to Discrete Math*, Springer, 1993.
- C. A. R. Hoare, "An Axiomatic Basis for Computer Programming," *CACM*, 1969.
- L. Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System," *CACM*, 1978.
- D. L. Parnas, "On the Criteria to Be Used in Decomposing Systems into Modules," *CACM*, 1972.

---

## Key term index

| Term | Theme |
|---|---|
| Mental simulation (desk checking) | 2 |
| API documentation and specifications | 2 |
| Coupling (as shared invariants) | 3 |
| Ownership (memory ownership model) | 3 |
| Trustworthiness (dependability) | 4 |
| Assurance | 4 |
| Fault tolerance | 4 |
| Assertional reasoning (Hoare logic) | 5 |
| Invariant | 5 |
| Quantifiers and Boolean negation | 5 |
| Race condition | 5 |
| Reference monitor | 6 |
| Safety and liveness properties | 6 |
| Security automaton and inlined reference monitor | 6 |
| State machine replication | 7 |
| Logical clocks | 7 |
| Conceptual integrity | 7 |
| Prototyping | 9 |
| Regression testing | 9 |
| Extensibility | 10 |
| Compositionality | 10 |
| Accountability | 11 |
| Hyperproperty | 13 |
| Runtime verification | 13 |
| Specification coverage vs. code coverage | 13 |
| Checkpoint/restart | 13 |
| Causal vs. correlational information flow | 13 |
