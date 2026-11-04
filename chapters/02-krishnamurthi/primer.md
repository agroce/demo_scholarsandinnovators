# Primer for Chapter 2 (Krishnamurthi): Software Process Models

*From SAGE and Royce to Agile and DevOps, plus how programming languages absorb software engineering*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Krishnamurthi interview.*

## What this primer covers, and why

**Part 1: Process models.** What a process model is; the 1950s SAGE project; what Royce's 1970 paper actually said (it was _not_ a recommendation of the pure waterfall); how "waterfall" became doctrine; the V-model and the spiral; iterative and incremental development; the Agile Manifesto; XP, Scrum, Kanban; DevOps and continuous delivery; choosing between plan-driven and agile.

**Part 2: Programming languages and SE.** How recurring software engineering problems (control flow, modularity, data hiding, memory errors, concurrency, scale) were repeatedly "solved" by moving them into language design.

> **Why read this first.** Krishnamurthi describes teaching the waterfall model _backwards_: students derive it from 1955 constraints and come to respect it. To appreciate that move, and to judge the very different accounts of the waterfall from Zeller, Kernighan, and Holzmann later in the book, you need the real history. Krishnamurthi is also a programming-languages researcher. His claims that "your favorite language is just the 17th one" and that PL is "the material science of computer science" make most sense if you know how SE and PL ideas have traded places.

---

# Software process models

*Who decides what to build, in what order, and when to find out you were wrong?*

## What is a software process model?

Every software project performs the same core **activities**: understanding requirements, designing, constructing (coding), verifying and validating, deploying, and maintaining. A **process model** says how those activities are _ordered_, _overlapped_, and _repeated_, and who makes decisions along the way.

- **Code-and-fix**: no model at all. Write code, fix what breaks. Fine for a weekend script, disastrous at scale.
- **Plan-driven** (sequential) models: finish and approve each activity before the next starts.
- **Iterative and incremental** models: repeat all activities in short cycles, delivering growing slices of the system.
The central variable is the **cost of change**. If changing a decision late is very expensive (punched cards, hardware, fixed-price contracts, spacecraft), you plan ahead. If change is cheap (interactive tools, automated tests, continuous deployment), you iterate.

> **Three questions to ask of any process.** **1.** When are requirements considered fixed?
**2.** How often does working software reach a real user?
**3.** Where in the process is risk identified, and who pays when it's found late?

Process models are descriptions, and often idealizations, of how work is organized. Real projects mix models. A useful way to compare them is to ask what each assumes about the cost of change and the stability of requirements. Krishnamurthi's 1955 exercise works because it fixes those assumptions: punched cards, assembly language, and a customer (the military) who wants a system defined up front.

## The 1950s: SAGE and the first "lifecycle"

The first very large software project was **SAGE** (Semi-Automatic Ground Environment), the U.S. air-defense system of the 1950s, with hundreds of thousands of instructions written by hundreds of programmers.

In 1956 **Herbert Benington** described how SAGE software was produced as a sequence of phases: operational plan, specifications, coding, parameter testing, assembly testing, shakedown, and system evaluation. It is essentially a waterfall, 14 years before Royce.

When the paper was republished in 1983, Benington added a foreword saying the description was misleading. SAGE had in fact started by building an **experimental prototype**, and he would not recommend a strictly top-down sequential process.

> **Connection to Chapter 2.** Krishnamurthi asks students to imagine being "a 1955 software developer" building "a defense system." That is almost exactly SAGE. The real SAGE developers already knew they needed a prototype.

Source: H. D. Benington, "Production of Large Computer Programs," 1956 symposium; reprinted in IEEE Annals of the History of Computing, 1983, with a new foreword. Larman and Basili's 2003 history of iterative development discusses the foreword.

## The diagram everyone remembers

```
System requirements → Software requirements → Analysis → Program design → Coding → Testing → Operations
```

This is (roughly) Figure 2 of Winston Royce's 1970 paper "Managing the Development of Large Software Systems." It is the image reproduced in countless textbooks as "the waterfall model." Royce did not use the word "waterfall," and he did not recommend this picture.

