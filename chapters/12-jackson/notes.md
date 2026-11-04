# Chapter 12 — Daniel Jackson: Seeing Software Whole

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Daniel Jackson

Jackson is the Thomas J. Perkins Professor of Electrical Engineering and Computer Science at MIT, Associate Director of MIT's Computer Science and Artificial Intelligence Laboratory (CSAIL), a MacVicar Faculty Fellow (MIT's highest teaching honor), and an ACM Fellow. His work centers on software design and specification, especially on making formal methods practical for working engineers. *Software Abstractions* (2006; revised 2012) introduced **Alloy**, a lightweight formal specification language with an automatic analyzer. *The Essence of Software* (2021) proposes **concepts** as the fundamental units of user-facing functionality.

His father, Michael Jackson, author of JSP, JSD, and *Problem Frames*, "would make an equally perfect choice for a final interview subject." Groce knows Jackson's work from the specification and testing side, and is friends with several of his former students, including Sarfraz Khurshid and Robert O'Callahan.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Physics → Logica → the London Underground | COBOL manuals, his father's methods, VDM and Z, a safety-critical first system |
| Then vs. now | A reflective team; an environment you could master |
| The continuity | Real problems live in the world: engineering crews on live track |
| Reflective practice | Schön again: what students need to use LLMs well |
| His one idea | Concept design vs. object-oriented design; the power of relations |
| Relations and testing | "Can two users have the same username?" |
| Biggest advances | Languages, interfaces as weak specifications, domain modeling |
| Theory vs. practice | No dichotomy: code-level coupling reflects larger structure |
| Heroes | Michael Jackson, Hoare, Parnas, Abrial and Z, Liskov and Guttag |
| Exemplars | Adobe Lightroom's history of actions |
| Worst practices | Enterprise, device, government, and airline software |
| LLMs | A revitalization: legibility, modularity, prompts as specifications |
| Methodology | Agile "threw the baby out with the bathwater"; concept reuse |
| Design education | Problem formulation; Nigel Cross's "designerly ways of knowing" |
| Now | Concepts, synchronizations, and LLMs |
| What to ask | Software that delights; friction; Heidegger's "ready-to-hand" |

---

## Theme 1: A physicist on the London Underground

Jackson studied physics, but to work in London he took a job at Logica UK, a software company, with "no experience programming or doing software development at all." On day one he was sent to a client, the **London Underground**, to build a system for managing engineering jobs on the railway. "They put a massive pile of COBOL manuals on my desk, and said, you'll start coding in a week's time."

He was introspective about whether his software was good and whether he could write it more efficiently. He read his father's books on **JSP** and **JSD**, then Cliff Jones's *Systematic Software Development Using VDM*, and many books on **Z**. He got himself onto Logica's methods team, Sesame, whose first assignment for him was a report on JSD, with training at his father's company. The first system's safety-critical elements made him care about "rigor and how to do things more precisely."

> [!NOTE]
> **KEY TERM: JSP and JSD (Jackson Structured Programming and Development)**
>
> **Definition.** Michael Jackson's methods. **JSP** (1975) derives a program's structure from the structures of its input and output data streams, so the program's control flow mirrors the data. **JSD** (1983) extends this to systems: first model the real-world entities and the ordered actions in their lives, then build the system as processes that simulate that model, and add functions on top. JSD was an early form of **domain modeling**.
>
> **In the interview.** Jackson's first methodology reading, and his first report at Logica. "I learned so much from him."

> [!NOTE]
> **KEY TERM: Model-based formal specification (VDM and Z)**
>
> **Definition.** Languages for specifying software mathematically, by describing a system's **state** with sets, relations, and functions, and each **operation** by its precondition and how it changes the state. **VDM** (Vienna Development Method, IBM Vienna, 1970s; Cliff Jones) and **Z** (Jean-Raymond Abrial, developed at Oxford, 1980s) were used in industry, notably for IBM's CICS. Alloy (Theme 4) inherits Z's relational style but adds automatic analysis.
>
> **In the interview.** "One of the first books I read was Cliff Jones's book... Then I got very interested in Z."

---

## Theme 2: Then and now — and the problem in the world

