# Chapter 5 — Andreas Zeller: Light in the Dark Places

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Andreas Zeller

Zeller is faculty at the CISPA Helmholtz Center for Information Security and professor of Software Engineering at Saarland University. He is best known for **delta debugging** and for founding work in **mining software repositories** with his then-student Thomas Zimmermann. He wrote *Why Programs Fail: A Guide to Systematic Debugging* (2005), which presented debugging as a systematic, causal, automatable activity rather than an art. With Rahul Gopinath, Marcel Böhme, Gordon Fraser, and Christian Holler, he wrote *The Fuzzing Book*, an interactive online textbook on test generation. He is an ACM Fellow and has won the SIGSOFT Outstanding Research Award, the SIGSOFT Influential Educator Award, and ten "Test of Time" awards.

The chapter title comes from the end of the interview. Zeller urges researchers to stop working "where the light is" and to "go out in the dark and shed light there."

## Reading guide

| Part of interview | What to watch for |
|---|---|
| A stolen calculator | Programming under extreme scarcity (38 steps!) |
| What stays the same | The "astonishment" when a program doesn't match your mental model, which is the essence of debugging |
| His contributions | Delta debugging and mining software repositories |
| SE's biggest advances | Unit tests, version control, reuse and abstraction, the "naturalness of software" |
| Practicality | SE research is "judged by its usefulness"; release your tools and datasets |
| Heroes | Erich Gamma, Prem Devanbu, Michael Ernst (Daikon), Knuth, Lamport, Liskov |
| Open source | Why GNU software drew him into academia; banks that don't *want* to know about bugs |
| Divide in practice | A "slope," not two leagues; the economics of formal verification |
| Worst practice | Testing only the **happy path** |
| Process | Agile, the waterfall "never done," and TDD as his favorite |
| AI | LLMs as "glorified search and remix machines"; debugging needs *experiments* |
| Impactful research | "Go out in the dark and shed light there" |

---

## Theme 1: Debugging is the constant — your model vs. reality

Zeller started on a programmable calculator with 38 steps, then a 128-step model on which he wrote and sold a version of Monopoly. Like Ball (Chapter 1) and Shriram (Chapter 2), he contrasts scarcity, where you "really need to think hard about the algorithms," with today's ecosystems, where "if you don't find it in the standard library, then you ask ChatGPT to build it for you."

What has stayed the same is the experience of debugging:

> "The one thing that has absolutely stayed the same is the astonishment when the program does not do what you expected it to do, when you feel that the model that you've built about how the program should work is obviously not consistent with reality. And then the question is, do you adapt reality to your model, or do you adapt your model to reality?"

That framing is the core of Zeller's approach to debugging. A failure is evidence that your *model* is wrong. Debugging is then the process of finding where model and reality diverge, ideally by experiment rather than by staring at code.

> [!NOTE]
> **KEY TERM: Scientific debugging**
>
> **Definition.** Debugging treated as an application of the scientific method. (1) Observe a failure. (2) Form a *hypothesis* about its cause. (3) Derive a *prediction* from it. (4) Run an *experiment* to test the prediction. (5) Refine or reject the hypothesis, and repeat until the cause is diagnosed. Keeping an explicit debugging log of hypotheses avoids the common failure of changing code at random. This is the organizing idea of Zeller's *Why Programs Fail*.
>
> **In the interview.** "50% of software development is essentially testing and debugging, which are, in their essence, experimental sciences. You need to experiment, otherwise it doesn't work." Zeller's argument about AI's limits (Theme 8) rests on this point.

> [!NOTE]
> **KEY TERM: Failure, fault (defect), and error (infection)**
>
> **Definition.** Zeller's book uses a careful vocabulary. A **defect** (or *fault*, or *bug* in code) is an incorrect piece of program text. When executed, it may cause an **infection**, an incorrect program *state*. The infection may propagate until it becomes a **failure**, externally visible wrong behavior. Not every defect causes an infection, and not every infection becomes a failure. Debugging works backward from a failure to the defect.
>
> **In the interview.** Zeller speaks informally of failures and bugs, but his description of delta debugging ("an input that causes the program to fail") and of experiments to find "what is going on and what is wrong" relies on this distinction.

---

## Theme 2: Delta debugging and mining software repositories

Zeller names two contributions that "have stood the test of time."

