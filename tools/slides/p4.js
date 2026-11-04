// Primer for Chapter 4 (Holzmann): requirements & the economics of defects; project management & estimation
const cone = (() => {
  const rows = [["Initial concept", 0.25, 4], ["Approved product definition", 0.5, 2], ["Requirements complete", 0.67, 1.5], ["User-interface design complete", 0.8, 1.25], ["Detailed design complete", 0.9, 1.1]];
  const cx = 7.9, k = 2.7, boxes = [];
  rows.forEach(([lbl, lo, hi], i) => {
    const y = 1.55 + i * 0.85, wid = Math.max(0.35, k * Math.log(hi / lo));
    boxes.push({ id: "l" + i, x: 0.6, y, w: 3.4, h: 0.65, text: `${lbl}  ·  ${lo}×–${hi}×`, style: "note", align: "right", fs: 13 });
    boxes.push({ id: "b" + i, x: cx - wid / 2, y, w: wid, h: 0.65, text: "", style: i === 0 ? "accent" : (i < 3 ? "gold" : "teal") });
  });
  boxes.push({ id: "c", x: cx - 0.02, y: 1.45, w: 0.04, h: 4.35, text: "", style: "primary" });
  boxes.push({ id: "cl", x: cx - 1.1, y: 5.82, w: 2.2, h: 0.32, text: "actual effort", style: "note", fs: 12 });
  return { boxes, arrows: [] };
})();
const costcurve = (() => {
  const phases = [["Requirements", 0.5], ["Design", 0.9], ["Coding", 1.5], ["Testing", 2.4], ["Operation", 3.6]];
  const boxes = phases.map(([p, h], i) => ({ id: "c" + i, x: 1.0 + i * 2.35, y: 5.3 - h, w: 1.8, h, text: "", style: i < 4 ? "teal" : "accent" }));
  phases.forEach(([p], i) => boxes.push({ id: "t" + i, x: 0.9 + i * 2.35, y: 5.35, w: 2.0, h: 0.45, text: p, style: "note", fs: 14 }));
  boxes.push({ id: "q", x: 0.6, y: 1.45, w: 6.0, h: 0.9, text: "Relative cost to fix a defect introduced in requirements, by when it is found (illustrative shape, not data)", style: "note", fs: 14, align: "left" });
  return { boxes, arrows: [] };
})();
const lasso = {
  boxes: [
    { id: "s0", x: 0.8, y: 3.0, w: 2.0, h: 1.0, text: "idle", style: "light", shape: "oval", fs: 16 },
    { id: "s1", x: 3.6, y: 3.0, w: 2.0, h: 1.0, text: "requested", style: "gold", shape: "oval", fs: 16 },
    { id: "s2", x: 6.9, y: 1.8, w: 2.0, h: 1.0, text: "busy", style: "light", shape: "oval", fs: 16 },
    { id: "s3", x: 6.9, y: 4.3, w: 2.0, h: 1.0, text: "retry", style: "light", shape: "oval", fs: 16 },
    { id: "g", x: 10.6, y: 1.8, w: 2.0, h: 1.0, text: "granted", style: "teal", shape: "oval", fs: 16 },
  ],
  arrows: [
    { from: "s0", to: "s1", label: "request", ly: -0.05 },
    { from: "s1", to: "s2", fromSide: "t", toSide: "t", via: [[4.6, 1.45], [7.9, 1.45]] },
    { from: "s2", to: "s3", fromSide: "b", toSide: "t", color: "verm", width: 2.5 },
    { from: "s3", to: "s2", fromSide: "l", toSide: "l", via: [[6.35, 4.8], [6.35, 2.3]], color: "verm", width: 2.5, label: "loop forever", lx: -0.35, ly: 0.9 },
    { from: "s2", to: "g", dashed: true, label: "never taken", ly: -0.05 },
  ],
};

