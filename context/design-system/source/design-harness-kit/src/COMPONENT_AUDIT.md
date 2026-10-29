# Northline App Component Audit & Revamp Plan

## Executive Summary

This audit analyzes 5 screens from the Northline appointment booking app, focusing on component-level improvements for accessibility (WCAG 2.2 AA) and interface polish. The goal is a revamp of components and widgets, not a full redesign.

**Screens Analyzed:**
1. Settings screen
2. Calendar/Appointments view
3. Checkout flow
4. Profile screen
5. Stats & Reports dashboard

---

## Critical Accessibility Issues (WCAG Violations)

### 1. Color Contrast Failures

#### Settings Screen
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Secondary text (descriptions) | Light gray on white | Likely fails 4.5:1 ratio | Use `#737373` (muted) or darker |
| Search placeholder | Very light gray | Fails contrast | Use `#AFAFAF` (muted-soft) minimum |
| "New" badge text | Purple text on light bg | May fail contrast | Verify 4.5:1 ratio, darken if needed |

#### Calendar Screen
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Time labels (left side) | Light gray | Likely fails 4.5:1 | Use `#737373` minimum |
| Date numbers (inactive) | Light gray | May fail contrast | Ensure 4.5:1 ratio |
| Banner text | Dark text on gradient | Verify contrast across gradient | Test at lightest point |

#### Checkout Screen
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Tax labels | Light gray | Likely fails 4.5:1 | Use `#737373` minimum |
| Tip button labels | Gray on white | Verify 4.5:1 ratio | Darken if needed |
| "No Tip" secondary text | Very light | Fails contrast | Use `#AFAFAF` minimum |

#### Profile Screen
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| "Closed" tab label | Gray text | May fail contrast | Ensure 4.5:1 ratio |
| Progress text "1 of 3 completed" | Gray | Likely fails 4.5:1 | Use `#737373` minimum |

#### Stats Screen
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Metric labels (SERVICES, TIPS, etc.) | All caps gray | Likely fails contrast | Use `#737373` minimum |
| Chart axis labels | Light gray | May fail contrast | Darken to meet 4.5:1 |
| "Forecast" label | Light blue on white | Verify 3:1 for large text | May need darkening |

**Recommended Color Palette for Text:**
```css
/* Primary text */
--text-primary: #151618;      /* ink - body text, headings */

/* Secondary text - MUST meet 4.5:1 */
--text-secondary: #737373;    /* muted - labels, descriptions */

/* Tertiary text - use sparingly, large text only */
--text-tertiary: #AFAFAF;     /* muted-soft - placeholders, disabled */
```

### 2. Missing Form Labels & ARIA

#### Checkout Screen
```html
<!-- VIOLATION: Client selection has no accessible label -->
<button>
  <img src="avatar-placeholder.png" alt="" />
  <span>Select a client or leave empty for walk-in</span>
</button>

<!-- FIX: Add proper labeling -->
<div>
  <label id="client-label" class="sr-only">Client selection</label>
  <button aria-labelledby="client-label" aria-describedby="client-desc">
    <img src="avatar-placeholder.png" alt="" />
    <span id="client-desc">Select a client or leave empty for walk-in</span>
  </button>
</div>
```

#### Settings Screen
```html
<!-- VIOLATION: Search input missing label -->
<input type="text" placeholder="Search" />

<!-- FIX: Add visible or screen-reader-only label -->
<label for="settings-search" class="sr-only">Search settings</label>
<input id="settings-search" type="text" placeholder="Search" />
```

### 3. Insufficient Focus Indicators

**All interactive elements need visible focus indicators.**

Current state: Default browser focus (likely insufficient or removed).

```css
/* Add to index.css */
:focus-visible {
  outline: 3px solid #218CAC;  /* teal */
  outline-offset: 2px;
}

/* For dark backgrounds */
.dark-bg :focus-visible {
  outline-color: #E4F8FF;  /* teal-soft */
}

/* Never remove focus outlines */
button:focus {
  outline: revert;  /* Don't use outline: none */
}
```

