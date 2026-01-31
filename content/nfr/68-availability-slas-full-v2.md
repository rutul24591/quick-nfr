---
category: system
id: 68
nfrNumber: 68
title: Availability SLAs (System)
---

# 📈 Availability SLAs

## 🧒 Explain Like I'm 10

Imagine your school bus 🚌.

-   It should come every morning on time.
-   If it misses many days, students get late for school.

The school promises: \> "Our bus will arrive 99 out of 100 days."

That promise is like an SLA.

Software systems also promise: - How often they will be available - How
much downtime is acceptable

**Availability SLA means a formal promise about how reliable and
available a system will be.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Availability SLAs define: - The guaranteed percentage of uptime over a
time window - What counts as downtime - How availability is measured -
What penalties or credits apply if SLA is breached - How incidents are
excluded (maintenance, force majeure)

Common SLA levels: - 99.0% → \~7.3 hours downtime/month - 99.9% → \~43
minutes/month - 99.99% → \~4.3 minutes/month - 99.999% → \~26
seconds/month

Closely related: - SLO (Service Level Objective) - SLI (Service Level
Indicator) - Error budgets

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Availability calculation:

    Availability = (Total Time - Downtime) / Total Time

Measurement pipeline:

    Synthetic Checks → Monitoring → SLA Engine → Reports → Credits

Hidden complexity: - Partial outages - Regional failures - Dependency
attribution - Maintenance windows - Measurement accuracy - Multi-tenant
impact - Alert noise

At scale: - Thousands of SLAs - Customer-specific contracts - Automated
compliance reporting - Error budget governance

SLAs become operational contracts.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Trust and reliability
-   Predictable service

### Business

-   Contract compliance
-   Revenue protection

### Engineering

-   Reliability focus
-   Prioritization discipline

------------------------------------------------------------------------

## 🧠 Mental Model --- Bank Account

    Total Minutes → Error Budget → Spend Carefully

Downtime spends your error budget.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**SaaS Platform SLA Breach**

-   SLA: 99.9%
-   Unexpected DB outage lasts 2 hours
-   Monthly error budget exhausted

Impact: - Customer credits issued - Engineering freezes risky releases -
Reliability improvements prioritized

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Clear SLA Definitions

**What:** Define uptime precisely.\
**How:** Contract language.\
**Why:** Avoid disputes.\
**Tradeoff:** Legal overhead.

------------------------------------------------------------------------

### 2️⃣ SLI Instrumentation

**What:** Measure real availability.\
**How:** Synthetic probes, health checks.\
**Why:** Accurate data.\
**Tradeoff:** Monitoring cost.

------------------------------------------------------------------------

### 3️⃣ Error Budget Policy

**What:** Control risk using budget.\
**How:** Freeze releases when exceeded.\
**Why:** Reliability governance.\
**Tradeoff:** Slower velocity.

------------------------------------------------------------------------

### 4️⃣ Multi-Region Redundancy

**What:** Reduce single points of failure.\
**How:** Active-active regions.\
**Why:** Higher availability.\
**Tradeoff:** Cost and complexity.

------------------------------------------------------------------------

### 5️⃣ Automated Incident Response

**What:** Fast recovery.\
**How:** Auto-healing scripts.\
**Why:** Minimize downtime.\
**Tradeoff:** Automation risk.

------------------------------------------------------------------------

### 6️⃣ Dependency SLA Management

**What:** Track upstream reliability.\
**How:** Vendor SLAs and fallbacks.\
**Why:** End-to-end availability.\
**Tradeoff:** Vendor coordination.

------------------------------------------------------------------------

### 7️⃣ SLA Reporting & Audits

**What:** Transparency and compliance.\
**How:** Monthly reports.\
**Why:** Trust.\
**Tradeoff:** Reporting overhead.

------------------------------------------------------------------------

## 📏 Metrics

-   Uptime percentage
-   Error budget remaining
-   Incident count
-   MTTR
-   SLA breach frequency

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Unrealistic SLA promises
-   No error budget discipline
-   Poor measurement accuracy
-   Ignoring dependencies
-   Manual reporting

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I manage availability using clear SLAs, accurate SLIs, error budgets,
> multi-region redundancy, automated recovery, and continuous
> reporting."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit             Tradeoff
  ------------------- ------------------------
  High availability   Higher cost
  Strict SLAs         Slower innovation
  Redundancy          Operational complexity
  Transparency        Reporting overhead

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** What does 99.9% SLA mean?\
A. 9 minutes downtime per year\
B. \~43 minutes downtime per month\
C. Zero downtime\
D. Unlimited downtime\
✅ Answer: B

**Q2:** What controls how much risk teams can take?\
A. CDN\
B. Error budget\
C. Cache\
D. DNS\
✅ Answer: B
