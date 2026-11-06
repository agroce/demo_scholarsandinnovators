# Answer Key — Chapter 1 Quiz (Ball)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **d** | "I think there's just so many layers of abstraction now." |
| 2 | **d** | "Details really matter"; software's "huge discontinuity" compared to continuous functions. |
| 3 | **c** | SLAM applied abstraction-based (predicate abstraction) model checking to Windows drivers. |
| 4 | **c** | Graf–Saïdi predicate abstraction tracks a finite set of boolean predicates, giving a finite over-approximation. |
| 5 | **b** | Compiler regression tests; GUI gets user/manual testing and "a weekly smoke test." |
| 6 | **b** | Change test-dead regions; output on that test must be unchanged (Le, Afshari, Su, PLDI 2014). |
| 7 | **a** | "The program in the case of Flash Fill is never even seen": users check the results, not the code. |

## Part B — what a full-credit answer includes

**8.** *Dynamic:* it follows specific control-flow paths, one at a time, as an execution would. *Static:* the inputs are symbolic, not concrete, so one path stands for *all* inputs satisfying its path condition. Full credit mentions path conditions or constraints (and ideally a solver). Bonus: partial evaluation as a related blend.

**9.** Returning planes had holes only where a plane could be hit and survive. The fatal hits are invisible because those planes didn't return (survivorship bias). Likewise, a benchmark shows success on the cases someone thought to include. For LLMs, benchmarks built for *human* failure modes may miss the different ways a model fails ("passing a test for the wrong reasons"). Full credit ties this to the need for negative examples and counterexamples, or notes that the same limit applies to any test suite.

## Part C — rubric (10 points)

- **Edge 1 (3 pts):** More context makes agents more capable. Grunge work like porting .NET versions gets automated, and tacit knowledge gets written down, which also helps humans.
- **Edge 2 (3 pts):** "Eventually, you tell it so much that you may not be needed anymore". The person documenting may be automating away their own role. There may also be a cost or ROI question about how much annotation is worth doing.
- **Comparison (4 pts):** A defensible position either way. *Similar:* both are machine-consumable statements of intent; Ball draws the parallel himself. *Different:* breadcrumbs are informal English, not checkable, and often describe process and context ("why") rather than behavior ("what"). Pre/postconditions are precise and can be verified. Strong answers mention whether the documentation could serve as an *independent* check (connects to Chapter 2's correlated failure).
