---
category: system
id: 69
nfrNumber: 69
title: Caching Consistency Strategy (System)
---

# 🧊 Caching Consistency Strategy

## 🧒 Explain Like I'm 10

Imagine you write homework answers on a whiteboard 🧑‍🏫.

Your friend copies those answers into their notebook 📓 so they don't
need to ask you again.

But later you correct a mistake on the board... Your friend's notebook
still has the old wrong answer 😵.

Now everyone gets confused.

Cache works like the notebook copy. It stores fast copies of data. If
cache and real data go out of sync → bugs happen.

**Caching consistency means keeping cached data reasonably aligned with
the real source of truth.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Caching Consistency Strategy defines: - How cached data is kept
synchronized with the source of truth - How stale data is tolerated or
prevented - How updates invalidate or refresh caches - How race
conditions and concurrency are handled - How consistency guarantees are
balanced with performance

Consistency models: - Strong consistency (rare for cache) - Eventual
consistency - Time-based consistency (TTL) - Write-through consistency -
Write-behind consistency

Goals: - Fast reads - Correct data - Predictable staleness - Controlled
cache invalidation

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical architecture:

    Client → Cache → Database
               ↑
            Invalidation / Refresh

Read flows: - Cache hit → fast - Cache miss → fetch DB → populate cache

Write flows: - Update DB → invalidate cache - Update cache → sync DB

Hidden complexity: - Cache stampede - Race conditions - Partial
invalidations - Multi-layer caches (browser, CDN, Redis) - Distributed
invalidation lag - Hot key amplification - Serialization mismatches

At scale: - Millions of keys - Multi-region caches - Tiered cache
hierarchies - Event-driven invalidation pipelines

Cache consistency becomes distributed coordination.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Correct data
-   Fast responses

### Business

-   Reduced infra cost
-   Trustworthy behavior

### Engineering

-   Predictable system behavior
-   Fewer production bugs

------------------------------------------------------------------------

## 🧠 Mental Model --- Notebook Sync

    Source Truth → Copies → Refresh Rules → Sync Drift

Copies must be refreshed responsibly.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Product Price Mismatch**

-   Price updated in DB
-   Cache still serves old price
-   User checks out wrong amount

Fix: - Cache invalidation on price update - Short TTL for pricing keys -
Idempotent refresh logic

Result: - Consistent pricing

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Cache-Aside (Lazy Loading)

**What:** App manages cache manually.\
**How:** Read-through logic in code.\
**Why:** Simple and flexible.\
**Tradeoff:** Invalidation complexity.

------------------------------------------------------------------------

### 2️⃣ Write-Through Cache

**What:** Writes go through cache.\
**How:** Cache updates before DB commit.\
**Why:** Stronger consistency.\
**Tradeoff:** Higher write latency.

------------------------------------------------------------------------

### 3️⃣ Write-Behind (Async Sync)

**What:** Cache writes sync later.\
**How:** Background flush.\
**Why:** Fast writes.\
**Tradeoff:** Data loss risk.

------------------------------------------------------------------------

### 4️⃣ TTL-Based Expiration

**What:** Auto-expire stale data.\
**How:** Time-based eviction.\
**Why:** Simple freshness control.\
**Tradeoff:** Stale window.

------------------------------------------------------------------------

### 5️⃣ Event-Driven Invalidation

**What:** Invalidate on data change events.\
**How:** Pub/Sub notifications.\
**Why:** Near-real-time consistency.\
**Tradeoff:** Event reliability dependency.

------------------------------------------------------------------------

### 6️⃣ Versioned Cache Keys

**What:** Embed version in key.\
**How:** user:v2:123.\
**Why:** Safe schema changes.\
**Tradeoff:** Cache growth.

------------------------------------------------------------------------

### 7️⃣ Stampede Protection

**What:** Prevent thundering herd.\
**How:** Locks, request coalescing.\
**Why:** Protect backend.\
**Tradeoff:** Added latency.

------------------------------------------------------------------------

## 📏 Metrics

-   Cache hit ratio
-   Stale read rate
-   Invalidation latency
-   Cache eviction rate
-   Backend load from cache misses

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   No invalidation strategy
-   Infinite TTL
-   Ignoring race conditions
-   Cache poisoning risks
-   No monitoring

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I design caching consistency using cache-aside patterns, TTLs,
> event-driven invalidation, versioned keys, and stampede protection to
> balance correctness and performance."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit              Tradeoff
  -------------------- ------------------------
  High performance     Staleness risk
  Strong consistency   Latency
  Simple TTL           Approximate freshness
  Event invalidation   Operational complexity

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why invalidate cache after writes?\
A. Styling\
B. Prevent stale data\
C. SEO\
D. CDN\
✅ Answer: B

**Q2:** What prevents cache stampede?\
A. CDN\
B. Locking / coalescing\
C. DNS\
D. Cache eviction\
✅ Answer: B
