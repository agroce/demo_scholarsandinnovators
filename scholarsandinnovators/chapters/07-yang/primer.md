# Primer for Chapter 7 (Yang): Software in Production

*Operations, DevOps and SRE, observability, reliability targets, incidents, plus APIs as contracts*

*Pre-reading for* Scholars & Innovators in Modern Programming*, to be read before the Yang interview.*

## What this primer covers, and why

**Main topic: what happens after the code ships.** Why running software is its own discipline; the shift from boxed releases to cloud services; DevOps and continuous delivery; deployment strategies; monoliths and microservices; observability (logs, metrics, traces); SLIs, SLOs, and error budgets; incident response; famous outages; resilience and chaos engineering; measuring delivery performance.

**Shorter topic: APIs as contracts.** What an API promises; REST and OpenAPI; breaking vs. non-breaking changes and semantic versioning; Postel's and Hyrum's laws; API inventories and API security; and information flow in one slide.

> **Why read this first.** Yang's career runs from proving properties of software to **watching** it run. Akita observed API traffic in production, and her next interests are AI observability and evals. To follow her, you need the vocabulary of operations: what a trace is, why "we don't know what endpoints we have" is a real problem, and why she argues that observation becomes essential when systems have emergent behavior. This primer also covers the DevOps material that the Chapter 2 primer only surveys.

---

# Software in production

*Most of a system's life happens after release*

## Why production is its own discipline

Classic SE textbooks end at "deployment" and "maintenance." For a networked service, release is the _start_. The software runs continuously, on machines you manage, for users you never meet, under load you didn't test.

- **The environment is real**: real data, real traffic spikes, failing disks and networks, dependencies that change under you.
- **Failures are visible and costly**: downtime costs money and trust, and can harm people (Hoodlet, Ch. 8, on the CrowdStrike outage).
- **Every change is a risk**: most outages are triggered by a change (a deploy, a configuration push, a certificate expiring).
- **You can learn from production**: logs, metrics, and traces show what users actually do, which tests never fully capture.
Werner Vogels (Amazon CTO, 2006) summarized the cultural answer: **"You build it, you run it."** The team that writes a service also operates it and is paged when it fails.

> **Connection to Chapter 7.** Yang's move from verification to observation is a move into this world: "if you can't prove guarantees about your system, I think the next best thing is watching the system."

Vogels's quote is from an interview with Jim Gray in ACM Queue, 2006. Useful framing: testing samples behavior before release; observability samples it after. Both are partial.

## From shrink-wrap to services

- **1990s** — Boxed releases: ship a CD every year or two
- **1999** — Salesforce: an early SaaS business
- **2003** — Google SRE: Ben Treynor Sloss's team
- **2006** — Amazon Web Services: S3, EC2: rent machines by the hour
- **2009** — "10+ deploys per day": Flickr; first DevOpsDays
- **2013–14** — Docker; Kubernetes: containers and orchestration
- **2016** — Site Reliability Engineering: Google's SRE book

## DevOps and continuous delivery

