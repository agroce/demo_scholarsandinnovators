# Answer Key — Unit 4 Test (Chapters 10–12)

## Part A — Matching

| # | Term | Answer |
|---|---|---|
| 1 | Architectural style | D |
| 2 | Wicked problem | E |
| 3 | Concept (Jackson) | A |
| 4 | Tidy First | B |
| 5 | Blameless postmortem | C |
| 6 | Feedback loop | F |
| 7 | Multiplicity | H |
| 8 | Mission creep | G |
| 9 | Explore/Expand/Extract | J |
| 10 | Legibility | I |

Distractors: K, L.

## Part B — Multiple choice

| Q | Ans | Q | Ans |
|---|---|---|---|
| 11 | c | 16 | d |
| 12 | b | 17 | a |
| 13 | d | 18 | c |
| 14 | a | 19 | d |
| 15 | b | 20 | a |

Notes: 19: *The Reflective Practitioner* is Shaw's (Jackson also endorses it); *Chimpanzee Politics* and *What Engineers Know* are Beck's.

## Part C — what a full-credit answer includes (6 pts each)

**21.** Craft (virtuosos, intuition, informal transmission) → commercial (skilled practitioners, procedures, management, scale) → production problems stimulate science → when science fuses with practice, professional engineering (education, theory, codified knowledge). She saw most of software in the commercial stage, with pockets of engineering. Missing: codified knowledge that makes design routine (handbooks, exemplars), architecture kept as a definitive artifact, and economic incentives (liability) to do what we know. Bonus: engineering means using "the best organized knowledge," not necessarily math.

**22.** Any loop correctly analyzed. Example, autoscaling: the sensor is CPU utilization, the set point 60%, the actuator adds or removes instances. *Command authority:* scaling can't help if the bottleneck is the database, or if instances take minutes to start. *Sensor proxy:* CPU stands in for user latency. A memory-bound or lock-contended service can be slow at low CPU. *Overshoot:* scaling down too aggressively causes oscillation, and in-flight requests are like Shaw's "brick wall" that you can't overshoot.

**23.** Blameless means honest errors made in a reasonable context aren't punished, so people report errors and near-misses and the organization fixes the system (Dekker; the SFO controller). Accountability shifts to honesty, ownership, and learning: describing your actions truthfully, owning your part, and following through on fixes. Blaming others undermines the information flow the culture depends on, so it's what got people walked out.

**24.** Object-oriented design puts functionality on the classes for domain individuals: `Post.upvote(user)`, `User.follow(other)`. Concept design treats Upvote, Comment, and Follow as separate units, each with its own purpose and state (e.g., `votes: User -> set Item`), independent of what items or users are, and composed with synchronizations. Benefits: each concept is understood, reused, and changed independently; Post doesn't accumulate unrelated behavior; and relational state raises questions such as "can a user upvote twice?" Concepts span several kinds of objects; objects contain parts of many concepts.

**25.** Any two. *Shaw:* courses should have students read, critique, and study good systems before writing their own (a "reading" component, exemplars, architecture case studies), and treat the curriculum as a design with a scarce resource, balancing durable ideas and current examples. *Beck:* CS fundamentals (Big O, logic, pre/postconditions) are necessary but insufficient. Add the "clinical" skills: working with people, incident response, incremental delivery, deliberate practice (rewriting programs). *Jackson:* give students ill-defined, real-world problems that require problem formulation, domain and concept modeling, and reflective practice; LLMs make pre-digested coding problems obsolete.

## Part D (15 points)

**(a)** (5) Concepts: Reservation, CheckIn (or Attendance), Quota (or Limit), Court/Slot scheduling, Notification, Session. Example:
- **Reservation [Resident, Slot]**. *Purpose:* let a resident hold a slot for future use. *State:* `holds: Resident -> set Slot`, with each slot held by at most one resident. *Actions:* `reserve(r, s)`, `cancel(r, s)`, `release(s)`. *Operational principle:* after `reserve(r, s)`, no one else can reserve s until r cancels or the slot is released.
- The 2-reservation cap and the 15-minute release are best expressed as a separate Quota concept and a synchronization (when CheckIn hasn't occurred by start+15, then `Reservation.release(s)`).

**(b)** (3) For example: Can one slot be held by two residents? (No.) Can a resident hold two slots at the same time on different courts? (Undecided: is that within the cap of 2? Probably disallow.) Can a reservation exist without a resident (walk-ins, city events)? Can several residents share one reservation (doubles)? The requirements don't say: a missing requirement.

**(c)** (4) Stakeholders: city parks staff, tennis clubs or leagues, coaches running lessons, residents without smartphones, neighbors (noise, lights), the city council. Wicked aspects: fairness (bots grabbing slots; people who work shifts); "resident" verification versus privacy; equity across neighborhoods; any rule changes behavior (no-shows, slot hoarding). There is no stopping rule for "fair access," and stakeholders have conflicting goals.

**(d)** (3) Start with Reservation, the core concept (Beck: survive first). First test, for example: `reserve(alice, slot1)` succeeds, and then `reserve(bob, slot1)` fails. Or the simplest: a new system has no reservations. Any small, failing-first test of core behavior earns full credit.

## Part E — rubric (15 points)

- **Thesis (3):** A clear, arguable position.
- **Accurate use of interviews (6):** All three chapters for E1; at least two plus one earlier chapter for E2; at least two for E3. Specific claims, correctly attributed.
- **Concepts (4):** E1: BDUF, incremental design, second-system effect, architectural style, framework lock-in, Explore/Expand/Extract. E2: Shaw's maturity model, routine design, liability, exemplars, problem setting. E3: reading before writing, specifications as oracles, legibility, modularity, reflective practice.
- **Counterargument (2):** Engages the strongest opposing view.
