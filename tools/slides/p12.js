// Primer for Chapter 12 (Jackson): software design and specification; history of formal specification
const wm = {
  boxes: [
    { id: "w", x: 0.6, y: 1.5, w: 6.6, h: 3.9, text: "", style: "ghost" },
    { id: "wl", x: 0.8, y: 1.55, w: 4, h: 0.45, text: "The world (problem domain)", style: "note", fs: 14, align: "left" },
    { id: "r", x: 0.9, y: 2.2, w: 3.5, h: 1.25, text: "**R: Requirement**\nreverse thrust only when the plane is on the runway", style: "accent", fs: 13 },
    { id: "d", x: 0.9, y: 3.7, w: 3.5, h: 1.35, text: "**D: Domain assumption**\nwheels turning ⇔ plane on the runway", style: "gold", fs: 13 },
    { id: "m", x: 7.6, y: 1.5, w: 5.1, h: 3.9, text: "", style: "ghost" },
    { id: "ml", x: 9.0, y: 1.55, w: 3.6, h: 0.45, text: "The machine (software)", style: "note", fs: 14, align: "right" },
    { id: "s", x: 9.0, y: 2.7, w: 3.5, h: 1.4, text: "**S: Specification**\nenable reversers only when wheel sensors report turning", style: "primary", fs: 13 },
    { id: "sp", x: 5.2, y: 2.6, w: 3.4, h: 1.6, text: "**Shared phenomena**\nwheel-sensor signals; thrust-reverser commands", style: "light", fs: 13 },
  ],
  arrows: [
    { from: "s", to: "sp", label: "" },
    { from: "sp", to: "r", fromSide: "l", toSide: "r", via: [[4.8, 3.4], [4.8, 2.825]] },
  ],
};

const norman = {
  boxes: [
    { id: "dm", x: 0.6, y: 2.2, w: 3.3, h: 1.4, text: "**Designer's model**\nwhat the designer intends", style: "primary", fs: 14 },
    { id: "si", x: 5.0, y: 2.2, w: 3.3, h: 1.4, text: "**System image**\nthe interface, behavior, docs: all the user sees", style: "gold", fs: 14 },
    { id: "um", x: 9.4, y: 2.2, w: 3.3, h: 1.4, text: "**User's model**\nwhat the user believes", style: "teal", fs: 14 },
    { id: "n", x: 0.6, y: 4.2, w: 12.1, h: 1.2, text: "The designer and user never talk directly. If the system image doesn't convey the designer's model, users form their own, often wrong. Jackson's claim: the designer's model is a set of **concepts**, so design them deliberately.", style: "ghost", fs: 14, align: "left" },
  ],
  arrows: [
    { from: "dm", to: "si", label: "built into" },
    { from: "si", to: "um", label: "interpreted as" },
  ],
};

