---
category: backend
difficulty: advanced
id: 36
importance: critical
readTime: 80
relatedNFRs:
- 31
- 32
- 33
- 35
- 37
slug: data-consistency-integrity-backend
tags:
- consistency
- integrity
- transactions
- replication
- idempotency
- concurrency
- correctness
title: Data Consistency & Integrity (Backend)
tldr: Data Consistency & Integrity ensures that data remains correct,
  complete, and synchronized across services, replicas, and time ---
  even under failures, concurrency, and scale.
---

# 🧬 Data Consistency & Integrity (Backend)

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine you have two notebooks 📓📓.

You write your homework in one notebook. Your friend copies it into the
second notebook.

If one notebook has: - Missing pages ❌ - Wrong answers ❌ - Old data ❌

Then nobody knows which notebook is correct 😵

Computers face the same problem: - Data is stored in many places - Many
people change it at the same time - Networks fail sometimes

**Consistency means all copies agree.\
Integrity means the data is always correct and not corrupted.**

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World         Backend
  ------------------ ------------------
  Two notebooks      Replicas
  Copying homework   Replication
  Erasing mistakes   Rollbacks
  Locking notebook   Transactions
  Teacher checking   Validation rules

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Consistency ensures: - All readers see the same logical data - Updates
follow defined ordering rules

Integrity ensures: - Data correctness - No corruption - Referential
rules preserved - No partial writes

Key dimensions: - Strong vs eventual consistency - Atomicity,
consistency, isolation, durability (ACID) - Concurrency control -
Replication correctness - Validation enforcement

Failure sources: - Concurrent writes - Partial failures - Network
partitions - Buggy migrations - Schema drift

------------------------------------------------------------------------

### 📊 Consistency Models

  Model              Behavior
  ------------------ ----------------------------
  Strong             All reads see latest write
  Eventual           Converges over time
  Causal             Preserves order
  Read-your-writes   Session consistency
  Snapshot           Point-in-time

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Data flows through distributed layers:

    API → Service → Cache → DB Primary → Replicas → Analytics → Backups

Hidden complexity: - Replication lag - Split brain - Write conflicts -
Clock skew - Transaction boundaries across services - Dual writes

At scale: - Multi-region replication - Schema evolution - GDPR deletes
propagation - Event sourcing rebuilds

Correctness bugs are often silent but catastrophic.

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Impact

-   Correct balances
-   Trust in system

### 💰 Business Impact

-   Financial correctness
-   Legal compliance

### 🧑‍💻 Engineering Impact

-   Fewer data incidents
-   Easier debugging

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Correctness Chain

    Validate → Write Atomically → Replicate → Read Consistently → Repair

Break any link → data corruption risk.

------------------------------------------------------------------------

## 🧱 6. Common Consistency Failures

### ❌ Lost Updates

Concurrent overwrite.

### ❌ Dirty Reads

Uncommitted data visible.

### ❌ Stale Reads

Replica lag.

### ❌ Partial Writes

Crash mid-transaction.

### ❌ Dual Writes

Inconsistent systems.

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 💰 Wallet Balance Bug

Problem: - Two concurrent withdrawals - Balance becomes negative

Fix: - Transaction isolation - Row locking - Idempotency keys

Result: - Correct balance guaranteed

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns (With Details)

### ✅ Pattern 1 --- ACID Transactions

**What:** Atomic multi-step operations.\
**How:** Database transactions with isolation levels.\
**Why:** Prevents partial writes and race conditions.\
**Tradeoff:** Reduced throughput and contention.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Optimistic Concurrency Control

**What:** Detect conflicts instead of locking.\
**How:** Version numbers, compare-and-swap.\
**Why:** Scales better under low contention.\
**Tradeoff:** Retries on conflict.

------------------------------------------------------------------------

### ✅ Pattern 3 --- Idempotent Writes

**What:** Safe retries without duplication.\
**How:** Idempotency keys, dedup tables.\
**Why:** Prevents double processing.\
**Tradeoff:** Storage overhead.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Single Source of Truth

**What:** One authoritative data owner.\
**How:** Ownership boundaries per service.\
**Why:** Prevents divergence.\
**Tradeoff:** Coupling.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Read Repair & Reconciliation

**What:** Fix inconsistencies during reads.\
**How:** Compare replicas and heal.\
**Why:** Ensures eventual convergence.\
**Tradeoff:** Extra latency.

------------------------------------------------------------------------

### ✅ Pattern 6 --- Schema Validation & Constraints

**What:** Enforce data rules automatically.\
**How:** DB constraints, JSON schema.\
**Why:** Prevents bad data entry.\
**Tradeoff:** Migration complexity.

------------------------------------------------------------------------

### ✅ Pattern 7 --- Event Sourcing / CDC

**What:** Immutable change log.\
**How:** Append-only streams.\
**Why:** Auditability and rebuild.\
**Tradeoff:** Operational complexity.

------------------------------------------------------------------------

## 📏 9. Measuring Consistency Health

### 🔧 Tools

-   Data audits
-   Checksums
-   Consistency probes
-   CDC monitors

### 📊 Metrics

  Metric                 Meaning
  ---------------------- ------------
  Replication lag        Staleness
  Conflict rate          Contention
  Corruption incidents   Integrity
  Repair frequency       Drift
  Rollback count         Stability

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Assuming replicas are always fresh
-   Skipping constraints
-   Dual writes without coordination
-   No reconciliation jobs
-   Ignoring schema evolution

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Consistency model choice 2. Transaction strategy 3.
Concurrency handling 4. Replication risks 5. Integrity enforcement

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Benefit              Tradeoff
  -------------------- --------------------
  Strong consistency   Latency
  Optimistic control   Retries
  Constraints          Migration friction
  Event sourcing       Complexity

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Reliability
-   Availability
-   Compliance
-   Observability

------------------------------------------------------------------------

## 📚 14. References

-   CAP Theorem
-   Designing Data-Intensive Applications
-   Google Spanner Papers

------------------------------------------------------------------------

## 🧩 15. Quiz

### Q1

What ensures atomicity? A. Cache\
B. Transactions\
C. CDN\
D. CSS\
Answer: B

### Q2

What causes stale reads? A. Replication lag\
B. CSS\
C. Fonts\
D. CDN\
Answer: A

### Q3

Why idempotency? A. Styling\
B. Safe retries\
C. SEO\
D. Fonts\
Answer: B

### Q4

What prevents bad data? A. Animations\
B. Constraints\
C. CDN\
D. DNS\
Answer: B

### Q5

What helps rebuild state? A. Event sourcing\
B. CSS\
C. Fonts\
D. Cache\
Answer: A
