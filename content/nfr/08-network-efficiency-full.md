---
category: frontend
difficulty: advanced
id: 8
importance: high
readTime: 28
relatedNFRs:
- 1
- 2
- 5
- 7
- 11
- 61
slug: network-efficiency
tags:
- network
- bandwidth
- latency
- compression
- http2
- http3
- batching
title: Network Efficiency
tldr: Network Efficiency minimizes data transfer size, round trips, and
  latency so applications remain fast and reliable across slow, mobile,
  and congested networks.
---

# 🌐 Network Efficiency

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine sending a backpack full of books to your friend 🎒.

-   If the bag is heavy → it takes long and costs more 🚚
-   If you pack only what's needed → it arrives fast ⚡

The internet works the same way.

Every time a website loads, it sends data across the network.

**Network efficiency means sending the smallest amount of data in the
smartest way.**

Less data + fewer trips = faster website 😊

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World           Website
  -------------------- ---------------
  Heavy bag            Large payload
  Multiple trips       Many requests
  Short route          CDN
  Packed efficiently   Compression

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Network efficiency focuses on: - Reducing payload size - Minimizing
request count - Reducing round-trip latency - Reusing connections -
Using modern protocols

Key techniques: - Compression (gzip, brotli) - HTTP/2 multiplexing -
Batching requests - CDN routing - Prefetching - Caching

Goal: \> Deliver the same experience using fewer bytes and fewer round
trips.

------------------------------------------------------------------------

### 📊 Network Cost Reality

-   Mobile networks are slow and unstable.
-   Latency dominates more than bandwidth.
-   Each request has overhead (DNS, TLS, TCP).

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Network efficiency impacts:

    Latency → Battery → Data Cost → Reliability → Scalability

At scale: - Millions of concurrent connections - Congested cellular
networks - Regional routing inefficiencies - Packet loss and retries

Inefficient networks cause: - Slow LCP - Higher infra bills - Poor
mobile UX

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Experience

-   Faster navigation
-   Less waiting on mobile
-   Consistent performance

### 💰 Business Impact

-   Lower bandwidth cost
-   Higher retention
-   Better global reach

### 🧑‍💻 Engineering Impact

-   Encourages payload discipline
-   Improves API design

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Request Cost

    DNS Lookup
     → TCP Handshake
     → TLS Negotiation
     → Request
     → Response

Each step costs time. Fewer requests = faster.

------------------------------------------------------------------------

## 🧱 6. Common Causes of Inefficiency

### ❌ Too Many Requests

-   Chatty APIs
-   Micro-assets

### ❌ Large Payloads

-   Uncompressed JSON
-   Huge images

### ❌ No Compression

-   Raw text transfer

### ❌ Legacy Protocols

-   HTTP/1.1 head-of-line blocking

### ❌ Redundant Fetching

-   No caching

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 📱 Mobile News App

**Problem** - Slow loading on 3G - High data usage

**Fix** - Enable Brotli - Bundle API responses - CDN caching - Image
compression

**Result** - 60% data reduction - Faster loads - Higher engagement

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns

### ✅ Pattern 1 --- Compression

Use gzip / brotli.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Request Batching

Combine multiple API calls.

------------------------------------------------------------------------

### ✅ Pattern 3 --- HTTP/2 or HTTP/3

Multiplex requests efficiently.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Payload Minimization

Trim JSON, remove unused fields.

------------------------------------------------------------------------

### ✅ Pattern 5 --- CDN Routing

Serve closer to users.

------------------------------------------------------------------------

## 📏 9. Measuring Network Efficiency

### 🔧 Tools

-   Chrome DevTools Network
-   WebPageTest
-   Lighthouse

### 📊 Metrics

  Metric              Meaning
  ------------------- --------------
  Transfer size       Payload cost
  Request count       Overhead
  TTFB                Latency
  Compression ratio   Efficiency
  Retry rate          Reliability

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Over batching (large failures)
-   Compressing already compressed data
-   Ignoring mobile networks
-   No monitoring

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Identify network bottlenecks 2. Reduce payloads 3.
Reduce round trips 4. Use modern protocols 5. Measure continuously

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Optimization   Tradeoff
  -------------- ---------------
  Compression    CPU
  Batching       Latency
  CDN            Cost
  Prefetch       Bandwidth
  HTTP/3         Compatibility

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Media Optimization
-   Client & Edge Caching
-   Page Load Performance
-   Rendering Strategy

------------------------------------------------------------------------

## 📚 14. References

-   https://web.dev/reduce-network-payloads/
-   https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression
-   https://web.dev/http2/

------------------------------------------------------------------------

## 🧩 15. Quiz (Self-Test)

### Q1

What dominates mobile latency? A. Bandwidth\
B. Latency\
C. CPU\
D. GPU\
Answer: B

### Q2

Which reduces request count? A. Compression\
B. Batching\
C. CDN\
D. DNS\
Answer: B

### Q3

Best compression? A. gzip\
B. brotli\
C. zip\
D. rar\
Answer: B

### Q4

Why HTTP/2 helps? A. Security\
B. Multiplexing\
C. SEO\
D. Caching\
Answer: B

### Q5

Network efficiency improves? A. Animations\
B. UX\
C. Fonts\
D. Memory\
Answer: B
