# Primer for Chapter 12 (Jackson): Software Design and Specification

*Problems and machines, domain models, conceptual models, concept design, relational modeling, and lightweight formal methods, plus a history of formal specification*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Jackson interview.*

## What this primer covers, and why

**Main topic: designing what software does, and saying it precisely.** The world and the machine; requirements, specifications, and domain assumptions; domain modeling; conceptual models and usability; concept design worked through; why and how to specify formally; relational modeling with Alloy; lightweight formal methods in industry; the spectrum from bounded checking to full proof.

**Shorter topic: a history of formal specification.** From Hoare and VDM through Z, CSP, and B to Alloy and TLA+, and what made some methods succeed in practice.

> **Why read this first.** Jackson's interview moves between design (concepts, Lightroom, delight) and specification (relations, Alloy, prompts as specifications), and treats them as one subject. It also draws on his father's ideas about problems in the world. This primer gives the background for both halves, and works as a capstone for the design thread that runs through the book: modules (Ch. 3), architecture (Ch. 10), and now the concepts users actually see.

---

# Designing what software does

*Most of the difficulty is in the problem, not the code*

## Three levels of software design

"Design" covers decisions at several levels, each with its own concerns and methods:

- **Concept and user-experience design**: what the software _does_ from the user's point of view: its concepts, behaviors, and interactions. (This primer.)
- **Architecture**: the large-scale structure of components and connectors that achieves the quality attributes. (Chapter 10 primer.)
- **Module and code design**: interfaces, data abstraction, information hiding, coupling and cohesion. (Chapter 3 primer.)
Decisions at the top constrain everything below. A confusing concept can't be fixed by clean code, and a good concept can be hidden by a poor interface.

> **Jackson's three stages.** For software that delights:
**1.** Interaction design: the minute-by-minute experience.
**2.** Concept design: does the structure match users' purposes?
**3.** Second-order effects: how the software shapes behavior.

"Concept design plays a role in all of them, because they all require a semantics."

## The world and the machine

```
World: R (reverse thrust only on the runway), D (wheels turning ⇔ on runway)
   ⇅ shared phenomena (sensor signals, reverser commands)
Machine: S (enable reversers only when wheel sensors report turning)

If the machine satisfies S and the world satisfies D, then R holds: D, S ⊢ R
```

