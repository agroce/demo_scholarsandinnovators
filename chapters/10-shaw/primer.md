# Primer for Chapter 10 (Shaw): Software Architecture

*Styles, quality attributes, tactics, views, decisions, and erosion, plus the question of whether software engineering is engineering*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Shaw interview.*

## What this primer covers, and why

**Main topic: software architecture.** What architecture is and why it matters; a short history; architectural styles (pipe-and-filter, layered, client-server, event-based, repository, microservices); quality attributes and scenarios; architectural tactics; documenting architecture with views; architecture decision records; evaluation; architectural mismatch, drift, and erosion.

**Shorter topic: is software engineering engineering?** The 1968 NATO provocation; Shaw's model of how engineering disciplines mature; licensing, codes, and liability; arguments on both sides.

> **Why read this first.** Shaw, with David Garlan, helped establish software architecture as a distinct research discipline, and her whole career aims at "the genuine engineering discipline for software." She talks about architectural styles, architecture description languages, frameworks that impose their architectures, and her model of engineering maturity as if you already know them. This primer covers those ideas so you can follow her, and so you can compare the many interviewees' answers to Krishnamurthi's design question with an architect's vocabulary.

---

# Software architecture

*The decisions that are expensive to change*

## What is software architecture?

- **Perry and Wolf** (1992): architecture = { **elements**, **form**, **rationale** }. Processing, data, and connecting elements; their arrangement; and the reasons for choosing them.
- **Shaw and Garlan** (1996): **components** (computation and data) and **connectors** (procedure call, pipe, event, shared data, protocol), plus constraints on how they combine.
- **Bass, Clements, and Kazman** (_Software Architecture in Practice_): "the set of structures needed to reason about the system."
Why it matters:

