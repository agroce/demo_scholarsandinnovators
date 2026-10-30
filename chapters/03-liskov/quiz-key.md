# Answer Key — Chapter 3 Quiz (Liskov)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **d** | "Nobody knew how to build systems that worked!" |
| 2 | **d** | "My perspective had to do with specifications. Their perspective was more about implementations." |
| 3 | **a** | Contravariant preconditions, covariant postconditions; invariants preserved. |
| 4 | **a** | (d) is the abstraction function. |
| 5 | **c** | "The big step was moving away from the clients and into the replicas." |
| 6 | **c** | Lamport, Shostak, Pease 1982. |
| 7 | **a** | Direct quote. |

## Part B — what a full-credit answer includes

**8.** A *subclass* inherits implementation, so it is about code reuse. A *subtype* can be substituted wherever the supertype is expected without surprising clients, so it is about behavior. Type checkers verify *signatures* (argument and result types), not *behavioral specifications*. A Stack declared as a subclass of Queue type-checks while violating FIFO behavior. Bonus: Java's `Stack extends Vector`, or Square/Rectangle.

**9.** Without enforcement, any programmer can reach into a module's internals (depend on representation details, break a rep invariant), and the modularity of the whole system is only as good as its least careful contributor. Enforcement makes the boundary a hard guarantee. Examples: `private` fields in Java/C++; Rust module privacy (`pub` vs. private); opaque types or abstract types in ML; package-level visibility. Strong answers note that some languages, such as Python's `_name` convention, rely on discipline rather than enforcement.

## Part C — rubric (10 points)

- **One link explained accurately (5 pts).** The clearest link: Argus used database-style **transactions** (all-or-nothing across machines). Thinking in transactions led Liskov to treat replication as a protocol run *by replicas*, not coordinated by clients with locks. That gave viewstamped replication. Alternatively: understanding VR deeply (when "most people didn't") made the Byzantine extension with Miguel Castro possible.
- **Connection to "understand what you don't understand" (5 pts).** Strong answers note that Liskov looked for gaps others had papered over. The Smalltalk papers used "subtype" without a *behavioral* account of what it meant, and she noticed that missing piece. Similarly, client-side locking left the failure case (a client that "goes to lunch") unsolved. She also says spotting what an author doesn't understand is "a little sign that maybe there's something interesting to do there."
