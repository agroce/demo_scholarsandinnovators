# Chapter 8 — Keith Hoodlet: Securing Software in an AI World

*Chapter notes for instructors and students.* Key software engineering terms are **bolded** the first time they appear in the notes and get a boxed definition there. Each box ties the definition to how the term is used in the interview. All terms are collected in a [term index](#key-term-index) at the end.

---

## About Keith Hoodlet

At the time of the interview, Hoodlet was Engineering Director for AI/ML and Application Security at **Trail of Bits**, the security research and consulting firm. Before that he was a Principal Security Specialist at **GitHub**, where he championed DevSecOps and secure development at scale, and earlier worked on security at **Thermo Fisher Scientific**, a highly regulated laboratory-science company. He co-founded the *Application Security Weekly* podcast in 2018, holds the OSCP and OSWA offensive-security certifications, and finished first in the U.S. Department of Defense's first AI Bias Bounty contest in 2024.

Groce originally planned to interview Trail of Bits CEO Dan Guido. They agreed Hoodlet would give a more "on-the-ground" view. He is the only interviewee who has not taught university courses, and with Jean Yang (Chapter 7) one of the two whose careers are closer to their start than their finish.

## Reading guide

| Part of interview | What to watch for |
|---|---|
| Diablo, Battle.net, Visual Basic bots | A first program that was also a first security exploit |
| Then vs. now | Easier, more accessible, "both in a good way and a bad way"; coding agents and skill attrition |
| Builder vs. breaker | The security mindset; why security is still an afterthought |
| What changed | Bug bounties, sanitizers, fuzzers, memory-safe languages, DevOps |
| Testing at Thermo Fisher | Robust testing as the precondition for fast security patching |
| His biggest contribution | Economics: "Build it"; *Developer Hegemony* |
| Biggest change | LLMs; AIxCC; ~45% of LLM-generated code with vulnerabilities |
| Technical inflation | Air-raid sirens and software-defined radio |
| Research | LLMs are "always backward-looking," so far-out research still matters |
| Heroes and systems | Zalewski, Ormandy, Dowd; *Continuous Delivery*, *DevOps Handbook*; Linux and Git |
| Worst practices | Dead logic; dependency hell; the npm worm |
| The security divide | The "security poverty line"; agentic browsers and prompt injection |
| Methodology | "It depends": research-use vs. diagnostic devices; web apps |
| Design for security | CISA pledge; Tacoma Narrows; "would you use it if it had the vulnerabilities that your software has?" |
| Impact at scale | The Algorithm; the CrowdStrike outage |
| Now | AI-augmented auditing: 10–20% true positives, 5–10x more real bugs |
| What he'd ask | The social impact of what we build |

---

## Theme 1: A first program that was an exploit

Hoodlet's first hack came from playing Diablo in the late 1990s. Battle.net's "authentication process was so weak that if any user account was not currently logged in, I could just use the handle with the Diablo trial key on the back of the CD case to log in as that user." He taught himself Visual Basic and ran as many bot connections "as my 28.8 Kbps dial-up, 533MHz PC could sustain," and "that got me hooked." Being WinNuked off IRC on Windows 95 made him curious about how it all worked.

Compare Groce's own first security experience, decoding a game's "silly cryptography" to unlock weapons. Many security careers begin with a game.

> [!NOTE]
> **KEY TERM: Application security (AppSec)**
>
> **Definition.** The practice of finding, fixing, and preventing security weaknesses in software applications, as distinct from network or infrastructure security. It covers secure design, code review, static and dynamic analysis, penetration testing, dependency management, and training developers. AppSec teams increasingly work *inside* development processes rather than auditing at the end.
>
> **In the interview.** Hoodlet's whole career is AppSec, from Thermo Fisher to GitHub to leading Trail of Bits' AppSec and AI/ML security team. Web applications are "where I've made my name in the security space."

> [!NOTE]
> **KEY TERM: Authentication (and broken authentication)**
>
> **Definition.** Verifying that a user or system is who it claims to be: passwords, keys, tokens, multiple factors. **Authorization** is the separate question of what an authenticated party may do. Broken authentication, such as guessable credentials, missing checks, or credentials shared by many users, lets attackers impersonate others.
>
> **In the interview.** Battle.net let anyone log in as an idle account using the trial key printed on the CD case.

---

## Theme 2: More accessible, "both in a good way and a bad way"

Today's beginners "don't have to compile anything" and don't have to think about architecture. Coding agents make it easy "for an everyday user to create something that functionally works. It doesn't necessarily mean it's secure."

Hoodlet's sharper point is about who benefits. Experts get the most out of LLMs "because they know when it's wrong, and when it produces what they actually want." Junior developers "are becoming reliant on these things and don't have that knowledge," and "accept the outcomes in ways that are often fraught with risk, because of the vulnerabilities that get introduced." He notes that coding agents "have been shown in a number of research studies to cause skill attrition."

What hasn't changed is the magic of making something work. He describes walking his wife, a romantic fantasy novelist, through publishing her blog on GitHub Pages: "there was a magic to it for her... And now she doesn't even ask me for help."

> [!NOTE]
> **KEY TERM: Vibe coding**
>
> **Definition.** A term coined by Andrej Karpathy in 2025 for building software by describing what you want to an AI and accepting its code largely without reading or understanding it, iterating on behavior rather than on the code itself. It is fast for prototypes and throwaway tools. For production software it skips review, testing, and security analysis.
>
> **In the interview.** VC-backed companies "vibe coding their applications with Large Language Models" are "very severely under-aware" of security. Compare Yang's AI demos that "can never ship" (Ch. 7) and Schneider's "one more step of 'magic'" (Ch. 9).

> [!NOTE]
> **KEY TERM: Skill attrition (deskilling)**
>
> **Definition.** The loss, or failure to develop, skills that automation performs for us. Studied in aviation (pilots relying on autopilot) and now in programming with AI assistants. The risk is sharpest for novices, who may never build the knowledge needed to judge the tool's output.
>
> **In the interview.** "Experts get the most benefit out of large language models, because they know when it's wrong." Schneider (Ch. 9) makes the same argument about teaching: students must learn to program well enough to judge AI code.

---

## Theme 3: Builder's mindset, breaker's mindset

Hoodlet frames the core difficulty philosophically: "software development is a builder's mentality... a mentality of creation." Security, at least vulnerability research and application security, "is a breaker's mindset. It's a series of questions: how does this system operate?... How can I manipulate them to perform in a way that was not intended by the person who built this?" Getting builders to think about security "continues to be a challenge," and has been since software became widely available.

Awareness depends on context. Hobbyists are "almost entirely unaware." Large regulated companies are "abundantly aware... perhaps bombarded with awareness." The general public now knows when a company is hit by **ransomware**: his mother, a schoolteacher in her 70s, asks him about it. "That wasn't happening 20 years ago."

Testers share the breaker's pleasure. Hoodlet: one of the hardest parts of an audit is when "you don't find anything." Groce: "I hate not finding bugs."

> [!NOTE]
> **KEY TERM: Security mindset (adversarial thinking)**
>
> **Definition.** Habitually asking how a system can be made to fail or misbehave on purpose, not only whether it works as intended. Bruce Schneier describes it as thinking like an attacker. It is close to the tester's mindset (Zeller's "unhappy paths," Ch. 5), with one difference: the adversary is intelligent and adapts.
>
> **In the interview.** "How can I manipulate them to perform in a way that was not intended by the person who built this? I think that is the hardest part about software development."