**Delta debugging** "takes an input that causes the program to fail. And by a series of systematic, automatic experiments, it reduces the input to a minimum that still causes the program to fail." He thinks it "must have saved millions of programmer hours" and calls it "almost embarrassingly simple, but… I made it that simple." Delta debugging first worked on *version histories*: given a working old version and a failing new one, which change caused the failure?

**Mining software repositories** (with Thomas Zimmermann and others) means "going systematically through the databases that programmers leave when they are building software". These include version control, bug trackers, and code review, and the analysis predicts things such as which files should change together. Groce notes that probably half his own papers now involve "we crawled through a bunch of GitHub repositories."

> [!NOTE]
> **KEY TERM: Delta debugging (ddmin)**
>
> **Definition.** An automated algorithm (Zeller and Hildebrandt, 2002) for simplifying a failure-inducing input. Split the input into chunks and test whether removing chunks (or keeping only some) still produces the failure. Keep any smaller input that still fails, and use finer chunks when nothing can be removed. The result is *1-minimal*: removing any single remaining element makes the failure go away. The same idea isolates failure-inducing *code changes* between two versions and failure-inducing differences in program *state*.
>
> **In the interview.** Zeller's most widely used contribution, "a very simple algorithm, it's almost annoyingly, it's almost embarrassingly simple." It "initially was on version history," which tied it to the rise of open-source version archives.

> [!NOTE]
> **KEY TERM: Test-case reduction (minimization)**
>
> **Definition.** The general task of shrinking a failing test (an input file, a program, a sequence of API calls) to a smaller one that still triggers the same failure. Smaller tests are easier to understand, debug, and report, and they make a better regression test. Delta debugging is the classic algorithm. Domain-aware reducers such as C-Reduce for C programs, hierarchical delta debugging for structured inputs, and the *shrinking* in property-based testing frameworks all build on it.
>
> **In the interview.** The chapter introduction notes that delta debugging is "widely used to handle both failures detected 'in the field' and inputs generated by automated test generation methods". Fuzzers routinely produce huge, unreadable failing inputs.

> [!NOTE]
> **KEY TERM: Mining software repositories (MSR)**
>
> **Definition.** A research area that extracts knowledge from the data developers produce as a side effect of their work: version control histories, issue trackers, code reviews, mailing lists, CI logs, and Q&A sites. Typical results: predicting defect-prone files, recommending files that usually change together, measuring who knows which code, and studying how practices spread. Zimmermann, Weißgerber, Diehl, and Zeller's "Mining Version Histories to Guide Software Changes" (ICSE 2004) is a founding paper. The MSR conference is now a major venue.
>
> **In the interview.** The data and techniques from this work "is all being used by AI systems all across the world." Zeller recalls that reviewers of the first paper "didn't know what to do with that! Oh, it seems interesting. Nobody's ever done that!"

> [!NOTE]
> **KEY TERM: Version control system (VCS)**
>
> **Definition.** A system that records the history of changes to a set of files, so developers can compare versions, revert changes, work on branches in parallel, and merge their work. Lineage: RCS and SCCS (single files), CVS and Subversion (centralized), then Git and Mercurial (distributed). Linus Torvalds wrote Git in 2005 for Linux kernel development.
>
> **In the interview.** Zeller lists version control among the most important inventions in software engineering: "without versioning systems, well, how would we ever have been able to... organize our software engineering?" Version histories also made delta debugging on changes and MSR possible.

---

## Theme 3: The biggest advances in software engineering

Asked about the biggest advances of the last 50 years, Zeller sets his own work aside as "a couple of rather baby steps" and names four:

1. **Unit tests**, specifically the xUnit framework idea, "developed, essentially, on a transatlantic flight, by Erich Gamma and Kent Beck." Before that, automated testing "if at all, was done at the system level."
2. **Version control**, through Git.
3. **Systematic reuse and abstraction of components**, built on research like Liskov's abstraction mechanisms and Parnas's criteria for decomposing systems into modules.
4. **The naturalness of software**: treating code as a sequence of tokens with statistical regularities, which leads straight to today's LLMs (Devanbu and colleagues).

He adds that version control, reuse, and naturalness came from academia, "the unit tests did not, I'm so sorry about that."