Jackson rejects pity for COBOL: "it wasn't horrible, it was delightful, because it's just a huge amount of fun learning how to code." Two things were different from students' experience today. First, it was **reflective**: "the team was interested in doing a good job, and we talked to each other about what we were doing. The goal wasn't just to get the code to run and pass some test cases." Second, there weren't layers of frameworks and APIs: you could read the whole API "and pretty much master it... that was an exciting feeling of control." (Compare Schneider's OS/360 knowledge in Ch. 9.)

The continuity is that real programming means solving "someone's problem in the world." The Underground sent huge numbers of maintenance crews out at night, by rail, the only way to reach the track. How do you avoid electrifying the track a crew is working on while moving another crew? How do you keep a crane on one track from hitting a team on the adjacent one? "Those kinds of problems are not only not going away, but relatively speaking, they're going to be more important, because LLMs will have dealt with a lot of the basic coding problems."

Groce brings up Schön's *The Reflective Practitioner* (Ch. 10). Jackson agrees: in a short piece on LLMs in education, he concluded "that improving our students' reflective practice is what they need more than anything else to use LLMs more effectively and intentionally." It's not only asking the right questions; "it's also being able to sort of move out of yourself, and to look at your own practices."

> [!NOTE]
> **KEY TERM: Problem domain (and domain complexity)**
>
> **Definition.** The part of the world a software system serves and affects: track, crews, trains, and power, in the Underground case. Michael Jackson's requirements work stresses that requirements are about the domain, not the software. The machine's behavior must bring about desired effects in the world, given properties of the world that the developer must discover. Much of the difficulty of real software is domain complexity, not algorithmic complexity.
>
> **In the interview.** "A large part of the difficulty is really understanding that problem, formulating it, abstracting it, making it more precise, understanding its edge cases."

> [!NOTE]
> **KEY TERM: Reflective practice**
>
> **Definition.** Schön's term for professionals' ability to think about their work while doing it ("reflection-in-action") and afterwards ("reflection-on-action"): noticing surprises, reframing problems, and examining their own methods. It is a skill that can be taught through critique, journals, and studio practice.
>
> **In the interview.** What students need most to use LLMs "effectively and intentionally": the ability "to look at your own practices, and ask yourself how effectively you're working." (See Ch. 10, problem setting.)

---

## Theme 3: Concepts vs. objects

Asked for his most important idea, Jackson answers the way photographers do when asked for their best photograph: "it's the one I haven't taken yet." What excites him now is "finding a simpler way to think about how we structure software."

Object-oriented design describes the world "in terms of individuals and their relationships and the actions in which those individuals participate," then groups functionality around those same individuals. "There's a great parsimony in that." **Concept design** says something simpler: there are "aggregates of functional behavior, that actually cross-cut the individuals that participate in the problem domain," and organizing functionality around them "in this freer way" has a lot to gain.

For example, "upvoting," "commenting," and "following" each involve users and posts, but each is a separate concept with its own purpose, state, and actions. They don't belong inside a User class or a Post class.

> [!NOTE]
> **KEY TERM: Concept (concept design)**
>
> **Definition.** In *The Essence of Software*, a **concept** is a self-contained unit of user-facing functionality with a single **purpose**, its own **state**, **actions**, and an **operational principle**: a short archetypal scenario showing how it fulfills its purpose. Examples: Upvote, Reservation, Trash, Label, Session. Concepts are **independent** (each understandable on its own), **reusable** across applications, and composed by **synchronizations** (Theme 13). Good concept design aims for each concept to serve one purpose and each purpose to be served by one concept.
>
> **In the interview.** Concepts "cross-cut the individuals that participate in the problem domain," unlike classes, which group functionality by those individuals.

> [!NOTE]
> **KEY TERM: Separation of concerns**
>
> **Definition.** Dijkstra's principle (1974) of dealing with one aspect of a problem at a time. In design, it means arranging a system so each module addresses one concern, and concerns that are logically separate are separate in the code. Information hiding (Parnas), aspect-oriented programming, microservices, and concepts are different mechanisms for achieving it.
>
> **In the interview.** Concepts are "a way to do the kind of separation of concerns that aspect-oriented programming wanted to do, but I think in a simpler setting."

---

## Theme 4: The power of relations

