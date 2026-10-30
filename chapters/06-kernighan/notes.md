# Chapter 6 — Brian Kernighan: Writing the Book(s) on Programming

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Brian Kernighan

Kernighan is the "K" in K&R: with Dennis Ritchie he wrote *The C Programming Language* (1978). He is also the "K" in **AWK** (with Al Aho and Peter Weinberger). He first presented the "hello, world" program. His other books include *The Elements of Programming Style* (with P. J. Plauger), the *Software Tools* books, *The Practice of Programming* (with Rob Pike), *The Go Programming Language* (with Alan Donovan), *Understanding the Digital World*, and *UNIX: A History and a Memoir*. He spent decades at Bell Labs' Computing Science Research Center, home of Unix, and has been a professor at Princeton since 2000.

This is the most *pragmatic* interview so far. Kernighan's recurring values are getting things to work, making tools other people can use, and being skeptical of hype, whether about methodologies or AI.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| COBOL internship → Project MAC (1966) | Interactive computing as the moment programming "clicked" |
| First experiences today | Batch vs. interactive; Colab; "the concept of a file system is foreign to students" |
| What hasn't changed | "It's hard to get the program to do what you want" |
| Elements of Programming Style | Which rules aged and which didn't; scaling from 1,000 to 100,000+ lines |
| *The Practice of Programming* | The testing and debugging chapters: start with the simplest cases; narrow down |
| Biggest advances | High-level languages (Backus), Algol's block structure and BNF, structured programming, OOP |
| Pragmatism | C and C++ as pragmatic designs; the C++/ML "demilitarized zone" at Bell Labs |
| Heroes | Ken Thompson, Ritchie, Backus, Al Aho (theory into practice) |
| Methodologies | The hype cycle: good idea → "structured lunch breaks" → absorbed into practice |
| Waterfall | Built for "adversarial relationships"; Pahlka's *Recoding America* |
| Design | "Immediate gratification... is, in a way, the antithesis of design" |
| AI | A real paradigm shift, but not AGI; "AI as Ordinary [Normal] Technology" |
| His current book | Paradigm shifts in computing history |

---

## Theme 1: From batch to interactive, and from your own computer to the web

Kernighan didn't really get hooked until a summer job at MIT's **Project MAC** in 1966, writing in the MAD language: "suddenly, things started to click... because it was interactive computing, you didn't have all this nonsense of punch cards." He used it to write a program to format his PhD thesis.

Today's beginners never make the step from batch to interactive, because "everything is just sitting there, waiting for them." Many first meet programming "totally intermediated by the web," for example in **Colab**: "The concept of a file system is foreign to students today, if they're not computer scientists."

Compare Shriram (Chapter 2), who argues batch constraints had hidden *benefits*, and Holzmann (Chapter 4), whose day-long punch-card turnaround "taught one to be really careful." For Kernighan, getting *away* from batch was "a giant step forward."

> [!NOTE]
> **KEY TERM: Time-sharing (interactive computing)**
>
> **Definition.** An operating system design in which many users share one computer at the same time through terminals. The OS switches rapidly among them, so each user gets interactive feedback, instead of submitting batch jobs. MIT's CTSS (1961) and Project MAC (1963) were early leaders. Project MAC's Multics then influenced Unix.
>
> **In the interview.** Kernighan's turning point: writing MAD programs interactively at Project MAC in 1966. (See *batch vs. interactive programming* in Chapter 2.)

> [!NOTE]
> **KEY TERM: Computational notebooks (Colab, Jupyter)**
>
> **Definition.** Web-based documents that mix executable code cells, their output (tables, plots), and prose. Jupyter is the open-source standard, and Google Colab hosts notebooks in the cloud with nothing to install. Notebooks lower the barrier to entry. They also hide the file system, processes, and environment, and they allow cells to run out of order, which is a well-known source of bugs.
>
> **In the interview.** For many students the first programming experience is "totally intermediated by the web," a "a different experience than having something that runs on your own computer, where you have to know where things are."

---

## Theme 2: The constant — getting the program to do what you (really) want

> "It's hard to get the program to do what you want. That's programming, in some sense... And sometimes what you thought you wanted to do turns out not to be what you really wanted, either."