**DevOps** (the name comes from Patrick Debois's 2009 DevOpsDays) is a culture and set of practices that merge development and operations, so that changes flow to users quickly and safely.

- **Continuous integration (CI)**: every change is merged to the main line and automatically built and tested, many times a day.
- **Continuous delivery (CD)**: every change that passes the pipeline is _releasable_ at the push of a button. **Continuous deployment** goes further: it is released automatically.
- **Infrastructure as code**: servers, networks, and configuration are defined in version-controlled files, reviewed and tested like code.
- **Trunk-based development** and **feature flags**: integrate unfinished work behind a switch instead of on long-lived branches.
**Site Reliability Engineering (SRE)** is Google's version: operations done by software engineers, with reliability managed by explicit targets (below).

> **In the book.** **Hoodlet** (Ch. 8): "if your testing is robust, your ability to make security updates quickly and easily without breaking things is going to be that much faster."

**Yang** (Ch. 7): Postman went from quarterly launches to "daily demos, weekly product feature updates."

Humble and Farley's Continuous Delivery (2010) and the DevOps Handbook (Kim, Humble, Debois, Willis, 2016) are the standard references. Hoodlet names both as books that changed how software is delivered.

## A deployment pipeline with a canary

```
Commit → Build → Automated tests → Staging → Canary (1–5% of users) → Full production
                                              ↘ monitoring ↙
                    bad signal: roll back, fix, recommit
```

Each stage is an automated gate. A **canary** release sends a small fraction of real traffic to the new version and compares its error rates and latency with the old one. If the signal is bad, the system **rolls back** automatically. Ball's Microsoft "rings" (Ch. 1) are the same idea for desktop software.

## Ways to release a change safely

**Blue-green**

- Run two identical environments.
- Deploy to the idle one (green), test it, then switch traffic from blue to green.
- Rollback = switch back.
- Cost: double the infrastructure during the switch.

**Canary / rings**

- Release to a small group first, then widen in stages.
- Compare metrics between old and new versions.
- Rollback affects few users.
- Needs good monitoring to be meaningful.

**Feature flags**

- Ship code "dark," switched off.
- Turn it on per user, region, or percentage.
- Separates **deploy** from **release**.
- Cost: flags pile up as technical debt. Knight Capital (2012) lost $440M partly through a reused old flag.

Knight Capital is discussed in the Chapter 1 primer. The SEC's order describes a deployment that missed one of eight servers and a repurposed flag that reactivated old, dead code.

## Monolith, microservices, serverless

An architectural choice with large operational consequences. (Architecture in general is the topic of the Chapter 10 primer.)

**Monolith**

- One deployable application, one codebase, usually one database.
- Simple to develop, test, debug, and deploy at first.
- Scaling and team coordination get hard as it grows.
- A good default for small teams.

**Microservices**

- Many small services, each deployed independently, each owning its data, communicating over APIs.
- Teams move independently (Conway's law, Ch. 3 primer).
- Cost: network failures, versioning, distributed debugging, **emergent behavior**.

**Serverless (FaaS)**

- Write functions; the cloud runs, scales, and bills them per call (AWS Lambda, 2014).
- No servers to manage.
- Cost: cold starts, vendor lock-in, harder local testing, and behavior spread across managed services.

Yang (Ch. 7): 'You're able to do a lot by writing very small amounts of code, and you're able to do a lot with just calling APIs.' Microservices are also why Akita's users didn't know what endpoints they had.

## Observability: the three pillars

**Monitoring** answers questions you planned in advance ("is the error rate above 1%?"). **Observability** is the ability to answer new questions about a running system from its outputs.

**Logs**

- Timestamped records of discrete events.
- Best as **structured** logs (key–value or JSON), not free text.
- Rich detail, but expensive to store and search at scale.
- Answers: _what exactly happened to this request?_

**Metrics**

- Numeric measurements aggregated over time: request rate, error rate, latency percentiles, CPU, queue length.
- Cheap to store; ideal for dashboards and alerts.
- Answers: _is something wrong, and since when?_

**Traces**

- The path of one request through many services, as nested **spans** with timings.
- Essential for microservices.
- Standardized by **OpenTelemetry**.
- Answers: _where did the time (or the error) come from?_

Google's SRE book recommends four 'golden signals' for any user-facing system: latency, traffic, errors, and saturation. Note how Yang's 'execution traces as retrospective data' uses the same raw material for a different purpose: experiments rather than debugging.

## One distributed trace

```
POST /checkout (frontend) ............................. 420 ms
  auth ... 30 ms
          cart service ... 95 ms
            inventory DB query ... 70 ms
                            payment API: timeout ......
                                         payment API: retry ... 110 ms
```

The frontend call took 420 ms. The trace shows why: the payment API timed out and was retried. Without the trace, every service's own logs would look normal. This is the kind of **emergent**, cross-service behavior Yang says can only be understood by observation.

## Reliability targets: SLIs, SLOs, SLAs, and error budgets

- A **service level indicator (SLI)** is a measured quantity users care about: the fraction of requests that succeed, or the fraction served in under 300 ms.
- A **service level objective (SLO)** is a target for an SLI over a window: "99.9% of requests succeed, measured over 30 days."
- A **service level agreement (SLA)** is a contract with customers that says what happens (refunds, credits) if a promised level is missed. SLAs are usually looser than internal SLOs.
- The **error budget** is 100% minus the SLO. A 99.9% SLO allows 0.1% failure. While budget remains, the team ships features. When it's spent, it slows down and works on reliability.
The key idea: **100% is the wrong target**. Users can't tell 99.999% from 100%, their own networks fail more often than that, and every extra "nine" costs more and slows change.

> **Downtime per 30 days.** **99%** ("two nines"): 7.2 hours
**99.9%**: 43.2 minutes
**99.99%**: 4.3 minutes
**99.999%**: 26 seconds

Each nine is ten times harder. Choose the target from what users need and what failure costs.

Error budgets turn a political argument (developers want to ship, operators want stability) into an agreed number. Compare Boehm and Turner's 'criticality' factor (Ch. 2 primer) and Hoodlet's patch deadlines for medical devices (Ch. 8).

## The incident lifecycle

```
Detect → Triage & declare → Mitigate → Resolve root cause → Postmortem → Action items
   ↑__________________ better detection, safer deploys, fewer repeats __________|
```

During an incident, **mitigate first** (roll back, fail over, shed load), and find the root cause later. Afterwards a written **postmortem** records the timeline, impact, contributing causes, and action items. Blameless postmortem culture is covered in the Chapter 11 primer.

## Four outages worth knowing

**GitLab, 2017**

- An engineer, working late on a replication problem, deleted the production database directory on the wrong server.
- Five backup and replication methods turned out not to be working.
- About six hours of data lost; GitLab live-streamed the recovery.
- Lesson: test restores, not just backups.

**AWS S3, 2017**

- A debugging command meant to remove a few servers had a typo and removed many more.
- S3 in one region went down for hours, taking many websites with it.
- Fix: the tool now removes capacity slowly and refuses to go below a safe minimum.

**Facebook, 2021**

- A maintenance command accidentally withdrew the network routes to Facebook's data centers.
- DNS failed; Facebook, Instagram, and WhatsApp were down about six hours.
- Internal tools ran on the same network, slowing recovery.

**CrowdStrike, 2024**

- A faulty content update to a Windows security agent crashed about 8.5 million machines.
- Airlines, hospitals, and banks were disrupted.
- Lesson: even "just data" updates need staged rollout (Hoodlet, Ch. 8).

All four companies published postmortems or incident reports; assign one and have students identify the trigger, the contributing causes, and which practice (canary, restore testing, guard rails) would have limited the damage. The CrowdStrike machine count is Microsoft's estimate.

## Designing for failure

In a large distributed system something is always broken. Resilient systems assume it:

- **Timeouts** on every network call, so one slow dependency can't hang everything.
- **Retries with backoff and jitter**, because naive immediate retries can turn a small slowdown into a **retry storm**.
- **Circuit breakers**: after repeated failures, stop calling a dependency for a while and fail fast.
- **Graceful degradation**: show stale data or turn off a feature rather than failing the whole page.
- **Redundancy and failover** across machines, data centers, and regions (the Chapter 9 primer covers replication).
**Chaos engineering** tests these defenses on purpose. Netflix's **Chaos Monkey** (around 2010) randomly terminates production servers so that teams must build services that survive it.

> **Cascading failure.** A **cascading failure** is the classic emergent behavior: one overloaded service slows, its callers time out and retry, the extra load overwhelms the next service, and so on. No single component's spec predicts it.

## Measuring delivery: the DORA metrics

The DevOps Research and Assessment (DORA) program, summarized in _Accelerate_ (Forsgren, Humble, and Kim, 2018), proposed four measures of software delivery performance:

- **Deployment frequency**: how often you release to production.
- **Lead time for changes**: time from commit to running in production.
- **Change failure rate**: the fraction of releases that cause a failure.
- **Time to restore service**: how long recovery takes after a failure.
Their surveys found that speed and stability go _together_: high performers deploy more often _and_ fail less. That contradicts the older belief that going faster must mean breaking more.

> **Read critically.** The evidence is largely from large self-report surveys. Correlation is not causation, and metrics become targets (Goodhart's law). Compare the evidence debates in the Chapter 4 primer, and Zeller's standards for empirical SE (Ch. 5).

---

# APIs as contracts

*The interface is a promise, and every observable behavior becomes part of it*

## What an API promises

An API is the module interface of the networked world (see the Chapter 3 primer on specifications). A web API contract includes:

- **Endpoints**: resources and the operations on them. In **REST** style, URLs name resources (`/orders/42`) and HTTP methods act on them (`GET`, `POST`, `PUT`, `DELETE`).
- **Data formats**: request and response schemas, usually JSON.
- **Status codes and errors**: `200 OK`, `404 Not Found`, `429 Too Many Requests`, `500 Internal Server Error`.
- **Non-functional promises**: rate limits, latency, authentication, idempotency (can a request be safely repeated?).
Specifications such as **OpenAPI** describe all this in machine-readable form, so tools can generate documentation, client code, tests, and mock servers. GraphQL and gRPC are common alternatives to REST.

> **Akita's finding.** Yang: users' first need was simply knowing "what API endpoints they even have." In a large microservice system, nobody may hold the complete contract, so it has to be **inferred** from traffic.

## Changing an API without breaking clients

**Usually safe**

- Adding a new endpoint
- Adding an optional request field
- Adding a field to a response (if clients ignore unknown fields)
- Accepting a wider range of inputs

**Breaking**

- Removing or renaming an endpoint or field
- Making an optional field required
- Changing a type or meaning (cents → dollars)
- Changing error codes or ordering that clients rely on
- Tightening validation

**Managing change**

- **Semantic versioning**: MAJOR.MINOR.PATCH; bump MAJOR for breaking changes
- Version in the URL or header (`/v2/...`)
- Deprecation periods and warnings
- **Contract tests** run against both provider and consumers

## Two laws about interfaces

> "Be conservative in what you do, be liberal in what you accept from others."
>
> — Jon Postel, the "robustness principle," RFC 793 (TCP), 1981

Liberal acceptance helped the early Internet interoperate, but it also lets sloppy behavior become permanent and creates security holes; RFC 9413 (2023) discusses the trade-offs. **Hyrum's law** (Chapter 3 primer) is its consequence: with enough users, every observable behavior of an API, documented or not, becomes something someone depends on.

## API inventories and API security

Organizations frequently do not know all the APIs they expose:

- **Shadow APIs**: endpoints deployed without documentation or review.
- **Zombie APIs**: old versions that were supposed to be retired but still answer requests.
Undocumented endpoints are untested and unmonitored, which makes them a favorite target. The **OWASP API Security Top 10** (2023) lists the most common API flaws. First is **broken object level authorization**: changing `/orders/42` to `/orders/43` returns someone else's order because the server checks _that_ you are logged in but not _whether_ the object is yours.

API discovery from observed traffic, which is what Akita built, is one response. Gateways that enforce a published contract are another.

> **Looking ahead.** Chapter 8's primer covers application security in depth. Hoodlet's agentic-browser example is an API boundary problem too: an AI with access to every tab erases the boundaries the browser enforced.

## Information flow in one slide

**Access control** asks _may this principal read this object?_ **Information flow control** asks _where can this information end up?_

`if (patient.hivStatus) { showBanner("Schedule follow-up") }`

The code never prints the secret field, but anyone who sees the banner learns it. That is an **implicit flow** through a branch. Access control can't see it, because the read itself was allowed.

- **Noninterference**: changing secret inputs must not change any public output.
- **Taint tracking** (dynamic) marks data from untrusted or secret sources and follows it at runtime.
- **Information flow type systems** (static) reject programs with illegal flows, as in Jif (Myers) and Yang's Jeeves.

> **Two chapters.** **Yang** (Ch. 7) built languages that enforce information flow, then found that the guarantees end at the database and network.

**Schneider** (Ch. 9) proved information flow is not a property a reference monitor can enforce, and is still working on what information flow should even mean.

## Check yourself before reading Chapter 7

1. Distinguish continuous integration, continuous delivery, and continuous deployment.
2. What are logs, metrics, and traces each best at answering? Why do microservices make traces essential?
3. A service has a 99.9% availability SLO over 30 days. What is its error budget in minutes, and what should the team do when it's spent?
4. Give two API changes that are safe and two that break clients. How does semantic versioning signal the difference?
5. Explain with an example why information flow control is stronger than access control.

## Further reading

- B. Beyer, C. Jones, J. Petoff, N. R. Murphy (eds.), Site Reliability Engineering: How Google Runs Production Systems, O'Reilly, 2016 (free online).
- J. Humble and D. Farley, Continuous Delivery, Addison-Wesley, 2010.
- G. Kim, J. Humble, P. Debois, J. Willis, The DevOps Handbook, IT Revolution, 2016.
- N. Forsgren, J. Humble, G. Kim, Accelerate, IT Revolution, 2018.
- C. Majors, L. Fong-Jones, G. Miranda, Observability Engineering, O'Reilly, 2022.
- M. Nygard, Release It! (2nd ed.), Pragmatic Bookshelf, 2018.
- Postmortems: GitLab (Jan. 31, 2017), AWS S3 (Feb. 28, 2017), Meta (Oct. 4, 2021), CrowdStrike (July 19, 2024).
- OWASP API Security Top 10, 2023; OpenAPI Specification, openapis.org.
- A. Sabelfeld and A. C. Myers, "Language-Based Information-Flow Security," IEEE J. Selected Areas in Communications, 2003.