Looking back, the idea Jackson is proudest of evangelizing isn't originally his: "just how powerful it is to think of a system in terms of relations." It runs through the entity-relationship model, Z, **Alloy**, RDF, and Datalog, and "exploiting that idea fully still has some way to go."

Groce suggests property-based testing tends to take a trace view, not a relational one. Jackson: the essence of property-based testing is declarative, "what observations can we make?", and whether they're relational is "almost orthogonal." Groce: in practice, people underuse even **differential testing**, which uses the simplest relation (equivalence), possibly under an abstraction. Jackson wonders whether object orientation limits properties to "the properties of the objects in context."

His example: "users have usernames." Testing a User object, you'd check setting a username. "The relational interpretation encourages you to think about the multiplicity of that relation, and to ask yourself, can two users have the same username?" You can't even ask that question while testing one user object. Relations also give "a freer view of what your implementation options are," including where to store a relationship, which matters for concept design.

> [!NOTE]
> **KEY TERM: Relational modeling**
>
> **Definition.** Describing a system's state as sets of atoms and **relations** between them (who follows whom, which user has which username), and describing constraints and operations with relational operators such as join, transpose, and transitive closure. The approach is shared by relational databases, the entity-relationship model (Chen, 1976), Z, Alloy, RDF, and Datalog. It is independent of where an implementation stores each relation.
>
> **In the interview.** "Just how powerful it is to think of a system in terms of relations, or relationships between things."

> [!NOTE]
> **KEY TERM: Alloy (lightweight formal methods)**
>
> **Definition.** A specification language based on relational logic, with an analyzer that automatically searches for instances and counterexamples within a bounded **scope** (for example, up to 5 users and 5 names), using a SAT solver. Its premise is the **small scope hypothesis**: most design flaws show up in small examples. Alloy finds bugs in designs quickly without proofs, an approach Jackson calls **lightweight formal methods**. (Covered in the Ch. 12 primer.)
>
> **In the interview.** "Alloy then really doubles down on" relations.

> [!NOTE]
> **KEY TERM: Multiplicity**
>
> **Definition.** A constraint on how many elements a relation may connect: each user has exactly one username (`one`); each username belongs to at most one user (`lone`); a post has any number of comments (`set`). Multiplicities are central in ER diagrams, UML class diagrams, and Alloy. Asking about them uncovers missing requirements and test cases.
>
> **In the interview.** "Can two users have the same username? That kind of question, which relations point you to immediately."

> [!NOTE]
> **KEY TERM: Differential testing**
>
> **Definition.** Running the same inputs through two or more implementations that should agree (two compilers, an old and new version, a fast and a reference implementation) and reporting any disagreement. It avoids writing an exact oracle by checking a relation between programs, usually equivalence, sometimes equivalence up to an abstraction. **Metamorphic testing** generalizes it to relations between a program's outputs on related inputs.
>
> **In the interview.** Groce: "differential testing, which in some ways is an equivalence relation, the simplest relation you could have," is underused.

---

## Theme 5: The biggest advances

Jackson offers three candidates:

1. **Programming languages**: "moving away from low-level languages and manual memory management, better type systems." This "has improved the reliability of programs enormously."
2. **Interfaces**: "a lot of what's going on is really an attempt to reduce the content of interfaces, to make interfaces as weak as possible." From Parnas's "uses" relation to the Gang of Four patterns, "Interfaces are specifications, right?... The simpler you can make them, the more you can decouple components."
3. **Domain modeling**: rather than seeing software as scripts that transform input to output, recognize that "a software system maintains a model of the real world in its innards." It came from JSD, Dines Bjørner's domain modeling, and OMT, and became popular via Eric Evans's *Domain-Driven Design*. "People seem to have forgotten where all those ideas actually came from."

Also: "the idea of data abstraction has been extremely successful," in his view more so than object-oriented programming. (Compare Liskov, Ch. 3, and Shaw, Ch. 10.)

> [!NOTE]
> **KEY TERM: Interfaces as (weak) specifications**
>
> **Definition.** An interface is a specification of what clients may assume about a component. The *weaker* it is (the fewer and simpler the assumptions), the more implementations satisfy it and the less coupled clients are. Design patterns such as Observer and Strategy, and dependency inversion, largely work by weakening interfaces between components.
>
> **In the interview.** "We don't want those specifications to be rich and complicated, we want them to be as simple as possible. And the simpler you can make them, the more you can decouple components."

