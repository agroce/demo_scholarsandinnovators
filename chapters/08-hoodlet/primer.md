# Primer for Chapter 8 (Hoodlet): Secure Software Development

*Vulnerabilities, threat modeling, the secure development lifecycle, supply chains, disclosure, and AI-specific risks, plus professional ethics*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Hoodlet interview.*

## What this primer covers, and why

**Main topic: building software that resists attack.** Security goals and vocabulary; a short history of software security; the OWASP Top 10 and common weakness classes; injection and memory safety; CVE, CWE, and CVSS; threat modeling with STRIDE; the secure development lifecycle and DevSecOps; software supply chain security; vulnerability disclosure and bug bounties; security risks of LLM-based systems.

**Shorter topic: professional ethics and social impact.** Codes of ethics for software engineers; four case studies; tools for asking "should we build this?"

> **Why read this first.** Hoodlet is a practitioner. He refers casually to buffer overflows, SSRF, RCE, CodeQL, fuzzing, sanitizers, npm worms, prompt injection, and the same-origin policy, and he assumes you know why security is "a feature that people expect by default." This primer gives you that vocabulary. Chapter 9 (Schneider) then provides the foundations underneath it: policies, mechanisms, and what can and can't be enforced. Hoodlet's "what should I have asked" was about social impact, so the primer closes with ethics.

---

# Secure software development

*Building for a world with an intelligent adversary*

## Security goals and vocabulary

Classic security goals (the **CIA triad**):

- **Confidentiality**: information is disclosed only to those authorized.
- **Integrity**: information and systems are modified only in authorized ways.
- **Availability**: the system is usable when needed.
Often added: **authentication** (who are you?), **authorization** (what may you do?), and **accountability** (who did what, provably?).

- A **vulnerability** is a weakness that can be exploited. A **threat** is a potential attacker or event. An **exploit** is a concrete way to use a vulnerability. **Risk** combines likelihood and impact.
- The **attack surface** is every point where an attacker can supply input or reach the system.

> **Why security differs from reliability.** Testing for reliability asks what inputs _happen_. Security must consider what inputs an intelligent adversary can _choose_, and attackers search for exactly the cases you didn't test. Hoodlet: development is "a builder's mentality"; security is "a breaker's mindset."

## Software security history, part 1

- **1988** — Morris worm: buffer overflow in fingerd; thousands of hosts
- **1995** — First bug bounty: Netscape's "Bugs Bounty"
- **1996** — "Smashing the Stack": Aleph One, Phrack
- **1999** — CVE list launched: MITRE: one name per vulnerability
- **2001** — Code Red, Nimda: worms hit IIS servers
- **2002** — Trustworthy Computing: Bill Gates memo
- **2004** — Microsoft SDL: security in every phase

## Software security history, part 2

- **2013** — Microsoft bounties: Katie Moussouris
- **2014** — Heartbleed: OpenSSL bounds-check bug
- **2017** — Equifax: unpatched Apache Struts; 147M people
- **2020** — SolarWinds: backdoored build pipeline
- **2021** — Log4Shell: RCE in a ubiquitous library
- **2024** — xz backdoor: multi-year social engineering
- **2025** — AIxCC finals: AI finds and patches bugs

## The OWASP Top 10 (2021 edition)

The Open Worldwide Application Security Project publishes a ranked list of web application risk categories, based on industry data. A 2025 edition has followed; check owasp.org for the current list.

**1–5**

- **A01 Broken access control**: users act outside their permissions
- **A02 Cryptographic failures**: weak or missing encryption
- **A03 Injection**: SQL, OS command, and cross-site scripting (XSS)
- **A04 Insecure design**: flaws no implementation can fix
- **A05 Security misconfiguration**: defaults, open storage, verbose errors

**6–10**

- **A06 Vulnerable and outdated components**: known-bad dependencies
- **A07 Identification and authentication failures**
- **A08 Software and data integrity failures**: unverified updates, insecure CI/CD
- **A09 Logging and monitoring failures**
- **A10 Server-side request forgery (SSRF)**

Point out that A04 (insecure design) entered in 2021, recognizing that security can't be bolted on afterwards. OWASP also publishes an API Security Top 10 (Ch. 7 primer) and a Top 10 for LLM Applications.

