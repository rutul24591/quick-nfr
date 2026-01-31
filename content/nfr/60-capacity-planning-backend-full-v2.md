---
category: backend
id: 60
nfrNumber: 60
title: Capacity Planning (Backend)
---

# 📊 Capacity Planning (Backend)

## 🧒 Explain Like I'm 10

Imagine you are planning a birthday party 🎉.

You must decide: - How many chairs to arrange 🪑 - How much food to cook
🍕 - How many balloons to buy 🎈

If too few: - Guests don't get seats - Food runs out 😢

If too many: - Money is wasted 💸

Servers are the same. We must decide how much computer power to prepare.

**Capacity planning means preparing enough system capacity to handle
future traffic safely without wasting money.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Capacity Planning defines: - How much traffic a system can handle
today - How fast demand is growing - How infrastructure should scale
over time - How safety buffers are maintained for spikes and failures -
How cost, performance, and reliability are balanced

Capacity includes: - CPU - Memory - Disk I/O - Network bandwidth -
Database connections - Queue throughput

Goals: - Prevent outages - Avoid over-provisioning - Enable predictable
scaling - Support business growth

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical planning cycle:

    Measure → Forecast → Model → Provision → Test → Monitor → Adjust

Capacity layers:

    Traffic → API → Compute → Cache → DB → Network → Storage

Hidden complexity: - Traffic seasonality - Flash spikes - Noisy
neighbors - Hardware heterogeneity - Regional growth differences -
Software inefficiencies - Unknown product launches

At scale: - Millions of users - Multi-region capacity pools - Reserved
capacity contracts - Cross-team coordination

Capacity planning becomes forecasting + engineering discipline.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Fast response times
-   Reliable service

### Business

-   Revenue protection
-   Cost predictability

### Engineering

-   Fewer firefights
-   Stable architectures

------------------------------------------------------------------------

## 🧠 Mental Model --- Highway Lanes

    Cars (Traffic) → Lanes (Capacity) → Speed (Latency)

Too few lanes → traffic jams\
Too many lanes → wasted construction

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Product Launch Traffic Spike**

-   Marketing campaign launches
-   Traffic increases 5× overnight
-   DB connection pool saturates
-   API latency spikes

Prepared system: - Pre-scaled capacity - Load tests validated limits -
Autoscaling buffers

Result: - Smooth launch

Unprepared system: - Outage - Emergency scaling

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Baseline Load Measurement

**What:** Measure current utilization.\
**How:** Metrics dashboards.\
**Why:** Know starting point.\
**Tradeoff:** Historical bias.

------------------------------------------------------------------------

### 2️⃣ Growth Forecasting

**What:** Predict future demand.\
**How:** Trend analysis, product roadmap.\
**Why:** Avoid surprises.\
**Tradeoff:** Forecast uncertainty.

------------------------------------------------------------------------

### 3️⃣ Load Testing & Stress Testing

**What:** Validate limits.\
**How:** Synthetic traffic tools.\
**Why:** Find bottlenecks early.\
**Tradeoff:** Test environment cost.

------------------------------------------------------------------------

### 4️⃣ Headroom Buffers

**What:** Reserve spare capacity.\
**How:** 30--50% buffer.\
**Why:** Absorb spikes.\
**Tradeoff:** Idle cost.

------------------------------------------------------------------------

### 5️⃣ Autoscaling Policies

**What:** Dynamically scale capacity.\
**How:** CPU/QPS triggers.\
**Why:** Elastic efficiency.\
**Tradeoff:** Scaling lag.

------------------------------------------------------------------------

### 6️⃣ Bottleneck Decomposition

**What:** Identify weakest link.\
**How:** Saturation analysis.\
**Why:** Targeted investment.\
**Tradeoff:** Requires expertise.

------------------------------------------------------------------------

### 7️⃣ Capacity Reviews & Game Days

**What:** Periodic validation.\
**How:** Drill simulations.\
**Why:** Continuous accuracy.\
**Tradeoff:** Engineering effort.

------------------------------------------------------------------------

## 📏 Metrics

-   Peak utilization
-   P95 latency at load
-   Autoscaling events
-   Capacity buffer percentage
-   Cost per unit traffic

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Planning only for averages
-   Ignoring seasonality
-   No load testing
-   No buffer capacity
-   Static provisioning

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I plan capacity using baseline measurements, growth forecasting, load
> testing, headroom buffers, autoscaling, and regular capacity reviews
> to balance cost and reliability."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit             Tradeoff
  ------------------- ------------------
  High reliability    Higher cost
  Lean provisioning   Risk of overload
  Heavy buffers       Idle spend
  Autoscaling         Scaling lag

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why keep headroom buffer?\
A. Styling\
B. Absorb traffic spikes\
C. SEO\
D. Cache\
✅ Answer: B

**Q2:** What validates true capacity limits?\
A. Guessing\
B. Load testing\
C. CSS\
D. Fonts\
✅ Answer: B
