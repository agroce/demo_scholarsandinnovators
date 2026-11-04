# Unit 1 Test — Chapters 1–3 (Ball, Krishnamurthi, Liskov)

*About 75 minutes. Closed book; one page of handwritten notes allowed (suggested). Total: 100 points.*

| Part | Content | Points |
|---|---|---|
| A | Matching key terms | 20 |
| B | Multiple choice | 20 |
| C | Short answer | 30 |
| D | Applied problem | 15 |
| E | Synthesis essay (choose one) | 15 |

---

## Part A — Matching (2 points each)

Write the letter of the best definition next to each term. Each letter is used at most once, and two letters are not used.

| # | Term | | Letter | Definition |
|---|---|---|---|---|
| 1 | Predicate abstraction | | A | A property stating that something good eventually happens |
| 2 | Representation invariant | | B | Mapping from a valid concrete representation to the abstract value it represents |
| 3 | Liveness property | | C | Tracking only the truth values of chosen boolean predicates to get a finite model of a program |
| 4 | Abstraction function | | D | A condition on an ADT's internal data that holds whenever clients can observe the object |
| 5 | Correlated failure | | E | Two supposedly independent checks that fail in the same way for the same reason |
| 6 | Smoke test | | F | Inserting small faults into a program to measure how many a test suite detects |
| 7 | Byzantine failure | | G | A quick, shallow check that a build's most important functions basically work |
| 8 | Mutation testing | | H | A failure in which a component may behave arbitrarily, including sending conflicting messages |
| 9 | Gradual typing | | I | Mixing typed and untyped code in one program so types can be added incrementally |
| 10 | Test-dead code | | J | Code that a particular test does not execute |
| | | | K | A property stating that something bad never happens *and* something good eventually happens |
| | | | L | A test written before the code it tests, per TDD |

---

## Part B — Multiple choice (2 points each)

**11.** Which pair of interviewees most directly *disagree* about what has stayed constant in computing?

- (a) Ball ("details matter") and Krishnamurthi ("nothing," except humans)
- (b) None; all three give the same answer
- (c) Krishnamurthi ("language") and Liskov ("specification")
- (d) Liskov ("modularity") and Ball ("abstraction")

**12.** Which statement would **all three** interviewees most likely endorse?

- (a) Specifications and verification become *more* important as code becomes cheaper to produce
- (b) Rust should replace all other systems languages
- (c) AI will soon make testing unnecessary
- (d) TDD is the best development methodology

**13.** In SLAM, a *spurious counterexample* (one the real program cannot actually execute) leads the tool to:

- (a) report the bug to the developer anyway
- (b) switch to random testing
- (c) give up and report "unknown"
- (d) refine the abstraction by adding predicates and check again

**14.** A `Queue` and a `Stack` both offer `put(x)` and `get()`. The substitution principle says neither is a subtype of the other because:

- (a) their method names differ
- (b) their specified behavior differs, so client code relying on one would be surprised by the other
- (c) one is implemented with an array and the other with a linked list
- (d) their argument types differ

**15.** Shriram's claim that "anytime you make something 10x cheaper, it changes the way you use it" is best illustrated by:

- (a) PBT originating in Haskell
- (b) Lean being written in Lean
- (c) the waterfall model being derived from 1955 constraints
- (d) Erlang processes being cheap enough to build supervision patterns from many processes

**16.** Ball describes symbolic execution as a blend because it:

- (a) combines unit and integration tests
- (b) is both automated and interactive theorem proving
- (c) uses both C and Rust
- (d) follows concrete control-flow paths (dynamic-like) while leaving inputs symbolic (static-like)

**17.** Liskov's key move in viewstamped replication was to:

- (a) eliminate transactions
- (b) put dedicated replicas in charge of a protocol rather than having clients coordinate
- (c) let clients coordinate through distributed locks
- (d) assume all replicas might be malicious

**18.** Which is a *safety* property?

- (a) The program eventually terminates
- (b) Two processes are never simultaneously in the critical section
- (c) Every submitted print job is eventually printed
- (d) The server eventually responds to every request