Royce worked on spacecraft mission software at TRW. The paper presents this sequential figure only to criticize it on the next page.

## Royce's very next sentence

> "I believe in this concept, but the implementation described above is risky and invites failure."
>
> — Winston W. Royce, 1970

Royce's concern: testing comes at the end, so if testing reveals a design flaw, "the required design changes are likely to be so disruptive that the software requirements upon which the design is based... are violated," and the project may go back to the beginning, with "up to a 100-percent overrun in schedule and/or costs."

The full paper is short (11 pages) and very readable. It's worth assigning: students are usually surprised that the 'father of the waterfall' spends most of the paper arguing for iteration, prototyping, and customer involvement.

## What Royce actually proposed

```
Same staircase, but each step can feed back to the previous one:
System req ⇄ Software req ⇄ Analysis ⇄ Program design ⇄ Coding ⇄ Testing ⇄ Operations

Royce's five fixes: (1) program design comes first; (2) document the design; (3) do it twice; (4) plan, control and monitor testing; (5) involve the customer.
```

Royce's later figures add **feedback between adjacent steps** (dashed) and, more radically, a complete **pilot model built first** ("do it twice"), heavy documentation, careful test planning, and formal **customer involvement** at several points. Several of these (prototype first, involve the customer) became central ideas of iterative and agile methods decades later.

Royce did warn that iteration is tolerable only between adjacent steps. Feedback that jumps back several steps (testing revealing a requirements flaw) is what kills projects. That is very close to Holzmann's argument (Chapter 4) about measuring how far bugs travel.

## How "waterfall" became doctrine anyway

- **The name** came later. T. E. Bell and T. A. Thayer used "waterfall" for Royce's diagram in a 1976 paper on requirements. The simplified figure, not the text, is what spread.
- **Procurement made it official.** The U.S. Department of Defense standard **DOD-STD-2167** (1985) required document-driven development with formal reviews between phases. Fixed-price contracts need a fixed specification to price, and a fixed specification is what Kernighan (Chapter 6) calls a contract for "adversarial relationships."
- **Auditability.** Phase documents and sign-offs are easy to inspect, certify, and assign blame for. That matters in regulated and safety-critical domains.
- **Hardware coupling.** When software ships with hardware (spacecraft, telephone switches), parts of the schedule really are sequential.
Many organizations that were 'doing waterfall' in fact iterated informally, while documenting a waterfall. That is one reason Zeller (Chapter 5) can say the pure waterfall "has never ever been done by anyone really."

> **Four accounts in this book.** **Krishnamurthi** (Ch. 2): derive it from 1955 constraints and respect it.
**Zeller** (Ch. 5): the pure form was never really practiced.
**Kernighan** (Ch. 6): a contracting model for adversaries.
**Holzmann** (Ch. 4): the phases are a frame for measuring defects scientifically.

DOD-STD-2167A (1988) softened some requirements, and MIL-STD-498 (1994) explicitly allowed incremental and evolutionary development. The waterfall persisted in procurement long after its technical critics had moved on.

## The V-model: every design level gets a test level

```
Requirements ............................ Acceptance testing
   System design ...................... System testing
      Architecture design ........... Integration testing
         Module design ............ Unit testing
                       Coding
```

The **V-model** (developed in German government and in U.S. systems engineering in the 1980s–90s) is a waterfall bent in half: each specification level on the left is verified by a test level on the right, and test cases are **planned when the specification is written**. It remains widely used in safety-critical domains: the automotive standard ISO 26262 is organized around it, and avionics practice under DO-178C follows a similar structure.

The V-model's lasting contribution is the pairing of specification and test levels, which forces testability to be considered early. Its weakness is the same as the waterfall's: the left side is assumed complete before the right side begins.

## Boehm's spiral model (1986–88): let risk drive the process

```
(1) Objectives → (2) Risk analysis / prototypes → (3) Develop & verify → (4) Plan next loop → back to (1), spiraling outward
```

