# Answer Key — Unit 2 Test (Chapters 4–6)

## Part A — Matching

| # | Term | Answer |
|---|---|---|
| 1 | Delta debugging | C |
| 2 | Mining software repositories | D |
| 3 | Boundary-value testing | A |
| 4 | Test oracle | E |
| 5 | Linear temporal logic | F |
| 6 | Defect injection and detection | B |
| 7 | Validation | G |
| 8 | Conceptual integrity | H |
| 9 | Backward compatibility | I |
| 10 | Happy path | J |

Distractors: K, L.

## Part B — Multiple choice

| Q | Ans | Q | Ans |
|---|---|---|---|
| 11 | b | 16 | a |
| 12 | a | 17 | c |
| 13 | b | 18 | d |
| 14 | c | 19 | a |
| 15 | a | 20 | c |

## Part C — what a full-credit answer includes (6 pts each)

**21.** Any two, accurately described. *Zeller:* model vs. reality → debugging as a systematic, experimental, automatable science (delta debugging, *Why Programs Fail*). *Kernighan:* getting programs right (and wanting the right thing) → pragmatic testing and debugging advice, books, and tools others can use. *Holzmann:* "a dumb machine... can outsmart me" → finding your own mistakes *before* the machine does, which became model checking, static analysis, and coding standards. Full credit explains *why* each emphasis follows (experiment vs. teach-and-tool vs. prevent-and-prove).

**22.** For each defect, record the phase introduced and the phase found. The distance between them is how far it "traveled." Bugs that travel far (a requirements defect found in operations) are expensive, and checks should be strengthened at the phase of introduction. Boundary tests written during coding catch coding-phase defects *in the coding phase*. That raises coding-phase detection, shortens travel, and shifts detection counts earlier. (It does little for requirements defects, which need earlier checks.)

**23.** No contradiction. Tests are necessary but not sufficient. Unit testing frameworks and systematic test design (boundaries, narrowing) make testing cheap and effective. Holzmann's warning is about *overconfidence*: a few passing (often happy-path) tests don't rule out latent defects. Zeller says the same about the happy path and adds that critical software needs systematically derived tests or proofs. Strong answers mention Dijkstra (testing shows presence, not absence) or the oracle problem.

**24.** Shared view: impact means others actually *use* or *understand* the work (tools, datasets, manuals, teaching, books), and the work is tested by contact with users and strangers. Contrast: paper counts reward incremental, publishable output (Zeller: "yet another paper"; Holzmann: Bell Labs had "no requirement to publish," yet he insists on explaining). Bonus: Zeller's Defects4J example.

**25.** *Advantage:* conceptual integrity. One coherent design and style, deep understanding of every line, so bugs are fixed fast. *Risk:* a bus factor of one. If the author stops maintaining it, no one understands the code. It may also discourage contributors and slow features. Strong answers propose mitigations (design documents, a co-maintainer, tests as a specification).

## Part D

**(a)** (5 pts; 0.5 per good test, +1 for at least one Unicode test.) Examples:
- `username="ab"` → 400 (below min); `"abc"` → 201 (at min); 20 chars → 201; 21 chars → 400
- `age=12` → 400; `13` → 201; `120` → 201; `121` → 400; `age=-1` → 400; `age="thirty"` → 400
- `zip="8601"` → 400; `"860111"` → 400; `zip="٨٦٠١١"` (Arabic-Indic digits) → 400 if the rule is ASCII digits; `zip="86011; DROP TABLE users"` → 400
- `username=""`, missing fields, `null`, a 5,000-character username, a zero byte in the username → 400, not 500

**(b)** (4) Use the failing body as input. Define `test(input)` → FAIL if the service *crashes in the same way* (same exception/stack signature), PASS if it doesn't crash, UNRESOLVED if the input is malformed for other reasons (or use a JSON-aware / hierarchical reduction so candidates stay valid). Run ddmin to get a 1-minimal body and add it as a regression test. Key property: the test function must check for the *same* failure, or the reduction drifts to a different bug.

**(c)** (3) Introduced: **requirements**. Detected: **testing** (by a fuzzer). Earlier check: a requirements review checklist for input encodings (Unicode normalization, length in bytes vs. characters), or a requirements-phase test-case derivation that includes Unicode inputs.

**(d)** (3) For example: "Usernames may contain any printable Unicode character; note that visually identical names (é vs. e + ◌́) are treated as different users." Writing it down exposes the impersonation and normalization problem. Credit any sentence that makes the hidden design question visible.

## Part E — rubric (15 pts)

| Criterion | Points |
|---|---|
| Clear thesis answering the prompt | 3 |
| Accurate, specific use of the interviews (correctly attributed) | 5 |
| Correct use of key terms | 3 |
| Synthesis across chapters, not a list | 3 |
| Writing quality | 1 |

**E1 guidance.** A strong "compatible" answer notes they describe different *aspects*: history (Krishnamurthi), practice (Zeller: nobody runs a pure waterfall), contracting (Kernighan), and measurement (Holzmann). A strong "conflict" answer contrasts Zeller's "never done" with Holzmann's use of the phase structure at JPL.

**E2 guidance.** Good answers place LLMs as hypothesis *generators* (suggesting causes, tests, invariants) paired with independent *checkers* (execution, provers, oracles). They address the oracle problem and latent defects, and may cite Krishnamurthi's correlated failure (Ch. 2).