### 4. Touch Target Sizes

**WCAG 2.5.5 (Level AAA) / 2.5.8 (Level AA in 2.2): Minimum 44×44px**

#### Calendar Screen
| Element | Current Size | Issue | Fix |
|---------|-------------|-------|-----|
| Day numbers in calendar | ~32×32px | Too small | Expand to 44×44px or add pseudo-element |
| Menu icon (top right) | ~24×24px | Too small | Expand hit area to 44×44px |
| Filter icon | ~24×24px | Too small | Expand hit area to 44×44px |

#### Checkout Screen
| Element | Current Size | Issue | Fix |
|---------|-------------|-------|-----|
| Close button (X) | ~32×32px | Too small | Expand to 44×44px |
| Add Item button | ~40×40px | Borderline | Expand to 44×44px |
| Discount button | ~40×40px | Borderline | Expand to 44×44px |

#### Profile Screen
| Element | Current Size | Issue | Fix |
|---------|-------------|-------|-----|
| Settings icon (top right) | ~40×40px | Borderline | Expand to 44×44px |
| Eye icon (top left) | ~40×40px | Borderline | Expand to 44×44px |

**Implementation pattern:**
```tsx
// Small icon with expanded hit area
<button className="relative size-6">
  <XIcon className="size-6" />
  <span className="absolute inset-0 -m-2" /> {/* Expands to 44×44 */}
</button>
```

### 5. Missing Semantic Structure

#### Settings Screen
```html
<!-- VIOLATION: List of settings not marked as list -->
<div>
  <div>Loyalty Cards Program</div>
  <div>Payments & Checkout</div>
  <!-- ... -->
</div>

<!-- FIX: Use semantic list -->
<nav aria-label="Settings">
  <ul>
    <li><a href="/settings/loyalty">Loyalty Cards Program</a></li>
    <li><a href="/settings/payments">Payments & Checkout</a></li>
    <!-- ... -->
  </ul>
</nav>
```

#### Profile Screen
```html
<!-- VIOLATION: Tab navigation not marked up properly -->
<div>
  <div>Services</div>
  <div>Reviews</div>
  <div>Portfolio</div>
  <div>Details</div>
</div>

<!-- FIX: Use proper tab ARIA pattern -->
<div role="tablist" aria-label="Profile sections">
  <button role="tab" aria-selected="true" aria-controls="services-panel">
    Services
  </button>
  <button role="tab" aria-selected="false" aria-controls="reviews-panel">
    Reviews
  </button>
  <!-- ... -->
</div>
<div id="services-panel" role="tabpanel" aria-labelledby="services-tab">
  <!-- content -->
</div>
```

### 6. Time-based Content Issues

#### Calendar Screen
**VIOLATION: Banner with account balance has no dismiss or extend option**

```tsx
// Current: Auto-dismissing banner (assumption)
<div className="banner">
  Hey, there's $9.43 in your account. Tap here to add payout details...
</div>

// FIX: Add explicit dismiss control
<div role="alert" className="banner">
  <p>Hey, there's $9.43 in your account. Tap here to add payout details...</p>
  <button aria-label="Dismiss notification">
    <XIcon />
  </button>
</div>
```

### 7. Missing Alternative Text

#### Profile Screen
```html
<!-- VIOLATION: Cover image has no alt text -->
<img src="cover.jpg" />

<!-- FIX: Add descriptive alt -->
<img src="cover.jpg" alt="Business cover photo showing store interior" />

<!-- If decorative -->
<img src="cover.jpg" alt="" role="presentation" />
```

---

## Interface Polish Issues

### Typography

#### 1. Text Wrapping
| Screen | Element | Issue | Fix |
|--------|---------|-------|-----|
| Settings | Setting descriptions | May have orphans | Add `text-wrap: pretty` |
| Settings | Page title "Settings" | N/A (single word) | No change needed |
| Checkout | Service names | May have orphans | Add `text-wrap: pretty` |
| Profile | Banner text | Long sentence, may orphan | Add `text-wrap: pretty` |
| Stats | Metric labels | All caps, short | No change needed |