> [!NOTE]
> **KEY TERM: Parnas's "uses" relation**
>
> **Definition.** From Parnas's "Designing Software for Ease of Extension and Contraction" (1979): module A **uses** module B if A's correct functioning depends on a correct implementation of B being present. (This is narrower than "calls": A may call B without depending on its correctness.) Designing a loop-free uses hierarchy produces systems with useful subsets, which can be built, tested, and delivered incrementally.
>
> **In the interview.** "I think, he's still underappreciated." Applying the paper's criterion to typical object-oriented practice gives "some nasty surprises."

> [!NOTE]
> **KEY TERM: Domain modeling (and domain-driven design)**
>
> **Definition.** Building an explicit model of the problem domain (its entities, relationships, and events) and making the software's internal state a model of it, updated by inputs and queried for outputs. **Domain-driven design** (Evans, 2003) adds a shared **ubiquitous language** between developers and domain experts, and **bounded contexts** where each model applies.
>
> **In the interview.** "A software system maintains a model of the real world in its innards." From JSD, Bjørner, and OMT to DDD.

---

## Theme 6: No dichotomy between theory and practice

"I don't believe that there's a real dichotomy between those two things," because the most fundamental problems in code "actually turn out to be problems at a larger scale." The search for new code-level modularity mechanisms (aspect-oriented programming, subject-oriented programming, roles) is "a reflection of larger problems in the structure of software, and the way that functionality is allocated to modules."

> [!NOTE]
> **KEY TERM: Aspect-oriented programming (cross-cutting concerns)**
>
> **Definition.** A paradigm (Kiczales et al., 1997) for modularizing **cross-cutting concerns** such as logging, security checks, or transactions, whose code would otherwise be scattered across many modules. An **aspect** declares code ("advice") to run at specified points ("join points," selected by "pointcuts"). AspectJ is the best-known implementation.
>
> **In the interview.** AOP and its relatives addressed real entanglements, which concepts approach "in a simpler setting."

---

## Theme 7: Heroes

- **Michael Jackson**, his father, "not just out of family loyalty": he modeled "thinking just incredibly carefully and rigorously about what it meant to do software development... questioning all the assumptions you are making."
- **Tony Hoare**, for his "elegance and precision," and especially **CSP**: "thinking of a system basically as having a behavior that involves a trace of atomic actions."
- **David Parnas**, who "always worked on real problems" and found insights that "could be applied very cost-effectively."
- **Jean-Raymond Abrial** "and the Oxford crew working on Z," for relational modeling.
- **Barbara Liskov and John Guttag** (Guttag was Jackson's PhD supervisor). Jackson was a TA for Liskov's class in the 1980s. Of CLU he paraphrases Hoare's remark about ALGOL: an improvement "not only on its predecessors but on many of its successors too." Groce adds that Liskov and Guttag's textbook is ahead of how we still teach programming.

> [!NOTE]
> **KEY TERM: CSP and trace semantics**
>
> **Definition.** Hoare's **Communicating Sequential Processes** (1978; book 1985) models concurrent systems as processes that interact by synchronizing on shared **events**. A process's meaning is given by its **traces** (the sequences of events it can engage in), refined by failures and divergences. CSP influenced occam, Go's channels, and the model checker FDR.
>
> **In the interview.** "The idea of thinking of a system basically as having a behavior that involves a trace of atomic actions. That's a very powerful idea."

---

## Theme 8: An exemplar — Adobe Lightroom

Jackson nominates **Adobe Lightroom**, and its lead, Mark Hamburg, who lectured to his class. Lightroom "was really an inspiration for my book on concept design." The team "spent a lot of time sitting around a whiteboard, trying to just struggle through making things as simple and clear as possible." They delivered much of Photoshop's **non-destructive editing** by much simpler means. Instead of layers ("an incredibly powerful and clever idea, but also a very complicated and expensive idea"), edits are a **history of actions** that is stored and can be reviewed and rolled back. "They didn't invent this idea," but they "thought through conceptually, very carefully."

> [!NOTE]
> **KEY TERM: Non-destructive editing (action history)**
>
> **Definition.** Editing in which the original data is never modified. The application stores the original plus a list of operations and computes the result from them, so any step can be adjusted or undone later. The same idea appears in version control, event sourcing (storing events rather than current state), and database logs.
>
> **In the interview.** Lightroom's "histories of actions," a simpler concept than Photoshop's layers for the same purpose.

---

## Theme 9: Worst practices — uneven quality

For *The Essence of Software*, Jackson chose examples from Apple, Google, Microsoft, and Adobe to avoid strawmen, and found that "the general quality is really remarkable." But quality "is very much not uniform." The bad areas:

- **Enterprise software**, delivered by consultancies tailoring packaged systems: "astonishingly less polished and more fragile and harder to use."
- **Software for physical devices**: printers, scanners, and cameras. "It's just amazing how bad software is for scanners and printers."
- **U.S. government software**, compared with the UK's digitization of citizen services. It reflects governance, It is also, he says, a lack of really wanting to solve the problem. (Groce mentions Pahlka's *Recoding America*, also recommended by Kernighan, Ch. 6.)
- **Airlines**, perhaps because much of their software is "a sort of veneer on top of Sabre, a decades-old system." Most can't send you a calendar file for your flight. Jackson pastes the email into ChatGPT to make one.

