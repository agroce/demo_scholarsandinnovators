# Coverage Map: Standard SE Topics Across the Twelve Primers

Each chapter has a **primer** (pre-reading slides plus a Markdown reading version) that teaches **one major standard software engineering topic** in depth, plus a **shorter history or side topic**. Topics are assigned to the interview where they matter most, so students arrive able to follow and evaluate the interviewee.

Knowledge areas are loosely based on the IEEE *SWEBOK* (v4, 2024).

## Assignments

| Ch | Interviewee | Major topic (in depth) | Shorter topic / history | Why here |
|---|---|---|---|---|
| 1 | Ball | **Verification & validation landscape**: testing, static analysis, model checking, proof; soundness; the assurance spectrum | History of verification; famous failures (Therac-25, Ariane 5, Knight Capital, Heartbleed) | Ball moves among all four families; SLAM combined them |
| 2 | Krishnamurthi | **Software process models**: SAGE, Royce (with the loops), V-model, spiral, iterative and incremental, Agile Manifesto, XP/Scrum/Kanban survey, DevOps, Boehm–Turner | **PL ↔ SE**: how SE problems became language features | Krishnamurthi re-derives the waterfall; PL as "material science" |
| 3 | Liskov | **Modularity & abstraction**: Parnas and KWIC, coupling and cohesion, specifications, encapsulation and leaks, inheritance vs. composition, SOLID | History of modularity; Conway's law | Data abstraction; "modularity is all there is" |
| 4 | Holzmann | **Requirements & the economics of defects**: RE activities, functional vs. NFRs, good requirements (EARS), user stories, JPL failures, cost-to-fix curve and its critics, inspections, safety standards | **Project management & estimation** (Brooks's law, cone of uncertainty, COCOMO, story points, CHAOS critique); LTL refresher | Defect-phase metrics; "it's not just programming" |
| 5 | Zeller | **Testing & debugging fundamentals**: levels, black/white-box design, coverage and MC/DC, mutation, oracles, test generation, flakiness, TRAFFIC, scientific debugging | **Version control** history, SCCS → Git | Delta debugging; unit tests and VCS as the biggest advances |
| 6 | Kernighan | **Construction & evolution**: readability and style, code review (Fagan → modern), maintenance types, Lehman's laws, refactoring, technical debt, legacy code | **Unix philosophy** and software tools | *Elements of Style*, *Practice of Programming*, AWK |
| 7 | Yang | **Software in production**: operations, DevOps/SRE, observability (logs, metrics, traces), SLOs, incident response, cloud/SaaS/microservices | **APIs as contracts**: REST/OpenAPI, versioning, breaking changes; information-flow security in one slide | Akita: watching API traffic; "observation" when you can't prove |
| 8 | Hoodlet | **Secure software development**: vulnerabilities (OWASP Top 10, CWE/CVE), threat modeling (STRIDE), secure SDLC and DevSecOps, supply-chain security, disclosure and bug bounties, AI-specific risks (prompt injection) | **Ethics & social impact**: ACM Code of Ethics, responsibility at scale | AppSec practitioner; his "what didn't I ask" was social impact |
| 9 | Schneider | **Dependability & security foundations**: dependability attributes and the fault/error/failure chain, fault tolerance and replication (state machine approach), security policies vs. mechanisms, Saltzer–Schroeder principles, reference monitors, information flow | **Assertional reasoning & runtime verification**: invariants, safety/liveness (Alpern–Schneider) | "How to build trustworthy systems": formal methods + fault tolerance + security |
| 10 | Shaw | **Software architecture**: styles (pipe-and-filter, layered, event-based, repository, client-server/services), quality attributes and tactics, views, ADLs and ADRs, architectural erosion | **Is SE engineering?** Shaw's maturation model; NATO 1968; professionalism, licensing, liability | Shaw and Garlan founded the field of software architecture |
| 11 | Beck | **XP and the human side of software**: XP values and practices, TDD in depth, pairing, small releases, "Tidy First" (structure vs. behavior changes), psychological safety, blameless post-mortems | Explore/Expand/Extract; software-design economics (options, coupling) | Creator of XP, SUnit/JUnit, TDD |
| 12 | Jackson | **Software design & specification**: problem vs. solution, domain modeling, conceptual models and usability (Norman), concept design, relational modeling, lightweight formal methods (Alloy, TLA+) | History of formal specification: VDM, Z, B, Alloy, TLA+ | Alloy; *The Essence of Software* |

## SWEBOK knowledge areas → where covered

| Knowledge area | Primary | Also |
|---|---|---|
| Requirements | 4 | 12 (problem framing), 7 (PRDs) |
| Architecture | 10 | 3, 7 |
| Design | 12 | 3, 11 |
| Construction | 6 | 11 |
| Testing | 5 | 1, 11 |
| Operations | 7 | 2 (DevOps survey) |
| Maintenance & evolution | 6 | 11 (Tidy First) |
| Configuration management | 5 (VCS) | 2 (CI/CD), 7 |
| Engineering management | 4 (estimation, Brooks) | 11 (teams), 2 |
| Process | 2 | 11, 4 (metrics) |
| Models & methods (formal) | 12 | 1, 4, 9 |
| Quality | 1 | 4 (defects), 5 |
| Security | 8 (practice) | 9 (foundations), 7 (info flow) |
| Professional practice & ethics | 8 | 10 (engineering, liability) |
| Economics | 4 | 10, 11 |
| Computing / math foundations | 9 (logic, invariants) | 4 (LTL), 2 (PL) |

## Overlaps, on purpose

- **Process** is surveyed historically in Ch. 2, practiced in depth in Ch. 11 (XP/TDD), and operationalized in Ch. 7 (DevOps). Each primer points to the others.
- **Security** goes from practice (Ch. 8, Hoodlet) to foundations (Ch. 9, Schneider). This follows the book's order and works well pedagogically: concrete before abstract.
- **Design** appears three times at different scales: modules (Ch. 3), architecture (Ch. 10), and concepts and specification (Ch. 12). The last chapter becomes a capstone.
- **Krishnamurthi's design question** was asked of almost every interviewee, so it threads through the whole book. The Ch. 10 and Ch. 12 primers give students the vocabulary to compare answers.

## Gaps and thin spots

- **Human–computer interaction and usability**: only Jackson's concept design and Norman's conceptual models (Ch. 12), plus Yang on design practice. A short UX supplement might be worth adding.
- **Data-intensive and ML-enabled systems** (SE for ML, MLOps, evals): touched on in Ch. 7 (Yang on evals) only.
- **Project management**: covered in Ch. 4's shorter topic. Almost no interviewee treats it as a primary concern, which is itself worth pointing out to students.