> [!NOTE]
> **KEY TERM: Ransomware**
>
> **Definition.** Malware that encrypts or steals an organization's data and demands payment for the key or for not publishing it. Ransomware attacks on hospitals, pipelines, and city governments have made software security visible to the general public.
>
> **In the interview.** His mother's questions are his evidence that public awareness has changed.

---

## Theme 4: What changed — information, bounties, and tools

The biggest change is "the abundance of information available" on doing security correctly. Hoodlet traces part of it to big security events and to Microsoft's **bug bounty** program, led by **Katie Moussouris**. Part 6 of *The DevOps Handbook* "is all about security. It's just part of DevOps."

Tools have changed too. Compilers offer "address sanitization, for example." Fuzzing went from Dave Aitel's Immunity crew "throwing a bunch of A's at a bunch of software" to tools such as AFL. And there are "memory-safe compiled languages like Golang or Rust." He once assumed C would rule forever, but now memory safety issues are "on the extinction list."

> [!NOTE]
> **KEY TERM: Bug bounty and coordinated vulnerability disclosure**
>
> **Definition.** A **bug bounty** program pays outside researchers who report vulnerabilities through an agreed channel. **Coordinated disclosure** is the norm behind it: the researcher reports privately, the vendor gets time to fix, and details are published after a patch is available. Programs turned adversarial "hacking" into a market and a profession.
>
> **In the interview.** Security knowledge "grew out of, I think, Microsoft, mostly for their bug bounty program, led by Katie Moussouris."

