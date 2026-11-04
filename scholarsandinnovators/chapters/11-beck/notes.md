# Chapter 11 — Kent Beck: The Human Element

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Kent Beck

Beck created **Extreme Programming** (XP) and was one of the 17 original signatories of the Agile Manifesto. He wrote the first **xUnit** testing framework, SUnit for Smalltalk, and with Erich Gamma created **JUnit**. Through unit testing frameworks and **test-driven development** (TDD) he is one of the major influences on modern testing practice. He began as a Smalltalk programmer, and that influence still shows. During his years at Facebook/Meta he developed the three-phase **Explore/Expand/Extract** model of software products. His most recent book is *Tidy First?* (2023), a "personal exercise in empirical software design" about the economics of separating structural from behavioral changes.

Groce notes that Beck has spent the least time of any interviewee as a professor, which makes him the book's clearest voice from the methodology and human side of software.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| A father who programmed drum computers | Programmable calculator at 12; "complexity partitioning" |
| Continuity | Programming as a creative act; "the fallacy of the waterfall" |
| From virtuoso to methodologist | "You can't be a good enough programmer that your projects succeed" |
| The one thing to learn | "Nothing beats repetition" |
| His career in one line | "I help geeks feel safe in the world" |
| *Tidy First* | "Software design is an exercise in human relationships" |
| Theory vs. practice | Flush rivets and the borrow checker: empirical first, theory after |
| Heroes and exemplars | Ward Cunningham; Explore, Expand, Extract |
| Worst practice | "Over-indexing on features and under-indexing on futures" |
| The divide | Incident review; blameless culture; the SFO near-miss |
| LLMs | "The genie"; writing code isn't the bottleneck; experiments got cheap |
| What he's working on | Lean proofs, B+ trees in Rust, Living Objects, the next coding genie |
| Teaching | CS is "like pre-med" |
| What to ask | "The hard challenges are all people challenges" |

---

## Theme 1: Complexity partitioning, out of necessity

Beck's father was an electrical engineer who had programmed drum-based computers in the 1950s and later wrote 6502 assembly for microcontrollers. Beck first used a programmable calculator at 12, in 1974; they "soldered together our first microcomputer."

Why did he start thinking about *how* to write software? "Because I didn't have as much talent as the people around me." A high school friend could write "tens of feet of assembly language at once" on stolen teletype paper, and "basically it worked." Beck couldn't, so he was "forced very early on into what I now call **complexity partitioning**": slicing a big problem so that one part "interacts weakly or not at all with this other part of the problem, at least for the moment." Such strategies "scale better," and "lots of people need those strategies, because they don't have that kind of galaxy brain." Groce: "as software gets bigger, who has a galaxy brain that good?" Beck: "Eventually, you run out."

> [!NOTE]
> **KEY TERM: Complexity partitioning (decomposition)**
>
> **Definition.** Dividing a problem into parts that interact weakly, so each can be understood and solved separately. It is the motive behind modularity, information hiding, and low coupling (Ch. 3 primer), and behind incremental development: solve this slice now, the rest later.
>
> **In the interview.** "You find a way to slice it so you can solve this part of the problem that interacts weakly or not at all with this other part of the problem, at least for the moment."

---

## Theme 2: The act of creation changes what you want

The continuity in programming: "it's a creative act. You have a vision in your mind, you do a bunch of work... and then there's a thing in the world because you had a thought." Beck is also a visual artist, and says it is the same.

The other continuity is the core of his argument against the waterfall: "the act of creation changes the world in ways that cause you to create something different. This is the fallacy of the waterfall, that if just we think hard enough now, then we won't have to change." Some people spend careers "kicking against the pricks, fighting that fact."

What's different is scale: from perhaps hundreds of thousands of programmers when he started, to a million when he became a professional, to tens of millions now.

> [!NOTE]
> **KEY TERM: Requirements volatility (co-evolution of problem and solution)**
>
> **Definition.** Requirements change during development, not only because of outside events but because building and using the system teaches stakeholders what they actually need. Design research calls this the **co-evolution** of problem and solution. Iterative methods treat it as normal. Plan-driven methods try to minimize it.
>
> **In the interview.** "As soon as you make the thing, structurally, you want a different thing." Compare Kernighan's "what you really wanted" (Ch. 6) and Schneider's prototypes (Ch. 9).