```css
/* Add to index.css */
p, li, figcaption, .description {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}
```

#### 2. Font Smoothing
**MISSING: No antialiasing applied**

```css
/* Add to index.css */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### 3. Tabular Numbers
| Screen | Element | Issue | Fix |
|--------|---------|-------|-----|
| Checkout | Prices ($120.00, $5.00) | May shift on update | Add `tabular-nums` |
| Checkout | Tax amounts | May shift on update | Add `tabular-nums` |
| Checkout | Tip amounts | May shift on update | Add `tabular-nums` |
| Checkout | Total ($155.25) | May shift on update | Add `tabular-nums` |
| Stats | All metrics ($0, 0%) | Will shift on update | Add `tabular-nums` |
| Calendar | Time labels (08:00, 10:00) | May shift | Add `tabular-nums` |

```tsx
// Apply to all numeric displays
<span className="tabular-nums">{price}</span>
<span className="tabular-nums">{count}</span>
```

### Surfaces

#### 1. Border Radius Issues

**Settings Screen:**
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Search input | `rounded-lg` (~12px) | Standalone, OK | No change |
| Setting items | `rounded-xl` (~16px) | Inconsistent with search | Use `rounded-lg` for consistency |
| "New" badge | `rounded-full` | OK for badge | No change |

**Checkout Screen:**
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Client selection card | `rounded-xl` (~16px) | OK | No change |
| Service items | Sharp corners | Inconsistent | Add `rounded-lg` |
| Tip buttons | `rounded-lg` (~12px) | OK | No change |
| Payment button | `rounded-2xl` (~20px) | Too large for button | Use `rounded-xl` (16px) |

**Profile Screen:**
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Banner | `rounded-xl` (~16px) | OK | No change |
| Action buttons | `rounded-lg` (~12px) | OK | No change |
| Progress card | `rounded-xl` (~16px) | OK | No change |

**Stats Screen:**
| Element | Current | Issue | Fix |
|---------|---------|-------|-----|
| Tab buttons | `rounded-lg` (~12px) | OK | No change |
| Action buttons | `rounded-lg` (~12px) | OK | No change |
| Chart container | Sharp corners | Inconsistent | Add `rounded-xl` |
| Bottom card | `rounded-xl` (~16px) | OK | No change |

**Recommended Radius Scale:**
```css
/* Consistent border radius system */
--radius-sm: 8px;   /* Small elements, tight spacing */
--radius-md: 12px;  /* Buttons, inputs, cards */
--radius-lg: 16px;  /* Large cards, containers */
--radius-xl: 20px;  /* Hero sections, modals */
```

#### 2. Shadows vs Borders

**Current: Most elements use solid borders**

Replace borders with shadows for better adaptability:

```css
/* Add to index.css */
:root {
  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  
  --shadow-border-hover:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}

/* Apply to cards, buttons with borders */
.card {
  box-shadow: var(--shadow-border);
  transition: box-shadow 150ms ease-out;
}

.card:hover {
  box-shadow: var(--shadow-border-hover);
}
```

**Elements to convert:**
- Settings: Each setting item
- Checkout: Client selection card, service items
- Profile: Action buttons (Share, Wallet, Reports)
- Stats: Tab buttons, action buttons

**Keep borders for:**
- Dividers between sections
- Table cell boundaries
- Form input outlines (accessibility)

#### 3. Image Outlines

**Profile Screen: Cover image needs subtle outline**

```tsx
<img
  src={coverImage}
  alt="Business cover photo"
  className="outline outline-1 -outline-offset-1 outline-black/10"
/>
```

### Animations

#### 1. Scale on Press

**All buttons should have subtle scale feedback**

```tsx
// Add to all button components
<button className="transition-transform duration-150 ease-out active:scale-[0.96]">
  {children}
