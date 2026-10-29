# Components — API quick reference

Moved from `harness/ORCHESTRATOR.md` §7.4. Source of truth for the full
primitive list is `context/design-system/ds/index.ts`.

```tsx
import { Button } from 'context/design-system/ds'
// Prefer kit API: intent + size (xl/lg/md/sm)
// intent: 'primary' | 'secondary' | 'tinted' | 'premium' | 'danger' | 'outline' | 'ghost'
<Button intent="primary" size="lg">Continue</Button>
<Button intent="secondary" size="md">Cancel</Button>
<Button intent="ghost" size="sm">Learn more</Button>
// Deprecated shim still accepted: variant + tone ("sea" → brand indigo)
```
> Primary button fill is **ink** (`--kit-ink`). Brand teal is `--kit-brand` / `--color-surface-brand`. Legacy `tone="sea"` maps to tinted/brand teal fills where applicable.

```tsx
import { Text } from 'context/design-system/ds'
// Variants: 'display' | 'body-large' | 'body' | 'label' | 'muted'
<Text variant="display">Heading</Text>
<Text variant="body">Standard copy</Text>
```

```tsx
import { Stack } from 'context/design-system/ds'
// direction: 'column' (default) | 'row'; gap: any --spacing-* token (default: --spacing-05)
<Stack gap="var(--spacing-06)">
  <Text variant="display">Title</Text>
  <Text variant="body">Description</Text>
</Stack>
```

```tsx
import { Card } from 'context/design-system/ds'
// elevated: boolean (adds stronger border)
<Card elevated>
  <Text variant="label">Card content</Text>
</Card>
```

```tsx
import { Badge } from 'context/design-system/ds'
// tone: 'neutral' | 'brand' | 'success'
<Badge tone="brand">Pro</Badge>
```

```tsx
import { TextField } from 'context/design-system/ds'
<TextField label="Email" placeholder="you@example.com" hint="We'll send your confirmation here" />
<TextField label="Phone" invalid hint="Please enter a valid number" />
```

```tsx
import { Toast } from 'context/design-system/ds'
// tone: 'positive' | 'warning' | 'negative' | 'sea' | 'informative'
<Toast tone="positive">Booking confirmed</Toast>
```
> Toast is unstyled for position — wrap in a `position: fixed` container in the host screen.

```tsx
import { Icon } from 'context/design-system/ds'
import { IconCalendar } from '@tabler/icons-react'
// size: 'xs' (16px) | 'sm' (18px) | 'md' (20px) | 'lg' (24px) | 'xl' (28px)
<Icon icon={IconCalendar} size="md" />
```
> Every icon comes from [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`, 5,900+ icons already installed). Never hand-draw inline `<svg>` icon markup. See `harness/skills/icon-usage/GUIDE.md`.

```tsx
import { LargeTitleHeader, NavBarHeader, SearchHeader, TabbedHeader, ContextHeader, HeaderIconButton } from 'context/design-system/ds'
// Large title, nav bar, search, tabbed, and context (receipt) headers.
<LargeTitleHeader title="Today" subtitle="12 appointments" onSearch={() => {}} />
<NavBarHeader title="Patricia Taylor" subtitle="Wed · 10:00 AM" onBack={() => {}} />
```

```tsx
import { Sheet, SheetHeader, SheetMenu, SheetAction, ConfirmationSheet, PickerSheet, DetailSheet, StatusSheet } from 'context/design-system/ds'
<Sheet cancelLabel="Cancel">
  <SheetHeader title="New booking" />
</Sheet>
<StatusSheet variant="success" title="Payment completed." />
```

```tsx
import { Stepper, Slider, ServiceListItem, HintBanner, Coachmark, ActionTile, PromoCard, SetupChecklist } from 'context/design-system/ds'
<Stepper label="Quantity" value={2} max={10} onChange={() => {}} />
<Slider label="Duration" value={45} min={15} max={120} unit=" min" onChange={() => {}} />
```

```tsx
import { Conversation, Message, Working, Response, Result, Reasoning, ToolCall, Activity, PromptInput } from 'context/design-system/ds'
// Person turns are bubbles. Agent turns are flow. Compose these — do not redraw a chat kit.
<Conversation>
  <Message from="user">Can Maya still change Tuesday’s colour?</Message>
  <Message from="agent">
    <Working steps={['Checking Tuesday’s colour']} />
    <Reasoning summary="Thought for 4s" />
    <ToolCall label="Looked up Tuesday’s colour" duration="600ms" />
    <Response status="completed">Thursday at 2:00 PM is free.</Response>
  </Message>
</Conversation>
<Activity>
  <ToolCall label="Checking Thursday" status="running" />
</Activity>
<PromptInput placeholder="Ask about a booking" onSubmit={() => {}} />
```

