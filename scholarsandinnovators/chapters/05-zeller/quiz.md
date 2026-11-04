# Quiz — Chapter 5: Andreas Zeller

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** According to Zeller, what has "absolutely stayed the same" about programming?

- (a) The waterfall development process
- (b) The dominance of object-oriented programming
- (c) The need to program in assembly language
- (d) The astonishment when a program doesn't match your model of how it should work

**2.** Delta debugging takes a failure-inducing input and:

- (a) systematically and automatically reduces it to a minimal input that still causes the failure
- (b) generates random new inputs until a different failure appears
- (c) proves the program correct for that input
- (d) rewrites the program so the input no longer causes a failure

**3.** Which of these does Zeller *not* list among the biggest advances in software engineering?

- (a) Version control
- (b) Formal verification of all operating system kernels
- (c) Unit tests
- (d) The naturalness of software

**4.** Zeller's big-screen productivity example illustrates:

- (a) the naturalness of software
- (b) a confounding variable that makes empirical SE studies hard to interpret
- (c) the importance of good hardware for developers
- (d) why unit tests should run on large monitors

**5.** Zeller's "worst practice" in software development is:

- (a) not using version control
- (b) using LLMs for code generation
- (c) only testing the happy path
- (d) writing too many unit tests

**6.** Zeller's main objection to the idea that LLMs can replace programmers in debugging and maintenance is that:

- (a) understanding what code does requires experimentation, and predicting behavior is exponentially hard or undecidable
- (b) LLMs were not trained on enough open-source code
- (c) LLMs are too expensive to run
- (d) LLMs cannot generate syntactically valid code

**7.** Zeller's favorite development process is:

- (a) the waterfall model
- (b) the spiral model
- (c) formal methods for every project
- (d) test-driven development

---

## Part B — Short answer (3–5 sentences each)

**8.** Zeller gives three objections to formally verifying all software. Name them, and explain which one also applies to *any* specification-based technique, including testing against a spec.

**9.** Explain why a validation routine that checks a US zip code with the regular expression `\d{5}` might accept input that breaks the system later. Connect your answer to Zeller's "unhappy paths."

---

## Part C — Short essay (1–2 paragraphs)

**10.** Zeller urges researchers to "go out in the dark and shed light there" rather than adding "yet another twist" where "the light is." Explain what he means, using two examples from his own career. Then discuss one cost of this strategy that he acknowledges, and whether the same advice applies to a software engineer choosing projects at a company.