> [!NOTE]
> **KEY TERM: Legacy core with a modern veneer**
>
> **Definition.** A common pattern in which new interfaces (web, mobile, APIs) are built around an old core system that still holds the business logic and data (airline reservation systems such as Sabre, which grew out of a 1960s American Airlines project; bank mainframes). It preserves working systems but makes some changes, even simple ones, disproportionately hard.
>
> **In the interview.** Airlines that can't produce a calendar file: "It makes no sense."

> [!NOTE]
> **KEY TERM: Government digital service (GOV.UK)**
>
> **Definition.** The UK's Government Digital Service (founded 2011) rebuilt many citizen-facing services around user needs, with in-house teams, open standards, and a published service standard. GOV.UK became a widely cited model. The U.S. created 18F and the U.S. Digital Service (2014) on similar lines.
>
> **In the interview.** "They produced incredibly solid and easy-to-use software for most services provided to citizens, and we don't have anything like that in the United States."

---

## Theme 10: LLMs — a revitalization of software design

Jackson first feared LLMs were "sucking all the oxygen out of the room." Then he realized "the opposite is true": LLMs "have laid bare the inadequacies of our current methods and processes." Their abilities are "nothing short of miraculous," yet "LLMs are poised to create mountains of technical debt, and huge piles of unmaintainable, fragile, unpredictable, software."

If we redesign development to fit LLMs, it will fit humans too, for two reasons:

1. **Legibility.** LLMs process language, as people do, so "aligning the code with the problem domain, what I and my students have been calling legibility recently, is something that not only LLMs want, but that humans want too."
2. **Modularity.** "You can't let your Claude Code or Cursor or Co-pilot, whatever it is, just write randomly all over your repo." Developers long "were paying lip service" to modularity, thinking "they could work their way around it with enough sheer intellectual brute force," and "we're going to have a reckoning that will make modularity a hot topic again."

Groce hopes for a testing renaissance, since LLMs make mistakes "no one but an insane person would make." Jackson: "not only a testing renaissance, but a verification renaissance too." Groce's anecdote: an LLM produced a loop invariant for Dafny that he couldn't find. Jackson expects "much more focus onto auditing and analysis, much more focus onto upfront design."

His most provocative prediction: "a major reversal, or a sort of turning back," against the Agile perspective. Agile said all the value is in the code, so skip documentation. With LLMs, "the code is easy to produce... so it's only the documentation that matters, because the documentation is your specification, which we now call prompts." Prompts "need to be recorded in the repository, and they need to have their relationships and their provenance properly tracked."

> [!NOTE]
> **KEY TERM: Legibility**
>
> **Definition.** Jackson's group's term for code whose structure and names correspond directly to the problem domain and its concepts, so that a reader, human or LLM, can tell what the code does and why from the code itself. It ties domain modeling and concept design to readability.
>
> **In the interview.** "Something that not only LLMs want, but that humans want too: to be able to read code and understand what it actually does."

