# Primer for Chapter 9 (Schneider): Dependability and Security Foundations

*Faults and failures, fault tolerance and replication, security policies and mechanisms, plus assertional reasoning and runtime verification*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Schneider interview.*

## What this primer covers, and why

**Main topic: what it means for a system to be trustworthy, and how to build one.** Dependability attributes; the fault → error → failure chain; reliability and availability numbers; failure models; redundancy and replication, including the state machine approach; distributed-systems limits; security policy vs. mechanism; Saltzer and Schroeder's design principles; reference monitors; access control models; information flow and noninterference.

**Shorter topic: assertional reasoning and runtime verification.** Hoare triples; loop invariants worked through; safety vs. liveness; runtime verification and specification coverage; a short history of formal reasoning about programs.

> **Why read this first.** Schneider sees his career as one subject, **trustworthy systems**, with three pillars: assurance, fault tolerance, and security. He talks fluently about reference monitors, safety properties, the state machine approach, and invariants, and he expects programmers to be comfortable with formal logic. This primer supplies those foundations. It also gives the theory behind Chapter 8's practice: the same-origin policy is a *policy*, process isolation is a *mechanism*, and Schneider's results say which policies mechanisms like it can and can't enforce.

---

# Dependability

*Building systems that keep working when parts of them don't*

## What "dependable" means

Avižienis, Laprie, Randell, and Landwehr's standard taxonomy (2004) defines **dependability** as the ability to deliver service that can justifiably be trusted. Its attributes:

- **Availability**: readiness for correct service (is it up?).
- **Reliability**: continuity of correct service (how long does it run without failing?).
- **Safety**: absence of catastrophic consequences for users and the environment.
- **Integrity**: absence of improper alterations.
- **Maintainability**: ability to undergo repairs and modifications.
**Security** adds **confidentiality** and treats availability and integrity against a deliberate adversary.

> **Reliability ≠ safety.** A system can be reliable and unsafe (it reliably does the wrong thing), or safe and unreliable (it fails often, but always into a safe state, like a train that stops). Safety-critical design often prefers **fail-safe** behavior.

Schneider's 'trustworthiness' (Trust in Cyberspace, 1999) is essentially dependability plus security: the system does what is required despite environmental disruption, human error, and hostile attack.

## Fault, error, failure: the chain of threats

```
Fault --activation--> Error --propagation--> Failure
  ^______ a component's failure is a fault of the system that contains it

Means: fault prevention | fault removal | fault tolerance | fault forecasting
```

