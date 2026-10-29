# Shadows

## Summary

Mobile and Desktop share this scale. The values already live in `tokens.css`, and they swap with the theme: light is a low spread, dark adds a top-edge highlight on the two floating tiers. The samples above follow that toggle.

There is one floating step past the card (`--kit-shadow-2`). Components then use the interaction tokens below.

## Depth

| Token | Use |
| --- | --- |
| `--kit-shadow-0` | Flat. Recessed wells and tiles that sit in a grid. |
| `--kit-shadow-1` | Cards and default chrome. |
| `--kit-shadow-2` | Sheets, popovers, and anything that floats. |
| `--kit-edge-raised` | The 1px top highlight. Pair it with a shadow when the surface needs a lit edge. |

## Interaction

| Token | Use |
| --- | --- |
| `--kit-shadow-border` | Hairline on an interactive tile or a list row. |
| `--kit-shadow-border-hover` | That same tile on hover. |
| `--kit-shadow-press` | A pressed ink button. |
| `--kit-shadow-lifted` | A floating action at rest. |
| `--kit-shadow-lifted-hover` | That action on hover. |
| `--kit-fab-shadow` | The floating action button. `--ds-button-fab-shadow` points here. |

## Components

| Token | Use |
| --- | --- |
| `--ds-button-shadow-rest` | Button at rest. |
| `--ds-button-shadow-hover` | Button hover. |
| `--ds-button-shadow-press` | Button press. |
| `--ds-toast-shadow` | Toast. |
| `--ds-elevate-shadow-soft` | A soft lift with a hairline. |
| `--ds-elevate-shadow-md` | A taller lift. |
| `--ds-toggle-thumb-shadow` | The switch thumb. |

Glass blur sits with [Effects](#/design-system/effects). The glass card in the samples above also carries `--kit-shadow-1` and `--kit-edge-raised`, which is why it appears on this page too.
