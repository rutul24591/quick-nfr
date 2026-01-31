---
category: system
id: 67
nfrNumber: 67
title: Privacy & Data Governance (System)
---

# 🔐 Privacy & Data Governance

## 🧒 Explain Like I'm 10

Imagine you have a diary 📔.

-   Some pages are private (secrets).
-   Only you or your parents can read them.
-   You decide who can see what.
-   If someone copies your diary, you should know.

In software, user data is like that diary. Names, emails, payments,
location --- all must be protected.

**Privacy & Data Governance means deciding how data is collected,
stored, shared, protected, and deleted safely and legally.**

------------------------------------------------------------------------

## ⚙️ Engineering Definition

Privacy & Data Governance defines: - What data can be collected and
why - How data is classified and protected - Who can access which data -
How long data is retained - How data is audited, deleted, and exported -
How regulations are enforced

Covers: - Personally Identifiable Information (PII) - Financial data -
Health data - Behavioral analytics - Logs and telemetry

Goals: - User trust - Legal compliance - Risk reduction - Operational
clarity

------------------------------------------------------------------------

## 🧠 Advanced System Perspective

Data lifecycle:

    Collect → Classify → Store → Use → Share → Retain → Delete → Audit

Data domains:

    App → DB → Cache → Logs → Analytics → Backups → Partners

Hidden complexity: - Shadow data copies - Backup retention leaks -
Cross-border data residency - Access sprawl - Forgotten test datasets -
Vendor sharing risk - Schema evolution impacts

At scale: - Petabytes of data - Multiple jurisdictions (GDPR, CCPA,
HIPAA) - Automated classification systems - Privacy engineering teams

Data governance becomes legal + technical orchestration.

------------------------------------------------------------------------

## 🎯 Why It Matters

### Users

-   Privacy protection
-   Control over personal data

### Business

-   Regulatory compliance
-   Brand trust
-   Avoid fines

### Engineering

-   Clear data ownership
-   Reduced risk

------------------------------------------------------------------------

## 🧠 Mental Model --- Data Vault

    Data → Locked Vault → Access Rules → Audit Trail

Only authorized people can touch sensitive data.

------------------------------------------------------------------------

## 🧪 Real-World Scenario

**Accidental PII Leak in Logs**

-   Developer logs full user objects
-   Logs exported to analytics vendor
-   PII exposed

Fix: - Log masking - Data classification rules - Log scanning
automation - Vendor data agreements

Result: - Leak prevented going forward

------------------------------------------------------------------------

## 🛠️ Solution Patterns (Deep)

### 1️⃣ Data Classification & Tagging

**What:** Label sensitivity levels.\
**How:** PII tags, metadata.\
**Why:** Apply correct controls.\
**Tradeoff:** Governance overhead.

------------------------------------------------------------------------

### 2️⃣ Access Control & Least Privilege

**What:** Restrict who can access data.\
**How:** RBAC, ABAC.\
**Why:** Reduce breach impact.\
**Tradeoff:** Operational friction.

------------------------------------------------------------------------

### 3️⃣ Encryption & Tokenization

**What:** Protect data at rest and in transit.\
**How:** KMS, token vaults.\
**Why:** Breach containment.\
**Tradeoff:** Key management complexity.

------------------------------------------------------------------------

### 4️⃣ Data Retention & Right to Erasure

**What:** Delete data when no longer needed.\
**How:** TTL policies, purge workflows.\
**Why:** Regulatory compliance.\
**Tradeoff:** Recovery difficulty.

------------------------------------------------------------------------

### 5️⃣ Audit Logging & Lineage Tracking

**What:** Track data usage.\
**How:** Immutable audit logs.\
**Why:** Accountability.\
**Tradeoff:** Storage cost.

------------------------------------------------------------------------

### 6️⃣ Consent Management

**What:** Track user permissions.\
**How:** Consent service.\
**Why:** Legal compliance.\
**Tradeoff:** UX complexity.

------------------------------------------------------------------------

### 7️⃣ Vendor & Data Sharing Governance

**What:** Control third-party sharing.\
**How:** Data contracts.\
**Why:** Prevent leakage.\
**Tradeoff:** Slower partnerships.

------------------------------------------------------------------------

## 📏 Metrics

-   PII access violations
-   Data deletion SLA compliance
-   Audit completeness
-   Encryption coverage
-   Vendor data exposure count

------------------------------------------------------------------------

## ⚠️ Common Mistakes

-   Over-collecting data
-   Storing secrets in logs
-   No deletion workflows
-   Weak access controls
-   Ignoring backups

------------------------------------------------------------------------

## 🎤 Interview Framing

> "I manage privacy and data governance using classification,
> least-privilege access, encryption, retention automation, audit
> logging, and consent management aligned with regulatory requirements."

------------------------------------------------------------------------

## ⚖️ Tradeoffs

  Benefit             Tradeoff
  ------------------- ----------------------
  Strong privacy      Operational overhead
  Compliance          Reduced agility
  Auditability        Storage cost
  Data minimization   Reduced analytics

------------------------------------------------------------------------

## 🧩 Quiz

**Q1:** Why classify data?\
A. Styling\
B. Apply correct protection\
C. SEO\
D. Cache\
✅ Answer: B

**Q2:** What enforces who can access data?\
A. CDN\
B. Access control\
C. Cache\
D. DNS\
✅ Answer: B
