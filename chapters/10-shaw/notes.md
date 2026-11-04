# Chapter 10 — Mary Shaw: A Discipline of Engineering for Software as Holy Grail

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Mary Shaw

Shaw is the Alan J. Perlis Professor of Computer Science at Carnegie Mellon. Her career has had one goal: a genuine **engineering discipline for software**. With David Garlan she founded the systematic study of **software architecture**. She was Chief Scientist of CMU's Software Engineering Institute from 1984 to 1987, received the ACM SIGSOFT Outstanding Research Award with Garlan in 2011, and was awarded the U.S. National Medal of Technology and Innovation in 2014. Earlier, with Bill Wulf and Ralph London, she designed the abstract data type language Alphard.

Groce knew her work from graduate school at CMU, where Garlan was on his thesis committee. After the interview Shaw wrote to him: "That was fun!"

## Reading guide

| Part of interview | What to watch for |
|---|---|
| IBM's space computer center; Al Perlis | A path into SE through programming languages |
| Abstract data types → architecture | "Hip pocket" program organizations; the text editor epiphany |
| NATO 1968, the SEI, the "Prospects" paper | How engineering disciplines emerge; why SE "wasn't like other engineerings" |
| Books | Petroski; Simon vs. Schön; Alexander; Rittel and Webber; Brooks's *Design of Design* |
| Formal specification as a second view | "We spent as much time debugging the formal specification as we spent debugging the code" |
| Continuity | Progress = the size of abstractions we don't look inside; "only 10%" |
| Programming vs. engineering | Tacit knowledge, design obligations, and feedback loops |
| Heroes | Brooks, Booch, Basili, Boehm; Lampson's "Hints"; Michael Jackson's problem frames |
| Exemplars | Why we don't study good systems; architecture description languages |
| Worst practices | "Do the stuff we know we should do"; liability; Toyota |
| How much engineering? | Mission creep from cruise control to self-driving |
| Methodology | ACM classification: "software and its engineering" |
| AI | Read before you write; model collapse; Knuth's wastebaskets |
| Now | A book organized by patterns; SE research as an ecosystem |
| Education | Curriculum as design under a scarce resource |

---

## Theme 1: Through programming languages, from data types to architecture

Shaw first programmed in high school, when an IBM engineer from Washington's space computer center taught "little baby programming in a pseudo-assembly language." She "became a computer bum" in college ("But unlike many computer bums, I graduated"), and came to Carnegie Tech "because of Al's charisma": Alan Perlis.

She worked for years with Bill Wulf and Ralph London on an **abstract data type** language, at a time when "everyone was running around saying, oh, abstract data types are going to solve all our problems. Then objects were going to solve all our problems." Her response: "Yeah, maybe, but not really. What else is going on?"

Programmers have "hip pocket algorithms," and Shaw realized they also have hip-pocket *program organizations* they use without choosing consciously: the Unix crowd "automatically reached for pipes and filters," the object crowd for objects, the database people for "this huge database with transactions." The epiphany was the text editor. You can define it as an abstract data type with a file, pointers, insert, and delete, "But that somehow captures everything except what really makes a text editor a text editor."

> [!NOTE]
> **KEY TERM: Abstract data type (ADT)**
>
> **Definition.** A type defined by its operations and their behavior, with its representation hidden (Liskov and Zilles, 1974; see Ch. 3). Languages of the 1970s, including CLU and Shaw, Wulf, and London's Alphard, supported ADTs directly and aimed to verify their implementations.
>
> **In the interview.** The idea "going to solve all our problems," followed by objects. Shaw's question "what else is going on?" led to architecture.

> [!NOTE]
> **KEY TERM: Architectural style**
>
> **Definition.** A family of system organizations defined by the kinds of components and connectors they use and the constraints on combining them. Shaw and Garlan's catalog includes **pipe-and-filter**, **layered**, **object-oriented**, **event-based (implicit invocation)**, **repository** (or blackboard), **client-server**, and **interpreter** styles. Each has characteristic strengths and weaknesses. (Covered in depth in the Chapter 10 primer.)
>
> **In the interview.** The "hip pocket program organizations, software structures and organizations that we all have in our pockets, but we don't pull them out consciously."

> [!NOTE]
> **KEY TERM: Software architecture**
>
> **Definition.** The high-level structure of a software system: its principal components, the connectors through which they interact, and the rationale and constraints governing their composition. Architecture determines most of a system's **quality attributes** (performance, modifiability, availability, security) and is costly to change later. Shaw and Garlan's *Software Architecture: Perspectives on an Emerging Discipline* (1996) established the field.
>
> **In the interview.** What Shaw "brought to the party": "methods for thinking about what goes on between the code and the running system."

