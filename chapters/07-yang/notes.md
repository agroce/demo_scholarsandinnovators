# Chapter 7 — Jean Yang: From Research Insight to Industry Impact

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Jean Yang

Yang was named to *MIT Technology Review*'s "35 Under 35" in 2016, as she was finishing her PhD at MIT and about to become an assistant professor at Carnegie Mellon. The recognition was for **Jeeves**, a programming language that automatically enforces information flow policies while letting programmers write their own policies. She left CMU to found **Akita Software**, which built tools for observing API traffic. Postman acquired Akita, and Yang ran Engineering, Product, and Design for Postman's Insights project. With Hongyi Hu she also hosted *PLTalk*, a series of conversations with leading programming languages researchers and practitioners.

She is the only interviewee in the book who has founded and run a company. She and Keith Hoodlet (Chapter 8) are also the two interviewees whose careers are closer to their start than their finish, so their views look forward more than back.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Family of CS professors; "janky" tools | Why she chose to work on *tooling* rather than become a developer |
| "Code is quickly becoming not the thing" | SaaS, microservices, APIs, and AI as prefab building blocks |
| The verified OS internship | Choosing the right abstraction: 9 person-months vs. 30 person-years |
| Jeeves and information flow | Access control vs. information flow; guarantees "subverted" at the database and network |
| Akita | If you can't control or prove, *observe*; execution traces as retrospective experiments |
| Three principles | Pick abstractions by goals; watch for leaks; observe emergent behavior |
| Biggest advances | Types, objects, verification at Amazon, program synthesis via AI |
| Practical vs. theoretical research | "Research should not be practical right now" |
| Heroes and systems | Xavier Leroy, Peter Lee; the OCaml compiler; early Google infrastructure; Zapier |
| Worst practice | AI demos that can never become maintained products |
| Methodology | From quarterly launches to daily demos; PRDs matter more than ever |
| Professor vs. founder | Impact is partly luck; legacy depends on changing how people think |
| Design | Design is a discipline with methods, not a nebulous art |
| What's next | Evals, data, context, observability: closing the demo-to-product gap |

---

## Theme 1: Making the tooling better

Yang grew up in a family of computer scientists. Her parents had a terminal they used to ssh into work "since I was very little." In college she found computer science the most interesting subject, but she did not want to be a developer, because "I felt the tooling was generally kind of janky." Taking hardware, compilers, and programming languages showed her "that humans can make the tooling better," and she decided to work "on the tooling that helped people make software better."

This is a recurring motive in the book. Compare Ball (Chapter 1), who wants to make programming accessible, and Zeller (Chapter 5), who wants to automate debugging.

## Theme 2: "Code is quickly becoming not the thing"

Yang argues that the emphasis of programming has shifted: "several decades ago, the emphasis was on writing clean code, writing efficient code, writing optimized code. This is the craft of code. I think that the craft around code has largely crumbled."

The cause is not only cultural: "Tools matter." She points to **software as a service (SaaS)**, **microservices**, and **APIs**: "You're able to do a lot by writing very small amounts of code, and you're able to do a lot with just calling APIs." AI adds natural language on top, and "APIs also really enable AI, because AI is calling these APIs now." Her metaphor: "before you had to be able to make your own bricks to build a house. Now, you have off-the-shelf components, you have prefab houses."

Compare Kernighan (Chapter 6), for whom "it's hard to get the program to do what you want" is the constant of programming, and Liskov (Chapter 3), for whom the craft of module design is the heart of the field.

> [!NOTE]
> **KEY TERM: Application programming interface (API)**
>
> **Definition.** The defined way one piece of software can request services from another: the operations available, their inputs and outputs, and the rules for using them. Today the term most often means a **web API**: a set of HTTP **endpoints** (URLs plus methods such as GET and POST) through which services exchange data, usually as JSON. An API is a contract between provider and consumer. Changing it can break every client.
>
> **In the interview.** "A lot of software construction is putting together the pieces." Akita's whole business was watching API calls. And AI agents now act largely by calling APIs.

