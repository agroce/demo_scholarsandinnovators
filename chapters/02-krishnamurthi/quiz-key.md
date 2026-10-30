# Answer Key — Chapter 2 Quiz (Krishnamurthi)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **d** | "When the means of production becomes really easy... the means of verification have to scale up." |
| 2 | **b** | Concurrency-oriented programming: "this VM that enables you to have as many threads as you want." |
| 3 | **a** | Paul Graham, "Beating the Averages." |
| 4 | **a** | (b) is safety. Shriram applies the pair to his research portfolio. |
| 5 | **c** | "You want a pair of artifacts to check against... provided they're different!" |
| 6 | **c** | Methodology content taught in the last month; waterfall derived "from first principles." |
| 7 | **b** | Credits people like Dawson Engler for the shift. |

## Part B — what a full-credit answer includes

**8.** A *mistake* is a one-off slip (typo, misread, wrong box). A *misconception* is a consistent, wrong mental model that produces predictable errors. The regex user's problem isn't a bad regex (the proximate cause). It is a misunderstanding of what regular expressions can do: HTML's nested structure isn't a regular language (the root cause). Fixing it means going "two levels of education deeper," not handing over a better regex.

**9.** One of Shriram's examples explained correctly. For instance: when objects were expensive you would ration them, and cheap allocation and GC made object-heavy design patterns possible. Or: cheap IP packets made TCP's retransmission-based reliability possible. The student's own example should show a change in *kind* of use, not just more use. Examples: free CI changing when tests run, cheap cloud VMs enabling large fuzzing campaigns, LLMs making throwaway scripts trivial.

## Part C — rubric (10 points)

- **Specs from below (3 pts):** Concrete examples/tests pin down specific input→output behavior. They are precise but cover only a finite set of cases.
- **Specs from above (3 pts):** Types/signatures and contracts describe *all* inputs abstractly, with "some lossiness": they rule out wrong kinds of answer but don't pin down the exact answer.
- **UML/OCL point (1 pt):** Class diagrams just restate the code. OCL and sequence charts add a *different* view of behavior.
- **Proposed practice (3 pts):** Concrete and plausible. Examples: write a purpose statement and examples before each function; draw a sequence diagram for every new cross-service feature; hold a "crit" before implementation; write property-based tests from a separate spec. Best answers explain *what the new representation captures that code doesn't*.
