# Chapter 3 — Barbara Liskov: Pioneer of Modularity, and What It Really Requires

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Barbara Liskov

Liskov is an Institute Professor (emerita) at MIT and received the 2008 ACM Turing Award. Her work founded or reshaped several fields: **data abstraction** and the CLU language, which together with Smalltalk underlie object-oriented programming; **behavioral subtyping** (the "Liskov substitution principle"); and distributed computing (Argus, **viewstamped replication**, and **Practical Byzantine Fault Tolerance**). Her MIT course with John Guttag, and the textbooks that came from it, taught a generation to think of programs in terms of specifications, representation invariants, and abstraction functions.

This interview is shorter and more modest in tone than Chapters 1 and 2. Liskov repeatedly declines to comment on fields she has left. That reticence is a lesson in itself (Theme 7).

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Math degree → programmer at MITRE → Harvard | Learning from maintaining someone else's code |
| Stanford, McCarthy, chess thesis | A systems person who finished in AI |
| MITRE assigns "the software crisis" | How she got into software engineering |
| Major contributions | Data abstraction/CLU; Argus; viewstamped replication; LSP; Byzantine fault tolerance, and how each led to the next |
| The substitution principle | Specification vs. implementation views of types; stacks are not queues |
| Real systems vs. theory | "A program [is] a great big theorem"; modules as lemmas |
| Teaching with Guttag | Rep invariants and abstraction functions; teaching from first principles |
| Worst practices | "Your team is no better than your weakest programmer" |
| AI | "Modularity is all there is"; specifications; clever data structures; provenance |

---

## Theme 1: How Liskov got into software engineering — the "software crisis"

Liskov graduated in math from Berkeley in 1962. She "didn't even know there were such things as computers." She took a programming job at MITRE, was handed a FORTRAN manual, and taught herself. At Harvard she maintained a large assembler program for a language translation project. There she learned what the compiler had been doing for her, and "something about good programming and bad programming, because there's nothing like maintaining someone else's code to learn something about that."

After a PhD at Stanford with John McCarthy (her thesis was on chess, then a major AI problem), she returned to MITRE. They assigned her to study **the software crisis**:

> "I'd hadn't heard of the software crisis. But I discovered what it was, which is: nobody knew how to build systems that worked!"

That led her to **programming methodology** and to software engineering.

> [!NOTE]
> **KEY TERM: The software crisis**
>
> **Definition.** A phrase made popular around the 1968 NATO Software Engineering Conference. It described the widespread failure of large software projects to be delivered on time, within budget, or working at all, as hardware grew faster than the ability to program it. The conference also popularized the phrase "software engineering" as an aspiration.
>
> **In the interview.** Liskov recalls that "even up into the eighties you would still read articles in the newspaper about how some company had spent millions of dollars, hundreds of 'man years,'... and it didn't work. They had to scrap the whole thing!" For her it was "a great area to work in" because "people really didn't know what to do about it."

> [!NOTE]
> **KEY TERM: Programming methodology**
>
> **Definition.** The 1970s research field (Dijkstra, Hoare, Wirth, Parnas, Liskov, and others) about *how* to construct programs systematically and correctly: structured programming, stepwise refinement, modular decomposition, specification, and correctness proofs. It is a direct ancestor of modern software engineering.
>
> **In the interview.** Studying the software crisis, Liskov "discovered the field of programming methodology, and that's when I got into software engineering." She names Dijkstra and Tony Hoare as the leading figures she knew.

> [!NOTE]
> **KEY TERM: Software maintenance (and legacy code)**
>
> **Definition.** Changing software after its initial delivery to fix defects, adapt to new environments, add features, or improve structure. Over a system's lifetime, maintenance usually costs more than initial development. *Legacy code* is existing code that is still in use, often poorly understood, and hard to change safely.
>
> **In the interview.** Maintaining a "huge program written in assembler" at Harvard taught Liskov to tell good programming from bad. Compare Ball's "oral culture" of large codebases (Chapter 1).

---

## Theme 2: Data abstraction, CLU, and modularity