> [!NOTE]
> **KEY TERM: Unit testing framework (xUnit)**
>
> **Definition.** A library and conventions for writing small automated tests of individual units (functions, classes) with *assertions*, organized into test cases and suites with setup and teardown, and run by a test runner that reports pass or fail. Kent Beck's SUnit (Smalltalk) came first. Beck and Erich Gamma wrote **JUnit** for Java in 1997, famously while flying to the OOPSLA conference. Descendants include pytest, NUnit, and GoogleTest. Testing small units by hand is older. What the framework made cheap and routine was *automated, repeatable* unit testing.
>
> **In the interview.** "For me, this is one of the most important inventions of software engineering of all times." Compare Shriram's "anytime you make something 10x cheaper, it changes the way you use it" (Chapter 2).

> [!NOTE]
> **KEY TERM: Software reuse and components**
>
> **Definition.** Building new systems from existing parts (libraries, frameworks, packages, services) instead of writing everything from scratch. Reuse depends on good *abstractions* (clear interfaces that hide implementation, per Parnas and Liskov) and on infrastructure for sharing: package managers, open-source licenses, repositories.
>
> **In the interview.** "All of the success of software engineering, as we have it today, is mostly in the super systematic reuse and abstraction of components." When he started, "everybody would reinvent the wheel at all times". This echoes Ball's and Shriram's scarcity-vs.-abundance contrast.

> [!NOTE]
> **KEY TERM: Naturalness of software**
>
> **Definition.** The finding (Hindle, Barr, Su, Gabel, and Devanbu, "On the Naturalness of Software," ICSE 2012) that real code is highly repetitive and predictable. Statistical language models trained on code predict the next token even better than such models do for English. This justified applying NLP techniques to code and is an intellectual ancestor of code-completion tools and LLM-based coding assistants.
>
> **In the interview.** Zeller calls "the idea that you could actually go and treat software code as essentially sequences of tokens" a breakthrough that "came out of software engineering." He also argues (Theme 8) that tokens are "not the right abstraction for... the most semantically rich representation of knowledge that humankind has ever come up with, which happens to be software code."

---

## Theme 4: Usefulness, empirical evidence, and research artifacts

"Software engineering, first and foremost, research is judged by its usefulness." Zeller contrasts this with other fields: elegance in programming languages, intellectual challenge in formal methods, vulnerabilities found in security. Usefulness has to be shown "in real-world contexts," and "real-world context tends to be hairy," which makes empirical SE hard.

His example of confounding is a nice one. A study might show that bigger screens make people more productive, "or maybe it's that productive people tend to earn more, or tend to... get to environments, where they can have bigger screens!"

His second point: *release your tools and datasets*. A dataset like **Defects4J** has had far more impact than any paper describing it could have: "if the data set had just been described in that paper and never, ever been released, well, the impact... would have been close to zero."

> [!NOTE]
> **KEY TERM: Empirical software engineering and confounding variables**
>
> **Definition.** *Empirical SE* studies software development through observation and experiment: controlled experiments, case studies, surveys, and repository mining. A **confounding variable** is a third factor that influences both the supposed cause and the effect, creating a misleading correlation. *Threats to validity* (internal, external, construct) are the standard way SE papers discuss such limits.
>
> **In the interview.** The big-screen example. Zeller says theories in SE are "slow to evolve" because "every time you do a big study, you... add a little bit of evidence to a big building." MSR has made validation "much easier... than it would be in the past with... immense big user studies."

> [!NOTE]
> **KEY TERM: Research artifacts and benchmark datasets (Defects4J)**
>
> **Definition.** *Artifacts* are the tools, datasets, and scripts behind a research result. Releasing them enables replication and reuse. **Defects4J** (Just, Jalali, and Ernst, ISSTA 2014) is a curated collection of real bugs from open-source Java projects. Each bug comes with the buggy and fixed versions and a test that exposes it. It became a standard benchmark for testing, fault localization, and program repair research. Many SE venues now run *artifact evaluation*.
>
> **In the interview.** "The bean counters at our institutions tend to count... papers... But in fact, the data sets and tools that we produce, and the effort that we put into maintaining them, is not always rewarded well enough." Groce adds: "This is why you have to write a tool paper!"

---

## Theme 5: Heroes — Gamma, Devanbu, Ernst, and the Turing laureates

Zeller names **Erich Gamma** first. Gamma co-created JUnit, co-authored *Design Patterns* (the "Gang of Four"), and led Eclipse and VS Code, always "with a super strong sense for usefulness." (Ball, in Chapter 1, also singles out VS Code.) Zeller also names Prem Devanbu (naturalness), Michael Ernst (Daikon, "eye-opening transitions between static analysis and dynamic analysis"), and, "in the realm of celebrities," Knuth, Lamport, and Liskov. He points out that Knuth published in *Mad* magazine (the "Potrzebie System of Weights and Measures," 1957).

