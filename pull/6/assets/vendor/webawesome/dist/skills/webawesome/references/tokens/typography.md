# Typography

**Full documentation:** https://webawesome.com/docs/tokens/typography

Design Tokens Typography

Typography tokens give your theme consistent, scalable text styles across every component. You can adjust individual tokens or use scale multipliers to change all sizes or weights at once.

## Font Family

Font family tokens are assigned to specific roles — body text, headings, code, and long-form prose. By default, they use system fonts for maximum performance.

| Custom Property | Description |
| --- | --- |
| \`--wa-font-family-body\` | Default font for body text and UI components |
| \`--wa-font-family-heading\` | Font for headings |
| \`--wa-font-family-code\` | Font for code blocks and inline code |
| \`--wa-font-family-longform\` | Font for long-form prose and reading-optimized content |

## Font Size

Font sizes use a ratio of 1.125 to scale proportionally. The medium size (`m`) is the base; sizes below are 1.125× smaller and sizes above are _twice_ 1.125× larger to maximize visual contrast between larger sizes. All values use `rem` units and round to the nearest whole pixel.

Use `--wa-font-size-scale` to proportionally increase or decrease all sizes at once.

| Custom Property | Description |
| --- | --- |
| \`--wa-font-size-scale\` | Global multiplier applied to all font size calculations |
| \`--wa-font-size-3xs\` | Smallest font size. Use sparingly and only for non-essential UI. |
| \`--wa-font-size-2xs\` | Near-smallest font size. Use sparingly and only for non-essential UI. |
| \`--wa-font-size-xs\` | Extra-small font size, suitable for labels and metadata |
| \`--wa-font-size-s\` | Small font size, for secondary text and hints |
| \`--wa-font-size-m\` | Base font size, used for most body text |
| \`--wa-font-size-l\` | Large font size, for slightly emphasized text and small headings |
| \`--wa-font-size-xl\` | Extra-large font size, for subheadings |
| \`--wa-font-size-2xl\` | 2× extra-large font size, for section headings |
| \`--wa-font-size-3xl\` | 3× extra-large font size, for page headings |
| \`--wa-font-size-4xl\` | 4× extra-large font size, for display headings |
| \`--wa-font-size-5xl\` | 5× extra-large font size, for hero headlines |
| \`--wa-font-size-smaller\` | Makes text proportionally smaller relative to its parent's font size |
| \`--wa-font-size-larger\` | Makes text proportionally larger relative to its parent's font size |

## Font Weight

Font weight tokens come in two flavors: named weights that cover the full range, and role-based weights for specific text types. Role-based weights reference named weights by default.

| Custom Property | Description |
| --- | --- |
| \`--wa-font-weight-light\` | Light text weight |
| \`--wa-font-weight-normal\` | Normal text weight |
| \`--wa-font-weight-semibold\` | Medium/semibold text weight |
| \`--wa-font-weight-bold\` | Bold text weight |
| \`--wa-font-weight-body\` | Weight for body/paragraph text |
| \`--wa-font-weight-heading\` | Weight for headings |
| \`--wa-font-weight-code\` | Weight for code |
| \`--wa-font-weight-longform\` | Weight for long-form prose |
| \`--wa-font-weight-action\` | Weight for interactive text like button labels and tabs. Also recommended for links that don't use text decorations. |

## Line Height

Line heights are unitless to scale proportionately with text size. For readability, paragraph text should be at least `1.5`.

| Custom Property | Description |
| --- | --- |
| \`--wa-line-height-condensed\` | Tight line height for headings and short UI text |
| \`--wa-line-height-normal\` | Standard line height for body/paragraph text |
| \`--wa-line-height-expanded\` | Open line height for reading-optimized or airy content |

## Link Decoration

Together with [`--wa-color-text-link`](?active_tab=color), these tokens add text decoration to `<a>` elements to signal their role as hyperlinks.

| Custom Property | Description |
| --- | --- |
| \`--wa-link-decoration-default\` | Text decoration applied to links in their default (non-hovered) state |
| \`--wa-link-decoration-hover\` | Text decoration applied to links on hover |