Liskov names **data abstraction** first among her contributions. It wasn't clear what a programming language needed in order to support it, so her group designed and built **CLU**. "That work, together with Alan Kay's work, became the basis of object-oriented programming, which is how we build programs today."

> [!NOTE]
> **KEY TERM: Data abstraction / abstract data type (ADT)**
>
> **Definition.** An *abstract data type* is defined by its **operations and their behavior**, not by how its data is stored. A `Set` ADT, for example, offers `insert`, `remove`, and `contains` with specified meanings, and clients can't depend on whether it is a hash table, a tree, or a sorted list. *Data abstraction* is designing programs around such types. Liskov and Zilles introduced the idea in "Programming with Abstract Data Types" (1974).
>
> **In the interview.** Liskov calls it "the data abstraction thing," her first major accomplishment. It led straight to language design, since languages of the time didn't support it.

> [!NOTE]
> **KEY TERM: CLU**
>
> **Definition.** A programming language designed by Liskov and her students at MIT in the mid-1970s around *clusters*, modules that implement abstract data types. CLU introduced or popularized several ideas now common: iterators (`yield`), parameterized types (generics), exception handling, and multiple assignment and return.
>
> **In the interview.** CLU was the vehicle for making data abstraction usable. The MIT software engineering course was first taught in CLU, then C, then C++, then Java: "Thank God! Finally there was a commercial language that actually supported data abstraction."

> [!NOTE]
> **KEY TERM: Object-oriented programming (OOP)**
>
> **Definition.** A style in which programs are organized as *objects* that combine state with the operations on it, usually with *encapsulation*, *subtyping/inheritance*, and *dynamic dispatch*. Its two main roots are Simula and Smalltalk (Alan Kay and colleagues) on one side, and abstract data types (CLU) on the other.
>
> **In the interview.** Liskov credits CLU "together with Alan Kay's work" as the basis of OOP. Later she contrasts the Smalltalk community's *implementation-oriented* view of classes with her *specification-oriented* view of types (Theme 3).

> [!NOTE]
> **KEY TERM: Modularity, encapsulation, and information hiding**
>
> **Definition.** *Modularity* means dividing a system into parts (modules) with well-defined interfaces, so each can be understood, built, tested, and changed separately. *Information hiding* (Parnas, 1972) is the rule for drawing module boundaries: each module hides a design decision likely to change. *Encapsulation* is the language mechanism that enforces the boundary by preventing access to a module's internals.
>
> **In the interview.** Asked whether modularity matters more or less with AI: "**Oh, modularity is all there is.**" She also wishes "compilers would enforce modularity, because in the absence of that enforcement your team is no better than your weakest programmer." She doesn't think people break modularity "maliciously. I just think they get lost."

**A key analogy.** Liskov compares programs to mathematics:

> "How you think about a program composed of modules is a lot like how you think about proving a theorem using lemmas... I think of a program as being a great big theorem that you're proving."

She immediately adds that theory alone isn't enough: "I don't think you can do anything interesting in software engineering if you don't write programs... you have to have a real sense of what's going on in the trenches."

---

## Theme 3: The Liskov substitution principle — behavior, not syntax

The best-known part of the chapter is how the substitution principle came about. Liskov was asked to give a keynote at OOPSLA (1987). She read the Smalltalk literature and found that people "were very interested in types and subtypes. but they had no idea how types should behave in order for this relationship to make sense." One paper even claimed **stacks and queues are subtypes of one another**:

> "That was clearly wrong, although syntactically it was correct, if you think about the types of the arguments and results, that would have fit."

Why could she see it when others couldn't? Her MIT course with John Guttag "thought about types in terms of their behavior and not in terms of their implementation," whereas "the class-subclass stuff was very implementation-oriented."

> [!NOTE]
> **KEY TERM: Specification vs. implementation**
>
> **Definition.** A *specification* states *what* a component does: its observable behavior, preconditions, postconditions, and invariants. An *implementation* is *how* it does it. Several implementations can satisfy one specification. Clients should rely only on the specification.
>
> **In the interview.** "My perspective had to do with specifications. Their perspective was more about implementations." She traces her insight about subtyping directly to this difference.

