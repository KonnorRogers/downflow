# Color

**Full documentation:** https://webawesome.com/docs/tokens/color

Design Tokens Color

Web Awesome's color system is made up of three layers: a [color palette](https://webawesome.com/docs/color-palettes) that gives you a full spectrum of hues, [variant colors](#variant-colors) that define semantic color variations (like success and danger), and [colors for themed elements](#color-for-themed-elements) that apply specific tints from your palette and variant colors to the elements that make up a theme.

For an overview of how theming works across the library, see [Theming](https://webawesome.com/docs/theming-overview) .

## Color Palette

[Color palettes](https://webawesome.com/docs/color-palettes) give you a full spectrum of colors to use in your project and are the lowest-level color tokens. Each color palette includes 10 different hues, each with 11 numeric tints that make up a color scale from light to dark — `95` is near white, `05` is near black.

These numeric tints help ensure accessible color contrast per [WCAG 2.1 success criteria](https://www.w3.org/TR/WCAG21/#contrast-minimum):

-   A difference of 40 provides a minimum 3:1 contrast ratio, suitable for large text and icons (AA)
-   A difference of 50 provides a minimum 4.5:1 contrast ratio, suitable for normal text (AA) and large text (AAA)
-   A difference of 60 provides a minimum 7:1 contrast ratio, suitable for all text (AAA)

Red

`--wa-color-red-*`

95

90

80

70

60

50

40

30

20

10

05

Orange

`--wa-color-orange-*`

95

90

80

70

60

50

40

30

20

10

05

Yellow

`--wa-color-yellow-*`

95

90

80

70

60

50

40

30

20

10

05

Green

`--wa-color-green-*`

95

90

80

70

60

50

40

30

20

10

05

Cyan

`--wa-color-cyan-*`

95

90

80

70

60

50

40

30

20

10

05

Blue

`--wa-color-blue-*`

95

90

80

70

60

50

40

30

20

10

05

Indigo

`--wa-color-indigo-*`

95

90

80

70

60

50

40

30

20

10

05

Purple

`--wa-color-purple-*`

95

90

80

70

60

50

40

30

20

10

05

Pink

`--wa-color-pink-*`

95

90

80

70

60

50

40

30

20

10

05

Gray

`--wa-color-gray-*`

95

90

80

70

60

50

40

30

20

10

05

### Core Colors

In addition to numeric tints, each hue has a _core color_ — the most colorful, vibrant tint in the scale. The exact tint varies by palette. Use `--wa-color-{hue}` when you want a representative color for a hue without specifying a tint.

The tint for each core color is stored as an integer in `--wa-color-{hue}-key`. These tokens are used internally to determine a compatible text color when using the core color as a background and are not used directly by components.

Using this key, the color system derives a paired _on color_ guaranteed to meet WCAG 2.1 AA contrast when placed on top of the corresponding core color. If the core tint is light (≥ 60), the on color is a dark shade of that hue; otherwise it is white. Use `--wa-color-{hue}-on` any time you render text or icons on a core color background.

| Core Color | Key | On Color |
| --- | --- | --- |
| \`--wa-color-red\` | \`--wa-color-red-key\` | \`--wa-color-red-on\` |
| \`--wa-color-orange\` | \`--wa-color-orange-key\` | \`--wa-color-orange-on\` |
| \`--wa-color-yellow\` | \`--wa-color-yellow-key\` | \`--wa-color-yellow-on\` |
| \`--wa-color-green\` | \`--wa-color-green-key\` | \`--wa-color-green-on\` |
| \`--wa-color-cyan\` | \`--wa-color-cyan-key\` | \`--wa-color-cyan-on\` |
| \`--wa-color-blue\` | \`--wa-color-blue-key\` | \`--wa-color-blue-on\` |
| \`--wa-color-indigo\` | \`--wa-color-indigo-key\` | \`--wa-color-indigo-on\` |
| \`--wa-color-purple\` | \`--wa-color-purple-key\` | \`--wa-color-purple-on\` |
| \`--wa-color-pink\` | \`--wa-color-pink-key\` | \`--wa-color-pink-on\` |
| \`--wa-color-gray\` | \`--wa-color-gray-key\` | \`--wa-color-gray-on\` |

## Variant Colors

Variant colors are aliases for specific hues in your color palette to give them an extra layer of semantic meaning. These variants are familiar, meaningful hues that reinforce a specific message or intended use:

| Variant | Use | Default |
| --- | --- | --- |
| Brand | Product recognition | blue |
| Neutral | Generic and ordinary content | gray |
| Success | Validity or confirmation | green |
| Warning | Caution or uncertainty | yellow |
| Danger | Errors or risk | red |

Brand and neutral are used by nearly every element, component, and pattern across the library. Success, warning, and danger are used selectively by components that could benefit from semantic reinforcement, such as buttons and callouts.

Each variant color is an alias for a palette color and follows the same token format: `--wa-color-{variant}-{tint}`.

Brand

`--wa-color-brand-*`

95

90

80

70

60

50

40

30

20

10

05

Neutral

`--wa-color-neutral-*`

95

90

80

70

60

50

40

30

20

10

05

Success

`--wa-color-success-*`

95

90

80

70

60

50

40

30

20

10

05

Warning

`--wa-color-warning-*`

95

90

80

70

60

50

40

30

20

10

05

Danger

`--wa-color-danger-*`

95

90

80

70

60

50

40

30

20

10

05

### Core Colors

Just like the hues in your color palette, each variant has a _core color_ — an alias for the most colorful, vibrant tint in the color scale selected for your variant. Use `--wa-color-{variant}` when you want a representative color for a variant without specifying a tint.

Each core color also has a paired _on color_ (`--wa-color-{variant}-on`) guaranteed to meet WCAG 2.1 AA contrast when placed on top of it. Use on color tokens any time you render text or icons on a core color background.

| Core Color | On Color |
| --- | --- |
| \`--wa-color-brand\` | \`--wa-color-brand-on\` |
| \`--wa-color-neutral\` | \`--wa-color-neutral-on\` |
| \`--wa-color-success\` | \`--wa-color-success-on\` |
| \`--wa-color-warning\` | \`--wa-color-warning-on\` |
| \`--wa-color-danger\` | \`--wa-color-danger-on\` |

### Changing Variant Colors

Any hue from your color palette can be assigned to any variant without redefining the tokens in your own stylesheet. To use a different hue, simply apply the class `"wa-{variant}-{hue}` to the `<html>` element.

```html
<html class="wa-brand-purple wa-success-cyan"></html>
```

All ten palette hues — `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `indigo`, `purple`, `pink`, and `gray` — are available for every variant.

## Color for Themed Elements

These tokens apply specific tints from your color palette and variant colors to the elements and components that make up a theme. They're named for the role they play rather than their appearance, and adapt to light and dark modes.

### Surfaces

Surfaces are background layers that content rests on. They convey elevation hierarchy — `raised` is closest to the user (e.g., dialogs) and `lowered` is farthest away (e.g., wells).

| Custom Property | Description |
| --- | --- |
| \`--wa-color-surface-raised\` | Background for elevated surfaces like dialogs and dropdown menus |
| \`--wa-color-surface-default\` | Default page or container background |
| \`--wa-color-surface-lowered\` | Background for recessed surfaces like wells and code blocks |
| \`--wa-color-surface-border\` | Border color used to delineate surface areas |

### Text

Text colors are used for readable content. We recommend a minimum 4.5:1 contrast ratio against surface colors for text colors.

| Custom Property | Description |
| --- | --- |
| \`--wa-color-text-normal\` | Primary text color for most content |
| \`--wa-color-text-quiet\` | Subdued text for hints, captions, and other secondary content |
| \`--wa-color-text-link\` | Color for hyperlinks |

### Overlays

Overlays provide a backdrop that isolates content, often with some transparency so background context shows through.

| Custom Property | Description |
| --- | --- |
| \`--wa-color-overlay-modal\` | Semi-transparent backdrop behind modal dialogs |
| \`--wa-color-overlay-inline\` | Subtle overlay for inline highlights or dimmed regions |

### Shadow

A single color is used for all drop shadows. Use it alongside the [shadow tokens](?active_tab=shadows) to construct realistic shadows.

| Custom Property | Description |
| --- | --- |
| \`--wa-color-shadow\` | Color used for all component drop shadows |

### Interactions

These tokens power the consistent hover, active, and focus feedback you see across interactive components. The `--wa-color-focus` token sets the color of the keyboard focus ring. The `--wa-color-mix-hover` and `--wa-color-mix-active` tokens are overlays — they're mixed into a component's background via [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) to subtly shift it on hover and press, so every interactive component reacts consistently without each one defining its own hover/active palette.

| Custom Property | Description |
| --- | --- |
| \`--wa-color-focus\` | Outline color for keyboard focus rings. Used alongside focus tokens. |
| \`--wa-color-mix-hover\` | Color blended into a component's fill on hover |
| \`--wa-color-mix-active\` | Color blended into a component's fill on press |

### Semantic Variants

Semantic variants use the `--wa-color-{variant}-{tint}` tokens from your [variant colors](#variant-colors) to power the `variant=""` attribute shared by buttons, badges, callouts, and many other components. Each variant is a complete, self-contained color system built from five groups — `brand`, `success`, `neutral`, `warning`, and `danger` — each defining fills, borders, and on colors at three attention levels.

Tokens follow the format `--wa-color-{variant}-{role}-{attention}`. The three **roles** are:

-   **Fill** for backgrounds or areas larger than a few pixels
-   **Border** for borders, dividers, and strokes
-   **On** for content displayed _on top of_ a fill (pair `on-loud` with `fill-loud`)

The three **attention** levels are `quiet`, `normal`, and `loud` — from least to most visually prominent.

| Custom Property | brand | neutral | success | warning | danger |
| --- | --- | --- | --- | --- | --- |
| \`--wa-color-\*-fill-quiet\` | | | | | |
| \`--wa-color-\*-fill-normal\` | | | | | |
| \`--wa-color-\*-fill-loud\` | | | | | |
| \`--wa-color-\*-border-quiet\` | | | | | |
| \`--wa-color-\*-border-normal\` | | | | | |
| \`--wa-color-\*-border-loud\` | | | | | |
| \`--wa-color-\*-on-quiet\` | Aa | Aa | Aa | Aa | Aa |
| \`--wa-color-\*-on-normal\` | Aa | Aa | Aa | Aa | Aa |
| \`--wa-color-\*-on-loud\` | Aa | Aa | Aa | Aa | Aa |