---

## Theme 3: Virtuosity isn't enough — Extreme Programming

Beck left college believing that "if I was a virtuosic programmer, my projects would be more successful." What he found: "you can be a bad enough programmer that your projects fail, but you can't be a good enough programmer that your projects succeed, because there's all this context around the program." Did you build relationships? Can you talk to marketing? Does someone want to pay for it? "Can you avoid pissing off your colleagues?"

"Something like extreme programming came out of my exploration of that context." Skill is still the foundation, for example "designing for testability so that you can test as you go along, so that you have a very low defect rate, so that the customers really trust you and your colleagues really trust you." But skill serves trust.

> [!NOTE]
> **KEY TERM: Extreme Programming (XP)**
>
> **Definition.** An agile method Beck developed in the late 1990s (*Extreme Programming Explained*, 1999; 2nd ed. 2004) that takes good practices "to the extreme." If testing is good, test all the time (TDD); if review is good, review continuously (pair programming); if integration is good, integrate many times a day; if short iterations are good, make them very short. XP is organized around **values** (communication, simplicity, feedback, courage, respect), principles, and **practices**. (The Chapter 11 primer covers XP in depth.)
>
> **In the interview.** XP "came out of my exploration of that context" around programming: relationships, customers, colleagues, trust.

> [!NOTE]
> **KEY TERM: Design for testability**
>
> **Definition.** Structuring code so it is easy to test: small units with clear inputs and outputs, dependencies that can be substituted (dependency injection, test doubles), deterministic behavior, and observable state. Testable designs make frequent testing cheap. TDD tends to produce them, because code written test-first must be testable from the start.
>
> **In the interview.** "Designing for testability so that you can test as you go along, so that you have a very low defect rate." Groce raises design for testability with Hoodlet as well (Ch. 8).

---

## Theme 4: Nothing beats repetition

Asked for the one thing a programmer should learn: "Nothing beats repetition." When you wonder how something would have gone if done differently, "Go do it. I know that you're behind schedule." "It's like scales for a musician." "There are programs I've written 10, 15 times, and the 15th time I go, oh! Now I get it."

A friend, after each year-long consulting job, spent four weeks reimplementing everything "the way he wished he could have done it." "There's a big difference between 20 years of experience and 1 year of experience 20 times."

> [!NOTE]
> **KEY TERM: Deliberate practice**
>
> **Definition.** Practice designed to improve performance: focused on specific weaknesses, with immediate feedback, repeated, and at the edge of current ability (Ericsson et al., 1993). In programming it appears as **code katas** (Dave Thomas), coding dojos, and rewriting the same program in different ways. It differs from experience gained simply by doing the job.
>
> **In the interview.** "If you want to get good, you practice. It's like scales for a musician." Compare Shriram's "do it twice" assignments and Royce's "do it twice" (Ch. 2 primer).

---

## Theme 5: Helping geeks feel safe — and be safe

"My summary of my career is I help geeks feel safe in the world." Feeling safe and being safe differ. "Sometimes we feel safe, but we aren't. Like, you YOLO something in production, and everything crashes." So "part of it is learning to actually be safe. And part of it is learning skills to feel safe when we are safe. And conversely, to feel unsafe when we are unsafe."

Groce's JPL story makes the point: his team built sophisticated test tools for the Curiosity rover's flash file system and found deep reset-timing bugs, but didn't test the ten-line `stat` function because they had inspected it. One of its fields was wrong. "We felt safe because it's so simple."

Beck: part of maturing as a programmer is "learning where the gotchas are, and the other part... is learning not to be paralyzed by the knowledge of where all the gotchas are." His reframing: "treating programming as a learning process that produces code, not a production process where we sometimes learn."

> [!NOTE]
> **KEY TERM: Psychological safety**
>
> **Definition.** A shared belief within a team that it is safe to take interpersonal risks: to admit mistakes, ask questions, raise concerns, or propose ideas without being punished or humiliated (Amy Edmondson, 1999). Google's Project Aristotle (2015) found it the strongest predictor of team effectiveness. It is not the same as comfort or low standards. It is what lets problems surface early.
>
> **In the interview.** "I help geeks feel safe in the world," combined with being *actually* safe: tests, reviews, and processes that make the feeling justified.