At the ACM's 50 Years of the Turing Award celebration, Zeller reflected that "none of the folks that we mentioned in our community of software engineering has made it to a Turing Award." Groce suggests Fred Brooks.

> [!NOTE]
> **KEY TERM: Design patterns**
>
> **Definition.** Named, reusable solutions to recurring design problems in object-oriented software, such as Observer, Strategy, Factory, Decorator, and Composite. Each pattern describes the problem, the structure of the solution, and the trade-offs. They were popularized by *Design Patterns: Elements of Reusable Object-Oriented Software* (Gamma, Helm, Johnson, and Vlissides, 1994), the "Gang of Four" book, which drew on Christopher Alexander's architectural patterns.
>
> **In the interview.** Zeller credits Gamma: "in terms of theory, the whole concept of design patterns... has been tremendously, tremendously influential." Compare Shriram's point (Chapter 2) that cheap object allocation is what *made* object-rich patterns practical.

> [!NOTE]
> **KEY TERM: Dynamic invariant detection (Daikon)**
>
> **Definition.** Inferring *likely* program invariants by observing many executions. Examples: "`x` is always positive at this point," "`size == elements.length`," "the return value is always ≥ the argument." Daikon (Ernst et al., 1999/2001) instruments a program, runs a test suite, and reports properties that held in every observed run. These are hypotheses, not proofs, but they help with documentation, test assessment, and as candidate annotations for static verification.
>
> **In the interview.** Zeller credits Ernst with "using dynamic analysis of programs in order to detect likely static properties". This is another case of the static/dynamic blur Ball describes in Chapter 1.

---

## Theme 6: Open source, industry, and the economics of assurance

As a student, Zeller found GNU software "leagues ahead" of the closed-source industrial software he had seen. It was well designed and commented, and it had *processes*: submitted patches were discussed and approved, and it used version control and automated tests, "none of that... particularly widespread in industry at the time." That is what drew him into academia.

He warns against assuming all industry looks like open source. Some banks, he says, *don't want to know* about bugs: "every single bug is a liability... They'd rather be totally ignorant."

On the industry divide, Zeller sees "an entire slope," not two leagues. What sets the right level of rigor is the *cost of failure*. For Microsoft a kernel vulnerability can cost "tens, hundreds of millions of dollars," and for NASA a failure can cost a billion-dollar mission. For software used by a dozen people, where a crash costs "some minutes of an operator," perfect software "may never recoup those investments."

He is pointed about calls to formally verify everything. He gives three objections: cost (verified software is "a zillion times more costly"), expertise ("you actually need to get hold of the one PhD student who built the prover!"), and **specification adequacy** ("What is the specification you verify it against? How do you know there are no holes in the specification?"). The answer is a *spectrum* of techniques, from full proof through runtime verification and fuzzing to unit tests.

> [!NOTE]
> **KEY TERM: Open-source development process (patches, review, forks, backports)**
>
> **Definition.** In typical open-source projects, contributors submit **patches** (now usually pull requests) that maintainers and others **review** publicly before merging. If maintainers won't accept a change, anyone may **fork** the project and keep a separate line of development. A **backport** applies a fix from a newer version to an older, still-supported release.
>
> **In the interview.** Zeller describes this process as something that "very thoroughly influenced me." "If the maintainers don't do the fix... You create a fork where the bug is fixed, and later on your backport the whole thing."

> [!NOTE]
> **KEY TERM: Cost of failure and the spectrum of assurance**
>
> **Definition.** How much verification and validation effort is justified depends on the *expected cost of failure*: its probability times its consequences (money, safety, reputation, regulatory exposure). Assurance techniques range from cheap and partial to expensive and strong: code review and unit tests; static analysis and fuzzing; runtime verification; model checking; full formal proof. Safety-critical domains (aerospace, medical devices) sit at the high end.
>
> **In the interview.** "In practice, you have to come up with a range of techniques to validate software. From the really high end, I'm going to formally prove that this works. To the low end, well, let me write some unit tests, at least to prevent the worst." Compare Ball's "return on investment" (Chapter 1) and Holzmann's JPL experience (Chapter 4).