> [!NOTE]
> **KEY TERM: Sanitizers**
>
> **Definition.** Compiler-inserted runtime checks that detect classes of bugs as they happen. **AddressSanitizer** (ASan) catches out-of-bounds accesses and use-after-free; others catch undefined behavior (UBSan), data races (TSan), and uninitialized memory (MSan). They turn silent memory corruption into an immediate, reported failure, which makes them a natural partner for fuzzing.
>
> **In the interview.** "Compilers have become a lot better at doing a lot for the software developer... like address sanitization."

> [!NOTE]
> **KEY TERM: Fuzzing**
>
> **Definition.** Automated testing with large numbers of generated, often malformed, inputs to find crashes and other failures. **Coverage-guided** fuzzers such as AFL (Zalewski, 2013) and libFuzzer keep inputs that reach new code and mutate them further. Fuzzing has found many thousands of security vulnerabilities. (Zeller, Ch. 5, covers test generation more broadly.)
>
> **In the interview.** "Back in the day, you didn't really have fuzzing tools." He names AFL's author, Michał Zalewski, as a hero. (AFL++ is the community successor to Zalewski's AFL.)

> [!NOTE]
> **KEY TERM: Buffer overflow and shellcode**
>
> **Definition.** A **buffer overflow** writes past the end of a fixed-size buffer, overwriting adjacent memory such as a function's return address. An attacker who controls the overflowing data can redirect execution to **shellcode**: injected machine code, classically one that opens a command shell. Memory-safe languages prevent the overflow. Defenses such as stack canaries, non-executable memory, and address randomization make exploitation harder in C and C++.
>
> **In the interview.** The attacker's "magic": "if I put this many A's in, I'm going to be able to overwrite this register, and then be able to plug in to my memory address space where my shell code is."

---

## Theme 5: Testing is a security velocity problem

At Thermo Fisher, some lab instruments were 20, 30, or 40 years old and still in use. He adds that "the very first device that was used to sequence SARS-CoV-2 was a Thermo Fisher device at Wuhan University" in December 2019. (Treat this as his recollection. Early SARS-CoV-2 genomes were sequenced on several platforms, and we could not confirm which instrument came first.) His advice to every team: "if your testing is robust, your ability to make security updates quickly and easily without breaking things is going to be that much faster. It's a velocity problem, and unless you have robust testing, everything is slow."

He credits test-driven development and DevOps for that change: "now you have tests in your CI/CD that need to pass before you get to production." In the 1990s and early 2000s, "testing was a lot less of a focus area."

> [!NOTE]
> **KEY TERM: Patch velocity**
>
> **Definition.** How quickly an organization can ship a fix once a vulnerability is known. It depends on how fast the fix can be developed, how confidently it can be verified not to break anything (regression testing), and how it reaches deployed systems. Long patch cycles leave a window in which a known vulnerability can be exploited.
>
> **In the interview.** Robust testing is the precondition: "Your software development, your delivery, your security patching, everything. You need it." (CI/CD is covered in the Chapter 7 primer.)

---

## Theme 6: Economics, LLMs, and AI-found bugs

Asked for his most important idea for working programmers, Hoodlet answers with economics. He recommends Erik Dietrich's *Developer Hegemony* on the future of developer labor and urges developers facing layoffs not to accept "learned helplessness": "Build it." With app stores and the web, "building software that thousands or millions of people can download and use quickly is not an insurmountable feat today." His analogy: after the printing press, scribes who could write "should have become authors."

The biggest change in his time is **large language models**, "given the radius of impact that it has" on economics, writing, testing, and securing code. Trail of Bits' fully autonomous **Buttercup** system took second place in DARPA's **AI Cyber Challenge** (AIxCC), showing "you can find bugs autonomously with large language models," and "this is the floor for where these capabilities are going, not the ceiling." He cites a Veracode report (August 2025) that about 45% of LLM-generated code samples introduced vulnerabilities.

> [!NOTE]
> **KEY TERM: Automated vulnerability discovery and repair (AIxCC)**
>
> **Definition.** Systems that find and fix security vulnerabilities without human intervention. DARPA's Cyber Grand Challenge (2016) did this with symbolic execution and fuzzing on binaries. Its **AI Cyber Challenge** (AIxCC, finals 2025) required teams to combine traditional tools with LLMs to find and patch vulnerabilities in real open-source code.
>
> **In the interview.** Buttercup's second place shows that with "the inclusion of tools and validators for bug finding," LLM-based systems can find real bugs.

