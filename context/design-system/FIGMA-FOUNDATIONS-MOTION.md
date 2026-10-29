# Motion

## Summary

Mobile and Desktop share this scale. The values already live in `tokens.css`. A sheet, a context menu, and a segmented pill use them. The phone tab bar changes tabs with no animation.

## Duration

| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 120ms | Sheet and menu exit. Reduced-motion fades. |
| `--duration-medium` | 220ms | Sheet and menu enter. Segmented pill travel. |
| `--duration-ripple` | 520ms | Button ripple only. |

## Easing

| Token | Value | Use |
| --- | --- | --- |
| `--easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Surfaces entering and leaving. The pill moving. |
| `--easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Colour on a control. Reduced-motion fades. |

## Scale

| Token | Value | Use |
| --- | --- | --- |
| `--ds-button-press-scale` | 0.97 | A menu grows from this scale. Pressed buttons use the same value. |

## Where it plays

| Surface | What moves | How often |
| --- | --- | --- |
| [Sheet screen](#/design-system/sheet-screen) | The sheet rises from the bottom edge and leaves by that same edge. The scrim fades. | Occasional |
| [Context menu](#/design-system/context-menu) | The menu grows from its top edge, under the trigger, from scale 0.97. | Occasional |
| [Segmented control](#/design-system/controls) | The pill slides to the selected option. | A few times a session |

Keyboard activation is instant: Enter on a focused control, or a click whose `detail` is 0. The phone tab bar is instant too. People switch tabs all day.

## Reduced motion

`prefers-reduced-motion: reduce` turns travel into a short fade. The segmented pill snaps. The open or selected state is still visible without the animation: the sheet is on screen, the menu is on screen, the chosen segment is filled.

## Ask the agent

The motion skill can list these three, scan a project, and apply one after you confirm.

| You say | What happens |
| --- | --- |
| List the motions | Sheet, menu, and pill, with the tokens on this page. |
| Scan this for motion | A read-only list of hardcoded durations and keyframes. |
| Apply the sheet motion | The sheet recipe, then a wait. "Apply the menu" and "apply the pill" work the same way. |

The samples above are those three. Open the [sheet screen](#/design-system/sheet-screen), the [context menu](#/design-system/context-menu), or the [segmented control](#/design-system/controls).

## Left out

Blur on text and icons, bounce on toggles and badges, confetti, digit reels, and a sliding indicator on the tab bar. Those are either decoration or they would play too often.
