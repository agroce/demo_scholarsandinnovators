# Primer for Chapter 6 (Kernighan): Software Construction and Evolution

*Readable code, code review, maintenance, refactoring, technical debt, and the Unix philosophy*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Kernighan interview.*

## What this primer covers, and why

**Main topic: building and evolving code that people can live with.** What "construction" covers; readability and style; code review from Fagan inspections to modern pull requests; the kinds of maintenance and why maintenance dominates lifecycle cost; Lehman's laws of software evolution; refactoring; technical debt; legacy code and rewrites.

**Shorter history:** the Unix philosophy and the "software tools" tradition Kernighan helped define.

> **Why read this first.** Kernighan's books (_The Elements of Programming Style_, _Software Tools_, _The Practice of Programming_) are about **construction**, the craft of writing code that works and that others can read, test, and change. In the interview he talks about style rules that outlived their languages, programs "off in the wrong direction... unchangeable," sunk costs, Brooks's "plan to throw one away," and why most professionals work on "an infinitesimal part of a very large program." Those are the standard SE topics of construction and maintenance. This primer gives you the vocabulary.

## What "software construction" covers

In the SWEBOK (the IEEE's Software Engineering Body of Knowledge), **construction** is the detailed creation of working software: coding, unit testing, debugging, and integration. It is where design meets reality.

Construction quality is mostly about **people**: the next reader of the code, who may be you in six months. Key concerns:

- **Minimizing complexity**: simple control flow, small functions, clear data structures.
- **Anticipating change**: information hiding (Chapter 3 primer), avoiding duplication.
- **Constructing for verification**: code that is easy to test and to check (assertions, small units).
- **Standards**: style guides, coding standards (JPL's, Ch. 4), consistent idioms.

> **Kernighan's constant.** "It's hard to get the program to do what you want. That's programming, in some sense." Construction practices are the accumulated advice for making that less hard.

## Programs are for people

> "Programs must be written for people to read, and only incidentally for machines to execute."
>
> — Harold Abelson and Gerald Jay Sussman, Structure and Interpretation of Computer Programs, 1985

Kernighan and Plauger made the same point in 1974 with rules like "Write clearly — don't be too clever" and "Say what you mean, simply and directly." Code is read far more often than it is written, by reviewers, maintainers, debuggers, and now AI tools.

## Readability and style in practice

- **Names** carry most of a program's meaning. Use intention-revealing names, consistent vocabulary, and no misleading abbreviations.
- **Comments** explain _why_, not _what_. Out-of-date comments are worse than none. Interfaces need documentation (Holzmann, Ch. 4: "writing the manual").
- **Consistency** beats individual preference. Large organizations publish **style guides** (Google's are public).
- **Formatters end arguments**: `gofmt` (Go, a language Kernighan wrote the book on) made one canonical format the norm. Python's Black and JavaScript's Prettier followed.
- **Linters** go back to `lint` (Bell Labs, 1978) and flag suspicious patterns.
- **Idioms** matter: the same algorithm can be clear or obscure depending on whether it uses the language's natural constructs.

> **From Chapter 6.** Kernighan on *Elements of Programming Style*: rules tied to old languages ("don't use the arithmetic IF") died, but the ones "about how you think about debugging, or how you think about organizing it, or documenting" are "still relatively meaningful or useful."

## Code review, version 1: Fagan inspections (IBM, 1976)

```
Planning → Overview → Preparation → Inspection meeting → Rework → Follow-up
Roles: moderator, author, reader, inspectors
```

Michael Fagan's **inspections** were among the first software practices with measured results: defects found before testing, at lower cost. They are heavyweight (meetings, roles, forms). Holzmann's JPL used formal code reviews backed by tools (Ch. 4).

## Code review, version 2: modern code review

Today most review is **lightweight and tool-based**: a pull request or changelist, comments from one or two reviewers, approval, merge. It's used at Google, Microsoft, Meta, and almost every open-source project (Zeller, Ch. 5: submitted patches "would be discussed... and eventually they would get approved").

What does it actually achieve? Bacchelli and Bird's study at Microsoft (ICSE 2013) found developers _expect_ review to find defects, but much of its real value is **knowledge transfer**, **team awareness**, and **better solutions and readability**. Fewer comments were about defects than expected.

Good practice: small changes; clear descriptions; automated checks (CI, linters, static analysis) before human review; reviewers focus on design, correctness, and clarity, not formatting.

> **Review and AI.** If LLMs write more code, review becomes a larger share of the human work, and Krishnamurthi's "means of verification" problem (Ch. 2) lands on the reviewer. Can a reviewer check code they didn't see being written as well as code they did?

## Maintenance: most of a program's life

Studies across decades consistently find that **most lifecycle cost goes to maintenance**, not initial development (exact percentages vary by study and definition). E. Burton Swanson (1976) classified it; later standards (ISO/IEC 14764) added a fourth kind.

**Corrective**

- Fixing defects found after release.
- What most people think maintenance means, and usually not the largest share.

**Adaptive**

- Keeping up with a changing environment: new OS versions, libraries, regulations, hardware.
- Ball (Ch. 1): "I have to go port from dot net 5 to dot net 6."

**Perfective**

- New features and improvements users ask for once they use the system.
- Kernighan (Ch. 6): users "do something neat with it that you hadn't thought of."

**Preventive**

- Restructuring to make future change easier or failure less likely: refactoring, paying down debt.
- Rarely funded until something breaks.

## Lehman's laws of software evolution (selected)

Meir Lehman studied the evolution of IBM's OS/360 and other large systems from the 1970s on. His laws apply to **E-type** programs, those embedded in and changing the real world.

**I. Continuing change**

- A system in use must be continually adapted, or it becomes progressively less satisfactory.

**II. Increasing complexity**

- As a system evolves, its complexity increases unless work is done to maintain or reduce it.

**VI. Continuing growth**

- Functionality must keep growing to keep users satisfied.

**VII. Declining quality**

- Quality will appear to decline unless the system is rigorously maintained and adapted to its changing environment.

M. M. Lehman, "Programs, Life Cycles, and Laws of Software Evolution," Proceedings of the IEEE, 1980; the set of laws was extended in the 1990s. Together they explain why 'finished' software doesn't exist and why preventive maintenance (refactoring) is necessary, not optional.

## Refactoring

**Refactoring** means improving the internal structure of code **without changing its observable behavior**. Bill Opdyke's 1992 thesis formalized it, and Martin Fowler's _Refactoring_ (1999) popularized it.

- Small, named transformations: _Extract Function_, _Rename Variable_, _Replace Conditional with Polymorphism_, _Introduce Parameter Object_.
- **Code smells** suggest where to refactor: duplicated code, long functions, large classes, long parameter lists, feature envy.
- **Tests make it safe**: you can only claim behavior didn't change if something checks behavior.
- **IDEs automate** many refactorings and try to preserve behavior for the transformations and language features they support. Reflection, dynamic dispatch by name, and code generated or loaded at run time can still break.
Refactoring is how teams fight Lehman's law of increasing complexity, and how XP's "simple design" stays simple.

> **In the book.** Zeller (Ch. 5) credits research for helping teams be "faster in refactoring things" and keep a prototype's "internal structure" from going "down the drain."

## Technical debt (Ward Cunningham, 1992)

> "Shipping first time code is like going into debt. A little debt speeds development so long as it is paid back promptly with a rewrite... The danger occurs when the debt is not repaid. Every minute spent on not-quite-right code counts as interest on that debt."
>
> — Ward Cunningham, OOPSLA 1992 experience report

Cunningham, an Agile Manifesto signatory and inventor of the wiki, coined the metaphor to explain refactoring to financial-software managers. Debt isn't always bad: it can be a deliberate, sensible trade-off. The trouble is unacknowledged debt and never paying the interest.

## Not all debt is alike: Fowler's technical debt quadrant

```
               Reckless                         Prudent
Deliberate     "We don't have time for design"   "We must ship now and deal with consequences"
Inadvertent    "What's layering?"                "Now we know how we should have done it"
```

Martin Fowler (2009) split debt along two axes. **Prudent, deliberate** debt is a business decision. **Reckless, inadvertent** debt comes from not knowing better. **Prudent, inadvertent** debt is unavoidable: you only learn the right design by building it. That is Brooks's "plan to throw one away," which Kernighan says most people ignore.

## Legacy code, rewrites, and sunk costs

- Michael Feathers (_Working Effectively with Legacy Code_, 2004): "To me, legacy code is simply code without tests." His techniques find "seams" where tests can be added before changing anything.
- **Big rewrites are risky.** Joel Spolsky's "Things You Should Never Do" (2000) used Netscape's rewrite as a cautionary tale: old code holds years of bug fixes and knowledge.
- **Incremental replacement** instead: Fowler's **strangler fig** pattern grows a new system around the old one, routing functionality over piece by piece.
- **But** Brooks's "plan to throw one away" and Kernighan's warning about sunk costs ("I'm gonna hack it into whatever shape I can") say the opposite risk is real too: keeping a bad design because so much was invested.
The skill is telling **sunk cost** (ignore it) from **embedded knowledge** (preserve it).

> **Oral culture.** Ball (Ch. 1): large systems carry an "oral culture" of knowledge that lives in people's heads. Legacy code is hardest when that culture has left the building, a problem AI "breadcrumbs" try to address.

---

# The Unix philosophy and software tools

*Small programs, text streams, and composition*

## Doug McIlroy's summary (1978)

> "Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new "features." Expect the output of every program to become the input to another, as yet unknown, program."
>
> — M. D. McIlroy, E. N. Pinson, B. A. Tague, foreword to the Unix issue of the Bell System Technical Journal, 1978

McIlroy, head of the Bell Labs department where Unix was born, had argued since a 1964 memo for "coupling programs like garden hose." Pipes arrived in Unix in 1973. The result is **modularity at the program level** (Chapter 3 primer), with plain text as the universal interface.

## The software tools tradition

- **1964** — McIlroy's "garden hose" memo: the idea of pipes
- **1969** — Unix begins: Thompson & Ritchie
- **1973** — Pipes in Unix: and Unix rewritten in C
- **1974** — Elements of Programming Style: Kernighan & Plauger
- **1976** — Software Tools: Kernighan & Plauger
- **1977** — AWK: Aho, Weinberger, Kernighan
- **1999** — The Practice of Programming: Kernighan & Pike

## Why the tools tradition still matters

- **Composition beats features.** `grep | sort | uniq -c | sort -rn` answers questions no single tool was designed for. The same idea runs through Unix shells, functional pipelines, data-science notebooks, and microservices.
- **Text as interface** makes tools universal and debuggable: you can always look at what flows between them. (JSON-over-HTTP APIs are its modern descendant.)
- **Small, sharp tools** are easier to test, document, and keep correct (Holzmann's single-author tools, Ch. 4).
- **Little languages**: AWK, sed, make, regular expressions, and eqn are domain-specific languages, an idea Krishnamurthi's Racket takes much further (Ch. 2).
- **Limits**: text loses structure; quoting and escaping bugs abound; "do one thing well" sometimes becomes "do one thing, poorly documented."

> **Kernighan's hero.** "The obvious one is Ken Thompson... incredibly good insight, good taste." Multics was "over-engineered"; Unix was "only one idea, but do it really well."

## Check yourself before reading Chapter 6

1. Name the four kinds of maintenance, and give an example of each from software you use.
2. Bacchelli and Bird found code review's benefits differ from what developers expect. What did they find?
3. Explain Lehman's law of increasing complexity, and what refactoring has to do with it.
4. Place three pieces of technical debt you've created (or seen) in Fowler's quadrant.
5. Write a shell pipeline that answers a question no single Unix tool answers, and explain the "do one thing well" design that makes it possible.

## Further reading

- B. W. Kernighan and P. J. Plauger, The Elements of Programming Style (2nd ed.), 1978; Software Tools, 1976.
- B. W. Kernighan and R. Pike, The Practice of Programming, 1999.
- S. McConnell, Code Complete (2nd ed.), Microsoft Press, 2004.
- M. E. Fagan, "Design and Code Inspections to Reduce Errors in Program Development," IBM Systems Journal, 1976.
- A. Bacchelli and C. Bird, "Expectations, Outcomes, and Challenges of Modern Code Review," ICSE 2013.
- M. M. Lehman, "Programs, Life Cycles, and Laws of Software Evolution," Proceedings of the IEEE, 1980.
- M. Fowler, Refactoring (2nd ed.), 2018; "Technical Debt Quadrant," martinfowler.com, 2009.
- W. Cunningham, "The WyCash Portfolio Management System," OOPSLA 1992 experience report.
- M. Feathers, Working Effectively with Legacy Code, 2004.
- M. D. McIlroy, E. N. Pinson, B. A. Tague, "UNIX Time-Sharing System: Foreword," Bell System Technical Journal, 1978.
