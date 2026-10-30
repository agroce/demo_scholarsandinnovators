# Answer Key — Chapter 6 Quiz (Kernighan)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **c** | "Suddenly, things started to click... because it was interactive computing." |
| 2 | **b** | "What's hard about programming is getting it right." |
| 3 | **a** | Boundary-value testing. |
| 4 | **b** | "That basically trivial thing of block structure was especially important." |
| 5 | **d** | "Intended for, in effect, adversarial relationships." |
| 6 | **c** | Good idea → ballooning → absorbed into practice. |
| 7 | **d** | Thompson for "good taste"; Aho for regex/automata theory → egrep, AWK. |

## Part B — what a full-credit answer includes

**8.** *Verification*: getting the program to do what you *intended*, i.e., matching your specification ("building the product right"). *Validation*: realizing your intention was wrong, that what you thought you wanted "turns out not to be what you really wanted" ("building the right product"). A program can pass the first and fail the second.

**9.** Translating to C meant users needed only a working C compiler. C++ was immediately portable, fit the existing Unix environment, and could use existing C libraries and tools, which made adoption easy. The cost: compatibility with C brought "weird syntax and bizarre properties" and "any number of complaints" for decades.

## Part C — rubric (10 points)

- **Risks of cut-and-try (4):** You can end up "off in the wrong direction... unchangeable." Sunk cost makes you "hack it into whatever shape" instead of redesigning. Early decisions harden.
- **Brooks (2):** "Plan to throw one away; you will, anyhow." You learn the real requirements and design from a first attempt, so plan to discard it.
- **Position on the semester project (4):** Either position is fine if justified. *For:* reduces risk on unfamiliar technology and exposes requirements early. *Against:* a semester is short, and the prototype may become the product anyway (the very sunk-cost trap). Strong answers propose a concrete form (a 2-week spike with a mandated rewrite) or connect to Holzmann's (Ch. 4) "quick hack" that he later goes back and replaces.
