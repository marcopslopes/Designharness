# mobile-shell

<!-- generated-from-skill: do not edit -->

Wraps every mobile/phone-frame Design Harness prototype in the shared PhoneShell component (hardware bezel, notch, iOS status bar, floating pill tab bar, home indicator, 16px screen padding) instead of one-off chrome per file.

**Triggers:** "build a mobile screen" · "phone prototype" · "does this match the navigation-profile frame" · "why do the prototypes look different" · "align the phone frames"

<!-- /generated-from-skill -->

Wraps your screens in realistic phone frames for presentations and prototyping.

## What It Does

**Creates phone prototypes** by:
- Wrapping screens in device chrome (iOS/Android)
- Adding realistic phone frame
- Preserving interactive functionality
- Supporting responsive layouts

**Perfect for stakeholder demos** and user testing.

---

## When to Use

Use `mobile-shell` when you want to:
- Preview mobile screens in realistic context
- Create presentation mockups
- Test phone-specific interactions
- Demo to stakeholders

### Trigger Phrases
```
"Build a phone prototype for [feature]"
"Wrap this in a phone frame"
"Make a mobile demo"
"Show this on iPhone"
```

---

## How It Works

### Step 1: Device Selection
Asks which device:
- iOS (iPhone 15 Pro, SE, Plus)
- Android (Pixel 8, Samsung S24)

### Step 2: Screen Import
Takes your screen component and wraps it:
```tsx
<PhoneShell device="iphone-15-pro">
  <YourScreen />
</PhoneShell>
```

### Step 3: Chrome Addition
Adds realistic device chrome:
- Status bar (time, battery, signal)
- Home indicator (iOS)
- Rounded corners
- Device-specific dimensions

### Step 4: Preview
Generates live preview at `localhost:3002/prototypes/[name]`

---

## Device Options

### iOS
- **iPhone 15 Pro** (6.1", Dynamic Island)
- **iPhone SE** (4.7", smaller, home button)
- **iPhone 15 Plus** (6.7", larger)

### Android
- **Pixel 8** (6.2", Material You)
- **Samsung Galaxy S24** (6.1", rounded edges)

---

## Example Output

```tsx
// Before mobile-shell
<CityLeaderboardScreen />

// After mobile-shell
<PhoneShell
  device="iphone-15-pro"
  statusBarStyle="dark"
>
  <CityLeaderboardScreen />
</PhoneShell>
```

Renders in realistic iPhone frame with:
- Status bar showing 9:41 AM
- Dynamic Island
- Rounded corners
- Safe area insets

---

## Chains With

`mobile-shell` works with:
- `ui-agent` (builds screen, then wraps)
- `deck-builder` (screenshots for presentations)
- `audit` (checks responsive behavior)

---

## Tips

### 1. Choose Right Device
Match your target audience:
- Consumer app: iPhone 15 Pro (most common)
- Android-first: Pixel 8
- Accessibility focus: iPhone SE (smaller)

### 2. Test Safe Areas
PhoneShell respects safe area insets - test that your content doesn't clip.

### 3. Screenshot for Decks
```
"Create phone prototype, then screenshot for deck"
```

---

## Related Skills

- [ui-agent](ui-agent.md) - Builds the screens
- [deck-builder](deck-builder.md) - Uses screenshots
- [responsive-patterns](responsive-patterns.md) - Multi-device layouts