> [!NOTE]
> **KEY TERM: Software as a service (SaaS) and microservices**
>
> **Definition.** **SaaS** delivers software as a hosted service that users reach over the network, usually by subscription, rather than as a product they install. A **microservice architecture** builds one application as many small, independently deployed services that communicate through APIs, each owning its own data. Both let teams build by composing services instead of writing everything, at the cost of distributed-system complexity: network failures, versioning, and behavior no single team fully understands.
>
> **In the interview.** "I think one thing that's changed this is the rise of SaaS and the rise of microservices." Later: "Software systems have become really complex, especially with the rise of SaaS." (The Chapter 10 primer covers architectural styles in depth.)

---

## Theme 3: Choosing the right abstraction (the verified OS)

Yang's first paper came from an internship with Chris Hawblitzel at Microsoft Research. The question was how to verify an operating system. Microsoft's earlier Singularity project had written an OS in a **type-safe** language, which "gets us a lot of the way," but operating systems "necessarily have low-level code they call down into, and so you always violate your type safety guarantees."

The solution was a tiny **nucleus** written in verified assembly, a "verified interface" into type-safe C#, and a design in which "the part that can be type-safe is type-safe, and the rest of it has a verified boundary." The whole effort took about 9 person-months. A full-scale OS verification published the same year took 30 person-years. That project "obviously proved way more guarantees than we did," but the lesson stayed with her: "if you can choose the right abstractions and get the right reliability, that can take you a really long way." And: "if you're actually doing stuff that subverts the guarantees of your tools, you might want to rethink parts of your system."

*Instructor note:* the system is Verve (Yang and Hawblitzel, PLDI 2010). The best-known full kernel verification of that period is seL4 (Klein et al., SOSP 2009).