module.exports = {
  num: 12, name: "Jackson",
  title: "Software Design and Specification",
  subtitle: "Problems and machines, domain models, conceptual models, concept design, relational modeling, and lightweight formal methods, plus a history of formal specification",
  covers: [
    "**Main topic: designing what software does, and saying it precisely.** The world and the machine; requirements, specifications, and domain assumptions; domain modeling; conceptual models and usability; concept design worked through; why and how to specify formally; relational modeling with Alloy; lightweight formal methods in industry; the spectrum from bounded checking to full proof.",
    "**Shorter topic: a history of formal specification.** From Hoare and VDM through Z, CSP, and B to Alloy and TLA+, and what made some methods succeed in practice.",
  ],
  why: "Jackson's interview moves between design (concepts, Lightroom, delight) and specification (relations, Alloy, prompts as specifications), and treats them as one subject. It also draws on his father's ideas about problems in the world. This primer gives the background for both halves, and works as a capstone for the design thread that runs through the book: modules (Ch. 3), architecture (Ch. 10), and now the concepts users actually see.",
  slides: [
    { type: "section", kicker: "PART 1", title: "Designing what software does", subtitle: "Most of the difficulty is in the problem, not the code" },
    {
      type: "text", title: "Three levels of software design",
      body: [
        "\"Design\" covers decisions at several levels, each with its own concerns and methods:",
        "- **Concept and user-experience design**: what the software _does_ from the user's point of view: its concepts, behaviors, and interactions. (This primer.)",
        "- **Architecture**: the large-scale structure of components and connectors that achieves the quality attributes. (Chapter 10 primer.)",
        "- **Module and code design**: interfaces, data abstraction, information hiding, coupling and cohesion. (Chapter 3 primer.)",
        "Decisions at the top constrain everything below. A confusing concept can't be fixed by clean code, and a good concept can be hidden by a poor interface.",
      ],
      callout: { label: "Jackson's three stages", text: "For software that delights:\n**1.** Interaction design: the minute-by-minute experience.\n**2.** Concept design: does the structure match users' purposes?\n**3.** Second-order effects: how the software shapes behavior.\n\n\"Concept design plays a role in all of them, because they all require a semantics.\"" },
    },
    { type: "diagram", title: "The world and the machine", ...wm, caption: "Michael Jackson and Pamela Zave's framework: the software must satisfy a **specification S** at the interface with the world, so that, given the **domain assumptions D**, the **requirement R** holds: **D, S ⊢ R**. In the 1993 Warsaw A320 accident, the plane hydroplaned on landing, the wheels didn't spin up, and the spoilers and thrust reversers deployed late: the domain assumption failed. (Compare Shaw's cruise-control sensor proxy, Ch. 10.)", mdDiagram: "World: R (reverse thrust only on the runway), D (wheels turning ⇔ on runway)\n   ⇅ shared phenomena (sensor signals, reverser commands)\nMachine: S (enable reversers only when wheel sensors report turning)\n\nIf the machine satisfies S and the world satisfies D, then R holds: D, S ⊢ R" },
    {
      type: "text", title: "Requirements, specifications, and assumptions",
      body: [
        "Separating the three catches a class of errors that testing the code alone never will:",
        "- A **requirement** is a desired property of the _world_: patients receive the right dose; trains don't collide; crews are never on energized track.",
        "- A **specification** is a property of the _machine's interface_: the outputs it produces in response to inputs.",
        "- **Domain assumptions** are properties of the world the machine relies on but doesn't control: sensors work, people follow procedures, wheels spin when the plane is on the ground.",
        "Code can satisfy its specification perfectly while the system fails, because a domain assumption was false. Validation means checking R, D, and S, not just S.",
      ],
      callout: { label: "The London Underground", text: "Jackson's first system scheduled engineering crews who traveled by rail at night. The requirement (no crew on an energized track; no crane hitting a crew on the adjacent track) is about the world. The software only controls schedules and permissions. Everything else is domain knowledge." },
    },
    {
      type: "text", title: "Domain modeling",
      body: [
        "A **domain model** describes the concepts, relationships, and events of the problem domain, independent of how the software will store or compute them.",
        "1. Identify the **entities** and **relationships**: Crew, Track section, Power section, Job; a job is assigned to a crew and occupies sections.",
        "2. Identify **events** and their order: crew dispatched, power isolated, work started, work ended, power restored.",
        "3. State the **constraints**: a section can't be energized while occupied.",
        "4. Agree on a **ubiquitous language** (Evans): the same words in conversation, documents, and code.",
        "The software then keeps a model of the world \"in its innards\" (Jackson), updated by inputs and queried for outputs.",
      ],
      callout: { label: "A lineage often forgotten", text: "JSD (Michael Jackson, 1983) → Dines Bjørner's domain engineering → OMT and object-oriented analysis → Domain-Driven Design (Evans, 2003). Jackson: \"People seem to have forgotten where all those ideas actually came from.\"" },
    },
    { type: "diagram", title: "Conceptual models: Norman's three models", ...norman, caption: "From Donald Norman's _The Design of Everyday Things_ (1988; revised 2013). Norman's vocabulary for usability: **affordances** and **signifiers** (what actions are possible, and how you can tell), **mapping** (controls laid out like their effects), **feedback**, and the **gulfs of execution and evaluation** (how hard it is to act, and to tell what happened).", mdDiagram: "Designer's model --built into--> System image --interpreted as--> User's model" },
    {
      type: "text", title: "Concept design, worked: Upvote",
      body: [
        "In _The Essence of Software_, each concept has a **name**, a **purpose**, **state**, **actions**, and an **operational principle**:",
        "`concept Upvote [Item, User]`",
        "`purpose  rank items by popularity`",
        "`state    votes: User -> set Item`",
        "`actions  upvote(u, i); unvote(u, i); count(i) : Int`",
        "`principle after upvote(u, i), count(i) is one more, until unvote(u, i)`",
        "Note what's absent: Upvote doesn't know what an Item _is_ (a post, a comment, an answer) or how users log in. Those are other concepts (Post, Session), connected by **synchronizations**, such as \"when a Post is deleted, remove its upvotes.\"",
      ],
      callout: { label: "Design questions it raises", text: "Can a user upvote their own post? Can they upvote twice? Do upvotes from new accounts count? Each choice is a decision about **purpose**: ranking by popularity, or by quality?\n\nThe relational state `User -> set Item` raises the multiplicity questions immediately." },
    },
    {
      type: "text", title: "Criteria for good concepts",
      body: [
        "- **Purposeful**: every concept has a compelling purpose users can understand.",
        "- **Specific**: one purpose per concept, and one concept per purpose. A concept serving two purposes (Gmail's labels doing the work of folders and of tags) forces compromises. Two concepts for one purpose confuse users.",
        "- **Independent**: each concept can be understood, specified, and implemented on its own. Coupling lives only in synchronizations.",
        "- **Familiar and reusable**: Trash, Reservation, Session, Upvote recur across applications. Reuse their best designs (Jackson's critique of greenfield methods).",
        "- **Integrity**: synchronizations must not break a concept's operational principle. For example, if emptying Trash happens automatically in a way users can't predict, Trash no longer guarantees \"you can restore until you empty it.\"",
      ],
      callout: { label: "Trash's operational principle", text: "\"If you delete an item, you can restore it from the trash, until you empty the trash.\"\n\nA one-sentence scenario like this is how a user learns a concept. It's also a testable property." },
    },
    { type: "section", kicker: "PART 1, CONTINUED", title: "Specifying precisely", subtitle: "Lightweight formal methods: analysis without proof" },
    {
      type: "text", title: "Why specify formally?",
      body: [
        "Natural-language specifications are ambiguous and can't be checked mechanically. A **formal specification** states behavior in logic, so that:",
        "- ambiguity and contradiction become visible;",
        "- tools can **analyze** the design before any code exists, finding flaws when they're cheapest to fix;",
        "- the spec can serve as an **oracle** for testing, runtime verification (Ch. 9 primer), or LLM generation (Beck, Ch. 11);",
        "- it gives a second, independent **view** of the system (Shaw, Ch. 10: \"each of them is revealing some of the flaws in our thinking\").",
        "The traditional objection was cost: writing proofs by hand is slow and requires rare expertise. **Lightweight formal methods** lower that cost by giving up completeness: partial specs, automatic bounded analysis, no proofs.",
      ],
      callout: { label: "Jackson on LLMs", text: "\"The code is easy to produce... so it's only the documentation that matters, because the documentation is your specification, which we now call prompts.\"\n\nIf that's right, the skill of writing precise specifications becomes more valuable, not less." },
    },
    {
      type: "text", title: "Alloy, worked: can two users share a name?",
      body: [
        "`sig Name {}`",
        "`sig User { name: one Name }`",
        "`assert UniqueNames { all disj u1, u2: User | u1.name != u2.name }`",
        "`check UniqueNames for 5`",
        "The Alloy Analyzer searches every instance with up to 5 users and 5 names, and returns a **counterexample**: two users with the same name. Nothing in the model prevents it. You then decide: is that acceptable? If not, add a constraint:",
        "`fact { all disj u1, u2: User | u1.name != u2.name }`",
        "The analyzer now finds no counterexample within the scope. Writing the constraint forces the design decision into the open.",
      ],
      callout: { label: "The small scope hypothesis", text: "Most design flaws can be exhibited by small examples. Alloy checks _every_ case up to a bound, using a SAT solver, so within the bound it is exhaustive, unlike testing.\n\nThis is Jackson's username example from the interview, made executable." },
    },
    {
      type: "text", title: "Lightweight formal methods in industry",
      body: [
        "- **Alloy** has been used to find flaws in published designs. Pamela Zave's analysis of the Chord peer-to-peer protocol (2012) showed that its ring-maintenance algorithm, as published, was not correct.",
        "- **TLA+** (Leslie Lamport) at Amazon Web Services: engineers specified DynamoDB, S3, and other systems and found subtle bugs that testing had missed, some needing 35 steps to reproduce (Newcombe et al., CACM 2015).",
        "- AWS later applied lightweight methods (executable reference models and property-based testing) to S3's storage node software, ShardStore (Bornholt et al., SOSP 2021).",
        "- Microsoft's **P** language is used to model and test distributed protocols in Azure and Windows.",
        "Common pattern: specify the **design** or the **protocol**, not every line of code. Check it automatically. Keep the spec maintained alongside the system.",
      ],
      callout: { label: "Hoodlet and Yang", text: "Yang (Ch. 7) mentions Amazon verifying its hypervisor. Hoodlet (Ch. 8) and Schneider (Ch. 9) both expect AI-generated code to increase the demand for assurance. Jackson: \"not only a testing renaissance, but a verification renaissance too.\"" },
    },
    {
      type: "compare", title: "The formal methods spectrum",
      cols: [
        { head: "Lightweight", items: ["**Alloy**, **TLA+** with the TLC model checker, property-based tests against reference models.", "Bounded or sampled analysis; no proofs.", "Hours to days to learn; best for designs and protocols.", "Finds bugs; can't show absence of all bugs."] },
        { head: "Model checking", items: ["**Spin** (Holzmann, Ch. 4), TLC, NuSMV, CBMC.", "Exhaustive over a finite model.", "Temporal properties: safety and liveness (Ch. 9 primer).", "Limit: state explosion (Ch. 1 primer)."] },
        { head: "Full verification", items: ["**Dafny**, **Lean**, **Rocq** (Coq), **Isabelle**, F*.", "Machine-checked proofs for all inputs.", "Landmarks: seL4 kernel, CompCert compiler.", "Cost: expertise and proof maintenance (Beck, Ch. 11), now eased by LLMs."] },
      ],
    },
    { type: "section", kicker: "PART 2", title: "A history of formal specification", subtitle: "From hand proofs to push-button analysis" },
    {
      type: "timeline", title: "Formal specification, 1969–1998",
      events: [["1969", "Hoare logic", "assertions about programs"], ["1970s", "VDM", "IBM Vienna; Cliff Jones"], ["1975–77", "Algebraic specification", "Guttag; Liskov & Zilles"], ["Early 1980s", "Z", "Abrial; Oxford"], ["1985", "CSP book", "Hoare: traces of events", true], ["1992", "Z for IBM CICS", "Queen's Award"], ["1998", "B method", "Paris Métro Line 14, driverless", true]],
    },
    {
      type: "timeline", title: "Formal specification, 1999–today",
      events: [["1999–2002", "TLA+", "Lamport's Specifying Systems"], ["2002", "Alloy Analyzer", "relational, SAT-based", true], ["2006", "Software Abstractions", "Jackson"], ["2009", "seL4", "verified OS kernel"], ["2015", "TLA+ at Amazon", "CACM report"], ["2021", "Alloy 6", "mutable state, temporal logic"], ["2020s", "LLMs + provers", "Lean, Dafny, invariants"]],
    },
    {
      type: "text", title: "Lessons from the history",
      body: [
        "- **Tools decided adoption.** Z and VDM specs were written and reviewed by hand. Alloy, TLA+ (with TLC), and model checkers gave immediate, automatic feedback, and engineers used them.",
        "- **Partial beats perfect.** Specifying the riskiest design or protocol, and checking it within bounds, delivers most of the value at a fraction of the cost.",
        "- **Stakes concentrate success.** Railways (B), avionics, kernels, and cloud infrastructure adopted formal methods where failures are expensive (Shaw's consequence-vs.-oversight chart, Ch. 10).",
        "- **Relations and states recur.** Z, Alloy, and TLA+ all describe state with sets and relations, and behavior as transitions or traces (Hoare's CSP).",
        "- **The bottleneck is shifting.** With LLMs writing code, proofs, and invariants, the scarce skill is deciding _what_ should be true: specification and design.",
      ],
      callout: { label: "In the book", text: "**Ball** (Ch. 1): tools engineers actually use.\n**Liskov** (Ch. 3): specifications of data abstractions.\n**Holzmann** (Ch. 4): Spin and LTL.\n**Schneider** (Ch. 9): assertional reasoning.\n**Shaw** (Ch. 10): the spec as a second view.\n**Jackson** (Ch. 12): relations, concepts, and Alloy." },
    },
    {
      type: "check", title: "Check yourself before reading Chapter 12",
      questions: [
        "Explain D, S ⊢ R with your own example. What went wrong in the Warsaw A320 accident, in these terms?",
        "Describe Norman's designer's model, system image, and user's model. Where do usability problems come from?",
        "Write a concept (name, purpose, state, actions, operational principle) for Reservation or Trash.",
        "What does Alloy's analyzer do with `check ... for 5`, and why is that different from running five tests?",
        "Place Alloy, Spin, and Dafny on the formal methods spectrum, with one strength and one limitation each.",
      ],
    },
    {
      type: "reading", title: "Further reading",
      items: [
        "D. Jackson, The Essence of Software, Princeton University Press, 2021.",
        "D. Jackson, Software Abstractions (revised ed.), MIT Press, 2012; alloytools.org.",
        "P. Zave and M. Jackson, \"Four Dark Corners of Requirements Engineering,\" ACM TOSEM, 1997.",
        "M. Jackson, Software Requirements and Specifications: A Lexicon of Practice, Principles and Prejudices, Addison-Wesley, 1995.",
        "D. Norman, The Design of Everyday Things (revised ed.), Basic Books, 2013.",
        "E. Evans, Domain-Driven Design, Addison-Wesley, 2003.",
        "C. Newcombe et al., \"How Amazon Web Services Uses Formal Methods,\" CACM, 2015.",
        "P. Zave, \"Using Lightweight Modeling to Understand Chord,\" ACM SIGCOMM CCR, 2012.",
        "L. Lamport, Specifying Systems, Addison-Wesley, 2002 (free online).",
        "J. Woodcock, P. G. Larsen, J. Bicarregui, J. Fitzgerald, \"Formal Methods: Practice and Experience,\" ACM Computing Surveys, 2009.",
      ],
    },
  ],
};