- It largely determines **quality attributes**: performance, availability, security, modifiability.
- It is decided **early**, with the least information, and is **expensive to change**.
- It shapes the organization: teams form around components (Conway's law, Ch. 3 primer).

> **Shaw's view.** Architecture is a method for "thinking about what goes on between the code and the running system."

The text editor showed her that data abstraction "captures everything except what really makes a text editor a text editor."

## A short history of software architecture

- **1968** — THE operating system: Dijkstra's layers
- **1972** — Parnas: information hiding (Ch. 3 primer)
- **1992** — Perry & Wolf: "Foundations for the Study of Software Architecture"
- **1995** — Kruchten's 4+1 views: and "Architectural Mismatch"
- **1996** — Shaw & Garlan: Perspectives on an Emerging Discipline
- **2011** — Architecture decision records: Michael Nygard
- **2014** — "Microservices": Lewis & Fowler's definition (term coined 2011–12)

## Architectural styles, part 1

**Pipe-and-filter**

- **Components:** filters that transform data. **Connectors:** streams.
- **Strengths:** reuse; easy to recombine; natural concurrency.
- **Weaknesses:** poor for interactive programs; data must fit a common format.
- **Examples:** Unix pipelines, compilers' phases, ETL and stream processing.

**Layered**

- **Components:** layers that provide services to the layer above.
- **Strengths:** each layer replaceable; supports portability (network stacks, OS hardware abstraction).
- **Weaknesses:** performance cost of passing through layers; hard to layer some systems cleanly.
- **Examples:** OSI and TCP/IP stacks; THE; three-tier web apps.

**Client-server / n-tier**

- **Components:** clients request; servers provide. **Connectors:** request–response protocols.
- **Strengths:** centralized data and control; many clients.
- **Weaknesses:** server is a bottleneck and single point of failure unless replicated.
- **Examples:** the web; databases; most business systems.

## Architectural styles, part 2

**Event-based (publish–subscribe)**

- **Components** announce events; others register interest. No direct calls ("implicit invocation").
- **Strengths:** loose coupling; easy to add new reactions.
- **Weaknesses:** hard to reason about order and completion; debugging cascades.
- **Examples:** GUIs; message brokers (Kafka); event-driven microservices.

**Repository / blackboard**

- **Components** communicate only through a shared data store.
- **Strengths:** data integrity, transactions, one source of truth.
- **Weaknesses:** schema changes ripple everywhere; contention.
- **Examples:** databases with many applications; IDEs around a shared model; Shaw's "huge database with transactions."

**Microservices**

- **Components:** small services, each owning its data, deployed independently. **Connectors:** network APIs, events.
- **Strengths:** independent teams and scaling.
- **Weaknesses:** distributed-system failures, versioning, observability (Ch. 7 primer).
- **Examples:** large web companies; often overused by small teams.

Real systems combine styles: a layered web app whose services publish events, with a database at the bottom. Shaw's 'hip pocket' observation is that teams often choose the style their culture favors rather than the one the problem needs.

## Three styles, drawn

```
Pipe-and-filter: access.log | grep " 404 " | cut -d" " -f7 | sort | uniq -c | sort -rn | head

Layered: Presentation → Application logic → Data access → Database

Event-based: Checkout --OrderPlaced--> [event bus] --> Email sender, Analytics
             Inventory --StockLow--> [event bus]
```

**Top:** a Unix pipeline that counts the most-requested missing pages. Each filter knows nothing about the others. **Lower left:** a layered application. **Lower right:** event-based services. The checkout service doesn't know who reacts to an order, so adding analytics requires no change to it.

## Quality attributes and scenarios

Functional requirements say _what_ a system does. **Quality attributes** say _how well_: performance, availability, security, modifiability, testability, usability, scalability, deployability.

They are vague until made concrete. The SEI's **quality attribute scenario** has six parts:

- **Source** of the stimulus; the **stimulus**; the **environment** (normal, overloaded, degraded); the **artifact** affected; the **response**; and the **response measure**.
Quality attributes **trade off**: replication improves availability but complicates consistency; encryption improves security but costs performance; extra layers improve modifiability but add latency.

Much of an architect's work is choosing which attributes matter most for _this_ system, and saying so.

> **Example scenario.** **Source:** a developer. **Stimulus:** wants to add a new payment provider. **Environment:** at design time. **Artifact:** the checkout component. **Response:** the change is made and deployed. **Measure:** within 3 person-days, touching no more than 2 modules, with no change to other services.

Now "modifiable" means something testable.

## Architectural tactics

A **tactic** is a design decision that influences one quality attribute (Bass, Clements, Kazman). Styles bundle many tactics together.

**Availability**

- Heartbeat and health checks
- Redundancy and failover
- Retry with backoff; circuit breaker
- Rollback; checkpointing
- Remove from service (quarantine)

**Performance**

- Caching
- Concurrency and parallelism
- Load balancing
- Reduce work: batching, approximation
- Bound queues; shed load

**Modifiability**

- Encapsulate (information hiding)
- Use an intermediary (adapter, broker)
- Restrict dependencies (layers)
- Defer binding (configuration, plug-ins)
- Split modules by likely change

**Security**

- Authenticate and authorize
- Limit access and exposure
- Encrypt data in transit and at rest
- Detect: audit and intrusion detection
- Recover: restore, revoke

Tie each column back to earlier primers: availability tactics (Ch. 7, 9), modifiability (Ch. 3), security (Ch. 8, 9). Schneider's test of a good architecture, extensibility to unforeseen needs, is mostly modifiability tactics.

## Documenting architecture: views

No single diagram shows a whole architecture. Document it as a set of **views**, each for particular concerns and readers:

- **Kruchten's 4+1** (1995): **logical** (key abstractions), **process** (concurrency, runtime interaction), **development** (modules, layers, teams), **physical** (deployment to hardware), tied together by **scenarios** (the "+1").
- The **C4 model** (Simon Brown): four zoom levels: system **context**, **containers** (applications, databases), **components**, and **code**.
- SEI's **Views and Beyond**: module views, component-and-connector views, and allocation views.
Each diagram needs a **key**: what do the boxes and lines mean? A box-and-line diagram without one is ambiguous: is an arrow a call, a data flow, a dependency, or a deployment?

> **Shaw's unfinished idea.** Documentation "always fails, because it's not kept up to date." Her goal: an **architecture description language** in which the architecture is "the definitive document, and if that wasn't right, the build failed." Today's **architecture conformance checks** in CI (for example, forbidding a layer from calling upward) are a partial version.

## Recording decisions: ADRs

Architecture is a set of **decisions**, and the rationale is the first thing lost. Michael Nygard's **architecture decision records** (2011) are short documents kept in version control alongside the code:

- **Title**: a short noun phrase.
- **Status**: proposed, accepted, deprecated, superseded by ADR-N.
- **Context**: the forces at play, including technical, organizational, and political ones.
- **Decision**: what we will do, stated actively.
- **Consequences**: what becomes easier and what becomes harder, good and bad.
Architecture **evaluation** methods such as the SEI's **ATAM** (Architecture Tradeoff Analysis Method) gather stakeholders to rank quality attribute scenarios, and check how the architecture's decisions support or risk each one.

> **Example ADR.** **ADR-7: Use a message queue between checkout and email.**
**Status:** accepted.
**Context:** email provider outages currently fail checkouts.
**Decision:** checkout publishes OrderPlaced; an email worker consumes it.
**Consequences:** checkout no longer depends on email availability; emails may be delayed; we must monitor queue depth.

## Mismatch, drift, and erosion

- **Architectural mismatch** (Garlan, Allen, and Ockerbloom, 1995): reusing components fails when they make conflicting assumptions about control (who's in charge of the main loop?), data, protocols, or the environment. Their attempt to build one system from four reusable parts took years instead of months.
- **Drift** and **erosion** (Perry and Wolf): the implemented system diverges from the intended architecture, first through insensitivity to it (drift), then through outright violations (erosion), until the documented architecture describes a system that no longer exists.
- **Big ball of mud** (Foote and Yoder, 1997): the most common architecture in practice, a haphazardly structured system grown by expedient changes.
- **Framework-imposed architecture**: adopting a framework adopts its architecture (Shaw: "you just accept their architecture").
Countermeasures: explicit decisions (ADRs), automated conformance checks, refactoring (Ch. 6 primer), and keeping the architecture visible.

> **Shaw's bridge analogy.** A bridge engineer still chooses stone arch, cable-stayed, suspension, or truss for each site. "The way development environments and frameworks have grown up, we don't get that choice anymore."

---

# Is software engineering engineering?

*Shaw's "holy grail": a genuine engineering discipline for software*

## The 1968 provocation

> "The phrase 'software engineering' was deliberately chosen as being provocative, in implying the need for software manufacture to be based on the types of theoretical foundations and practical disciplines, that are traditional in the established branches of engineering."
>
> — P. Naur and B. Randell (eds.), Software Engineering: Report on a Conference Sponsored by the NATO Science Committee, 1969

Al Perlis attended, and brought the "blue books" back to Carnegie: "take these, read these, this is going to change your life." The name was an aspiration, not a description. Shaw's career asks how close we've come.

## Shaw's model: how engineering disciplines mature

```
Craft --production--> Commercial ----------------------------> Professional engineering
                          \--production problems--> Science --theory fuses with practice--^
```

From "Prospects for an Engineering Discipline of Software" (1990), based on Shaw's sabbatical reading of engineering history (civil and chemical engineering were her main examples). A field becomes **commercial** when production grows; **production problems** stimulate **science**; professional engineering emerges when science and practice fuse. Shaw argued most of software was commercial, with pockets of engineering.

## What older engineering fields have

**Codified knowledge**

- Handbooks of standard designs and calculations, so most design is **routine**.
- Software: patterns, styles, and SWEBOK exist, but little an engineer can look up and apply with confidence.
- Shaw's HVAC firm and its room of flat files.

**Licensing**

- Professional Engineer (PE) licenses for work affecting public safety.
- Software: Texas began licensing software engineers in 1998; the U.S. PE exam in software engineering ran from 2013 until it was discontinued in 2019 for low participation.
- Several Canadian provinces restrict the title "engineer."

**Liability and standards**

- Engineers and manufacturers bear liability; building codes are law.
- Software: licenses disclaim warranties (Shaw's liability argument).
- Domain standards exist where regulators insist: avionics (DO-178C), automotive (ISO 26262), medical (IEC 62304).

## Arguments on both sides

**It isn't engineering (yet):**

- Few results let us predict a design's properties before building it, as structural analysis does for a bridge.
- Practices vary enormously, and evidence for many is weak (Ch. 4 primer).
- Most practitioners have no professional obligations to the public beyond their employer.
**It is engineering:**

- Engineers in older fields also rely on heuristics, experience, and "the best organized knowledge that they have got" (Shaw). Linear models are approximations too.
- Hillel Wayne's 2021 interviews with people who worked in both traditional engineering and software found most considered software engineering real engineering, with differences of degree.
- Where stakes are high (JPL, avionics), software practice looks very like engineering: standards, reviews, analysis, and liability.

> **The book's spectrum.** Shaw: the engineering needed "depends on the thing that you're doing." Compare **Holzmann** (Ch. 4) at JPL, **Hoodlet** (Ch. 8) on medical devices, and **Yang** (Ch. 7) on daily demos. Which of them are doing engineering?

## Check yourself before reading Chapter 10

1. Define architecture in terms of components, connectors, and rationale. Why is architecture expensive to change?
2. Compare pipe-and-filter and event-based styles: when would you choose each?
3. Write a quality attribute scenario for availability in a system you know, with all six parts.
4. What are drift and erosion? Name two practices that slow them.
5. Describe Shaw's craft → commercial → professional engineering model. Where would you place web development today?

## Further reading

- M. Shaw and D. Garlan, Software Architecture: Perspectives on an Emerging Discipline, Prentice Hall, 1996.
- D. E. Perry and A. L. Wolf, "Foundations for the Study of Software Architecture," ACM SIGSOFT SEN, 1992.
- L. Bass, P. Clements, R. Kazman, Software Architecture in Practice (4th ed.), Addison-Wesley, 2021.
- P. Kruchten, "The 4+1 View Model of Architecture," IEEE Software, 1995.
- D. Garlan, R. Allen, J. Ockerbloom, "Architectural Mismatch: Why Reuse Is So Hard," IEEE Software, 1995.
- B. Foote and J. Yoder, "Big Ball of Mud," PLoP, 1997.
- M. Nygard, "Documenting Architecture Decisions," 2011 (blog post).
- M. Shaw, "Prospects for an Engineering Discipline of Software," IEEE Software, 1990.
- P. Naur and B. Randell (eds.), Software Engineering: Report on a Conference Sponsored by the NATO Science Committee, 1969.
- H. Wayne, "Are We Really Engineers?" (the Crossover Project essays), hillelwayne.com, 2021.
