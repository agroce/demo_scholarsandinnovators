# Primer for Chapter 3 (Liskov): Modularity and Abstraction

*Information hiding, coupling and cohesion, specifications, and why "modularity is all there is"*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Liskov interview.*

## What this primer covers, and why

**Main topic: modularity and abstraction.** Why we decompose systems; Parnas's information-hiding criterion and his famous KWIC example; coupling and cohesion; kinds of abstraction; writing a module specification; encapsulation and its leaks (Hyrum's law); inheritance vs. composition; the SOLID principles.

**Shorter history:** from the 1968 software crisis and McIlroy's call for software components, through Simula, CLU, and Ada packages, to package managers, microservices, and Conway's law.

> **Why read this first.** Liskov's interview assumes you know what data abstraction is and why it mattered. Her answer to whether modularity matters more or less with AI is blunt: "Oh, modularity is all there is." Her substitution principle only makes sense once you see modules as _specifications_, not just code. This primer gives the standard SE vocabulary, so you can see how radical (and how practical) her ideas were.

## Why decompose a system at all?

A large program is too big for one head (Kernighan, Chapter 6: "nobody's got any clue whatsoever" past a few hundred thousand lines). **Modularity** divides it into parts so that each can be:

- **understood** without reading the others;
- **developed** in parallel by different people;
- **changed** without breaking the others;
- **tested and verified** separately (Ball, Chapter 1: compositional reasoning).
A **module** is any unit with a boundary: function, class, package, library, service. Its **interface** is what other modules may rely on. Its **implementation** is everything else.

The engineering question is not _whether_ to decompose but **where to draw the boundaries**. The same program can be split into modules in very different ways, and the choice decides what is easy to change later.

> **Vocabulary.** **Module**: a unit of decomposition with an interface.
**Interface**: the operations and promises others may depend on.
**Implementation**: the hidden code and data.
**Abstraction**: a simplified view that leaves out details irrelevant to the user.
**Encapsulation**: language mechanisms that _enforce_ the boundary.

## Parnas, 1972

> "We propose instead that one begins with a list of difficult design decisions or design decisions which are likely to change. Each module is then designed to hide such a decision from the others."
>
> — David L. Parnas, "On the Criteria To Be Used in Decomposing Systems into Modules," CACM, 1972

Parnas's paper is one of the most cited in software engineering. Its claim is that the obvious way to modularize, one module per step of processing (as in a flowchart), is usually wrong. Modules should instead be built around **secrets**, decisions that might change.

Parnas's sentence just before this one: "We have tried to demonstrate by these examples that it is almost always incorrect to begin the decomposition of a system into modules on the basis of a flowchart." The paper is short and very readable; assign it.

## KWIC, modularization 1: one module per processing step

```
Input → Circular shift → Alphabetizer → Output
   \          |                |            /
    ---- all read/write SHARED DATA in agreed formats ----
         (lines packed 4 chars/word; shift index; sorted index)
```

Parnas's example is a **KWIC (Key Word in Context) index**: given lines of text, list every circular shift of every line, alphabetized. The "natural" design follows the flowchart. It works, but **every module knows the format of the shared data**.

## KWIC, modularization 2: one module per secret

```
Input ─setchar()──▶ LINE STORAGE (hides storage format)
Circular shifter ─char()──▶ LINE STORAGE
Alphabetizer ─cschar()──▶ Circular shifter
Output ─ith(i)──▶ Alphabetizer
```

Parnas's alternative: each module hides a **design decision** behind an interface of functions. The arrows mean "uses only the interface of": Input calls `setchar()`, the Circular shifter calls `char(line, word, c)`, the Alphabetizer calls `cschar()`, and Output calls `ith(i)`. No module knows how lines are stored except Line storage.

## What happens when a design decision changes?

Parnas tested both designs against changes that were likely to happen. The difference is not whether the system works today, but **how many modules a change touches**.

**Likely change**

- Input format changes
- Don't keep all lines in memory
- Don't pack 4 characters per word
- Store an index of shifts instead of the shifted lines (or vice versa)
- Alphabetize lazily, on demand

**Modularization 1 (flowchart)**

- Input module only
- **Every** module changes
- **Every** module changes
- Circular shift, Alphabetizer, Output
- Alphabetizer and Output

**Modularization 2 (information hiding)**

- Input module only
- Line storage only
- Line storage only
- Circular shifter only
- Alphabetizer only

This is the core lesson of modular design: a good decomposition localizes the effects of change. Note it says nothing about performance or lines of code; both designs can be equally efficient. It also explains Liskov's frustration (Chapter 3): if the compiler doesn't _enforce_ that other modules can't reach the line storage, someone eventually will, and the benefit disappears.

## Coupling and cohesion (1974)

Two measures from Stevens, Myers & Constantine's **structured design**: aim for **low coupling** between modules and **high cohesion** within each one. Both scales run roughly from worst to best.

**Coupling: how much modules depend on each other**

