# Answer Key — Chapter 8 Quiz (Hoodlet)

## Part A

| Q | Answer | Note |
|---|---|---|
| 1 | **b** | "They know when it's wrong, and when it produces what they actually want." |
| 2 | **c** | "How can I manipulate them to perform in a way that was not intended?" |
| 3 | **a** | "It's a velocity problem, and unless you have robust testing, everything is slow." |
| 4 | **d** | The air-raid sirens and software-defined radio. (c) describes technical *debt*. |
| 5 | **b** | Cites "The Attacker Moves Second." |
| 6 | **c** | RUO devices had much more lenient timelines. |
| 7 | **a** | "It was like I had just called their baby ugly." |

## Part B — what a full-credit answer includes

**8.** Users don't list security as a requirement, so it rarely appears in feature requests, roadmaps, or demos, and is treated as a cost center. But users assume it is there by default and would abandon a product that lacked it (the banking app). Teams should therefore treat security as a non-functional requirement from the start: threat modeling, secure defaults, design choices (memory-safe languages, careful input parsing, hashing and salting), and budgeted time. It shouldn't be left to emerge from feature work.

**9.** A true positive is a reported issue that is real; with 10–20% real, most AI findings are false positives. But the *number* of real, exploitable bugs found is 5–10 times what their earlier tools found. Low precision is acceptable when experts in the loop can triage findings efficiently and verify which are real. Humans are also still needed for business logic flaws and for chaining bugs into real impact.

## Part C — rubric (10 points)

- **Hoodlet's factors (3):** consequences of failure (patient harm, money at stake), required update cadence, deployment constraints (air gap, USB patches), regulation (RUO vs. IVD), exposure to attackers.
- **Argument (3):** A clear position, for example "risk and cost of change determine the process," with both examples placed correctly: waterfall acceptable for the air-gapped instrument; fast, test-backed delivery for internet-facing apps.
- **Security's place (2):** Security raises the cost of slowness when the software is exposed (patch velocity), and depends on testing and CI/CD. It is not a separate phase.
- **Cross-chapter (2):** Shriram's derivation of waterfall from its constraints and Boehm–Turner home grounds (Ch. 2 primer); Holzmann's JPL, where rigor is justified (Ch. 4); Yang's quarterly-to-daily cadence shift (Ch. 7).
