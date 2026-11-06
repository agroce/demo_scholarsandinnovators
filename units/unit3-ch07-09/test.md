# Unit 3 Test — Chapters 7–9 (Yang, Hoodlet, Schneider)

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
| 1 | Information flow control | | A | A mechanism that checks every security-relevant action a program attempts against a policy |
| 2 | Observability | | B | Instructions hidden in data an LLM reads that override its intended instructions |
| 3 | Technical inflation | | C | Keeping any value computed from a secret, even through a branch, secret as well |
| 4 | Reference monitor | | D | "Something good eventually happens" |
| 5 | Liveness property | | E | Understanding a system's internal state from its outputs: logs, metrics, traces |
| 6 | Prompt injection | | F | A system becoming insecure because attackers' capabilities grew, not because of flaws introduced when it was built |
| 7 | Invariant | | G | Compromising software by attacking a dependency, registry, build system, or maintainer |
| 8 | Supply chain attack | | H | How often a team ships new versions to users |
| 9 | Specification coverage | | I | An assertion that remains true as the program's state changes |
| 10 | Release cadence | | J | How much of the intended behavior tests actually check, as opposed to how much code they execute |
| | | | K | A proof that every loop terminates |
| | | | L | Encrypting all network traffic by default |

---

## Part B — Multiple choice (2 points each)

**11.** Yang's first principle is "pick your abstraction based on your goals." Her second is:

- (a) always prove before you ship
- (b) pay attention to where your abstractions are leaking
- (c) never use third-party APIs
- (d) write the documentation first

**12.** Which interviewee says "you don't need calculus—you need formal logic"?

- (a) Yang
- (b) Hoodlet
- (c) Schneider
- (d) None of them

**13.** Hoodlet says robust testing matters for security because:

- (a) it lets you ship security patches quickly without breaking things
- (b) tests find all vulnerabilities
- (c) regulators require 100% coverage
- (d) attackers can't read test code

**14.** Schneider proved that ordinary reference monitors can enforce only safety properties. Which of Yang's research topics does this result say *cannot* be enforced by such a monitor?

- (a) Access control
- (b) Memory safety
- (c) Type checking
- (d) Information flow policies

**15.** Yang, Hoodlet, and Schneider all express concern that AI-generated code:

- (a) will replace all programmers within five years
- (b) cannot compile
- (c) is accepted by people without the knowledge, review, or assurance needed to judge it
- (d) is always less efficient than human code

**16.** In Hoodlet's example, an agentic browser summarizing one web page is prompt-injected into stealing a wallet recovery key from another tab. What is the core security problem?

- (a) The agent acts with the user's authority on every site, so injected text can steer it across the isolation the browser still enforces
- (b) The page's scripts exploit a bug in the browser's same-origin checks to read data from the other tab directly
- (c) The agent's model weights were poisoned during training, so it leaks secrets whenever it sees a wallet page
- (d) The summarized page disabled TLS certificate validation, letting an attacker intercept the recovery key in transit

**17.** Schneider explains Agile development as:

- (a) a management fad with no engineering basis
- (b) the absence of any process
- (c) a way to avoid specifications entirely
- (d) building and fully retesting a sequence of prototypes, as other engineering fields build models

**18.** Which pairing of interviewee and claim is correct?

- (a) Hoodlet: "the divide is not about projects—it's about people"
- (b) Yang: "What people want is not what they need"
- (c) Schneider: "the craft around code has largely crumbled"
- (d) Yang: "security is a feature... that people expect by default"

**19.** Yang said research should *not* be practical right now. Her reason is that:

- (a) AI is a platform shift, so near-term practical work may soon be irrelevant
- (b) universities lack funding for practical work
- (c) industry already solves all practical problems
- (d) theory is always more valuable than practice

**20.** Schneider's work on hyperproperties matters to information flow because noninterference:

- (a) is a liveness property
- (b) compares pairs of executions, so it can't be checked by watching one execution
- (c) can be checked by a type system only in C
- (d) applies only to databases

---

## Part C — Short answer (6 points each; 4–6 sentences)

**21.** Yang says "if you can't prove guarantees about your system, I think the next best thing is watching the system." Schneider says programmers need assertional reasoning and hopes runtime verification will transform testing. Explain how runtime verification combines the two views.

**22.** Explain Hoodlet's concept of *technical inflation* and how it differs from *technical debt*. Give one example of technical inflation not mentioned in the interview.

**23.** Yang left academia because observation "is so against the metrics and values of any field," and says impact is partly luck. Schneider says he aspires "to write the first paper, the best paper, or the last paper in an area" and doesn't predict impact. Compare their views of what makes research valuable.

**24.** Hoodlet says waterfall "is just fine" for an air-gapped device patched once a year. Schneider says writing a spec and having someone implement it "was naïve, and it is not what engineering does." Are they in conflict? Explain using the idea of *risk-based process selection*.

**25.** Schneider: AI-generated code "has not been looked at by anyone." Hoodlet: "experts get the most benefit out of large language models, because they know when it's wrong." Using both, explain why learning to program well still matters, and what a course should therefore require of students who use AI tools.

---

## Part D — Applied problem (15 points)

A university is deploying a web application that lets students view their own grades. It has a browser front end, an API service, a database, and an AI assistant that can read a student's grade pages and answer questions about them.

**(a)** (4 pts) State one **access control** policy and one **information flow** policy for this system. Give an example of code that satisfies the first but violates the second.

**(b)** (4 pts) Apply **STRIDE** (or any two Saltzer–Schroeder principles, if you prefer) to the AI assistant. Identify two threats and one design-level mitigation for each. One threat must involve **prompt injection**.

**(c)** (4 pts) Write two properties in plain English that a **runtime verification** monitor could check in production, one safety and one liveness. For the liveness property, explain how you would turn it into something a monitor can actually flag.

**(d)** (3 pts) The team proposes an SLO of "99.99% availability." Using the idea of an **error budget**, argue whether that is the right target for this system.

---

## Part E — Synthesis essay (15 points; choose ONE; ~1 page)

**E1.** Yang says modern systems are "much more like biological systems with emergent behaviors," so observation is often all we have. Schneider wants every programmer able to reason with invariants. Hoodlet works in between, using static analysis, fuzzing, and AI to find real bugs. Argue for a position on how assurance should be divided among proof, testing, and observation for a system you choose.

**E2.** All three interviewees discuss accountability and impact at scale: Yang's demos that can't be maintained, Hoodlet's CrowdStrike and *The Algorithm*, and Schneider's missing "societal infrastructure" for accountability for AI outputs. Write an essay on who should be responsible when software, especially AI-generated software, causes harm. Use at least two chapters.

**E3.** Yang and Hoodlet are early in their careers; Schneider is near the end of a long one. Compare how the two generations see programming's future in the age of LLMs. Where do they agree, where do they differ, and whose view do you find more convincing?