## Injection: mixing data and code

Injection happens when untrusted data is interpreted as code by some interpreter: a SQL engine, a shell, a browser.

`query = "SELECT * FROM users WHERE name = '" + name + "'"`

If `name` is `x' OR '1'='1`, the query returns every user. The fix is to keep data and code separate with a **parameterized query**:

`db.execute("SELECT * FROM users WHERE name = ?", [name])`

- **Cross-site scripting (XSS)** is injection into HTML: user content containing `<script>` runs in other users' browsers. Fix: context-aware output encoding, templating that escapes by default, Content Security Policy.
- **OS command injection**: passing user input to a shell. Fix: call programs with argument lists, never strings.

> **The general lesson.** Whole vulnerability classes disappear when the API makes the safe thing the default (parameterized queries, auto-escaping templates). That is **secure by design**.

**Prompt injection** (below) is the same problem for LLMs, but with no reliable way to separate instructions from data.

## Memory safety

C and C++ let a program read or write any address. Bugs in bounds checking or object lifetimes become **memory corruption**:

- **Buffer overflow**: writing past the end of an array (the Morris worm, 1988).
- **Use-after-free**: using memory after it has been released and reused.
- **Out-of-bounds read**: Heartbleed (2014) returned up to 64 KB of server memory, including private keys.
Microsoft and Google's Chromium team have each reported that roughly **70%** of their serious security bugs are memory safety issues. Since 2022–23, the NSA and CISA have urged moving to **memory-safe languages** (Rust, Go, Java, C#, Swift, Python).

For existing C and C++: **sanitizers**, **fuzzing**, hardened allocators, and mitigations such as stack canaries, non-executable memory, and address space layout randomization (ASLR).

> **In the book.** **Hoodlet** (Ch. 8): memory safety bugs are "on the extinction list."
**Schneider** (Ch. 9): "The fact that people still use C, I don't understand."
**Kernighan** (Ch. 6): C gives you no help.

## Naming and scoring vulnerabilities

**CVE**

- **Common Vulnerabilities and Exposures** (MITRE, 1999)
- An identifier for one specific vulnerability in one product, such as CVE-2021-44228 (Log4Shell).
- Lets vendors, scanners, and advisories refer to the same bug.

**CWE**

- **Common Weakness Enumeration**
- A catalog of weakness _types_: CWE-79 (XSS), CWE-89 (SQL injection), CWE-787 (out-of-bounds write).
- MITRE publishes a yearly "Top 25 Most Dangerous" list.

**CVSS**

- **Common Vulnerability Scoring System**
- A 0–10 severity score from attack vector, complexity, privileges required, user interaction, and impact.
- Useful for triage, but severity is not risk: context matters.

## Threat modeling with STRIDE

Adam Shostack's four questions: **What are we working on? What can go wrong? What are we going to do about it? Did we do a good job?** STRIDE (Microsoft, 1999) is a checklist for the second question. Each threat violates one security property.

**S, T, R**

- **Spoofing** identity → violates _authentication_
- **Tampering** with data or code → violates _integrity_
- **Repudiation**: denying an action with no proof → violates _accountability_

**I, D, E**

- **Information disclosure** → violates _confidentiality_
- **Denial of service** → violates _availability_
- **Elevation of privilege** → violates _authorization_

## A data flow diagram with a trust boundary

```
[User's browser] --(Spoofing? Tampering?)--> | Web application --(Injection? Disclosure?)--> Database |
                                             |   Admin console (Elevation of privilege?)            |
                     trust boundary ---------+---(Repudiation? Secrets in transit?)--> [Third-party payment API]
```

Threat modeling starts from a **data flow diagram**: processes, data stores, external entities, and flows. Every flow that crosses a **trust boundary** gets STRIDE questions. Hoodlet's "technical inflation" is a reminder to revisit the model's assumptions as attackers' capabilities change.

## A secure development lifecycle

```
Requirements → Design (threat model) → Implementation → Verification → Release → Response
     ↑__________________ lessons from incidents feed the next cycle ________________|
```

