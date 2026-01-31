---
category: frontend
difficulty: advanced
id: 3
importance: critical
readTime: 28
relatedNFRs:
- 1
- 2
- 7
- 11
- 13
- 61
slug: rendering-strategy
tags:
- ssr
- ssg
- csr
- streaming
- hydration
- performance
- seo
title: Rendering Strategy
tldr: Rendering Strategy defines where and when UI is rendered (server,
  client, build-time, or streaming) to balance performance, SEO,
  scalability, interactivity, and cost.
---

# 🧩 Rendering Strategy

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine you want to draw a picture for your friend.

You have different ways to do it:

1.  Draw the whole picture **before your friend arrives**.
2.  Draw it **while your friend is watching**.
3.  Send your friend instructions so **they draw it themselves**.
4.  Show the picture piece by piece as you draw.

A website works the same way.

**Rendering strategy means where and when the website is built and shown
to the user.**

If we choose the wrong way: - The page feels slow 😴 - Google can't
understand it 🔍 - Servers become expensive 💸

If we choose the right way: - Page loads fast ⚡ - SEO is strong 📈 -
App scales well 🚀

------------------------------------------------------------------------

### 🎨 Simple Analogy

  Real World                        Website
  --------------------------------- ---------------------
  Picture drawn before arrival      Static Generation
  Artist draws live                 Server Rendering
  Friend draws themselves           Client Rendering
  Picture revealed piece-by-piece   Streaming Rendering

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Rendering strategy determines: - **Where** UI is rendered (server,
client, build-time) - **When** HTML is generated - **How** JavaScript
hydrates and becomes interactive

Primary strategies:

  Strategy        Where HTML Comes From
  --------------- ---------------------------
  CSR             Browser
  SSR             Server
  SSG             Build-time
  ISR             Cached regeneration
  Streaming SSR   Incremental server stream

Each has different tradeoffs in: - Performance - SEO - Scalability -
Cost - Complexity

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Rendering impacts the entire delivery pipeline:

    User → CDN → Server → HTML → Hydration → Interactivity → Caching

### Key System Concerns

-   **Time to First Byte**
-   **Hydration cost**
-   **Edge caching feasibility**
-   **Server CPU usage**
-   **SEO crawlability**
-   **Data freshness**
-   **Concurrency limits**

Wrong rendering strategy can: - Melt servers under load - Kill SEO -
Slow mobile UX - Increase infra costs

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Experience

-   Faster first paint
-   Faster interaction readiness
-   Reduced blank screens

### 🔍 SEO

-   Search bots read HTML better than JS-heavy pages
-   SSR / SSG improves indexing

### 💰 Cost

-   SSR increases compute
-   SSG reduces infra costs
-   Streaming balances tradeoffs

### 🧑‍💻 Developer Productivity

-   Simpler mental model
-   Easier caching
-   Predictable debugging

------------------------------------------------------------------------

## 🔍 5. Rendering Strategies Explained

### 🧩 Client-Side Rendering (CSR)

HTML is minimal. JS builds UI in browser.

Pros: - Simple deployment - Rich interactivity

Cons: - Slow first paint - Poor SEO - Heavy JS bundle

Use when: - Internal dashboards - Authenticated apps

------------------------------------------------------------------------

### 🏗️ Server-Side Rendering (SSR)

HTML generated on every request.

Pros: - Fast FCP - Good SEO

Cons: - Higher server load - Slower TTFB under scale

Use when: - SEO pages - Personalized content

------------------------------------------------------------------------

### 🧱 Static Site Generation (SSG)

HTML generated at build time.

Pros: - Fastest possible delivery - Cheap hosting - Excellent caching

Cons: - Data freshness - Long build times

Use when: - Marketing pages - Docs - Blogs

------------------------------------------------------------------------

### ♻️ Incremental Static Regeneration (ISR)

Static pages regenerate in background.

Pros: - Balance freshness + speed - CDN friendly

Cons: - Cache invalidation complexity

------------------------------------------------------------------------

### 🌊 Streaming SSR

HTML streamed progressively.

Pros: - Faster perceived load - Partial hydration

Cons: - Complexity - Debugging difficulty

------------------------------------------------------------------------

## 🧱 6. Common Mistakes

-   Using CSR for SEO pages
-   SSR everything blindly
-   Forgetting hydration cost
-   No caching layer
-   Overfetching data
-   Ignoring mobile CPU limits

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 🛍️ Marketplace Website

Requirements: - SEO product pages - Real-time pricing - Global users

Solution: - SSG for product shell - ISR for updates - Client hydration
for cart - CDN caching

Result: - Fast LCP - Fresh prices - Low infra cost

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns

### ✅ Pattern 1 --- Hybrid Rendering

Mix SSG + SSR + CSR based on route.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Edge Rendering

Use edge functions for personalization.

------------------------------------------------------------------------

### ✅ Pattern 3 --- Streaming Layouts

Render shell instantly, hydrate later.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Data Fetch Collocation

Fetch data close to rendering boundary.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Cache Everything Possible

Leverage CDN aggressively.

------------------------------------------------------------------------

## 📏 9. Measuring Rendering Effectiveness

### 🔧 Tools

-   Lighthouse
-   WebPageTest
-   Next.js analytics
-   RUM

### 📊 Metrics

  Metric            Meaning
  ----------------- ------------------
  TTFB              Server latency
  FCP               Initial render
  LCP               Main content
  Hydration time    Interactivity
  CPU usage         Client cost
  Cache hit ratio   Infra efficiency

------------------------------------------------------------------------

## ⚠️ 10. Tradeoffs

  Strategy    Strength        Weakness
  ----------- --------------- ------------------
  CSR         Interactivity   Slow first paint
  SSR         SEO             Cost
  SSG         Speed           Staleness
  ISR         Balance         Complexity
  Streaming   UX              Debugging

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Clarify traffic + SEO 2. Choose rendering per route 3.
Discuss caching 4. Mention hydration cost 5. Explain tradeoffs

------------------------------------------------------------------------

## 🔗 12. Related NFRs

-   Page Load Performance
-   Perceived Performance
-   Client Caching
-   SEO & Discoverability
-   Performance Budgets

------------------------------------------------------------------------

## 📚 13. References

-   https://nextjs.org/docs/app/building-your-application/rendering
-   https://web.dev/rendering-on-the-web/
-   https://vercel.com/blog/streaming-ssr

------------------------------------------------------------------------

## 🧩 14. Quiz (Self-Test)

### Q1

Which rendering strategy gives fastest global delivery? A. CSR\
B. SSR\
C. SSG\
D. Streaming\
Answer: C

### Q2

Which hurts SSR at scale? A. SEO\
B. Server CPU\
C. Bundle size\
D. Images\
Answer: B

### Q3

Which enables partial hydration? A. CSR\
B. SSG\
C. Streaming SSR\
D. ISR\
Answer: C

### Q4

Best strategy for dashboards? A. CSR\
B. SSG\
C. SSR\
D. Streaming\
Answer: A

### Q5

Why hybrid rendering is useful? A. Simplicity\
B. Flexibility\
C. Cost\
D. Security\
Answer: B