> [!NOTE]
> **KEY TERM: Programming as a learning process**
>
> **Definition.** Beck's framing: the main product of programming work is knowledge (about the problem, the design, and the domain), with working code as a by-product. It favors trying several approaches, keeping changes small and reversible, and getting feedback quickly. That is the rationale for TDD, short iterations, and spikes.
>
> **In the interview.** "I did this thing, I wasn't quite sure if it was the best way, so I did it two other ways... Was that efficient? No, I mean, compared to what?"

---

## Theme 6: Tidy First — design as human relationships

The first line of *Tidy First?*: "software design is an exercise in human relationships." Beck wanted "to talk about coupling and cohesion and preferential attachment, and power law distributions," but "I can't escape it. Everything we do is an exercise in human relationships."

*Tidy First?* separates two kinds of change. **Behavior changes** alter what the program does. **Structure changes** ("tidyings") alter how it is organized without changing behavior. Its central question is economic: should you tidy before making a behavior change, after it, later, or never? Good structure creates **options** to make future changes cheaply.

> [!NOTE]
> **KEY TERM: Tidy First (structure vs. behavior changes)**
>
> **Definition.** Beck's discipline of keeping **structural** changes (renaming, extracting a function, reordering, removing dead code) separate from **behavioral** changes, in separate commits or pull requests. Structural changes are usually small, safe, and reversible. Separating them makes review easier and lets teams decide deliberately when design investment pays off.
>
> **In the interview.** His most recent book: the economics of software design, seen through this separation.

> [!NOTE]
> **KEY TERM: Software design economics (options and the time value of money)**
>
> **Definition.** Treating design decisions as investments. Money spent on structure now has a cost, and a benefit later only if the flexibility is used. Beck borrows two ideas from finance: a dollar today is worth more than a dollar tomorrow (so defer investment), and **options** have value under uncertainty (so keep the ability to change). Good design is the balance between them.
>
> **In the interview.** The trade-off behind "over-indexing on features and under-indexing on futures" (Theme 8).

> [!NOTE]
> **KEY TERM: Coupling and cohesion (revisited)**
>
> **Definition.** **Coupling**: two elements are coupled with respect to a change if changing one requires changing the other. **Cohesion**: how closely the elements inside a module belong together. Beck's definition of coupling is *relative to a change*, which ties design directly to the cost of the changes you actually make. (Covered in the Ch. 3 primer.)
>
> **In the interview.** What Beck wanted the book to be about, before human relationships took over.

---

## Theme 7: Empirical first, then theory

Beck recommends Walter Vincenti's *What Engineers Know and How They Know It*: "I will never look at the flat rivets on the outside of an airplane as I board the same way again." The development of flush rivets "was an empirical process, which kicked off a bunch of theoretical work. Which kicked off some more empirical work." Ideas start with a problem, you try many things, one works, "then it hits the boundaries of what you can just kind of slap together, and then some theoretician comes along and goes, actually, you know, here's the math that describes this."

His software example: Rust's **borrow checker** formalized pragmatic C++ rules that "had come about through screwing things up a bunch of times. And then along came the math." Compare Schneider's opposite emphasis, research that anticipates future solutions (Ch. 9).

## Theme 8: Ward Cunningham, and Explore/Expand/Extract

Beck's top hero is **Ward Cunningham** (inventor of the wiki, co-originator with Beck of CRC cards and patterns in software, coiner of "technical debt"), for "his ability to pack more social change per line of code than anybody else I know, by many orders of magnitude."

Asked about exemplary systems, he says it depends on phase. In **Explore**, "you don't know where value's coming from," you try many things, and "something works out surprisingly well. And the rules of the game all change." In **Expand**, you scale as fast as you can, finding and fixing the next bottleneck "just barely good enough." In **Extract**, you turn the crank for "another percent, another percent... forever." "Those activities all look like programming. But the value system is completely different." People and software can thrive in one phase and fail in another. Survival comes first ("You gotta get over the ergodicity problem"). The WikiWeb "seemed like it couldn't possibly work," then did, and now "absolutely wouldn't work again, because there's too many trolls."

