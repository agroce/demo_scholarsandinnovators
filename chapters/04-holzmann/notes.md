# Chapter 4 — Gerard Holzmann: Model Checking the Cosmos

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Gerard Holzmann

Holzmann created the **Spin** model checker, one of the most widely used software verification tools ever built. It received the ACM Software System Award, an award whose earlier winners include Unix, TCP/IP, Apache, and Mosaic. He spent the first part of his career in Bell Labs' Computing Science Research Center alongside the creators of Unix and C. In 2003 he founded **JPL's Laboratory for Reliable Software** at NASA's Jet Propulsion Laboratory, which contributed to the Curiosity Mars rover and other flagship missions. His honors include the Paris Kanellakis Theory and Practice Award, the SIGSOFT Outstanding Research Award, the IEEE Harlan D. Mills Award, and NASA's Exceptional Engineering Achievement Medal. He is a member of the National Academy of Engineering.

Groce's introduction is personal: Holzmann was his "first 'boss'" after his PhD. Groce joined the new JPL lab in 2005 as its third member and calls Holzmann "the best boss I ever had."

## Reading guide

| Part of interview | What to watch for |
|---|---|
| ALGOL68 and punch cards at Delft | "It is always my mistake, and not the machine" |
| What has changed | AI adds the excuse "the machine didn't quite understand me," but the "almost right" problem remains |
| What programmers need | Logic, automata theory, and philosophy |
| His tools | Pico (image editing), Spin (model checking), Cobra (interactive static analysis) |
| Theory vs. practice | Omega automata waited for an application in program verification (Pnueli's LTL); Bell Labs' research culture |
| Explaining as science | Publishing, teaching, and **writing the manual** expose bad design |
| Heroes | Amir Pnueli, Ken Thompson ("Is there any other way?"), Rob Pike |
| AI | Astonishing, but we don't know *why* it works; test it like a person |
| Worst practice | Believing software is done once it passes a few tests |
| JPL vs. AT&T | Why one organization listened and the other didn't |
| Process | Tracking where defects are *introduced* vs. *found*, and how far they "travel" |
| Design | Subconscious incubation; the "Ken Thompson moment"; maintaining every line yourself |
| Advice | Study foundations; learn to think |

---

## Theme 1: "It is always my mistake, and not the machine"

Holzmann studied at Delft before it had a computer science department. Computer science was part of mathematics, and his advisor Willem van der Poel had chaired the ALGOL 68 committee. Programs were written on 80-column coding paper, punched onto cards, and submitted to an IBM 360. The next day brought "syntax error on line 12." This "painfully slow process taught one to be really careful."

The moment he chose his career came from a bug he couldn't find:

> "Initially, when you start doing this, you first think that the computer is wrong, because you had checked everything so carefully. But then after a while, you realized that the computer is far less likely to make a mistake than you as a human being... There's a dumb machine there that can outsmart me. This is what I want to do... how can we find better ways of finding our own mistakes before the machine does it."

That is a good summary of the verification field. Compare Zeller's "astonishment" when the program doesn't match your model (Chapter 5) and Kernighan's "it's hard to get the program to do what you want" (Chapter 6).

**What AI changes.** "The only thing maybe that is different with AI is... you can blame it a little bit, where before you couldn't do that." Holzmann, like Groce, takes the AI's first answer and fixes it himself rather than refining the prompt. The key word is "almost": "It's often not quite right, and so we have to come back to figuring out where the problem is, and that's the fun part."

> [!NOTE]
> **KEY TERM: Software analysis (finding our own mistakes)**
>
> **Definition.** The umbrella term for techniques that examine software to find defects or establish properties *before* the software fails in use. It covers static analysis, model checking, testing, runtime verification, and formal proof. Verification is one part: showing that software meets a specification.
>
> **In the interview.** When Groce sums up Holzmann's goal as "Verification," Holzmann answers: "Yes, or more generally software analysis." His master's thesis analyzed blocking probabilities in telephone switches, "verifying hardware properties by modeling it in software."

> [!NOTE]
> **KEY TERM: Unintended consequences (and AI safety as verification)**
>
> **Definition.** Behavior of a system that its designers didn't intend or foresee, even when the system meets its stated requirements. In AI, *safety* and *alignment* research tries to keep AI systems from producing harmful unintended behavior. That is a verification problem for systems whose internals aren't understood.
>
> **In the interview.** "There may still be unintended consequences. We have to be aware of that and see how we can make AI safe... That's in a broad sense still an issue of verification, analysis, and correctness."

---

## Theme 2: What every programmer needs — logic, automata, and philosophy

Asked what working programmers most need, Holzmann goes to foundations, not tools:

1. **Logic.** "When you talk to students who are 18 to 20 years old, they do not understand basic logic principles, logical reasoning, and avoiding standard pitfalls."
2. **Automata theory**, "because that teaches you something about how computers work at an abstract level."
3. **Philosophy and the history of thought.** "For an educated person, that is essential knowledge."

He repeats this at the end of the interview and adds literature ("Don't just read trash, read the big authors"). Compare Butler Lampson's advice to study the humanities, which Krishnamurthi quotes in Chapter 2, and Harry Lewis's anthology of classic CS papers that begins with Aristotle and Leibniz.

> [!NOTE]
> **KEY TERM: Formal logic (propositional and predicate)**
>
> **Definition.** *Propositional logic* reasons about true/false statements joined by AND, OR, NOT, and IMPLIES. *Predicate (first-order) logic* adds variables, predicates, and quantifiers ("for all," "there exists"). Logic is the language of specifications (pre/postconditions, invariants), of verification tools, and of correct reasoning about code. Common pitfalls include confusing "A implies B" with "B implies A" and mishandling negated quantifiers.
>
> **In the interview.** Holzmann considers "taking a course in pure logic" essential, and sees its absence as a weakness of today's engineering students.

> [!NOTE]
> **KEY TERM: Automata theory**
>
> **Definition.** The study of abstract machines (finite automata, pushdown automata, Turing machines) and the languages they recognize. Finite automata describe regular languages and are the basis of regex matching, lexical analysis, protocol models, and model checking. *Omega (ω) automata*, such as Büchi automata, accept *infinite* sequences and are used to check properties of non-terminating systems like operating systems and spacecraft software.
>
> **In the interview.** "Automata theory is really important to understand." Both Spin and Cobra are built on it. Compare Kernighan's account of Al Aho turning automata theory into egrep and AWK (Chapter 6).

---

## Theme 3: Three tools — Pico, Spin, and Cobra

Holzmann names three tools he believes "can stand the test of time":

- **Pico** (1983, Bell Labs): an image editor for "digital darkroom techniques for photography," with an early patent, a decade before Photoshop. It even got him on CNN in the late 1980s. (Photography is his lifelong passion. See the end of the interview.)
- **Spin**: "one of the mainstream tools in logic model checking."
- **Cobra** (about ten years of work): an *interactive* static analyzer. JPL needed "a static analyzer that could be used during code reviews, to quickly answer queries on multi-million line code archives." Queries are patterns, "a generalized form of regular expressions, adapted to source code analysis... you can have don't cares, bound variables, positional constraints."

> [!NOTE]
> **KEY TERM: Spin and Promela (logic model checking)**
>
> **Definition.** **Spin** is a model checker for concurrent and distributed software. Models are written in **Promela** (PROcess MEta LAnguage), which describes concurrent processes communicating through shared variables and message channels. Properties are written as assertions, invariants, or **linear temporal logic (LTL)** formulas. Spin explores every reachable state, using automata-theoretic methods and partial order reduction to manage the state explosion. It reports either that the property holds or a **counterexample** trace. It has been used on telephone switching, flight software, and network protocols.
>
> **In the interview.** "Spin has become one of the mainstream tools in logic model checking." The intro notes the annual Spin Workshop became the International Symposium on Model Checking Software. See also Ball (Chapter 1), who learned model checking from Holzmann's Spin at Bell Labs.

> [!NOTE]
> **KEY TERM: Interactive static analysis (Cobra)**
>
> **Definition.** Most static analyzers run in batch mode and take minutes or hours for deep analysis. An *interactive* analyzer answers queries in seconds, so engineers can explore a codebase during design or code review: "show every loop that calls this function without checking its return value." Cobra tokenizes source code and evaluates pattern queries over the token stream, in parallel.
>
> **In the interview.** "Most static analyzers are offline, they run for hours... At JPL, we needed a static analyzer that could be used during code reviews." Groce notes the interactivity is "a nod towards people being part of this process."

> [!NOTE]
> **KEY TERM: Pattern-based code queries**
>
> **Definition.** Searching source code by *structure* instead of plain text, using patterns with wildcards ("don't cares"), variables that must bind consistently ("the same variable assigned here and freed there"), and positional constraints. Modern relatives include Semgrep, CodeQL, Coccinelle, and tree-sitter queries. Teams use them to enforce coding rules and to hunt for every instance of a newly discovered bug pattern.
>
> **In the interview.** Cobra queries are "formalized as a generalized form of regular expressions, adapted to source code analysis." Automata theory once again becomes a practical tool.

---

## Theme 4: Theory that waits, and a research culture that trusts

Holzmann gives "the important answer first": theory with no known application can turn out to be crucial.

> "Omega automata theory was developed by Buchi and others before there was any application... It had zero applications until Amir Pnueli came along with linear temporal logic, and boom, there was the application."

> [!NOTE]
> **Instructor note.** Holzmann's point is about applications to computing practice, and it holds there. Strictly, Büchi's 1962 automata already had an application in *logic*: he used them to prove the monadic second-order theory of one successor (S1S) decidable. The history to program verification also has more steps than the quote suggests. Pnueli (1977) brought temporal logic to reasoning about programs. **Algorithmic model checking** came from Clarke and Emerson (1981) and, independently, Queille and Sifakis (1982), who shared the 2007 Turing Award for it. Vardi and Wolper (1986) then connected LTL to Büchi automata, the *automata-theoretic approach* that Spin uses.

He then describes **Bell Labs' research culture**. "If you hire a hundred really smart people, and just let them do whatever they want, one of them will come up with something that is really important." That bet produced the transistor, the laser, Unix, C, and C++. There was "no requirement to publish," only an annual one-page "**I Am Great Report**." Working next to Ritchie and Thompson was freeing ("There's no way I can compete") and challenging ("There's no excuse for not being able to do the same").

But he insists on **explaining**:

> "Publishing papers, going to conferences, teaching, forces you to organize your thoughts... It's the same with when you build a tool. Perhaps the most important part is writing the manual. Because once you have to explain how something works to a stranger, you sometimes realize, this is really stupid, it shouldn't work this way. Then you change the software."

> [!NOTE]
> **KEY TERM: Linear temporal logic (LTL)**
>
> **Definition.** A logic for stating properties of *infinite* execution sequences, introduced to computer science by Amir Pnueli ("The Temporal Logic of Programs," 1977; Turing Award 1996). Its operators include **G** (*globally*: always), **F** (*finally*: eventually), **X** (next), and **U** (until). Examples: `G ¬(crit1 ∧ crit2)` (mutual exclusion, a *safety* property); `G (request → F grant)` (every request is eventually granted, a *liveness* property). LTL formulas can be translated into Büchi automata, which is how Spin checks them.
>
> **In the interview.** The application that made omega automata matter. Holzmann credits Pnueli with describing model checking in a paper ("in 1979"; the founding LTL paper is 1977), while noting "He never claimed credit." Model checking as an algorithm is usually credited to Clarke and Emerson and to Queille and Sifakis; see the note under Theme 4. See Krishnamurthi's safety and liveness (Chapter 2).

> [!NOTE]
> **KEY TERM: Büchi (omega) automata**
>
> **Definition.** Finite automata that read *infinite* words. A Büchi automaton (J. R. Büchi, 1962) accepts an infinite input if it passes through an accepting state infinitely often. In the *automata-theoretic approach* to model checking (Vardi and Wolper), the system and the negated property are both expressed as Büchi automata. Checking whether their product accepts any word finds counterexamples.
>
> **In the interview.** Holzmann's example of theory waiting decades for its application. "People who read those papers thought that this is just an interesting theory, but it's not going to go anywhere."

> [!NOTE]
> **KEY TERM: Documentation as a design check ("write the manual")**
>
> **Definition.** The practice of writing user documentation early, sometimes *before* implementing (as in "documentation-driven" or "README-driven" development). Explaining a design to a newcomer exposes inconsistency, unnecessary complexity, and confusing behavior while it is still cheap to change.
>
> **In the interview.** "Perhaps the most important part is writing the manual... you sometimes realize, this is really stupid, it shouldn't work this way." Compare Kernighan's career as a writer of explanatory books (Chapter 6) and Liskov's "teach from first principles" (Chapter 3).

---

## Theme 5: Heroes — Pnueli, Thompson, Pike

**Amir Pnueli** ("such a modest and brilliant man... He never claimed credit. He just didn't care."). **Ken Thompson**: "If I had to fly in a new spacecraft to Mars, who would I trust to write the software? I would not trust myself... I would ask Ken to write that code." **Rob Pike**, who, given Holzmann's carefully optimized code, would "sit down for a few minutes and effortlessly make it twice as fast."

His best-known story: someone watching Thompson code asked, "How did you think of writing it that way? That's beautiful." Thompson looked up: "Is there any other way?"

On Dijkstra: "really brilliant, but he was also very articulate... He could of course also be quite annoying person!" Dijkstra's principle was to work only on things he could do better than anyone else. Holzmann worries about "the iPhone generation" and "very little effort to excel," but expects "the pendulum will swing back."

**Compare:** Kernighan (Chapter 6) also puts Thompson at the top of his list for "good taste." Two Bell Labs colleagues independently pick the same person for the same reason.

---

## Theme 6: AI — breathtaking, but how do we know it's broken?

Asked for admirable current systems, Holzmann names the AI systems: "They take your breath away." What fascinates and worries him is that "nobody quite understands why it works so well... and if it's broken, how to fix it." How do you know it's broken? The same way you would with a person:

> "The only way you can tell whether it's not working right is to treat it as you would a human being. You ask it questions. If the answers are bizarre, then it's not working right."

This is a striking position for a lifelong verification researcher. For these systems, verification falls back to *behavioral testing* with no specification. Compare Ball's "understanding a concept" probes and survivorship bias (Chapter 1).

> [!NOTE]
> **KEY TERM: Black-box behavioral testing (of AI systems)**
>
> **Definition.** Evaluating a system only through its inputs and outputs, without relying on knowledge of its internals. For AI models this includes benchmarks, red-teaming, consistency checks (asking the same thing different ways), and *metamorphic* tests (checking that related inputs give related outputs). *Interpretability* research tries instead to understand the internals directly.
>
> **In the interview.** "You can bounce that question back to, if I'm talking to you, how do I know that you haven't lost your marbles?... You ask it questions." The "how" of LLMs is "the easier question to answer," the "why" much harder.

---

## Theme 7: The worst practice — "it passed a couple of tests"

> "The belief that once you pass a couple of basic tests for your software that you're good to go... I have dealt with bugs in Spin that didn't show up until ten years later. I'm sure there's still lots more in there that haven't shown up yet."

"Everybody at some point thinks, I worked hard, I designed and built it carefully and I tested it, it's good to go. Alas, software doesn't work that way." Compare Zeller's happy-path testing (Chapter 5) and Kernighan's students testing with "100 numbers" (Chapter 6). All three name a version of the same habit as the field's worst practice.

> [!NOTE]
> **KEY TERM: Latent defects**
>
> **Definition.** Defects present in software that have not yet caused an observed failure, because the triggering inputs, timing, or environment haven't occurred yet. Testing can show the *presence* of bugs but not their absence (Dijkstra). A passing test suite says nothing about latent defects in untested behavior.
>
> **In the interview.** Bugs in Spin surfaced "ten years later." That is why passing "a first set of tests" is a trap, especially for "safety-critical and mission-critical software."

> [!NOTE]
> **KEY TERM: Safety-critical vs. mission-critical software**
>
> **Definition.** *Safety-critical* software's failure can cause death, injury, or major environmental damage: flight control, medical devices, nuclear systems. *Mission-critical* software's failure causes the essential goal to fail, such as a spacecraft mission, financial settlement, or telephone network. Both call for stricter standards (e.g., DO-178C for avionics), independent verification, and more analysis.
>
> **In the interview.** Holzmann's JPL experience: "if you launch a spacecraft to Mars, and the whole world is watching, and it fails, that is a huge embarrassment." He adds that it's "the same in the medical device industry with people's lives directly at risk."

---

## Theme 8: Why JPL listened and AT&T didn't

Groce asks whether there's a divide between careful and sloppy development. Holzmann: "It is not a clean division... But there is a divide." At AT&T, Bell Labs researchers were encouraged to offer bug-finding tools to business units, "That had very limited success." At JPL, "the existence of the lab could depend on mission software working flawlessly":

> "I half expected that they were not really going to listen to me... The big surprise for me was that they were listening... Can you develop a coding standard for us and train developers? Can you bring in the tools to do the checking?"

"As a software developer you don't want to be the one who wrote those three lines that made the thing fail." Compare Zeller (Chapter 5): he sees a "slope," driven by the cost of failure, and describes banks that don't *want* to know about bugs.

> [!NOTE]
> **KEY TERM: Coding standard**
>
> **Definition.** A set of rules for writing code in an organization: banning risky constructs, limiting complexity, and requiring checks, assertions, and documentation. Each rule is ideally checkable by a tool. Holzmann's "The Power of Ten: Rules for Developing Safety-Critical Code" (*IEEE Computer*, 2006) proposed ten checkable rules. Examples: no recursion or `goto`; every loop has a fixed upper bound; no dynamic memory allocation after initialization; functions short enough to fit on a page; at least two assertions per function on average; check every non-void function's return value. These became the basis of the JPL Institutional Coding Standard for C. MISRA C is a well-known automotive counterpart.
>
> **In the interview.** JPL asked: "Can you develop a coding standard for us and train developers? Can you bring in the tools to do the checking?" Cobra (Theme 3) is the kind of tool that checks such rules.

---

## Theme 9: Process — measuring how far bugs travel

Asked Ball's methodology question, Holzmann gives the most *quantitative* answer in the book so far. Development is iterative, but there's a natural pipeline (specification, requirements, high-level design, low-level design, code, test, operation), and you will have to go back. The key is to study **where mistakes are made and how they propagate**:

> "The metrics that you need requires that you record every defect that is found and then figure out at what stage of development it was introduced. Most importantly then is to find out why that defect wasn't found in an earlier step."

With that data you can count bugs *introduced* and *found* per phase, and measure how far bugs travel down the chain. Then you improve checking first for the bugs that travel farthest, and track the metrics from project to project. "It's not an all or nothing thing. Improvement is a gradual process. As long as you keep improving, you're doing okay."

His summary: "There is the waterfall in there, but in a scientific and project management context."

> [!NOTE]
> **KEY TERM: Defect injection and detection (phase containment)**
>
> **Definition.** For each defect, record the phase in which it was **introduced** (requirements, design, code) and the phase in which it was **detected** (review, test, operations). A defect caught in the phase where it was introduced is *contained*. *Phase containment effectiveness* measures how many defects each phase catches. The gap between injection and detection, how far the bug "travels," matters because defects found late usually cost far more to fix.
>
> **In the interview.** Holzmann's improvement method at JPL: "You first fix the checking process for the bugs that can travel the farthest... You make sure that the distance bugs travel gets shorter, and that the number of bugs introduced in each phase decreases."

> [!NOTE]
> **KEY TERM: Root cause analysis (of escapes)**
>
> **Definition.** Investigating *why* a defect occurred and *why it escaped* earlier checks, to fix the process that let it through and not just the defect itself. An *escape* is a defect that passed a stage meant to catch it. Techniques include "five whys," fishbone diagrams, and blameless post-mortems.
>
> **In the interview.** "Most importantly then is to find out why that defect wasn't found in an earlier step... and then update the checks on requirements to make sure it can be caught right where it was introduced."

> [!NOTE]
> **KEY TERM: Software process improvement (metrics-driven)**
>
> **Definition.** Improving how software is built by measuring outcomes (defect rates, escape rates, cycle times) across projects, changing practices, and checking whether the measures improve. It is the idea behind maturity models such as CMMI and behind Six Sigma–style quality programs. The risk is measuring what's easy instead of what matters, or rewarding people for gaming the numbers.
>
> **In the interview.** "Project management is where you collect the metrics, and track the metrics from one project to another, and see if you're improving." This leads to "a discipline of programming and of project management; it's not just programming."

---

## Theme 10: Design and ownership — incubation, the "Ken Thompson moment," and every line

Asked Krishnamurthi's design question, Holzmann describes his own single-author process (Spin was designed by him alone) and is careful not to generalize:

1. **Incubation.** "For a long time I don't know what to do with it, but it sits there. Then, maybe a few weeks later, as I'm falling asleep, or as I'm waking up, suddenly, I think, 'I know how to solve it.'"
2. **Build to a testable state**, using a "quick hack" for side issues.
3. **Return to the hacks**, because "some unease remains."
4. **The "Ken Thompson moment."** Thompson seems to see the clean solution immediately. For Holzmann, "that may happen, a month later, when I suddenly wake up and realize, 'this is how I should have written that part of the code.'"

Team design is different. At the Mars Science Laboratory flight software meetings, the lead asked everyone "what every person in the room was worried about most," and ideas bounced around "until a consensus emerged."

**Owning every line.** Holzmann rewrites contributions to Spin himself, even algorithms from collaborators like Doron Peled, "because I'm also the one who has to fix it when it turns out to be broken." He fixes reported bugs "typically... the same day," because "I can't live with a bug list." He points to a classic academic risk: with student-written tool code, "if all is well they leave, and if you discover a defect later, nobody can fix it."

**When *not* to fix a bug.** He can recall exactly one unfixed Spin issue, an obscure question about partial order reduction in a rare case. The fix would "overhaul a lot of code, and likely introduce other problems that could be more serious... who knows what else it may break."

> [!NOTE]
> **KEY TERM: Conceptual integrity (single-author design)**
>
> **Definition.** Fred Brooks's term (*The Mythical Man-Month*) for a system whose design reflects one coherent set of ideas, as if from a single mind. Brooks called it "the most important consideration in system design" and argued it comes from a single architect or a small group. Teams need deliberate practices (an architect, design reviews, consensus) to keep it.
>
> **In the interview.** Holzmann maintains Spin's coherence by rewriting every extension "in the style that I used for Spin." Groce frames the question in "the Fred Brooks classic sense, as sole author, chief engineer."

> [!NOTE]
> **KEY TERM: Code ownership and the bus factor**
>
> **Definition.** *Code ownership* is how responsibility for code is assigned, from strong (one owner per module) to collective (anyone may change anything). The *bus factor* (or truck factor) is the smallest number of people whose departure would leave a project unable to continue. Single-owner code has high conceptual integrity and a bus factor of one.
>
> **In the interview.** "To be able to do that, you really have to understand every line of code. The only way for me is that I wrote that line of code, and I remember why I wrote it that way." On student-written code: "if you discover a defect later, nobody can fix it."

> [!NOTE]
> **KEY TERM: Regression risk of a fix (when not to fix a bug)**
>
> **Definition.** Every change can introduce new defects, so a fix carries *regression risk*. Bug triage weighs the severity and likelihood of the bug against the cost and risk of the fix. For rare, low-impact bugs in complex code, the safest decision may be to document the bug and leave it.
>
> **In the interview.** Holzmann's one unfixed Spin issue: fixing it "would overhaul a lot of code, and likely introduce other problems that could be more serious... I think that that's the criterion I used." Groce notes that deciding when a bug is too obscure to matter is a real open question.

> [!NOTE]
> **KEY TERM: Partial order reduction**
>
> **Definition.** A technique for fighting *state explosion* in model checking concurrent systems. Many interleavings of independent actions (for example, two processes updating unrelated local variables) lead to the same state. Exploring only one representative order of such actions preserves the properties being checked while shrinking the search a great deal. Spin's implementation came from Holzmann's work with Doron Peled. Godefroid and Valmari developed related methods.
>
> **In the interview.** Holzmann's collaboration with Peled on "LTL, and partial order reduction," and the one obscure partial-order-reduction issue he left unfixed.

---

## Theme 11: Advice — learn to think

Holzmann's answer to "what didn't I ask?" was what to tell students starting college. He repeats: logic, automata theory, philosophy, literature, mathematics, physics, "learn how stuff works." "With the current revolution in AI, learning to actually write complete programs has become less of an issue. But learning to think is always important."

He ends with his own path. He wanted to be a portrait and news photographer, developing film and walking prints to Amsterdam newsrooms the same day. His mother suggested engineering so he could do photography "as a hobby, without the need to make money doing that." "Being able to do both computer science and photography, without having to worry about money, is for me the perfect outcome."

---

## Connections to other chapters

- **Chapter 1 (Ball):** Ball learned model checking from Holzmann's Spin at Bell Labs and built on it in SLAM. Both stress counterexamples. Holzmann's process answer is a direct response to the methodology question Ball suggested.
- **Chapter 2 (Krishnamurthi):** Krishnamurthi cites Holzmann's fondness for message sequence charts ("when somebody like Holzmann likes something, you should just shut up and listen"). LTL makes Krishnamurthi's safety and liveness formal. Holzmann's defect-phase account is a fourth view of the waterfall.
- **Chapter 3 (Liskov):** Both advise understanding what you don't understand. Holzmann does it by writing the manual, Liskov by teaching from first principles.
- **Chapter 5 (Zeller):** Opposite emphases on rigor: Zeller warns that verifying everything breaks the economics; Holzmann shows where it pays (JPL). Both describe a cost-of-failure "divide."
- **Chapter 6 (Kernighan):** Bell Labs colleagues who both put Ken Thompson first. Kernighan's "cut and try" design and Holzmann's subconscious incubation are two honest descriptions of how individual design happens.

## Discussion questions

1. Holzmann says writing the manual reveals bad design. Pick a tool you use and find one behavior that would be embarrassing to explain to a stranger. What would you change?
2. Write the LTL formula for "every time the brake is pressed, the car eventually stops" and for "the door is never open while the train is moving." Which is safety and which is liveness?
3. Holzmann's improvement method needs every defect's phase of introduction. For your current team project, classify the last ten bugs you fixed. Which traveled farthest?
4. Why did JPL engineers listen to Holzmann when AT&T business units mostly didn't? What would make *your* organization (or course) listen?
5. Holzmann rewrites all contributions to Spin himself. What are the costs of this for open-source sustainability? When is it worth it?
6. Holzmann suggests testing AI "as you would a human being." What are the limits of that approach? Connect your answer to Ball's survivorship-bias point (Chapter 1).

## Further reading

- G. J. Holzmann, *The SPIN Model Checker: Primer and Reference Manual*, Addison-Wesley, 2003.
- G. J. Holzmann, "The Model Checker SPIN," *IEEE TSE*, 1997.
- G. J. Holzmann, "The Power of Ten: Rules for Developing Safety-Critical Code," *IEEE Computer*, 2006.
- G. J. Holzmann, "Cobra: A Light-Weight Tool for Static and Dynamic Program Analysis," *Innovations in Systems and Software Engineering*, 2017.
- A. Pnueli, "The Temporal Logic of Programs," FOCS 1977.
- M. Y. Vardi and P. Wolper, "An Automata-Theoretic Approach to Automatic Program Verification," LICS 1986.
- F. P. Brooks, Jr., *The Mythical Man-Month* (Anniversary ed.), 1995 (conceptual integrity).
- H. R. Lewis (ed.), *Ideas That Created the Future: Classic Papers of Computer Science*, MIT Press, 2021.

---

## Key term index

| Term | Theme |
|---|---|
| Software analysis | 1 |
| Unintended consequences / AI safety as verification | 1 |
| Formal logic | 2 |
| Automata theory | 2 |
| Spin and Promela | 3 |
| Interactive static analysis (Cobra) | 3 |
| Pattern-based code queries | 3 |
| Linear temporal logic (LTL) | 4 |
| Büchi (omega) automata | 4 |
| Documentation as a design check | 4 |
| Black-box behavioral testing (of AI) | 6 |
| Latent defects | 7 |
| Safety-critical vs. mission-critical | 7 |
| Coding standard (Power of Ten) | 8 |
| Defect injection and detection (phase containment) | 9 |
| Root cause analysis | 9 |
| Software process improvement | 9 |
| Conceptual integrity | 10 |
| Code ownership and the bus factor | 10 |
| Regression risk of a fix | 10 |
| Partial order reduction | 10 |