Barry Boehm's spiral model generalizes earlier models: each cycle starts by asking **what is most likely to make the project fail**, and does whatever reduces that risk (a prototype, a simulation, a formal analysis, or a waterfall-like step). The waterfall becomes a special case for low-risk, well-understood problems.

B. W. Boehm, "A Spiral Model of Software Development and Enhancement," ACM SIGSOFT SEN 1986; IEEE Computer 1988. Boehm also wrote Software Engineering Economics (1981), source of the famous cost-to-fix curve (see the Chapter 4 primer).

## Iterative and incremental development is old, not new

Craig Larman and Victor Basili's history (2003) shows iteration long predates "agile":

- **1950s–60s:** the X-15 hypersonic aircraft program and NASA's Project Mercury used iterative, incremental development, Mercury with very short, time-boxed iterations and test-first practices.
- **1970s:** Harlan Mills and IBM's Federal Systems Division promoted incremental development, for example on Navy helicopter and Trident submarine software. Tom Gilb began advocating **Evolutionary Delivery** (Evo).
- **1980s–90s:** the spiral model; **Rapid Application Development**; the **Rational Unified Process** (RUP, 1998), which kept heavyweight artifacts but organized them in iterations.
**Incremental** means delivering the system in slices. **Iterative** means revisiting and refining. Most modern processes do both.

> **Why this matters.** The common story "everyone did waterfall until 2001, then agile was invented" is false. The tension between planning and iterating is as old as large-scale software. What changed was the _cost of change_: cheaper machines, interactive tools, and automated tests made frequent iteration practical for ordinary teams.

C. Larman and V. R. Basili, "Iterative and Incremental Development: A Brief History," IEEE Computer 36(6), 2003. It's short, readable, and a good companion reading for this primer.

## Process history, part 1: plans and their critics

- **1956** — Benington: SAGE phases: a waterfall in all but name
- **1968** — NATO SE conference: "software crisis"
- **1970** — Royce paper: "risky and invites failure"
- **1976** — "Waterfall" named: Bell & Thayer
- **1985** — DOD-STD-2167: document-driven, phased
- **1986** — Spiral model: Boehm: risk-driven
- **1991** — SEI CMM: process maturity levels

## Process history, part 2: iteration goes mainstream

- **1986** — "New New Product Development Game": Takeuchi & Nonaka's "rugby" teams
- **1995** — Scrum at OOPSLA: Schwaber & Sutherland
- **1998** — Rational Unified Process: iterative, artifact-heavy
- **1999** — Extreme Programming Explained: Kent Beck
- **2001** — Agile Manifesto: 17 signatories, Snowbird, Utah
- **2009** — "10+ deploys per day": Flickr; DevOps begins
- **2010** — Continuous Delivery: Humble & Farley

## The Agile Manifesto (2001)

> "Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan."
>
> — Manifesto for Agile Software Development, 2001

The manifesto adds: "while there is value in the items on the right, we value the items on the left more." It is a statement of _priorities_, not a rejection of documentation or plans. Note "customer collaboration over **contract negotiation**": a direct answer to the procurement-driven waterfall Kernighan describes.

Signatories included Kent Beck, Ward Cunningham, Martin Fowler, Ken Schwaber, Jeff Sutherland, Alistair Cockburn, and others. The manifesto has twelve supporting principles, including "deliver working software frequently," "welcome changing requirements, even late in development," and "at regular intervals, the team reflects on how to become more effective."

## Three agile families: engineering, management, flow

**Extreme Programming (XP)**

- Kent Beck, late 1990s (Chrysler C3 project)
- **Engineering practices** taken "to the extreme": test-first development, pair programming, continuous integration, refactoring, small releases, an on-site customer.
- Beck is interviewed in Chapter 11; the **Chapter 11 primer** covers XP and TDD in depth.

**Scrum**