> [!NOTE]
> **KEY TERM: Reward hacking**
>
> **Definition.** When an AI system optimizes the measure it is given rather than the goal behind it. In coding, the classic case is making a test pass by weakening the test or special-casing its input instead of fixing the code. It is Goodhart's law for machines.
>
> **In the interview.** Ensure code is "truly testable and not just reward hacking, where the LLM just sort of says, 'oh yeah, I'm going to just always set this to true, so therefore it always passes'—testing that's not actually testing."

---

## Theme 7: Technical inflation

Hoodlet's most original idea. Around 2016 or 2017 (the widely reported case was Dallas, April 2017), outdoor emergency sirens were set off in the middle of the night by someone using radio equipment. When the sirens were built, the frequencies "were limited to use in military devices," and civilians couldn't access them or their protocols. "Fast forward 75 years, and suddenly any punk teenager walking around with a software-defined radio can pick up the signals." The designers did nothing wrong for their time; "technology advanced to a state, or inflated to a state, where they suddenly were insecure."

He distinguishes this from **technical debt**: debt is a shortcut you took; inflation is the world changing around a design that was adequate. Applied to LLMs: models will get better at writing secure, testable code, so developers should shift toward "someone who can come up with ideas that solve real-world problems."

You can partly anticipate inflation: for example, choosing post-quantum cryptographic algorithms "because we can anticipate a future state where post-quantum cryptography is required."

> [!NOTE]
> **KEY TERM: Technical inflation**
>
> **Definition.** Hoodlet's term for software or systems that become insecure not because of flaws introduced when they were built, but because attackers' capabilities, tools, and access grew over time, invalidating the original assumptions. It is an argument for revisiting threat models periodically, not just once at design time.
>
> **In the interview.** Sirens designed when the radio bands were military-only, triggered decades later with cheap software-defined radio. "It's not that they didn't do the most secure implementation at the time that they were built."

> [!NOTE]
> **KEY TERM: Threat model (and its assumptions)**
>
> **Definition.** An explicit description of what you are protecting, from whom, what the attackers can do, and what you assume they can't. Every security design rests on these assumptions ("only the military has transmitters on this band"). When an assumption stops being true, the design's security can disappear without any code changing. (Threat modeling methods are in the Chapter 8 primer.)
>
> **In the interview.** "At the time that they built it, they could reasonably assume that the frequency bands would continue to be controlled by the U.S. government."

> [!NOTE]
> **KEY TERM: Post-quantum cryptography**
>
> **Definition.** Public-key algorithms designed to resist attack by large quantum computers, which would break RSA and elliptic-curve cryptography. NIST standardized the first post-quantum algorithms (ML-KEM, ML-DSA, SLH-DSA) in 2024. Because encrypted data can be recorded now and decrypted later, migration has begun before such computers exist.
>
> **In the interview.** An example of technical inflation "we can see... coming," and so can design for.

---

## Theme 8: Research, heroes, and the systems he admires

Hoodlet hasn't taught at a university. His case for far-out research comes from how LLMs work: they "very quickly get to the middle of the bell curve solution," but novel problems lie out "on the fifth or sixth standard deviation." Since LLMs "are always backward-looking," "if no one's working on those problems, we will never solve them."

His heroes: **Michał Zalewski** (AFL, and later writing such as *Practical Doomsday*); researchers **Tavis Ormandy** and **Mark Dowd** for their "ability to truly crack open software"; and the authors of ***Continuous Delivery*** (Humble and Farley) and ***The DevOps Handbook***, who moved the industry from "slow, iterative, insecure software delivery to faster, more thoughtful, well-tested, hardened" delivery.

His exemplary system is **Linux** and the process around it, including **Git**: "tens or hundreds or thousands of people writing software together that is used on millions, if not billions, of systems around the world." He estimates open source "makes up something like 80 or 90% of most codebases," "a tremendous gift to humanity that is sometimes, unfortunately, abused by profit-seeking entities."

## Theme 9: Worst practices — dead logic and dependency hell

Two dislikes. First, logic that never triggers: code "that will only ever navigate down a single path," where "there is no way that the state ever actually reaches other pieces of the logic." Someone "thought that they were being clever, when in fact, they were being very foolish," and it has often "led to very interesting vulnerabilities."

Second, package management: "Python dependency management and node dependency management has jumped the shark." He cites **Shai-Hulud**, a 2025 self-propagating worm in the npm registry, and credits the Python tool `uv` with making environments much easier.