</button>
```

**Apply to:**
- Settings: All setting items
- Calendar: Day numbers, action buttons, FAB
- Checkout: Tip buttons, payment button, add/discount buttons
- Profile: Share/Wallet/Reports buttons, tab buttons
- Stats: Tab buttons, action buttons

#### 2. Enter Animations

**Calendar Screen: Appointment cards should stagger in**

```tsx
// Stagger appointment cards
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {appointments.map((apt, i) => (
    <motion.div
      key={apt.id}
      variants={{
        hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      }}
    >
      {/* appointment card */}
    </motion.div>
  ))}
</motion.div>
```

**Stats Screen: Metrics should stagger in**

Same pattern for revenue metrics.

#### 3. Transition Specificity

**NEVER use `transition: all`**

```css
/* Bad - current (assumption) */
.button {
  transition: all 150ms;
}

/* Good - specific properties */
.button {
  transition-property: scale, background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
```

### Layout & Alignment

#### 1. Optical Alignment Issues

**Calendar Screen:**
| Element | Issue | Fix |
|---------|-------|-----|
| Day numbers | Geometrically centered | Verify optical centering |
| Time labels | Left-aligned | OK |

**Checkout Screen:**
| Element | Issue | Fix |
|---------|-------|-----|
| Payment button text | "TAP TO PAY ON IPHONE" centered | OK |
| Tip button icons | May need optical adjustment | Verify centering |

**Profile Screen:**
| Element | Issue | Fix |
|---------|-------|-----|
| Tab indicators | Underline may not align optically | Verify alignment with text baseline |

#### 2. Spacing Consistency

**Settings Screen:**
- Inconsistent padding between items
- Search bar spacing from list

**Recommendation:**
```tsx
// Consistent spacing scale
<div className="space-y-2">  {/* 8px between items */}
  <SearchInput />
  <div className="space-y-1">  {/* 4px between setting items */}
    <SettingItem />
    <SettingItem />
  </div>
</div>
```

---

## Component-Specific Recommendations

### 1. Settings List Item Component

```tsx
interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  href: string;
}

export function SettingItem({ icon, title, description, badge, href }: SettingItemProps) {
  return (
    <a
      href={href}
      className="
        flex items-center gap-3 p-4 rounded-lg
        transition-[box-shadow,transform] duration-150 ease-out
        active:scale-[0.96]
        hover:shadow-[var(--shadow-border-hover)]
        shadow-[var(--shadow-border)]
        focus-visible:outline focus-visible:outline-3 
        focus-visible:outline-teal focus-visible:outline-offset-2
      "
    >
      <div className="flex-shrink-0 size-10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-ink text-balance">{title}</h3>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-purple text-white text-xs font-semibold">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-muted text-pretty">{description}</p>
      </div>
      <ChevronRightIcon className="flex-shrink-0 size-5 text-muted" />
    </a>
  );
}
```

**Key improvements:**
- Proper semantic HTML (`<a>` for navigation)
- Focus indicator
- Scale on press
- Shadow instead of border
- Text wrapping
- Accessible color contrast
- 44×44px minimum hit area for icon

### 2. Calendar Day Component

```tsx
interface CalendarDayProps {
  date: number;
  isToday?: boolean;
  isSelected?: boolean;
  hasAppointments?: boolean;
  onClick: () => void;
}

