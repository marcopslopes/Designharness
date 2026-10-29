# responsive-patterns

Multi-device layouts - phone, tablet, desktop, all from one design system.

## What It Does

**Creates responsive layouts** that:
- Adapt to screen sizes
- Use same components
- Maintain design system
- Handle breakpoints
- Optimize for each device

**One design, multiple sizes** - consistent everywhere.

---

## When to Use

Use `responsive-patterns` when you want to:
- Build for multiple devices
- Design responsive web apps
- Create tablet layouts
- Handle different screen sizes

### Trigger Phrases
```
"Build responsive version of [screen]"
"Create tablet layout"
"Make this work on desktop"
"Add breakpoints to [screen]"
```

---

## Breakpoints

Default breakpoints:
```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

Customizable per project.

---

## Responsive Patterns

### Stack Direction
```tsx
<Stack
  direction={{ mobile: 'column', tablet: 'row', desktop: 'row' }}
  gap={{ mobile: 3, tablet: 4, desktop: 5 }}
>
  <Card>...</Card>
  <Card>...</Card>
</Stack>
```

### Column Layouts
```css
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--min-col-width), 1fr)
  );
  gap: var(--space-4);
}
```

### Conditional Display
```tsx
<MobileOnly>
  <BottomNav />
</MobileOnly>

<DesktopOnly>
  <Sidebar />
</DesktopOnly>
```

---

## Example

### Input
```
You: "Create responsive layout for city leaderboard"
```

### Output
```tsx
// Mobile: Stacked cards, compact
<Stack direction="column" gap={3}>
  {cities.map(city => (
    <Card key={city.id} padding={4}>
      <Stack direction="row" align="center" gap={3}>
        <Badge>{city.rank}</Badge>
        <Text size="md">{city.name}</Text>
        <Text size="sm" color="subtle">{city.bookings}</Text>
      </Stack>
    </Card>
  ))}
</Stack>

// Tablet: 2-column grid
<Grid columns={2} gap={4}>
  {cities.map(city => (
    <Card key={city.id} padding={5}>
      <Stack direction="column" gap={2}>
        <Badge size="lg">{city.rank}</Badge>
        <Text size="lg">{city.name}</Text>
        <Text size="md" color="subtle">{city.bookings} bookings</Text>
      </Stack>
    </Card>
  ))}
</Grid>

// Desktop: Table layout with more details
<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Rank</TableCell>
      <TableCell>City</TableCell>
      <TableCell>Bookings</TableCell>
      <TableCell>Growth</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {cities.map(city => (
      <TableRow key={city.id}>
        <TableCell><Badge>{city.rank}</Badge></TableCell>
        <TableCell><Text weight="semibold">{city.name}</Text></TableCell>
        <TableCell>{city.bookings}</TableCell>
        <TableCell>
          <Text color={city.growth > 0 ? 'success' : 'default'}>
            {city.growth > 0 ? '+' : ''}{city.growth}%
          </Text>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Chains With

`responsive-patterns` works with:
- `ui-agent` (builds responsive screens)
- `design-system` (validates tokens)
- `audit` (checks all breakpoints)

---

## Tips

### 1. Mobile First
Design for mobile, enhance for larger screens.

### 2. Use Design System
Same components, different layouts.

### 3. Test All Sizes
```
"Test city leaderboard on all breakpoints"
```

### 4. Optimize Content
Desktop can show more - tablet/mobile need prioritization.

---

## Related Skills

- [ui-agent](ui-agent.md) - Builds responsive screens
- [mobile-shell](mobile-shell.md) - Mobile previews
- [adaptive-interfaces](adaptive-interfaces.md) - Advanced responsive