---

## Theme 2: How engineering disciplines emerge

At the 1968 NATO conference in Garmisch, Perlis was a participant. He "came back with a big box full of the blue books... and said, take these, read these, this is going to change your life." (Shaw notes Margaret Hamilton is credited with using the phrase "software engineering" earlier, but NATO brought it "to widespread attention.")

At the Software Engineering Institute in the mid-1980s, "the big process years," "all the people who wanted to talk about managing software developers were calling it software engineering." To Shaw, "this thing that we were calling software engineering wasn't like other engineerings." On sabbatical she read the history of engineering, which became her 1990 "Prospects" paper: a field starts as **craft**, gets organized and brings in management (**commercial** practice), raises questions that **science** helps answer, and when that science fuses with practice, a **professional engineering** discipline emerges.

What engineers actually do is "solving practical problems" using "the best organized knowledge that they have got, but if they haven't got the math, they don't throw their hands up in the air." Her example: an HVAC firm answering a request for proposals by rummaging through "a big room full of flat files" for "the last project they did that was sort of like this one." That's not "the application of high-minded theory." It is organized knowledge, reused.

> [!NOTE]
> **KEY TERM: Software engineering (the 1968 NATO conference)**
>
> **Definition.** The NATO Science Committee's conference in Garmisch, Germany (October 1968) was deliberately titled "Software Engineering" to provoke: to suggest software should be built on the theoretical foundations and practical disciplines of established engineering. Its proceedings (Naur and Randell, eds.), the "blue books," documented a "software crisis" of late, over-budget, unreliable systems.
>
> **In the interview.** Perlis's box of blue books: "this is going to change your life." (See the Ch. 2 primer timeline.)

> [!NOTE]
> **KEY TERM: Shaw's model of engineering maturity**
>
> **Definition.** From Shaw's "Prospects for an Engineering Discipline of Software" (1990): disciplines evolve from **craft** (virtuosos, intuition, no systematic knowledge) to **commercial** practice (skilled craftsmen, established procedures, management, economies of scale). Production problems then stimulate **science**, and when science combines with commercial practice, a **professional engineering** discipline results: educated professionals, analysis and theory, codified knowledge. Shaw used civil engineering and chemical engineering as historical examples, and argued software was mostly in the commercial stage.
>
> **In the interview.** "You start out doing stuff, and then you get more organized about it, you bring in some management talent. That leads to some questions that science helps to answer, and then when that science fuses with ad hoc doing it better, then that leads you into an engineering discipline."

> [!NOTE]
> **KEY TERM: Routine vs. innovative design**
>
> **Definition.** **Routine design** solves familiar problems by adapting earlier solutions, using codified knowledge such as handbooks, standard designs, and past projects. **Innovative design** tackles novel problems. Shaw argues mature engineering disciplines make most design routine, and that software engineering lacks the organized reference material ("handbooks") that would let it do the same.
>
> **In the interview.** The HVAC firm's room of flat files: "we've got our knowledge organized in this way, let's pick it up and go with it."

---

## Theme 3: Design as problem solving, and as problem setting

Asked about books, Shaw names Henry Petroski: start with *To Engineer Is Human*, but she prefers *Design Paradigms*, which "puts a layer of abstraction on top" of the same failure examples. She recommended it to a colleague starting an undergraduate software design course.

CMU's design tradition is Herbert Simon's "design as problem solving." Shaw "came late in the game to understand that that's only one side of design, that the other side of design is design as problem setting," from Donald Schön's *The Reflective Practitioner*. Schön's example: experts from eight fields each attacked a South American nutrition problem from their own angle. Lessons: "you can kind of identify disciplines by the questions that they like and the answers they consider legitimate," and complex problems need multiple points of view.

She learned the same lesson in early program verification with Wulf and London: "We spent as much time debugging the formal specification as we spent debugging the code." Why bother? "Because they have different points of view on what we're doing, and each of them is revealing some of the flaws in our thinking." And verification "was not demonstrating truth. Program verification demonstrates the consistency within the formal system of the imperative and the functional views."

