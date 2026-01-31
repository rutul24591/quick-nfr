---
category: backend
id: 52
nfrNumber: 52
title: API Versioning (Backend)
---

# 🔄 API Versioning (Backend)

## 🧒 Explain Like I'm 10

Imagine your favorite game 🎮 gets an update.

-   Old players still want the old controls.
-   New players want new features.

If the game suddenly changes everything: - Old players get confused 😵

So the game keeps: - Version 1 - Version 2 - Version 3

Players choose what they want.

APIs work the same way.

**API versioning means allowing software to change without breaking
existing users.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

API Versioning defines: - How breaking changes are introduced safely -
How backward compatibility is maintained - How old versions are
deprecated and retired - How clients migrate predictably - How contracts
remain stable

Breaking changes include: - Field removal - Semantic changes -
Validation changes - Auth changes - Response shape changes

Goals: - Zero client breakage - Clear upgrade paths - Predictable
lifecycle - Minimal operational overhead

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical lifecycle:

    Design → Release → Support → Deprecate → Sunset → Remove

Versioning locations: - URL (/v1/users) - Headers (Accept-Version) -
Query (?version=1) - Media types

Hidden complexity: - Contract drift - Multi-version testing -
Documentation fragmentation - Client lag - Security patch propagation -
Monitoring per version

At scale: - Dozens of versions - Legacy clients for years - Contract
automation - Schema governance

APIs become long-lived public contracts.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users / Clients

-   Stability
-   Predictable upgrades

### Business

-   Safe innovation
-   Partner reliability

### Engineering

-   Controlled evolution
-   Reduced outages

------------------------------------------------------------------------

## 🧠 Mental Model --- Contract Evolution

    Stable Contract → New Contract → Dual Support → Migration → Retirement

Never break consumers unexpectedly.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Mobile App Backward Compatibility**

-   Old app versions still used by 20% users
-   Backend introduces new auth flow
-   Old clients break

Fix: - Keep v1 and v2 endpoints - Gradual client upgrade - Deprecation
notice window

Result: - No production incident

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ URI Versioning

**What:** Version in URL path.\
**How:** /api/v1/orders.\
**Why:** Simple and visible.\
**Tradeoff:** Hard to refactor routes.

------------------------------------------------------------------------

### 2️⃣ Header-Based Versioning

**What:** Version in HTTP headers.\
**How:** Accept-Version.\
**Why:** Clean URLs.\
**Tradeoff:** Harder debugging.

------------------------------------------------------------------------

### 3️⃣ Backward-Compatible Evolution

**What:** Only additive changes.\
**How:** Optional fields.\
**Why:** Avoid version bump.\
**Tradeoff:** Schema bloat.

------------------------------------------------------------------------

### 4️⃣ Consumer-Driven Contracts

**What:** Validate compatibility.\
**How:** Pact tests.\
**Why:** Prevent breaking releases.\
**Tradeoff:** Test maintenance.

------------------------------------------------------------------------

### 5️⃣ Deprecation Policy

**What:** Time-bound support window.\
**How:** Sunset headers.\
**Why:** Predictability.\
**Tradeoff:** Legacy burden.

------------------------------------------------------------------------

### 6️⃣ Version Routing Layer

**What:** Route traffic by version.\
**How:** API gateway rules.\
**Why:** Centralized control.\
**Tradeoff:** Gateway complexity.

------------------------------------------------------------------------

### 7️⃣ Automated Contract Testing

**What:** Validate schemas automatically.\
**How:** OpenAPI validation.\
**Why:** Prevent drift.\
**Tradeoff:** Tooling overhead.

------------------------------------------------------------------------

## 📏 Metrics

-   Active versions count
-   Client upgrade adoption
-   Version error rate
-   Deprecation backlog
-   Contract violations

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Breaking changes without version bump
-   No deprecation timeline
-   Version explosion
-   Hardcoding versions in clients
-   Missing compatibility tests

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I evolve APIs using backward-compatible changes, explicit versioning,
> contract testing, clear deprecation policies, and gateway-based
> routing."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit                  Tradeoff
  ------------------------ ----------------------
  Stability                Operational overhead
  Backward compatibility   Slower innovation
  Multiple versions        Maintenance cost
  Strict contracts         Tooling complexity

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why version APIs?\
A. Styling\
B. Avoid breaking clients\
C. SEO\
D. Cache\
✅ Answer: B

**Q2:** Which approach keeps URLs clean?\
A. URI versioning\
B. Header versioning\
C. Query params\
D. CDN\
✅ Answer: B
