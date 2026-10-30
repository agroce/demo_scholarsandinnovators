# Quiz — Chapter 3: Barbara Liskov

*About 20 minutes. Multiple choice: 2 points each. Short answer: 5 points each. Short essay: 10 points. Total: 34 points.*

---

## Part A — Multiple choice

**1.** Liskov describes "the software crisis" as:

- (a) the high cost of computer hardware
- (b) the Y2K bug
- (c) a shortage of programmers in the 1960s
- (d) the problem that nobody knew how to build systems that worked

**2.** According to Liskov, why could she see the flaw in claiming stacks and queues are subtypes when the Smalltalk community could not?

- (a) The Java compiler rejected the subtype declaration
- (b) She had written a stack-based compiler
- (c) She had more experience with Smalltalk
- (d) She thought about types in terms of specifications and behavior, while they focused on implementations

**3.** Under the Liskov substitution principle, an overriding method in a subtype may:

- (a) weaken the precondition and strengthen the postcondition
- (b) ignore the supertype's invariants if it adds new methods
- (c) change the method's observable behavior as long as the type signature is the same
- (d) strengthen the precondition and weaken the postcondition

**4.** A *representation invariant* is:

- (a) a condition on the internal representation that must hold whenever an object is visible to clients
- (b) a guarantee that the representation never changes
- (c) a property of the abstract value that clients see
- (d) the function mapping representations to abstract values

**5.** The key move in viewstamped replication, according to Liskov, was:

- (a) letting clients coordinate access with distributed locks
- (b) eliminating the need for a primary replica
- (c) moving control out of the clients and into replicas running a protocol
- (d) tolerating malicious (Byzantine) replicas

**6.** A *Byzantine* failure differs from a *benign* (crash) failure because a Byzantine component:

- (a) always stops responding
- (b) fails only during network partitions
- (c) may behave arbitrarily, including sending conflicting or false messages
- (d) only drops messages

**7.** Asked whether modularity matters more or less in a world of AI-generated code, Liskov said:

- (a) "Modularity is all there is."
- (b) She declined to answer.
- (c) "Modularity matters less now."
- (d) "AI will make modules unnecessary."

---

## Part B — Short answer (3–5 sentences each)

**8.** Explain the difference between a *subclass* and a *subtype*. Why can a language's type checker accept a subclass declaration that violates the substitution principle?

**9.** Liskov says, "your team is no better than your weakest programmer" unless compilers enforce modularity. Explain what she means and give one example of a language mechanism that enforces modularity.

---

## Part C — Short essay (1–2 paragraphs)

**10.** Liskov describes her career as a chain: CLU → Argus → transactions → viewstamped replication → Byzantine fault tolerance. Explain how *one* link in this chain made the next possible, using her own account in the interview. Then connect this to her advice that "it's really important to understand what you don't understand." How might that habit have helped her see what others missed, both in replication and in subtyping?
