---
category: backend
id: 59
nfrNumber: 59
title: Traffic Management & Load Shedding (Backend)
---

# 🚦 Traffic Management & Load Shedding (Backend)

## 🧒 Explain Like I'm 10

Imagine a restaurant 🍽️.

-   The kitchen can cook only 50 meals at a time.
-   Suddenly 500 people enter.

If everyone orders: - The kitchen gets overwhelmed 😵 - Food becomes
slow and bad quality

So the manager: - Stops new customers temporarily - Serves VIPs first -
Asks some people to wait

Servers work the same way.

When too much traffic arrives: - Systems must control, slow down, or
reject requests safely.

**Traffic management controls how requests flow.\
Load shedding drops excess traffic to protect the system.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Traffic Management & Load Shedding defines: - How incoming requests are
routed, prioritized, throttled, and rejected - How systems protect
themselves under overload - How fairness and business priorities are
preserved - How graceful degradation occurs instead of outages

Key goals: - Maintain system stability - Protect critical paths - Avoid
cascading failures - Preserve user experience where possible

Closely related to: - Rate limiting - Backpressure - Autoscaling -
Circuit breakers

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical flow:

    Client → CDN → WAF → Load Balancer → API Gateway → Services

Traffic decisions happen at: - Edge (CDN/WAF) - Gateway - Service
layer - Queue consumers

Hidden complexity: - Sudden traffic spikes - Uneven hot endpoints -
Priority inversion - Retry amplification - Partial outages -
Multi-region routing - Business SLA enforcement

At scale: - Millions of RPS - Global traffic steering - Real-time policy
updates - Automated overload responses

Traffic management becomes a real-time control system.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Fewer timeouts
-   Predictable behavior

### Business

-   Revenue protection
-   SLA compliance

### Engineering

-   Controlled failure modes
-   Easier incident response

------------------------------------------------------------------------

## 🧠 Mental Model --- Airport Runway

    Incoming Flights → Air Traffic Control → Landing Priority → Safe Landing

Too many planes → some must wait or divert.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Flash Sale Traffic Spike**

-   10× normal traffic arrives
-   Checkout latency spikes
-   Payment failures increase

Fix: - Prioritize checkout APIs - Shed non-critical traffic (search,
analytics) - Activate queue mode

Result: - Revenue protected - System stays alive

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Priority-Based Routing

**What:** Critical requests get priority.\
**How:** Header-based routing, queues.\
**Why:** Protect revenue flows.\
**Tradeoff:** Starvation risk.

------------------------------------------------------------------------

### 2️⃣ Adaptive Load Shedding

**What:** Drop traffic dynamically.\
**How:** Latency/error feedback loops.\
**Why:** Prevent collapse.\
**Tradeoff:** User rejection.

------------------------------------------------------------------------

### 3️⃣ Edge Traffic Filtering

**What:** Block bad traffic early.\
**How:** CDN/WAF rules.\
**Why:** Save backend capacity.\
**Tradeoff:** Limited context.

------------------------------------------------------------------------

### 4️⃣ Queue-Based Smoothing

**What:** Buffer bursts.\
**How:** Message queues.\
**Why:** Absorb spikes.\
**Tradeoff:** Added latency.

------------------------------------------------------------------------

### 5️⃣ Graceful Degradation

**What:** Disable non-essential features.\
**How:** Feature flags.\
**Why:** Maintain core UX.\
**Tradeoff:** Reduced functionality.

------------------------------------------------------------------------

### 6️⃣ Retry Suppression

**What:** Prevent retry storms.\
**How:** Jitter, capped retries.\
**Why:** Avoid amplification.\
**Tradeoff:** Lower success rate.

------------------------------------------------------------------------

### 7️⃣ Global Traffic Steering

**What:** Route traffic across regions.\
**How:** Geo-DNS, Anycast.\
**Why:** Load balancing globally.\
**Tradeoff:** Consistency complexity.

------------------------------------------------------------------------

## 📏 Metrics

-   Request rejection rate
-   Latency under load
-   Priority traffic success rate
-   Retry volume
-   Queue depth

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   No priority separation
-   Blind retries
-   Hard limits only
-   No degradation plan
-   Manual traffic controls

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I manage traffic using edge filtering, priority routing, adaptive
> shedding, graceful degradation, retry suppression, and global traffic
> steering to protect system stability."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit               Tradeoff
  --------------------- ---------------------
  Stability             Some users rejected
  Priority protection   Fairness
  Global routing        Complexity
  Buffering             Latency

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why shed load?\
A. Styling\
B. Prevent system collapse\
C. SEO\
D. Cache\
✅ Answer: B

**Q2:** What protects critical traffic first?\
A. CDN\
B. Priority routing\
C. Cache\
D. DNS\
✅ Answer: B