Microsoft's Security Development Lifecycle (SDL, 2004) made security an activity in every phase, after the Trustworthy Computing memo. OWASP SAMM and NIST's Secure Software Development Framework (SSDF, SP 800-218) describe similar practices. Note that **design**, where the threat model lives, is where the cheapest fixes are.

## DevSecOps: security in the pipeline

**DevSecOps** puts security checks into the same automated pipeline as tests (Ch. 7 primer), so problems are found minutes after they're written. This is often called **shifting left**.

- **SAST** (static application security testing): analyze source code, as with CodeQL or Semgrep.
- **SCA** (software composition analysis): find dependencies with known CVEs.
- **Secret scanning**: catch API keys and passwords before they're committed.
- **DAST** (dynamic testing) and **fuzzing**: attack the running program.
- **Policy as code**: required reviews, signed commits, protected branches.
The risk is **alert fatigue**: tools that report thousands of low-value findings get ignored. Tuning, triage, and fixing whole bug classes matter more than tool count.

> **In Chapter 8.** Hoodlet: "if your testing is robust, your ability to make security updates quickly and easily without breaking things is going to be that much faster."

The **security poverty line**: big firms have tools _and_ the process to use them; many startups have neither.

## Software supply chain security

A typical application is mostly other people's code: Hoodlet estimates 80–90% open source. Attacks now target that chain:

- **Compromised dependencies**: malicious or hijacked packages, typosquatting, and self-spreading npm worms.
- **Compromised builds**: SolarWinds (2020) shipped a backdoor inserted in its build system to thousands of customers.
- **Compromised maintainers**: in the **xz** case (2024), a contributor spent about two years earning trust before inserting a backdoor aimed at SSH. Andres Freund caught it after noticing logins taking about half a second too long.
Defenses: pinned and reviewed dependencies, **SBOMs** (software bills of materials), signed artifacts (Sigstore), reproducible builds, and build-integrity levels such as **SLSA**.

> **Log4Shell (2021).** A single feature in the Java logging library Log4j allowed remote code execution through a logged string. Because Log4j was buried deep in dependency trees, many organizations spent weeks just finding out whether they used it. That is the problem SBOMs are meant to solve.

## Disclosure, bounties, and the security community

When a researcher finds a vulnerability, who learns about it, and when?