> [!NOTE]
> **KEY TERM: Subclass vs. subtype (inheritance vs. behavioral compatibility)**
>
> **Definition.** A *subclass* reuses its superclass's *implementation* through inheritance, which is a code-sharing mechanism. A *subtype* is a type whose objects can be used *anywhere* objects of the supertype are expected, which is a behavioral relationship. Most OO languages tie the two together (declaring a subclass makes a subtype in the type checker), but they are logically separate. A subclass may not be a true behavioral subtype, and a subtype need not share any code.
>
> **In the interview.** People "would even describe a subclass by just talking about how its implementation differed from that of the superclass." For Liskov that is the wrong question. "Stacks and queues are not subtypes. Even if, syntactically, the Java compiler will let you say, oh, yes, these are."

> [!NOTE]
> **KEY TERM: Liskov substitution principle (LSP) / behavioral subtyping**
>
> **Definition.** Informally, in Liskov's words from the interview: "the subtype has to behave like the supertype, as far as you can tell by interacting through the supertype methods. The subtype can have more methods, but if you interact with an object of the subtype using supertype methods... it better behave like the supertype." The formal version (Liskov and Wing, 1994): *let φ(x) be a property provable about objects x of type T; then φ(y) should be true for objects y of type S where S is a subtype of T.* In practice, for each overridden method, the subtype may **weaken preconditions** (accept more) and **strengthen postconditions** (promise more), but not the reverse. It must also **preserve the supertype's invariants**. Liskov and Wing also require a *history constraint*: the subtype's extra methods may not cause state changes that the supertype's specification rules out.
>
> **In the interview.** The principle came from a talk, "a little paper which actually wasn't the clearest paper I've ever written," and then she forgot about it. In the early 1990s she got an email asking whether something was "a correct interpretation of the Liskov substitution principle. That name! That was the first time I'd seen the name." Jeannette Wing then suggested they "come up with a formal definition." That paper is "the real definition of what behavioral subtyping is." Groce points out that the principle covers what other work missed: even within the supertype's methods, a subtype's behavior "can't break the invariants and break the behavior in ways that will let you get surprised."

**Worked example: why a stack is not a queue.** Both could offer `put(x)` and `get() → x`. The queue's specification says `get` returns the *oldest* element (FIFO). The stack's says it returns the *newest* (LIFO). Code written for a queue (a print spooler that serves jobs in arrival order, say) silently breaks when given a stack, though every call type-checks. The types match, but the behavior doesn't. Other classic examples: `Square extends Rectangle` with independent `setWidth`/`setHeight`; Java's `Stack extends Vector`, which lets clients insert into the middle of a "stack."

---

## Theme 4: Representation invariants and abstraction functions

Liskov and Guttag's course (MIT 6.170) and its textbooks taught students to reason about ADT implementations with two tools. They "contained all that material about rep invariants, and the abstraction function, and all that."

> [!NOTE]
> **KEY TERM: Representation invariant (rep invariant)**
>
> **Definition.** A condition on an ADT's *internal representation* that must hold whenever an object is visible to clients: after construction and before and after each public operation. For example, a set stored as a list might require *no duplicates*. A sorted-array set might require that the array *is sorted*. Each operation may assume the rep invariant on entry and must restore it on exit. Many programmers add a `checkRep()` method that asserts it during testing.
>
> **In the interview.** Named as core course content alongside the abstraction function. Groce notes the textbook repeatedly says "of course, the compiler can't check these behavioral aspects," which leads to the discussion of modern verification (Theme 6). Compare Ball's "programming with invariants" (Chapter 1).

