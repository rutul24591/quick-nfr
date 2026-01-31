---
category: backend
difficulty: advanced
id: 37
importance: critical
readTime: 80
relatedNFRs:
- 32
- 33
- 36
- 38
slug: durability-guarantees-backend
tags:
- durability
- wal
- fsync
- replication
- rpo
- persistence
- crash-recovery
title: Durability Guarantees (Backend)
tldr: Durability Guarantees define how safely and permanently data is
  persisted so that it survives crashes, power loss, restarts, and
  infrastructure failures without unacceptable data loss.
---

# 💾 Durability Guarantees (Backend)

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine writing homework in a notebook ✍️.

If you: - Write with pencil on loose paper → it can get lost 😢 - Write
in a strong notebook → it stays safe 👍 - Keep a photocopy → even safer
📄

Computers write data too: - Sometimes in memory (fast but disappears on
power loss) - Sometimes on disk (slower but permanent) - Sometimes in
many copies (even safer)

**Durability means once the system says "saved", the data must never
disappear --- even if power goes off or the server crashes.**

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World         Backend
  ------------------ -------------
  Writing on paper   Disk write
  Pencil notes       Memory
  Photocopy          Replication
  Safe locker        WAL
  Power cut          Crash

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Durability guarantees: - Data acknowledged to clients will survive
failures. - Recovery will restore committed state correctly.

Durability depends on: - Storage medium (SSD, HDD, NVMe) - Write
ordering - Flush semantics (`fsync`) - Write-ahead logging (WAL) -
Replication acknowledgements - Crash recovery algorithms

Related concepts: - **RPO (Recovery Point Objective)** -- maximum
acceptable data loss. - **Commit semantics** -- when a write is
considered durable. - **Sync vs async writes**

------------------------------------------------------------------------

### 📊 Durability Spectrum

  Mode              Durability         Latency
  ----------------- ------------------ -----------
  Memory only       ❌ None            Very fast
  Buffered disk     ⚠️ Weak            Fast
  fsync per write   ✅ Strong          Slow
  Replicated sync   ✅✅ Very strong   Slowest

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Durability lives deep inside storage engines:

    App → Buffer → WAL → OS Page Cache → Disk Controller → Disk → Replica

Hidden complexity: - OS lies about write completion (write cache) -
Power-loss write reordering - Partial sector writes - Filesystem
journaling behavior - RAID controller cache - Cloud network replication
lag

Failure timeline example:

    t0: Client receives ACK
    t1: Power loss
    t2: WAL not flushed → data lost ❌

True durability requires knowing exactly when data reaches stable
storage.

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Impact

-   No lost orders
-   No missing payments

### 💰 Business Impact

-   Financial correctness
-   Legal compliance

### 🧑‍💻 Engineering Impact

-   Predictable recovery
-   Fewer data incidents

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Write Commitment Ladder

    Memory → OS Cache → WAL → Disk → Replica → Geo Replica

Higher ladder = stronger durability + higher latency.

------------------------------------------------------------------------

## 🧱 6. Common Durability Failures

### ❌ Acknowledging Before fsync

False durability.

### ❌ Async Replication Assumed Safe

Data loss window.

### ❌ Disk Write Cache Enabled Without Battery

Corruption risk.

### ❌ WAL Misconfiguration

Silent loss.

### ❌ No Crash Testing

Unknown behavior.

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 💳 Payment Lost After Crash

Problem: - API returns success - Server crashes before WAL flush -
Transaction disappears

Fix: - Force WAL fsync before ACK - Replicated quorum commit

Result: - Zero data loss on crash

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns (With Details)

### ✅ Pattern 1 --- Write-Ahead Logging (WAL)

**What:** Persist intent before applying changes.\
**How:** Append-only log flushed to disk.\
**Why:** Enables crash recovery and atomicity.\
**Tradeoff:** Extra IO and latency.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Synchronous fsync on Commit

**What:** Force disk flush before acknowledging.\
**How:** `fsync()` or equivalent barriers.\
**Why:** Guarantees data survives power loss.\
**Tradeoff:** Higher write latency.

------------------------------------------------------------------------

### ✅ Pattern 3 --- Replicated Quorum Writes

**What:** Require multiple replicas to confirm.\
**How:** Majority acknowledgements.\
**Why:** Survives single-node loss.\
**Tradeoff:** Network latency and cost.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Battery-Backed Write Caches

**What:** Safe controller caching.\
**How:** RAID cache with battery or capacitor.\
**Why:** Prevents corruption on power loss.\
**Tradeoff:** Hardware cost.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Group Commit / Batching

**What:** Batch multiple commits per fsync.\
**How:** Log batching windows.\
**Why:** Improves throughput.\
**Tradeoff:** Slight durability delay window.

------------------------------------------------------------------------

### ✅ Pattern 6 --- Crash Recovery Validation

**What:** Repeated crash testing.\
**How:** Kill -9, power fault simulation.\
**Why:** Validates true guarantees.\
**Tradeoff:** Engineering effort.

------------------------------------------------------------------------

### ✅ Pattern 7 --- Explicit RPO Policies

**What:** Define acceptable loss.\
**How:** Business-driven SLO mapping.\
**Why:** Aligns durability cost with value.\
**Tradeoff:** Requires stakeholder alignment.

------------------------------------------------------------------------

## 📏 9. Measuring Durability Health

### 🔧 Tools

-   Chaos crash tests
-   WAL metrics
-   Disk flush latency
-   Replica lag monitors

### 📊 Metrics

  Metric                Meaning
  --------------------- -----------------
  fsync latency         Durability cost
  WAL backlog           Risk window
  Replica ACK lag       RPO exposure
  Crash recovery time   Stability
  Data loss incidents   True durability

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Trusting OS cache blindly
-   Assuming cloud disks are always durable
-   Disabling fsync for performance
-   No crash testing
-   Mixing durability levels silently

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Define durability vs availability 2. Commit semantics 3.
WAL + fsync 4. Replication quorum 5. RPO tradeoffs

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Benefit              Tradeoff
  -------------------- -------------------
  Strong durability    Latency
  Quorum replication   Cost
  Group commit         Small loss window
  Hardware safety      Expense

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Consistency
-   Availability
-   Disaster Recovery
-   Compliance

------------------------------------------------------------------------

## 📚 14. References

-   PostgreSQL WAL Internals
-   Google Spanner Papers
-   Linux fsync semantics

------------------------------------------------------------------------

## 🧩 15. Quiz

### Q1

What guarantees durability? A. Memory write\
B. fsync\
C. Cache\
D. CSS\
Answer: B

### Q2

Why WAL? A. Styling\
B. Crash recovery\
C. SEO\
D. Fonts\
Answer: B

### Q3

What improves durability beyond single disk? A. Replication\
B. CSS\
C. CDN\
D. DNS\
Answer: A

### Q4

What increases latency most? A. Caching\
B. Synchronous fsync\
C. Compression\
D. CDN\
Answer: B

### Q5

What defines acceptable data loss? A. TTL\
B. RPO\
C. FPS\
D. CLS\
Answer: B
