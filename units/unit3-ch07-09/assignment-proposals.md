# Unit 3 Assignment Proposals (Chapters 7–9)

*Draft proposals for Alex to judge. They are aimed at an upper-division undergraduate SE course. This unit moves from building software to running and defending it: observation in production (Yang), security practice and AI risks (Hoodlet), and the foundations of trustworthy systems (Schneider). Each entry includes the idea, its tie to the interviews, deliverables, a grading sketch, and risks or variants. A comparison and suggested pairing is at the end.*

---

## C1. What Endpoints Do We Even Have? An API Archaeology Project

**Chapters:** Yang (Akita: "people don't know what API endpoints they even have"; traces as retrospective data), Schneider (specifications), Ch. 7 primer (API contracts, OWASP API Top 10).

**The idea.** Students get a running web application with **no API documentation**: an instructor-built service with deliberately undocumented, deprecated, and inconsistent endpoints, or a suitable open-source app. They:

1. Drive the app through its UI and a provided traffic generator, capturing HTTP traffic with a proxy (mitmproxy) or server logs.
2. **Infer the API** from traffic alone: endpoints, methods, parameters, types, status codes. Produce an **OpenAPI** specification.
3. Mine **likely invariants** from the traces, in Daikon style: "`quantity` is always ≥ 1," "`/orders/{id}` returns 404 only if the id was never created." Write at least ten, and classify each as a real requirement, an accident of the test traffic, or a bug.
4. Compare the inferred spec with the source code. Find **shadow** endpoints the traffic never exercised and **zombie** endpoints that should be gone.
5. Check two endpoints for **broken object level authorization**: can user A fetch user B's objects?

**Deliverables.** The inferred OpenAPI spec, the invariant list with classifications, a "gap report" (what observation found vs. missed), and a 2-page reflection on Yang's claim that watching is "the next best thing" to proof.

**Grading sketch.** Accuracy of inferred spec (25%); invariant quality and classification (25%); gap analysis (25%); reflection (25%).

**Why it's good.** Students experience Yang's research problem directly, and learn the limit of observation: you only see what the traffic exercises. Step 5 bridges to Hoodlet.

**Risks and variants.** Building the target app takes the instructor a day; seed it with 3–4 hidden endpoints and one authorization bug. A lighter variant uses public traffic captures and skips the code comparison.

---

## C2. Run It Like You Own It: SLOs, Dashboards, and a Game Day

**Chapters:** Yang (observation, release cadence), Hoodlet (CrowdStrike, blast radius, testing as velocity), Ch. 7 primer (SLIs/SLOs, incidents), Beck (Ch. 11, blameless incident review).

**The idea.** Each team deploys its semester project (or a provided microservice app) to a free-tier cloud or a local Kubernetes/Docker Compose setup, and operates it for two weeks.

1. Define **two SLIs and SLOs**, with error budgets.
2. Instrument with **structured logs, metrics, and traces** (OpenTelemetry), and build one dashboard.
3. Set up a **canary or staged rollout** and an automatic rollback condition.
4. **Game day:** the instructor (or another team) injects failures without warning: a slow dependency, a bad config push, a full disk, a bad deploy. The team must detect, mitigate, and communicate.
5. Write a **blameless postmortem** for each incident.

**Deliverables.** Dashboards (screenshots plus config), SLO documents, the postmortems, and a short essay: *Which failure would your tests never have caught? Which did monitoring catch first?*

**Grading sketch.** Instrumentation and SLO quality (30%); response during the game day (graded on process, not on whether things broke) (30%); postmortems (30%); essay (10%).

**Why it's good.** Most students have never operated software. This makes the ops primer concrete and gives Beck's incident culture a real occasion.

**Risks.** Infrastructure setup can eat a week. Provide a template repository with OpenTelemetry already wired. Keep fault injection humane: announce the window, not the faults.

---

## C3. Threat Model, Then Attack, Then Fix