> [!NOTE]
> **KEY TERM: Problem solving vs. problem setting**
>
> **Definition.** **Problem solving** (Herbert Simon, *The Sciences of the Artificial*, 1969) treats design as search through a space of alternatives toward a well-defined goal. **Problem setting** (Donald Schön, *The Reflective Practitioner*, 1983) is the work of deciding what the problem *is*: which features of a messy situation to attend to and how to frame them. Practitioners move between the two in a "reflective conversation with the situation."
>
> **In the interview.** "Herb Simon is 'design as problem solving.' And I came late in the game to understand that that's only one side of design."

> [!NOTE]
> **KEY TERM: Multiple views (specification as a second point of view)**
>
> **Definition.** Describing the same system from independent perspectives (code and formal spec, structure and behavior, different architectural views) so that inconsistencies between them reveal errors that neither shows alone. Verification then establishes *consistency* between views, not absolute correctness.
>
> **In the interview.** Debugging the specification as much as the code was worthwhile because "each of them is revealing some of the flaws in our thinking." Compare Jackson's Alloy (Ch. 12).

---

## Theme 4: The continuity — bigger abstractions, and "good enough"

"You can measure progress in programming languages by the intuitive size of the abstractions that we don't look inside of." Machine instructions became assembly, then Fortran. That transition was "hotly debated," but "day in, day out," compiled code was "pretty much just as good," because programmers don't usually do "expert wringing out of performance."

Shaw is "widely quoted on the internet" for a throwaway remark: whatever your favorite technology, "Only 10% of that piece of software you wrote, is about the thing you really cared about, and the rest was bookkeeping and structure building." She doesn't know if the number is right, "but Barry Boehm taught us that making sweeping generalizations can actually focus people." A Defense Science Board member traced a famous development-vs-debugging graph back through its citations to one thing Boehm had done. "It doesn't have to be exactly right in order to be persuasive and to call attention to a problem." (Compare the evidence debates over the cost-to-fix curve in the Chapter 4 primer.)

Engineering accepts approximation: "Engineers love linear systems," though what they model "aren't truly linear," because "the linear approximation is good enough to get going, and it's cost-effective."

> [!NOTE]
> **KEY TERM: Level of abstraction (abstraction growth)**
>
> **Definition.** The size of the conceptual unit a programmer works with without looking inside it: instruction, statement, procedure, abstract data type, module, component, service, framework. Shaw's diagram of software development abstractions over time shows each step absorbing routine detail, so programmers spend effort on what is specific to their problem.
>
> **In the interview.** "The intuitive size of the abstractions that we don't look inside of." Compare Yang's prefab houses (Ch. 7) and Schneider's "magic" (Ch. 9).

> [!NOTE]
> **KEY TERM: Good-enough engineering (cost-effective approximation)**
>
> **Definition.** Engineering decisions rest on models that are accurate enough for the purpose at an acceptable cost, not on exact truth. Knowing *when* an approximation is valid (when a system is close enough to linear) is part of engineering judgment. In software, this includes heuristics and rules of thumb whose value lies in focusing attention, even if their numbers are rough.
>
> **In the interview.** "It has to be good enough... the linear approximation is good enough to get going, and it's cost-effective."

---

## Theme 5: Programming vs. engineering — tacit knowledge and feedback loops

What should a working programmer understand? "Number one would be the difference between programming and engineering, and the obligation to do real engineering." That requires understanding "what goes on between the code and the running system": architecture. Her own trajectory "has gone farther and farther away from code, and closer and closer to connections to the real world."

Her recent workshop paper is about the **tacit knowledge** that comes with any method: "things about the way people use the tools that are often not written down." Her example from operating systems: threads are more efficient; processes give better memory protection; experienced designers choose according to which matters more. She calls these **design obligations**.

Her extended example is the **feedback loop**, which "entirely too few of us, actually, understand." A control loop has a process, a control input, a sensor, a set point, and a decision component. The questions it raises apply to any adaptive software:

- **Is your control sufficient?** Old cruise control controlled the throttle but not the brake. Going downhill, "It does not have full command authority over the process."
- **Does the sensor measure the right thing?** "Most sensors turn out to be proxies." When a car hydroplanes, the front-wheel speed sensor says the car isn't moving, so the cruise control says "make the wheels go faster." That is "exactly the wrong thing."
- **How hard should you correct?** A thermostat can overshoot and come back. "If what you're trying to do is stop short of a brick wall... You've got to approach it from below."

Her sous vide controller's manual even explains PID tuning, unlike every other appliance with a feedback loop.