> [!NOTE]
> **KEY TERM: Explore, Expand, Extract (3X)**
>
> **Definition.** Beck's model of a product's life. **Explore**: many cheap experiments, most failing, looking for an unexpected success. **Expand**: once something takes off, scale it fast, removing bottleneck after bottleneck. **Extract**: in a mature product, steady incremental improvement and efficiency. Each phase rewards different practices, risk tolerance, and personalities, so good practice in one phase is malpractice in another.
>
> **In the interview.** Natural explorers (Beck), natural expanders (Steve Grimm at early Facebook), and people who love incremental optimization.

> [!NOTE]
> **KEY TERM: Ergodicity (survival first)**
>
> **Definition.** A process is ergodic if the average over time for one participant equals the average across many participants at one time. Many real processes aren't, because ruin is permanent: a strategy with good average outcomes can still eliminate you before you collect them. In product terms: survive first, because a project that dies doesn't get to benefit from later improvements.
>
> **In the interview.** "Success is the first, the lowest bar... You gotta get over the ergodicity problem."

---

## Theme 9: The worst practice — features over futures

"Over-indexing on features and under-indexing on futures." In exploring and expanding, focusing on the next change "is survival skills." But "once you get to the extract phase... the rules of the game change," and you must weigh "the ease with which you can add some unknown feature to the system in some completely unexpected direction."

The converse is **second-system syndrome**: "I'm gonna do everything right this time," and then the system "doesn't survive, and then it doesn't matter how perfect it is."

Groce suggests no one builds a bridge planning to expand it. Beck: Sydney's harbor bridge got more lanes later. He is "a big student of Christopher Alexander," who defended incremental campus planning at the University of Oregon. Critics said incrementalism means digging up streets; Alexander said yes, and so does a 50-year master plan, when the pipe turns out to need to be two feet wide instead of one. Beck: "I think it's fantastic that we can do the equivalent of building a 10-story building, scrape out the foundation, put in a much beefier foundation, and build the next 40 floors... If you build the perfect foundation, you never get to round two."

> [!NOTE]
> **KEY TERM: Second-system effect**
>
> **Definition.** Brooks's observation (*The Mythical Man-Month*, 1975): an architect's second system is the most dangerous, because it is overloaded with every feature and refinement held back from the first. The result is late, bloated, or never finished.
>
> **In the interview.** "I'm gonna do everything right this time... and then it doesn't survive."

> [!NOTE]
> **KEY TERM: Incremental (evolutionary) design**
>
> **Definition.** Letting a design grow in small steps driven by actual needs, with continuous refactoring to keep it clean, rather than fixing it fully up front. It relies on cheap change (tests, small modules) and accepts that some foundations will be replaced. XP's "simple design" and "you aren't gonna need it" (YAGNI) are its rules of thumb.
>
> **In the interview.** Alexander's incremental campus planning, and replacing a building's foundation after ten floors.

---

## Theme 10: The divide — incident review and blameless culture

Is there a gap between the best organizations and the rest? "There's people in between... But there's a huge divide. Testing, deployment. Incident review processes."

Beck describes a near-miss at San Francisco airport in which a plane came within about 40 feet of what would have been the worst disaster in aviation history, and the air traffic controller was not fired. "Our instant response is, never let that person anywhere near an airport again... And that is exactly the wrong answer if you want to minimize air traffic fatalities." Otherwise the next person won't report. "Pilots need to be able to self-report. Without consequences." He recommends Sidney Dekker's *The Field Guide to Understanding 'Human Error'*. Groce adds Nancy Leveson: firing the operator is "the cheap, useless, solution to every safety failure."

At Facebook, which he dates to 2011–2017, Beck attended weekly incident reviews. The person responsible presented the timeline, what they noticed, short- and long-term fixes, and changes to tooling or design. "It didn't matter if you'd cost Facebook a billion dollars. You walk out of that meeting, and you have your job." But people who blamed others ("operations did it, it wasn't my fault") "were walked out of the building by security."

*Instructor note:* Beck's SFO example is Air Canada Flight 759 (July 7, 2017), which lined up to land on a taxiway where four airliners were waiting and went around at the last moment.

