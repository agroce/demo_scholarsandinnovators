// Primer for Chapter 2 (Krishnamurthi): process models; PL <-> SE
const stair = (labels, x0, y0, w, h, dx, dy, feedback) => {
  const boxes = labels.map((t, i) => ({ id: "s" + i, x: x0 + i * dx, y: y0 + i * dy, w, h, text: t, style: i === labels.length - 1 ? "primary" : "light", fs: 13 }));
  const arrows = [];
  for (let i = 0; i < labels.length - 1; i++) {
    const a = boxes[i], b = boxes[i + 1];
    arrows.push({ from: a.id, to: b.id, fromSide: "r", toSide: "t", via: [[b.x + w / 2, a.y + h / 2]] });
    if (feedback) arrows.push({ from: b.id, to: a.id, fromSide: "l", toSide: "b", via: [[a.x + w / 2, b.y + h / 2]], dashed: true, color: "verm" });
  }
  return { boxes, arrows };
};
const roy = ["System requirements", "Software requirements", "Analysis", "Program design", "Coding", "Testing", "Operations"];
const fig2 = stair(roy, 0.6, 1.5, 2.3, 0.6, 1.6, 0.62, false);
const fig3 = stair(roy, 0.6, 1.5, 1.9, 0.6, 1.25, 0.62, true);
fig3.boxes.push(
  { id: "n0", x: 10.25, y: 1.5, w: 2.45, h: 0.4, text: "Royce's five fixes:", style: "note", align: "left", fs: 14 },
  { id: "n1", x: 10.25, y: 1.95, w: 2.45, h: 0.6, text: "1. Program design comes first", style: "ghost", fs: 12, align: "left" },
  { id: "n2", x: 10.25, y: 2.65, w: 2.45, h: 0.6, text: "2. Document the design", style: "ghost", fs: 12, align: "left" },
  { id: "n3", x: 10.25, y: 3.35, w: 2.45, h: 0.6, text: "3. Do it twice (pilot model)", style: "accent", fs: 12, align: "left" },
  { id: "n4", x: 10.25, y: 4.05, w: 2.45, h: 0.6, text: "4. Plan, control and monitor testing", style: "ghost", fs: 12, align: "left" },
  { id: "n5", x: 10.25, y: 4.75, w: 2.45, h: 0.6, text: "5. Involve the customer", style: "accent", fs: 12, align: "left" },
);

const V = (() => {
  const w = 2.6, h = 0.62;
  const L = ["Requirements", "System design", "Architecture design", "Module design"];
  const R = ["Acceptance testing", "System testing", "Integration testing", "Unit testing"];
  const boxes = [], arrows = [];
  L.forEach((t, i) => boxes.push({ id: "L" + i, x: 0.8 + i * 0.75, y: 1.45 + i * 0.95, w, h, text: t, style: "light", fs: 13 }));
  R.forEach((t, i) => boxes.push({ id: "R" + i, x: 13.333 - 0.8 - w - i * 0.75, y: 1.45 + i * 0.95, w, h, text: t, style: "teal", fs: 13 }));
  boxes.push({ id: "C", x: (13.333 - w) / 2, y: 5.25, w, h, text: "Coding", style: "primary", fs: 14 });
  for (let i = 0; i < 3; i++) { arrows.push({ from: "L" + i, to: "L" + (i + 1), fromSide: "b", toSide: "t" }); arrows.push({ from: "R" + (i + 1), to: "R" + i, fromSide: "t", toSide: "b" }); }
  arrows.push({ from: "L3", to: "C", fromSide: "b", toSide: "l" }, { from: "C", to: "R3", fromSide: "r", toSide: "b" });
  for (let i = 0; i < 4; i++) arrows.push({ from: "L" + i, to: "R" + i, fromSide: "r", toSide: "l", dashed: true, head: false, label: i === 0 ? "test cases planned from this level" : "" });
  return { boxes, arrows };
})();