> [!NOTE]
> **KEY TERM: Tacit knowledge and design obligations**
>
> **Definition.** **Tacit knowledge** is know-how practitioners use but rarely write down: when to use a mechanism, which pitfalls to check, which questions to ask (Polanyi: "we can know more than we can tell"). Shaw's **design obligations** make some of it explicit: questions a design using a given mechanism must answer to be sound.
>
> **In the interview.** Threads vs. processes; the feedback-loop questions; "If you're doing carpentry and you want to use a table saw, the first thing they teach you is to not cut off your thumb."

> [!NOTE]
> **KEY TERM: Feedback loop (control loop)**
>
> **Definition.** A system that measures a process's output with a **sensor**, compares it with a **set point** (target), and uses a **controller** to adjust an **actuator** to reduce the difference. Control theory analyzes stability, overshoot, and convergence. Software uses feedback loops in autoscaling, congestion control, rate limiting, self-adaptive systems, and recommendation engines.
>
> **In the interview.** The household thermostat, old cruise control, and her sous vide box: "if you look at the assumptions that go on in your feedback loop, they lead you to some design questions."

> [!NOTE]
> **KEY TERM: Command authority and sensor proxies**
>
> **Definition.** A controller has **command authority** if its actuators can actually drive the process to any required state. A **proxy** sensor measures something correlated with the true state (wheel rotation for vehicle speed) and can mislead when the correlation breaks. Both are classic sources of failure in control and in software that monitors metrics (Goodhart's law is the human version).
>
> **In the interview.** Cruise control couldn't brake (no full command authority), and a front-wheel sensor misread speed when hydroplaning (a proxy).

> [!NOTE]
> **KEY TERM: PID control**
>
> **Definition.** The most common feedback controller. The correction is the sum of three terms: **P**roportional to the current error, **I**ntegral of past error (removes steady offset), and **D**erivative of the error (damps overshoot). Tuning the three gains trades speed of response against overshoot and oscillation.
>
> **In the interview.** Her sous vide manual lets you "do PID control at the micro level by adjusting these parameters if you want to." (Groce: is that necessary for sous vide? Shaw: "No!")

---

## Theme 6: The canon — Alexander, wicked problems, Brooks

Shaw's big contributions: "abstract data types, and software architecture, and probably some insights into curriculum design." Her goal, shared with Grady Booch, is "the genuine engineering discipline for software."

She adds three readings. First, **Christopher Alexander**'s pattern books. Groce notes this is the first mention of Alexander in the book. The idea has been "cluttered by the Gang of Four book. Patterns is not the visitor pattern." It is about "finding these conceptual bits that mesh together... it's about how you organize your thoughts."

Second, Rittel and Webber's "Dilemmas in a General Theory of Planning," the **wicked problems** paper, "often been misunderstood." At an ICSE plenary, a speaker equated wicked problems with "it's a complicated problem, and I find it hard." They are different.

Third, Brooks's ***The Design of Design***, which "now is the more important" than *The Mythical Man-Month*. (Kernighan, Ch. 6, couldn't get through it.)

> [!NOTE]
> **KEY TERM: Wicked problems**
>
> **Definition.** Rittel and Webber's (1973) term for social-policy problems that can't be solved by standard analysis. They have no definitive formulation; no stopping rule; solutions that are better or worse rather than true or false; no ultimate test; every attempt counts (no trial and error); stakeholders with conflicting and sometimes unspoken agendas; and each problem is essentially unique. "Wicked" means resistant to resolution, not merely hard.
>
> **In the interview.** "There's no firm problem statement... multiple stakeholders who have different agendas... You don't get a second chance, because, you know, once you put a highway through here, you can no longer put the neighborhood back in."

