# Yggdrasil Design System – Documentation&#x20;

>

## Contents

- About Yggdrasil
- Design System Principles
  - Purposeful Simplicity
  - Intuitive Progression
  - Adaptive Consistency
  - Functional Transparency
  - Systems Thinking
- Grid System
- Responsive Design
- About Variables
- Colour Variables
- Size Variables
- Typography Variables
- Accessibility & WCAG
- Date Formatting
- Relative Dates
- Formatting Numbers
- Continuous Improvement (Vegrbót)
- Feature Checklist

---

## About Yggdrasil

Yggdrasil takes its name from the world tree of Norse mythology. In the same way the tree connects realms, the Yggdrasil Design System unifies all aspects of our digital experience—components, guidelines, and patterns.

---

## Design System Principles

### 1. Purposeful Simplicity

Create clarity with intention. Remove unnecessary complexity. Use whitespace, hierarchy, and essential functional elements.

### 2. Intuitive Progression

Design user journeys that feel natural and effortless—clear entry points, progressive disclosure, and contextual cues.

### 3. Adaptive Consistency

Maintain cohesion while allowing patterns to evolve. Consistency exists to improve clarity, not restrict iteration.

### 4. Functional Transparency

Interfaces should clearly signal their purpose. Use clear states, affordances, recognisable patterns, and visible feedback.

### 5. Systems Thinking

Design as an interconnected ecosystem. Every decision affects other patterns—consider extensibility and scalability.

---

## Grid System (Soft 4px Grid)

Yggdrasil uses a 4px soft grid applied to:

- Spacing
- Padding
- Border radius
- Gaps
- Line height

Naming uses numeric scaling (050 = 2px, 100 = 4px, 400 = 16px, etc.).

---

## Responsive Design

- Desktop‑first approach with adaptation for smaller screens
- Maintain functionality across devices
- Use progressive disclosure thoughtfully on mobile
- Consider interaction modes (touch, mouse, keyboard)
- Ensure performance and accessibility across breakpoints

---

## About Variables

Variables form the foundation of reusable design:

- **Colour variables:** primitives + semantic collections
- **Size variables:** spacing, icon sizes, radii, button/input dimensions
- **Typography variables:** families, sizes, line heights, weights

These act as a single source of truth enabling scalable, maintainable design.

---

## Colour Variables

### Primitive Colours

Raw foundational values used for all derived semantics.

### Semantic Colours

Component‑agnostic, grouped into:

- Surface
- Text
- Border
- Icon
- Charts

Includes separate semantic definitions for **light** and **dark** mode.

---

## Size Variables

Includes:

- Spacing scale (0 → 3200)
- Radii (button, chip, input, card, widget, modal)
- Icon scale (12px → 48px)
- Button sizes (S/M/L)
- Input sizes (M/L)

---

## Typography Variables

Categories include:

- Titles (S/M/L)
- Headings (S/M/L)
- Body (S/M/L)
- Labels (XS/S/M/L)
- Buttons (S/M/L)
- Code text
- Content titles

All built from variables that combine family, size, weight, and line height.

---

## Accessibility & WCAG

Yggdrasil aligns with **WCAG 2.0 AA**:

- Proper contrast ratios
- Semantic HTML
- Logical keyboard navigation
- Clear focus states
- ARIA support
- Alt text and assistive‑friendly patterns

---

## Date Formatting

- Prefer human‑readable formats (e.g., `20 Jan 2025`)
- Hide year when in current year except in charts or time ranges that require it

---

## Relative Dates

Useful for recency-based contexts:

- Last modified
- Comments & notes
- Activity feeds

Often paired with a popover showing full date/time + author.

---

## Formatting Numbers

- **Space** as thousand separator (e.g., `10 000`, `1 000 000`)
- Abbreviations: `23.5K`, `1.25M`
- Tables always right‑align numeric columns

---

## Continuous Improvement (Vegrbót)

Like the ever-evolving threads of Wyrd, the Yggdrasil Design System is a living artefact, not a static product. It embraces **Vegrbót, continuously forging a better path** for our products and users. Our commitment to improvement translates into:\


- \*\*Iterative Refinement: \*\*Regular updates fuelled by implementation feedback, ensuring practical application and relevance.
- \*\*User-Centric Validation: \*\*Leveraging user research, user data and testing to ensure designs meet user needs effectively.
- **Adaptive Innovation:** Embracing new design patterns and technologies to maintain a modern and efficient system.
- **Collaborative Growth:** Learning from the collective experiences of teams.

Our design system remains open to change, a constantly improving tool for creating cohesive, user-centered experiences.

---

## Feature Checklist

- Matches design & expected functionality
- Divergences communicated
- Mobile and tablet view is acceptable
- Works in dark mode
- Works across supported browsers (Edge, Chrome, Firefox, Safari, Latest versions -5)
- Meets WCAG AA
- Correct permissions in place (if relevant)
- Zero/empty/loading states included (if relevant)
- Error & success states implemented (if relevant)

---

