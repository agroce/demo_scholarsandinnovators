# Answer Key — Chapter 7 Quiz (Yang)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **a** | "I felt the tooling was generally kind of janky... people could make the tooling better." |
| 2 | **c** | 9 person-months vs. 30 person-years: "choose the right abstractions and get the right reliability." |
| 3 | **b** | "If we have anything conditional on who can see it, the results of those values are also kept secret." |
| 4 | **d** | Plain SQL calls and network API calls fall outside the language's guarantees. |
| 5 | **c** | "People don't know what API endpoints they even have." |
| 6 | **a** | The first two: pick abstractions by goals; watch where they leak. |
| 7 | **d** | "What people want is not what they need." |

## Part B — what a full-credit answer includes

**8.** AI is a platform shift: a change in the base on which software is built, which resets tools and practices. Nobody knows what software development will look like even in a year, so industry R&D can only plan months ahead. What happens in the next five years will shape the next 15–20. Researchers can afford to make longer-term bets, preparing good work for several possible futures ("if the world looks like A... if the world looks like B"). Near-term practical work risks being obsolete or "boring."

**9.** A good designer recognizes that watching someone use a tool for 30 minutes won't answer the real question. They would use a well-crafted survey or interview asking how the tool has helped over a longer period (for example, the past month). Designers frame the problem and choose a method that can test it. Yang says PL researchers often concluded a short study was too weak and a longitudinal one impossible, so they did no evaluation at all: "we looked at the code with our own eyes."

## Part C — rubric (10 points)

- **Explains the claim (3):** When a system is too complex, built from services you don't control, or has emergent behavior, you can't prove properties end to end. You can record what it does (execution traces, API traffic) and analyze it afterwards, the way economists use "found experiments."
- **Uses Akita accurately (2):** Watching API calls; users' first need was an inventory of their endpoints, a simple invariant.
- **Two contrasting systems (3):** For example, adequate: a SaaS product with fast rollback, where observed failures are cheap and fixable. Not adequate: flight software or a medical device (Holzmann's JPL, Hoodlet's IVD devices), where the first failure may be catastrophic and there may be no second chance. Observation only covers behaviors that happen; proof covers all.
- **Cross-chapter use (2):** Ball's assurance spectrum; Schneider's assertional reasoning and runtime verification (RV is a middle ground: observation checked against a specification); Holzmann's "it's not just programming."
