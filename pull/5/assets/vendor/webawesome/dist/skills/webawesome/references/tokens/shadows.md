# Shadows

**Full documentation:** https://webawesome.com/docs/tokens/shadows

Design Tokens Shadows

Shadow tokens indicate elevation and, often, interactivity. Web Awesome provides three size-based shadow shorthands built from modular offset, blur, and spread tokens. Together with [`--wa-color-shadow`](?active_tab=color), these tokens create realistic drop shadows.

Larger shadows have greater offset and blur values to suggest greater distance from the surface below. Any shadow can also be used as an inner shadow with the `inset` keyword, e.g. `box-shadow: inset var(--wa-shadow-s)`.

| Custom Property | Description |
| --- | --- |
| \`--wa-shadow-s\` | Small shadow for subtle elevation (e.g., cards, inputs) |
| \`--wa-shadow-m\` | Medium shadow for moderate elevation (e.g., dropdowns, popovers) |
| \`--wa-shadow-l\` | Large shadow for high elevation (e.g., dialogs, drawers) |

## Horizontal Offset (X)

Offset-x tokens control a shadow's horizontal position relative to the element. Use `--wa-shadow-offset-x-scale` to change all offset-x tokens at once.

| Custom Property | Description |
| --- | --- |
| \`--wa-shadow-offset-x-scale\` | Global multiplier for horizontal shadow offset |
| \`--wa-shadow-offset-x-s\` | Small horizontal shadow offset |
| \`--wa-shadow-offset-x-m\` | Medium horizontal shadow offset |
| \`--wa-shadow-offset-x-l\` | Large horizontal shadow offset |

## Vertical Offset (Y)

Offset-y tokens control a shadow's vertical position relative to the element. Use `--wa-shadow-offset-y-scale` to change all offset-y tokens at once.

| Custom Property | Description |
| --- | --- |
| \`--wa-shadow-offset-y-scale\` | Global multiplier for vertical shadow offset |
| \`--wa-shadow-offset-y-s\` | Small vertical shadow offset |
| \`--wa-shadow-offset-y-m\` | Medium vertical shadow offset |
| \`--wa-shadow-offset-y-l\` | Large vertical shadow offset |

## Blur

Blur tokens control how soft or sharp the shadow edge is. Use `--wa-shadow-blur-scale` to change all blur tokens at once.

| Custom Property | Description |
| --- | --- |
| \`--wa-shadow-blur-scale\` | \`--wa-color-shadow\` Global multiplier for shadow blur radius. Also affects opacity. |
| \`--wa-shadow-blur-s\` | Small shadow blur radius |
| \`--wa-shadow-blur-m\` | Medium shadow blur radius |
| \`--wa-shadow-blur-l\` | Large shadow blur radius |

## Spread

Spread tokens expand or contract the shadow shape. A negative spread (the default) contracts the shadow inward for a more natural look. Use `--wa-shadow-spread-scale` to change all spread tokens at once.

| Custom Property | Description |
| --- | --- |
| \`--wa-shadow-spread-scale\` | Global multiplier for shadow spread. Negative values contract the shadow inward. |
| \`--wa-shadow-spread-s\` | Small shadow spread |
| \`--wa-shadow-spread-m\` | Medium shadow spread |
| \`--wa-shadow-spread-l\` | Large shadow spread |