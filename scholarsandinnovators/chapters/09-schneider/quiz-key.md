# Answer Key — Chapter 9 Quiz (Schneider)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **c** | With three pillars: formal methods (assurance), fault tolerance, security. |
| 2 | **a** | "You don't need calculus—you need formal logic." |
| 3 | **b** | "You didn't just guess and experiment—you mentally simulated the program." |
| 4 | **d** | Reference monitors enforce only safety properties; information flow is not one. |
| 5 | **a** | "The ownership model is part of the Rust language syntax." |
| 6 | **c** | "We're building a sequence of higher-functionality prototypes." |
| 7 | **b** | "The divide is not about projects—it's about people." |

## Part B — what a full-credit answer includes

**8.** A safety property says something bad never happens, such as "no unauthorized file is ever read." A violation occurs at an observable point in a finite execution. A liveness property says something good eventually happens, such as "every request is eventually answered." No finite observation can show it is violated, because the good thing might still happen. A reference monitor sees an execution step by step and must decide before each action whether to allow it, so it can only block observable "bad things": safety properties. (Information flow is a property of sets of executions, a hyperproperty, so it isn't even a property of a single run.)

**9.** Code coverage measures which statements or branches tests execute. Specification coverage measures how much intended behavior tests actually check. If the oracle only detects crashes, high code coverage can still leave most of the spec unchecked (Groce's Bitcoin fuzzing example: near-100% coverage but far fewer mutants killed). Runtime verification monitors executions against formal, possibly temporal, specifications, for example catching a variable going out of range mid-execution. That exercises more of the spec, and it can run in nightly builds and push developers to write specs.

## Part C — rubric (10 points)

- **Assurance (3):** Trusted libraries carry evidence that people examined and tested them. AI code has no such history, so using it adds unexamined "magic" to the stack. For high-consequence systems that is unacceptable without new assurance.
- **Accountability (2):** No clear party is responsible for AI outputs, and no societal infrastructure exists for actions without explanations.
- **Policy (3):** Concrete and defensible. For example: AI code allowed only with human review by someone able to judge it, specs and tests written or reviewed by humans, runtime verification or formal checks for critical properties, provenance recorded in commits, and AI excluded from the most critical components.
- **Cross-chapter (2):** Hoodlet (experts benefit, juniors don't; ~45% vulnerability rate; human in the loop); Yang (demos that can't be maintained); Holzmann (JPL rigor; "it's not just programming").