- Schwaber & Sutherland, 1995; from Takeuchi & Nonaka's "rugby" metaphor
- A **management framework**, silent on coding practice:
- Fixed-length sprints (1–4 weeks)
- Roles: Product Owner, Scrum Master, Developers
- Product backlog, sprint backlog
- Daily scrum, sprint review, retrospective
- The most widely adopted, and most certified, agile method.

**Kanban**

- From Toyota's production system; adapted to software by David J. Anderson (book, 2010)
- **Flow**, not iterations:
- Visualize work on a board
- Limit work in progress (WIP)
- Pull new work when capacity frees up
- Measure lead time and improve continuously
- Common in operations and maintenance teams.

Teams frequently combine these: Scrum for planning cadence, XP practices for engineering, and a Kanban-style board. Kernighan's "hype cycle" (Chapter 6) applies: each began as a good idea and acquired consultants and certifications. Krishnamurthi's advice: "extract the kernel of truth."

## One Scrum sprint

```
Product backlog → Sprint planning → Sprint backlog → Sprint (1–4 weeks, with a daily scrum) → Increment → Sprint review → Retrospective → (feedback) → Product backlog
```

Scrum makes Royce's "involve the customer" and Boehm's "plan the next loop" happen every few weeks. Note what it does _not_ specify: how to design, test, or review code. Teams fill that gap with XP-style practices or not at all.

## After agile: DevOps, CI/CD, and process-as-automation

In the 2000s the bottleneck moved from _writing_ code to _shipping_ it. **DevOps** (the name dates from around 2009) merges development and operations, and **continuous integration and delivery** (CI/CD) make every change automatically built, tested, and releasable. (The **Chapter 7 primer** covers operations, DevOps, and observability in depth.)

For process history, the important point is this: much of what earlier process models enforced with documents and meetings is now enforced by **tooling**. That is Krishnamurthi's "friction" argument in action: once tests run automatically at every commit, "people are now doing it much more without even thinking about it."

> **Connections.** Krishnamurthi (Ch. 2) on CI: "the commit becomes my way of saying, this is a transaction boundary." He also raises its environmental cost.

Ball (Ch. 1): Microsoft replaced its testing discipline with rings and Insider builds, "but we still get bitten."

Staged rollout, feature flags, SRE, and the DORA metrics are all in the Chapter 7 primer.

## Agile or plan-driven? Boehm and Turner's "home grounds"

Barry Boehm and Richard Turner (_Balancing Agility and Discipline_, 2003) argued the answer depends on five factors. Most real projects need a hybrid.

**Agile home ground**

- **Criticality:** failure costs comfort or money, not lives
- **Size:** small teams
- **Dynamism:** requirements change often
- **Personnel:** many experienced developers
- **Culture:** thrives on freedom and some chaos

**Plan-driven home ground**

- **Criticality:** failure may cost lives or huge sums (spacecraft, medical, avionics)
- **Size:** large teams, many organizations
- **Dynamism:** requirements fairly stable
- **Personnel:** wider mix of experience
- **Culture:** thrives on clear roles and procedures

**Questions for this book**

- Where does JPL flight software sit? (Holzmann, Ch. 4)
- Where does MakeCode's GUI sit? (Ball, Ch. 1)
- Where does a government benefits system sit, with accessibility needed on day one? (Kernighan, Ch. 6)
- Where does your capstone sit?

---

# Programming languages and software engineering

*Recurring SE problems keep getting moved into the language itself*

## How SE problems become language features

- **Tangled control flow** ("spaghetti code") → **structured control** and **block structure**: ALGOL 60, then Pascal; Dijkstra's "Go To Statement Considered Harmful" (1968).
- **Module boundaries ignored** → **modules and packages** with explicit interfaces: Modula-2, Ada packages, ML modules, Java packages.
- **Data representations leaking** → **abstract data types and classes**: Simula 67, CLU, Smalltalk (see the Chapter 3 primer).
- **Unstated assumptions** → **types and contracts**: static type systems, Eiffel's design by contract, Dafny.
- **Memory corruption** → **garbage collection** (Lisp, Java) and **ownership types** (Rust).
- **Concurrency bugs** → threads, monitors, actors (Erlang), channels (Go), async.
- **Dynamic codebases outgrowing their checks** → **gradual typing** (TypeScript).

