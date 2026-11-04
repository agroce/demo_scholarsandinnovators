# Answer Key — Unit 1 Test (Chapters 1–3)

## Part A — Matching

| # | Term | Answer |
|---|---|---|
| 1 | Predicate abstraction | C |
| 2 | Representation invariant | D |
| 3 | Liveness property | A |
| 4 | Abstraction function | B |
| 5 | Correlated failure | E |
| 6 | Smoke test | G |
| 7 | Byzantine failure | H |
| 8 | Mutation testing | F |
| 9 | Gradual typing | I |
| 10 | Test-dead code | J |

Distractors: K (a conjunction of safety and liveness, a trap for students who half-remember "every property is the intersection of the two") and L.

## Part B — Multiple choice

| Q | Ans | Q | Ans |
|---|---|---|---|
| 11 | a | 16 | d |
| 12 | a | 17 | b |
| 13 | d | 18 | b |
| 14 | b | 19 | a |
| 15 | d | 20 | a |

Note on 13: the CEGAR refinement loop is described in the Ch. 1 notes. The interview itself only names predicate abstraction. Drop this question if the class didn't cover the notes.

## Part C — what a full-credit answer includes (6 pts each)

**21.** (3) The thesis: cheap, scalable production moves the bottleneck to trust and verification (food supply chain; code moving from "every line I wrote" to LLM output). (3) Application: when you didn't write the code, you need an *independent* statement of intent to check it against. Pre/postconditions and specifications are exactly that. Liskov: "specifications are gonna matter tremendously"; "if you can give a... precise specification, then, in theory, AI could develop the code." Ball notes we're already writing annotations for agents.

**22.** (3) ROI: compiler bugs silently corrupt *every* user program, are well suited to automated oracles (expected output), and the tests are cheap to maintain. GUI tests are brittle and costly to maintain ("a tax"), and visible GUI breakage is usually caught quickly by humans. (3) A mistake when GUI failures are high-risk or invisible: accessibility regressions, a GUI that controls hardware or safety functions, a large release with few manual testers, or a bug that corrupts saved user programs.

**23.** Both describe confusing a description of *structure or implementation* with a description of *behavior and intent*. A subclass defined by how its code differs, like a class diagram generated from code, says nothing about what clients may rely on. Liskov's fix is a behavioral specification. Shriram's is OCL, sequence charts, and other representations "fundamentally different from the code."

**24.** Technique: students first gain shared experience (building a real system without a method), then put themselves in a historical setting (1955, punch cards, very expensive changes) and derive a process. They rediscover requirements, specification, design, and testing phases in sequence. Gains: respect for the reasoning behind the method; seeing that a method fits its *constraints*; understanding its weaknesses as consequences, not caricatures; and the general lesson that well-crafted definitions only look obvious afterward.

**25.** Strong answers see a partial tension and resolve it. Liskov wants enforced boundaries so clients *can't* depend on internals. Ball observes that people break abstraction when the *specification is inadequate*. Both point to the interface contract as the real problem: enforcement only works if specifications are rich enough that clients don't need to peek. Bonus: Ball's Java decompiling example shows enforcement can be circumvented when the incentive is high.

## Part D

**(a)** No duplicates in `_items`: for all i ≠ j, `_items[i] != _items[j]`. (Also acceptable: every element is an `int`.)

**(b)** AF(`_items`) = { x | x in `_items` }, the mathematical set of the list's elements. Order is irrelevant.

**(c)** Yes, provided `insert`, `remove`, `contains`, and `size` still meet `IntSet`'s specification. Through `IntSet`'s methods, the client can't observe order. The rep invariant is *strengthened* (sorted and no duplicates), which is fine. `min()` is a new method and doesn't affect behavior through supertype methods. (If any `IntSet` method exposed iteration order, discuss whether order was part of the spec.)

**(d)** Not a behavioral subtype. `IntSet.insert` has the postcondition `contains(x)`, and `BoundedIntSet` weakens it. Example test:

```python
@given(st.lists(st.integers(), max_size=50), st.integers())
def test_insert_then_contains(xs, y):
    s = make_set()          # factory: IntSet() or BoundedIntSet()
    for x in xs: s.insert(x)
    s.insert(y)
    assert s.contains(y)
```

It fails for `BoundedIntSet` once there are more than 10 distinct values. Pair of artifacts: the property comes from the supertype's *specification*, an artifact independent of the subtype's *implementation*. So the test can catch the subtype's deviation. A test derived from `BoundedIntSet`'s own code would pass trivially.

Rubric: 2 pts "not a subtype" with postcondition reasoning; 2 pts a correct test; 1 pt pair-of-artifacts explanation.

## Part E — rubric (15 pts)

| Criterion | Points |
|---|---|
| Clear thesis that answers the prompt | 3 |
| Accurate, specific use of the interviews (quotes or close paraphrase, correctly attributed) | 5 |
| Correct use of key terms | 3 |
| Synthesis: ideas from different chapters connected, not just listed | 3 |
| Writing quality | 1 |

**E2 guidance.** SLAM (begun 1999 on "dog slow" Simplify, betting on the SMT revolution) started as *liveness* and became *safety*-level impact. The substitution principle started as a talk, an apparent safety-sized contribution, and became foundational. PBFT came from looking at DARPA RFPs, so arguably safety-framed, but it rested on years of VR work (liveness). Good essays notice the categories are clearer in hindsight.
