# Quiz — Chapter 9: Fred B. Schneider

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** Schneider says he has worked in only one area. What is it?

- (a) Programming language design
- (b) Operating systems
- (c) Building trustworthy systems
- (d) Machine learning

**2.** According to Schneider, what math does a programmer most need?

- (a) Formal logic
- (b) Calculus
- (c) Probability and statistics
- (d) Linear algebra

**3.** Why does Schneider say batch-era programmers mentally simulated their programs?

- (a) Debuggers were forbidden in universities
- (b) Turnaround was an hour or two, so trial and error was too expensive
- (c) Programs were too short to need testing
- (d) Compilers repaired all errors automatically

**4.** What did Schneider prove about reference monitors?

- (a) They can enforce any security policy
- (b) They can enforce only liveness properties
- (c) They cannot be implemented in hardware
- (d) They can enforce only safety properties, so information flow can't be enforced by one

**5.** What problem with C does Schneider say Rust's ownership model prevents?

- (a) A later programmer breaking an undocumented memory ownership model with a small change
- (b) Slow compilation
- (c) Programs that are too large
- (d) Lack of object orientation

**6.** Schneider explains Agile development as:

- (a) a way to avoid writing specifications
- (b) a management fad
- (c) engineering's standard practice of building prototypes, applied to software
- (d) the same thing as the waterfall model

**7.** What does Schneider say is the real divide between software that works and software that doesn't?

- (a) Large companies vs. small ones
- (b) People: some pieces are built by really good people, others by mediocre ones
- (c) Open source vs. proprietary
- (d) Safety-critical vs. ordinary domains

---

## Part B — Short answer (3–5 sentences each)

**8.** Explain the difference between a safety property and a liveness property, with one example of each. Why can a reference monitor enforce only the first kind?

**9.** Schneider distinguishes how much of the *code* testing exercises from how much of the *specification* it exercises. Explain the difference, and explain why he thinks runtime verification could make testing better.

---

## Part C — Short essay (1–2 paragraphs)

**10.** Schneider argues that AI-generated code is different from library code you don't understand, because "the screen-update code has been built and inspected by people who you trust, but the AI generated code has not been looked at by anyone." Explain his assurance and accountability concerns. Then propose and defend a policy for using AI coding tools on a high-consequence system, drawing on at least one other chapter (for example Hoodlet, Yang, or Holzmann).
