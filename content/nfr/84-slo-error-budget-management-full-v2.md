---
category: system
id: 84
nfrNumber: 84
title: SLO / Error Budget Management (System)
---

# 🎯 SLO / Error Budget Management

## 🧒 Explain Like I'm 10

Imagine your school bus 🚍.

The rule is: - The bus should arrive on time 9 out of 10 days.

That means: - 1 day can be late --- and that's okay.

If the bus is late many days, parents get angry 😡. If it's always on
time, everyone is happy 🙂.

In software: - We promise how reliable a system should be. - We allow a
small amount of failure.

That allowed failure is called an **error budget**.

**SLO management means defining reliability goals and using error
budgets to balance speed and safety.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

SLO (Service Level Objective) defines: - A measurable reliability target
for a service - Typically expressed as availability, latency, or
correctness over time

Error Budget: - The allowed amount of failure within the SLO window

Related concepts: - **SLI (Service Level Indicator):** Actual measured
metric - **SLO:** Target reliability - **SLA:** External contractual
guarantee

Example:

    SLO = 99.9% availability per month
    Total minutes/month ≈ 43,200
    Allowed downtime (error budget) ≈ 43 minutes

Goals: - Quantify reliability expectations - Enable data-driven release
decisions - Prevent over-engineering - Protect user experience

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Reliability loop:

    Measure → Compare → Consume Budget → Decide → Improve

Error budget states:

    Healthy Budget → Normal Velocity
    Burning Budget → Slow Down
    Exhausted Budget → Freeze Releases

Hidden complexity: - Metric accuracy - Window selection bias - Alert
fatigue - Multi-SLO conflicts - Partial outages interpretation -
Aggregation errors - Human decision discipline

At scale: - Hundreds of services - Hierarchical SLOs - Cross-team
dependencies - Automated gating

SLOs become operational contracts.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Predictable reliability
-   Faster recovery

### Business

-   Balanced innovation
-   Reduced outages

### Engineering

-   Objective decision making
-   Clear priorities

------------------------------------------------------------------------

## 🧠 Mental Model --- Speed Limit

    Speed Limit → Safe Driving → Fewer Accidents

Error budget is how fast you can safely go.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Frequent Deployments Causing Incidents**

-   Team deploys 10x daily
-   Latency spikes cause SLO burn
-   Error budget exhausted mid-month

Decision: - Freeze releases - Fix stability issues - Resume when budget
recovers

Result: - Stability improves

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Well-Defined SLIs

**What:** Choose user-centric metrics.\
**How:** Availability, latency percentiles.\
**Why:** Meaningful signals.\
**Tradeoff:** Instrumentation cost.

------------------------------------------------------------------------

### 2️⃣ Error Budget Policies

**What:** Define actions when budget burns.\
**How:** Release freeze rules.\
**Why:** Enforce discipline.\
**Tradeoff:** Slower delivery sometimes.

------------------------------------------------------------------------

### 3️⃣ Multi-Window Burn Rate Alerts

**What:** Detect fast and slow burns.\
**How:** Short + long window alerts.\
**Why:** Early detection.\
**Tradeoff:** Alert tuning.

------------------------------------------------------------------------

### 4️⃣ Automated Release Gates

**What:** Block risky releases.\
**How:** CI integrates budget status.\
**Why:** Prevent cascading failures.\
**Tradeoff:** Pipeline complexity.

------------------------------------------------------------------------

### 5️⃣ Hierarchical SLO Modeling

**What:** Align service dependencies.\
**How:** Aggregate SLO trees.\
**Why:** System-level visibility.\
**Tradeoff:** Modeling complexity.

------------------------------------------------------------------------

### 6️⃣ Error Budget Burn Reviews

**What:** Learn from consumption.\
**How:** Postmortems.\
**Why:** Continuous improvement.\
**Tradeoff:** Time cost.

------------------------------------------------------------------------

### 7️⃣ User Experience Correlation

**What:** Map SLO to UX.\
**How:** RUM metrics.\
**Why:** Real impact visibility.\
**Tradeoff:** Data complexity.

------------------------------------------------------------------------

## 📏 Metrics

-   Error budget remaining
-   Burn rate
-   SLO compliance percentage
-   Alert accuracy
-   Release freeze frequency

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Picking vanity metrics
-   Ignoring burn rate
-   No enforcement policies
-   Treating SLA as SLO
-   Over-tight targets

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I manage reliability using SLOs and error budgets with burn-rate
> alerts, automated release gates, and policy-driven decision making to
> balance innovation and stability."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit                   Tradeoff
  ------------------------- ---------------------------
  Predictable reliability   Slower releases sometimes
  Objective decisions       Monitoring overhead
  Better UX                 Metric complexity
  Reduced incidents         Cultural change

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** What does an error budget represent?\
A. Cost\
B. Allowed failure\
C. Cache\
D. SLA\
✅ Answer: B

**Q2:** What happens when budget is exhausted?\
A. Increase releases\
B. Freeze risky changes\
C. Ignore\
D. Scale CDN\
✅ Answer: B