> [!NOTE]
> **KEY TERM: Prompts as specifications (development artifacts)**
>
> **Definition.** When code is generated from natural-language instructions, those instructions become the primary source artifact: they say what the code should do. Treating them as specifications means versioning them, reviewing them, tracing which code came from which prompt (**provenance**), and keeping them consistent as requirements change.
>
> **In the interview.** "They are the assets from which your code is being generated... they are becoming the development artifacts of the future." Compare Yang's PRDs (Ch. 7).

---

## Theme 11: Methodology — Agile threw out the baby

Jackson shares Bertrand Meyer's view (*Agile! The Good, the Hype and the Ugly*, 2014) that Agile "largely threw the baby out with the bathwater." Its two very good ideas: **incrementality**, and a sensible evaluation function: not lines of code written, but "have I delivered some functionality of value." Both predated Agile, "But Agile undoubtedly helped." The damage: "with its contemptuous view of what it called **big design up front**, it lumped all kinds of thoughtful design thinking into the same category as excessive documentation."

The missed opportunity is **reuse** of designs. "Whenever you build a social media app, you've got, guess what? You've got user authentication, and posting, and commenting, and friending, and following, and karma." Methods should focus innovation where it's needed and "adopt the best existing ideas, and... meld them together." Instead, methodology examples "almost always assume a greenfield context in which you just reinvent user authentication yet again."

> [!NOTE]
> **KEY TERM: Big design up front (BDUF)**
>
> **Definition.** A pejorative term from the Agile and XP community for completing and approving a detailed design before writing code. Agile methods favor "just enough" design and emergent design through refactoring. Critics, including Meyer and Jackson, argue this discouraged valuable up-front thinking about concepts, architecture, and requirements, not just excess documentation.
>
> **In the interview.** Agile "lumped all kinds of thoughtful design thinking into the same category as excessive documentation." Contrast Beck (Ch. 11): "If you build the perfect foundation, you never get to round two."

> [!NOTE]
> **KEY TERM: Design reuse (concept reuse)**
>
> **Definition.** Reusing proven *designs* (what a feature does and how its parts behave) rather than only code. Patterns, reference architectures, and Jackson's catalog of concepts (Upvote, Reservation, Session) are forms of design reuse. Most applications combine many familiar concepts and innovate in only a few.
>
> **In the interview.** "Most of the functional components that we were designing were ones that we'd designed before."

---

## Theme 12: How we teach design

Jackson agrees with Krishnamurthi that computer scientists avoid design. Two reasons. First, we teach programming as "the solving of well-specified, pre-digested problems," rather than teaching that "difficult work starts from actually having to formulate the problem for yourself." Second, CS hasn't absorbed design culture. Nigel Cross's *Designerly Ways of Knowing* contrasts engineering's stratified approach (formulate the problem, elaborate it, then solve) with designers' back-and-forth, in which "you construct an artifact, and you experiment with the artifact, and the artifact essentially teaches you about the structure and nature of your problem." Patterns and Christopher Alexander pushed software that way, but "we could still go a lot further," and must, "because LLMs are going to render a lot of the traditional challenges of programming no longer interesting." Not "the problem is to write a red and black tree."

> [!NOTE]
> **KEY TERM: Designerly ways of knowing**
>
> **Definition.** Nigel Cross's argument (1982; book 2006) that design is a distinct form of knowledge, alongside science and the humanities. Designers are solution-focused, work by making and testing artifacts, handle ill-defined problems, and let problem and solution **co-evolve**. Cross argued design ability can be taught and studied.
>
> **In the interview.** "The artifact essentially teaches you about the structure and nature of your problem." Compare Shaw's problem setting (Ch. 10) and Beck's "the act of creation changes the world" (Ch. 11).

---

## Theme 13: Now — concepts, synchronizations, and LLMs

Jackson is most excited about "the nexus between concept design and LLMs." In his course, students develop concepts one at a time. A small tool points an LLM at background documents and a **concept specification** and generates code for that concept. It can even write the specification for many standard concepts. Each concept is built as an independent service, and services are combined through **synchronizations**, with "a much simpler way now of synchronizing the concepts, and a declarative engine for doing that."