Terminology matters. A **fault** may lie dormant for years until **activated**. The resulting **error** may be detected and corrected before it **propagates** to a **failure** that users see. The four **means** below are how engineering attacks the chain. (Zeller's TRAFFIC uses _defect_, _infection_, _failure_ for the same idea; Ch. 5 primer.)

## Measuring reliability and availability

- **MTTF** (mean time to failure): average time a system runs before failing.
- **MTTR** (mean time to repair or recover): average time to restore service.
- **Availability** = MTTF / (MTTF + MTTR). A server with MTTF 1,000 hours and MTTR 1 hour is available 1000/1001 ≈ **99.9%** of the time.
- Two ways to improve availability: fail less often (raise MTTF), or **recover faster** (lower MTTR). In practice, faster recovery is often cheaper: this is why operations practice emphasizes rollback and failover (Ch. 7 primer).
- **Reliability** over a period is the probability of no failure during it. For a component with constant failure rate λ, R(t) = e^(−λt).

> **Redundancy arithmetic.** If one server is down 1% of the time, independently, two servers are both down 0.01% of the time.

The catch is **independence**. Shared power, shared bugs, and shared configuration produce **correlated failures**, which is why N-version programming disappointed (next slide).

## Failure models: what can a faulty component do?

Fault-tolerance protocols are designed for a stated **failure model**. Weaker assumptions cost more replicas.

**Crash (fail-stop)**

- The component halts and does nothing more.
- Fail-stop: the halt is detectable by others (Schlichting & Schneider, 1983).
- Consensus needs **2f+1** replicas to tolerate f crashes.

**Omission & timing**

- Messages are lost, or arrive too late or too early.
- Typical of networks.
- Handled with timeouts, retries, acknowledgments, and idempotent operations.

**Byzantine (arbitrary)**

- The component may do anything, including lie or act maliciously.
- Named in Lamport, Shostak, and Pease's "Byzantine Generals" paper (1982).
- Needs **3f+1** replicas to tolerate f faulty ones.
- Covers both bugs and attacks.

## Kinds of redundancy

- **Hardware redundancy**: spare or replicated components. **Triple modular redundancy** (TMR) runs three copies and votes, masking any single failure; used in spacecraft and aircraft.
- **Information redundancy**: extra bits that detect or correct errors: parity, checksums, CRCs, error-correcting codes in memory and storage, RAID.
- **Time redundancy**: do it again: retries, re-execution, checkpoint and restart.
- **Software redundancy**: **N-version programming** has independent teams write the same specification and votes on their outputs.
Knight and Leveson's 1986 experiment gave 27 independently written versions of one program the same inputs. Failures were **far more correlated** than independence predicts: different programmers make the same mistakes on the same hard cases.

> **The lesson for software.** Replicating identical software tolerates hardware crashes but not bugs: every replica has the same bug. Tolerating design faults needs real diversity, and even then less than you'd hope. Assurance (proof, testing, review) remains essential.

## The state machine approach to replication

```
Clients → [agree on one order of requests (consensus)] → Replica 1, Replica 2, Replica 3 (crashed)
        → outputs: take any (crash faults) or majority vote (Byzantine)
```

Model the service as a **deterministic state machine**. Replicas that start in the same state and process the same requests in the same order produce the same outputs. Agreeing on that order despite failures is the hard part: Lamport's logical clocks order events by causality but don't tolerate failures, so it takes **consensus** (Paxos, Raft). Schneider's 1990 tutorial is the standard reference.

## Fault-tolerant distributed computing

- **1956** — von Neumann: reliable machines from unreliable parts
- **1978** — Lamport clocks: ordering without a global clock
- **1982** — Byzantine Generals: Lamport, Shostak, Pease
- **1985** — FLP impossibility: no deterministic consensus with one crash, asynchronously
- **1988** — Viewstamped Replication: Oki & Liskov
- **1990** — State machine approach: Schneider's tutorial
- **1998–2014** — Paxos; Raft: consensus in practice

## Limits: what distributed systems can't do

- **FLP impossibility** (Fischer, Lynch, Paterson, 1985): in a fully asynchronous system, no deterministic protocol can guarantee consensus if even one process may crash. Practical protocols escape with timeouts, randomness, or partial synchrony, guaranteeing safety always and liveness only when the network behaves.
- **CAP** (Brewer, 2000; proved by Gilbert and Lynch, 2002): during a network **partition**, a replicated store must give up either **consistency** (in Gilbert and Lynch's proof, _linearizability_: every operation appears to take effect atomically at one instant between its call and return, so reads see the latest completed write) or **availability** (every request to a non-failed node eventually gets a response).
- **End-to-end argument** (Saltzer, Reed, Clark, 1984): correctness checks that depend on the application belong at the endpoints, not only in lower layers.

> **Safety vs. liveness again.** Consensus protocols such as Paxos are designed so that **safety** (never decide two different values) holds no matter what, while **liveness** (eventually decide) holds only under good conditions. That is the safety/liveness split Schneider helped formalize, used as a design rule.

---

# Security foundations

*Policies say what must hold; mechanisms make it hold*

## Policy vs. mechanism

A **security policy** states what is and isn't allowed: "only the patient's doctors may read the record," "no data flows from secret to public." A **mechanism** is what enforces it: passwords, access control lists, page tables, type systems, encryption, monitors.

Keeping them separate lets one mechanism serve many policies and makes each easier to analyze.

Lampson's "gold standard" for security mechanisms, from the chemical symbol for gold (Au):

- **Authentication**: who is making this request?
- **Authorization**: is that principal allowed to do this?
- **Auditing**: record what happened, so misuse can be found and attributed.

> **Schneider's research question.** "What are the classes of policies, mechanisms, and attacks, and how do they relate?" For example: which policies can a given class of mechanism enforce? Reference monitors can enforce only safety properties. Security still lacks its "periodic table."

## Saltzer and Schroeder's design principles (1975)

Fifty years old and still the best short list of secure design rules. Each one is visible in Chapters 7 and 8.

**Mechanism design**

- **Economy of mechanism**: keep it small and simple, so it can be verified.
- **Fail-safe defaults**: deny unless explicitly permitted.
- **Complete mediation**: check every access, every time.
- **Open design**: security shouldn't depend on the design being secret.

**Privilege and people**

- **Separation of privilege**: require two conditions or keys for critical actions.
- **Least privilege**: give each component only the rights it needs.
- **Least common mechanism**: minimize shared mechanisms between users.
- **Psychological acceptability**: if security is hard to use, people will bypass it.

Have students map Hoodlet's agentic-browser attack onto these: an agent with access to every tab violates least privilege and least common mechanism, and prompt injection defeats complete mediation.

## The reference monitor

```
Subject --requested access--> [Reference monitor] --only if allowed--> Object
                                 ↑ Policy        ↓ Audit log
```

James Anderson's 1972 report for the U.S. Air Force defined the **reference monitor**: it must be **always invoked** (complete mediation), **tamperproof**, and **small enough to verify**. The hardware, kernel, and other code it depends on form the **trusted computing base**. Schneider (2000) proved that monitors seeing one execution step by step can enforce only **safety properties**.

## Access control models

**Discretionary (DAC)**

- Owners decide who may access their objects.
- Access control lists; Unix read/write/execute bits.
- Flexible, but a program running as you can give away your data.

**Mandatory (MAC)**

- System-wide labels the user can't override.
- **Bell–LaPadula** (1973): no read up, no write down, for confidentiality.
- **Biba** (1977): the dual, for integrity.
- Military systems; SELinux.

**Role-based (RBAC)**

- Permissions attach to roles (nurse, auditor); users get roles.
- Matches how organizations think.
- Most enterprise systems and cloud identity systems.

**Capabilities**

- Holding an unforgeable token _is_ the permission.
- Naturally supports least privilege and delegation.
- Object-capability languages; CHERI hardware; file descriptors.

## Information flow and noninterference

Access control decides which principals may perform which operations (read, write, execute, delete) on which resources. Once a read is allowed, it says nothing about where the information goes next. **Information flow control** constrains that propagation.

- **Denning** (1976) modeled security classes as a **lattice** and asked which flows between classes a program performs, including **implicit** flows through branches.
- **Goguen and Meseguer** (1982) defined **noninterference**: high-security inputs have no effect on low-security outputs. Two runs that differ only in secrets must look the same to a low observer.
- **Covert channels**: timing, resource usage, and error behavior can leak information even when data paths are controlled.
Because noninterference compares _pairs_ of executions, it is a **hyperproperty** (Clarkson and Schneider), not a property of single runs. That is why a reference monitor can't enforce it, and why static type systems such as Jif or Yang's Jeeves are used instead.

> **Still open.** Schneider (Ch. 9): Shannon's definition can't distinguish **causal** flow (Y computed from X) from **correlational** flow (Y reveals A only because A correlates with X). Laws such as GDPR need the causal notion to assign accountability for a leak.

---

# Assertional reasoning and runtime verification

*"As a programmer, you don't need calculus—you need formal logic"*

## Hoare triples

A **Hoare triple** `{P} S {Q}` means: if precondition `P` holds and statement `S` runs and terminates, then postcondition `Q` holds.

- Assignment: `{x + 1 > 0} y := x + 1 {y > 0}`. Work backward: substitute the expression for the variable in the postcondition.
- Sequence: if `{P} S1 {R}` and `{R} S2 {Q}`, then `{P} S1; S2 {Q}`.
- Conditional: prove both branches, each with the branch condition added to `P`.
- Loop: find an **invariant** `I` with `{I ∧ B} body {I}`. Then `{I} while B do body {I ∧ ¬B}`.
This is **partial correctness**. **Total correctness** also proves termination, usually with a **variant**: a quantity that decreases each iteration and is bounded below.

> **Negation matters.** The loop rule needs `¬B` at exit. If `B` is `i < n ∧ a[i] ≠ x`, then `¬B` is `i ≥ n ∨ a[i] = x` (De Morgan). Schneider: many programmers "don't know how to negate a Boolean expression."

## A loop invariant, worked

`s := 0; i := 0; while i < n do { s := s + a[i]; i := i + 1 }`

**Invariant** `I`: `0 ≤ i ≤ n ∧ s = a[0] + … + a[i−1]` (the sum of the first i elements).

- **Initialization**: before the loop, `i = 0` and `s = 0`, the empty sum. `I` holds.
- **Maintenance**: if `I` holds and `i < n`, adding `a[i]` to `s` and incrementing `i` makes `I` hold again.
- **Termination**: at exit, `I ∧ ¬(i < n)` gives `i = n`, so `s` is the sum of all n elements.
- **Variant**: `n − i` decreases each iteration and never goes below 0, so the loop terminates.
The same habit finds off-by-one errors (is it `≤ n` or `< n`?) without running anything. It is also how you'd write an assertion for a fuzzer or a runtime monitor to check.

> **In the book.** **Liskov** (Ch. 3): representation invariants.
**Holzmann** (Ch. 4): system invariants in Spin.
**Schneider** (Ch. 9): "if you can't easily work with invariants, then you don't have the mental tools to understand the corner cases for loops."

## Safety and liveness

Lamport (1977) named the distinction; Alpern and Schneider (1985) defined liveness precisely and proved that **every property is the intersection of a safety property and a liveness property**.

**Safety**

- "Nothing bad ever happens."
- Mutual exclusion; no buffer overflow; no unauthorized read; output is sorted.
- A violation has a **finite counterexample**: a prefix after which it's already broken.
- Testing and runtime monitors can detect it. Reference monitors can enforce it.

**Liveness**

- "Something good eventually happens."
- Every request is answered; the program terminates; no starvation.
- No finite observation can show a violation, since the good thing might still happen.
- Testing approximates it with **timeouts**, which turn it into a safety property ("answered within 2 s").

Holzmann's Spin (Ch. 4 primer) finds liveness violations as 'lasso' counterexamples: a finite prefix plus a cycle repeated forever. The Dijkstra Prize citation (2018) was for 'Defining Liveness.'

## Runtime verification

**Runtime verification** (RV) generates **monitors** from formal specifications and checks executions against them as they run (or from logged traces).

- Specs can be **temporal**: "`next()` is never called without a preceding `hasNext()` returning true," "every acquired lock is released before the thread exits."
- Monitors catch the violation at the moment it happens, not only when a crash results.
- RV sits between testing (which samples executions) and verification (which covers all): precise checking, but only on the runs you observe.
- Systems such as **JavaMOP** monitor library-usage specifications across large open-source codebases. Legunsen and colleagues found many real bugs this way.
Schneider's inlined reference monitors became one foundation of the field.

> **Specification coverage.** Schneider: testing can be judged by "how much of the specification has been exercised," not only how much code. A fuzzer with only a crash oracle exercises little of the spec. Adding RV monitors adds oracles, so the same inputs check far more.

## Reasoning about programs

- **1967** — Floyd: assigning meanings to flowcharts
- **1969** — Hoare: axiomatic basis for programming
- **1975** — Dijkstra: guarded commands; weakest preconditions
- **1977** — Pnueli: temporal logic for programs
- **1985** — Alpern & Schneider: defining liveness
- **2000** — Enforceable policies: what monitors can enforce
- **2010** — Hyperproperties: Clarkson & Schneider

## Check yourself before reading Chapter 9

1. Distinguish fault, error, and failure, and give an example where an error never becomes a failure.
2. Why do crash faults need 2f+1 replicas for consensus and Byzantine faults need 3f+1? Why doesn't replication tolerate software bugs?
3. Name four Saltzer–Schroeder principles and show where one is violated in a system you know.
4. Write a loop invariant for linear search, and use De Morgan's law to state what holds at loop exit.
5. Classify as safety or liveness: "no two trains on the same track segment"; "every message is eventually delivered"; "the response arrives within 2 seconds."

## Further reading

- A. Avižienis, J.-C. Laprie, B. Randell, C. Landwehr, "Basic Concepts and Taxonomy of Dependable and Secure Computing," IEEE TDSC, 2004.
- F. B. Schneider, "Implementing Fault-Tolerant Services Using the State Machine Approach: A Tutorial," ACM Computing Surveys, 1990.
- J. C. Knight and N. G. Leveson, "An Experimental Evaluation of the Assumption of Independence in Multiversion Programming," IEEE TSE, 1986.
- J. H. Saltzer and M. D. Schroeder, "The Protection of Information in Computer Systems," Proc. IEEE, 1975.
- F. B. Schneider, "Enforceable Security Policies," ACM TISSEC, 2000.
- B. Alpern and F. B. Schneider, "Defining Liveness," Information Processing Letters, 1985.
- C. A. R. Hoare, "An Axiomatic Basis for Computer Programming," CACM, 1969.
- D. Gries, The Science of Programming, Springer, 1981; D. Gries and F. B. Schneider, A Logical Approach to Discrete Math, Springer, 1993.
- B. Lampson, "Computer Security in the Real World," IEEE Computer, 2004.