> [!NOTE]
> **KEY TERM: Blameless postmortem**
>
> **Definition.** A written review after an incident that focuses on how the system (tools, processes, information, incentives) allowed the failure, rather than on who to punish. Participants describe what they knew and did at each point. Outputs are a timeline, contributing factors, and action items. Etsy and Google popularized it in software, from aviation and medicine. (The Ch. 11 primer covers incident culture.)
>
> **In the interview.** Facebook's weekly incident reviews: "Okay, so how is this not gonna happen again?"

> [!NOTE]
> **KEY TERM: Just culture and the "human error" view**
>
> **Definition.** Sidney Dekker's "new view" treats human error as a *symptom* of problems in a system, not its cause. People's actions made sense to them given what they knew at the time. A **just culture** distinguishes honest mistakes (learn from them, don't punish) from reckless or malicious acts, so that people report problems, including near-misses.
>
> **In the interview.** Not firing the air traffic controller: punishing honest errors "guarantees you you're gonna get more failures." But at Facebook, *blaming others* was not tolerated.

---

## Theme 11: "X will mean we don't care about the humans"

Every era has its X: "Yeah, X will mean we don't care about the humans, fill in the X, and today's is LLM." Beck's response to "we won't need programmers": "They keep trying to replace us. We ought to be thinking about why it is they want to replace us, and address those kinds of issues." That means being a real partner, and "maybe remembering people's birthdays, and being able to make chit-chat." There have always been "pockets" where programmers sat with marketing and sales and cared why a sale was lost, but "I don't think we've fundamentally made progress on that."

## Theme 12: The genie — experiments got cheap

"Love them!" Beck calls an LLM coding assistant "the genie," "because it grants my wishes. But it's oftentimes not what I actually wanted." With the warning that his answer has "a sell-by date of probably, you know, next week": "actually writing code is not the bottleneck." Going from wanting a phone app that predicts the tides to having one is "pretty magic," and the cost of experimentation in the explore phase "has come down by at least an order of magnitude, maybe two."

But organizations don't know what to do with that. "What did you deliver in the past quarter? Well, I actually didn't deliver anything, but I did 112 experiments, none of which panned out. Okay, you're fired." Groce recalls Yang's observation (Ch. 7) that people disguise experiments as products. Beck: "Always has been. As long as you get your bonus, you update your resume, you're out of there."

On incentives, Beck cites the Code of Hammurabi: if a house collapses and kills the owner's son, the builder's son is put to death. Such rules mean "net less harm in society... You put skin into the game." Compare Shaw's liability argument (Ch. 10).

> [!NOTE]
> **KEY TERM: Cost of experimentation**
>
> **Definition.** The time and money needed to test an idea: build a prototype, run an A/B test, try an architecture. When it falls, the best strategy shifts toward running more experiments and accepting that most fail. Organizations that measure only delivered features punish exactly that behavior.
>
> **In the interview.** "We don't know how to react to experiments suddenly becoming cheap. It means we should experiment a lot more."

> [!NOTE]
> **KEY TERM: Skin in the game (incentive alignment)**
>
> **Definition.** Arranging incentives so that people who make decisions bear their consequences. Without it, a **moral hazard** arises: people take risks whose costs fall on others. In software: bonuses for shipping, but no responsibility for later failures.
>
> **In the interview.** The Code of Hammurabi's builder rule: "people act with prudence, who had the incentive to act without prudence before."

---

## Theme 13: What the genie doesn't do — futures and proofs

The genie is "certainly not good at large-scale software design. In this features versus futures tradeoff, the LLM doesn't care about the futures." That is one of his side projects: "How do you tune the genie so that it pays appropriate attention to its ability to continue to add features." Vibe coding is fine for some things, but "the real value comes from compounding": each thing you build enables the next.

One compounding effect: formal proof. Beck was a TA for a program-correctness course in graduate school and "never did another formal proof after that." Now "I can use **Lean**. Not entirely successfully... but I can do it." The problem remaining is change: if a proof takes two weeks and one small change costs two more, that only works for problems "so solidified that you don't change it every week."

> [!NOTE]
> **KEY TERM: Proof assistant (Lean)**
>
> **Definition.** Software for writing machine-checked mathematical proofs, including proofs that programs meet specifications. **Lean** (Leonardo de Moura, Microsoft Research, 2013; Lean 4, 2021) is both a programming language and a prover, and is widely used in mathematics. Others include Rocq (formerly Coq), Isabelle, and Dafny, a verification-aware language. LLMs increasingly help write proofs, because the checker rejects anything wrong.
>
> **In the interview.** "I've returned to formal proofs. In a way that I wasn't able to before." Compare Shriram's prediction that proof-based languages will feel normal (Ch. 2).

> [!NOTE]
> **KEY TERM: Proof maintenance (the problem of change)**
>
> **Definition.** Keeping proofs valid as code and specifications evolve. Small program changes can break many proof steps, so verified systems are expensive to modify. Techniques include proof automation, modular specifications, and proof repair. Hand-written proofs fit stable components best.
>
> **In the interview.** "If it takes you two weeks to get from nothing to, okay, it's proven, and then you change one little thing, and you gotta spend two more weeks?"

---

## Theme 14: What he's working on — B+ trees, Smalltalk, and the next genie

Beck has "a million" side projects:

- A **tide tracker**, since moving to the coast.
- **Living Objects**: reimplementing Smalltalk "from the ground up, including multiprocessing and persistence, and in-memory transactions."
- **B+ trees in Rust**, to see whether an experienced programmer can match a standard library. Some of his implementations are faster than the B+ tree in Rust's standard library. "It's not because my brain is the size of a galaxy. No, I made excellent use of the genie, including really tight reins on what it's allowed to do." He calls the borrow checker "a fiction" in one sense: "You can still write memory unsafe code in Rust... And the genie will do that." He is also working on a GPU version: "Same API, different data structure."
- **The next generation of coding genies.** He doubts "a million agents working on the same codebase," and is "profoundly skeptical of anything it does. Because it's so good at the finger guns." Either you double-check everything and burn the value, or you check nothing and get burned.

His hypothesis for the middle path: you need a **specification** (logic, unit tests, property-based tests) that says whether a candidate is valid, because "This is basically a search process" over all possible programs. And the specification, the implementation, and the code's structure each form search spaces that feed back into one another.

> [!NOTE]
> **KEY TERM: B+ tree**
>
> **Definition.** A balanced search tree in which all values are stored in leaves, linked in order, and internal nodes hold only keys for navigation. Its high branching factor matches disk blocks and cache lines, so it is the standard index structure in databases and file systems, and the basis of ordered maps in many standard libraries (Rust's `BTreeMap` is a related B-tree).
>
> **In the interview.** Beck's experiment in matching a standard library: "I'm caring about how many cache lines does this data structure touch."

> [!NOTE]
> **KEY TERM: Specification as a search oracle**
>
> **Definition.** In program synthesis and AI code generation, a specification acts as an **oracle** that decides whether a generated candidate is acceptable: unit tests, property-based tests (random inputs checked against general properties), types, or logical contracts. Generation then becomes search guided by the oracle. The quality of the result is limited by the quality of the specification (see oracles in the Ch. 5 primer).
>
> **In the interview.** "There needs to be something which says, is this a valid solution or an invalid solution? And currently, we don't really have that."

> [!NOTE]
> **KEY TERM: Property-based testing**
>
> **Definition.** Testing by stating general properties that should hold for all inputs (reversing a list twice gives the original; a sorted list is ordered and is a permutation of the input). A tool then generates many random inputs to check them and shrinks failures to small counterexamples. QuickCheck (Claessen and Hughes, 2000) introduced it; Hypothesis is a popular Python version.
>
> **In the interview.** One of the specification forms Beck names: "a logic specification, or unit tests, or property-based tests, or something."

---

## Theme 15: Teaching — computer science is like pre-med

From his daughter Beth Andres-Beck: computer science education doesn't prepare you to be a software engineer any more than pre-med prepares you to be a doctor, but you can't be one without it. "You need organic chemistry. As a doctor. Not every day... But every once in a while, you absolutely need organic chemistry... or people are gonna die." The same goes for "Big O, data flow analysis, control flow analysis, proving, pre-conditions and post-conditions." But "when a salesperson is yelling at you on the phone because they need some feature... Big O is not gonna help."

## Theme 16: The hard challenges are all people challenges

Beck's answer to "what should I have asked?": "The hard challenges are all people challenges. Yeah. It's all emotional regulation, which is why I play poker." Poker gives immediate feedback on reading others and rewards regulating his own emotions, which he spent 40 years suppressing, until "it didn't."

He remembers his first computer: "this cursor's just blinking, and I can go away, and I can come back, and it's still waiting for me," unlike human interactions, which were "Confusing, terrifying, high stakes." "Of course I'm gonna pay attention to the computer, because the computer pays attention to me." The challenge is to keep the joy and leverage of technical skill "at the same time recognizing and adapting to the fact that we are social creatures." He recommends Frans de Waal's *Chimpanzee Politics*: "We aren't just primates, but we are also primates."

---

## Connections to other chapters

- **Chapter 1 (Ball):** Ball noticed the book had little about process and people; Beck is the answer. Both connect at Microsoft Research and industry-scale testing.
- **Chapter 2 (Krishnamurthi):** The waterfall's "fallacy" vs. Shriram's respectful derivation. Shriram predicts proof languages will feel normal; Beck is now using Lean.
- **Chapter 4 (Holzmann):** Holzmann's insistence that every bug gets a real post-mortem; Beck's blameless incident reviews at Facebook.
- **Chapter 5 (Zeller):** Unit tests as one of the biggest advances; Beck created xUnit. Specifications as oracles.
- **Chapter 6 (Kernighan):** Brooks's "plan to throw one away" vs. Beck's "nothing beats repetition"; Kernighan's cut-and-try vs. Beck's learning process.
- **Chapter 7 (Yang):** Demos disguised as products; experiments got cheap; AI output that can't be maintained.
- **Chapter 9 (Schneider):** Empirical-first (Beck) vs. future-solutions research (Schneider); both on Rust's ownership model.
- **Chapter 10 (Shaw):** Both students of Christopher Alexander; Hammurabi and skin in the game alongside Shaw's liability argument.

## Discussion questions

1. "You can't be a good enough programmer that your projects succeed." What else determines success? Give an example from a project you've been on.
2. Pick a small program you've written. Rewrite it twice in different ways. What did you learn the third time that you didn't the first?
3. Classify a product you know as Explore, Expand, or Extract. Which practices from this course fit its phase, and which would be harmful?
4. Draft a blameless postmortem for a bug from one of your own projects: timeline, contributing factors, action items. What was hard about not blaming?
5. Beck says experiments became 10–100 times cheaper with LLMs, but organizations punish failed experiments. How should a team measure progress during exploration?
6. Is computer science "like pre-med"? Which courses in your program are organic chemistry, and what is missing?

## Further reading

- K. Beck with C. Andres, *Extreme Programming Explained: Embrace Change* (2nd ed.), Addison-Wesley, 2004.
- K. Beck, *Test-Driven Development: By Example*, Addison-Wesley, 2002.
- K. Beck, *Tidy First? A Personal Exercise in Empirical Software Design*, O'Reilly, 2023.
- K. Beck, "The Product Development Triathlon" and related writing on Explore/Expand/Extract (2016 onward).
- W. G. Vincenti, *What Engineers Know and How They Know It*, Johns Hopkins, 1990.
- S. Dekker, *The Field Guide to Understanding 'Human Error'* (3rd ed.), CRC Press, 2014.
- A. Edmondson, "Psychological Safety and Learning Behavior in Work Teams," *Administrative Science Quarterly*, 1999.
- N. Leveson, *Engineering a Safer World*, MIT Press, 2011.
- F. de Waal, *Chimpanzee Politics*, 1982.
- K. Claessen and J. Hughes, "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs," *ICFP* 2000.

---

## Key term index

| Term | Theme |
|---|---|
| Complexity partitioning | 1 |
| Requirements volatility | 2 |
| Extreme Programming (XP) | 3 |
| Design for testability | 3 |
| Deliberate practice | 4 |
| Psychological safety | 5 |
| Programming as a learning process | 5 |
| Tidy First (structure vs. behavior changes) | 6 |
| Software design economics | 6 |
| Coupling and cohesion | 6 |
| Explore, Expand, Extract | 8 |
| Ergodicity | 8 |
| Second-system effect | 9 |
| Incremental design | 9 |
| Blameless postmortem | 10 |
| Just culture | 10 |
| Cost of experimentation | 12 |
| Skin in the game | 12 |
| Proof assistant (Lean) | 13 |
| Proof maintenance | 13 |
| B+ tree | 14 |
| Specification as a search oracle | 14 |
| Property-based testing | 14 |