> [!NOTE]
> **KEY TERM: Abstraction function (AF)**
>
> **Definition.** A function that maps each *valid concrete representation* (one satisfying the rep invariant) to the *abstract value* it stands for. For a set stored as a list, AF(`[3, 1, 2]`) = {1, 2, 3}. Several representations can map to the same abstract value, so the AF is often many-to-one. The idea goes back to Hoare's "Proof of Correctness of Data Representations" (1972). To prove an implementation correct, you show that each concrete operation, seen through the AF, does what the abstract specification says.
>
> **In the interview.** Groce calls the course "way ahead of its time" for teaching this to students, and Liskov agrees the book "was really ahead of its time... it was also a research project, though we never thought about it that way."

> [!NOTE]
> **KEY TERM: Parameterized types (generics)**
>
> **Definition.** Types that take other types as parameters, such as `List<T>` or `Map<K, V>`, so one abstraction works for many element types while staying type-safe. CLU was an early language with them. Java added generics in Java 5 (2004) using *type erasure*: type parameters are checked at compile time and removed at run time. That causes well-known limitations, such as unchecked casts and not being able to write `new T[]`.
>
> **In the interview.** "There are things wrong with Java, for example the way they do parameterized types isn't great." Groce jokes: "Cast everything!"

**On teaching.** Liskov ties teaching closely to research: "if you're a good teacher, you teach from first principles, rather than just throwing stuff at the students. And if you're doing good research, you have to think in the same way." Her advice to students is worth memorizing:

> "It's really important to understand what you don't understand."

She notes that 6.170 was a *second* course: "The students knew how to write little programs! They just had no idea how to write big ones." The course was under "pressure to use a programming language that the students would encounter when they finished," a tension every SE course still faces.

---

## Theme 5: From transactions to Byzantine fault tolerance — a chain of ideas

Liskov describes her distributed systems work as a chain in which each step made the next possible:

**CLU → Argus → transactions → viewstamped replication → Byzantine fault tolerance**

> "When I look back over my career I see this step, going from CLU to Argus, got me into transactions which gave me an insight into how to solve the problem of viewstamped replication which later led to the ability to do the Byzantine fault tolerance work."