**19.** Shriram objects to extracting verification conditions *from the program itself* (without an independent specification) because:

- (a) the program is "definitionally correct" relative to its own extraction, so the check can only detect *changes*, not wrongness
- (b) verification conditions are too slow to generate
- (c) solvers can't handle them
- (d) it violates the substitution principle

**20.** Ball's bullet-holed bomber analogy warns that:

- (a) the cases that most need attention may be invisible in the data we collect
- (b) LLMs are worse than humans at every task
- (c) more armor is always better
- (d) fuzzing finds only shallow bugs

---

## Part C — Short answer (6 points each; 4–6 sentences)

**21.** Explain Shriram's "means of production vs. means of verification" thesis. Then use it to explain *why* Ball's and Liskov's interest in pre/postconditions and specifications is likely to matter more, not less, in an era of AI-generated code.

**22.** Ball says the MakeCode team tests its compiler with automated regression tests but tests its GUI mostly by hand and with a weekly smoke test. Using the idea of return on investment, explain why this split might be reasonable, and describe one situation in which it would be a mistake.

**23.** Compare Liskov's complaint that the Smalltalk community was "implementation-oriented" about subclasses with Shriram's complaint that UML class diagrams are "just a simplification of the code." What common mistake are both describing?

**24.** Shriram reinvented the waterfall model with his students "from first principles," drawing on Kuhn's historicist approach. Describe this teaching technique and explain what students gain from deriving a "mocked" method instead of being told what's wrong with it.

**25.** Liskov says, "your team is no better than your weakest programmer" unless compilers enforce modularity. Ball says developers "want to peek behind the interface" because documentation is insufficient. Are these two observations in tension? Explain.

---

## Part D — Applied problem (15 points)

You are given this Python class, intended to represent a set of integers:

```python
class IntSet:
    def __init__(self):
        self._items = []          # representation

    def insert(self, x: int):
        if x not in self._items:
            self._items.append(x)

    def remove(self, x: int):
        if x in self._items:
            self._items.remove(x)

    def contains(self, x: int) -> bool:
        return x in self._items

    def size(self) -> int:
        return len(self._items)
```

**(a)** (3 pts) Write the **representation invariant** for `IntSet`.

**(b)** (3 pts) Write the **abstraction function**.

**(c)** (4 pts) A teammate proposes `class SortedIntSet(IntSet)` that keeps `_items` sorted and overrides `insert` to keep it sorted. It also adds `min()`. Is `SortedIntSet` a behavioral subtype of `IntSet`? Justify using the substitution principle.

**(d)** (5 pts) Another teammate proposes `class BoundedIntSet(IntSet)` whose `insert` *silently ignores* the insertion once the set holds 10 elements. Is this a behavioral subtype? Write one **property-based test** (pseudo-code or Hypothesis-style Python) stated against `IntSet`'s specification that would expose the problem. Explain why this test is an example of checking one artifact against a *different* one (Shriram's "pair of artifacts").

---

## Part E — Synthesis essay (15 points; choose ONE; ~1 page)

**E1.** All three interviewees were asked about AI's impact on software development. Ball calls himself "sort of a skeptic," Shriram (in his postscript) calls agentic coding "one of the 5 most important programming technologies I've seen," and Liskov says "modularity is all there is." Build a single argument about what software engineers will spend their time on in ten years, drawing on *at least one specific idea from each chapter*.

**E2.** Shriram distinguishes "safety" (short-term, likely impact) from "liveness" (long-term, speculative) research. Classify *two* contributions from Ball's or Liskov's careers (e.g., SLAM, CLU, the substitution principle, viewstamped replication) as safety or liveness *at the time they were begun*. Did any start as one and become the other? What does this suggest about Ball's worry that deep, long-term research is "under pressure"?

**E3.** "Every bug has its own favorite method to find it" (Groce, Ch. 2) and "there's no silver bullet" (Ball, Ch. 1). Yet Shriram notes that progress needs "people who are dogmatic about it to push each of those forward." Discuss the tension between pluralism and conviction in software quality, using examples of specific techniques from the three chapters.