He worried concept design was "a bit too iconoclastic," but now sees it as "an embodiment of a lot of ideas whose time has come": concepts as "a natural evolution of the idea of microservices"; separation of concerns that AOP aimed for; synchronizations as "a form of event-driven architecture" related to Evans's **anti-corruption layers**. "We've conquered a lot of the basic mechanical problems of building software, and there's just a great opportunity to do fundamental things."

> [!NOTE]
> **KEY TERM: Synchronization (concept composition)**
>
> **Definition.** In concept design, the rule that connects independent concepts without them referring to each other: "when an action happens in concept A (and some condition holds), perform an action in concept B." For example, when a post is deleted, delete its comments; when a user logs in via Session, allow Upvote actions for that user. Synchronizations keep concepts independent, as event-driven architectures keep services independent.
>
> **In the interview.** Concepts built as independent services, brought "together through synchronizations," with a declarative engine.

> [!NOTE]
> **KEY TERM: Event-driven architecture and anti-corruption layer**
>
> **Definition.** In an **event-driven architecture**, components communicate by emitting and reacting to events instead of calling each other directly (Ch. 10 primer, publish–subscribe). An **anti-corruption layer** (Evans, *Domain-Driven Design*) is a translation layer that keeps one subsystem's model from leaking into another's when they must interact, preserving each one's integrity.
>
> **In the interview.** Synchronizations "have a lot in common with, Eric Evans' notions of anti-corruption layers and things like that."

---

## Theme 14: Software that delights

Jackson's "what should I have asked": "what would we need to do to have software that actually delighted us? Software that actually contributed in some positive way to the quality of our lives?" His current answer: "eliminate friction... take away all the small causes of irritation." Small frictions add up: his university system makes him wait 10–20 seconds for each student registration petition, dozens per term. Groce: university enterprise software "is almost all friction."

Groce asks whether "delight," in the tradition from Vitruvius to Ruskin to Alexander, means art, not just unobtrusiveness. Jackson proposes three stages:

1. **Interaction design**: the minute-to-minute experience of visual design, finding commands, and feedback.
2. **Concept design**: whether the software's structure aligns with users' purposes.
3. **Second-order effects**: how software shapes behavior. Cory Doctorow's **enshittification**, for example "how Spotify exploits playlists to control what you listen to."

Concept design matters in all three, because "they all require a semantics." He notes how spiritual Alexander became, with buildings having "life" and "wholeness," but is more drawn to Heidegger's **ready-to-hand**: tools that "disappear from our consciousness when they work well... becoming visible only when they break." "We want our software to be tools that enrich our lives in seamless ways, not a world that we live inside. But who knows. Maybe someone could design software that really gives us a feeling of transcendence?"

> [!NOTE]
> **KEY TERM: Friction (usability)**
>
> **Definition.** Small obstacles, delays, and confusions that make a task harder than it needs to be: extra steps, waits, unclear states, inconsistent behavior. Individually minor, they accumulate into large costs in time, errors, and frustration. Usability work and concept design both aim to remove them.
>
> **In the interview.** "The most important thing you can do to make software more delightful is to eliminate friction."

> [!NOTE]
> **KEY TERM: Enshittification**
>
> **Definition.** Cory Doctorow's term (2022) for the decline of platforms: first they are good to users, then they degrade the user experience to benefit business customers, then they degrade both to extract value for themselves. In concept terms, a concept's original purpose is corrupted to serve the platform's purposes.
>
> **In the interview.** "How Spotify exploits playlists to control what you listen to": you can't discuss "playlistification" without knowing what the playlist concept is.

> [!NOTE]
> **KEY TERM: Ready-to-hand**
>
> **Definition.** Heidegger's term (*Being and Time*, 1927) for equipment in use that we don't notice as an object: the hammer while hammering. When a tool breaks or gets in the way it becomes **present-at-hand**, an object of attention. HCI researchers (Winograd and Flores, 1986) used the distinction to argue that good tools disappear into the work.
>
> **In the interview.** "Tools disappear from our consciousness when they work well, and become extensions of our own bodies, becoming visible only when they break."