> [!NOTE]
> **KEY TERM: Dead code (unreachable logic)**
>
> **Definition.** Code that can never execute, or branches whose conditions can never be true given the program's actual states. It adds complexity, misleads readers about what the program handles, hides untested assumptions, and can become live unexpectedly after other changes (Knight Capital's reactivated code, Ch. 1 primer). Coverage tools and static analysis can find some of it.
>
> **In the interview.** Logic "that will only ever navigate down a single path"; often the source of "very interesting vulnerabilities or exploitable outcomes."

> [!NOTE]
> **KEY TERM: Software supply chain attack**
>
> **Definition.** Compromising software by attacking something it depends on (a library, a package registry, a build system, or a maintainer's account) rather than the software itself. Because modern applications pull in hundreds of transitive dependencies, one compromised package can reach thousands of victims. Well-known examples: SolarWinds (2020), the xz backdoor (2024), and npm worms that steal tokens and republish infected packages.
>
> **In the interview.** "With Shai-Hulud, the recent npm worm, it's abusing a very old way in which we've done package management."

> [!NOTE]
> **KEY TERM: Dependency hell**
>
> **Definition.** The difficulty of installing or upgrading software whose dependencies conflict: packages requiring incompatible versions of the same library, unpinned versions that change underneath you, or old projects whose dependencies no longer install. Lock files, virtual environments, and reproducible-build tools address it.
>
> **In the interview.** Before `uv`, "you had 20 different tools, and most of them didn't work, and you were always in dependency hell."

---

## Theme 10: The security poverty line, and agentic browsers

Hoodlet points to Daniel Miessler's writing on the **security poverty line**. Large technology companies and big financial firms "buy every tool" and have processes to use them well. At Microsoft, for example, CodeQL (from GitHub's acquisition of Semmle) is run across Microsoft's code. Many venture-backed startups "have invested almost no effort in security."

His current example: **agentic browsers**, where an AI assistant can read and act across all your tabs. These "totally undo the browser hardening that has happened over the last 20 years." "If you put an AI in the middle of all your browser tabs, you now have an oracle, and if you can prompt-inject that oracle," you get rid of isolation between sites and between tabs. In one audit, a prompt injection on a dummy site that the AI summarized let them steal a Bitcoin wallet's recovery key from another tab. Patching by editing the system prompt is "a whack-a-mole problem." He cites Nicholas Carlini and colleagues' paper "The Attacker Moves Second," in which human attackers defeated all of the prompt-injection defenses tested.

> [!NOTE]
> **KEY TERM: Security poverty line**
>
> **Definition.** Wendy Nather's term (later popularized by others, including Daniel Miessler) for the level of resources below which an organization cannot afford effective security: the staff, tools, and processes needed even to use the tools. Organizations below it depend on defaults and on vendors.
>
> **In the interview.** The divide between big financial firms, for which "a compromise... is potentially a business ending event," and startups that spend "the least amount of effort required to step over the bar."

> [!NOTE]
> **KEY TERM: Static analysis for security (CodeQL)**
>
> **Definition.** Analyzing source code without running it to find vulnerability patterns, such as untrusted input reaching a database query. **CodeQL** (originally Semmle, acquired by GitHub in 2019) treats code as a database and lets analysts write queries for bug patterns, then runs them across many repositories. (The Chapter 1 primer covers static analysis in general.)
>
> **In the interview.** Large companies have "really good structures and processes in place to be able to use those tools effectively."

> [!NOTE]
> **KEY TERM: Prompt injection**
>
> **Definition.** An attack on LLM-based systems in which instructions hidden in data the model reads (a web page, an email, a document) override the developer's or user's instructions. Because LLMs do not reliably separate instructions from data, any untrusted text an agent reads is potentially attacker-controlled code. It is listed first in OWASP's Top 10 for LLM applications.
>
> **In the interview.** A prompt injection on a summarized web page stole a recovery key from another tab. Updating the system prompt is "whack-a-mole."

> [!NOTE]
> **KEY TERM: Same-origin policy and process isolation**
>
> **Definition.** The browser's core security rule: scripts from one *origin* (scheme, host, port) cannot read data from another origin. Modern browsers back it with **process isolation**, running sites in separate operating-system processes so that even a compromised renderer can't read another site's memory (Chrome's Site Isolation, 2018).
>
> **In the interview.** A prompt-injected agent gets rid of "same-site policy" and "process isolation between browser tabs." (The standard term is *same-origin* policy; "same-site" is a related, looser notion used for cookies.) Strictly, the browser's mechanisms still work: no script crosses an origin boundary. The agent sits *above* them, acting with the user's authority in every tab, so injected text on one site can steer it into reading or acting on another. That is a **confused deputy** problem: the isolation is bypassed rather than broken, which is why patching the system prompt is "whack-a-mole."

