# Effects

## Summary

Mobile and Desktop share two effects. Glass is a set of tokens already used by the tab bar, the context menu, and the toolbar. Metal is the liquid-metal shader from the personal site, shown here as a sample. Product screens still use the normal button.

## Glass

The chip above sits on colour so the blur is visible. Floating chrome uses the same tokens over real content.

| Token | Value | Use |
| --- | --- | --- |
| `--kit-glass-bg` | `var(--kit-glass-bg)` | The frosted fill. |
| `--kit-glass-edge` | inset highlight | Top and bottom hairline on the glass. |
| `--kit-glass-blur` | 28px of blur | Backdrop blur. |
| `--kit-glass-saturate` | 1.8 | Backdrop saturation. |

## Metal

One plasma field, copied into a canvas and clipped to the control.

| Mode | What you see |
| --- | --- |
| Ring | A 3.5px metal edge. The center stays `--kit-neutral-20`, with `--kit-neutral-98` type. Radius is `--radius-05`. |
| Fill | The same shader paints the whole tile. Radius is `--radius-02`. |

The shader’s own palette stays the personal-site preset (black, ice, leaf, rose, and a blue). Those stops are part of the effect. They are not colour tokens, and this page does not add any.

`prefers-reduced-motion: reduce` holds the first frame and stops the loop.

The personal site uses the ring on hero actions and as the edge of a framed card. The fill is the lab tile. A product button stays on the [button](#/design-system/button) page until this effect is chosen for it.