Michael Jackson and Pamela Zave's framework: the software must satisfy a **specification S** at the interface with the world, so that, given the **domain assumptions D**, the **requirement R** holds: **D, S ⊢ R**. In the 1993 Warsaw A320 accident, the plane hydroplaned on landing, the wheels didn't spin up, and the spoilers and thrust reversers deployed late: the domain assumption failed. (Compare Shaw's cruise-control sensor proxy, Ch. 10.)

## Requirements, specifications, and assumptions

Separating the three catches a class of errors that testing the code alone never will:

- A **requirement** is a desired property of the _world_: patients receive the right dose; trains don't collide; crews are never on energized track.
- A **specification** is a property of the _machine's interface_: the outputs it produces in response to inputs.
- **Domain assumptions** are properties of the world the machine relies on but doesn't control: sensors work, people follow procedures, wheels spin when the plane is on the ground.
Code can satisfy its specification perfectly while the system fails, because a domain assumption was false. Validation means checking R, D, and S, not just S.

> **The London Underground.** Jackson's first system scheduled engineering crews who traveled by rail at night. The requirement (no crew on an energized track; no crane hitting a crew on the adjacent track) is about the world. The software only controls schedules and permissions. Everything else is domain knowledge.

## Domain modeling

A **domain model** describes the concepts, relationships, and events of the problem domain, independent of how the software will store or compute them.

1. Identify the **entities** and **relationships**: Crew, Track section, Power section, Job; a job is assigned to a crew and occupies sections.

2. Identify **events** and their order: crew dispatched, power isolated, work started, work ended, power restored.

3. State the **constraints**: a section can't be energized while occupied.

4. Agree on a **ubiquitous language** (Evans): the same words in conversation, documents, and code.

The software then keeps a model of the world "in its innards" (Jackson), updated by inputs and queried for outputs.

> **A lineage often forgotten.** JSD (Michael Jackson, 1983) → Dines Bjørner's domain engineering → OMT and object-oriented analysis → Domain-Driven Design (Evans, 2003). Jackson: "People seem to have forgotten where all those ideas actually came from."

## Conceptual models: Norman's three models

```
Designer's model --built into--> System image --interpreted as--> User's model
```

From Donald Norman's _The Design of Everyday Things_ (1988; revised 2013). Norman's vocabulary for usability: **affordances** and **signifiers** (what actions are possible, and how you can tell), **mapping** (controls laid out like their effects), **feedback**, and the **gulfs of execution and evaluation** (how hard it is to act, and to tell what happened).

## Concept design, worked: Upvote

In _The Essence of Software_, each concept has a **name**, a **purpose**, **state**, **actions**, and an **operational principle**:

`concept Upvote [Item, User]`

`purpose  rank items by popularity`

`state    votes: User -> set Item`

`actions  upvote(u, i); unvote(u, i); count(i) : Int`

`principle after upvote(u, i), count(i) is one more, until unvote(u, i)`

Note what's absent: Upvote doesn't know what an Item _is_ (a post, a comment, an answer) or how users log in. Those are other concepts (Post, Session), connected by **synchronizations**, such as "when a Post is deleted, remove its upvotes."

> **Design questions it raises.** Can a user upvote their own post? Can they upvote twice? Do upvotes from new accounts count? Each choice is a decision about **purpose**: ranking by popularity, or by quality?

The relational state `User -> set Item` raises the multiplicity questions immediately.

## Criteria for good concepts

- **Purposeful**: every concept has a compelling purpose users can understand.
- **Specific**: one purpose per concept, and one concept per purpose. A concept serving two purposes (Gmail's labels doing the work of folders and of tags) forces compromises. Two concepts for one purpose confuse users.
- **Independent**: each concept can be understood, specified, and implemented on its own. Coupling lives only in synchronizations.
- **Familiar and reusable**: Trash, Reservation, Session, Upvote recur across applications. Reuse their best designs (Jackson's critique of greenfield methods).
- **Integrity**: synchronizations must not break a concept's operational principle. For example, if emptying Trash happens automatically in a way users can't predict, Trash no longer guarantees "you can restore until you empty it."

> **Trash's operational principle.** "If you delete an item, you can restore it from the trash, until you empty the trash."

A one-sentence scenario like this is how a user learns a concept. It's also a testable property.

---

# Specifying precisely

*Lightweight formal methods: analysis without proof*

## Why specify formally?

Natural-language specifications are ambiguous and can't be checked mechanically. A **formal specification** states behavior in logic, so that:

- ambiguity and contradiction become visible;
- tools can **analyze** the design before any code exists, finding flaws when they're cheapest to fix;
- the spec can serve as an **oracle** for testing, runtime verification (Ch. 9 primer), or LLM generation (Beck, Ch. 11);
- it gives a second, independent **view** of the system (Shaw, Ch. 10: "each of them is revealing some of the flaws in our thinking").
The traditional objection was cost: writing proofs by hand is slow and requires rare expertise. **Lightweight formal methods** lower that cost by giving up completeness: partial specs, automatic bounded analysis, no proofs.

> **Jackson on LLMs.** "The code is easy to produce... so it's only the documentation that matters, because the documentation is your specification, which we now call prompts."

If that's right, the skill of writing precise specifications becomes more valuable, not less.

## Alloy, worked: can two users share a name?

`sig Name {}`

`sig User { name: one Name }`

`assert UniqueNames { all disj u1, u2: User | u1.name != u2.name }`

`check UniqueNames for 5`

The Alloy Analyzer searches every instance with up to 5 users and 5 names, and returns a **counterexample**: two users with the same name. Nothing in the model prevents it. You then decide: is that acceptable? If not, add a constraint:

`fact { all disj u1, u2: User | u1.name != u2.name }`

The analyzer now finds no counterexample within the scope. Writing the constraint forces the design decision into the open.

> **The small scope hypothesis.** Most design flaws can be exhibited by small examples. Alloy checks _every_ case up to a bound, using a SAT solver, so within the bound it is exhaustive, unlike testing.

This is Jackson's username example from the interview, made executable.

## Lightweight formal methods in industry

- **Alloy** has been used to find flaws in published designs. Pamela Zave's analysis of the Chord peer-to-peer protocol (2012) showed that its ring-maintenance algorithm, as published, was not correct.
- **TLA+** (Leslie Lamport) at Amazon Web Services: engineers specified DynamoDB, S3, and other systems and found subtle bugs that testing had missed, some needing 35 steps to reproduce (Newcombe et al., CACM 2015).
- AWS later applied lightweight methods (executable reference models and property-based testing) to S3's storage node software, ShardStore (Bornholt et al., SOSP 2021).
- Microsoft's **P** language is used to model and test distributed protocols in Azure and Windows.
Common pattern: specify the **design** or the **protocol**, not every line of code. Check it automatically. Keep the spec maintained alongside the system.

> **Hoodlet and Yang.** Yang (Ch. 7) mentions Amazon verifying its hypervisor. Hoodlet (Ch. 8) and Schneider (Ch. 9) both expect AI-generated code to increase the demand for assurance. Jackson: "not only a testing renaissance, but a verification renaissance too."

## The formal methods spectrum

**Lightweight**

- **Alloy** (SAT-based, within a bounded scope), property-based tests (random or generated inputs) against reference models.
- Bounded or sampled analysis; no proofs.
- Hours to days to learn; best for designs and protocols.
- Finds bugs; can't show absence of all bugs.

**Model checking**

- **Spin** (Holzmann, Ch. 4), **TLA+** with TLC, NuSMV.
- Explores every reachable state of a finite model.
- Temporal properties: safety and liveness (Ch. 9 primer).
- Limit: state explosion (Ch. 1 primer).

**Bounded checking**

- **CBMC** (Clarke, Kroening, Lerda, 2004); **Kani** for Rust, built on it.
- Checks the real C code, not a model, for all inputs, with loops unrolled to a bound.
- Unwinding assertions confirm the bound is enough; then the check is a proof for that code.
- No invariants to write. AWS ran it in CI on its C libraries (Chong et al., ICSE SEIP 2020).

**Full verification**

- **Dafny**, **Lean**, **Rocq** (Coq), **Isabelle**, F*.
- Machine-checked proofs for all inputs, relative to the spec and its assumptions (compiler, hardware, environment).
- Landmarks: seL4 kernel, CompCert compiler.
- Cost: expertise and proof maintenance (Beck, Ch. 11), now eased by LLMs.

---

# A history of formal specification

*From hand proofs to push-button analysis*

## Formal specification, 1969–1998

- **1969** — Hoare logic: assertions about programs
- **1970s** — VDM: IBM Vienna; Cliff Jones
- **1975–77** — Algebraic specification: Guttag; Liskov & Zilles
- **Early 1980s** — Z: Abrial; Oxford
- **1985** — CSP book: Hoare: traces of events
- **1992** — Z for IBM CICS: Queen's Award
- **1998** — B method: Paris Métro Line 14, driverless

## Formal specification, 1999–today

- **1999–2002** — TLA+: Lamport's Specifying Systems
- **2002** — Alloy Analyzer: relational, SAT-based
- **2006** — Software Abstractions: Jackson
- **2009** — seL4: verified OS kernel
- **2015** — TLA+ at Amazon: CACM report
- **2021** — Alloy 6: mutable state, temporal logic
- **2020s** — LLMs + provers: Lean, Dafny, invariants

## Lessons from the history

- **Tools decided adoption.** Z and VDM specs were written and reviewed by hand. Alloy, TLA+ (with TLC), and model checkers gave immediate, automatic feedback, and engineers used them.
- **Partial beats perfect.** Specifying the riskiest design or protocol, and checking it within bounds, delivers most of the value at a fraction of the cost.
- **Stakes concentrate success.** Railways (B), avionics, kernels, and cloud infrastructure adopted formal methods where failures are expensive (Shaw's consequence-vs.-oversight chart, Ch. 10).
- **Relations and states recur.** Z, Alloy, and TLA+ all describe state with sets and relations, and behavior as transitions or traces (Hoare's CSP).
- **The bottleneck is shifting.** With LLMs writing code, proofs, and invariants, the scarce skill is deciding _what_ should be true: specification and design.

> **In the book.** **Ball** (Ch. 1): tools engineers actually use.
**Liskov** (Ch. 3): specifications of data abstractions.
**Holzmann** (Ch. 4): Spin and LTL.
**Schneider** (Ch. 9): assertional reasoning.
**Shaw** (Ch. 10): the spec as a second view.
**Jackson** (Ch. 12): relations, concepts, and Alloy.

## Check yourself before reading Chapter 12

1. Explain D, S ⊢ R with your own example. What went wrong in the Warsaw A320 accident, in these terms?
2. Describe Norman's designer's model, system image, and user's model. Where do usability problems come from?
3. Write a concept (name, purpose, state, actions, operational principle) for Reservation or Trash.
4. What does Alloy's analyzer do with `check ... for 5`, and why is that different from running five tests?
5. Place Alloy, Spin, and Dafny on the formal methods spectrum, with one strength and one limitation each.

## Further reading

- D. Jackson, The Essence of Software, Princeton University Press, 2021.
- D. Jackson, Software Abstractions (revised ed.), MIT Press, 2012; alloytools.org.
- P. Zave and M. Jackson, "Four Dark Corners of Requirements Engineering," ACM TOSEM, 1997.
- M. Jackson, Software Requirements and Specifications: A Lexicon of Practice, Principles and Prejudices, Addison-Wesley, 1995.
- D. Norman, The Design of Everyday Things (revised ed.), Basic Books, 2013.
- E. Evans, Domain-Driven Design, Addison-Wesley, 2003.
- C. Newcombe et al., "How Amazon Web Services Uses Formal Methods," CACM, 2015.
- N. Chong et al., "Code-Level Model Checking in the Software Development Workflow," ICSE-SEIP, 2020.
- E. Clarke, D. Kroening, F. Lerda, "A Tool for Checking ANSI-C Programs," TACAS, 2004.
- P. Zave, "Using Lightweight Modeling to Understand Chord," ACM SIGCOMM CCR, 2012.
- L. Lamport, Specifying Systems, Addison-Wesley, 2002 (free online).
- J. Woodcock, P. G. Larsen, J. Bicarregui, J. Fitzgerald, "Formal Methods: Practice and Experience," ACM Computing Surveys, 2009.