module.exports = {
  num: 4, name: "Holzmann",
  title: "Requirements, Defects, and Projects",
  subtitle: "Requirements engineering, the economics of defects, and (briefly) how software projects are planned and estimated",
  covers: [
    "**Main topic: requirements and the economics of defects.** What requirements engineering does; functional vs. non-functional requirements; what makes a requirement good; user stories; failures rooted in requirements and interfaces (several of them at JPL); the classic claim that defects cost more the later they're found, and how strong the evidence really is; inspections, defect classification, and safety standards.",
    "**Shorter topics:** project management and estimation (Brooks's law, the cone of uncertainty, COCOMO, story points, and why estimates fail), and a quick model-checking refresher (temporal logic in practice) for reading about Spin.",
  ],
  why: "Holzmann's answer to the methodology question is the most quantitative in the book: record every defect, find where it was _introduced_ and where it was _found_, and shorten \"the distance bugs travel.\" That only makes sense if you know the standard lifecycle phases, why requirements defects are feared, and the long-running debate about defect costs. His career, from Bell Labs telephone switches to JPL Mars missions, is also a tour of the domains where requirements and process discipline matter most.",
  slides: [
    { type: "section", kicker: "PART 1", title: "Requirements engineering", subtitle: "Deciding what to build, and writing it down so it can be checked" },
    {
      type: "text", title: "What requirements engineering does",
      body: [
        "A **requirement** is a statement of something the system must do or a property it must have. **Requirements engineering** (RE) covers:",
        "- **Elicitation**: discovering needs from stakeholders (users, operators, regulators, other systems) through interviews, observation, prototypes, and existing documents.",
        "- **Analysis**: resolving conflicts, finding gaps, prioritizing, checking feasibility.",
        "- **Specification**: writing requirements precisely enough to build and test against.",
        "- **Validation**: checking with stakeholders that these are the _right_ requirements (Kernighan: what you wanted vs. \"what you really wanted\").",
        "- **Management**: tracking changes and keeping **traceability** links from each requirement to design, code, and tests.",
        "Requirements are where **validation** problems are born. A program can perfectly implement a wrong requirement.",
      ],
      callout: { label: "In Chapter 4", text: "Holzmann's pipeline: \"You start with the specification, come up with requirements, do a high-level design. Refine it into a low-level design. Write and test the code.\" And: \"if somebody makes a mistake in the requirements, you want to catch it in the requirements phase.\"" },
    },
    {
      type: "compare", title: "Functional vs. non-functional requirements",
      cols: [
        { head: "Functional", items: ["What the system **does**: inputs, outputs, behaviors.", "\"When the rover receives a stop command, it shall halt all drive motors.\"", "\"The system shall let a user reset their password by email.\"", "Usually testable by specific test cases."] },
        { head: "Non-functional (quality attributes)", items: ["**How well** it does it: performance, reliability, availability, safety, security, usability, maintainability, portability (see ISO/IEC 25010).", "\"The flight software shall respond to a fault within 50 ms.\"", "Often cut across every feature (Kernighan's accessibility example, Ch. 6).", "Often the hardest to state measurably, and the most expensive to retrofit."] },
        { head: "Constraints", items: ["Limits on the solution rather than the problem.", "Language or platform (\"shall be written in C\"; JPL coding standard)", "Regulation (DO-178C, HIPAA, GDPR)", "Interfaces to existing systems: units, formats, protocols. A classic source of failure (next slides)."] },
      ],
    },
    {
      type: "text", title: "What makes a good requirement?",
      body: [
        "Standards (IEEE 830, now ISO/IEC/IEEE 29148) list qualities a requirement should have: **correct, unambiguous, complete, consistent, verifiable, traceable, feasible**.",
        "**Bad:** \"The system shall respond quickly to user input.\" (Quickly by whose standard? Under what load?)",
        "**Better:** \"Under a load of 1,000 concurrent users, the system shall display search results within 2 seconds for 95% of requests.\"",
        "Structured templates help. **EARS** (Easy Approach to Requirements Syntax, Mavin et al., 2009) uses patterns such as:",
        "- _Event-driven:_ \"**When** <trigger>, the <system> **shall** <response>.\"",
        "- _Unwanted behavior:_ \"**If** <condition>, **then** the <system> **shall** <response>.\"",
        "- _State-driven:_ \"**While** <state>, the <system> **shall** <response>.\"",
        "The \"If... then\" pattern forces you to write down **unhappy paths** (Zeller, Ch. 5).",
      ],
      callout: { label: "Verifiable = testable", text: "A useful rule: if you can't describe a test that would show a requirement is _not_ met, it isn't a requirement yet. This is the V-model's pairing (Chapter 2 primer) applied to a single sentence." },
    },
    {
      type: "text", title: "Agile requirements: user stories and acceptance criteria",
      body: [
        "Agile teams usually replace large specifications with a backlog of **user stories** (popularized by XP and by Connextra's template, around 2001):",
        "\"As a **<role>**, I want **<goal>** so that **<benefit>**.\"",
        "A story is a placeholder for a conversation, completed by **acceptance criteria**, often in Behavior-Driven Development's **Given–When–Then** form:",
        "_Given_ a user with an expired password, _when_ they log in, _then_ they are prompted to choose a new one.",
        "Bill Wake's **INVEST** checklist says a good story is Independent, Negotiable, Valuable, Estimable, Small, and Testable.",
        "Stories trade completeness for flexibility. That suits Boehm and Turner's agile home ground (Chapter 2 primer). It is risky for cross-cutting non-functional and safety requirements.",
      ],
      callout: { label: "Connection", text: "Zeller's favorite process, TDD (Ch. 5), and BDD both turn requirements into executable tests. Holzmann would ask: when one of those tests fails late, which phase introduced the defect?" },
    },
    {
      type: "compare", title: "Requirements and interface failures at JPL",
      cols: [
        { head: "Mars Climate Orbiter (1999)", items: ["Lost on arrival at Mars.", "Ground software produced thruster impulse data in **pound-force seconds**; the navigation software expected **newton-seconds**, as the interface specification required.", "Small trajectory errors accumulated over months.", "**Phase introduced:** interface/requirements compliance. **Found:** in operation, too late."] },
        { head: "Mars Polar Lander (1999)", items: ["Lost during landing.", "Most probable cause (review board): touchdown sensors produced a spurious signal when the legs deployed; software read it as landing and shut off the engines at about 40 m altitude.", "The behavior was known for the sensors but not captured in the software requirements.", "**Lesson:** requirements must flow down from hardware behavior."] },
        { head: "Spirit rover, sol 18 (2004)", items: ["Spirit stopped communicating normally and rebooted repeatedly.", "Cause: files had accumulated in flash memory until managing them exhausted the memory available to the file system, triggering repeated resets.", "Engineers recovered the rover remotely, and it worked for six more years.", "**Context:** a few years later Holzmann was writing a new flight file system at JPL, which Groce tested and model checked (see the Chapter 4 introduction)."] },
      ],
      fs: 13.5,
      notes: "These are well-documented NASA cases. See the Mars Climate Orbiter Mishap Investigation Board Phase I Report (1999), and the Mars Program Independent Assessment Team report (2000) and JPL Special Review Board report on Mars Polar Lander (2000). The Spirit flash anomaly is described in several JPL papers (e.g., Reeves and Neilson, 2005).",
    },
    {
      type: "diagram", title: "The classic claim: defects cost more the later they're found",
      ...costcurve,
      caption: "Barry Boehm's _Software Engineering Economics_ (1981) popularized a curve like this: a requirements defect fixed in operation may cost **orders of magnitude** more than one fixed while writing requirements. It's the economic argument behind reviews, the V-model, and Holzmann's \"shorten the distance bugs travel.\" (Bar heights here are illustrative only.)",
      mdDiagram: "cost to fix a requirements defect, by phase found:\nRequirements ▁  Design ▂  Coding ▃  Testing ▅  Operation █   (illustrative shape)",
    },
    {
      type: "text", title: "How strong is that evidence?",
      body: [
        "The curve is in nearly every SE textbook, often with precise multipliers (\"100×\"). Researchers have questioned it:",
        "- Laurent Bossavit (_The Leprechauns of Software Engineering_, 2015) traced the famous figures back through chains of citations to a few small, old, or unpublished studies.",
        "- Menzies, Nichols, Shull, and Layman (_Empirical Software Engineering_, 2017) analyzed 171 projects and found **no consistent \"delayed issue effect\"**: in that data, issues fixed later were not systematically more expensive.",
        "**A reasonable reading:** the effect is real for some kinds of defects and settings (requirements flaws in safety-critical, hardware-coupled systems like spacecraft), but neither universal nor precisely known. Modern practices (CI, automated tests, cheap deployment) also flatten the curve.",
      ],
      callout: { label: "Why include this?", text: "This is Zeller's point about empirical SE (Ch. 5): theories are \"slow to evolve\" and confounders are everywhere. It's also Krishnamurthi's (Ch. 2) about critical distance: famous claims deserve the same scrutiny as famous people." },
    },
    {
      type: "text", title: "Finding defects early: inspections and classification",
      body: [
        "- **Fagan inspections** (Michael Fagan, IBM, 1976): formal, role-based reviews of design and code (moderator, reader, author, inspectors), with preparation, a meeting, rework, and follow-up. They were one of the first techniques with measured defect-removal results (more in the Chapter 6 primer).",
        "- **Requirements reviews and checklists**: walkthroughs with stakeholders, ambiguity checklists, prototyping to validate UI requirements.",
        "- **Orthogonal Defect Classification** (Chillarege et al., IBM, 1992): classify each defect by _type_ (assignment, checking, algorithm, interface, timing...) and _trigger_ (what activity exposed it), then use the distribution to improve the process.",
        "- **Defect injection/detection matrices**: exactly Holzmann's method. Count defects by phase introduced × phase found, and invest where defects escape.",
      ],
      callout: { label: "In Chapter 4", text: "\"You first fix the checking process for the bugs that can travel the farthest... You make sure that the distance bugs travel gets shorter... Improvement is a gradual process. As long as you keep improving, you're doing okay.\"" },
    },
    {
      type: "compare", title: "Process maturity and safety standards",
      intro: "In high-stakes domains, process is often **required by regulation or contract**. These are the frameworks Holzmann's world lives in.",
      cols: [
        { head: "Process maturity", items: ["**CMM** (SEI, 1991; Watts Humphrey) → **CMMI**: five maturity levels from \"initial\" (ad hoc) to \"optimizing\" (measured, continuously improving).", "Once demanded by U.S. defense contracts; criticized as bureaucratic.", "Level 5's \"optimizing\" is close to Holzmann's metrics loop."] },
        { head: "Safety standards", items: ["**DO-178C** (2011): avionics software; Levels A–E by failure severity; Level A requires MC/DC structural coverage (Chapter 5 primer).", "**ISO 26262**: automotive functional safety.", "**IEC 62304**: medical device software.", "**NASA NPR 7150.2**: NASA's software engineering requirements."] },
        { head: "Coding standards", items: ["**MISRA C** (1998–): automotive and embedded C subset.", "**JPL Institutional Coding Standard for C** (2009), based on Holzmann's \"Power of Ten\" rules (2006).", "Checked mechanically by static analyzers and tools such as Cobra."] },
      ],
    },
    { type: "section", kicker: "PART 2", title: "Projects: planning and estimation", subtitle: "Why software is late, and what estimates can and can't tell you" },
    {
      type: "quote", title: "Brooks's law (1975)",
      quote: "Adding manpower to a late software project makes it later.",
      by: "Frederick P. Brooks, Jr., The Mythical Man-Month, 1975",
      context: "Brooks managed IBM's OS/360 (Kernighan, Ch. 6). New people need training, and communication paths grow as **n(n−1)/2**: 10 people have 45, 20 have 190. People and months are interchangeable only for work needing no communication. In Brooks's words, \"the bearing of a child takes nine months, no matter how many women are assigned.\"",
    },
    {
      type: "text", title: "Project management basics",
      body: [
        "- **The iron triangle**: scope, schedule, and cost (with quality in the middle). Fix any two and the third must flex. Agile methods usually fix schedule (sprints) and cost (team) and flex scope.",
        "- **Work breakdown and scheduling**: decompose the work; Gantt charts; **critical path** analysis (CPM and PERT, both from the late 1950s; PERT came from the U.S. Navy's Polaris missile program).",
        "- **Risk management**: Boehm's spiral model put risk at the center (Chapter 2 primer). Keep a risk list and act on the top items each cycle. Compare the MSL team meetings Holzmann describes, asking each person \"what... they were worried about most.\"",
        "- **Tracking and metrics**: velocity and burndown charts (agile), earned value (plan-driven), defect metrics (Holzmann). Any metric becomes a target and gets gamed (**Goodhart's law**).",
      ],
      callout: { label: "An honest note", text: "Few interviewees in this book focus on project management; most are researchers in languages, testing, and verification. Holzmann is the exception: \"it's not just programming,\" he says. Project management is where you \"track the metrics from one project to another.\"" },
    },
    {
      type: "diagram", title: "Why early estimates are uncertain: the cone",
      ...cone,
      caption: "Steve McConnell (_Software Estimation_, 2006), following Boehm (1981): at the initial concept stage, even skilled estimates can be off by **4× in either direction**. The range narrows only as decisions get made. Estimates don't shrink the cone; _decisions_ do.",
      mdDiagram: "Initial concept                0.25× ──────────────●────────────── 4×\nApproved product definition         0.5× ────────●──────── 2×\nRequirements complete                  0.67× ────●──── 1.5×\nUI design complete                         0.8× ──●── 1.25×\nDetailed design complete                    0.9× ●  1.1×",
    },
    {
      type: "compare", title: "How teams estimate",
      cols: [
        { head: "Expert judgment", items: ["Ask experienced people; most common in practice.", "**Wideband Delphi** (Boehm, from RAND's Delphi method): anonymous rounds converge on an estimate.", "Weakness: optimism. The **planning fallacy** (Kahneman & Tversky); **Hofstadter's law**: \"It always takes longer than you expect, even when you take into account Hofstadter's Law.\""] },
        { head: "Parametric models", items: ["**COCOMO** (Boehm, 1981; COCOMO II, 2000): effort ≈ a · (size)ᵇ × cost drivers, with b > 1 (diseconomy of scale).", "**Function points** (Albrecht, IBM, 1979): measure size by inputs, outputs, files, and interfaces, not lines of code.", "Need calibration with local historical data."] },
        { head: "Agile relative estimation", items: ["**Story points**: relative size, not hours.", "**Planning poker** (Grenning 2002; Cohn 2005): simultaneous reveals avoid anchoring.", "**Velocity**: points completed per sprint, used to forecast.", "The **#NoEstimates** movement argues for slicing work small and counting items instead."] },
      ],
      notes: "Krishnamurthi (Ch. 2) mentions COCOMO in his list of things software engineering courses traditionally cover before students have any experience to hang them on.",
    },
    {
      type: "text", title: "Do projects really fail that often?",
      body: [
        "The Standish Group's **CHAOS reports** (from 1994) are widely cited for claims like \"only 16% of projects succeed.\"",
        "Researchers have criticized them sharply. J. Laurenz Eveleens and Chris Verhoef (\"The Rise and Fall of the Chaos Report Figures,\" _IEEE Software_, 2010) showed that judging success by agreement with the _initial_ estimate rewards padded estimates and punishes honest ones. The data and methods were not open.",
        "What is well supported: large projects overrun more often than small ones; requirements volatility and poor estimation are recurring causes; and public-sector projects face the constraints Kernighan and Pahlka describe (Ch. 6).",
        "**Same lesson as the cost-to-fix curve:** treat famous numbers as hypotheses. Ask where they come from and what \"failure\" meant.",
      ],
      callout: { label: "The software crisis, again", text: "Liskov (Ch. 3): \"even up into the eighties you would still read articles in the newspaper about how some company had spent millions of dollars... and it didn't work.\" Estimation and requirements problems were the heart of the \"crisis.\"" },
    },
    { type: "section", kicker: "PART 3", title: "Model-checking refresher", subtitle: "Just enough temporal logic to read about Spin (see the Chapter 1 primer for the big picture)" },
    {
      type: "compare", title: "Common temporal-logic property patterns",
      intro: "In **linear temporal logic** (Pnueli, 1977), **G** = always, **F** = eventually, **X** = next, **U** = until. Most real requirements fit a handful of patterns (Dwyer, Avrunin, Corbett, 1999).",
      cols: [
        { head: "Safety (\"never bad\")", items: ["`G ¬(crit1 ∧ crit2)`: never both in the critical section.", "`G (moving → doorClosed)`: the door is always closed while moving.", "A violation is a **finite** trace ending in the bad state."] },
        { head: "Liveness (\"eventually good\")", items: ["`G (request → F grant)`: every request is eventually granted.", "`G F heartbeat`: a heartbeat occurs infinitely often.", "A violation is an **infinite** trace, shown as a **lasso**: a prefix plus a loop that repeats forever."] },
        { head: "Precedence and order", items: ["`¬fire U armed`: no firing until armed.", "`G (launch → X ¬abort)`-style next-step rules.", "Requirements written in EARS (\"When... shall...\") often translate directly into these patterns."] },
      ],
    },
    {
      type: "diagram", title: "What a liveness counterexample looks like: a lasso",
      ...lasso,
      caption: "For `G (request → F grant)`, Spin can report an execution that reaches **requested** and then cycles **busy → retry → busy** forever, never reaching **granted**. A finite prefix plus a repeating loop is how a model checker shows that \"eventually\" never happens.",
      mdDiagram: "idle ─request─▶ requested ─▶ busy ⇄ retry   (loops forever)\n                                 ┄┄never taken┄┄▶ granted",
    },
    {
      type: "check", title: "Check yourself before reading Chapter 4",
      questions: [
        "Rewrite \"The system shall be reliable\" as a verifiable non-functional requirement.",
        "For Mars Climate Orbiter, in which phase was the defect introduced and in which was it found? What check could have caught it earlier?",
        "What does the cost-to-fix curve claim, and why do some researchers doubt the famous multipliers?",
        "Explain Brooks's law using the n(n−1)/2 formula. When might adding people _not_ make a project later?",
        "Write LTL for \"every alarm is eventually acknowledged\" and describe what a counterexample would look like.",
      ],
    },
    {
      type: "reading", title: "Further reading",
      items: [
        "I. Sommerville, Software Engineering (any recent edition), chapters on requirements engineering.",
        "A. Mavin et al., \"Easy Approach to Requirements Syntax (EARS),\" IEEE RE 2009.",
        "Mars Climate Orbiter Mishap Investigation Board, Phase I Report, NASA, 1999.",
        "B. W. Boehm, Software Engineering Economics, Prentice Hall, 1981.",
        "L. Bossavit, The Leprechauns of Software Engineering, 2015.",
        "T. Menzies, W. Nichols, F. Shull, L. Layman, \"Are Delayed Issues Harder to Resolve? Revisiting Cost-to-Fix of Defects throughout the Lifecycle,\" Empirical Software Engineering, 2017.",
        "M. E. Fagan, \"Design and Code Inspections to Reduce Errors in Program Development,\" IBM Systems Journal, 1976.",
        "F. P. Brooks, Jr., The Mythical Man-Month (Anniversary ed.), 1995.",
        "S. McConnell, Software Estimation: Demystifying the Black Art, 2006.",
        "J. L. Eveleens and C. Verhoef, \"The Rise and Fall of the Chaos Report Figures,\" IEEE Software, 2010.",
        "M. B. Dwyer, G. S. Avrunin, J. C. Corbett, \"Patterns in Property Specifications for Finite-State Verification,\" ICSE 1999.",
      ],
    },
  ],
};
