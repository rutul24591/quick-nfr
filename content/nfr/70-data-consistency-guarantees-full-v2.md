---
category: system
id: 70
nfrNumber: 70
title: Data Consistency Guarantees (System)
---

# 🔒 Data Consistency Guarantees

## 🧒 Explain Like I'm 10

Imagine you and your friend both look at a scoreboard 🏀.

If you see: - Team A = 10 points

But your friend sees: - Team A = 8 points

Someone is confused 😵 --- which one is correct?

In computer systems, data is copied across many servers. If they don't
agree, users see wrong information.

**Data consistency guarantees define how accurately and how quickly all
parts of a system agree on the same data.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Data Consistency Guarantees define: - How updates propagate across
replicas - When reads reflect the latest writes - What anomalies are
allowed - How conflicts are resolved - What correctness level the system
promises

Common consistency models: - Strong consistency - Linearizability -
Sequential consistency - Eventual consistency - Causal consistency -
Read-your-writes consistency

Consistency interacts with: - Availability - Latency - Partition
tolerance - Scalability

(CAP theorem tradeoffs)

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Replication flow:

    Client → Leader → Replicas → Acknowledge → Read

Read paths: - Leader reads - Replica reads - Quorum reads

Hidden complexity: - Network partitions - Clock skew - Replica lag -
Conflict resolution - Multi-region latency - Write amplification -
Operational tuning

At scale: - Geo-distributed clusters - Millions of concurrent clients -
Hybrid consistency tiers

Consistency becomes a distributed agreement problem.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Correct data
-   Predictable behavior

### Business

-   Financial accuracy
-   Trust

### Engineering

-   Easier reasoning
-   Fewer bugs

------------------------------------------------------------------------

## 🧠 Mental Model --- Group Agreement

    Everyone Raises Hand → Agreement → Action

No one moves until everyone agrees (strong consistency).

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Bank Balance Race Condition**

-   User deposits ₹1000
-   Immediately withdraws ₹800
-   Read from stale replica shows old balance
-   Withdrawal incorrectly allowed

Fix: - Strong consistency for balance reads - Leader reads or quorum
reads

Result: - Correct balance enforced

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Leader-Based Replication

**What:** Single leader for writes.\
**How:** Primary-replica DBs.\
**Why:** Simplifies consistency.\
**Tradeoff:** Leader bottleneck.

------------------------------------------------------------------------

### 2️⃣ Quorum Reads/Writes

**What:** Majority agreement.\
**How:** R+W \> N rule.\
**Why:** Balance latency and correctness.\
**Tradeoff:** Higher latency.

------------------------------------------------------------------------

### 3️⃣ Strong Consistency for Critical Paths

**What:** Enforce linearizable reads.\
**How:** Leader reads only.\
**Why:** Financial correctness.\
**Tradeoff:** Reduced availability.

------------------------------------------------------------------------

### 4️⃣ Eventual Consistency for Non-Critical Data

**What:** Allow lag.\
**How:** Async replication.\
**Why:** High availability.\
**Tradeoff:** Temporary inconsistency.

------------------------------------------------------------------------

### 5️⃣ Conflict-Free Replicated Data Types (CRDTs)

**What:** Automatic conflict resolution.\
**How:** Mergeable structures.\
**Why:** Active-active systems.\
**Tradeoff:** Limited data models.

------------------------------------------------------------------------

### 6️⃣ Version Vectors & Timestamps

**What:** Track causality.\
**How:** Vector clocks.\
**Why:** Detect conflicts.\
**Tradeoff:** Metadata overhead.

------------------------------------------------------------------------

### 7️⃣ Read Repair & Anti-Entropy

**What:** Heal divergent replicas.\
**How:** Background reconciliation.\
**Why:** Long-term consistency.\
**Tradeoff:** Extra load.

------------------------------------------------------------------------

## 📏 Metrics

-   Replica lag
-   Stale read rate
-   Conflict rate
-   Write latency
-   Quorum success rate

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Using eventual consistency for money
-   Ignoring replica lag
-   No conflict resolution strategy
-   Overusing strong consistency everywhere
-   No observability

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I choose consistency models based on business correctness, using
> strong consistency for critical data and eventual consistency with
> conflict resolution for scalable paths."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit              Tradeoff
  -------------------- -------------------------
  Strong consistency   Higher latency
  High availability    Temporary inconsistency
  Active-active        Conflict complexity
  Quorums              Operational tuning

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Which model gives strongest guarantees?\
A. Eventual\
B. Strong consistency\
C. Cache\
D. DNS\
✅ Answer: B

**Q2:** Why use eventual consistency?\
A. Styling\
B. High availability and scale\
C. SEO\
D. CDN\
✅ Answer: B
