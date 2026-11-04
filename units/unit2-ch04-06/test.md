# Unit 2 Test — Chapters 4–6 (Holzmann, Zeller, Kernighan)

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
| 1 | Delta debugging | | A | Choosing tests at and around the edges of the input domain: empty, one, maximum, off-by-one |
| 2 | Mining software repositories | | B | Recording, for each defect, the phase in which it was introduced and the phase in which it was found |
| 3 | Boundary-value testing | | C | Automatically shrinking a failure-inducing input to a minimal one that still fails |
| 4 | Test oracle | | D | Extracting knowledge from version histories, issue trackers, and code reviews |
| 5 | Linear temporal logic | | E | The mechanism that decides whether a test's observed behavior is correct |
| 6 | Defect injection and detection | | F | A logic over infinite executions with operators such as "always" and "eventually" |
| 7 | Validation (vs. verification) | | G | Checking that you are building the *right* product, one that meets real needs |
| 8 | Conceptual integrity | | H | A design that reflects a single coherent set of ideas, as if from one mind |
| 9 | Backward compatibility | | I | Designing a new system so existing programs, tools, and users keep working |
| 10 | Happy path | | J | The expected, error-free scenario a system is designed for |
| | | | K | A proof that a program terminates on all inputs |
| | | | L | A test written only after the code is complete |

---

## Part B — Multiple choice (2 points each)

**11.** All three interviewees name a version of the same "worst practice." Which?

- (a) Using too many programming languages
- (b) Believing a program works because it passes a few happy-path tests
- (c) Writing documentation before code
- (d) Using version control incorrectly

**12.** Kernighan's students tested an add-up-numbers program with 100 numbers. In Zeller's terms, the missing tests are mostly:

- (a) boundary and unhappy-path tests
- (b) formal proofs
- (c) performance tests
- (d) GUI tests

**13.** Which pairing of interviewee and view of the waterfall model is correct?

- (a) Holzmann: "never ever been done by anyone really"
- (b) Kernighan: a contracting model suited to adversarial relationships
- (c) Zeller: a scientific framework for tracking defects
- (d) Kernighan: re-derived from 1955 constraints with students

**14.** Delta debugging and Kernighan's advice about debugging share which core idea?

- (a) Rewriting the program in a safer language
- (b) Proving the program correct before running it
- (c) Systematically narrowing a large space of possibilities to isolate a cause
- (d) Asking an LLM to explain the failure

**15.** Holzmann says writing a tool's manual is important because:

- (a) explaining the tool to a stranger reveals design decisions that don't make sense
- (b) it replaces testing
- (c) it is legally required for safety-critical software
- (d) users never read code

**16.** Zeller's argument that LLMs can't simply replace debugging rests on the claim that:

- (a) predicting what code does requires experimentation, and the underlying problems are exponential or undecidable
- (b) LLMs are trained on too little code
- (c) LLMs can't produce syntactically valid code
- (d) debugging is purely a matter of intuition

**17.** Which pair of interviewees both name Ken Thompson as a top hero?

- (a) Zeller and Kernighan
- (b) Zeller and Holzmann
- (c) Kernighan and Holzmann
- (d) All three

**18.** `G (request → F grant)` is an example of a:

- (a) safety property
- (b) syntax error
- (c) Büchi automaton
- (d) liveness property

**19.** Zeller and Holzmann both describe a divide in how carefully software is built. Both explain it mainly by:

- (a) the cost and visibility of failure
- (b) whether the company is open source
- (c) the size of the development team
- (d) the programming language used

**20.** Kernighan's "structured lunch breaks" story illustrates:

- (a) the value of rest for programmers
- (b) the origins of Agile stand-ups
- (c) a good idea overextended by promoters before settling into practice
- (d) a failed Bell Labs experiment

---

## Part C — Short answer (6 points each; 4–6 sentences)

**21.** Zeller, Kernighan, and Holzmann each describe how they first learned that programs don't do what you expect: Zeller's "astonishment," Kernighan's "hard to get the program to do what you want," Holzmann's "it is always my mistake." Pick two and explain how each experience led to a *different* research or professional emphasis.

**22.** Explain Holzmann's idea of measuring "how far bugs travel." Then explain how Kernighan's "boundary" testing advice, applied during coding, would change those measurements.

**23.** Zeller lists unit testing frameworks among the biggest advances in SE, and Kernighan says the testing chapters of *The Practice of Programming* are his proudest work. Holzmann warns against believing you're done after passing tests. Is there a contradiction? Explain.

**24.** Zeller says SE research is "judged by its usefulness" and urges releasing tools and datasets. Holzmann says writing manuals and teaching are "key parts of being a good scientist." Kernighan says good work is "doing something that other people... will benefit from." What common view of impact do they share, and how does it differ from counting papers?

**25.** Holzmann rewrites every contribution to Spin himself and fixes bugs the same day. Using the terms *conceptual integrity* and *bus factor*, give one advantage and one risk of this practice for a widely used tool.

---

## Part D — Applied problem (15 points)

A web service accepts a request to create a user account with fields `username` (3–20 characters), `age` (integer, 13–120), and `zip` (US five-digit zip code). The current tests are:

```python
def test_create_user():
    r = create_user(username="alice", age=30, zip="86011")
    assert r.status == 201
```

**(a)** (5 pts) Write **eight** additional test inputs (one line each, with the expected outcome), covering both *boundary values* (Kernighan) and *unhappy paths* (Zeller). Include at least one test involving Unicode.

**(b)** (4 pts) A bug report says the service crashes on a 4,000-character JSON body that a fuzzer generated. Describe how you would use **delta debugging** to turn this into a useful regression test. What property must your reduction "test function" check?

**(c)** (3 pts) During triage you find the crash came from a requirement ("usernames may contain any printable character") that never considered Unicode normalization. Following Holzmann's method, in which *phase* was this defect introduced, in which was it detected, and what check would have caught it earlier?

**(d)** (3 pts) Write one sentence of documentation (Holzmann's "write the manual") that would have exposed the design problem in (c).

---

## Part E — Synthesis essay (15 points; choose ONE; ~1 page)

**E1.** Across Chapters 2, 4, 5, and 6, four interviewees describe the waterfall model in four different ways (Krishnamurthi: derived from 1955 constraints; Zeller: never really done; Kernighan: a contract for adversarial relationships; Holzmann: a scientific framework for tracking defects). Write an essay arguing that these views are *compatible*, or that at least two are fundamentally *in conflict*. Use specific claims from the interviews.

**E2.** Zeller calls LLMs "glorified search and remix machines" that can't experiment, Kernighan calls them a real paradigm shift but "ordinary technology," and Holzmann says they "take your breath away" but must be tested "as you would a human being." Using ideas from this unit (debugging as experiment, verification vs. validation, latent defects, test oracles), argue what role LLMs should play in *testing and debugging* specifically.

**E3.** Zeller urges researchers to "go into the dark." Holzmann describes Bell Labs letting "a hundred really smart people... do whatever they want." Kernighan cites Hamming: work on problems that matter. Ball (Chapter 1) worried that time "to go deep" is "under pressure." Write an essay on what conditions produce high-impact software engineering work, and whether those conditions can exist in today's universities or companies.