- **Content**: one module reaches into another's internals (worst)
- **Common**: modules share global data (KWIC design 1)
- **Control**: one module passes flags that steer another's logic
- **Stamp**: modules share a whole data structure but use only parts
- **Data**: modules communicate only through parameters they need (best)

**Cohesion: how strongly a module's parts belong together**

- **Coincidental**: unrelated parts thrown together ("utils") (worst)
- **Logical**: similar _kinds_ of things (all input handling)
- **Temporal**: things done at the same time (startup)
- **Procedural / communicational / sequential**: steps of one process or on the same data
- **Functional**: everything contributes to one well-defined purpose (best)

W. P. Stevens, G. J. Myers, L. L. Constantine, "Structured Design," IBM Systems Journal, 1974. The exact levels are less important than the intuition, which applies equally to classes, packages, and microservices. Parnas's information hiding is the deeper principle: low coupling follows from hiding the right secrets.

## Kinds of abstraction

- **Procedural abstraction**: a function, known by what it computes rather than how (`sort(list)`).
- **Data abstraction**: an **abstract data type (ADT)**, a type known only by its operations and their behavior (`Set` with `insert`, `contains`), not its representation. Liskov and Zilles, 1974.
- **Iteration abstraction**: a way to visit the elements of a collection without knowing its structure (CLU's iterators; today's `for x in ...`).
- **Type hierarchy**: a family of types sharing a supertype's behavior. This is where Liskov's substitution principle applies.
Each kind lets a client depend on a **specification** instead of an implementation. That is why Liskov saw types "in terms of their behavior and not in terms of their implementation."

> **Abstraction in the interviews.** **Ball** (Ch. 1): the field now has "so many layers of abstraction," yet people still "peek behind the interface" when its documentation is insufficient.

**Zeller** (Ch. 5): modern reuse rests on "the appropriate abstraction mechanisms... Barbara Liskov."

## A module's specification

An interface is more than a list of method signatures. Liskov and Guttag's textbooks specify each operation with three clauses:

- **requires**: the precondition the caller must guarantee;
- **modifies**: which inputs or objects may change;
- **effects**: what is true afterward, in terms of the _abstract_ value.
Example, for a mutable `IntSet`:

`insert(x)` — **modifies:** this · **effects:** adds x to this (this_post = this ∪ {x})

`choose()` — **requires:** this is not empty · **effects:** returns some element of this

Inside the module, a **representation invariant** and an **abstraction function** connect the hidden data to the abstract value (see the Chapter 3 notes).

> **Why specs, not just types.** A type signature says `choose(): int`. Only the specification says it may return _any_ element, and that calling it on an empty set is the caller's fault. Signatures that match while behavior differs is exactly the stack-vs-queue problem Liskov describes.

The same idea appears as Hoare-style pre/postconditions (Ball, Chapter 1), Meyer's design by contract, and OCL constraints (Krishnamurthi, Chapter 2). The point of all of them is that the interface carries behavioral promises, so clients and implementers can work independently.

## Encapsulation, and how abstractions leak

**Encapsulation** is enforcement: `private` fields, module export lists, opaque types, separate processes. Without it, information hiding depends on everyone's discipline. Python's `_name` convention is a request, not a rule.

Even enforced boundaries **leak**. Performance, error behavior, ordering, and timing are often observable whether or not the spec mentions them.

- Joel Spolsky's **Law of Leaky Abstractions** (2002): "All non-trivial abstractions, to some degree, are leaky."
- **Hyrum's law** (Hyrum Wright, Google): with enough users, every observable behavior of an API will be depended on by somebody, whatever the contract says.
Consequence: changing an implementation "behind" a stable interface can still break clients that relied on undocumented behavior, such as the iteration order of a hash table.

> **Connection to Chapter 3.** Liskov: "I really wish that compilers would enforce modularity, because in the absence of that enforcement your team is no better than your weakest programmer."

Hyrum's law shows the limit: even perfect enforcement can't hide _observable behavior_.

Hyrum's law in Wright's phrasing: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." It is discussed in Software Engineering at Google (Winters, Manshreck, Wright, 2020).

## Inheritance vs. composition

Object-oriented languages offer two ways to reuse code:

- **Inheritance**: a subclass reuses and overrides a superclass's implementation ("is-a").
- **Composition**: an object holds other objects and delegates to them ("has-a").
Inheritance couples a subclass tightly to its superclass's _implementation_. The **fragile base class problem**: a seemingly safe change to a superclass breaks subclasses that depended on its internal behavior.

The *Design Patterns* book (Gamma, Helm, Johnson, Vlissides, 1994) advises: **"Favor object composition over class inheritance."**

When inheritance _is_ used, the **Liskov substitution principle** is the test of whether it's legitimate: can the subclass be used anywhere the superclass is expected, without surprising its clients?

> **Classic examples.** `java.util.Stack extends Vector`: a stack you can insert into the middle of. It inherits operations that break the stack abstraction.

Composition alternative: a `Stack` class that _contains_ a list and exposes only `push`, `pop`, `peek`.

## The SOLID principles (Robert C. Martin, 2000s)