---

## Connections to other chapters

- **Chapter 1 (Ball):** Static and dynamic analysis meet Alloy's bounded checking; both value tools that working engineers will actually use.
- **Chapter 2 (Krishnamurthi):** Krishnamurthi's design question gets an answer from design culture (Cross, Schön, Alexander). Krishnamurthi's group at Brown built Forge, an Alloy-inspired tool for teaching formal methods.
- **Chapter 3 (Liskov):** Jackson's PhD supervisor Guttag and teacher Liskov; data abstraction "more successful than object-oriented programming."
- **Chapter 6 (Kernighan):** Unix as infrastructure exemplar; *Recoding America*; Kernighan's struggle with Brooks's *Design of Design*.
- **Chapter 9 (Schneider):** Conceptual integrity (Unix's "everything is a file") is concept design's goal; specifications as the key to assurance.
- **Chapter 10 (Shaw):** Michael Jackson's problem frames; Schön's problem setting; studying exemplars (Lightroom); Alexander.
- **Chapter 11 (Beck):** Agile from inside and from a critic: Beck's incremental foundations vs. Jackson's "threw the baby out with the bathwater." Both see LLMs making specifications central.

## Discussion questions

1. Pick an app you use and list five of its concepts. For each, state its purpose and operational principle. Which concepts are shared with other apps?
2. Write a relational description of a small system (users, posts, follows). What multiplicity questions does it raise that you wouldn't have asked of a single class?
3. Jackson predicts a reversal of Agile's view of documentation: prompts become specifications. Should prompts be committed to the repository? What else would that require?
4. Compare Jackson's critique of "big design up front" with Beck's "if you build the perfect foundation, you never get to round two." Can both be right?
5. Find a source of friction in software you use every week. Which of Jackson's three stages (interaction, concept, second-order) does it belong to?
6. What would software that "delights" look like? Is the ready-to-hand ideal compatible with software as art?

## Further reading

- D. Jackson, *The Essence of Software: Why Concepts Matter for Great Design*, Princeton University Press, 2021.
- D. Jackson, *Software Abstractions: Logic, Language, and Analysis* (revised ed.), MIT Press, 2012.
- D. Jackson, "Alloy: A Language and Tool for Exploring Software Designs," *CACM*, 2019.
- M. Jackson, *Principles of Program Design* (JSP), 1975; *System Development* (JSD), 1983; *Problem Frames*, 2001.
- D. L. Parnas, "Designing Software for Ease of Extension and Contraction," *IEEE TSE*, 1979.
- C. A. R. Hoare, *Communicating Sequential Processes*, Prentice Hall, 1985.
- E. Evans, *Domain-Driven Design*, Addison-Wesley, 2003.
- B. Meyer, *Agile! The Good, the Hype and the Ugly*, Springer, 2014.
- N. Cross, *Designerly Ways of Knowing*, Springer, 2006.
- T. Winograd and F. Flores, *Understanding Computers and Cognition*, Ablex, 1986.
- C. Doctorow, "The 'Enshittification' of TikTok," *Wired*, 2023.

---

## Key term index

| Term | Theme |
|---|---|
| JSP and JSD | 1 |
| Model-based formal specification (VDM, Z) | 1 |
| Problem domain | 2 |
| Reflective practice | 2 |
| Concept (concept design) | 3 |
| Separation of concerns | 3 |
| Relational modeling | 4 |
| Alloy (lightweight formal methods) | 4 |
| Multiplicity | 4 |
| Differential testing | 4 |
| Interfaces as weak specifications | 5 |
| Parnas's "uses" relation | 5 |
| Domain modeling and DDD | 5 |
| Aspect-oriented programming | 6 |
| CSP and trace semantics | 7 |
| Non-destructive editing | 8 |
| Legacy core with a modern veneer | 9 |
| Government digital service | 9 |
| Legibility | 10 |
| Prompts as specifications | 10 |
| Big design up front | 11 |
| Design reuse | 11 |
| Designerly ways of knowing | 12 |
| Synchronization | 13 |
| Event-driven architecture and anti-corruption layer | 13 |
| Friction | 14 |
| Enshittification | 14 |
| Ready-to-hand | 14 |