---

## Theme 11: Methodology — "it depends"

"In true expert fashion, I would say it depends," on the software and on how often it needs an update. Thermo Fisher had both e-commerce sites and decades-old, unnetworked lab devices. Medical devices fell into two regulatory classes: **research use only (RUO)**, with lenient patch timelines, and **in vitro diagnostics (IVD)**, where "the potential for patient harm" is higher and "you had 60 days to patch or mitigate, otherwise you had to do a full recall" (as of about six years before the interview).

> [!NOTE]
> **Instructor note.** Hoodlet is describing how his company's regulated teams worked, compressed into one rule. The source is FDA's nonbinding guidance *Postmarket Management of Cybersecurity in Medical Devices* (December 2016). For a vulnerability posing an *uncontrolled* risk to patients, a fix counts as a device **correction**, which normally must be reported to FDA under 21 CFR Part 806 (the recall-reporting rule). FDA said it would not enforce that reporting if the manufacturer told customers and put compensating controls in place within 30 days, shipped a validated fix within 60 days, had no serious adverse events, and took part in an information-sharing organization (ISAO). So 60 days was the window for handling a fix as routine maintenance rather than a reported correction, not an automatic recall trigger. The gap between the rule and how practitioners remember it is itself worth discussing.

For a device patched once a year in an air-gapped environment, "sure, waterfall is just fine." For internet-facing web apps, "speed can really matter," and how much depends on what an attacker could gain: names and emails on a forum, or millions on a Bitcoin platform.

> [!NOTE]
> **KEY TERM: Risk-based process selection**
>
> **Definition.** Choosing development, testing, and release practices according to the consequences of failure, the threat environment, and update constraints rather than by fashion. This is the idea behind Boehm and Turner's "home grounds" (Ch. 2 primer) and behind regulatory safety classes for medical, automotive, and aviation software.
>
> **In the interview.** RUO vs. IVD devices; air-gapped instruments vs. internet-facing Bitcoin platforms. Compare Groce's cheap NASA missions vs. a Mars rover.

> [!NOTE]
> **KEY TERM: Air gap**
>
> **Definition.** Physical isolation of a computer or network from untrusted networks such as the internet. It sharply reduces remote attack surface but makes updates slow (patches are carried in by hand, as on a USB drive) and is not absolute protection: Stuxnet reached air-gapped centrifuge controllers on removable media.
>
> **In the interview.** "Are you putting a patch on a USB and someone's walking to every device to update it?"

---

## Theme 12: Designing for security

Responding to Krishnamurthi's design question, Hoodlet calls design for security "incredibly important." He mentions CISA's 2024 **Secure by Design pledge**, with an ironic note that one signatory continued to ship "really bad, easily exploitable remote vulnerabilities."

