# Unit 4 Test — Chapters 10–12 (Shaw, Beck, Jackson)

*About 75 minutes. Closed book; one page of handwritten notes allowed (suggested). Total: 100 points.*

| Part | Content | Points |
|---|---|---|
| A | Matching key terms | 20 |
| B | Multiple choice | 20 |
| C | Short answer | 30 |
| D | Applied problem | 15 |
| E | Synthesis essay (choose one) | 15 |

---

## Part A — Matching (2 points each)

Write the letter of the best definition next to each term. Each letter is used at most once, and two letters are not used.

| # | Term | | Letter | Definition |
|---|---|---|---|---|
| 1 | Architectural style | | A | A self-contained unit of user-facing functionality with its own purpose, state, actions, and operational principle |
| 2 | Wicked problem | | B | Keeping changes that alter structure separate from changes that alter behavior |
| 3 | Concept (Jackson) | | C | Incident review focused on how the system allowed a failure, not on whom to punish |
| 4 | Tidy First | | D | A family of system organizations defined by component and connector types and constraints on combining them |
| 5 | Blameless postmortem | | E | A problem with no definitive formulation, no stopping rule, conflicting stakeholders, and no second chance |
| 6 | Feedback loop | | F | A sensor measures a process, a controller compares it with a set point, and an actuator adjusts the process |
| 7 | Multiplicity | | G | Gradual expansion of a system's role beyond what it was designed and assured for |
| 8 | Mission creep | | H | A constraint on how many elements a relation may connect |
| 9 | Explore/Expand/Extract | | I | Code whose structure and names correspond to the problem domain, so humans and LLMs can see what it does |
| 10 | Legibility | | J | Beck's three phases of a product's life, each with different values and practices |
| | | | K | A test that runs only after deployment |
| | | | L | An architecture in which every component is a microservice |

---

## Part B — Multiple choice (2 points each)

**11.** Shaw's epiphany that abstract data types weren't the whole story came from considering:

- (a) a compiler
- (b) an operating system
- (c) a text editor
- (d) a spreadsheet

**12.** Beck says "you can be a bad enough programmer that your projects fail, but you can't be a good enough programmer that your projects succeed." His point is that:

- (a) programming skill doesn't matter
- (b) success depends on the context around the program: relationships, customers, trust
- (c) only teams can succeed
- (d) tests are more important than code

**13.** Jackson's three biggest advances do *not* include:

- (a) better programming languages
- (b) interfaces as weak specifications
- (c) domain modeling
- (d) the Agile Manifesto

**14.** Shaw and Beck both name which influence, though Shaw warns that his ideas have been "cluttered by the Gang of Four book"?

- (a) Christopher Alexander
- (b) Edsger Dijkstra
- (c) Herbert Simon
- (d) Donald Knuth

**15.** Shaw proposes improving software quality by:

- (a) banning frameworks
- (b) changing vendors' cost structure through liability for defects
- (c) requiring formal verification of all code
- (d) licensing all programmers

**16.** Beck and Jackson disagree most directly about:

- (a) whether testing matters
- (b) whether LLMs are useful
- (c) whether Smalltalk was influential
- (d) the value of design up front vs. incremental design

**17.** Beck's "worst practice" is:

- (a) over-indexing on features and under-indexing on futures
- (b) writing tests after code
- (c) using version control badly
- (d) pair programming

**18.** Jackson predicts that with LLMs, the most important development artifacts will become:

- (a) unit tests
- (b) the generated code
- (c) specifications, in the form of prompts recorded with their provenance
- (d) commit messages

**19.** Which pairing of interviewee and recommended book is correct?

- (a) Beck: *The Reflective Practitioner*
- (b) Jackson: *Chimpanzee Politics*
- (c) Shaw: *What Engineers Know and How They Know It*
- (d) Shaw: Brooks's *The Design of Design*

**20.** All three interviewees, in different words, say that the hardest part of software is:

- (a) understanding the problem and the people, not writing the code
- (b) choosing a programming language
- (c) getting code to compile
- (d) performance tuning

---

## Part C — Short answer (6 points each; 4–6 sentences)

**21.** Explain Shaw's model of how an engineering discipline emerges (craft → commercial → professional engineering). Where does she place software engineering, and what does she think is missing?

**22.** Shaw explains feedback loops with cruise control. Using her ideas of *command authority* and *sensor proxies*, analyze one feedback loop in software (autoscaling, rate limiting, a recommendation feed, or another of your choice).

**23.** Beck describes Facebook's incident reviews: "It didn't matter if you'd cost Facebook a billion dollars... But the moment you said, well, operations did it, it wasn't my fault... those people were walked out of the building." Explain why a blameless culture still holds people accountable, and for what.

**24.** Jackson says concepts "cross-cut the individuals that participate in the problem domain." Explain the difference between organizing functionality by concepts and by objects, using an example such as upvoting, commenting, or following.

**25.** Shaw, Beck, and Jackson all criticize how computer science teaches. Shaw: study good exemplars. Beck: CS is "like pre-med." Jackson: students solve "well-specified, pre-digested problems." Pick two and explain what change to a CS curriculum each implies.

---

## Part D — Applied problem (15 points)

A city wants software to let residents **reserve slots at public tennis courts**. Residents reserve a court for one-hour slots up to 7 days ahead. Each resident may hold at most 2 future reservations. Reservations not checked into within 15 minutes of the start are released.

**(a)** (5 pts) Identify **three concepts** in Jackson's sense. For one of them, give its purpose, state (relationally, e.g., `holds: Resident -> set Slot`), actions, and operational principle.

**(b)** (3 pts) Write two **multiplicity** questions the relational state raises that a single-object view might miss, and answer them from the requirements (or say what's undecided).

**(c)** (4 pts) Shaw would ask about the **problem setting**. Name two stakeholders besides residents, and one way this could be a **wicked problem** rather than a well-defined one.

**(d)** (3 pts) Beck's team will build it incrementally. Which concept would you build first, and what is the first **test** you would write for it (TDD)?

---

## Part E — Synthesis essay (15 points; choose ONE; ~1 page)

**E1.** Beck: "If you build the perfect foundation, you never get to round two." Jackson: Agile's "contemptuous view of what it called big design up front" did "a lot of damage." Shaw: engineers choose a bridge type for each site, but frameworks have taken that choice from us. Write an essay on how much design should happen before code, using all three chapters.

**E2.** Shaw's "holy grail" is a genuine engineering discipline for software. Using at least two chapters from this unit and one from earlier in the book, argue whether software engineering is engineering today, and what would have to change for it to become one.

**E3.** All three interviewees say LLMs shift where the difficulty lies: Shaw ("read things before you write them"), Beck ("writing code is not the bottleneck"), Jackson ("only the documentation that matters"). Write an essay arguing what a software engineer's most important skills will be in ten years, and how a course should prepare students for them.