This answer contains two problems: *verification* (does it do what I intended?) and *validation* (did I intend the right thing?). Kernighan ties it to the **feedback loop**. Writing for yourself, the loop is "about as tight as it can get." Writing for others, it gets longer. For him, much of the joy of programming was "having other people use what I wrote, and getting their feedback."

He is blunt about two settings that lack that loop:
- **Class assignments** are "totally useless. From any standpoint." Open-ended projects and side projects come closer.
- **Big industrial codebases.** At Google, most people worked "on an infinitesimal part of a very large program... 'changing the color of the buttons.'" Few professionals ever work on **greenfield** programs.

> [!NOTE]
> **KEY TERM: Verification vs. validation**
>
> **Definition.** Barry Boehm's classic phrasing. **Verification** asks "Are we building the product *right*?" Does it meet its specification? **Validation** asks "Are we building the *right* product?" Does it meet the real needs of its users? A program can pass verification perfectly and still fail validation.
>
> **In the interview.** "It's still hard to get the program to do what you thought you wanted it to do" is verification. "Sometimes what you thought you wanted... turns out not to be what you really wanted" is validation. Compare Zeller's specification-adequacy question (Chapter 5).

> [!NOTE]
> **KEY TERM: Greenfield vs. brownfield (legacy) development**
>
> **Definition.** *Greenfield* development builds a new system from scratch, with few constraints from existing code. *Brownfield* development works inside an existing system: its code, data, interfaces, and history. Most professional software work is brownfield: maintenance, extension, integration.
>
> **In the interview.** "Out in the real world, how many people work on greenfield programs of their own? A vanishingly small number." Groce suggests academia is one of the few places "you can write 'fresh' programs for a job." Compare Liskov's lessons from maintaining an assembler program (Chapter 3).

---

## Theme 3: Programming style, scale, and languages that help

Groce notes how much of *The Elements of Programming Style* (1974) still applies. Kernighan agrees, except for rules tied to dead language features ("don't use the arithmetic IF. Well, for crying out loud."). The durable rules are "about how you think about debugging, or how you think about organizing it, or documenting."

What languages *have* changed is support for **scale**. A thousand-line program is "pretty easy to keep in your head." At 100,000 lines, "some people can keep that in their head, but I'm not one of them." Beyond that, "nobody's got any clue whatsoever, and so the language has to help you." That help came as **structured programming**, then object-oriented programming, mechanisms that let strangers on different continents "write code that won't step on each other."

On safety, Kernighan quotes Stroustrup's quip that C++ can "blow off your whole leg," and says Python has "a different class of stupidities" because "there isn't very strong typing... You discover only after you've sent it off to everybody that something's broke." He tried Rust once: "it was challenging enough that I never wrote another."

> [!NOTE]
> **KEY TERM: Programming style**
>
> **Definition.** Principles for writing code that is clear, consistent, and maintainable: naming, structure, commenting, choosing the simplest clear construction, avoiding cleverness. *The Elements of Programming Style* (Kernighan and Plauger, 1974) stated these as rules illustrated by rewriting real textbook code. Examples: "Write clearly — don't be too clever"; "Say what you mean, simply and directly." Modern style guides and linters carry the tradition on.
>
> **In the interview.** Most of the book's rules still apply decades later, while language-specific ones ("don't use the arithmetic IF") are obsolete. Groce's takeaway: "maybe the deepest problems aren't totally different."

> [!NOTE]
> **KEY TERM: Structured programming**
>
> **Definition.** A discipline (Dijkstra, Böhm–Jacopini, Wirth, and others, late 1960s–1970s) of building programs only from sequence, selection (if/else), and iteration (loops), plus subroutines, with single-entry/single-exit blocks instead of arbitrary `goto` jumps. The goal is that the program's text structure mirrors its execution, so it is easier to understand and to reason about.
>
> **In the interview.** "Structured programming we all take for granted, although that was a hot topic in the late 60s, early 70s." Kernighan recalls Dijkstra's "'go-to considered harmful' letter and Knuth saying, well, goto's are alright. And I'd say, it's just nuts." It is also his first example of the methodology hype cycle (Theme 7).