> [!NOTE]
> **KEY TERM: Transaction (atomicity)**
>
> **Definition.** A group of operations that runs as a single unit. In databases this is described by the **ACID** properties: *Atomicity* (all or nothing), *Consistency*, *Isolation* (concurrent transactions don't interfere visibly), and *Durability* (committed results survive crashes).
>
> **In the interview.** Argus, a CLU-based language for distributed programs, used "transactions as a way of making sure that computations that span multiple computers either completed entirely or had no impact." Liskov "picked that work right out of the database area." That habit of thinking in transactions later shaped her approach to replication.

> [!NOTE]
> **KEY TERM: Replication and viewstamped replication (VR)**
>
> **Definition.** *Replication* keeps copies of data or a service on several machines, so the system stays available and correct when some fail. The hard part is keeping the replicas *consistent* despite concurrency and failures, which is a form of **consensus**. **Viewstamped replication** (Oki and Liskov, 1988) is a primary-copy protocol. A designated primary orders operations. If it fails, a *view change* elects a new primary. With 2*f*+1 replicas it tolerates *f* crash failures. VR was developed at about the same time as, and independently of, Lamport's Paxos, and is closely related to it.
>
> **In the interview.** Her key move was "moving away from the clients and into the replicas." Clients no longer coordinate among themselves with locks. Instead, "dedicated processes running at different computers [are] in charge of a protocol." The idea "addressed the question of how to store information 'in the cloud'" years before the term existed.

> [!NOTE]
> **KEY TERM: Locks (and why client-side coordination fails)**
>
> **Definition.** A *lock* is a synchronization mechanism that gives one party exclusive (or shared) access to a resource. Distributed locks held by clients are fragile. If a client that holds a lock crashes, stalls, or disappears, other clients may wait forever (or until a timeout, which brings its own correctness problems).
>
> **In the interview.** Liskov explains the problem: "The clients are using locks to control access, because how else can they interact?... And one of them decides to go to lunch." Putting replicas in control of a protocol avoids it.

> [!NOTE]
> **KEY TERM: Failure models — benign (crash) vs. Byzantine failures**
>
> **Definition.** A *failure model* states what faulty components may do. Under **benign** failures, components either work correctly or stop (*crash*, or *fail-stop*), and messages may be lost or delayed but corruption can be detected. Under **Byzantine** failures (named after Lamport, Shostak, and Pease's 1982 "Byzantine Generals" paper), a faulty component may do *anything*: send conflicting messages to different parties, lie, or collude, whether from bugs or malice.
>
> **In the interview.** VR handled benign failures because "it was the days of the Arpanet. We were all friends." Byzantine failures "were a huge problem once the Internet got going." Byzantine reasoning was like "a funhouse with funny mirrors in it."

> [!NOTE]
> **KEY TERM: Byzantine fault tolerance (BFT / PBFT)**
>
> **Definition.** Protocols that keep a replicated service correct even when some replicas are Byzantine. **Practical Byzantine Fault Tolerance** (Castro and Liskov, OSDI 1999) was the first BFT replication protocol efficient enough for real services. With 3*f*+1 replicas it tolerates *f* Byzantine replicas. BFT ideas now underlie many blockchain consensus protocols and some high-assurance systems.
>
> **In the interview.** The project started when Liskov told her student Miguel Castro to "go look at the RFPs coming out of DARPA." He proposed Byzantine replication. "The reason we were able to do that work was because we understood how viewstamped replication worked, and most people didn't."

**Lesson for students.** Deep expertise compounds. Liskov's distributed systems advances came from carrying a concept from one area (transactions in databases) into another (replication), then building on her own earlier work. Groce asks about "big highlights in the field," and she replies, "I was kind of just keeping my nose to the grindstone."

---

## Theme 6: Specifications, verification, and AI

Liskov is careful to say she is "out of touch," but her views on AI are clear and consistent with her life's work:

- **Specifications become central.** "I think specifications are gonna matter tremendously... if you can give a concise, a precise specification, then, in theory, AI could develop the code. I'm a little dubious about how much cleverness can go into that."
- **Verification is now real.** "Program verification was a dream, back when I started. And nowadays people really are able to verify stuff. It's going to be really important with AI generating the code."
- **Design is the hard part.** "Top level design is very hard. I think that identifying what those modules are is hard." Clever data structures "can make a huge difference," and Groce has seen no AI make "the classic Knuth move."
- **Provenance.** Her worry about AI is less about code than about *knowing where information came from*: "Wouldn't it be nice if we could know where stuff was coming from, and whether it was legit? That's a good systems problem."

> [!NOTE]
> **KEY TERM: Program verification**
>
> **Definition.** Proving, with mathematical rigor and increasingly with machine-checked tools (Dafny, Lean, Coq/Rocq, Isabelle, and verifiers built on SMT solvers), that a program satisfies its specification. Its foundations are Floyd–Hoare logic, abstraction functions, and invariants.
>
> **In the interview.** Groce notes that tools like Dafny now attempt to check the "behavioral aspects" that Liskov's textbook said compilers couldn't. Liskov: "Really, it's always been important, it's just been very hard to do." See Ball (Chapter 1) on Lean and "optimizing without fear."

> [!NOTE]
> **KEY TERM: Provenance**
>
> **Definition.** The record of an artifact's origin and history: who or what created it, from which sources, and how it was changed. In software, provenance covers where code and dependencies came from (see *software supply chain*, Chapter 2) and whether code was AI-generated. In information systems more broadly, it covers whether content is authentic.
>
> **In the interview.** Liskov raises provenance as an open systems problem made urgent by AI-generated content, using elections as her example. "There's going to be huge human misbehavior, because everywhere we turn around we see human misbehavior."

---

## Theme 7: Intellectual honesty — knowing what you don't know

Many of Liskov's answers are "I don't know," "I'm out of touch," or "I have no idea." When asked about Agile and methodology:

> "If you're going to start having an informed position about work in a field that you were in, but you aren't in anymore, you have to do a lot of work to really have a correct position. Otherwise you're just kind of, throwing off remarks."

Many experts give confident opinions outside their area. Liskov doesn't, and that fits her advice to "understand what you don't understand." She also notes that reading a paper and spotting what *the author* didn't understand is "always a little sign that maybe there's something interesting to do there." Groce adds that "no one ever writes the best Future Work section."

Her career also shows the role of luck and constraint. She took the MITRE job as a "second choice" when no good faculty offers came. That turned out well, because it let her switch fields without teaching duties. MITRE "made for me" the choice to work on software engineering.

---

## Connections to other chapters

- **Chapter 1 (Ball):** SLAM's API usage rules are specifications of how clients must use an interface, the same specification-centered view of modules Liskov championed. Ball and Liskov both predict that specifications matter *more* with AI-generated code.
- **Chapter 2 (Krishnamurthi):** Krishnamurthi's "pair of artifacts" (code vs. independent specification) is exactly what Liskov's specification-first approach provides. Both praise teaching "from first principles." Krishnamurthi's critique of UML class diagrams as mere restatements of code echoes Liskov's complaint about implementation-oriented subclassing. Neither one tells you what the code is *supposed* to do.

## Discussion questions

1. Write specifications for `Stack` and `Queue` with operations `put` and `get`. Show precisely which part of the supertype's specification each would violate if declared a subtype of the other.
2. Is `Square` a behavioral subtype of `Rectangle`? Does your answer change if rectangles are *immutable*? What does this say about mutability and subtyping?
3. Liskov wishes compilers enforced modularity. What modularity mechanisms do Java, Python, and Rust provide? Which can a determined programmer get around?
4. Liskov's chain of ideas went CLU → Argus → transactions → VR → BFT. Can you find a similar chain in a technology you use, where an idea from one area unlocked another?
5. "Modularity is all there is." If AI writes most of the code inside modules, what parts of software engineering are left for humans?
6. Liskov declined to give opinions outside her current expertise. When is that the right choice for an expert, and when might it be a loss?

## Further reading

- B. Liskov and S. Zilles, "Programming with Abstract Data Types," *SIGPLAN Notices*, 1974.
- B. Liskov, "Data Abstraction and Hierarchy," OOPSLA '87 keynote (*SIGPLAN Notices*, 1988).
- B. Liskov and J. Wing, "A Behavioral Notion of Subtyping," *ACM TOPLAS*, 1994.
- B. Liskov and J. Guttag, *Program Development in Java: Abstraction, Specification, and Object-Oriented Design*, Addison-Wesley, 2000 (successor to *Abstraction and Specification in Program Development*, 1986).
- D. L. Parnas, "On the Criteria to Be Used in Decomposing Systems into Modules," *CACM*, 1972.
- C. A. R. Hoare, "Proof of Correctness of Data Representations," *Acta Informatica*, 1972.
- B. Oki and B. Liskov, "Viewstamped Replication: A New Primary Copy Method to Support Highly-Available Distributed Systems," PODC 1988. (See also Liskov and Cowling, "Viewstamped Replication Revisited," MIT TR, 2012.)
- M. Castro and B. Liskov, "Practical Byzantine Fault Tolerance," OSDI 1999.
- L. Lamport, R. Shostak, and M. Pease, "The Byzantine Generals Problem," *ACM TOPLAS*, 1982.

---

## Key term index

| Term | Theme |
|---|---|
| The software crisis | 1 |
| Programming methodology | 1 |
| Software maintenance (legacy code) | 1 |
| Data abstraction / abstract data type | 2 |
| CLU | 2 |
| Object-oriented programming | 2 |
| Modularity, encapsulation, information hiding | 2 |
| Specification vs. implementation | 3 |
| Subclass vs. subtype | 3 |
| Liskov substitution principle / behavioral subtyping | 3 |
| Representation invariant | 4 |
| Abstraction function | 4 |
| Parameterized types (generics) | 4 |
| Transaction (atomicity, ACID) | 5 |
| Replication and viewstamped replication | 5 |
| Locks | 5 |
| Failure models: benign vs. Byzantine | 5 |
| Byzantine fault tolerance (PBFT) | 5 |
| Program verification | 6 |
| Provenance | 6 |