A popular summary of object-oriented design guidance. Two of the five are much older than the acronym: the **O** is Bertrand Meyer's (1988) and the **L** is Liskov's (1987/1994).

**S · Single responsibility**

- A module should have one reason to change.
- ≈ high cohesion; ≈ Parnas's one secret per module.

**O · Open/closed**

- Open for extension, closed for modification.
- Meyer, _Object-Oriented Software Construction_, 1988.

**L · Liskov substitution**

- Subtypes must be usable through the supertype's interface without surprises.
- Liskov 1987; Liskov & Wing 1994.

**I · Interface segregation**

- Many small, client-specific interfaces beat one large one.
- ≈ reducing stamp coupling.

**D · Dependency inversion**

- Depend on abstractions, not concrete implementations.
- High-level policy shouldn't depend on low-level detail.

SOLID is a mnemonic, not a theory; treat it with Kernighan's hype-cycle skepticism (Chapter 6). But note how much of it is rephrasing of 1970s ideas: information hiding, coupling and cohesion, and specifications.

## Modularity at scale: components, packages, services

- **1968**: at the NATO conference, Doug McIlroy proposed "Mass Produced Software Components," catalogs of reusable routines like hardware parts. It took decades and the Internet to arrive.
- **Unix (1970s)**: small programs composed with **pipes**. Text streams are the universal interface (see the Chapter 6 primer).
- **Package ecosystems**: CPAN (1995), Maven, npm, PyPI, crates.io. Reuse at enormous scale, with **semantic versioning** to signal interface changes.
- **Dependency risk**: the 2016 npm `left-pad` incident (an 11-line package unpublished, breaking thousands of builds) and supply-chain attacks such as the 2024 xz backdoor. Every module you use is code you trust (Krishnamurthi's "means of verification," Chapter 2).
- **Services and microservices** (around 2014): modules become separately deployed processes communicating over a network. Strong encapsulation, but distributed-systems failure modes (Liskov's other career).

> **Modularity as economics.** Baldwin and Clark (_Design Rules_, 2000) argue that modular designs create **option value**: each module can be improved or replaced independently. That's why modular industries (PCs, software packages) evolve so fast.

## Conway's law (1968)

> "Organizations which design systems... are constrained to produce designs which are copies of the communication structures of these organizations."
>
> — Melvin E. Conway, "How Do Committees Invent?", Datamation, 1968

Module boundaries tend to mirror **team** boundaries. Three teams building a compiler will produce a three-pass compiler. The "inverse Conway maneuver" deliberately organizes teams around the architecture you want. Compare Ball (Ch. 1) on distributed development and Krishnamurthi (Ch. 2) on programming languages as social objects.

## A short history of modularity, part 1

- **1967** — Simula 67: classes and objects
- **1968** — NATO conference: McIlroy: "software components"
- **1968** — Dijkstra's THE system: an OS built in layers
- **1968** — Conway's law: systems mirror organizations
- **1972** — Parnas: information hiding
- **1974** — Liskov & Zilles: abstract data types
- **1974** — Stevens, Myers, Constantine: coupling and cohesion

## A short history of modularity, part 2

- **1975** — CLU: clusters, iterators
- **1980** — Modula-2 report: modules with explicit export
- **1983** — Ada: packages: spec + body
- **1987** — Liskov's OOPSLA keynote: behavioral subtyping
- **1994** — Design Patterns: "favor composition"
- **1995** — Java: interfaces, packages, CPAN era
- **2014** — Microservices: modules as services

## Check yourself before reading Chapter 3

1. In Parnas's KWIC example, why does changing how lines are stored touch every module in the first design but one module in the second?
2. Rank these from best to worst coupling: modules sharing a global table; modules passing only needed parameters; one module modifying another's private fields.
3. Write a requires/modifies/effects specification for a `remove(x)` operation on an integer set.
4. What is Hyrum's law, and why does it limit what encapsulation can achieve?
5. Why does the Design Patterns book prefer composition over inheritance? What test decides whether an inheritance relationship is legitimate?

## Further reading

- D. L. Parnas, "On the Criteria to Be Used in Decomposing Systems into Modules," CACM, 1972. (Read it.)
- W. P. Stevens, G. J. Myers, L. L. Constantine, "Structured Design," IBM Systems Journal, 1974.
- B. Liskov and S. Zilles, "Programming with Abstract Data Types," SIGPLAN Notices, 1974.
- B. Liskov and J. Guttag, Program Development in Java: Abstraction, Specification, and Object-Oriented Design, 2000.
- M. D. McIlroy, "Mass Produced Software Components," NATO Software Engineering Conference, 1968.
- M. E. Conway, "How Do Committees Invent?" Datamation, 1968.
- E. Gamma, R. Helm, R. Johnson, J. Vlissides, Design Patterns, 1994 (Introduction, on composition vs. inheritance).
- C. Y. Baldwin and K. B. Clark, Design Rules, Vol. 1: The Power of Modularity, MIT Press, 2000.
- T. Winters, T. Manshreck, H. Wright, Software Engineering at Google, 2020 (Hyrum's law; dependency management).