export function CalendarDay({ 
  date, 
  isToday, 
  isSelected, 
  hasAppointments,
  onClick 
}: CalendarDayProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`${isToday ? 'Today, ' : ''}${date}`}
      aria-current={isToday ? 'date' : undefined}
      className={cn(
        "relative size-11 rounded-lg font-semibold",
        "transition-[background-color,transform] duration-150 ease-out",
        "active:scale-[0.96]",
        "focus-visible:outline focus-visible:outline-3",
        "focus-visible:outline-teal focus-visible:outline-offset-2",
        isSelected && "bg-teal text-white",
        isToday && !isSelected && "bg-teal-soft text-teal",
        !isSelected && !isToday && "text-ink hover:bg-surface-2"
      )}
    >
      <span className="tabular-nums">{date}</span>
      {hasAppointments && (
        <span 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
```

**Key improvements:**
- 44×44px touch target
- Proper ARIA labels
- Focus indicator
- Scale on press
- Tabular numbers
- Appointment indicator

### 3. Tip Button Component

```tsx
interface TipButtonProps {
  amount: string;
  percentage?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TipButton({ amount, percentage, isSelected, onClick }: TipButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={cn(
        "flex flex-col items-center justify-center",
        "min-h-[88px] px-6 rounded-lg",
        "transition-[box-shadow,background-color,transform] duration-150 ease-out",
        "active:scale-[0.96]",
        "focus-visible:outline focus-visible:outline-3",
        "focus-visible:outline-teal focus-visible:outline-offset-2",
        isSelected 
          ? "bg-ink text-white shadow-none" 
          : "bg-white shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
      )}
    >
      <span className="text-2xl font-bold tabular-nums">{amount}</span>
      {percentage && (
        <span className={cn(
          "text-sm",
          isSelected ? "text-white/70" : "text-muted"
        )}>
          {percentage}
        </span>
      )}
    </button>
  );
}
```

**Key improvements:**
- `aria-pressed` for toggle state
- Focus indicator
- Scale on press
- Shadow instead of border
- Tabular numbers
- Sufficient contrast in both states

### 4. Tab Component

```tsx
interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  panelId: string;
}

export function Tab({ label, isActive, onClick, panelId }: TabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      onClick={onClick}
      className={cn(
        "relative px-4 py-3 font-semibold",
        "transition-[color,transform] duration-150 ease-out",
        "active:scale-[0.96]",
        "focus-visible:outline focus-visible:outline-3",
        "focus-visible:outline-teal focus-visible:outline-offset-2",
        isActive ? "text-ink" : "text-muted hover:text-ink-soft"
      )}
    >
      {label}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
```

**Key improvements:**
- Proper tab ARIA pattern
- Focus indicator
- Scale on press
- Accessible color contrast

### 5. Metric Card Component

```tsx
interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  helpText?: string;
}

export function MetricCard({ label, value, change, helpText }: MetricCardProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        {helpText && (
          <button
            aria-label={`Help: ${helpText}`}
            className="size-4 text-muted hover:text-ink-soft transition-colors"
          >
            <QuestionMarkCircleIcon />
          </button>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        {change && (
          <span className="flex items-center gap-1 text-sm font-semibold text-success">
            <ArrowUpIcon className="size-3" />
            <span className="tabular-nums">{change}</span>
          </span>
        )}
      </div>
    </div>
  );
}
```

**Key improvements:**
- Tabular numbers for values
- Accessible help button
- Proper color contrast
- Semantic structure

---

## Implementation Priority

### Phase 1: Critical Accessibility (Week 1)
1. Fix color contrast violations
2. Add form labels and ARIA
3. Implement focus indicators
4. Expand touch targets to 44×44px

### Phase 2: Component Structure (Week 2)
5. Add semantic HTML (lists, nav, tabs)
6. Implement proper ARIA patterns
7. Add missing alt text
8. Fix keyboard navigation

### Phase 3: Polish (Week 3)
9. Apply typography improvements
10. Implement shadow system
11. Add scale-on-press animations
12. Fix border radius consistency

### Phase 4: Advanced (Week 4)
13. Add enter/exit animations
14. Implement stagger effects
15. Optimize transitions
16. Final polish pass

---

## Testing Checklist

### Automated Testing
- [ ] Run axe DevTools on all screens
- [ ] Run Lighthouse accessibility audit
- [ ] Verify color contrast with WebAIM checker
- [ ] Test with WAVE browser extension

### Manual Testing
- [ ] Navigate entire app with keyboard only
- [ ] Test with VoiceOver (iOS) / TalkBack (Android)
- [ ] Verify focus indicators visible on all elements
- [ ] Test touch targets on actual device
- [ ] Verify text remains readable at 200% zoom
- [ ] Test with reduced motion preference enabled

### Cross-browser Testing
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Safari (macOS)
- [ ] Chrome (Desktop)

---

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
