---
category: backend
id: 40
nfrNumber: 40
title: Data Retention & Archival (Backend)
---

# 🗄️ Data Retention & Archival (Backend)

## 🧒 Explain Like I'm 10

Imagine your school notebooks 📚.

-   This year's notebooks stay in your bag.
-   Last year's notebooks go into a cupboard.
-   Very old notebooks are thrown away (unless the teacher says keep
    them).

A backend system treats data the same way: - **Hot data** → used daily -
**Warm data** → used sometimes - **Cold data** → rarely used - **Expired
data** → deleted

**Data Retention decides *how long* data lives.\
Archival decides *where old data goes safely*.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Data Retention & Archival defines: - How long different data types must
be kept - When data moves from primary databases to cheaper storage -
When data must be deleted permanently - How compliance, audits, and
legal holds are enforced

It balances: - Compliance requirements - Cost optimization -
Performance - Operational safety

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical lifecycle:

    Create → Hot DB → Warm Storage → Cold Archive → Delete

Architectural layers:

    API
     → Primary DB (OLTP)
       → Data Lake / Object Storage
         → Cold Archive (Glacier / Tape)
           → Secure Deletion

Hidden complexities: - Legal holds override deletion - Archived schemas
evolve - Encryption key rotation - Restore SLAs - Partial rehydration -
Audit traceability

------------------------------------------------------------------------

## 🎯 Why It Matters

### User

-   Trust that their data is handled responsibly

### Business

-   Avoid regulatory fines
-   Reduce storage costs
-   Lower breach impact

### Engineering

-   Smaller databases
-   Faster queries
-   Cleaner operations

------------------------------------------------------------------------

## 🧠 Mental Model --- Data Temperature

    🔥 Hot  →  🌤️ Warm  →  ❄️ Cold  →  🗑️ Deleted

As data cools: - Access frequency ↓ - Storage cost ↓ - Retrieval latency
↑

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**E-commerce Platform**

-   Orders must be retained for 7 years (tax law)
-   Last 6 months → Primary DB
-   6 months--2 years → Object storage
-   2--7 years → Glacier archive
-   After 7 years → Secure deletion

Auditors can request restores within 24 hours.

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Tiered Storage Strategy

**What:** Separate storage based on data age.\
**How:** DB → S3 → Glacier via lifecycle rules.\
**Why:** Drastically reduces storage cost.\
**Tradeoff:** Slower access to archived data.

------------------------------------------------------------------------

### 2️⃣ Time-Based Partitioning

**What:** Partition tables by time.\
**How:** Monthly / yearly partitions.\
**Why:** Fast archival & deletion.\
**Tradeoff:** More complex queries.

------------------------------------------------------------------------

### 3️⃣ Immutable Archives (WORM)

**What:** Prevent modification or deletion.\
**How:** Object Lock, WORM storage.\
**Why:** Regulatory compliance.\
**Tradeoff:** No corrections allowed.

------------------------------------------------------------------------

### 4️⃣ Automated Lifecycle Policies

**What:** Policy-driven data movement.\
**How:** Scheduled jobs, cloud lifecycle rules.\
**Why:** Eliminates manual errors.\
**Tradeoff:** Less flexibility.

------------------------------------------------------------------------

### 5️⃣ Legal Hold Mechanism

**What:** Pause deletion for investigations.\
**How:** Metadata flags + policy override.\
**Why:** Legal safety.\
**Tradeoff:** Storage growth.

------------------------------------------------------------------------

### 6️⃣ Metadata Index for Archives

**What:** Index archived data.\
**How:** Separate metadata DB.\
**Why:** Fast search without full restore.\
**Tradeoff:** Extra system to maintain.

------------------------------------------------------------------------

### 7️⃣ Auditable Deletion

**What:** Prove data was deleted.\
**How:** Immutable audit logs.\
**Why:** Compliance proof.\
**Tradeoff:** Logging overhead.

------------------------------------------------------------------------

## 📏 Metrics to Track

-   Storage cost per TB
-   Archive restore latency
-   Retention violations
-   Data growth rate
-   Legal hold count

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Keeping everything forever
-   Hard deletes without audit trail
-   Mixing archival with backup
-   Ignoring restore SLAs
-   No compliance mapping

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I define legal and business retention requirements first, design
> tiered storage, automate lifecycle transitions, and ensure all
> deletions and archives are auditable and compliant."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit       Tradeoff
  ------------- ------------------------
  Lower cost    Higher restore latency
  Compliance    Operational overhead
  Smaller DBs   Archive complexity

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why archive data?\
A. Styling\
B. Cost & compliance\
C. SEO\
D. Caching\
✅ Answer: B

**Q2:** What overrides deletion?\
A. TTL\
B. Legal hold\
C. Index\
D. Cache\
✅ Answer: B
