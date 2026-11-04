# Answer Key — Chapter 5 Quiz (Zeller)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **d** | "...the model that you've built about how the program should work is obviously not consistent with reality." |
| 2 | **a** | "By a series of systematic, automatic experiments, it reduces the input to a minimum that still causes the program to fail." |
| 3 | **b** | He argues against verifying everything on economic grounds. |
| 4 | **b** | Productive people may simply "get to environments, where they can have bigger screens!" |
| 5 | **c** | "The worst practice I see is only checking the happy path." |
| 6 | **a** | "You do not make an exponential problem solvable in constant time, simply because you attach another algorithm to it." |
| 7 | **d** | Contrast with Krishnamurthi (Ch. 2). |

## Part B — what a full-credit answer includes

**8.** (1) **Cost**: verified software is "a zillion times more costly"; a kernel goes from about $1B to perhaps $10B. (2) **Expertise**: you need "the one PhD student who built the prover." (3) **Does it work, and against what?**: "What is the specification you verify it against? How do you know there are no holes in the specification?" Objection (3) applies to *every* spec-based technique: tests derived from an incomplete or wrong spec pass on wrong behavior too (specification adequacy; verification vs. validation).

**9.** In Unicode-aware regex engines such as Python's, `\d` matches *any* Unicode decimal digit, including Arabic-Indic digits (`٨٦٠٠١`). The check passes, but downstream code (databases, external APIs, other languages' parsers) may reject or misinterpret the value. Other loose checks have the same problem: `str.isdigit()` returns True for `①`, yet `int("①")` fails. Zeller's point is that each happy-path value has "a dozen or more" unhappy variants: negative numbers, zero bytes, very long strings, injection strings, numbers that aren't really numbers. Full credit names the mechanism (Unicode digit classes) and the general lesson (allowlist the exact form you need; test unhappy paths).

## Part C — rubric (10 points)

- **Meaning (3):** Work on under-researched problems where no state of the art exists, instead of incremental improvements in crowded areas.
- **Two examples (3):** Debugging ("awfully under-researched"); mining version histories ("only two or three papers"); also acceptable: specification mining, automated program repair, mutation testing, the roughly seven-year change of direction.
- **Acknowledged cost (2):** Harder to publish (reviewers ask "Is that good, or is that bad?"), consoling PhD students after rejections, self-doubt, proposals asked "why should it be you?", easier when tenured or well funded.
- **Transfer to industry (2):** A thoughtful position. For example: internal tooling or quality work nobody owns can be high-impact but hard to get credit for. Strong answers connect to Ball's "big blocks of uninterrupted time" (Ch. 1) or Krishnamurthi's safety/liveness portfolio (Ch. 2).
