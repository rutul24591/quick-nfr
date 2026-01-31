---
category: backend
id: 43
nfrNumber: 43
title: Authorization Model (Backend)
---

# 🛂 Authorization Model (Backend)

## 🧒 Explain Like I'm 10

Imagine a big building 🏢.

Everyone can enter the lobby. But: - Only teachers can enter staff
rooms - Only managers can enter control rooms - Only you can open your
locker

Even if you prove who you are (authentication), you still need
permission to access things.

**Authorization decides what you are allowed to do.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Authorization defines: - Which users or services can access which
resources - What actions they can perform - Under what conditions access
is allowed or denied

It governs: - Permissions - Roles - Policies - Scopes - Resource
ownership

Authorization is evaluated **after authentication** and must be fast,
correct, and auditable.

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Typical flow:

    Request → Authenticate → Extract Claims → Policy Evaluation → Allow / Deny → Audit

Authorization data sources: - Tokens (JWT claims) - Policy engines -
Databases - Attribute providers

Hidden complexity: - Policy explosion - Permission drift - Token
staleness - Cross-service consistency - Tenant isolation - Policy
versioning - Emergency overrides

At scale: - Millions of policy evaluations per second - Distributed
policy caching - Multi-tenant isolation requirements

Authorization bugs often become security incidents.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Data privacy
-   Safe access control

### Business

-   Compliance
-   Risk reduction

### Engineering

-   Prevents privilege escalation
-   Predictable security behavior

------------------------------------------------------------------------

## 🧠 Mental Model --- Decision Triangle

    Identity + Resource + Policy → Decision

If any input is wrong → wrong access granted or denied.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**SaaS Admin Privilege Escalation**

Bug: - Frontend hides admin buttons - Backend missing authorization
checks - User calls API directly and deletes data

Fix: - Server-side policy enforcement - Default deny model - Centralized
authorization service

Result: - Zero unauthorized access

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Role-Based Access Control (RBAC)

**What:** Permissions grouped into roles.\
**How:** Admin, Editor, Viewer roles.\
**Why:** Simple and easy to manage.\
**Tradeoff:** Hard to express complex rules.

------------------------------------------------------------------------

### 2️⃣ Attribute-Based Access Control (ABAC)

**What:** Decisions based on attributes.\
**How:** user.department == resource.owner.\
**Why:** Flexible policies.\
**Tradeoff:** Harder to reason and debug.

------------------------------------------------------------------------

### 3️⃣ Policy Engine (OPA / Cedar)

**What:** Centralized policy evaluation.\
**How:** Rego / policy DSL.\
**Why:** Consistent enforcement across services.\
**Tradeoff:** Operational complexity.

------------------------------------------------------------------------

### 4️⃣ Fine-Grained Scopes

**What:** Narrow permissions.\
**How:** read:orders, write:orders.\
**Why:** Least privilege principle.\
**Tradeoff:** Token bloat.

------------------------------------------------------------------------

### 5️⃣ Default Deny Model

**What:** Block unless explicitly allowed.\
**How:** Deny by default policies.\
**Why:** Prevents accidental exposure.\
**Tradeoff:** More configuration upfront.

------------------------------------------------------------------------

### 6️⃣ Centralized Policy Management

**What:** Single source of truth.\
**How:** Versioned policy repository.\
**Why:** Governance and auditability.\
**Tradeoff:** Change velocity slower.

------------------------------------------------------------------------

### 7️⃣ Continuous Authorization Auditing

**What:** Monitor access patterns.\
**How:** Logs + anomaly detection.\
**Why:** Detect abuse early.\
**Tradeoff:** Data volume.

------------------------------------------------------------------------

## 📏 Metrics

-   Authorization latency
-   Deny rate
-   Policy evaluation errors
-   Privilege escalation incidents
-   Audit log coverage

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Client-side only checks
-   Overpowered roles
-   No audit trails
-   Hardcoded permissions
-   No policy versioning

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I enforce authorization server-side using RBAC/ABAC with default-deny
> policies, centralized evaluation, fine-grained scopes, and continuous
> auditing."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit                Tradeoff
  ---------------------- ------------------------
  Fine-grained control   Policy complexity
  Centralized policies   Latency
  RBAC simplicity        Limited expressiveness
  ABAC flexibility       Debugging difficulty

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** What comes after authentication?\
A. Caching\
B. Authorization\
C. CDN\
D. CSS\
✅ Answer: B

**Q2:** Which model is most flexible?\
A. RBAC\
B. ABAC\
C. CDN\
D. Cache\
✅ Answer: B