- **Full disclosure**: publish immediately, which pressures vendors but arms attackers.
- **Coordinated disclosure**: report privately, give the vendor time to fix (Google Project Zero's standard is 90 days), then publish.
- **Bug bounties** pay for reports through an agreed channel. Netscape offered one in 1995; Microsoft's programs, launched in 2013 under Katie Moussouris, helped make bounties mainstream. Platforms now run programs for thousands of organizations.
Researchers such as Tavis Ormandy (Project Zero) and Mark Dowd (co-author of _The Art of Software Security Assessment_), both named by Hoodlet, made vulnerability research a discipline.

> **Legal note.** Testing systems you don't own without permission can be illegal (in the U.S., the Computer Fraud and Abuse Act). Bounty programs and "safe harbor" policies define what is authorized. Hoodlet's teenage Battle.net exploits would not be a good career move today.

## New risks: LLMs and agents

LLM-based systems add risks that traditional AppSec doesn't cover (see the OWASP Top 10 for LLM Applications):

- **Prompt injection**: instructions hidden in content the model reads override its instructions. **Indirect** injection arrives through web pages, emails, or documents, not from the user.
- **Excessive agency**: an agent with tools (browsing, email, code execution) can be steered into using them for an attacker.
- **Insecure output handling**: treating model output as trusted code or commands.
- **Generated vulnerabilities**: AI-written code that "works" but is insecure, accepted by developers who can't judge it.
Simon Willison's **"lethal trifecta"**: an agent with access to private data, exposure to untrusted content, and a way to communicate externally can be made to exfiltrate data. Remove any one of the three.

> **Hoodlet's audit.** An agentic browser read a prompt-injected page in one tab and leaked a wallet recovery key from another: all three parts of the trifecta at once. Hardening the system prompt is "whack-a-mole."

---

# Ethics and social impact

*"What are the actual impacts of the things that we're building?"*

## Codes of ethics for software engineers

Other engineering disciplines have codes of ethics and, often, licensing. Software has codes, but rarely licensing (see the Chapter 10 primer).

The **ACM Code of Ethics and Professional Conduct** (2018) begins with general principles:

- Contribute to society and to human well-being, acknowledging that all people are stakeholders in computing.
- Avoid harm.
- Be honest and trustworthy; be fair and take action not to discriminate; respect privacy; honor confidentiality.
The **Software Engineering Code of Ethics** (ACM/IEEE-CS, 1999) has eight principles, ordered by obligation: **Public**, Client and Employer, Product, Judgment, Management, Profession, Colleagues, Self. The first: "Software engineers shall act consistently with the public interest."

> **Scale changes ethics.** Hoodlet, via Schellmann's _The Algorithm_: one biased manager affects a few people; a biased system affects millions. A small defect in a widely deployed product (CrowdStrike, 2024) is a large harm.

## Four case studies

**Volkswagen, 2015**

- Engine software detected emissions tests and ran cleaner only during them.
- About 11 million cars worldwide.
- Engineers were prosecuted.
- Question: what should an engineer do when asked to write a defeat device?

**Boeing 737 MAX**

- MCAS software, relying on a single angle-of-attack sensor, repeatedly pushed the nose down.
- Two crashes (2018, 2019); 346 deaths.
- Pilots were not told about MCAS.
- Question: who owns a safety assumption?

**UK Post Office Horizon**

- Faulty accounting software showed shortfalls at local post offices.
- Over 900 subpostmasters were prosecuted between 1999 and 2015.
- The software was presumed reliable in court.
- Question: who is believed when software and people disagree?

**COMPAS, 2016**

- ProPublica analyzed a criminal risk-scoring tool used in sentencing and bail.
- Found error rates differed by race.
- Researchers showed some fairness definitions can't all hold at once.
- Question: which notion of fairness, chosen by whom?

Each case is short enough for a 15-minute discussion. Pair with Schneider's question about accountability (Ch. 9): who is responsible for an output that comes with no explanation?

## Tools for asking "should we build this?"

- **Stakeholder analysis**: list everyone affected, not just users and customers: bystanders, moderators, future users, people the system makes decisions about.
- **Value sensitive design** (Batya Friedman): identify the human values at stake (privacy, autonomy, fairness) and design for them explicitly.
- **Misuse and abuse cases**: like threat modeling, but for social harms. How could this be used to stalk, harass, discriminate, or manipulate?
- **Dual use**: the same tool can protect or harm (a vulnerability scanner, a face recognizer, a code generator).
- **Speaking up**: raise concerns early and in writing; know your organization's escalation paths; codes of ethics support you.

> **Hoodlet's question.** "What future state of impacts can we anticipate as a result of the stuff that we are building today?"

His example of a net positive: decentralized social networking and social coding. His open question: social media and short-form video.

## Check yourself before reading Chapter 8

1. Name the three properties of the CIA triad, and give a STRIDE threat that violates each.
2. Why does a parameterized query prevent SQL injection when escaping strings by hand often fails?
3. What is the difference between a CVE, a CWE, and a CVSS score?
4. Describe one software supply chain attack and one defense that would have helped.
5. What is the "lethal trifecta" for AI agents, and how does it explain prompt-injection data theft?

## Further reading

- R. Anderson, Security Engineering (3rd ed.), Wiley, 2020 (earlier editions free online).
- A. Shostack, Threat Modeling: Designing for Security, Wiley, 2014.
- M. Howard and S. Lipner, The Security Development Lifecycle, Microsoft Press, 2006.
- M. Dowd, J. McDonald, J. Schuh, The Art of Software Security Assessment, Addison-Wesley, 2006.
- Aleph One, "Smashing the Stack for Fun and Profit," Phrack 49, 1996.
- OWASP Top 10, OWASP Top 10 for LLM Applications; MITRE CWE Top 25.
- NIST SP 800-218, Secure Software Development Framework; CISA, Secure by Design.
- ACM Code of Ethics and Professional Conduct, 2018; Software Engineering Code of Ethics and Professional Practice, 1999.
- B. Friedman and D. G. Hendry, Value Sensitive Design, MIT Press, 2019.
