// Primer for Chapter 11 (Beck): XP, TDD, and the human side of software
const tdd = {
  boxes: [
    { id: "r", x: 1.0, y: 2.0, w: 3.0, h: 1.4, text: "**RED**\nwrite a small test that fails", style: "accent", fs: 15 },
    { id: "g", x: 5.15, y: 2.0, w: 3.0, h: 1.4, text: "**GREEN**\nwrite just enough code to pass", style: "teal", fs: 15 },
    { id: "f", x: 9.3, y: 2.0, w: 3.0, h: 1.4, text: "**REFACTOR**\nclean up, with all tests passing", style: "gold", fs: 15 },
    { id: "n", x: 1.0, y: 4.35, w: 11.3, h: 1.1, text: "Each loop takes minutes. Run all the tests at every step. If a step goes wrong, undo it: the last green state is always close.", style: "ghost", fs: 14 },
  ],
  arrows: [
    { from: "r", to: "g", label: "make it pass" },
    { from: "g", to: "f", label: "make it clean" },
    { from: "f", to: "r", fromSide: "t", toSide: "t", via: [[10.8, 1.55], [2.5, 1.55]], dashed: true, color: "verm", label: "next behavior", lx: 0, ly: 0.05 },
  ],
};

module.exports = {
  num: 11, name: "Beck",
  title: "XP, TDD, and the Human Side of Software",
  subtitle: "Extreme Programming in depth, test-driven development, test doubles, pairing, tidying, plus teams, psychological safety, and blameless postmortems",
  covers: [
    "**Main topic: Extreme Programming and test-driven development.** Where XP came from; its values, principles, and practices; TDD's red–green–refactor cycle with a worked example; test doubles and the two schools of TDD; what the evidence says; pair and ensemble programming; refactoring and Beck's \"tidyings\"; Explore/Expand/Extract.",
    "**Shorter topic: the human side.** Psychological safety; blameless postmortems and just culture; the old and new views of human error; measuring developer productivity without harming it.",
  ],
  why: "The Chapter 2 primer surveyed agile methods. This one goes deep on the method Beck created and the practices he made mainstream (unit testing frameworks and TDD), because his interview assumes them and moves on to what he cares about now: design economics, product phases, incident culture, and \"the human element.\" His claim that \"the hard challenges are all people challenges\" needs the vocabulary in Part 2.",
  slides: [
    { type: "section", kicker: "PART 1", title: "Extreme Programming and TDD", subtitle: "Take the practices that work, and do them all the time" },
    {
      type: "text", title: "Where XP came from",
      body: [
        "Kent Beck developed **Extreme Programming** while leading the Chrysler Comprehensive Compensation (C3) payroll project from 1996, with Ron Jeffries and others. He published _Extreme Programming Explained_ in 1999 (2nd edition, 2004, with Cynthia Andres).",
        "The name states the idea: if a practice is good, do it to the extreme.",
        "- Code review is good → review all the time (**pair programming**).",
        "- Testing is good → test all the time, before the code (**TDD**).",
        "- Integration is good → integrate many times a day (**continuous integration**).",
        "- Short iterations are good → make them very short (**small releases**, weekly cycles).",
        "- Design is good → make it everyone's daily work (**refactoring**, **simple design**).",
        "XP's response to the waterfall is to **flatten the cost-of-change curve** so late changes stay cheap (contrast the Ch. 4 primer's cost-to-fix curve).",
      ],
      callout: { label: "Values (2nd edition)", text: "**Communication**, **simplicity**, **feedback**, **courage**, **respect**.\n\nPractices without values become rituals. Beck: XP \"came out of my exploration of that context\" around the program: relationships and trust." },
    },
    {
      type: "compare", title: "XP's practices (first edition, grouped)",
      cols: [
        { head: "Fine-scale feedback", items: ["**Test-driven development**", "**Pair programming**", "**The planning game**: customers choose stories; developers estimate", "**Whole team / on-site customer**"] },
        { head: "Continuous flow", items: ["**Continuous integration**", "**Refactoring** (design improvement)", "**Small releases**"] },
        { head: "Shared understanding", items: ["**Simple design**: the simplest thing that could possibly work", "**Collective code ownership**", "**Coding standard**", "**System metaphor**"] },
        { head: "Sustainable work", items: ["**Sustainable pace** (originally \"40-hour week\")", "Overtime is a symptom of a planning problem, not a solution"] },
      ],
      notes: "The second edition reorganized these into primary and corollary practices (sit together, informative workspace, energized work, slack, ten-minute build, and more). Many are now just 'how software is done' (CI, refactoring, unit tests) and are no longer associated with XP by name: Kernighan's hype cycle in action (Ch. 6).",
    },
    { type: "diagram", title: "Test-driven development: red, green, refactor", ...tdd, caption: "Beck's _Test-Driven Development: By Example_ (2002). Tests come first, so every line of production code is written to make a failing test pass. The tests specify behavior, and the code is testable by construction. Refactoring is safe because the tests catch regressions.", mdDiagram: "RED (write a failing test) → GREEN (just enough code to pass) → REFACTOR (clean up, tests still pass) → next behavior" },
    {
      type: "text", title: "TDD, worked: Kernighan's adding program",
      body: [
        "Kernighan (Ch. 6) wanted students to test \"no numbers, one number, two numbers\" before 100. TDD builds the program in that order:",
        "**1. Red:** `assert add([]) == 0` fails, since `add` doesn't exist. **Green:** `def add(xs): return 0`. (\"Fake it.\")",
        "**2. Red:** `assert add([5]) == 5` fails. **Green:** `return xs[0] if xs else 0`.",
        "**3. Red:** `assert add([2, 3]) == 5` fails. **Green:** `return sum(xs)`. Two examples now force the general solution. (\"Triangulate.\")",
        "**4. Refactor:** remove the special cases; all three tests still pass.",
        "**5. Next behavior:** `add([1, -1]) == 0`? Very large numbers? The test list grows as you learn.",
        "Beck's three ways to get to green: **fake it** (return a constant), **triangulate** (add examples until you must generalize), and **obvious implementation** (just write it, when you're confident).",
      ],
      callout: { label: "What TDD is for", text: "TDD is a **design** technique as much as a testing one: writing the test first forces you to decide the interface and to make code testable.\n\nBeck's framing from Ch. 11: programming is \"a learning process that produces code.\" Each test is a small, checkable piece of learning." },
    },
    {
      type: "timeline", title: "Beck, xUnit, and agile",
      events: [["1987", "Patterns at OOPSLA", "Beck & Cunningham"], ["1989", "CRC cards", "Beck & Cunningham"], ["1994", "SUnit", "first xUnit framework, Smalltalk", true], ["1996", "C3 project", "XP takes shape"], ["1997", "JUnit", "Beck & Gamma"], ["1999–2001", "XP Explained; Agile Manifesto", "", true], ["2002", "TDD by Example", ""], ["2023", "Tidy First?", "design economics"]],
    },
    {
      type: "compare", title: "Test doubles, and two schools of TDD",
      intro: "Unit tests isolate the code under test by replacing its collaborators with **test doubles** (Gerard Meszaros's terms).",
      cols: [
        { head: "Kinds of double", items: ["**Dummy**: passed but never used.", "**Stub**: returns canned answers.", "**Spy**: a stub that records how it was called.", "**Mock**: pre-programmed with expectations, and fails the test if they aren't met.", "**Fake**: a working lightweight implementation (in-memory database; Groce's PyFakeFS, Ch. 8)."] },
        { head: "Classicist (\"Chicago\")", items: ["Test behavior through real objects where possible.", "Use doubles mainly for awkward collaborators: network, clock, randomness.", "Tests check **state** and results.", "Associated with Beck's and Jeffries's style."] },
        { head: "Mockist (\"London\")", items: ["Mock all collaborators; test each object's **interactions**.", "Drives interface design from the outside in.", "From Freeman and Pryce, _Growing Object-Oriented Software, Guided by Tests_ (2009).", "Risk: tests coupled to implementation details."] },
      ],
    },
    {
      type: "text", title: "Does TDD work? What the evidence says",
      body: [
        "Results are mixed, and depend heavily on context and on what the comparison group does:",
        "- Industrial case studies at Microsoft and IBM (Nagappan et al., 2008) reported **40–90% fewer pre-release defects**, with **15–35% more initial development time**.",
        "- Controlled experiments, often with students, frequently find small or no differences in quality or productivity.",
        "- Fucci and colleagues (2017) dissected the process and found the benefits came mostly from working in **small, steady steps with frequent tests**, not from writing the test _first_ specifically.",
        "A reasonable reading: frequent, fine-grained testing and refactoring clearly help. Test-first is one disciplined way to get them.",
      ],
      callout: { label: "Read like Zeller", text: "Zeller (Ch. 5) asks for empirical evidence about SE claims. TDD is a good case for practicing that: what was measured, compared with what, on whom, and over how long?" },
    },
    {
      type: "text", title: "Pair and ensemble programming",
      body: [
        "In **pair programming**, two developers work at one computer. The **driver** types; the **navigator** reviews, thinks ahead, and catches mistakes. They switch often.",
        "- Williams and colleagues' early experiments (2000) found pairs took about **15% more** person-hours but produced code with **fewer defects**.",
        "- A meta-analysis (Hannay et al., 2009) found modest overall effects that depend on task complexity and expertise: pairs help most on complex tasks and for less experienced developers.",
        "- Benefits beyond the code: shared knowledge (no single expert to lose), mentoring, and focus.",
        "**Ensemble (mob) programming** extends this to a whole team at one screen, rotating the driver every few minutes.",
      ],
      callout: { label: "Connection", text: "Pairing is continuous code review (Ch. 6 primer). In Beck's terms it also builds the trust relationships that skill alone can't: \"you can't be a good enough programmer that your projects succeed.\"" },
    },
    {
      type: "text", title: "Refactoring and \"tidyings\"",
      body: [
        "**Refactoring** (Fowler, 1999; 2nd ed. 2018) changes code structure without changing behavior, in small verified steps. Tests make it safe.",
        "Beck's _Tidy First?_ (2023) catalogs very small refactorings, **tidyings**, you can do in minutes:",
        "- **Guard clauses**: exit early instead of nesting conditionals.",
        "- **Delete dead code**.",
        "- **Normalize symmetries**: do the same thing the same way everywhere.",
        "- **Explaining variables and constants**: name a subexpression or a magic number.",
        "- **Chunk statements** and **extract helper**.",
        "The discipline: put tidyings in **separate commits or pull requests** from behavior changes, so each is easy to review, and decide _when_ to tidy: first, after, later, or never.",
      ],
      callout: { label: "Why it's economics", text: "Tidying now costs time today and pays off only if the code changes again. Beck's book weighs that using the time value of money and the value of options. That's his \"features versus futures tradeoff\" in miniature." },
    },
    {
      type: "compare", title: "Explore, Expand, Extract",
      intro: "Beck's product life-cycle model (developed at Facebook). Good practice in one phase can be malpractice in another.",
      cols: [
        { head: "Explore", items: ["Goal: find something surprisingly valuable.", "Many cheap experiments; most fail.", "Speed and low cost per experiment matter most.", "Heavy process and polish are waste.", "LLMs have made this phase much cheaper."] },
        { head: "Expand", items: ["Goal: scale before the opportunity disappears.", "Fix the next bottleneck, \"just barely good enough.\"", "Infrastructure and hiring under pressure.", "Survival is the first bar."] },
        { head: "Extract", items: ["Goal: improve a mature product steadily, for years.", "Reliability, efficiency, careful A/B tests.", "**Futures** as important as features.", "Design quality and tidying pay off here."] },
      ],
    },
    { type: "section", kicker: "PART 2", title: "The human side", subtitle: "\"The hard challenges are all people challenges\"" },
    {
      type: "text", title: "Psychological safety",
      body: [
        "Amy Edmondson (1999) defined **team psychological safety** as a shared belief that the team is safe for interpersonal risk-taking: admitting a mistake, asking a naive question, disagreeing with a senior colleague.",
        "Google's **Project Aristotle** (2015) studied 180 teams and found psychological safety the most important of five team dynamics, ahead of dependability, structure and clarity, meaning, and impact.",
        "- It is **not** comfort or lowered standards. Edmondson's high-performing teams combine high safety with high standards.",
        "- Low safety hides information: bugs, missed estimates, and bad news travel slowly or not at all.",
        "- Leaders build it by framing work as learning, admitting their own fallibility, and responding productively when people raise problems.",
      ],
      callout: { label: "Beck's version", text: "\"My summary of my career is I help geeks feel safe in the world.\" But also be **actually** safe: tests, staged deploys, and reviews make the feeling justified. Feel unsafe when you are unsafe." },
    },
    {
      type: "compare", title: "Two views of human error",
      intro: "Sidney Dekker, _The Field Guide to Understanding 'Human Error'_ (and Nancy Leveson, _Engineering a Safer World_).",
      cols: [
        { head: "The old view", items: ["Human error is the **cause** of failure.", "Systems are safe; unreliable people make them unsafe.", "Fix: find the culprit; retrain, discipline, or fire; add rules.", "Result: people hide mistakes; the same failures recur."] },
        { head: "The new view", items: ["Human error is a **symptom** of deeper problems in the system.", "People's actions made sense to them given what they knew at the time.", "Fix: understand the context (tools, pressures, information, incentives) and change it.", "Result: people report problems and near-misses."] },
      ],
      notes: "A just culture still distinguishes honest error from recklessness. Beck's Facebook example shows both: owning a billion-dollar mistake was fine; blaming others got you walked out.",
    },
    {
      type: "text", title: "Blameless postmortems in practice",
      body: [
        "John Allspaw's \"Blameless PostMortems and a Just Culture\" (Etsy, 2012) and Google's SRE practice brought aviation and medical safety culture into software. A typical postmortem document:",
        "- **Summary and impact**: what users experienced, for how long, how many.",
        "- **Timeline**: what happened, what responders saw and did, minute by minute.",
        "- **Contributing factors**: usually several. Many practitioners avoid the phrase \"root cause,\" because complex failures rarely have one.",
        "- **What went well, what went poorly, where we got lucky.**",
        "- **Action items**: owned, prioritized, tracked to completion.",
        "Review meetings focus on \"how\" questions (\"how did that look at the time?\") rather than \"why didn't you...?\"",
      ],
      callout: { label: "In the book", text: "**Holzmann** (Ch. 4): at the best places, every bug gets a real investigation.\n**Beck** (Ch. 11): Facebook's weekly incident reviews.\n**Chapter 7 primer**: the incident lifecycle and four famous outages." },
    },
    {
      type: "text", title: "Measuring developers without harming them",
      body: [
        "Measuring individual developer \"productivity\" by lines of code, commits, or tickets closed tends to distort behavior (Goodhart's law: a measure that becomes a target stops being a good measure).",
        "The **SPACE** framework (Forsgren, Storey, and colleagues, 2021) recommends measuring several dimensions, at team level, together:",
        "- **S**atisfaction and well-being; **P**erformance (outcomes); **A**ctivity; **C**ommunication and collaboration; **E**fficiency and flow.",
        "- The **DORA** metrics (Ch. 7 primer) measure delivery performance of a team, not individuals.",
        "**Sustainable pace** matters too: long overtime raises defect rates and burnout, and XP treated it as a practice from the start.",
      ],
      callout: { label: "Beck on cheap experiments", text: "\"What did you deliver in the past quarter? Well, I actually didn't deliver anything, but I did 112 experiments, none of which panned out. Okay, you're fired.\"\n\nMetrics designed for the Extract phase punish good Explore-phase work." },
    },
    {
      type: "check", title: "Check yourself before reading Chapter 11",
      questions: [
        "Name XP's five values and three of its practices. Which practices have become standard enough that people no longer call them XP?",
        "Walk through two red–green–refactor cycles for a function of your choice. What does \"triangulate\" mean?",
        "Distinguish a stub, a mock, and a fake. What is the difference between classicist and mockist TDD?",
        "What did Fucci and colleagues conclude about which part of TDD produces its benefits?",
        "Contrast the old and new views of human error, and explain why a blameless postmortem still requires accountability.",
      ],
    },
    {
      type: "reading", title: "Further reading",
      items: [
        "K. Beck with C. Andres, Extreme Programming Explained: Embrace Change (2nd ed.), Addison-Wesley, 2004.",
        "K. Beck, Test-Driven Development: By Example, Addison-Wesley, 2002.",
        "K. Beck, Tidy First? A Personal Exercise in Empirical Software Design, O'Reilly, 2023.",
        "M. Fowler, Refactoring (2nd ed.), Addison-Wesley, 2018.",
        "G. Meszaros, xUnit Test Patterns, Addison-Wesley, 2007; S. Freeman and N. Pryce, Growing Object-Oriented Software, Guided by Tests, 2009.",
        "N. Nagappan et al., \"Realizing Quality Improvement through Test Driven Development,\" Empirical Software Engineering, 2008.",
        "D. Fucci et al., \"A Dissection of the Test-Driven Development Process,\" IEEE TSE, 2017.",
        "A. Edmondson, The Fearless Organization, Wiley, 2018.",
        "S. Dekker, The Field Guide to Understanding 'Human Error' (3rd ed.), CRC Press, 2014.",
        "J. Allspaw, \"Blameless PostMortems and a Just Culture,\" Etsy Code as Craft, 2012.",
        "N. Forsgren et al., \"The SPACE of Developer Productivity,\" ACM Queue, 2021.",
      ],
    },
  ],
};
