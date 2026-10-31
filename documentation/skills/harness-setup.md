# harness-setup

<!-- generated-from-skill: do not edit -->

Guides the designer through customizing the harness with their existing design system, brand guidelines, and company context.

**Triggers:** see the routing table

<!-- /generated-from-skill -->

One-time customization - import your design system, voice, and company context.

## What It Does

**Customizes the harness** by importing:
- Design tokens (colors, spacing, type)
- Brand voice guidelines
- User personas/archetypes
- UX patterns
- Company business context
- Terminology/vocabulary

**Runs during onboarding** or anytime with "set up my design system".

---

## When to Use

Use `harness-setup` when you want to:
- Import your design tokens
- Add your brand voice
- Define your user personas
- Document your UX patterns
- Customize company context

### Trigger Phrases
```
"Set up my design system"
"Import my tokens"
"Add my brand voice"
"Customize the harness"
"Update my company context"
```

---

## What Gets Customized

### 1. Design Tokens
Import your `tokens.css`:
```css
/* Your tokens become the source of truth */
--brand-primary: #007078;
--space-4: 1rem;
--radius-3: 12px;
```

Replaces default Northline tokens.

### 2. Brand Voice
Import voice guidelines:
```
Tone: Friendly but professional
Personality: Warm, helpful, clear
Avoid: Jargon, passive voice
CTAs: Action-oriented, specific
```

Used by `content`, `ui-agent`, `writing` skills.

### 3. User Personas
Define your archetypes:
```
Persona 1: Power User
- Goals: Speed, efficiency
- Pain points: Friction, delays

Persona 2: Casual User
- Goals: Simplicity, guidance
- Pain points: Overwhelm, complexity
```

Used by `ui-agent`, `research-agent` skills.

### 4. UX Patterns
Document your conventions:
```
Navigation: Bottom tab bar (iOS), Top tabs (Android)
Forms: Inline validation, clear error messages
Empty states: Illustration + encouraging CTA
```

Used by `ux-pattern`, `ui-agent` skills.

### 5. Company Context
Explain your business:
```
Business model: Two-sided marketplace
Primary users: Service providers + consumers
Core metric: Booking completion rate
```

Used by `research-agent`, `design-kickoff` skills.

### 6. Terminology
Define your vocabulary:
```
"Booking" not "Reservation"
"Provider" not "Vendor"
"Consumer" not "Customer"
```

Used by `content`, `ticket-create`, `docs-brief` skills.

---

## Setup Flow

### Question 1: Design Tokens
```
"Do you have design tokens (colors, spacing, type)?"

Options:
- Yes, I have a tokens.css file → Import
- Yes, I have tokens in another format → Convert
- No, use defaults → Keep Northline tokens
```

### Question 2: Brand Voice
```
"Do you have brand voice guidelines?"

Options:
- Yes, I have documentation → Import
- Yes, but not written down → We'll create it
- No, use defaults → Keep Northline voice
```

### Question 3: User Personas
```
"Do you have defined user personas or archetypes?"

Options:
- Yes, I have documentation → Import
- Yes, but not written down → We'll create it
- No, use defaults → Keep Northline personas
```

### Question 4: UX Patterns
```
"Do you have documented UX patterns or design principles?"

Options:
- Yes, I have documentation → Import
- Yes, but not written down → We'll create it
- No, use defaults → Keep Northline patterns
```

### Question 5: Company Context
```
"Should we import your company context (business model, users, goals)?"

Options:
- Yes, import from documentation
- Yes, I'll describe it now
- No, use defaults → Keep Northline context
```

### Question 6: Terminology
```
"Do you have a product vocabulary or terminology guide?"

Options:
- Yes, I have documentation → Import
- Yes, but not written down → We'll create it
- No, use defaults → Keep Northline terms
```

---

## What Gets Created

After setup:
```
context/org-pack.local/
├── COMPANY-VOICE.md          ← Your voice
├── COMPANY-ARCHETYPES.md     ← Your personas
├── COMPANY-PATTERNS.md       ← Your UX patterns
├── COMPANY-BUSINESS.md       ← Your business model
├── COMPANY-VOCABULARY.md     ← Your terminology
└── COMPANY-SQUADS.md         ← Your team structure (optional)

context/design-system/
└── tokens.css                ← Your tokens (or default)
```

All files are **gitignored** - your private customizations.

---

## Re-Running Setup

Update anytime:
```
"Update my design tokens"
"Revise my brand voice"
"Add a new persona"
```

Re-runs specific questions, preserves others.

---

## Tips

### 1. Start with Defaults
Try the harness with Northline first, customize later.

### 2. Import Tokens Early
Design tokens matter most - import ASAP.

### 3. Iterate Voice Guidelines
Voice can evolve - update as you refine.

### 4. Document Patterns
Best done after using the harness - document what emerges.

---

## Related Skills

- [design-system](design-system.md) - Uses your tokens
- [content](content.md) - Uses your voice
- [ux-pattern](ux-pattern.md) - Uses your patterns
- [ui-agent](ui-agent.md) - Uses all customizations