> [!NOTE]
> **KEY TERM: Type safety and memory safety**
>
> **Definition.** A language is **type-safe** if well-typed programs cannot perform operations on values of the wrong type: "types are what they say they are." **Memory safety** means a program cannot read or write memory it does not own: no buffer overflows, use-after-free, or dangling pointers. Safe languages (Java, C#, OCaml, Rust's safe subset) guarantee these by construction. C and C++ do not.
>
> **In the interview.** Singularity's bet: "let's write our operating system in a type-safe language, where we can get memory safety and type safety... the memory is never corrupt, that actually gets us a lot of the way." (Hoodlet, Ch. 8, and Schneider, Ch. 9, both return to memory safety as a security issue.)

> [!NOTE]
> **KEY TERM: Formal verification and the trusted boundary**
>
> **Definition.** **Formal verification** proves mathematically that a program meets a specification for *all* inputs (see the Chapter 1 primer). Real systems verify part of the code and rely on the rest. The unverified part is the **trusted computing base (TCB)**. A common design strategy is to make the TCB as small as possible and to verify the **boundary** where verified and unverified code meet.
>
> **In the interview.** A "micro-micro kernel that we called a nucleus" in verified assembly, with "a verified boundary" to the type-safe rest of the system: 9 person-months, against 30 person-years for full verification.

> [!NOTE]
> **KEY TERM: Leaky abstraction**
>
> **Definition.** An abstraction "leaks" when details it was supposed to hide affect its users anyway: performance, failure modes, or semantics of the layer below show through. Joel Spolsky's "law of leaky abstractions" (2002) says all non-trivial abstractions leak to some degree. A guarantee provided by one layer (type safety, a security policy) is **subverted** when code escapes into a layer that does not provide it.
>
> **In the interview.** Yang's second principle: "pay attention to where your abstractions are leaking." Her research question became "What's your abstraction? Where do your guarantees get subverted?" Compare Liskov's encapsulation and Hyrum's law (Chapter 3 primer).

---

## Theme 4: Information flow, and guarantees that stop at the boundary

In graduate school Yang designed **Jeeves**, a language for "automatically enforcing a kind of security/privacy policy, information flow security policies." She explains the difference from access control precisely: "Access control is like, okay Alice can see this value, but Bob can't. Information flow says if we have anything conditional on who can see it, the results of those values are also kept secret."

The motivation was factoring out repeated work: "there's checks littered all over the code. If you're building a web app, you're always having to check for stuff. If we just factor that out it'd be less error-prone."

Two kinds of calls worried her: calls to the **database** ("plain vanilla SQL... Your language actually does not extend to that") and **network calls** ("Anytime you make an API call outside of your language, again, your guarantees get subverted"). At CMU her group extended policy enforcement across the database and then the network boundary. That led to the idea: "I wonder if we can generalize this idea to all API calls."

She also worked with Nikhil Swamy and Juan Chen on **proof-carrying code** with information flow, stuffing proofs into bytecode to send over the network, and concluded "I don't think this is going to actually happen in real life."

> [!NOTE]
> **KEY TERM: Access control vs. information flow control**
>
> **Definition.** **Access control** decides whether a principal may read or write a particular object (Alice may read the salary field; Bob may not). **Information flow control** tracks where data *goes* after it is read: any value computed from a secret, including through a branch on the secret, is itself secret. The formal goal is often **noninterference**: secret inputs have no observable effect on public outputs. Information flow is strictly stronger and harder to enforce.
>
> **In the interview.** "Information flow is a little stronger than access control." Jeeves let programmers state policies once and had the language enforce them everywhere. Schneider (Ch. 9) shows information flow is *not* enforceable by an ordinary reference monitor.

> [!NOTE]
> **KEY TERM: Proof-carrying code**
>
> **Definition.** A technique (Necula and Lee, 1996) in which untrusted code is shipped along with a formal proof that it satisfies a safety policy. The recipient checks the proof, which is fast and simple, instead of trusting the producer or analyzing the code from scratch.
>
> **In the interview.** Yang's internship work on the "logistics of 'How do you send code over the network?'" She names Peter Lee's proof-carrying code as work she admires for building "an entire world around a concept."

---

## Theme 5: If you can't prove it, watch it (Akita)

Yang did not want to force every system into one language or framework: "I didn't really love that idea." Instead: "if you can't control things, what if you just gave people better and better tools for observing things?"

She borrowed an idea from economists, who cannot A/B test a country's economic policy and so construct "found experiments" from existing data. "What if you treated your execution traces as retrospective data for running experiments?" Industry partners liked the idea, but "legal teams are not going to be super happy about some professor writing papers about this," so she left CMU and founded Akita, starting in API security.

She expected users to want rich **invariants** about their systems. "Where we ended up was much lower on the hierarchy of needs than I expected, which is: people don't know what API endpoints they even have." Groce: "Quite as Daikon-feeling."

Her summary: "if you can't prove guarantees about your system, I think the next best thing is watching the system."

> [!NOTE]
> **KEY TERM: Observability**
>
> **Definition.** The degree to which you can understand a system's internal state from its external outputs. In operations practice, the "three pillars" are **logs** (records of events), **metrics** (numeric measurements over time), and **traces** (the path of a single request through many services). Monitoring answers known questions ("is latency above threshold?"). Observability aims to let you answer questions you didn't anticipate. (Covered in depth in the Chapter 7 primer.)
>
> **In the interview.** Akita "was always about this idea of, what if we just watched everything that was going on?" Yang's next interests include "AI observability."

> [!NOTE]
> **KEY TERM: Execution trace and natural (retrospective) experiment**
>
> **Definition.** An **execution trace** is a recorded sequence of events from a real run of a system: requests, responses, function calls, values. A **natural experiment** studies the effect of some difference using data that already exists, because a controlled experiment is impossible or unethical. Applied to software, production traces become data for answering "what happens when...?" questions after the fact.
>
> **In the interview.** "[If you] treated your execution traces as retrospective data for running experiments," inspired by economists' "found experiments."

> [!NOTE]
> **KEY TERM: Specification mining (likely invariants)**
>
> **Definition.** Inferring specifications from observed behavior instead of writing them by hand. **Daikon** (Ernst et al., 1999–2007) runs a program, records variable values, and reports properties that held on every observation (for example, `x > 0` or `size == len(items)`) as *likely invariants*. Inferred specs are only as good as the executions observed. They describe what *did* happen, not what *should*.
>
> **In the interview.** Yang hoped users would want invariants like "if this value has this kind of property... we get errors." Users actually needed something simpler: an inventory of their own API endpoints, "which is another kind of invariant, for sure."

---

## Theme 6: Three principles

Asked whether "observation matters" is her first principle, Yang gives three:

1. "Pick your abstraction based on your goals."
2. "Pay attention to where your abstractions are leaking."
3. "In a system where there are emergent behaviors, you often don't have abstractions at that level, and so the only thing you have is observation."

The third rests on a claim about modern systems: "These systems are much more like biological systems with emergent behaviors. They're much less like engineering systems." That puts her in productive tension with Schneider (Ch. 9), who wants programmers to master assertional reasoning, and Jackson (Ch. 12), who wants designs simple enough to reason about.

> [!NOTE]
> **KEY TERM: Emergent behavior**
>
> **Definition.** System-level behavior that arises from the interactions of components and cannot be predicted from any single component's specification. Examples: cascading failures across microservices, retry storms, feedback loops in recommendation systems. Emergent behavior is why large systems need testing and monitoring at the system level, not only unit-level reasoning.
>
> **In the interview.** "In a system where there are emergent behaviors, you often don't have abstractions at that level." Observational techniques "are going to become more and more important in the next decade."

---

## Theme 7: The biggest advances — mostly solved in the 70s?

Yang's list: moving away from untyped languages ("we're leveraging types more"), object orientation ("a very huge advance"), and software verification, which "has gone from something that was a dream, several decades ago, to something that's very achievable," as with Amazon's verification of low-level infrastructure. But "most of the stuff in the mainstream was solved in the 70s... objects, types, we had Hindley Milner." The advances since then have been in how ideas "trickle down" into industry.

The other big intellectual advance is **program synthesis**: AI "can finally achieve a bunch of the stuff that people have been trying to do since the 50s and 60s." Earlier work used input-output examples, templates, and natural language, but "just didn't have anywhere near the tooling." Groce mentions Sumit Gulwani's Excel work (see Ball, Chapter 1).

> [!NOTE]
> **KEY TERM: Type inference (Hindley–Milner)**
>
> **Definition.** An algorithm that computes the most general types for a program without type annotations, while still guaranteeing static type safety. Developed by Hindley (1969) and Milner (1978), it underlies ML, OCaml, Haskell, and influences type inference in Rust, Swift, and TypeScript.
>
> **In the interview.** Yang's evidence that the mainstream ideas are old: "objects, types, we had Hindley Milner."

> [!NOTE]
> **KEY TERM: Program synthesis**
>
> **Definition.** Automatically generating a program from a higher-level description of what it should do: a logical specification, input-output examples (**programming by example**, as in Excel's Flash Fill), a sketch with holes, or natural language. Classical synthesis searched a space of programs and was limited to small programs. Large language models generate code statistically, which scales further but gives no correctness guarantee.
>
> **In the interview.** "Program synthesis can finally achieve a bunch of the stuff that people have been trying to do since the 50s and 60s... It was a logic model problem, not an AI model problem."

---

## Theme 8: Research during a platform shift

Yang's answer to "practical or theoretical?" is unusual: "I think that research should not be practical right now." Her reasoning is that "AI is the next platform shift," and "what happens in the next 5 years will determine the next 15 to 20 years." Industry R&D can't plan beyond six months, so researchers should be "so far ahead" that they have good work ready whether the world turns out to look like A or B.

Open questions she lists: "does the act of writing code even belong to humans anymore?"; "do we need different abstractions, if AI is going to be writing all the code and humans are going to be reviewing the code?"; and "how do we debug and maintain these kinds of systems?"

> [!NOTE]
> **KEY TERM: Platform shift**
>
> **Definition.** A change in the dominant base on which software is built and delivered, which resets tools, skills, companies, and practices. Commonly cited shifts: mainframe → PC → web → mobile → cloud. Each made some expertise obsolete and created new problems (for example, the web created whole classes of security bugs).
>
> **In the interview.** "It's clear that AI is the next platform shift. It's not yet clear what the platform shift is going to be, but... code generation is going to be part of it." Compare Kernighan's "paradigm shift" (Ch. 6).

---

## Theme 9: Heroes and well-built systems

Yang's heroes built whole bodies of work around one idea. **Xavier Leroy** "created OCaml, he created Coq" and showed "the craft in building these very complex and complete systems." (*Instructor note:* Leroy led the creation of OCaml. Coq, now renamed Rocq, was begun by Thierry Coquand and Gérard Huet. Leroy is a long-time contributor and used it to build CompCert, the formally verified C compiler.) **Peter Lee**, for proof-carrying code: "construct an entire world around a concept, and really run with it for a very long period of time."

Systems she admires: the **OCaml compiler** ("a thing of beauty"); the early Google infrastructure she read as an intern in 2007 (**Bigtable, MapReduce, Chubby**), built when "performance really mattered" and "the craft of software... mattered more"; and, at the other extreme, **Zapier**, a low-code tool whose abstractions are "a real feat of product engineering" though the code underneath is "probably not" beautiful. That contrast is her argument again: "code is not the thing anymore."

## Theme 10: The worst practice — demos that can never ship

Yang has "nothing against demo culture." Before AI, a demo people liked could usually become a product with enough time and money. Now "the demos are awesome! People like the demos!" But "What people want is not what they need. What they want is a thing. What they really need is to keep having that thing work day after day."

Her example: generating a drone controller with an AI coding tool is impressive, but if the business succeeds, "you're now maintaining that drone controller for 10 years." And the day-two experience: "my Claude-generated code has a bug, let me regenerate the whole system, that's no way to work." Experienced engineers tell executives "There's no way that demo can actually get built for real because of the way AI works, or because of the data we have."

Her diagnosis: AI tooling such as **evals** and MLOps was built "by model teams, for model teams," and product teams don't yet know "what's the gap between a demo and a real system?"

> [!NOTE]
> **KEY TERM: Maintainability (and the prototype-to-product gap)**
>
> **Definition.** The ease with which software can be understood, corrected, adapted, and extended over its lifetime. Maintenance is usually the majority of a system's total cost (see the Chapter 6 primer). A **prototype** is built to learn or persuade. A **product** must keep working as data, users, dependencies, and requirements change.
>
> **In the interview.** "We can't maintain most of these things, and so my take is we still can't do them." Compare Kernighan's and Brooks's "throw one away" (Ch. 6).

> [!NOTE]
> **KEY TERM: Evals (AI evaluation suites)**
>
> **Definition.** Systematic tests for AI-based systems: a curated set of inputs plus a way to judge outputs (exact match, a scoring rubric, a programmatic checker, or another model as judge), run repeatedly to measure quality and catch regressions as models, prompts, or data change. Evals play the role of a test suite for non-deterministic components.
>
> **In the interview.** "A lot of people believe that if everyone just wrote evals, our demos would work." Yang has invested in "programmatic evals, better abstractions for evals."

> [!NOTE]
> **KEY TERM: Fine-tuning**
>
> **Definition.** Further training a pre-trained machine learning model on a smaller, task-specific dataset so that it performs better (more accurately, faster, or more cheaply) on that task. It is one alternative to prompting a general model, alongside retrieval of relevant context.
>
> **In the interview.** "Product companies will generally have to fine-tune their own models... The things that each product needs to be fast are different... Accuracy and speed both cost a lot."

---

## Theme 11: Process — velocity vs. the PRD

At Postman, Yang arrived to a quarterly release cadence, appropriate for an enterprise product where "we better be sure that things were tested." By the time she left, "the CEO was asking for daily demos, weekly product feature updates." She sees "two camps": one favoring velocity and throwing planning "out the window," and senior people saying "specs and plans and PRDs are actually more important than ever before, because you can generate a whole app in a day if you have the right PRD." She half-predicts that "in 5 years, people are going to say, 'Did you know docs are actually a good idea?'"

> [!NOTE]
> **KEY TERM: Product requirements document (PRD)**
>
> **Definition.** A document describing what a product or feature should do and why: the problem, target users, goals and success metrics, functional requirements, constraints, and what is out of scope. It is written mainly by product managers and is less formal than a traditional software requirements specification. (Requirements engineering is covered in the Chapter 4 primer.)
>
> **In the interview.** If AI can generate an app from a description, the description becomes the important artifact: "The product requirements doc is powerful, now," as Groce sums it up.

> [!NOTE]
> **KEY TERM: Release cadence**
>
> **Definition.** How often a team ships new versions to users: yearly, quarterly, per sprint, daily, or continuously. Cadence depends on risk, the cost of failure, how users receive updates, and regulation. Faster cadence requires stronger automated testing and monitoring.
>
> **In the interview.** From "a quarterly launch of our app, because we were an enterprise product" to "daily demos, weekly product feature updates." Hoodlet (Ch. 8) explains how regulation sets cadence for medical devices.

---

## Theme 12: Professor vs. founder — impact, luck, legacy

What is the same in research and in a company? "How long you work on something really doesn't matter. The thing that people actually take away, that's very hard to control." Mike Hicks's essay on research scrums may have been his most impactful publication. Akita reached thousands of users. Postman's original tool, built by its CEO, has 40 million. "There's always a luck element of did you build the right thing at the right time."

But legacy is different from momentary success: "did you actually change the way people thought about things versus just building something that was very hot or very useful for a small period?" Neither industry nor academia measures that directly: "innovation is actually not the number one metric of running a company; how much money you make is... innovation is, one could argue, not the number one metric of academia, your h-index is."

## Theme 13: Design is a discipline

Responding to Shriram's question about design, Yang separates **design** from **art**. Product design "is a lot of process and discipline. How do you know that something is good? How do you run your user interviews? What problem are you solving?" People "who don't understand design think it's very unknowable."

She is critical of how computer scientists evaluate tools: "programming language designers are not very actually well-informed about design... Who did you ask? Who did you test it with?" A good designer knows a 30-minute observation won't answer the question, and will instead "construct a well-crafted survey, or a well-crafted interview, and ask them how this has been helpful to them over the last month." In grad school, "we looked at the code with our own eyes, that's it. That would never fly in a design team."

> [!NOTE]
> **KEY TERM: User research (product design practice)**
>
> **Definition.** Methods for learning what users need and whether a design meets those needs: interviews, surveys, contextual observation, usability tests, diary and longitudinal studies, and analysis of usage data. Good practice starts by framing the problem, picks a method that can actually answer the question, and separates what users *say* they want from what they *do* and *need*.
>
> **In the interview.** "There are techniques for exploring and testing your problem, testing your evaluation. There are good and bad practices for your information architecture." Compare Jackson's concept design (Ch. 12).

---

## Theme 14: Doing good work, and what's next

Yang's answer to Zeller's question is an internal compass: "Even if I don't know exactly what point B looks like, this is what point B feels like." She notes that people she admires "redefine some metric at some point." She left academia because "observational stuff is just 'the thing' to work on," and it was "so against the metrics and values of any field that I'm part of."

What she's working on now: "the gap between building an AI demo and making it work for real," including evals, data curation and labeling, context construction and memory, and AI observability. Her question to herself: since most organizations are "not getting out of demos," should those problems come before observability?

Her "what should I have asked" is the future of software development. She disagrees "with the people that think no code will ever be written again. I think the code will just look different." She finds "non-determinism in workflows very annoying," and warns: "we're only able to move up in abstraction if we can catch up on the maintenance and debugging and monitoring." The bad world "is that we just get stuck, because we never catch up with testing, evals and all that stuff."

---

## Connections to other chapters

- **Chapter 1 (Ball):** Both moved verification research toward practice. Ball's assurance spectrum includes Yang's move from proof to observation. Both mention Sumit Gulwani's programming by example.
- **Chapter 2 (Krishnamurthi):** Shriram asked the design question; Yang gives the sharpest answer in the book about design as a *discipline*. Both are PL people working on how languages express programmer intent.
- **Chapter 3 (Liskov):** Yang's "pick the right abstraction" and "watch where it leaks" extend Liskov's abstraction to systems built from services the programmer doesn't control.
- **Chapter 5 (Zeller):** Both see testing and debugging as the unglamorous bottleneck for AI-generated code.
- **Chapter 6 (Kernighan):** Kernighan's "paradigm shift" and Yang's "platform shift"; both are skeptical of AI hype for large systems. Yang says the craft of code has "crumbled"; Kernighan's books are about that craft.
- **Chapter 8 (Hoodlet):** Both are early-career, forward-looking interviewees who see AI demos and "vibe coding" outrunning maintenance and security.
- **Chapter 9 (Schneider):** Schneider proves which policies a reference monitor can enforce; information flow is not one of them. Yang's Jeeves enforced information flow in the language instead.

## Discussion questions

1. Yang says "the craft around code has largely crumbled." Kernighan (Ch. 6) and Liskov (Ch. 3) would likely disagree. Who is right for the software you expect to work on?
2. Yang's verified OS took 9 person-months, against 30 person-years for full verification. What did the cheaper approach give up? When is that trade worth it?
3. Pick a web app you know. List three places where a security or correctness guarantee in the code is "subverted" at a boundary (database, API, browser).
4. "If you can't prove guarantees about your system, I think the next best thing is watching the system." What can observation tell you that testing can't? What can't it tell you?
5. Explain "what people want is not what they need" for AI demos. Propose two concrete checks a team could apply before turning a demo into a product.
6. Design a small user study, as Yang's ideal designer would, to evaluate a developer tool you use. What would you measure, and over how long?

## Further reading

- J. Yang and C. Hawblitzel, "Safe to the Last Instruction: Automated Verification of a Type-Safe Operating System," *PLDI* 2010.
- J. Yang, K. Yessenov, and A. Solar-Lezama, "A Language for Automatically Enforcing Privacy Policies," *POPL* 2012. (Jeeves.)
- G. C. Necula, "Proof-Carrying Code," *POPL* 1997.
- M. D. Ernst et al., "The Daikon System for Dynamic Detection of Likely Invariants," *Science of Computer Programming*, 2007.
- J. Spolsky, "The Law of Leaky Abstractions," *Joel on Software*, 2002.
- C. Majors, L. Fong-Jones, and G. Miranda, *Observability Engineering*, O'Reilly, 2022.
- J. Yang, blog posts and essays on API observability and developer tools (Akita and Postman blogs).

---

## Key term index

| Term | Theme |
|---|---|
| Application programming interface (API) | 2 |
| Software as a service (SaaS) and microservices | 2 |
| Type safety and memory safety | 3 |
| Formal verification and the trusted boundary | 3 |
| Leaky abstraction | 3 |
| Access control vs. information flow control | 4 |
| Proof-carrying code | 4 |
| Observability | 5 |
| Execution trace and natural experiment | 5 |
| Specification mining (likely invariants) | 5 |
| Emergent behavior | 6 |
| Type inference (Hindley–Milner) | 7 |
| Program synthesis | 7 |
| Platform shift | 8 |
| Maintainability and the prototype-to-product gap | 10 |
| Evals | 10 |
| Fine-tuning | 10 |
| Product requirements document (PRD) | 11 |
| Release cadence | 11 |
| User research | 13 |
