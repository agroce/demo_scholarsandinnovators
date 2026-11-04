# Quiz — Chapter 2: Shriram Krishnamurthi

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** Krishnamurthi's food supply chain analogy supports which claim?

- (a) Programmers should write all their own code
- (b) Open-source software is inherently less trustworthy than proprietary software
- (c) LLMs will eventually make testing unnecessary
- (d) When the means of production become cheap and scalable, the means of verification must scale up

**2.** According to Krishnamurthi, the key idea of Erlang is not that it is functional, but that:

- (a) it eliminates the need for message passing
- (b) its VM makes processes/threads so cheap that new concurrency patterns become possible
- (c) it has a strong static type system
- (d) it compiles to the JVM

**3.** The *Blub paradox* describes programmers who:

- (a) see less powerful languages as obviously deficient, but see features of more powerful languages as unnecessary
- (b) prefer dynamically typed languages
- (c) write the same bug repeatedly
- (d) can't learn more than one language

**4.** In temporal logic, a *liveness* property states that:

- (a) something good eventually happens
- (b) something bad never happens
- (c) the system has no dead code
- (d) the program always terminates in bounded time

**5.** Krishnamurthi objects to using an LLM to generate both code and its tests because:

- (a) LLM-generated tests are too slow to run
- (b) tests should always be written before code (TDD)
- (c) it produces correlated failure: you need two genuinely different artifacts to check against each other
- (d) LLMs can't write syntactically valid tests

**6.** In Krishnamurthi's backwards software engineering course, students:

- (a) used only TDD throughout the semester
- (b) studied methodologies for two months before writing any code
- (c) built a system for a real client first, then derived the waterfall model from 1955-era constraints
- (d) were assigned a different methodology every week

**7.** Krishnamurthi says model checking's meaning drifted from ______ to ______.

- (a) hardware → databases
- (b) a sound and complete analysis of a model → bug-finding exploration of a program
- (c) testing → proof
- (d) automated → manual

---

## Part B — Short answer (3–5 sentences each)

**8.** Explain the difference between a *mistake* and a *misconception*. Use Krishnamurthi's example of the programmer trying to parse HTML with a regular expression.

**9.** Krishnamurthi claims "anytime you make something 10x cheaper, it changes the way you use it." Explain this with one of his examples (objects, threads, IP packets, phone calls, or languages) and one example of your own.

---

## Part C — Short essay (1–2 paragraphs)

**10.** Krishnamurthi argues that design in other fields (architecture, electrical engineering) is "multimodal, multi-representational, multi-step," while software developers too often begin by "typing DEF space." Using his discussion of UML, OCL, and HtDP's design recipe, explain what he means when he calls examples "specs from below" and types "specs from above." Then propose *one* concrete practice your team could adopt to make your own design process more multi-representational.