module.exports = {
  num: 2, name: "Krishnamurthi",
  title: "Software Process Models",
  subtitle: "From SAGE and Royce to Agile and DevOps, plus how programming languages absorb software engineering",
  covers: [
    "**Part 1: Process models.** What a process model is; the 1950s SAGE project; what Royce's 1970 paper actually said (it was _not_ a recommendation of the pure waterfall); how \"waterfall\" became doctrine; the V-model and the spiral; iterative and incremental development; the Agile Manifesto; XP, Scrum, Kanban; DevOps and continuous delivery; choosing between plan-driven and agile.",
    "**Part 2: Programming languages and SE.** How recurring software engineering problems (control flow, modularity, data hiding, memory errors, concurrency, scale) were repeatedly \"solved\" by moving them into language design.",
  ],
  why: "Krishnamurthi describes teaching the waterfall model _backwards_: students derive it from 1955 constraints and come to respect it. To appreciate that move, and to judge the very different accounts of the waterfall from Zeller, Kernighan, and Holzmann later in the book, you need the real history. Krishnamurthi is also a programming-languages researcher. His claims that \"your favorite language is just the 17th one\" and that PL is \"the material science of computer science\" make most sense if you know how SE and PL ideas have traded places.",
  slides: [
    { type: "section", kicker: "PART 1", title: "Software process models", subtitle: "Who decides what to build, in what order, and when to find out you were wrong?" },
    {
      type: "text", title: "What is a software process model?",
      body: [
        "Every software project performs the same core **activities**: understanding requirements, designing, constructing (coding), verifying and validating, deploying, and maintaining. A **process model** says how those activities are _ordered_, _overlapped_, and _repeated_, and who makes decisions along the way.",
        "- **Code-and-fix**: no model at all. Write code, fix what breaks. Fine for a weekend script, disastrous at scale.",
        "- **Plan-driven** (sequential) models: finish and approve each activity before the next starts.",
        "- **Iterative and incremental** models: repeat all activities in short cycles, delivering growing slices of the system.",
        "The central variable is the **cost of change**. If changing a decision late is very expensive (punched cards, hardware, fixed-price contracts, spacecraft), you plan ahead. If change is cheap (interactive tools, automated tests, continuous deployment), you iterate.",
      ],
      callout: { label: "Three questions to ask of any process", text: "**1.** When are requirements considered fixed?\n**2.** How often does working software reach a real user?\n**3.** Where in the process is risk identified, and who pays when it's found late?" },
      notes: "Process models are descriptions, and often idealizations, of how work is organized. Real projects mix models. A useful way to compare them is to ask what each assumes about the cost of change and the stability of requirements. Krishnamurthi's 1955 exercise works because it fixes those assumptions: punched cards, assembly language, and a customer (the military) who wants a system defined up front.",
    },
    {
      type: "text", title: "The 1950s: SAGE and the first \"lifecycle\"",
      body: [
        "The first very large software project was **SAGE** (Semi-Automatic Ground Environment), the U.S. air-defense system of the 1950s, with hundreds of thousands of instructions written by hundreds of programmers.",
        "In 1956 **Herbert Benington** described how SAGE software was produced as a sequence of phases: operational plan, specifications, coding, parameter testing, assembly testing, shakedown, and system evaluation. It is essentially a waterfall, 14 years before Royce.",
        "When the paper was republished in 1983, Benington added a foreword saying the description was misleading. SAGE had in fact started by building an **experimental prototype**, and he would not recommend a strictly top-down sequential process.",
      ],
      callout: { label: "Connection to Chapter 2", text: "Krishnamurthi asks students to imagine being \"a 1955 software developer\" building \"a defense system.\" That is almost exactly SAGE. The real SAGE developers already knew they needed a prototype." },
      notes: "Source: H. D. Benington, \"Production of Large Computer Programs,\" 1956 symposium; reprinted in IEEE Annals of the History of Computing, 1983, with a new foreword. Larman and Basili's 2003 history of iterative development discusses the foreword.",
    },
    { type: "diagram", title: "The diagram everyone remembers", ...fig2, caption: "This is (roughly) Figure 2 of Winston Royce's 1970 paper \"Managing the Development of Large Software Systems.\" It is the image reproduced in countless textbooks as \"the waterfall model.\" Royce did not use the word \"waterfall,\" and he did not recommend this picture.", mdDiagram: "System requirements → Software requirements → Analysis → Program design → Coding → Testing → Operations", notes: "Royce worked on spacecraft mission software at TRW. The paper presents this sequential figure only to criticize it on the next page." },
    { type: "quote", title: "Royce's very next sentence", quote: "I believe in this concept, but the implementation described above is risky and invites failure.", by: "Winston W. Royce, 1970", context: "Royce's concern: testing comes at the end, so if testing reveals a design flaw, \"the required design changes are likely to be so disruptive that the software requirements upon which the design is based... are violated,\" and the project may go back to the beginning, with \"up to a 100-percent overrun in schedule and/or costs.\"", notes: "The full paper is short (11 pages) and very readable. It's worth assigning: students are usually surprised that the 'father of the waterfall' spends most of the paper arguing for iteration, prototyping, and customer involvement." },
    { type: "diagram", title: "What Royce actually proposed", ...fig3, caption: "Royce's later figures add **feedback between adjacent steps** (dashed) and, more radically, a complete **pilot model built first** (\"do it twice\"), heavy documentation, careful test planning, and formal **customer involvement** at several points. Several of these (prototype first, involve the customer) became central ideas of iterative and agile methods decades later.", mdDiagram: "Same staircase, but each step can feed back to the previous one:\nSystem req ⇄ Software req ⇄ Analysis ⇄ Program design ⇄ Coding ⇄ Testing ⇄ Operations\n\nRoyce's five fixes: (1) program design comes first; (2) document the design; (3) do it twice; (4) plan, control and monitor testing; (5) involve the customer.", notes: "Royce did warn that iteration is tolerable only between adjacent steps. Feedback that jumps back several steps (testing revealing a requirements flaw) is what kills projects. That is very close to Holzmann's argument (Chapter 4) about measuring how far bugs travel." },
    {
      type: "text", title: "How \"waterfall\" became doctrine anyway", fs: 15.5,
      body: [
        "- **The name** came later. T. E. Bell and T. A. Thayer used \"waterfall\" for Royce's diagram in a 1976 paper on requirements. The simplified figure, not the text, is what spread.",
        "- **Procurement made it official.** The U.S. Department of Defense standard **DOD-STD-2167** (1985) required document-driven development with formal reviews between phases. Fixed-price contracts need a fixed specification to price, and a fixed specification is what Kernighan (Chapter 6) calls a contract for \"adversarial relationships.\"",
        "- **Auditability.** Phase documents and sign-offs are easy to inspect, certify, and assign blame for. That matters in regulated and safety-critical domains.",
        "- **Hardware coupling.** When software ships with hardware (spacecraft, telephone switches), parts of the schedule really are sequential.",
        "Many organizations that were 'doing waterfall' in fact iterated informally, while documenting a waterfall. That is one reason Zeller (Chapter 5) can say the pure waterfall \"has never ever been done by anyone really.\"",
      ],
      callout: { label: "Four accounts in this book", text: "**Krishnamurthi** (Ch. 2): derive it from 1955 constraints and respect it.\n**Zeller** (Ch. 5): the pure form was never really practiced.\n**Kernighan** (Ch. 6): a contracting model for adversaries.\n**Holzmann** (Ch. 4): the phases are a frame for measuring defects scientifically." },
      notes: "DOD-STD-2167A (1988) softened some requirements, and MIL-STD-498 (1994) explicitly allowed incremental and evolutionary development. The waterfall persisted in procurement long after its technical critics had moved on.",
    },
    { type: "diagram", title: "The V-model: every design level gets a test level", ...V, caption: "The **V-model** (developed in German government and in U.S. systems engineering in the 1980s–90s) is a waterfall bent in half: each specification level on the left is verified by a test level on the right, and test cases are **planned when the specification is written**. It remains widely used in safety-critical domains: the automotive standard ISO 26262 is organized around it, and avionics practice under DO-178C follows a similar structure.", mdDiagram: "Requirements ............................ Acceptance testing\n   System design ...................... System testing\n      Architecture design ........... Integration testing\n         Module design ............ Unit testing\n                       Coding", notes: "The V-model's lasting contribution is the pairing of specification and test levels, which forces testability to be considered early. Its weakness is the same as the waterfall's: the left side is assumed complete before the right side begins." },
    {
      type: "diagram", title: "Boehm's spiral model (1986–88): let risk drive the process",
      boxes: [
        { id: "a", x: 1.6, y: 1.55, w: 4.2, h: 1.35, text: "1. Determine objectives, alternatives, and constraints", style: "light", fs: 15 },
        { id: "b", x: 7.5, y: 1.55, w: 4.2, h: 1.35, text: "2. Evaluate alternatives; **identify and resolve risks** (often by prototyping)", style: "accent", fs: 15 },
        { id: "c", x: 7.5, y: 4.25, w: 4.2, h: 1.35, text: "3. Develop and verify the next-level product", style: "light", fs: 15 },
        { id: "d", x: 1.6, y: 4.25, w: 4.2, h: 1.35, text: "4. Review, and plan the next loop", style: "light", fs: 15 },
        { id: "m", x: 5.15, y: 3.05, w: 3.0, h: 1.05, text: "Each loop: a bigger product, less remaining risk", style: "gold", shape: "oval", fs: 13 },
      ],
      arrows: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "d" }, { from: "d", to: "a" }],
      caption: "Barry Boehm's spiral model generalizes earlier models: each cycle starts by asking **what is most likely to make the project fail**, and does whatever reduces that risk (a prototype, a simulation, a formal analysis, or a waterfall-like step). The waterfall becomes a special case for low-risk, well-understood problems.",
      mdDiagram: "(1) Objectives → (2) Risk analysis / prototypes → (3) Develop & verify → (4) Plan next loop → back to (1), spiraling outward",
      notes: "B. W. Boehm, \"A Spiral Model of Software Development and Enhancement,\" ACM SIGSOFT SEN 1986; IEEE Computer 1988. Boehm also wrote Software Engineering Economics (1981), source of the famous cost-to-fix curve (see the Chapter 4 primer).",
    },
    {
      type: "text", title: "Iterative and incremental development is old, not new",
      body: [
        "Craig Larman and Victor Basili's history (2003) shows iteration long predates \"agile\":",
        "- **1950s–60s:** the X-15 hypersonic aircraft program and NASA's Project Mercury used iterative, incremental development, Mercury with very short, time-boxed iterations and test-first practices.",
        "- **1970s:** Harlan Mills and IBM's Federal Systems Division promoted incremental development, for example on Navy helicopter and Trident submarine software. Tom Gilb began advocating **Evolutionary Delivery** (Evo).",
        "- **1980s–90s:** the spiral model; **Rapid Application Development**; the **Rational Unified Process** (RUP, 1998), which kept heavyweight artifacts but organized them in iterations.",
        "**Incremental** means delivering the system in slices. **Iterative** means revisiting and refining. Most modern processes do both.",
      ],
      callout: { label: "Why this matters", text: "The common story \"everyone did waterfall until 2001, then agile was invented\" is false. The tension between planning and iterating is as old as large-scale software. What changed was the _cost of change_: cheaper machines, interactive tools, and automated tests made frequent iteration practical for ordinary teams." },
      notes: "C. Larman and V. R. Basili, \"Iterative and Incremental Development: A Brief History,\" IEEE Computer 36(6), 2003. It's short, readable, and a good companion reading for this primer.",
    },
    {
      type: "timeline", title: "Process history, part 1: plans and their critics",
      events: [["1956", "Benington: SAGE phases", "a waterfall in all but name"], ["1968", "NATO SE conference", "\"software crisis\""], ["1970", "Royce paper", "\"risky and invites failure\"", true], ["1976", "\"Waterfall\" named", "Bell & Thayer"], ["1985", "DOD-STD-2167", "document-driven, phased"], ["1986", "Spiral model", "Boehm: risk-driven"], ["1991", "SEI CMM", "process maturity levels"]],
    },
    {
      type: "timeline", title: "Process history, part 2: iteration goes mainstream",
      events: [["1986", "\"New New Product Development Game\"", "Takeuchi & Nonaka's \"rugby\" teams"], ["1995", "Scrum at OOPSLA", "Schwaber & Sutherland"], ["1998", "Rational Unified Process", "iterative, artifact-heavy"], ["1999", "Extreme Programming Explained", "Kent Beck"], ["2001", "Agile Manifesto", "17 signatories, Snowbird, Utah", true], ["2009", "\"10+ deploys per day\"", "Flickr; DevOps begins"], ["2010", "Continuous Delivery", "Humble & Farley"]],
    },
    {
      type: "quote", title: "The Agile Manifesto (2001)",
      quote: "Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan.",
      by: "Manifesto for Agile Software Development, 2001",
      context: "The manifesto adds: \"while there is value in the items on the right, we value the items on the left more.\" It is a statement of _priorities_, not a rejection of documentation or plans. Note \"customer collaboration over **contract negotiation**\": a direct answer to the procurement-driven waterfall Kernighan describes.",
      notes: "Signatories included Kent Beck, Ward Cunningham, Martin Fowler, Ken Schwaber, Jeff Sutherland, Alistair Cockburn, and others. The manifesto has twelve supporting principles, including \"deliver working software frequently,\" \"welcome changing requirements, even late in development,\" and \"at regular intervals, the team reflects on how to become more effective.\"",
    },
    {
      type: "compare", title: "Three agile families: engineering, management, flow",
      cols: [
        { head: "Extreme Programming (XP)", items: ["Kent Beck, late 1990s (Chrysler C3 project)", "**Engineering practices** taken \"to the extreme\": test-first development, pair programming, continuous integration, refactoring, small releases, an on-site customer.", "Beck is interviewed in Chapter 11; the **Chapter 11 primer** covers XP and TDD in depth."] },
        { head: "Scrum", items: ["Schwaber & Sutherland, 1995; from Takeuchi & Nonaka's \"rugby\" metaphor", "A **management framework**, silent on coding practice:", "- Fixed-length sprints (1–4 weeks)", "- Roles: Product Owner, Scrum Master, Developers", "- Product backlog, sprint backlog", "- Daily scrum, sprint review, retrospective", "The most widely adopted, and most certified, agile method."] },
        { head: "Kanban", items: ["From Toyota's production system; adapted to software by David J. Anderson (book, 2010)", "**Flow**, not iterations:", "- Visualize work on a board", "- Limit work in progress (WIP)", "- Pull new work when capacity frees up", "- Measure lead time and improve continuously", "Common in operations and maintenance teams."] },
      ],
      notes: "Teams frequently combine these: Scrum for planning cadence, XP practices for engineering, and a Kanban-style board. Kernighan's \"hype cycle\" (Chapter 6) applies: each began as a good idea and acquired consultants and certifications. Krishnamurthi's advice: \"extract the kernel of truth.\"",
    },
    {
      type: "diagram", title: "One Scrum sprint",
      boxes: [
        { id: "pb", x: 0.6, y: 2.4, w: 2.3, h: 1.1, text: "Product backlog", style: "light", fs: 15 },
        { id: "sp", x: 3.35, y: 2.4, w: 2.3, h: 1.1, text: "Sprint planning", style: "light", fs: 15 },
        { id: "sb", x: 6.1, y: 2.4, w: 2.3, h: 1.1, text: "Sprint backlog", style: "light", fs: 15 },
        { id: "s", x: 8.85, y: 2.4, w: 2.0, h: 1.1, text: "Sprint\n(1–4 weeks)", style: "primary", fs: 15 },
        { id: "dl", x: 8.85, y: 1.35, w: 2.0, h: 0.6, text: "Daily scrum", style: "gold", fs: 13 },
        { id: "inc", x: 11.2, y: 2.4, w: 1.5, h: 1.1, text: "Increment", style: "accent", fs: 15 },
        { id: "rv", x: 8.6, y: 4.5, w: 2.5, h: 0.9, text: "Sprint review (with stakeholders)", style: "teal", fs: 13 },
        { id: "rt", x: 5.0, y: 4.5, w: 2.6, h: 0.9, text: "Retrospective (improve the process)", style: "teal", fs: 13 },
      ],
      arrows: [
        { from: "pb", to: "sp" }, { from: "sp", to: "sb" }, { from: "sb", to: "s" }, { from: "s", to: "inc" },
        { from: "s", to: "dl", fromSide: "t", toSide: "b", label: "every day", lx: 1.35, ly: 0.1 },
        { from: "inc", to: "rv", fromSide: "b", toSide: "r", via: [[11.95, 4.95]] },
        { from: "rv", to: "rt" },
        { from: "rt", to: "pb", fromSide: "l", toSide: "b", via: [[1.75, 4.95]], label: "feedback reshapes the backlog", lx: 1.25, ly: 0.15 },
      ],
      caption: "Scrum makes Royce's \"involve the customer\" and Boehm's \"plan the next loop\" happen every few weeks. Note what it does _not_ specify: how to design, test, or review code. Teams fill that gap with XP-style practices or not at all.",
      mdDiagram: "Product backlog → Sprint planning → Sprint backlog → Sprint (1–4 weeks, with a daily scrum) → Increment → Sprint review → Retrospective → (feedback) → Product backlog",
    },
    {
      type: "text", title: "After agile: DevOps, CI/CD, and process-as-automation",
      body: [
        "In the 2000s the bottleneck moved from _writing_ code to _shipping_ it. **DevOps** (the name dates from around 2009) merges development and operations, and **continuous integration and delivery** (CI/CD) make every change automatically built, tested, and releasable. (The **Chapter 7 primer** covers operations, DevOps, and observability in depth.)",
        "For process history, the important point is this: much of what earlier process models enforced with documents and meetings is now enforced by **tooling**. That is Krishnamurthi's \"friction\" argument in action: once tests run automatically at every commit, \"people are now doing it much more without even thinking about it.\"",
      ],
      callout: { label: "Connections", text: "Krishnamurthi (Ch. 2) on CI: \"the commit becomes my way of saying, this is a transaction boundary.\" He also raises its environmental cost.\n\nBall (Ch. 1): Microsoft replaced its testing discipline with rings and Insider builds, \"but we still get bitten.\"" },
      notes: "Staged rollout, feature flags, SRE, and the DORA metrics are all in the Chapter 7 primer.",
    },
    {
      type: "compare", title: "Agile or plan-driven? Boehm and Turner's \"home grounds\"",
      intro: "Barry Boehm and Richard Turner (_Balancing Agility and Discipline_, 2003) argued the answer depends on five factors. Most real projects need a hybrid.",
      cols: [
        { head: "Agile home ground", items: ["**Criticality:** failure costs comfort or money, not lives", "**Size:** small teams", "**Dynamism:** requirements change often", "**Personnel:** many experienced developers", "**Culture:** thrives on freedom and some chaos"] },
        { head: "Plan-driven home ground", items: ["**Criticality:** failure may cost lives or huge sums (spacecraft, medical, avionics)", "**Size:** large teams, many organizations", "**Dynamism:** requirements fairly stable", "**Personnel:** wider mix of experience", "**Culture:** thrives on clear roles and procedures"] },
        { head: "Questions for this book", items: ["Where does JPL flight software sit? (Holzmann, Ch. 4)", "Where does MakeCode's GUI sit? (Ball, Ch. 1)", "Where does a government benefits system sit, with accessibility needed on day one? (Kernighan, Ch. 6)", "Where does your capstone sit?"] },
      ],
    },
    { type: "section", kicker: "PART 2", title: "Programming languages and software engineering", subtitle: "Recurring SE problems keep getting moved into the language itself" },
    {
      type: "text", title: "How SE problems become language features",
      body: [
        "- **Tangled control flow** (\"spaghetti code\") → **structured control** and **block structure**: ALGOL 60, then Pascal; Dijkstra's \"Go To Statement Considered Harmful\" (1968).",
        "- **Module boundaries ignored** → **modules and packages** with explicit interfaces: Modula-2, Ada packages, ML modules, Java packages.",
        "- **Data representations leaking** → **abstract data types and classes**: Simula 67, CLU, Smalltalk (see the Chapter 3 primer).",
        "- **Unstated assumptions** → **types and contracts**: static type systems, Eiffel's design by contract, Dafny.",
        "- **Memory corruption** → **garbage collection** (Lisp, Java) and **ownership types** (Rust).",
        "- **Concurrency bugs** → threads, monitors, actors (Erlang), channels (Go), async.",
        "- **Dynamic codebases outgrowing their checks** → **gradual typing** (TypeScript).",
      ],
      callout: { label: "The pattern", text: "A discipline is first taught as a **practice** (\"don't use goto,\" \"don't touch another module's data\"), then enforced by **tools**, and finally made the **default** in a language. Liskov (Ch. 3) states the motive: without enforcement, \"your team is no better than your weakest programmer.\"" },
      notes: "This is the background for Krishnamurthi's claim that \"the tendency has been towards richer and richer expressiveness of programmer intent\" and his prediction that proof-assistant-based languages will feel normal in 20 years. It also explains his joke about systems researchers now evangelizing Rust: memory safety moved from SE discipline into the type system.",
    },
    {
      type: "timeline", title: "Languages that reshaped SE, 1957–1983",
      events: [["1957", "FORTRAN", "high-level language; optimizing compiler"], ["1960", "ALGOL 60", "block structure, recursion, BNF", true], ["1967", "Simula 67", "classes, objects, inheritance"], ["1970", "Pascal", "structured programming for teaching"], ["1972", "C", "portable systems programming"], ["1975", "CLU", "abstract data types, iterators"], ["1983", "Ada", "packages, generics; DoD standard"]],
    },
    {
      type: "timeline", title: "Languages that reshaped SE, 1986–today",
      events: [["1986", "Eiffel", "design by contract"], ["1990", "Standard ML; Haskell", "type inference, purity"], ["1995", "Java", "GC, interfaces, mainstream safety", true], ["1998", "Erlang open-sourced", "concurrency-oriented"], ["2012", "TypeScript", "gradual typing at scale"], ["2015", "Rust 1.0", "memory safety without GC", true], ["Today", "Lean, Dafny, F*", "proofs inside programs"]],
    },
    {
      type: "text", title: "Why an SE student should care about PL",
      body: [
        "- **Languages encode hard-won SE knowledge.** Choosing a language is choosing which classes of bugs are impossible, which are caught by the compiler, and which are left to tests.",
        "- **The Blub paradox** (Paul Graham): programmers underrate features their language lacks. Knowing the history helps you notice your own Blub.",
        "- **Domain-specific languages** let a team turn its domain knowledge into a language: SQL, regular expressions, build files, infrastructure-as-code, Racket's language-oriented programming.",
        "- **Adoption is social as well as technical.** Better languages often lose. Compatibility (C++ with C; TypeScript with JavaScript) frequently beats elegance (Kernighan, Ch. 6).",
      ],
      callout: { label: "In Krishnamurthi's words", text: "PL and SE are \"the material science of computer science.\" Everyone else builds with the bricks and steel; \"somebody has to be thinking about bricks and steel.\"\n\nAnd: \"your favorite language is just the 17th one that everyone said will be the last thing you need to know.\"" },
    },
    {
      type: "check", title: "Check yourself before reading Chapter 2",
      questions: [
        "What did Royce say about the purely sequential model in his 1970 paper, and what five changes did he recommend?",
        "Name two forces (other than technical merit) that made the waterfall the official process for decades.",
        "How does the spiral model decide what to do in each cycle? Why does that make the waterfall a special case?",
        "Distinguish XP, Scrum, and Kanban. Which one says the most about how to write and test code?",
        "Give two examples of an SE practice that later became a language feature.",
      ],
    },
    {
      type: "reading", title: "Further reading",
      items: [
        "W. W. Royce, \"Managing the Development of Large Software Systems,\" Proc. IEEE WESCON, 1970. (Short; read the whole thing.)",
        "H. D. Benington, \"Production of Large Computer Programs,\" 1956; reprinted with foreword in IEEE Annals of the History of Computing, 1983.",
        "C. Larman and V. R. Basili, \"Iterative and Incremental Development: A Brief History,\" IEEE Computer, 2003.",
        "B. W. Boehm, \"A Spiral Model of Software Development and Enhancement,\" IEEE Computer, 1988.",
        "Manifesto for Agile Software Development, agilemanifesto.org, 2001.",
        "K. Beck, Extreme Programming Explained, 1999 (2nd ed. 2004); K. Schwaber and J. Sutherland, The Scrum Guide (current edition online).",
        "B. Boehm and R. Turner, Balancing Agility and Discipline: A Guide for the Perplexed, 2003.",
        "J. Humble and D. Farley, Continuous Delivery, 2010; N. Forsgren, J. Humble, G. Kim, Accelerate, 2018.",
        "E. W. Dijkstra, \"Go To Statement Considered Harmful,\" CACM, 1968.",
      ],
    },
  ],
};