> [!NOTE]
> **KEY TERM: Runtime verification**
>
> **Definition.** Checking a running system's execution against a formal specification, often written in temporal logic or as an automaton, using monitors that observe events and flag violations. It is lighter weight than proving properties for all executions, but it checks only the executions that actually happen. Monitors can run during testing or stay deployed in production.
>
> **In the interview.** Zeller lists it among the "lightweight proof techniques" that have made assurance practical at scale. (Groce's JPL colleague Klaus Havelund, mentioned in Chapter 4, is a leading runtime verification researcher.)

> [!NOTE]
> **KEY TERM: Specification adequacy ("verified against what?")**
>
> **Definition.** A proof shows that a program meets its specification, *not* that the specification captures what users actually need. A specification can be incomplete (silent about important behavior), wrong, or inconsistent. Validating the specification is a separate and often harder problem than verifying the code.
>
> **In the interview.** "What is the specification you verify it against? How do you know there are no holes in the specification?" Groce agrees: with LLM-generated proofs, "the spec may be wrong is always the problem." Compare Shriram's "pair of artifacts" (Chapter 2): the specification is only useful if it is genuinely independent and genuinely right.

---

## Theme 7: The worst practice — testing only the happy path

> "Coming from a testing perspective... the worst practice I see is only checking the happy path... for every single happy path, there's are unfortunately a dozen or more unhappy paths that you also need to test."

Zeller's example is a five-digit zip code field. Inputs to consider include negative numbers, strings of zeros, zero bytes, 5,000 characters, Unicode characters that count as "digits" but won't be treated as numbers downstream, and "Semicolon, DROP TABLE, whatever thingy."

**Try it (Python):**

```python
>>> import re
>>> re.fullmatch(r"\d{5}", "٨٦٠٠١")   # Arabic-Indic digits: matches!
<re.Match object; span=(0, 5), match='٨٦٠٠١'>
>>> "①".isdigit(), int("٣")            # circled one "is a digit"; int() accepts Arabic-Indic 3
(True, 3)
>>> int("①")                            # ...but this raises ValueError
```

His second example is Microsoft Word's save function. It writes to a temporary file, falls back to other locations, handles disk-corruption signals, and handles low power, a "whole cascade of events." The engineer he asked didn't know whether the end of the cascade had ever been reached, "But if this happens, the file will be saved under all conditions."

He also explains why the problem persists: "They are not being paid for figuring out the many ways it could not work." Groce calls it the **Anna Karenina principle**: happy paths are all alike, but there are countless ways to go wrong.

> [!NOTE]
> **KEY TERM: Happy path vs. unhappy paths (negative testing)**
>
> **Definition.** The *happy path* is the expected, error-free scenario: valid input, everything available, the user does what was intended. *Unhappy paths* are everything else: invalid or malformed input, boundary values, resource failures, timeouts, concurrency, hostile users. *Negative testing* deliberately checks that a system rejects or handles bad conditions correctly.
>
> **In the interview.** Zeller's "worst practice." "Functionality also encompasses the many ways to be defensive against the many ways that software could break." He wants "better standards... better regulation," because unhandled unhappy paths are "entrance doors for hackers."

> [!NOTE]
> **KEY TERM: Input validation and injection attacks**
>
> **Definition.** *Input validation* checks that external input has the expected form before it is used. Robust validation is *allowlist*-based (accept only what's known to be good) and aware of encodings such as Unicode. An *injection attack* such as SQL injection supplies input that the program accidentally treats as code. The standard defense against SQL injection is parameterized queries, not string filtering.
>
> **In the interview.** The zip code example, including Unicode digits that pass a `\d` check, and "let's not even go into SQL injection, whatever. Semicolon, DROP TABLE."

> [!NOTE]
> **KEY TERM: Defensive programming and failure-atomic operations**
>
> **Definition.** *Defensive programming* means writing code that anticipates and safely handles invalid inputs, failures of dependencies, and impossible-seeming states, instead of assuming the happy path. A *failure-atomic* operation either completes fully or leaves the old state intact. Writing to a temporary file and then atomically renaming it over the original is a standard way to make "save" failure-atomic.
>
> **In the interview.** The Word save cascade. Never overwrite the original in place, "because if something breaks in the middle of that overwriting, then both your original file and the file you were working on are lost." Compare Liskov's transactions (Chapter 3), the same all-or-nothing idea.

> [!NOTE]
> **KEY TERM: Responsible (coordinated) disclosure**
>
> **Definition.** A norm for reporting security vulnerabilities. The finder privately notifies the vendor and allows a fixed period (often 90 days) for a fix before details are published. The publication deadline gives vendors a reason to act.
>
> **In the interview.** Zeller calls it "essentially blackmailing": "You fix that, or I'm going to publish it." It exists because reports are otherwise often ignored. He worries "how vulnerable our critical systems actually are... in the light of the current geopolitical climate". Fuzzing a system "that has never seen a fuzzer before" usually crashes it.

> [!NOTE]
> **KEY TERM: Fuzzing**
>
> **Definition.** Automated testing that feeds a program large numbers of generated inputs (random, mutated from samples, or produced from a grammar or model) and watches for crashes, hangs, assertion failures, or sanitizer reports. *Coverage-guided* fuzzers (AFL, libFuzzer) keep inputs that reach new code. *Grammar-based* fuzzers generate syntactically valid inputs to get past parsers. *The Fuzzing Book* covers both.
>
> **In the interview.** Zeller recommends "comparatively lightweight testing techniques, such as fuzzing" in the assurance spectrum. His current research is "infusing formal languages with fuzzing."

---

## Theme 8: Process — Agile yes, waterfall "never done," and TDD as favorite

Zeller declines to judge requirements engineering. He notes that early-phase ideas are much harder to evaluate with numbers than a fuzzer is: "If I build a fuzzer... I press a button, boom, it works." He sees a clear trend toward agile development and prototypes. He claims the waterfall "as far as I know, has never ever been done by anyone really." (Compare Shriram's re-derivation of it, Kernighan's "adversarial relationships" account in Chapter 6, and Holzmann's defect-tracking version in Chapter 4.)

His favorite process is **test-driven development**:

> "You start your day with, I don't know, 200, 500 tests, all failing... slowly but surely reducing the set of failing unit tests... always at the touch of a button, you know how close you are to success."

Compare Shriram in Chapter 2: "I do happen to think TDD is not a good idea." Zeller also adds a caution: for safety-critical systems, "a bunch of tests would typically not be sufficient". You need systematically derived tests or test generation "including oracles, of course."

> [!NOTE]
> **KEY TERM: Test oracle**
>
> **Definition.** The mechanism that decides whether a test's observed behavior is correct: an expected value, an assertion, a reference implementation, a property, or a human. The *oracle problem* is that for many programs (and for generated tests) there's no cheap, reliable way to know the right output. That is why fuzzers often settle for "didn't crash" and why property-based testing, differential testing, and metamorphic testing exist.
>
> **In the interview.** Zeller's aside on generating "thousands and thousands of tests... including oracles, of course, which is thing" points to one of the hardest problems in automated testing.

> [!NOTE]
> **KEY TERM: Test-driven development (TDD) — the case for**
>
> **Definition.** (See Chapter 2.) Write tests that state required behavior first, then implement until they pass, refactoring as you go.
>
> **In the interview.** Zeller's favorite process, and he says student teams "have been very successful with that." He describes a variant where *many* tests (including unhappy paths) are written first from requirements, which is closer to acceptance-test-driven development than to Beck's one-test-at-a-time loop. **Discussion:** is the difference between Zeller's and Shriram's views about TDD itself, or about *which* version of it?

> [!NOTE]
> **KEY TERM: Refactoring**
>
> **Definition.** Restructuring code to improve its internal design (readability, modularity, removal of duplication) *without changing its external behavior*. Automated tests are what make refactoring safe. Martin Fowler's *Refactoring* catalogs common transformations.
>
> **In the interview.** Zeller credits research with helping teams keep prototypes' "internal structure, or at least not letting their internal structure entirely go down the drain" while "being faster in refactoring things."

---

## Theme 9: AI — "glorified search and remix," and why debugging needs experiments

Zeller makes the clearest *technical* argument in the book so far about LLMs' limits. (Groce calls it "the most convincing argument I think I've heard yet.") He begins with a hedge: "ask me again in two years."

1. **LLMs are strong within a domain.** They learn code and produce code "marvelously well." Copilot had read his *Fuzzing Book* and completed his live-coding demos for him, so he now turns it off in lectures to "appear a bit more human and more mortal."
2. **They fail at moving between abstract and concrete.** Predicting what a piece of code will *do* is hard even for humans. "When our abstraction fails... we very, very slowly need to reason about and experiment with the code."
3. **Complexity doesn't vanish.** "We are talking about problems that are of exponential complexity, if not downright, undecidable. And you do not make an exponential problem solvable in constant time, simply because you attach another algorithm to it."
4. **The fix is experimentation.** Future systems might learn by having them "run experiments again and again and again" on specific software, and software is where AI experimentation will advance first, "because you can run zillions of experiments in a sandbox."
5. **Maintenance comes due.** "You cut down your workforce right now... and then you have all these vibe coders... Maintaining all this AI-written code, how are we going to do that? And then you're going to be very sorry you just laid off your best engineers."

On verification he is more hopeful. He jokes about "vibe testing" and "vibe proofs." When Groce describes an LLM suggesting loop invariants for Dafny, Zeller notes the advantage: "once the prover says, okay, I can prove this property... then you're done." The prover is an independent check (compare Shriram's pair of artifacts).

> [!NOTE]
> **KEY TERM: Undecidability of program behavior (Rice's theorem) — applied**
>
> **Definition.** (See Chapter 2.) By Rice's theorem, no algorithm can decide any non-trivial property of what an arbitrary program does. Practical tools approximate, and approximate answers need *checking*, often by running the program.
>
> **In the interview.** Zeller's argument that LLMs can't simply "know" what code does: "you do not make an exponential problem solvable in constant time, simply because you attach another algorithm to it." His answer is experimentation. Compare Shriram's "undecidable, schmundecidable" (Chapter 2), which is the same theory seen from the tool builder's side.

> [!NOTE]
> **KEY TERM: Loop invariant (in automated verification)**
>
> **Definition.** A property that holds before a loop and after every iteration. Verifiers like Dafny usually can't infer the invariants needed to prove a loop correct, so a programmer, or increasingly an LLM, must supply them. Then the verifier *checks* them, so a wrong suggestion is rejected, not trusted.
>
> **In the interview.** Groce describes asking an LLM "What's a loop invariant that I need?" while using Dafny. Zeller compares a successful proof to type checking: "if the type checker says that all types are correct, well, that's an achievement."

---

## Theme 10: Impactful research — go into the dark

Zeller's answer to "what didn't I ask?" was how to do impactful research. He began as a professor on the day a student shot his department's dean, who survived. When they finally met three months later, the dean told him: "there's only one metric that we care about: produce a sizable number of good professors... Take your time, do good work."

Zeller deliberately chose **under-researched** areas: debugging ("awfully under-researched. Debugging still is"), then version histories, then specification mining, mutation testing, automated parallelization, and others. He changes direction roughly every seven years. He co-invented **automated program repair** but held back when Claire Le Goues and colleagues published stronger work first.

> "We shouldn't just go there where the light is and add yet another twist to things, but we should go out and find out, go into the darkness and find the true problems of software engineering."

He is candid about the cost. Novel work is harder to publish, because reviewers ask "Is that good, or is that bad?" when there's no state of the art to compare against. Proposals get "why should it be you?" And it's easier when "you're tenured."

> [!NOTE]
> **KEY TERM: Automated program repair (APR)**
>
> **Definition.** Techniques that automatically generate patches for bugs, usually guided by a failing test suite. Approaches include search-based mutation of code (GenProg: Le Goues, Weimer, Forrest, and colleagues, around 2009–2012), semantic or constraint-based repair, template-based repair, and LLM-based repair. A known risk is *overfitting*: patches that pass the tests without truly fixing the bug.
>
> **In the interview.** Zeller says he "with a colleague of mine, invented automated repair of programs," but that Le Goues and others "came up with a great presentation of this... their work was so much better than ours." A rare example of a researcher telling the story of being scooped.

> [!NOTE]
> **KEY TERM: Specification mining**
>
> **Definition.** Automatically inferring specifications from code or executions. Examples are API usage rules ("`open` must precede `read`"), finite-state models of object protocols, and invariants (see Daikon). Mined specifications can then document code, guide testing, or find violations.
>
> **In the interview.** One of the research directions Zeller took up in his roughly seven-year cycle. It links the idea that Ball's SLAM checked API rules written by hand (Chapter 1) with the question of where such rules come from.

---

## Connections to other chapters

- **Chapter 1 (Ball):** Both admire Erich Gamma's VS Code. Both describe AI's need for more context and experimentation. Ball's "breadcrumbs" and Zeller's "training on experiments" are two views of the same gap. Daikon is another case of Ball's static/dynamic blur.
- **Chapter 2 (Krishnamurthi):** Directly opposed on TDD. They agree that verification matters more as code gets cheaper. Zeller's prover-checked "vibe proofs" are Shriram's pair of artifacts. Groce asked Zeller Shriram's design question, and Zeller deferred to Shriram as "another one of my heroes."
- **Chapter 3 (Liskov):** Zeller credits Liskov's abstraction mechanisms for modern reuse. His Word save example shows Liskov's transactional all-or-nothing idea at the level of a single function.
- **Chapters 4 and 6 (Holzmann, Kernighan):** All three describe testing as finding your own mistakes. Compare Kernighan's "most kids didn't have a clue about how to test" and Holzmann's "it is always my mistake."

## Discussion questions

1. Zeller says debugging is about adapting "your model to reality." Describe a recent bug where your mental model was wrong. What experiment would have exposed the mismatch fastest?
2. List 12 unhappy-path inputs for a field that accepts a US phone number. Which would your favorite web framework's built-in validators catch?
3. Zeller claims the waterfall "has never ever been done by anyone really." Shriram re-derived it; Kernighan (Ch. 6) says it suits "adversarial relationships." Who's right? Can all three be?
4. Zeller and Shriram disagree about TDD. Design an experiment for a student project course that could provide evidence either way. What are the confounding variables?
5. Is Zeller's "you do not make an exponential problem solvable in constant time" argument convincing? What would an AI need to do to get around it?
6. Zeller urges researchers to "go into the darkness." What would that mean for choosing a senior capstone or a first job?

## Further reading

- A. Zeller, *Why Programs Fail: A Guide to Systematic Debugging* (2nd ed.), Morgan Kaufmann, 2009.
- A. Zeller, R. Gopinath, M. Böhme, G. Fraser, C. Holler, *The Fuzzing Book*. Free online at fuzzingbook.org.
- A. Zeller, *The Debugging Book*. Free online at debuggingbook.org.
- A. Zeller and R. Hildebrandt, "Simplifying and Isolating Failure-Inducing Input," *IEEE TSE*, 2002.
- A. Zeller, "Yesterday, My Program Worked. Today, It Does Not. Why?" ESEC/FSE 1999.
- T. Zimmermann, P. Weißgerber, S. Diehl, A. Zeller, "Mining Version Histories to Guide Software Changes," ICSE 2004.
- A. Hindle, E. Barr, Z. Su, M. Gabel, P. Devanbu, "On the Naturalness of Software," ICSE 2012.
- R. Just, D. Jalali, M. D. Ernst, "Defects4J: A Database of Existing Faults to Enable Controlled Testing Studies for Java Programs," ISSTA 2014.
- M. D. Ernst et al., "Dynamically Discovering Likely Program Invariants to Support Program Evolution," *IEEE TSE*, 2001.
- E. Gamma, R. Helm, R. Johnson, J. Vlissides, *Design Patterns*, Addison-Wesley, 1994.

---

## Key term index

| Term | Theme |
|---|---|
| Scientific debugging | 1 |
| Failure, fault (defect), and error (infection) | 1 |
| Delta debugging (ddmin) | 2 |
| Test-case reduction | 2 |
| Mining software repositories | 2 |
| Version control system | 2 |
| Unit testing framework (xUnit) | 3 |
| Software reuse and components | 3 |
| Naturalness of software | 3 |
| Empirical SE and confounding variables | 4 |
| Research artifacts / Defects4J | 4 |
| Design patterns | 5 |
| Dynamic invariant detection (Daikon) | 5 |
| Open-source process (patches, review, forks, backports) | 6 |
| Cost of failure and the spectrum of assurance | 6 |
| Runtime verification | 6 |
| Specification adequacy | 6 |
| Happy path vs. unhappy paths | 7 |
| Input validation and injection attacks | 7 |
| Defensive programming / failure-atomic operations | 7 |
| Responsible disclosure | 7 |
| Fuzzing | 7 |
| Test oracle | 8 |
| TDD — the case for | 8 |
| Refactoring | 8 |
| Undecidability of program behavior (applied) | 9 |
| Loop invariant (in automated verification) | 9 |
| Automated program repair | 10 |
| Specification mining | 10 |
