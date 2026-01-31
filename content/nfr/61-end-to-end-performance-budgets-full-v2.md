---
category: system
id: 61
nfrNumber: 61
title: End-to-End Performance Budgets (System)
---

# ⏱️ End-to-End Performance Budgets

## 🧒 Explain Like I'm 10

Imagine you are running a race 🏃.

You want to finish in **10 minutes**. So you divide your time: - 2
minutes warm‑up - 5 minutes running - 3 minutes cooling down

If any part becomes slow → you miss your goal.

Software works the same way. A page load or API call has many steps: -
Network - Server - Database - Frontend rendering

Each step gets a **time budget**.

**Performance budget means setting maximum allowed time (or size) for
every part so the whole system stays fast.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

End-to-End Performance Budgets define: - Target latency, size, and
resource limits across the full request lifecycle - How budgets are
allocated across components - How regressions are detected and blocked -
How performance becomes a product requirement

Budgets may include: - Page load time - API latency - Bundle size - DB
query time - CPU usage - Memory footprint

Goals: - Predictable performance - Prevent gradual slowdowns - Objective
decision making - Continuous optimization

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical request path:

    Browser → CDN → API Gateway → Service → Cache → DB → Response → Render

Budget slicing:

    Total Budget (2s)
     ├── Network: 300ms
     ├── Gateway: 100ms
     ├── Service: 400ms
     ├── DB: 500ms
     ├── Serialization: 100ms
     ├── Frontend Render: 600ms

Hidden complexity: - Variance across devices - Tail latency - Cold
starts - Third‑party latency - Network jitter - Regression creep -
Cross‑team ownership

At scale: - Multiple teams share budgets - Automated enforcement in CI -
SLO alignment

Performance budgets become governance tools.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Faster apps
-   Better UX

### Business

-   Higher conversion
-   Better retention

### Engineering

-   Clear performance ownership
-   Faster diagnosis

------------------------------------------------------------------------

## 🧠 Mental Model --- Pie Chart Budget

    Total Time Pie → Each Slice Must Fit

If one slice grows → others must shrink or total breaks.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Slow Checkout Page**

Target: 2s load time\
Actual: 3.5s

Investigation: - Images exceed size budget - JS bundle too large - DB
query slower than allocation

Fix: - Image compression - Code splitting - Query indexing

Result: - Back under budget

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Global Performance Targets

**What:** Define overall SLA budgets.\
**How:** LCP \< 2.5s, API \< 500ms.\
**Why:** Clear expectations.\
**Tradeoff:** Hard targets under variance.

------------------------------------------------------------------------

### 2️⃣ Budget Decomposition

**What:** Split budget across layers.\
**How:** Architecture reviews.\
**Why:** Accountability.\
**Tradeoff:** Coordination cost.

------------------------------------------------------------------------

### 3️⃣ Automated Budget Enforcement

**What:** Block regressions automatically.\
**How:** Lighthouse CI, bundle checks.\
**Why:** Prevent slow creep.\
**Tradeoff:** Developer friction.

------------------------------------------------------------------------

### 4️⃣ Continuous Telemetry Feedback

**What:** Measure real performance.\
**How:** RUM + tracing.\
**Why:** Validate assumptions.\
**Tradeoff:** Observability cost.

------------------------------------------------------------------------

### 5️⃣ Tail Latency Optimization

**What:** Optimize P95/P99.\
**How:** Caching, parallelism.\
**Why:** Real user experience.\
**Tradeoff:** Engineering effort.

------------------------------------------------------------------------

### 6️⃣ Third‑Party Budget Contracts

**What:** Limit external impact.\
**How:** Timeouts, SLAs.\
**Why:** Predictability.\
**Tradeoff:** Reduced integrations.

------------------------------------------------------------------------

### 7️⃣ Budget Governance Reviews

**What:** Regular budget audits.\
**How:** Quarterly reviews.\
**Why:** Prevent drift.\
**Tradeoff:** Process overhead.

------------------------------------------------------------------------

## 📏 Metrics

-   End‑to‑end latency (P50 / P95 / P99)
-   Bundle size growth
-   Budget violations
-   Regression frequency
-   User experience scores

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   No explicit budgets
-   Ignoring tail latency
-   Manual enforcement
-   Blaming infra only
-   No ownership

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I define end‑to‑end budgets, decompose them across layers, enforce
> them automatically in CI, and monitor real user metrics to prevent
> performance regressions."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit            Tradeoff
  ------------------ -----------------------
  Predictable UX     Developer constraints
  Fast detection     Tooling investment
  Clear ownership    Coordination overhead
  High performance   Optimization cost

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** What is a performance budget?\
A. Money\
B. Maximum allowed time or size\
C. Cache\
D. Styling\
✅ Answer: B

**Q2:** Why split budgets across layers?\
A. Styling\
B. Accountability and diagnosis\
C. SEO\
D. CDN\
✅ Answer: B
