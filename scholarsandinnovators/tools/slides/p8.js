// Primer for Chapter 8 (Hoodlet): secure software development; ethics and social impact
const dfd = {
  boxes: [
    { id: "tb", x: 3.6, y: 1.45, w: 5.85, h: 3.85, text: "", style: "ghost" },
    { id: "tbl", x: 3.75, y: 1.5, w: 5.6, h: 0.45, text: "Trust boundary: systems you control", style: "note", fs: 13, align: "left" },
    { id: "u", x: 0.4, y: 2.9, w: 2.3, h: 1.0, text: "User's browser (untrusted)", style: "light", fs: 14 },
    { id: "w", x: 4.0, y: 2.9, w: 2.1, h: 1.0, text: "Web application", style: "primary", fs: 14 },
    { id: "d", x: 7.05, y: 2.9, w: 2.1, h: 1.0, text: "Database", style: "teal", fs: 14 },
    { id: "a", x: 4.0, y: 4.35, w: 2.1, h: 0.75, text: "Admin console", style: "light", fs: 13 },
    { id: "p", x: 10.5, y: 2.9, w: 2.35, h: 1.0, text: "Third-party payment API", style: "light", fs: 14 },
    { id: "lg", x: 0.4, y: 5.4, w: 12.45, h: 0.5, text: "**1** Spoofing? Tampering?     **2** Injection? Information disclosure?     **3** Repudiation? Secrets exposed in transit?     **4** Elevation of privilege?", style: "note", fs: 12, align: "left" },
  ],
  arrows: [
    { from: "u", to: "w", label: "1" },
    { from: "w", to: "d", label: "2" },
    { from: "w", to: "p", fromSide: "t", toSide: "t", via: [[5.05, 2.45], [11.675, 2.45]], label: "3" },
    { from: "a", to: "w", fromSide: "t", toSide: "b", label: "4", lx: 0.25, ly: 0.2 },
  ],
};
const sdl = { boxes: [], arrows: [] };
[["Requirements", "security and privacy requirements; abuse cases"], ["Design", "threat model; secure defaults"], ["Implementation", "safe languages and libraries; code review; static analysis"], ["Verification", "fuzzing; dynamic scans; penetration testing"], ["Release", "dependency audit; incident response plan"], ["Response", "patch, disclose, learn"]].forEach(([h, b], i) => {
  sdl.boxes.push({ id: "s" + i, x: 0.5 + i * 2.1, y: 1.75, w: 1.85, h: 0.75, text: h, style: i === 1 ? "accent" : "primary", fs: 14 });
  sdl.boxes.push({ id: "b" + i, x: 0.5 + i * 2.1, y: 2.65, w: 1.85, h: 1.7, text: b, style: "ghost", fs: 12 });
  if (i) sdl.arrows.push({ from: "s" + (i - 1), to: "s" + i });
});
sdl.arrows.push({ from: "b5", to: "b0", fromSide: "b", toSide: "b", via: [[11.925, 4.85], [1.425, 4.85]], dashed: true, color: "verm", label: "lessons from incidents feed the next cycle", lx: 0, ly: 0.4 });

