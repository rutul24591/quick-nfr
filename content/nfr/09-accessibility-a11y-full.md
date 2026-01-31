---
category: frontend
difficulty: advanced
id: 9
importance: critical
readTime: 32
relatedNFRs:
- 1
- 2
- 10
- 11
- 29
- 80
slug: accessibility-a11y
tags:
- accessibility
- wcag
- aria
- usability
- inclusive-design
- keyboard
title: Accessibility (a11y)
tldr: Accessibility ensures that people with disabilities can perceive,
  understand, navigate, and interact with software using assistive
  technologies, keyboard navigation, and inclusive design principles.
---

# ♿ Accessibility (a11y)

------------------------------------------------------------------------

## 🧒 1. Explain Like I'm 10

Imagine you go to a playground.

Some kids: - Can run fast 🏃 - Some use wheelchairs ♿ - Some can't see
well 👀 - Some can't hear well 👂

A good playground lets **everyone play safely and happily.**

A website should do the same.

**Accessibility means building websites so everyone can use them ---
including people with disabilities.**

If a website only works for mouse users or perfect eyesight --- many
people are excluded 😞

------------------------------------------------------------------------

### 🧠 Simple Analogy

  Real World                  Website
  --------------------------- ---------------------
  Ramp for wheelchairs        Keyboard navigation
  Braille signs               Screen readers
  Traffic lights with sound   ARIA labels
  Clear signs                 Semantic HTML

------------------------------------------------------------------------

## ⚙️ 2. Engineering Definition (Intermediate)

Accessibility (a11y) ensures software can be used by people with: -
Visual impairments - Hearing impairments - Motor impairments - Cognitive
impairments - Temporary disabilities

It focuses on: - Semantic HTML - Keyboard navigation - Screen reader
compatibility - Color contrast - Focus management - ARIA roles

Primary standards: - WCAG (Web Content Accessibility Guidelines) - ARIA
specifications

------------------------------------------------------------------------

### 📊 Core Accessibility Pillars (POUR)

  Pillar           Meaning
  ---------------- -----------------------------
  Perceivable      Users can perceive content
  Operable         Users can operate interface
  Understandable   UI is predictable
  Robust           Works across assistive tech

------------------------------------------------------------------------

## 🧠 3. Advanced System Perspective

Accessibility is a **legal, ethical, and engineering responsibility.**

At scale: - Millions rely on assistive tech - Compliance requirements
exist (ADA, EN 301 549) - Accessibility regressions cause lawsuits and
brand damage

Engineering challenges: - Component libraries must be accessible by
default - Keyboard flow across dynamic UIs - Screen reader performance -
Virtualized lists and ARIA complexity

Accessibility must be built into design systems --- not patched later.

------------------------------------------------------------------------

## 🎯 4. Why It Matters

### 👤 User Impact

-   Equal access
-   Independence
-   Dignity

### 💰 Business Impact

-   Legal compliance
-   Larger user base
-   Brand trust

### 🧑‍💻 Engineering Impact

-   Better code quality
-   Clear semantics
-   Strong UX discipline

------------------------------------------------------------------------

## 🔍 5. Mental Model -- Assistive Interaction Flow

    User → Assistive Tech → Browser Accessibility Tree → DOM → App Logic

Your code directly affects the accessibility tree.

------------------------------------------------------------------------

## 🧱 6. Common Accessibility Failures

### ❌ No Keyboard Support

-   Click-only UI

### ❌ Poor Contrast

-   Text unreadable

### ❌ Missing Labels

-   Screen readers confused

### ❌ Focus Traps

-   Keyboard stuck

### ❌ Dynamic Content Not Announced

-   Silent updates

------------------------------------------------------------------------

## 🧪 7. Real-World Scenario

### 🏦 Banking Dashboard

Problem: - Charts inaccessible - Dropdowns unusable via keyboard

Fix: - Semantic HTML - ARIA roles - Focus management

Result: - Screen reader compatibility - Compliance achieved

------------------------------------------------------------------------

## 🛠️ 8. Solution Patterns

### ✅ Pattern 1 --- Semantic HTML First

Use proper elements.

------------------------------------------------------------------------

### ✅ Pattern 2 --- Keyboard Navigation

Tab order and focus rings.

------------------------------------------------------------------------

### ✅ Pattern 3 --- ARIA Only When Needed

Avoid overusing roles.

------------------------------------------------------------------------

### ✅ Pattern 4 --- Color Contrast Enforcement

Design tokens validation.

------------------------------------------------------------------------

### ✅ Pattern 5 --- Accessibility Testing Automation

Lint + CI audits.

------------------------------------------------------------------------

## 📏 9. Measuring Accessibility

### 🔧 Tools

-   Lighthouse a11y
-   Axe DevTools
-   Screen readers
-   Keyboard testing

### 📊 Metrics

  Metric                 Meaning
  ---------------------- -------------
  WCAG violations        Compliance
  Keyboard coverage      Operability
  Contrast ratio         Readability
  Screen reader errors   Robustness
  Regression count       Stability

------------------------------------------------------------------------

## ⚠️ 10. Common Mistakes

-   Relying only on automated tools
-   Using divs everywhere
-   Removing focus outlines
-   Ignoring screen readers
-   Forgetting alt text

------------------------------------------------------------------------

## 🎤 11. Interview Framing

Answer flow: 1. Define accessibility 2. POUR principles 3. Keyboard +
semantics 4. Automation + audits 5. Tradeoffs

------------------------------------------------------------------------

## ⚖️ 12. Tradeoffs

  Benefit       Tradeoff
  ------------- --------------------
  Inclusivity   Dev time
  Compliance    Design constraints
  Quality UX    Slower iteration
  Stability     Testing effort

------------------------------------------------------------------------

## 🔗 13. Related NFRs

-   Device Responsiveness
-   Error UX
-   Cross-Browser Compatibility
-   Accessibility Automation

------------------------------------------------------------------------

## 📚 14. References

-   https://www.w3.org/WAI/standards-guidelines/wcag/
-   https://developer.mozilla.org/en-US/docs/Web/Accessibility
-   https://www.a11yproject.com/

------------------------------------------------------------------------

## 🧩 15. Quiz (Self-Test)

### Q1

What does POUR stand for? A. Performance\
B. Perceivable\
C. Operable\
D. Both B and C\
Answer: D

### Q2

Which helps screen readers most? A. div\
B. span\
C. Semantic HTML\
D. CSS\
Answer: C

### Q3

What breaks keyboard users? A. Animations\
B. Focus trap\
C. CDN\
D. Compression\
Answer: B

### Q4

What enforces contrast? A. WCAG\
B. DNS\
C. CDN\
D. HTTP\
Answer: A

### Q5

Best accessibility practice? A. Patch later\
B. Automate testing\
C. Ignore screen readers\
D. Remove focus\
Answer: B
