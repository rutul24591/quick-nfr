---
category: backend
difficulty: advanced
id: 34
importance: critical
readTime: 75
relatedNFRs:
- 31
- 32
- 33
- 35
slug: throughput-capacity-backend
tags:
- throughput
- capacity
- queueing
- backpressure
- concurrency
- saturation
- load-testing
title: Throughput Capacity (Backend)
tldr: Throughput Capacity defines how much work a backend system can
  sustainably process per unit time while remaining stable, predictable,
  and cost‑efficient under peak load.
---

# 🚦 Throughput Capacity (Backend)

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine a highway 🛣️.

-   If only a few cars drive → everything flows smoothly 🚗💨
-   If too many cars enter → traffic jam happens 🚧
-   If more cars keep coming → the road breaks down completely 😵

Servers are like highways.

Requests are like cars. CPU, memory, DB connections are lanes.

**Throughput capacity means how many requests your system can safely
handle at once without traffic jams or crashes.**

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World           Backend
  -------------------- -------------------
  Highway lanes        CPU cores
  Toll booth           Database
  Traffic lights       Rate limits
  Traffic police       Backpressure
  Rush hour planning   Capacity planning

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Throughput =\
\> Number of requests / messages / jobs processed per unit time.

Measured as: - Requests per second (RPS) - Events per second - Jobs per
minute - MB/sec throughput

Capacity means: - Maximum sustainable throughput before saturation - Not
peak burst capability

Key concepts: - Concurrency - Queue depth - Service time - Resource
saturation - Backpressure

Throughput is constrained by the slowest bottleneck.

------------------------------------------------------------------------

### 📊 Throughput Equation (Simplified)

    Throughput ≈ Concurrency / Average Processing Time

Example: - 100 concurrent workers - Each request takes 200ms\
→ \~500 RPS max

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Throughput is governed by queueing theory.

    Arrival Rate (λ) → Queue → Workers → Completion Rate (μ)

If: - λ \< μ → system stable - λ ≈ μ → latency explodes - λ \> μ →
backlog grows infinitely

Hidden complexities: - Lock contention - GC pauses - Network jitter -
Cache misses - DB connection limits - Retry amplification

At scale: - Coordinating thousands of concurrent clients - Handling
uneven traffic spikes - Avoiding cascading overload

Throughput failures often look like latency incidents first.

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Impact

-   Faster responses under load
-   Fewer timeouts

### 💰 Business Impact

-   Handles growth safely
-   Prevents revenue loss during peaks

### 🧑‍💻 Engineering Impact

-   Predictable scaling
-   Controlled costs

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Saturation Curve

    Low Load → Linear Growth → Knee Point → Saturation → Collapse

Always operate before the knee point.

------------------------------------------------------------------------

## 🧱 6. Common Throughput Failures

### ❌ No Backpressure

System melts down.

### ❌ Oversubscription

Too many threads/connections.

### ❌ Shared Locks

Hidden bottlenecks.

### ❌ Retry Storms

Artificial load.

### ❌ Underestimated Peaks

Capacity surprises.

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 🎟️ Ticket Sale Spike

Problem: - 50k users hit API simultaneously - DB connection pool
exhausted - API latency spikes to 20s

Fix: - Add queue buffer - Enable request shedding - Cache hot
inventory - Increase worker pool

Result: - Stable checkout throughput

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns (With Details)

### ✅ Pattern 1 --- Horizontal Worker Scaling

**What:** Increase number of parallel workers.\
**How:** Add pods, threads, consumers.\
**Why:** More concurrent processing increases throughput.\
**Tradeoff:** Coordination overhead and cost.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Batching

**What:** Process multiple requests together.\
**How:** Bulk DB writes, batch APIs.\
**Why:** Reduces per-request overhead.\
**Tradeoff:** Increased latency for individual requests.

------------------------------------------------------------------------

### ✅ Pattern 3 --- Async Pipelines

**What:** Decouple slow operations.\
**How:** Message queues, background workers.\
**Why:** Frees request threads quickly.\
**Tradeoff:** Eventual consistency.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Backpressure & Load Shedding

**What:** Reject or slow traffic when saturated.\
**How:** Rate limits, queue size caps, 429 responses.\
**Why:** Prevents system collapse.\
**Tradeoff:** Some requests fail intentionally.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Hot Path Caching

**What:** Cache frequently accessed data.\
**How:** Redis, in‑memory caches.\
**Why:** Removes DB bottlenecks.\
**Tradeoff:** Invalidation complexity.

------------------------------------------------------------------------

### ✅ Pattern 6 --- Resource Pool Tuning

**What:** Right-size thread pools and connections.\
**How:** Measure utilization and adjust.\
**Why:** Avoids thrashing and starvation.\
**Tradeoff:** Requires continuous tuning.

------------------------------------------------------------------------

### ✅ Pattern 7 --- Capacity Modeling & Load Testing

**What:** Simulate production traffic.\
**How:** k6, JMeter, shadow traffic.\
**Why:** Finds limits before users do.\
**Tradeoff:** Infrastructure cost.

------------------------------------------------------------------------

## 📏 9. Measuring Throughput Health

### 🔧 Tools

-   Load testing tools
-   APM dashboards
-   Queue metrics
-   OS metrics

### 📊 Metrics

  Metric               Meaning
  -------------------- --------------------
  RPS capacity         Maximum throughput
  Queue depth          Saturation
  Worker utilization   Efficiency
  Error rate           Overload
  Cost per request     Economics

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Scaling without measuring
-   Ignoring backpressure
-   Confusing throughput with latency
-   No load tests
-   Static capacity assumptions

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Define throughput goal 2. Identify bottleneck 3.
Concurrency model 4. Backpressure strategy 5. Cost tradeoffs

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Benefit               Tradeoff
  --------------------- -----------
  High throughput       Cost
  Aggressive batching   Latency
  Large buffers         Memory
  Heavy caching         Staleness

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Scalability
-   Reliability
-   Latency
-   Cost Optimization

------------------------------------------------------------------------

## 📚 14. References

-   Queueing Theory Basics
-   Google SRE Capacity Planning
-   Designing Data‑Intensive Applications

------------------------------------------------------------------------

## 🧩 15. Quiz

### Q1

What defines throughput? A. Memory\
B. Requests per time\
C. Disk size\
D. CSS\
Answer: B

### Q2

What happens near saturation? A. Latency explodes\
B. Faster responses\
C. Less memory\
D. Better UX\
Answer: A

### Q3

Why backpressure? A. Styling\
B. Prevent overload\
C. SEO\
D. Fonts\
Answer: B

### Q4

What improves throughput most safely? A. Bigger servers\
B. Horizontal scaling\
C. CSS\
D. Images\
Answer: B

### Q5

Why load testing? A. Styling\
B. Discover limits\
C. SEO\
D. Fonts\
Answer: B