module.exports = {
  num: 8, name: "Hoodlet",
  title: "Secure Software Development",
  subtitle: "Vulnerabilities, threat modeling, the secure development lifecycle, supply chains, disclosure, and AI-specific risks, plus professional ethics",
  covers: [
    "**Main topic: building software that resists attack.** Security goals and vocabulary; a short history of software security; the OWASP Top 10 and common weakness classes; injection and memory safety; CVE, CWE, and CVSS; threat modeling with STRIDE; the secure development lifecycle and DevSecOps; software supply chain security; vulnerability disclosure and bug bounties; security risks of LLM-based systems.",
    "**Shorter topic: professional ethics and social impact.** Codes of ethics for software engineers; four case studies; tools for asking \"should we build this?\"",
  ],
  why: "Hoodlet is a practitioner. He refers casually to buffer overflows, SSRF, RCE, CodeQL, fuzzing, sanitizers, npm worms, prompt injection, and the same-origin policy, and he assumes you know why security is \"a feature that people expect by default.\" This primer gives you that vocabulary. Chapter 9 (Schneider) then provides the foundations underneath it: policies, mechanisms, and what can and can't be enforced. Hoodlet's \"what should I have asked\" was about social impact, so the primer closes with ethics.",
  slides: [
    { type: "section", kicker: "PART 1", title: "Secure software development", subtitle: "Building for a world with an intelligent adversary" },
    {
      type: "text", title: "Security goals and vocabulary",
      body: [
        "Classic security goals (the **CIA triad**):",
        "- **Confidentiality**: information is disclosed only to those authorized.",
        "- **Integrity**: information and systems are modified only in authorized ways.",
        "- **Availability**: the system is usable when needed.",
        "Often added: **authentication** (who are you?), **authorization** (what may you do?), and **accountability** (who did what, provably?).",
        "- A **vulnerability** is a weakness that can be exploited. A **threat** is a potential attacker or event. An **exploit** is a concrete way to use a vulnerability. **Risk** combines likelihood and impact.",
        "- The **attack surface** is every point where an attacker can supply input or reach the system.",
      ],
      callout: { label: "Why security differs from reliability", text: "Testing for reliability asks what inputs _happen_. Security must consider what inputs an intelligent adversary can _choose_, and attackers search for exactly the cases you didn't test. Hoodlet: development is \"a builder's mentality\"; security is \"a breaker's mindset.\"" },
    },
    {
      type: "timeline", title: "Software security history, part 1",
      events: [["1988", "Morris worm", "buffer overflow in fingerd; thousands of hosts"], ["1995", "First bug bounty", "Netscape's \"Bugs Bounty\""], ["1996", "\"Smashing the Stack\"", "Aleph One, Phrack"], ["1999", "CVE list launched", "MITRE: one name per vulnerability"], ["2001", "Code Red, Nimda", "worms hit IIS servers"], ["2002", "Trustworthy Computing", "Bill Gates memo", true], ["2004", "Microsoft SDL", "security in every phase"]],
    },
    {
      type: "timeline", title: "Software security history, part 2",
      events: [["2013", "Microsoft bounties", "Katie Moussouris"], ["2014", "Heartbleed", "OpenSSL bounds-check bug"], ["2017", "Equifax", "unpatched Apache Struts; 147M people"], ["2020", "SolarWinds", "backdoored build pipeline", true], ["2021", "Log4Shell", "RCE in a ubiquitous library"], ["2024", "xz backdoor", "multi-year social engineering"], ["2025", "AIxCC finals", "AI finds and patches bugs"]],
    },
    {
      type: "compare", title: "The OWASP Top 10 (2021 edition)",
      intro: "The Open Worldwide Application Security Project publishes a ranked list of web application risk categories, based on industry data. A 2025 edition has followed; check owasp.org for the current list.",
      cols: [
        { head: "1–5", items: ["**A01 Broken access control**: users act outside their permissions", "**A02 Cryptographic failures**: weak or missing encryption", "**A03 Injection**: SQL, OS command, and cross-site scripting (XSS)", "**A04 Insecure design**: flaws no implementation can fix", "**A05 Security misconfiguration**: defaults, open storage, verbose errors"] },
        { head: "6–10", items: ["**A06 Vulnerable and outdated components**: known-bad dependencies", "**A07 Identification and authentication failures**", "**A08 Software and data integrity failures**: unverified updates, insecure CI/CD", "**A09 Logging and monitoring failures**", "**A10 Server-side request forgery (SSRF)**"] },
      ],
      notes: "Point out that A04 (insecure design) entered in 2021, recognizing that security can't be bolted on afterwards. OWASP also publishes an API Security Top 10 (Ch. 7 primer) and a Top 10 for LLM Applications.",
    },
    {
      type: "text", title: "Injection: mixing data and code",
      body: [
        "Injection happens when untrusted data is interpreted as code by some interpreter: a SQL engine, a shell, a browser.",
        "`query = \"SELECT * FROM users WHERE name = '\" + name + \"'\"`",
        "If `name` is `x' OR '1'='1`, the query returns every user. The fix is to keep data and code separate with a **parameterized query**:",
        "`db.execute(\"SELECT * FROM users WHERE name = ?\", [name])`",
        "- **Cross-site scripting (XSS)** is injection into HTML: user content containing `<script>` runs in other users' browsers. Fix: context-aware output encoding, templating that escapes by default, Content Security Policy.",
        "- **OS command injection**: passing user input to a shell. Fix: call programs with argument lists, never strings.",
      ],
      callout: { label: "The general lesson", text: "Whole vulnerability classes disappear when the API makes the safe thing the default (parameterized queries, auto-escaping templates). That is **secure by design**.\n\n**Prompt injection** (below) is the same problem for LLMs, but with no reliable way to separate instructions from data." },
    },
    {
      type: "text", title: "Memory safety",
      body: [
        "C and C++ let a program read or write any address. Bugs in bounds checking or object lifetimes become **memory corruption**:",
        "- **Buffer overflow**: writing past the end of an array (the Morris worm, 1988).",
        "- **Use-after-free**: using memory after it has been released and reused.",
        "- **Out-of-bounds read**: Heartbleed (2014) returned up to 64 KB of server memory, including private keys.",
        "Microsoft and Google's Chromium team have each reported that roughly **70%** of their serious security bugs are memory safety issues. Since 2022–23, the NSA and CISA have urged moving to **memory-safe languages** (Rust, Go, Java, C#, Swift, Python).",
        "For existing C and C++: **sanitizers**, **fuzzing**, hardened allocators, and mitigations such as stack canaries, non-executable memory, and address space layout randomization (ASLR).",
      ],
      callout: { label: "In the book", text: "**Hoodlet** (Ch. 8): memory safety bugs are \"on the extinction list.\"\n**Schneider** (Ch. 9): \"The fact that people still use C, I don't understand.\"\n**Kernighan** (Ch. 6): C gives you no help." },
    },
    {
      type: "compare", title: "Naming and scoring vulnerabilities",
      cols: [
        { head: "CVE", items: ["**Common Vulnerabilities and Exposures** (MITRE, 1999)", "An identifier for one specific vulnerability in one product, such as CVE-2021-44228 (Log4Shell).", "Lets vendors, scanners, and advisories refer to the same bug."] },
        { head: "CWE", items: ["**Common Weakness Enumeration**", "A catalog of weakness _types_: CWE-79 (XSS), CWE-89 (SQL injection), CWE-787 (out-of-bounds write).", "MITRE publishes a yearly \"Top 25 Most Dangerous\" list."] },
        { head: "CVSS", items: ["**Common Vulnerability Scoring System**", "A 0–10 severity score from attack vector, complexity, privileges required, user interaction, and impact.", "Useful for triage, but severity is not risk: context matters."] },
      ],
    },
    {
      type: "compare", title: "Threat modeling with STRIDE",
      intro: "Adam Shostack's four questions: **What are we working on? What can go wrong? What are we going to do about it? Did we do a good job?** STRIDE (Microsoft, 1999) is a checklist for the second question. Each threat violates one security property.",
      cols: [
        { head: "S, T, R", items: ["**Spoofing** identity → violates _authentication_", "**Tampering** with data or code → violates _integrity_", "**Repudiation**: denying an action with no proof → violates _accountability_"] },
        { head: "I, D, E", items: ["**Information disclosure** → violates _confidentiality_", "**Denial of service** → violates _availability_", "**Elevation of privilege** → violates _authorization_"] },
      ],
    },
    { type: "diagram", title: "A data flow diagram with a trust boundary", ...dfd, caption: "Threat modeling starts from a **data flow diagram**: processes, data stores, external entities, and flows. Every flow that crosses a **trust boundary** gets STRIDE questions. Hoodlet's \"technical inflation\" is a reminder to revisit the model's assumptions as attackers' capabilities change.", mdDiagram: "[User's browser] --(Spoofing? Tampering?)--> | Web application --(Injection? Disclosure?)--> Database |\n                                             |   Admin console (Elevation of privilege?)            |\n                     trust boundary ---------+---(Repudiation? Secrets in transit?)--> [Third-party payment API]" },
    { type: "diagram", title: "A secure development lifecycle", ...sdl, caption: "Microsoft's Security Development Lifecycle (SDL, 2004) made security an activity in every phase, after the Trustworthy Computing memo. OWASP SAMM and NIST's Secure Software Development Framework (SSDF, SP 800-218) describe similar practices. Note that **design**, where the threat model lives, is where the cheapest fixes are.", mdDiagram: "Requirements → Design (threat model) → Implementation → Verification → Release → Response\n     ↑__________________ lessons from incidents feed the next cycle ________________|" },
    {
      type: "text", title: "DevSecOps: security in the pipeline",
      body: [
        "**DevSecOps** puts security checks into the same automated pipeline as tests (Ch. 7 primer), so problems are found minutes after they're written. This is often called **shifting left**.",
        "- **SAST** (static application security testing): analyze source code, as with CodeQL or Semgrep.",
        "- **SCA** (software composition analysis): find dependencies with known CVEs.",
        "- **Secret scanning**: catch API keys and passwords before they're committed.",
        "- **DAST** (dynamic testing) and **fuzzing**: attack the running program.",
        "- **Policy as code**: required reviews, signed commits, protected branches.",
        "The risk is **alert fatigue**: tools that report thousands of low-value findings get ignored. Tuning, triage, and fixing whole bug classes matter more than tool count.",
      ],
      callout: { label: "In Chapter 8", text: "Hoodlet: \"if your testing is robust, your ability to make security updates quickly and easily without breaking things is going to be that much faster.\"\n\nThe **security poverty line**: big firms have tools _and_ the process to use them; many startups have neither." },
    },
    {
      type: "text", title: "Software supply chain security",
      body: [
        "A typical application is mostly other people's code: Hoodlet estimates 80–90% open source. Attacks now target that chain:",
        "- **Compromised dependencies**: malicious or hijacked packages, typosquatting, and self-spreading npm worms.",
        "- **Compromised builds**: SolarWinds (2020) shipped a backdoor inserted in its build system to thousands of customers.",
        "- **Compromised maintainers**: in the **xz** case (2024), a contributor spent about two years earning trust before inserting a backdoor aimed at SSH. Andres Freund caught it after noticing logins taking about half a second too long.",
        "Defenses: pinned and reviewed dependencies, **SBOMs** (software bills of materials), signed artifacts (Sigstore), reproducible builds, and build-integrity levels such as **SLSA**.",
      ],
      callout: { label: "Log4Shell (2021)", text: "A single feature in the Java logging library Log4j allowed remote code execution through a logged string. Because Log4j was buried deep in dependency trees, many organizations spent weeks just finding out whether they used it. That is the problem SBOMs are meant to solve." },
    },
    {
      type: "text", title: "Disclosure, bounties, and the security community",
      body: [
        "When a researcher finds a vulnerability, who learns about it, and when?",
        "- **Full disclosure**: publish immediately, which pressures vendors but arms attackers.",
        "- **Coordinated disclosure**: report privately, give the vendor time to fix (Google Project Zero's standard is 90 days), then publish.",
        "- **Bug bounties** pay for reports through an agreed channel. Netscape offered one in 1995; Microsoft's programs, launched in 2013 under Katie Moussouris, helped make bounties mainstream. Platforms now run programs for thousands of organizations.",
        "Researchers such as Tavis Ormandy (Project Zero) and Mark Dowd (co-author of _The Art of Software Security Assessment_), both named by Hoodlet, made vulnerability research a discipline.",
      ],
      callout: { label: "Legal note", text: "Testing systems you don't own without permission can be illegal (in the U.S., the Computer Fraud and Abuse Act). Bounty programs and \"safe harbor\" policies define what is authorized. Hoodlet's teenage Battle.net exploits would not be a good career move today." },
    },
    {
      type: "text", title: "New risks: LLMs and agents",
      body: [
        "LLM-based systems add risks that traditional AppSec doesn't cover (see the OWASP Top 10 for LLM Applications):",
        "- **Prompt injection**: instructions hidden in content the model reads override its instructions. **Indirect** injection arrives through web pages, emails, or documents, not from the user.",
        "- **Excessive agency**: an agent with tools (browsing, email, code execution) can be steered into using them for an attacker.",
        "- **Insecure output handling**: treating model output as trusted code or commands.",
        "- **Generated vulnerabilities**: AI-written code that \"works\" but is insecure, accepted by developers who can't judge it.",
        "Simon Willison's **\"lethal trifecta\"**: an agent with access to private data, exposure to untrusted content, and a way to communicate externally can be made to exfiltrate data. Remove any one of the three.",
      ],
      callout: { label: "Hoodlet's audit", text: "An agentic browser read a prompt-injected page in one tab and leaked a wallet recovery key from another: all three parts of the trifecta at once. Hardening the system prompt is \"whack-a-mole.\"" },
    },
    { type: "section", kicker: "PART 2", title: "Ethics and social impact", subtitle: "\"What are the actual impacts of the things that we're building?\"" },
    {
      type: "text", title: "Codes of ethics for software engineers",
      body: [
        "Other engineering disciplines have codes of ethics and, often, licensing. Software has codes, but rarely licensing (see the Chapter 10 primer).",
        "The **ACM Code of Ethics and Professional Conduct** (2018) begins with general principles:",
        "- Contribute to society and to human well-being, acknowledging that all people are stakeholders in computing.",
        "- Avoid harm.",
        "- Be honest and trustworthy; be fair and take action not to discriminate; respect privacy; honor confidentiality.",
        "The **Software Engineering Code of Ethics** (ACM/IEEE-CS, 1999) has eight principles, ordered by obligation: **Public**, Client and Employer, Product, Judgment, Management, Profession, Colleagues, Self. The first: \"Software engineers shall act consistently with the public interest.\"",
      ],
      callout: { label: "Scale changes ethics", text: "Hoodlet, via Schellmann's _The Algorithm_: one biased manager affects a few people; a biased system affects millions. A small defect in a widely deployed product (CrowdStrike, 2024) is a large harm." },
    },
    {
      type: "compare", title: "Four case studies",
      cols: [
        { head: "Volkswagen, 2015", items: ["Engine software detected emissions tests and ran cleaner only during them.", "About 11 million cars worldwide.", "Engineers were prosecuted.", "Question: what should an engineer do when asked to write a defeat device?"] },
        { head: "Boeing 737 MAX", items: ["MCAS software, relying on a single angle-of-attack sensor, repeatedly pushed the nose down.", "Two crashes (2018, 2019); 346 deaths.", "Pilots were not told about MCAS.", "Question: who owns a safety assumption?"] },
        { head: "UK Post Office Horizon", items: ["Faulty accounting software showed shortfalls at local post offices.", "Over 900 subpostmasters were prosecuted between 1999 and 2015.", "The software was presumed reliable in court.", "Question: who is believed when software and people disagree?"] },
        { head: "COMPAS, 2016", items: ["ProPublica analyzed a criminal risk-scoring tool used in sentencing and bail.", "Found error rates differed by race.", "Researchers showed some fairness definitions can't all hold at once.", "Question: which notion of fairness, chosen by whom?"] },
      ],
      notes: "Each case is short enough for a 15-minute discussion. Pair with Schneider's question about accountability (Ch. 9): who is responsible for an output that comes with no explanation?",
    },
    {
      type: "text", title: "Tools for asking \"should we build this?\"",
      body: [
        "- **Stakeholder analysis**: list everyone affected, not just users and customers: bystanders, moderators, future users, people the system makes decisions about.",
        "- **Value sensitive design** (Batya Friedman): identify the human values at stake (privacy, autonomy, fairness) and design for them explicitly.",
        "- **Misuse and abuse cases**: like threat modeling, but for social harms. How could this be used to stalk, harass, discriminate, or manipulate?",
        "- **Dual use**: the same tool can protect or harm (a vulnerability scanner, a face recognizer, a code generator).",
        "- **Speaking up**: raise concerns early and in writing; know your organization's escalation paths; codes of ethics support you.",
      ],
      callout: { label: "Hoodlet's question", text: "\"What future state of impacts can we anticipate as a result of the stuff that we are building today?\"\n\nHis example of a net positive: decentralized social networking and social coding. His open question: social media and short-form video." },
    },
    {
      type: "check", title: "Check yourself before reading Chapter 8",
      questions: [
        "Name the three properties of the CIA triad, and give a STRIDE threat that violates each.",
        "Why does a parameterized query prevent SQL injection when escaping strings by hand often fails?",
        "What is the difference between a CVE, a CWE, and a CVSS score?",
        "Describe one software supply chain attack and one defense that would have helped.",
        "What is the \"lethal trifecta\" for AI agents, and how does it explain prompt-injection data theft?",
      ],
    },
    {
      type: "reading", title: "Further reading",
      items: [
        "R. Anderson, Security Engineering (3rd ed.), Wiley, 2020 (earlier editions free online).",
        "A. Shostack, Threat Modeling: Designing for Security, Wiley, 2014.",
        "M. Howard and S. Lipner, The Security Development Lifecycle, Microsoft Press, 2006.",
        "M. Dowd, J. McDonald, J. Schuh, The Art of Software Security Assessment, Addison-Wesley, 2006.",
        "Aleph One, \"Smashing the Stack for Fun and Profit,\" Phrack 49, 1996.",
        "OWASP Top 10, OWASP Top 10 for LLM Applications; MITRE CWE Top 25.",
        "NIST SP 800-218, Secure Software Development Framework; CISA, Secure by Design.",
        "ACM Code of Ethics and Professional Conduct, 2018; Software Engineering Code of Ethics and Professional Practice, 1999.",
        "B. Friedman and D. G. Hendry, Value Sensitive Design, MIT Press, 2019.",
      ],
    },
  ],
};