> **The pattern.** A discipline is first taught as a **practice** ("don't use goto," "don't touch another module's data"), then enforced by **tools**, and finally made the **default** in a language. Liskov (Ch. 3) states the motive: without enforcement, "your team is no better than your weakest programmer."

This is the background for Krishnamurthi's claim that "the tendency has been towards richer and richer expressiveness of programmer intent" and his prediction that proof-assistant-based languages will feel normal in 20 years. It also explains his joke about systems researchers now evangelizing Rust: memory safety moved from SE discipline into the type system.

## Languages that reshaped SE, 1957–1983

- **1957** — FORTRAN: high-level language; optimizing compiler
- **1960** — ALGOL 60: block structure, recursion, BNF
- **1967** — Simula 67: classes, objects, inheritance
- **1970** — Pascal: structured programming for teaching
- **1972** — C: portable systems programming
- **1975** — CLU: abstract data types, iterators
- **1983** — Ada: packages, generics; DoD standard

## Languages that reshaped SE, 1986–today

- **1986** — Eiffel: design by contract
- **1990** — Standard ML; Haskell: type inference, purity
- **1995** — Java: GC, interfaces, mainstream safety
- **1998** — Erlang open-sourced: concurrency-oriented
- **2012** — TypeScript: gradual typing at scale
- **2015** — Rust 1.0: memory safety without GC
- **Today** — Lean, Dafny, F*: proofs inside programs

## Why an SE student should care about PL

- **Languages encode hard-won SE knowledge.** Choosing a language is choosing which classes of bugs are impossible, which are caught by the compiler, and which are left to tests.
- **The Blub paradox** (Paul Graham): programmers underrate features their language lacks. Knowing the history helps you notice your own Blub.
- **Domain-specific languages** let a team turn its domain knowledge into a language: SQL, regular expressions, build files, infrastructure-as-code, Racket's language-oriented programming.
- **Adoption is social as well as technical.** Better languages often lose. Compatibility (C++ with C; TypeScript with JavaScript) frequently beats elegance (Kernighan, Ch. 6).

> **In Krishnamurthi's words.** PL and SE are "the material science of computer science." Everyone else builds with the bricks and steel; "somebody has to be thinking about bricks and steel."

And: "your favorite language is just the 17th one that everyone said will be the last thing you need to know."

## Check yourself before reading Chapter 2

1. What did Royce say about the purely sequential model in his 1970 paper, and what five changes did he recommend?
2. Name two forces (other than technical merit) that made the waterfall the official process for decades.
3. How does the spiral model decide what to do in each cycle? Why does that make the waterfall a special case?
4. Distinguish XP, Scrum, and Kanban. Which one says the most about how to write and test code?
5. Give two examples of an SE practice that later became a language feature.

## Further reading

- W. W. Royce, "Managing the Development of Large Software Systems," Proc. IEEE WESCON, 1970. (Short; read the whole thing.)
- H. D. Benington, "Production of Large Computer Programs," 1956; reprinted with foreword in IEEE Annals of the History of Computing, 1983.
- C. Larman and V. R. Basili, "Iterative and Incremental Development: A Brief History," IEEE Computer, 2003.
- B. W. Boehm, "A Spiral Model of Software Development and Enhancement," IEEE Computer, 1988.
- Manifesto for Agile Software Development, agilemanifesto.org, 2001.
- K. Beck, Extreme Programming Explained, 1999 (2nd ed. 2004); K. Schwaber and J. Sutherland, The Scrum Guide (current edition online).
- B. Boehm and R. Turner, Balancing Agility and Discipline: A Guide for the Perplexed, 2003.
- J. Humble and D. Farley, Continuous Delivery, 2010; N. Forsgren, J. Humble, G. Kim, Accelerate, 2018.
- E. W. Dijkstra, "Go To Statement Considered Harmful," CACM, 1968.