> [!NOTE]
> **KEY TERM: Static vs. dynamic typing (strong vs. weak)**
>
> **Definition.** In *static* typing (Java, Rust, Go, Haskell), type errors are found before the program runs. In *dynamic* typing (Python, JavaScript), types are checked during execution, so a type error appears only when that code path runs. *Strong* vs. *weak* is a separate, looser axis: how much the language allows values to be misused as other types, for example C's unchecked casts and pointer arithmetic.
>
> **In the interview.** Python's "different class of stupidities" come from type errors found late, "after you've sent it off to everybody." C offers no protection at all: "you can do as many stupid things as you want, you don't get any help whatsoever." Compare Shriram's account of gradual typing (Chapter 2).

**No silver bullet, again.** Kernighan: "none of these languages have been the silver bullet. Nothing has been the silver bullet." He notes Brooks reaffirmed this around 1995. (See Chapter 1. Brooks's "'No Silver Bullet' Refired" appeared in the 1995 anniversary edition of *The Mythical Man-Month*.)

---

## Theme 4: Testing and debugging — the chapters he's proudest of

Of all his work, Kernighan is happiest with the **testing** and **debugging** chapters of *The Practice of Programming* (with Rob Pike), because "what's hard about programming is getting it right."

> "Most kids didn't have a clue about how to test. I'm writing a program that's supposed to add up numbers. What's the simplest case? No numbers. One number. Two numbers, can it do that? No, they'd put in 100 numbers and see what happens. And then they would approach debugging the same way. Not a clue about how to take a big set of possibilities and narrow it down."

Groce calls these chapters "one of the best concise summaries of how to think about testing and debugging." They are often more useful than whole books on unit testing.

> [!NOTE]
> **KEY TERM: Boundary-value testing (edge cases)**
>
> **Definition.** Choosing test inputs at and around the edges of the input domain and of internal conditions: empty, one element, two elements, maximum size, zero, negative, off-by-one values on either side of a limit. Bugs cluster at boundaries because that is where loop bounds, comparisons, and special cases go wrong. *The Practice of Programming*: "Test code at its boundaries."
>
> **In the interview.** The add-up-numbers example: test zero, one, and two numbers before trying 100. Compare Zeller's unhappy paths (Chapter 5). Boundaries are where the happy path ends.

> [!NOTE]
> **KEY TERM: Debugging by narrowing down (divide and conquer)**
>
> **Definition.** Systematically shrinking the space where a bug can be: bisecting the input, bisecting the code (commenting out halves, adding checkpoints), or bisecting the history (`git bisect`) until the cause is isolated. Each experiment should eliminate about half the remaining possibilities. Zeller's delta debugging (Chapter 5) automates the same idea.
>
> **In the interview.** Students had "not a clue about how to take a big set of possibilities and narrow it down to the point where you could start to see what went on." Kernighan calls debugging "kind of like detective work."

> [!NOTE]
> **KEY TERM: Test automation (mechanizing tests)**
>
> **Definition.** Turning tests from manual one-offs into scripts that run repeatably and check results automatically, so they can be rerun after every change: a regression suite. In the Unix tradition this often meant small scripts comparing a program's output to saved expected output.
>
> **In the interview.** *The Practice of Programming* explains "how you think about doing it, hand stuff, and then mechanizing various aspects of it." Kernighan notes that today "maybe you have to scale it way up."

---

## Theme 5: The biggest advances — high-level languages, block structure, and grammars

Kernighan's list, in order:

1. **High-level languages**, starting with John Backus's FORTRAN team at IBM. Backus faced programmers "all of whom thought they were the best assembly language programmers in the world," so "if we didn't make it efficient, nobody would ever use it." They "cut corners on language design" to make compilation efficient.
2. **ALGOL**, for **block structure** ("you come in at the top, and you come out at the bottom"), recursion, and a **formal description** of the syntax (BNF). The formal grammar "basically showed them how you write the recursive descent parsing," so Dijkstra and Hoare could write ALGOL 60 compilers quickly. Meanwhile "Moore's Law is rescuing people."
3. **Structured programming.**
4. **Object-oriented programming**: "Not a solution to all the problems of mankind, but definitely a useful approach."
5. **Functional programming**, which he oversimplifies as having had "no direct effect, but enormously positive indirect effect."

> [!NOTE]
> **KEY TERM: High-level language and compiler**
>
> **Definition.** A *high-level language* lets programmers write in terms of the problem (expressions, loops, data structures) instead of machine instructions. A *compiler* translates it into machine code. FORTRAN (Backus et al., IBM, 1957) was the first widely used one, and its optimizing compiler proved generated code could compete with hand-written assembly.
>
> **In the interview.** "Step one is high-level languages, right? Because without that..." "Good luck," Groce adds. Backus's constraint was efficiency, because programmers wouldn't otherwise adopt it.

> [!NOTE]
> **KEY TERM: Block structure and lexical scope**
>
> **Definition.** Grouping statements into nested blocks (`begin ... end`, `{ ... }`) with their own local declarations, visible only within the block (lexical scope). Blocks can be nested and treated as single statements. This came from ALGOL 60 and is the basis of almost every modern language.
>
> **In the interview.** "That basically trivial thing of block structure was especially important." It enabled structured programming and pairs naturally with recursion.

> [!NOTE]
> **KEY TERM: BNF (Backus–Naur Form) and formal grammars**
>
> **Definition.** A notation for context-free grammars, introduced by Backus and refined by Peter Naur for the ALGOL 60 report. Rules like `<expr> ::= <expr> + <term> | <term>` define a language's syntax precisely. Formal grammars enable parser generators (yacc, ANTLR) and *grammar-based fuzzing* (see Zeller, Chapter 5).
>
> **In the interview.** "It added a formal description of the language, and again, that was Backus." Kernighan gives Backus "full marks for BNF."

> [!NOTE]
> **KEY TERM: Recursive descent parsing**
>
> **Definition.** A top-down parsing technique with one (possibly recursive) function per grammar rule, each consuming the input that matches its rule. The structure of the code follows directly from the grammar, which makes it easy to write by hand. Many production compilers still use hand-written recursive descent parsers.
>
> **In the interview.** ALGOL 60's formal syntax "basically showed them how you write the recursive descent parsing, and the rest is easy." It is Kernighan's example of how formalization paid off practically.

> [!NOTE]
> **KEY TERM: Moore's law**
>
> **Definition.** Gordon Moore's 1965 observation, revised in 1975, that the number of transistors on an integrated circuit doubles roughly every two years. For decades it meant computers got exponentially faster and cheaper. Single-thread speedups slowed in the mid-2000s.
>
> **In the interview.** Dijkstra and Hoare "didn't worry about efficiency... But it was the right choice, and of course, all along, Moore's Law is rescuing people... Moore's Law will save you in a year." It lets designers trade efficiency for clarity.

---

## Theme 6: Pragmatism — C, C++, and a corridor at Bell Labs

"Pragmatic is very important." C reflects its machines: unspecified evaluation order, unspecified sizes of types, a compiler that had to run in about 8K bytes. C++ was even more pragmatic. Its first implementation translated to C, so you needed only a working C compiler to use it, and you got C's portability, libraries, and tools. That compatibility brought "weird syntax and bizarre properties" later.

Then there's the corridor. At Bell Labs, Bjarne Stroustrup's office and that of a colleague devoted to **Standard ML of New Jersey** had "an office that I would call the demilitarized zone" between them, and the two "wouldn't really talk to each other." Kernighan wonders what a merger of the two might have produced. Groce: "I'd like to write programs in that."

When Kernighan tried ML, he couldn't write the simple *Software Tools* programs: no command-line arguments, no file access, and it said "unit" after every statement. "If you want people to use your stuff, you have to make it so they can actually do things."

> [!NOTE]
> **KEY TERM: Backward compatibility**
>
> **Definition.** Designing a new system or version so existing programs, data, tools, or users keep working with it. Compatibility makes adoption much easier, which is why C++ compiled C programs and TypeScript accepts JavaScript. It also locks in old design decisions.
>
> **In the interview.** C++'s compatibility with C and Unix "meant it was portable, it meant it fit in a local environment, it meant you could use existing libraries and tools" and "downstream, of course, caused any number of complaints." Compare Shriram's gradual typing (Chapter 2).

> [!NOTE]
> **KEY TERM: Unspecified and undefined behavior**
>
> **Definition.** Language standards (especially C and C++) leave some behavior open. *Implementation-defined* behavior must be documented by each compiler, for example the size of `int`. *Unspecified* behavior can vary without documentation, for example the order in which function arguments are evaluated. *Undefined* behavior, such as signed overflow or out-of-bounds access, places no requirements at all on what happens. These choices let C run efficiently on varied hardware and are a large source of bugs and security vulnerabilities.
>
> **In the interview.** C's "ambiguities about order evaluation... no specification of how big things are" were "strongly encouraged by the nature of the computers of the time."

---

## Theme 7: Heroes — taste, and theory brought into practice

**Ken Thompson** tops Kernighan's list: "incredibly good insight, good taste. Tremendous ability, and put it out in a very pragmatic form." Multics, by contrast, "wasn't actually very practical. It was kind of over-engineered." Then Dennis Ritchie, Backus, and **Al Aho**, who "understood the theory of things like regular expressions and non-deterministic finite automata, and how you convert those into deterministic ones" and turned that theory into egrep and AWK. "People who bring theory and practice together are very important."

Admired systems: Unix itself, **vi** ("an amazing piece of work. Works everywhere"), W. Richard Stevens's books, and Tanenbaum's Minix as an inspiration for Linux.

> [!NOTE]
> **KEY TERM: Regular expressions and finite automata (NFA → DFA)**
>
> **Definition.** A *regular expression* describes a set of strings (a regular language) using concatenation, alternation (`|`), and repetition (`*`). Every regex can be converted to a **nondeterministic finite automaton (NFA)** (Thompson's construction, 1968), and every NFA to an equivalent **deterministic finite automaton (DFA)** (subset construction). The DFA matches in time linear in the input. Tools like egrep and AWK used this theory directly. Backtracking regex engines, by contrast, can take exponential time on some patterns.
>
> **In the interview.** Kernighan's example of a theory-to-practice hero: Aho "understood the theory... which then showed up in practical libraries... Awk and... egrep." Compare Shriram's HTML-and-regex misconception (Chapter 2) and Holzmann's automata-based Spin and Cobra (Chapter 4).

> [!NOTE]
> **KEY TERM: Over-engineering (and the Unix philosophy)**
>
> **Definition.** *Over-engineering* is building more generality, features, or complexity than the problem needs, making a system larger, slower to build, and harder to understand. The **Unix philosophy** is often summarized as: write programs that do one thing well, that work together (pipes), and that handle text streams as a universal interface.
>
> **In the interview.** Multics was "kind of over-engineered, I guess, is Ken's phrase for it" ("Lots of good ideas, but just too damn big"). Unix: "Only one idea, but do it really well. Little tiny thing with one guy, basically."

---

## Theme 8: Methodologies and the hype cycle

Kernighan gives a sharp account of how software methodologies spread:

> "There's a good idea, the germ of something really worth knowing about, and often applicable, and then ballooning out to opportunistic uses that make no sense... and then eventually it all gets absorbed into standard practice."

Structured programming was a real advance. Then came "this army of itinerant teachers, and proselytizers and scam artists," then structured analysis, structured design, structured testing, and "I found a reference to structured lunch breaks. Yes, right. I'm not kidding." Object-oriented programming went through the "same army of consultants." Agile's kernel: "You build a little bit and see whether it's solving maybe what the other person wanted... and you keep doing that."

On the **waterfall** he offers an original explanation. It is designed for **adversarial relationships**: a government ministry specifies "in great, enormous detail" and throws it "over the fence," and the contractor delivers "exactly what I wrote, even if it isn't even remotely what anybody needs." That, he says, is why there are "these enormous cost overruns on pretty much everything."

He then complicates his own view with Jennifer Pahlka's *Recoding America*. Government constraints are real. A benefits system must be **accessible** to people with disabilities from day one, so "you can't roll it out part way," which works against incremental delivery.

> [!NOTE]
> **KEY TERM: Methodology hype cycle**
>
> **Definition.** Kernighan's pattern (related to Gartner's "hype cycle"): a genuinely good idea is overextended by promoters into areas where it doesn't fit, then settles into standard practice with an understanding of when it applies. Recognizing the pattern helps engineers adopt the kernel and skip the hype.
>
> **In the interview.** Structured programming → "structured lunch breaks"; OOP → "object-oriented testing, object... et cetera." Compare Shriram (Chapter 2): "there's always some deep kernel of truth," and his advice to "extract the kernel of truth."

> [!NOTE]
> **KEY TERM: Waterfall as a contracting model**
>
> **Definition.** In government and large-enterprise procurement, waterfall is often less a technical method than a *contracting structure*. Fixed requirements are written up front, a contractor bids, and delivery is judged against the written specification. Changes require formal (and costly) amendments.
>
> **In the interview.** "The thing about the waterfall model is that it is intended for, in effect, adversarial relationships... I will spec out what I think I want... throw it over the fence to you. And your job is to... give me exactly what I wrote, even if it isn't even remotely what anybody needs." A third explanation of the waterfall, alongside Shriram's historicist derivation (Ch. 2) and Holzmann's defect-phase view (Ch. 4).

> [!NOTE]
> **KEY TERM: Incremental delivery vs. all-at-once constraints (accessibility)**
>
> **Definition.** *Incremental delivery* releases working subsets of a system early and often to get feedback. Some requirements cut across every feature and can't be deferred: legal mandates, accessibility (usable by people with visual, motor, or other disabilities, as required in the U.S. by Section 508 for federal systems), security, data migration. These limit how incremental a release can be.
>
> **In the interview.** The Social Security example from *Recoding America*: "You can't roll it out part way... because then those people would be disadvantaged... that is absolutely counter to something agile." Government teams, he says, "work under weird constraints that you and I, as just ordinary folk on the street, wouldn't think of."

---

## Theme 9: Design — "the antithesis of design"

Asked Shriram's design question, Kernighan agrees that computer scientists don't think much about design, and includes himself:

> "I suspect a lot of people in computing, certainly myself, like immediate gratification, so I'll put a few lines out there and see whether they do anything, and then I'll grow up from there, and this is, in a way, the antithesis of design."

The danger is ending up "off in the wrong direction... unchangeable," held there by **sunk cost**. He recalls Brooks's "plan to throw one away; you will, anyhow," and adds "I don't think most people think that way." (He also couldn't get through Brooks's *The Design of Design*.) For *books*, by contrast, top-down design "falls into place... more naturally."

> [!NOTE]
> **KEY TERM: Top-down design (stepwise refinement)**
>
> **Definition.** Designing by starting with the overall goal and decomposing it into progressively more detailed parts. Each part is refined until it is simple enough to implement directly (Wirth, "Program Development by Stepwise Refinement," 1971). The opposite, *bottom-up* design, builds useful pieces first and composes them.
>
> **In the interview.** Kernighan designs books top-down ("call it ten things I want to talk about, and then within that...") but programs bottom-up by "cut and try."

> [!NOTE]
> **KEY TERM: Prototyping ("plan to throw one away") and the sunk cost trap**
>
> **Definition.** A *throwaway prototype* is built to learn about a problem and then discarded before building the real system. Brooks: "plan to throw one away; you will, anyhow" (*The Mythical Man-Month*, 1975). The *sunk cost fallacy* is continuing to invest in something because of what has already been spent, not because of its future value.
>
> **In the interview.** "You've just got the sunk cost, and you don't want to change it, because, geez, all that stuff you did would be wasted... I'm gonna hack it into whatever shape I can."

---

## Theme 10: AI — a real paradigm shift, but "ordinary technology"

Kernighan opens with two caveats: he is "not very much an expert," and Arthur C. Clarke's warning about "the distinguished but elderly." Then:

- LLMs are a **paradigm shift**, "which is totally obvious, and we're in the middle of it."
- They will not replace programmers, but they *are* changing how professionals work. They are "the modern equivalent of code completion, and the infinitely large programmer's manual."
- They won't solve *design*: "How's it going to design a big program? Nope."
- They are **stochastic** and unreliable. Asked for ten little programs, "a couple of them won't work at all."
- Education: students see "a royal road to learning, and we'll just take it." In his humanities data-analysis seminars, students may use LLMs for analysis but not to write their reports.
- AGI talk is "crazy." He favors his Princeton colleague Arvind Narayanan's view of AI as an ordinary technology, like electricity and the Internet. (The essay, by Narayanan and Sayash Kapoor, is titled "AI as *Normal* Technology.")
- LLM writing tends to wash out "those tail things that make good writing stand out."

> [!NOTE]
> **KEY TERM: Stochastic (non-deterministic) generation**
>
> **Definition.** An LLM produces output by *sampling* from a probability distribution over next tokens. The same prompt can give different outputs, and output follows statistical patterns in training data rather than guaranteed reasoning. For software, results must be *checked* and may not be reproducible.
>
> **In the interview.** "They are stochastic, they are trained on stuff and then they're drawing inferences, probabilistic inferences... the odds are quite strong, a couple of them won't work at all." Compare Zeller's "glorified search and remix machines" (Chapter 5).

> [!NOTE]
> **KEY TERM: Paradigm shift**
>
> **Definition.** From Thomas Kuhn's *The Structure of Scientific Revolutions* (1962): a fundamental change in a field's basic concepts, methods, and standards, as opposed to incremental "normal science." Kuhn argued that competing paradigms are hard to compare from inside, and that the outcome is hard to predict while a shift is under way.
>
> **In the interview.** Kernighan's current book is about paradigm shifts in computing: analog to digital, the stored-program computer, integrated circuits, high-level languages, computability and complexity, networking, public-key cryptography, and now LLMs. He finds Kuhn hard to apply to computing ("it just didn't seem to fit"). Shriram (Chapter 2), by contrast, found Kuhn's historicist approach directly useful for teaching.

> [!NOTE]
> **KEY TERM: Stored-program computer (von Neumann architecture)**
>
> **Definition.** A computer whose instructions are stored in the same memory as its data, so programs can be loaded, changed, and even generated like data. The design is described in von Neumann's 1945 *First Draft of a Report on the EDVAC*. In Kernighan's words, the computer is then "basically, an interpreter." Nearly all general-purpose computers since work this way.
>
> **In the interview.** One of the paradigm shifts in Kernighan's book, which turned special-purpose machines (analog differential analyzers) into general-purpose ones.

> [!NOTE]
> **KEY TERM: Computability vs. complexity**
>
> **Definition.** *Computability theory* (Turing, 1936) asks what can be computed *at all*. Some problems, like halting, cannot. *Complexity theory* asks what can be computed *feasibly*: linear, quadratic, polynomial, exponential time, and so on. Hard problems are sometimes *useful*: public-key cryptography depends on problems like factoring large integers being infeasible.
>
> **In the interview.** "What can you compute? And then what can you compute feasibly or practically?... why you want problems that are hard sometimes, like... factoring integers... if that isn't a hard problem, the world might change." Compare Zeller's exponential-complexity argument about LLMs (Chapter 5).

---

## Theme 11: Doing good work

Kernighan's answer to "how do you do good research?" is to do "something that other people, in some way, will benefit from": a tool, a language, or a book. He cites Richard Hamming's talk "You and Your Research": work on problems that could matter, and if you aren't, ask why not. Hamming also observed that the world couldn't stand it if everyone had a big effect. Groce recommends R. A. Lafferty's "Slow Tuesday Night" as a fictional version of that world.

Compare Zeller (Chapter 5, "go into the dark"), Holzmann (Chapter 4, explaining and writing manuals as part of good science), and Ball (Chapter 1, "big blocks of uninterrupted time").

---

## Connections to other chapters

- **Chapter 1 (Ball):** Both name Bell Labs as formative, and both admire VS Code or vi as durable tools. Ball's "details matter" fits Kernighan's "it's hard to get the program to do what you want." Both invoke "no silver bullet."
- **Chapter 2 (Krishnamurthi):** Shriram re-derived the waterfall with respect; Kernighan explains it as a contracting model for adversarial relationships. Both describe methodology hype and the "kernel of truth." They disagree on batch computing's benefits.
- **Chapter 3 (Liskov):** Both see OOP as a scaling mechanism. Kernighan's "write code that won't step on each other" is Liskov's modularity in practical form.
- **Chapter 5 (Zeller):** Kernighan's testing advice (boundaries, narrowing down) is the manual form of what Zeller automates (unhappy paths, delta debugging). Both are skeptical of AGI claims.
- **Chapter 4 (Holzmann):** Both came out of Bell Labs' Computing Science Research Center and both name **Ken Thompson** as a hero. Read their accounts of him side by side.

## Discussion questions

1. Pick three rules from *The Elements of Programming Style* or *The Practice of Programming*. Do they still apply to Python or Rust today? Rewrite one example in a modern language.
2. Kernighan's students tested an add-up-numbers program with 100 numbers. Write the five tests you would write first, and explain each.
3. Kernighan says the waterfall suits adversarial relationships. Shriram says it was reasonable in 1955. Holzmann (Ch. 4) treats it as a scientific defect-tracking framework. Which explanation best fits a project you know?
4. Apply Kernighan's hype cycle to a current methodology or technology (microservices, DevOps, "vibe coding"). Where on the cycle is it, and what is its kernel?
5. Kernighan prefers "cut and try" for programs but top-down design for books. Why might the two differ? Should they?
6. Kernighan lets students use LLMs for data analysis but not to write reports. Propose and defend a policy for this course.

## Further reading

- B. W. Kernighan and P. J. Plauger, *The Elements of Programming Style* (2nd ed.), McGraw-Hill, 1978.
- B. W. Kernighan and R. Pike, *The Practice of Programming*, Addison-Wesley, 1999. (Ch. 6: Debugging; Ch. 4: Testing.)
- B. W. Kernighan and D. M. Ritchie, *The C Programming Language* (2nd ed.), Prentice Hall, 1988.
- B. W. Kernighan, *UNIX: A History and a Memoir*, 2019.
- B. W. Kernighan, *Understanding the Digital World* (2nd ed.), Princeton University Press, 2021.
- E. W. Dijkstra, "Go To Statement Considered Harmful," *CACM*, 1968; D. E. Knuth, "Structured Programming with go to Statements," *Computing Surveys*, 1974.
- N. Wirth, "Program Development by Stepwise Refinement," *CACM*, 1971.
- F. P. Brooks, Jr., *The Mythical Man-Month* (Anniversary ed.), Addison-Wesley, 1995.
- J. Pahlka, *Recoding America: Why Government Is Failing in the Digital Age and How We Can Do Better*, 2023.
- A. Narayanan and S. Kapoor, "AI as Normal Technology," 2025.
- R. W. Hamming, "You and Your Research," talk at Bell Communications Research, 1986.

---

## Key term index

| Term | Theme |
|---|---|
| Time-sharing (interactive computing) | 1 |
| Computational notebooks | 1 |
| Verification vs. validation | 2 |
| Greenfield vs. brownfield development | 2 |
| Programming style | 3 |
| Structured programming | 3 |
| Static vs. dynamic typing | 3 |
| Boundary-value testing | 4 |
| Debugging by narrowing down | 4 |
| Test automation | 4 |
| High-level language and compiler | 5 |
| Block structure and lexical scope | 5 |
| BNF and formal grammars | 5 |
| Recursive descent parsing | 5 |
| Moore's law | 5 |
| Backward compatibility | 6 |
| Unspecified and undefined behavior | 6 |
| Regular expressions and finite automata | 7 |
| Over-engineering / Unix philosophy | 7 |
| Methodology hype cycle | 8 |
| Waterfall as a contracting model | 8 |
| Incremental delivery vs. all-at-once constraints | 8 |
| Top-down design (stepwise refinement) | 9 |
| Prototyping and the sunk cost trap | 9 |
| Stochastic generation | 10 |
| Paradigm shift | 10 |
| Stored-program computer | 10 |
| Computability vs. complexity | 10 |
