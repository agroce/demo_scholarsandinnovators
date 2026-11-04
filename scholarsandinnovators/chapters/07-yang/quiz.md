# Quiz — Chapter 7: Jean Yang

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** Why did Yang choose to work on programming tools rather than become a software developer?

- (a) She found the tooling "janky" and realized people could make it better
- (b) Her parents insisted she study compilers
- (c) Developer jobs were scarce when she graduated
- (d) She wanted to build video games

**2.** What lesson did Yang take from the verified operating system she built as an intern with Chris Hawblitzel?

- (a) Full verification is always worth 30 person-years
- (b) Operating systems cannot be verified
- (c) Choosing the right abstractions can deliver strong reliability for far less effort
- (d) Type-safe languages are too slow for operating systems

**3.** How does Yang distinguish information flow control from access control?

- (a) Access control is enforced by hardware; information flow by the OS
- (b) Information flow control also keeps secret any result that depends on a secret value
- (c) Access control applies only to databases
- (d) They are two names for the same mechanism

**4.** Where did Yang find that her language's security guarantees were "subverted"?

- (a) In the garbage collector
- (b) In unit tests
- (c) In the type checker
- (d) At calls to the database and across network API calls

**5.** At Akita, what did users turn out to need most?

- (a) Rich Daikon-style invariants about their data
- (b) Formal proofs of API correctness
- (c) Knowing which API endpoints they even had
- (d) Automatic code generation

**6.** What is Yang's third principle?

- (a) In a system with emergent behavior, observation may be all you have
- (b) Always write the specification before the code
- (c) Never use an abstraction you didn't build
- (d) Ship daily

**7.** Yang's main criticism of AI "demo culture" is that:

- (a) demos take too long to build
- (b) users dislike AI demos
- (c) demos should never be built before products
- (d) people like the demos, but many can never become systems that keep working day after day

---

## Part B — Short answer (3–5 sentences each)

**8.** Yang says "I think that research should not be practical right now." Explain her reasoning, including what she means by a "platform shift."

**9.** Yang argues that software design, done well, is "a lot of process and discipline." Describe the evaluation practice she says a good designer would use, and contrast it with how she says PL researchers often evaluated their tools.

---

## Part C — Short essay (1–2 paragraphs)

**10.** Yang says "if you can't prove guarantees about your system, I think the next best thing is watching the system." Explain what she means, using her Akita work and her idea of execution traces as "retrospective data." Then argue for one kind of system where observation is an adequate substitute for proof and one where it is not. Use at least one other chapter (for example Ball, Schneider, or Holzmann) in your argument.
