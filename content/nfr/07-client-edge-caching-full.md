---
category: frontend
difficulty: advanced
id: 7
importance: critical
readTime: 30
relatedNFRs:
- 1
- 2
- 6
- 8
- 61
- 69
slug: client-edge-caching
tags:
- caching
- cdn
- http-cache
- service-worker
- edge
- performance
title: Client & Edge Caching
tldr: Client & Edge Caching reduces latency, bandwidth, and server load
  by serving data from the browser cache and CDN edges instead of the
  origin server.
---

# 🗄️ Client & Edge Caching

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine you love a comic book 📚.

-   The first time you go to the shop, you walk far to buy it.
-   After that, you keep it at home.
-   Next time you want to read it, you just open your cupboard --- super
    fast ⚡

Caching works the same way.

Instead of fetching the same data again and again from faraway
servers: - The browser keeps a copy - Nearby servers keep a copy

So pages load instantly 😊

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World            Website
  --------------------- ---------------
  Book in cupboard      Browser cache
  Local grocery store   CDN edge
  Warehouse far away    Origin server
  Reusing book          Cache hit

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Client & Edge Caching stores responses closer to users: - **Client
cache** → Browser memory / disk - **Edge cache** → CDN nodes near users

This reduces: - Network latency - Bandwidth usage - Server load - Cost

Caching uses: - HTTP cache headers - CDN rules - Service workers -
Memory caches

------------------------------------------------------------------------

### 📦 Cache Layers

    Browser Cache → Service Worker → CDN Edge → Origin Server

Each layer prevents unnecessary requests upstream.

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Caching is a **distributed consistency problem**.

Challenges: - Cache invalidation - Stale data - Multi-region
propagation - Personalized content - Security boundaries

At scale: - Billions of cache reads - Invalidation storms - Edge compute
coordination

Poor caching causes: - Thundering herds - Data inconsistency - Cost
explosions

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Experience

-   Instant page loads
-   Offline resilience
-   Smooth navigation

### 💰 Business Impact

-   Lower infra cost
-   Better scalability
-   Higher conversion

### 🧑‍💻 Engineering Impact

-   Forces data ownership clarity
-   Improves system resilience

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Cache Lookup Flow

    Request → Browser Cache?
            → Service Worker?
            → CDN Edge?
            → Origin Server

First hit wins.

------------------------------------------------------------------------

## 🧱 6. Common Failure Causes

### ❌ Missing Cache Headers

-   Everything refetched

### ❌ Over-Caching Dynamic Data

-   Stale bugs

### ❌ Cache Stampede

-   Expired keys cause spikes

### ❌ Poor Invalidation Strategy

-   Users see outdated content

### ❌ Cache Poisoning Risks

-   Security vulnerabilities

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 📰 News Website

**Problem** - Traffic spikes during breaking news - Origin overloaded

**Solution** - CDN edge caching - Stale-while-revalidate - Client cache
headers

**Result** - 95% cache hit rate - Stable origin - Faster loads

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns

### ✅ Pattern 1 --- HTTP Cache Headers

    Cache-Control: public, max-age=3600, stale-while-revalidate=86400

------------------------------------------------------------------------

### ✅ Pattern 2 --- CDN Edge Caching Rules

Cache static + semi-static routes.

------------------------------------------------------------------------

### ✅ Pattern 3 --- Service Worker Cache

Offline-first strategies.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Cache Invalidation

Purge by tag, versioning.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Cache Warming

Preload hot routes.

------------------------------------------------------------------------

## 📏 9. Measuring Cache Effectiveness

### 🔧 Tools

-   CDN dashboards
-   Browser devtools
-   RUM metrics

### 📊 Metrics

  Metric            Meaning
  ----------------- -------------
  Cache hit ratio   Efficiency
  Origin load       Cost
  Latency           UX
  Stale rate        Correctness
  Purge latency     Freshness

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Cache everything blindly
-   Forget auth boundaries
-   No invalidation strategy
-   Ignoring personalization
-   Skipping monitoring

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Explain cache layers 2. Headers and CDN rules 3.
Invalidation strategy 4. Tradeoffs 5. Security considerations

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Benefit        Tradeoff
  -------------- ------------------
  Low latency    Staleness
  Cost savings   Complexity
  Scalability    Debug difficulty
  Offline        Storage usage

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Page Load Performance
-   Offline Support
-   Network Efficiency
-   Caching Consistency

------------------------------------------------------------------------

## 📚 14. References

-   https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
-   https://web.dev/http-cache/
-   https://www.cloudflare.com/learning/cdn/what-is-caching/

------------------------------------------------------------------------

## 🧩 15. Quiz (Self-Test)

### Q1

Which layer is closest to user? A. Origin\
B. CDN\
C. Browser\
D. Database\
Answer: C

### Q2

What prevents stale content? A. max-age\
B. Invalidation\
C. gzip\
D. DNS\
Answer: B

### Q3

What causes cache stampede? A. High TTL\
B. Many expirations at once\
C. Compression\
D. Prefetch\
Answer: B

### Q4

Best metric for cache efficiency? A. LCP\
B. Cache hit ratio\
C. CLS\
D. TTFB\
Answer: B

### Q5

Why edge cache helps? A. Security\
B. Latency\
C. SEO\
D. Animations\
Answer: B