> [!NOTE]
> **KEY TERM: Pattern (in Alexander's sense)**
>
> **Definition.** Christopher Alexander (*A Pattern Language*, 1977) described recurring problems in building and town design, the forces at play, and solutions that resolve them, each linked to larger and smaller patterns into a "language." Software adopted the idea: design patterns (Gamma et al., 1994), architectural styles, and the Pattern Languages of Programs (PLoP) conferences. Shaw stresses the original sense: a way to organize thinking about how parts fit, not a code template.
>
> **In the interview.** "Patterns is not the visitor pattern. The idea of patterns is finding these conceptual bits that mesh together."

---

## Theme 7: Heroes and problem frames

Shaw's heroes: **Fred Brooks, Grady Booch, Vic Basili, Barry Boehm** ("on the management side"), and on the engineering side, **Butler Lampson**, whose "Hints for Computer System Design" (1983) she returns to. Lampson has recently expanded it into a much longer version.

Also **Michael Jackson** (Daniel Jackson's father) and his **problem frames**, which ask "what kind of thing are you working with? Is it just sitting there? Is it fighting back at you? Is it like a small child? Is it biddable?" Groce mentions he considered interviewing Michael Jackson too, but his editor said there were enough interviews.

> [!NOTE]
> **KEY TERM: Problem frames**
>
> **Definition.** Michael Jackson's approach to requirements (*Problem Frames*, 2001). It classifies software problems by the kinds of real-world **domains** involved and how the machine must relate to them: required behavior, commanded behavior, information display, simple workpieces, and transformation. Domains are classified as **causal** (predictable physical behavior), **biddable** (people, who can be asked but may not comply), or **lexical** (data). The frame identifies what must be described and what must be proved.
>
> **In the interview.** "Is it biddable, and you can ask it to do something, and it'll maybe do it?" (Daniel Jackson discusses his father's influence in Ch. 12.)

---

## Theme 8: Why don't we study good examples?

Shaw and Michael Jackson have argued, in a *New York Times* op-ed and a guest *IEEE Software* column with George Fairbanks: "why is it that when we teach programming, we say, here's a programming language, go write programs, when in every other discipline in the world, you say, let's study some good ones." "You study it, you critique it. You get some of this tacit knowledge."

Which examples? Dijkstra's THE operating system once played that role, then Unix, "but I think the problem is that things are now big and complicated, and that reading the code doesn't give you the idea of the system." Groce agrees: Knuth's literate *TeX* explains hyphenation beautifully, but "I have no clue about the general organization of TeX."

One unrealized goal: documentation "always fails, because it's not kept up to date." The fix would be an **architecture description language** in which the architecture "was the definitive document, and if that wasn't right, the build failed." In other words, "make it part of the system, not part of the documentation." Frameworks then took away the choice: "you got all this other apparatus with it, and all the other apparatus is so attractive that you just accept their architecture." A bridge engineer still chooses arch, cable-stayed, suspension, or truss for each site. "The way development environments and frameworks have grown up, we don't get that choice anymore."

She collects examples at modelproblems.org (cruise control, the London Ambulance Service). She also recommends *Software Designers in Action* (van der Hoek and Petre), in which pairs of professional designers were videotaped designing, and many researchers analyzed the same videos from different points of view.

> [!NOTE]
> **KEY TERM: Architecture description language (ADL)**
>
> **Definition.** A formal notation for describing a system's architecture: components, connectors, their interfaces, and configuration, often with analyzable properties. Research ADLs of the 1990s included UniCon (Shaw's group), Wright, Acme, Rapide, and Darwin. Shaw's goal was an ADL that is part of the build, so the architecture description can't drift from the system.
>
> **In the interview.** "If we had an architecture description language in which you described the system as a whole... and that was the definitive document, and if that wasn't right, the build failed."

> [!NOTE]
> **KEY TERM: Exemplars (model problems)**
>
> **Definition.** Well-understood examples a community studies and uses to compare methods: in software, systems such as THE and Unix, or shared problem statements such as cruise control, the London Ambulance Service dispatch failure, or the KWIC index (Parnas, Ch. 3 primer). Exemplars carry tacit knowledge that rules and definitions don't.
>
> **In the interview.** "You study a thing of the kind that you are about to try to create before you try to create one."

> [!NOTE]
> **KEY TERM: Framework (and architectural lock-in)**
>
> **Definition.** A reusable, partially complete application (Rails, Django, React, Spring) that calls your code ("inversion of control") and comes with its own architecture. Frameworks speed development but impose that architecture, which may not fit the problem, and make it hard to see or change.
>
> **In the interview.** "All the other apparatus is so attractive that you just accept their architecture." Bridge engineers still choose the bridge type for the site; software developers often don't.

---

## Theme 9: Worst practices, and who pays

Shaw's answer to "worst practices": "do the stuff we know we should do." Sanitize user inputs ("my son is named 'Johnny Drop Tables'" — the xkcd "Bobby Tables" joke). Avoid null pointers (she heard one major company made it "very close to a firing offense").

Why don't developers? Schedules. Brooks estimated that turning a program into a programming system costs about three times as much, and turning that into a product another factor of three. But why are schedules so tight? Because "the corporate decision makers are driven by their cost models." Shaw's proposal is to change the cost structure, specifically the license agreements that disclaim the "commercial doctrines of merchantability and fitness." "If the purveyors of software were held liable for the failures of the software, then that would change their risk profile," which would give developers room "to do the things they know they're supposed to do."

Evidence: the Toyota unintended acceleration investigation. In Phil Koopman's review, Toyota "were supposed to be doing X, Y, and Z, but by golly, they weren't." (Groce mentions Holzmann's NASA report on the same case.)

On CrowdStrike (2024), Shaw's group of colleagues said in unison: "They didn't do a preliminary release with just a few people??? What!" They also guessed a null pointer error; it turned out to be a corrupted table interpreted as addresses. "We were pretty close!"

> [!NOTE]
> **KEY TERM: Software liability and warranty disclaimers**
>
> **Definition.** Under commercial law, goods normally carry implied warranties of **merchantability** (fit for ordinary use) and **fitness for a particular purpose**. Software licenses routinely disclaim these ("provided as is"), so vendors bear little legal cost for defects. Debates over software liability, revived in the U.S. National Cybersecurity Strategy (2023), ask whether shifting that cost to vendors would make them invest in quality.
>
> **In the interview.** Change the cost structure by revisiting "the ability to write a user agreement that completely ignores the commercial doctrines of merchantability and fitness."

> [!NOTE]
> **KEY TERM: Program vs. programming system vs. product (Brooks's factors of three)**
>
> **Definition.** In *The Mythical Man-Month*, Brooks distinguished a **program** (works for its author) from a **programming system** (components with tested interfaces that work together) and a **programming product** (generalized, tested, documented, maintainable by others). Each step costs about three times as much, so a programming systems product costs about nine times the original program.
>
> **In the interview.** "There's one of your factors of three." Rushed schedules skip exactly this work. Compare Yang's demos vs. products (Ch. 7).

---

## Theme 10: How much engineering? It depends, and watch for mission creep

Shaw's diagram plots consequence of failure against human oversight. Cruise control is "You are paying attention, and it's really kind of bad if it fails, but not a disaster." Adaptive cruise control means less oversight with the same consequences, and self-driving cars less still. "The level of engineering, the level of responsibility, has to go up as you move to the right in this chart." JPL sits "in the upper right-hand corner."

She has little patience for the opposite extreme. Formal-methods colleagues would say "if it is not absolutely verified, it is no good!" Shaw's response: "what is that thing in front of you? Is it no good?" Engineering progress is empirical: early steam boilers had flat sides; builders "eventually noticed that they became round" and started making them round.

The table saw example shows the policy side: saws with instant-stop mechanisms save thumbs but cost more, so should they be optional, or mandated "like seatbelts"?

> [!NOTE]
> **KEY TERM: Mission creep (and consequence vs. oversight)**
>
> **Definition.** The gradual expansion of a system's role beyond what it was designed and assured for. When automation takes on more responsibility while human oversight decreases, the required assurance increases even if the code looks similar. Risk depends on both the consequence of failure and how much a human can catch it.
>
> **In the interview.** "Cruise control has mission creep, right? Cruise control has turned into hands-off driving."

---

## Theme 11: Methodology — "software and its engineering"

On Agile and process, Shaw says plainly: "Not my area." But she has "a strong sense about the definition of engineering," recorded in the ACM Computing Classification System. When it was being revised, she proposed dividing software into three parts: **the software itself** (operating systems, databases, architectures), **the scaffolding** used to build it (languages, version control, frameworks), and **"the stuff that people do."** And rather than burying engineering in a third-level heading: "why don't we call it software and its engineering? I did that!"

> [!NOTE]
> **KEY TERM: ACM Computing Classification System: "Software and its engineering"**
>
> **Definition.** The ACM's taxonomy for computing literature. Its 2012 revision has a top-level category "Software and its engineering," divided into software organization and properties, software notations and tools, and software creation and management. Authors tag papers with it in ACM venues.
>
> **In the interview.** Shaw's structure puts "the actual software on the same footing as the software development tools and as the management."

---

## Theme 12: AI — read before you write

"I am not an AI person." With Michael Hilton she argues "you oughta read things before you write them, and with AI, it is even more important, because you need to be able to read things created by someone or something else, and evaluate them." Her observation: "If you already know what you're trying to accomplish, the AI tools can help you accomplish it faster. If you don't know what you're doing, you can fumble around a lot."

She cites an IEEE Spectrum article (January 2026) arguing that newer AI coding assistants are getting worse, possibly because AI-generated code is polluting training data, which some call **model collapse**. She is careful: "before you quote me on saying that I'll say I'm not sure it's formally that." She connects it to Knuth's 1970 empirical study of Fortran programs. Knuth first gathered programs from the Stanford Computation Center's wastebaskets, which "usually receive undebugged programs." The moral: "The average program out there isn't very good." Groce's twist: train on commits where CI failed, and "You could write an AI that's very good at writing bad code."

> [!NOTE]
> **KEY TERM: Model collapse**
>
> **Definition.** The degradation of generative models trained, in successive generations, on data that includes output from earlier models: rare cases disappear and errors compound (Shumailov et al., *Nature*, 2024). For code, the concern is that public repositories increasingly contain AI-generated code of uneven quality.
>
> **In the interview.** AI tools "increasingly relying on a training set that we all know has flaws." Shaw flags she isn't sure that's the formal meaning.

> [!NOTE]
> **KEY TERM: Code reading (reading before writing)**
>
> **Definition.** Systematically reading and critiquing existing code and designs, as a learning method and a professional skill. It is the basis of code review, maintenance, and evaluating generated code. Shaw and Hilton argue it should precede writing in education, as reading precedes writing in literacy.
>
> **In the interview.** "It's not all writing code, it hasn't been all writing code for a long time."

---

## Theme 13: Now — a book organized by patterns; research as an ecosystem

Shaw is writing a book gathering her workshop position papers, essays she often hands people. One example is "Time Is Not Money," for when people convert every figure of merit to dollars. It discusses **measurement scales** and **fungibility**: "You can't save up bandwidth... there's no bank." After struggling with chronological and topical organization, she structured the book around patterns of how she thinks, presented at PLoP as "Aha! Strategies for gaining insights into software design."

With two colleagues from outside software engineering she wrote a position paper for ICSE's Future of Software Engineering track, "SE research is a complex ecosystem." The publication glut and reviewing crisis come from feedback loops: promotion criteria, funding and rating agencies' rankings, and selective conferences reinforcing each other. "We cannot undo that by thinking of individual, independent point solutions."

> [!NOTE]
> **KEY TERM: Measurement scales and fungibility**
>
> **Definition.** Stevens's measurement scales: **nominal** (categories), **ordinal** (order only), **interval** (equal differences), and **ratio** (true zero, so ratios are meaningful). Only some arithmetic is valid on each. A resource is **fungible** if units are interchangeable and can be converted, saved, or traded (money). Many engineering resources aren't: unused bandwidth can't be banked, and a deadline can't be traded for budget at a fixed rate.
>
> **In the interview.** "Time Is Not Money": converting everything to dollars "gets it wrong" when resources aren't fungible.

---

## Theme 14: Education — curriculum is a design problem

Shaw's "what should I have asked" is education. From Brooks's *Design of Design*: every design has a **scarce resource** to budget. For a curriculum, that is curriculum size, measured in class hours, homework hours, or pages read. So "for a course to earn its place in a curriculum, it should have a balance of durable ideas that will persist over a few changes of technology, but also current examples," and it should build students' ability to keep learning.

Curricula need stated outcomes, and "Just as surely as we understand traceability in software systems between requirements and implementation pieces," there should be traceability from program objectives to courses. "The things that we know about design, we should be applying to curricula. I shouldn't even have to say that." And "a curriculum is not a management issue."

On teaching itself: the SEI used to say "the most effective technology transition vehicle is the moving van that takes a PhD to his new appointment." Herb Simon complained that universities don't treat teaching as professionally as research. Shaw's only training to teach came from the FAA ground-instructor exam, so she is "one of the few federally licensed instructors in my department... Aeronautics, as it happens."

> [!NOTE]
> **KEY TERM: Scarce resource (design budget)**
>
> **Definition.** Brooks (*The Design of Design*, 2010): every design is constrained by some scarce resource (memory, floor space, weight, frontage, attention), and design quality depends on how well that resource is budgeted. Identifying the scarce resource clarifies trade-offs.
>
> **In the interview.** "In curriculum design, the scarce resource is curriculum size."

> [!NOTE]
> **KEY TERM: Traceability**
>
> **Definition.** The ability to link artifacts across a development process: each requirement to the design elements, code, and tests that implement and verify it, and back. Traceability supports impact analysis, coverage checks, and certification in regulated domains (DO-178C, ISO 26262).
>
> **In the interview.** Shaw applies it to education: from overall program objectives to courses, as accreditation (ABET) partly requires for course objectives.

---

## Connections to other chapters

- **Chapter 1 (Ball):** Ball's tools and Shaw's architecture are both about "between the code and the running system"; staged rollout and CrowdStrike.
- **Chapter 2 (Krishnamurthi):** Krishnamurthi's question about design gets its fullest answer here (Simon, Schön, Alexander, Brooks). Both put language evolution at the center of SE history.
- **Chapter 3 (Liskov):** Abstract data types from two of their inventors' circles (CLU and Alphard); Shaw asks what modules *don't* capture.
- **Chapter 4 (Holzmann):** Toyota; JPL "in the upper right-hand corner"; Boehm's influential, imperfect graphs.
- **Chapter 6 (Kernighan):** Unix as an exemplar; pipes and filters as an architectural style; Brooks's *Design of Design* (Shaw's favorite; Kernighan couldn't finish it).
- **Chapter 7 (Yang):** Design as a discipline with methods; abstractions that grow; frameworks that impose their architectures.
- **Chapter 9 (Schneider):** Both read Petroski; both say CS teaches design poorly; Schneider's extensibility test for architecture.
- **Chapter 12 (Jackson):** Michael Jackson's problem frames; studying exemplars; specification as a second point of view.

## Discussion questions

1. Where is software engineering on Shaw's craft → commercial → professional scale today? Pick one subfield (web development, avionics, ML systems) and argue.
2. Analyze an adaptive software system (autoscaling, a recommendation feed, rate limiting) as a feedback loop. Does it have command authority? Is its sensor a proxy? Can it overshoot safely?
3. Pick a framework you've used. What architecture did it impose? Would you have chosen it?
4. Should software vendors be liable for defects the way car makers are? What would change, and what could go wrong?
5. Is "SE research is a complex ecosystem" true of your own field of study? Identify one feedback loop.
6. Apply Shaw's curriculum advice to this course: which parts are durable ideas, and which are current examples?

## Further reading

- M. Shaw, "Prospects for an Engineering Discipline of Software," *IEEE Software*, 1990.
- M. Shaw and D. Garlan, *Software Architecture: Perspectives on an Emerging Discipline*, Prentice Hall, 1996.
- M. Shaw, "Myths and Mythconceptions: What Does It Mean to Be a Programming Language, Anyhow?," *Proc. ACM Program. Lang.* (HOPL IV), 2021. (Shaw calls it "Myths and Misconceptions" in the interview.)
- M. Shaw et al., "Revisiting Abstractions for Software Architecture and Tools to Support Them" (the paper Shaw cites for her abstractions-over-time diagram; check for the current published version).
- H. Petroski, *Design Paradigms: Case Histories of Error and Judgment in Engineering*, Cambridge, 1994.
- D. A. Schön, *The Reflective Practitioner*, Basic Books, 1983.
- H. W. J. Rittel and M. M. Webber, "Dilemmas in a General Theory of Planning," *Policy Sciences*, 1973.
- F. P. Brooks, Jr., *The Design of Design*, Addison-Wesley, 2010.
- B. W. Lampson, "Hints for Computer System Design," *SOSP*, 1983.
- M. Jackson, *Problem Frames*, Addison-Wesley, 2001.
- A. van der Hoek and M. Petre (eds.), *Software Designers in Action*, CRC Press, 2014.
- modelproblems.org (Shaw's collection of design exemplars).

---

## Key term index

| Term | Theme |
|---|---|
| Abstract data type | 1 |
| Architectural style | 1 |
| Software architecture | 1 |
| Software engineering (NATO 1968) | 2 |
| Shaw's model of engineering maturity | 2 |
| Routine vs. innovative design | 2 |
| Problem solving vs. problem setting | 3 |
| Multiple views | 3 |
| Level of abstraction | 4 |
| Good-enough engineering | 4 |
| Tacit knowledge and design obligations | 5 |
| Feedback loop | 5 |
| Command authority and sensor proxies | 5 |
| PID control | 5 |
| Wicked problems | 6 |
| Pattern (Alexander) | 6 |
| Problem frames | 7 |
| Architecture description language | 8 |
| Exemplars (model problems) | 8 |
| Framework and architectural lock-in | 8 |
| Software liability and warranty disclaimers | 9 |
| Program vs. system vs. product | 9 |
| Mission creep | 10 |
| ACM CCS: software and its engineering | 11 |
| Model collapse | 12 |
| Code reading | 12 |
| Measurement scales and fungibility | 13 |
| Scarce resource | 14 |
| Traceability | 14 |
