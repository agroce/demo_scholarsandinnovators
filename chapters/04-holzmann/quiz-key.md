# Answer Key — Chapter 4 Quiz (Holzmann)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **a** | "When there's a mistake, it is always my mistake, and not the machine." |
| 2 | **a** | Later adds literature, mathematics, physics. |
| 3 | **d** | "A static analyzer that could be used during code reviews." |
| 4 | **c** | "...until Amir Pnueli came along with linear temporal logic, and boom." |
| 5 | **b** | "You sometimes realize, this is really stupid, it shouldn't work this way." |
| 6 | **c** | Defect injection/detection by phase. |
| 7 | **b** | "I'm also the one who has to fix it when it turns out to be broken." |

## Part B — what a full-credit answer includes

**8.** At AT&T, offering bug-finding tools to business units "had very limited success." At JPL, developers listened and asked for a coding standard, training, and tools. The reason is the cost and visibility of failure: "the existence of the lab could depend on mission software working flawlessly," and "you don't want to be the one who wrote those three lines that made the thing fail." Bonus: compare Zeller's cost-of-failure "slope" (Ch. 5) or the medical-device industry.

**9.** Black-box behavioral testing: probing behavior through inputs and outputs without understanding internals and without a formal specification. Limitation: like any testing, it samples a finite set of behaviors and can't show absence of failures. It relies on the tester recognizing "bizarre" answers (an oracle problem). Model checking exhaustively explores a model's states against a formal property. Strong answers mention survivorship bias / benchmark validity (Ball, Ch. 1).

## Part C — rubric (10 points)

- **Method (5):** Record every defect. Determine the phase it was **introduced** in and the phase it was **found** in. Ask why earlier checks missed it. Count introductions and detections per phase. "How far bugs travel" is the distance between injection and detection phase. Strengthen checks first for the bugs that travel farthest. Track metrics across projects. Improvement is gradual.
- **Comparison (5):** *Shriram:* waterfall derived from 1955 constraints, historicist respect. *Zeller:* waterfall "never ever been done by anyone really," favors agile and TDD. *Kernighan:* waterfall as a contracting model for adversarial relationships. Strong answers note they talk about different things: Holzmann uses the phase *structure* as a measurement frame and accepts iteration ("You will have to go back"), while Kernighan and Zeller criticize the *sequential, fixed-spec* way of running a project.