**Chapters:** Hoodlet (breaker's mindset, secure by design, "would you use it?"), Schneider (policies vs. mechanisms), Ch. 8 primer (STRIDE, OWASP Top 10).

**The idea.** A three-phase security exercise on a deliberately vulnerable application, such as OWASP Juice Shop, DVWA, or an instructor-built app that matches the course's stack:

1. **Threat model** (before touching the app): draw a data flow diagram with trust boundaries, apply STRIDE, and rank threats.
2. **Attack:** in a sandbox, find and exploit at least five vulnerabilities across at least three OWASP categories. For each, record whether the threat model predicted it.
3. **Fix by design:** for two vulnerabilities, fix the *class* rather than the instance (parameterized queries throughout, auto-escaping templates, centralized authorization checks) and add a regression test or a static analysis rule (Semgrep or CodeQL) that would catch reintroduction.

**Deliverables.** The threat model, an exploitation log (reproducible steps), the fixes with tests and rules, and a one-page reflection: *What did the threat model miss, and why?*

**Grading sketch.** Threat model (25%); exploitation breadth and documentation (25%); class-level fixes and rules (35%); reflection (15%).

**Why it's good.** It moves students from the builder's to the breaker's mindset and back, and the "fix the class" requirement ties to secure by design.

**Risks.** Legal and ethical boundaries must be explicit: only the provided sandbox, never real systems. Cover the CFAA briefly. Juice Shop has public walkthroughs; require the threat model and the class-level fixes, which walkthroughs don't provide.

---

## C4. Red-Team an AI Agent

**Chapters:** Hoodlet (prompt injection, agentic browsers, "The Attacker Moves Second," whack-a-mole), Schneider (reference monitors, least privilege, accountability), Yang (evals).

**The idea.** The instructor provides a small LLM agent with tools: for example, an "email assistant" that can read a mailbox, summarize, and send messages, running against a fake mailbox. Hidden in the mailbox is a "secret" (a fake API key). Teams:

1. **Attack:** craft emails or documents that cause the agent to leak the secret, take an unauthorized action, or misreport what it did. Record success rates over repeated trials, since outputs are stochastic.
2. **Defend, round 1:** prompt-level defenses only, such as system prompt rules and input filtering. Re-run all attacks, including those from other teams.
3. **Defend, round 2:** **design-level** defenses: least-privilege tools, human confirmation for sends, separating untrusted content from instructions, or removing one leg of the "lethal trifecta." Re-run.
4. Write an **eval suite**: a fixed set of attack inputs and pass/fail checks that could run in CI.

**Deliverables.** The attack corpus, success rates per defense round (a table), the eval suite, and a 3-page report applying Saltzer–Schroeder principles and Schneider's policy-vs-mechanism distinction to explain why round 2 worked better, or didn't.

**Grading sketch.** Attack creativity and rigor (25%); defense design (30%); eval suite (20%); analysis (25%).

**Why it's good.** It is topical and concrete, and it shows Hoodlet's point directly: prompt patches are whack-a-mole, while architecture changes the odds.

**Risks.** API costs. Use a small local model or a capped key, and a fake mailbox only. Expect noisy, stochastic results; requiring repeated trials is itself a lesson about evaluating non-deterministic systems.

---

## C5. Invariants Everywhere: Assertions, Monitors, and Fuzzing

**Chapters:** Schneider (assertional reasoning, invariants, runtime verification, specification coverage), Groce's Bitcoin fuzzing anecdote (Ch. 9), Zeller (Ch. 5, oracles).

**The idea.** Students take a nontrivial data structure or component (an LRU cache, an interval tree, a bank-transfer module, or a provided buggy B+ tree in homage to Beck) and:

1. Write the **representation invariant** and **pre/postconditions** for each operation, in logic first, then as executable checks.
2. Write a **property-based test** harness (Hypothesis or similar) that runs random operation sequences, with only a crash oracle at first.
3. Measure **code coverage** and **mutation score** with only the crash oracle.
4. Add the invariant checks and postconditions as oracles, plus one **temporal** property monitored across the run ("an evicted key is never returned until re-inserted"). Measure again.
5. Find the seeded bugs. Report which oracle caught each.

**Deliverables.** The specification (logic and code), the harness, a table of coverage and mutation scores before and after, and a 2-page reflection on Schneider's "how much of the specification has been exercised."

**Grading sketch.** Specification quality, including correctly negated conditions and quantifiers (30%); harness (20%); measurements (25%); reflection (25%).

**Why it's good.** It is the clearest possible demonstration of Groce's point: same inputs, same coverage, many more bugs found once the oracle encodes the spec. It also exercises the logic skills Schneider says students lack.

**Variants.** Use Dafny for one operation to compare proof with testing; Beck (Ch. 11) and Groce both mention LLMs now helping with invariants.

---

## C6. Write the Laws: Policies, Mechanisms, and What Can Be Enforced

**Chapters:** Schneider ("laws of security," reference monitors enforce only safety properties, hyperproperties), Hoodlet (same-origin policy, process isolation), Yang (information flow beyond the language boundary).

**The idea.** A more theoretical written assignment, done in pairs.

1. Pick six real security policies from different systems: for example, browser same-origin policy, "no one may approve their own expense report," Unix file permissions, "a patient's record may not influence another patient's displayed data," "every request is logged within 5 seconds," and "an account locks after 5 failed logins."
2. For each, classify it as a **safety property**, a **liveness property**, or a **hyperproperty**, with a one-paragraph justification.
3. For each, name a **mechanism** that enforces it in practice, and say whether that mechanism is a reference monitor, a static check, a type system, or something else.
4. Find one policy in the list (or add one) that **no reference monitor can enforce**, and explain what is used instead.
5. Build a 3×3 "periodic table" fragment: policy classes vs. mechanism classes, marking which cells are possible.

**Deliverables.** A 6–8 page paper with the table.

**Grading sketch.** Classification correctness (35%); mechanism analysis (25%); the unenforceable policy (20%); table and writing (20%).

**Why it's good.** It gives students Schneider's way of thinking ("What are the classes of policies, mechanisms, and attacks, and how do they relate?") in a form they can actually do, and connects it to the security they have just practiced in C3 or C4.

---

## C7. Technical Inflation Audit

**Chapters:** Hoodlet (technical inflation, post-quantum cryptography, Tacoma Narrows), Schneider (assumptions behind trustworthiness), Shaw (Ch. 10, mission creep, if taught later).

**The idea.** Each student picks a real system at least ten years old: their university's ID card system, a home router, a building's door locks, a library, a medical device's public documentation, or an open-source project's authentication code.

1. Reconstruct the system's **original threat model**: who did designers assume attackers were, and what could they do?
2. Identify **three assumptions that have inflated away**: cheaper hardware, leaked datasets, new tools (software-defined radio, GPUs, LLMs, voice cloning), or new connectivity.
3. For each, assess current risk and propose a fix that anticipates the *next* inflation.
4. Predict one inflation that LLMs will cause in the next five years.

**Deliverables.** A 5-page report, with sources. No active testing of real systems: research only.

**Grading sketch.** Threat model reconstruction (25%); quality of the three inflations (35%); fixes (20%); the LLM prediction (20%).

**Why it's good.** It is cheap to run and makes Hoodlet's original concept the lens. Students often find their own campus systems are good examples.

---

## C8. The Demo Is Not the Product

**Chapters:** Yang (AI demos that can't ship; "what people want is not what they need"), Hoodlet (vibe coding, skill attrition), Schneider (AI as an assurance problem), Beck (Ch. 11, the genie).

**The idea.** A two-week experiment in pairs.

1. **Week 1, demo:** use AI coding tools freely ("vibe coding") to build a working demo of a small app from a one-paragraph prompt, as fast as possible. Record time spent and every prompt.
2. **Week 2, product:** the instructor issues a realistic change list: three new requirements, one data migration, a security review finding, and an accessibility requirement. Implement the changes. Separately, write tests, a threat model, and a short maintainability assessment of the week-1 code.
3. Measure: time per change, defects found by the tests and review, and how often the AI-generated week-1 code had to be rewritten rather than modified.

**Deliverables.** Both versions of the code (tagged), the prompt log, the measurements, and a 3-page essay: *Was Yang right? What would you require before a demo becomes a product?*

**Grading sketch.** Completion of the change list (30%); quality of tests and review (25%); honesty and quality of measurements (20%); essay (25%).

**Why it's good.** It turns the unit's main AI argument into an experiment students run on themselves. The result is not predetermined: some pairs will find the AI code adapted well, and that is a valid finding if documented.

**Risks.** Make sure every student has access to the same AI tool. Grade the analysis, not whether the demo "survived."

---

## Comparison and a suggested pairing

| | Technical depth | Setup cost for instructor | Reflection / writing | Novelty for students |
|---|---|---|---|---|
| C1 API archaeology | Medium | Medium (target app) | Medium | High |
| C2 Run it / game day | High | Medium–High (infrastructure) | Medium | High |
| C3 Threat model, attack, fix | Medium–High | Low (Juice Shop) | Medium | High |
| C4 Red-team an AI agent | Medium | Medium (agent, API budget) | Medium–High | Very high |
| C5 Invariants everywhere | High | Low–Medium (seeded bugs) | Medium | Medium–High |
| C6 Policies and mechanisms | Low (theoretical) | Low | High | High |
| C7 Technical inflation audit | Low | Low | High | High |
| C8 Demo vs. product | Medium | Low | High | High |

**Suggested pairing.** **C3 + C6** gives a practice-then-foundations security pair that mirrors the Hoodlet → Schneider chapter order. **C5** is the best single assignment if the course is testing-oriented, since it puts Groce's own fuzzing observation and Schneider's specification coverage into practice. **C4** is the most topical and will likely be the most memorable for students, but needs the most care to run; **C8** covers similar ground more cheaply. **C2** is ambitious but valuable if the course has a semester project already deployed.