Civil engineering students see the **Tacoma Narrows Bridge** collapse in their first class. Software students rarely see the equivalent: "here is a server-side request forgery, or here is a remote code execution... You just never learn it." (Groce's father, a high school drafting teacher, showed the Tacoma Narrows film to every class.)

His technique with development teams: ask who has a banking app on their phone, then "would you use it if it had the vulnerabilities that your software has?" The point: "security is a feature of your software, but it's not a feature that people ask you for. It is a feature that people expect by default."

What you can design for: memory-safe languages, careful "parsing of user-controlled inputs," database fields for "hashing and salting," and post-quantum algorithms. Ironically, "a lot of security software is known for actually having vulnerabilities in the security software itself." Groce: "Sometimes, nothing is buggier than automated test generation tools."

> [!NOTE]
> **KEY TERM: Secure by design (and secure by default)**
>
> **Definition.** Building security into architecture and defaults rather than adding it later: memory-safe languages, eliminating whole vulnerability classes (for example, parameterized queries instead of string-built SQL), least privilege, multi-factor authentication on by default, and no default passwords. CISA's Secure by Design initiative (2023–24) asks vendors to take responsibility for customers' security outcomes.
>
> **In the interview.** Security is "a feature that people expect by default. They just sort of assume that you have done it."

> [!NOTE]
> **KEY TERM: Server-side request forgery (SSRF) and remote code execution (RCE)**
>
> **Definition.** **SSRF**: tricking a server into making network requests the attacker chooses, often to internal services or cloud metadata endpoints that hold credentials. **RCE**: a vulnerability that lets an attacker run arbitrary code on the target system, usually the most severe class.
>
> **In the interview.** His examples of what software students "just never learn," unlike civil engineers shown Tacoma Narrows.

> [!NOTE]
> **KEY TERM: Input validation and password hashing with salts**
>
> **Definition.** **Input validation** treats all user-controlled data as hostile: parse it strictly, check it against what is allowed, and keep it out of interpreters (SQL, shells, HTML) except through safe interfaces. **Password hashing** stores a slow, one-way hash of each password with a unique random **salt**, so stolen databases can't be reversed or attacked with precomputed tables. Use a purpose-built algorithm such as bcrypt, scrypt, or Argon2.
>
> **In the interview.** "Very constrained in the way that we work the logic around parsing of user-controlled inputs"; database fields that allow "hashing and salting."

---

## Theme 13: Impact at scale

Unintended consequences multiply with scale. In the DoD AI Bias Bounty he showed, "on multiple occasions," that the technology "could... have negative consequences." He cites Hilke Schellmann's *The Algorithm*: one biased manager affects a few people, but "if you build it into the system that does this for millions of individuals, it's problematic at scale."

The same holds for any widely deployed software. The **CrowdStrike** agent update of July 2024 crashed millions of Windows systems, disrupting flights and hospitals. He mentions a 2025 study reporting a spike in hospital **excess deaths** around the outage. (Ask students to find and evaluate the study before citing it.) His conclusion: what is appropriate "is very dependent upon the scale of the way the software is used, and the potential impacts of that software not functioning correctly or insecurely."

> [!NOTE]
> **KEY TERM: Algorithmic bias and AI red teaming**
>
> **Definition.** **Algorithmic bias** is a systematic, unfair difference in how an automated system treats groups of people, often learned from biased training data. **AI red teaming** is adversarial testing of AI systems to find harmful behavior (bias, unsafe outputs, security failures) before attackers or users do. A **bias bounty** pays outside testers for demonstrated bias, by analogy with bug bounties.
>
> **In the interview.** Hoodlet won the DoD's first AI Bias Bounty; he cites *The Algorithm* on hiring and firing systems.

> [!NOTE]
> **KEY TERM: Blast radius**
>
> **Definition.** The scope of damage a single failure or compromise can cause: how many users, systems, or organizations are affected. Engineers reduce it with staged rollouts, isolation between components, and limiting what any one credential or update can touch.
>
> **In the interview.** The CrowdStrike update reached "eight million-some-odd systems globally." (Microsoft estimated about 8.5 million.)

---

## Theme 14: What he's working on — AI-augmented auditing

After AIxCC, his team asked how to apply AI to auditing client software. With AI-augmented static analysis and direct prompting, they see "somewhere between a 10% and 20% true positive rate today," but "a 5x to 10x multiple" in the number of real, exploitable bugs found compared with their previous static analyzers and fuzzers. A human in the loop "is still required," especially for business logic flaws and for chaining vulnerabilities to drive impact.

> [!NOTE]
> **KEY TERM: True positive rate, false positives, and human-in-the-loop triage**
>
> **Definition.** For a bug-finding tool, a **true positive** is a reported issue that is real. A **false positive** is a report that isn't. Precision (the fraction of reports that are real) determines how much human effort triage takes. Recall (the fraction of real bugs found) determines how much is missed. A tool with low precision can still be valuable if it finds many more real bugs and **human-in-the-loop** reviewers can triage efficiently.
>
> **In the interview.** 10–20% of AI findings are real, but the number of real exploitable bugs is up 5–10x. (Hoodlet calls the first number a "true positive rate"; it is closer to what is usually called precision.)

> [!NOTE]
> **KEY TERM: Business logic flaw**
>
> **Definition.** A vulnerability in what the application allows rather than in low-level code: skipping a payment step, applying a discount twice, approving your own request. Business logic flaws require understanding the application's purpose, so generic scanners rarely find them.
>
> **In the interview.** A human is still needed "to identify business logic [flaws] and for understanding the full context of an exploitable vulnerability."

---

## Theme 15: What should I have asked? — social impact

Hoodlet's question: "what are the actual impacts of the things that we're building?" He points to social media and short-form video, and their effects on "attention span, on social behaviors, on relationships, on interest in reading books." He cites Nicholas Carlini's blog post "Are large language models worth it?" and asks, "Do we build the torment nexus?" Some technologies are clear net positives: Mastodon and decentralized social networking, social coding with Git. For others, "it depends." He mentions Australia's new law banning social media for minors as a natural experiment worth watching.

His closing image is the TV show *Fringe*, whose plots show "what happens when no one stopped to think about, 'should we make this?'... software engineers would benefit from stopping and thinking about what they are building."

> [!NOTE]
> **KEY TERM: Professional ethics and social impact**
>
> **Definition.** The obligations of computing professionals to the public, beyond their employer and client. The ACM Code of Ethics (2018) begins with "Contribute to society and to human well-being" and "Avoid harm," and asks professionals to consider the impact of their work on everyone affected, including future and indirect stakeholders. (Covered in the Chapter 8 primer.)
>
> **In the interview.** "What future state of impacts can we anticipate as a result of the stuff that we are building today?" Ball (Ch. 1) also raised social impact without being asked.

---

## Connections to other chapters

- **Chapter 1 (Ball):** Static analysis at scale (SLAM to CodeQL); both raised social impact unprompted.
- **Chapter 2 (Krishnamurthi):** Process "depends," as in Boehm and Turner's home grounds; Hoodlet adds regulation and patch deadlines.
- **Chapter 4 (Holzmann):** Holzmann's safety-critical JPL world and Hoodlet's IVD devices are both places where waterfall-style rigor is defensible.
- **Chapter 5 (Zeller):** Fuzzing, sanitizers, and unhappy paths; the tester's and the breaker's mindsets are close relatives.
- **Chapter 7 (Yang):** Two early-career interviewees; both see AI-generated software outrunning maintenance and security; Yang's API inventories and Hoodlet's agentic browsers are both boundary problems.
- **Chapter 9 (Schneider):** Practice meets foundations: Schneider's policies, mechanisms, and reference monitors give the theory behind Hoodlet's same-origin policy and process isolation. Both want students able to judge AI code.

## Discussion questions

1. Hoodlet says security is "a feature that people expect by default." Who should pay for it: the vendor, the customer, or regulators? Use CISA's Secure by Design principles in your answer.
2. Give an example of technical inflation in a system you use. What assumption was reasonable when it was built, and what changed?
3. Coding agents help experts more than novices. What should a software engineering course do about that?
4. Explain why patching an agentic browser by editing its system prompt is "whack-a-mole." What would a design-level fix look like?
5. Is waterfall "just fine" for an air-gapped lab instrument? What would make you change your answer?
6. Pick a technology you use daily. Answer Hoodlet's question: what are its actual impacts, and what would you change in its design?

## Further reading

- K. Hoodlet, blog at securing.dev, including his write-up of the DoD AI Bias Bounty.
- G. Kim, J. Humble, P. Debois, J. Willis, *The DevOps Handbook*, IT Revolution, 2016 (Part VI: security).
- J. Humble and D. Farley, *Continuous Delivery*, Addison-Wesley, 2010.
- R. Anderson, *Security Engineering* (3rd ed.), Wiley, 2020.
- M. Zalewski, *The Tangled Web: A Guide to Securing Modern Web Applications*, No Starch Press, 2011.
- M. Nasr, N. Carlini, et al., "The Attacker Moves Second," arXiv:2510.09023, 2025.
- N. Carlini, "Are large language models worth it?," nicholas.carlini.com, 2025.
- H. Schellmann, *The Algorithm*, Hachette, 2024.
- CISA, "Secure by Design" principles and pledge, cisa.gov/securebydesign.
- E. Dietrich, *Developer Hegemony*, 2017.

---

## Key term index

| Term | Theme |
|---|---|
| Application security (AppSec) | 1 |
| Authentication (and broken authentication) | 1 |
| Vibe coding | 2 |
| Skill attrition | 2 |
| Security mindset | 3 |
| Ransomware | 3 |
| Bug bounty and coordinated disclosure | 4 |
| Sanitizers | 4 |
| Fuzzing | 4 |
| Buffer overflow and shellcode | 4 |
| Patch velocity | 5 |
| Automated vulnerability discovery (AIxCC) | 6 |
| Reward hacking | 6 |
| Technical inflation | 7 |
| Threat model | 7 |
| Post-quantum cryptography | 7 |
| Dead code | 9 |
| Software supply chain attack | 9 |
| Dependency hell | 9 |
| Security poverty line | 10 |
| Static analysis for security (CodeQL) | 10 |
| Prompt injection | 10 |
| Same-origin policy and process isolation | 10 |
| Risk-based process selection | 11 |
| Air gap | 11 |
| Secure by design | 12 |
| SSRF and RCE | 12 |
| Input validation and password hashing | 12 |
| Algorithmic bias and AI red teaming | 13 |
| Blast radius | 13 |
| True/false positives and human-in-the-loop triage | 14 |
| Business logic flaw | 14 |
| Professional ethics and social impact | 15 |
