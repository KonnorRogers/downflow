# Color Variants

**Full documentation:** https://webawesome.com/docs/utilities/color

CSS Utilities Color Variants

Several Web Awesome components (like [`<wa-badge>`](https://webawesome.com/docs/components/badge), [`<wa-button>`](https://webawesome.com/docs/components/button), [`<wa-button-group>`](https://webawesome.com/docs/components/button-group), [`<wa-callout>`](https://webawesome.com/docs/components/callout), and [`<wa-tag>`](https://webawesome.com/docs/components/tag)) accept a `variant` attribute to switch between your theme's brand, neutral, success, warning, and danger colors. The color variant utility classes bring that same expressiveness to any element: toggle a brand-colored alert, a warning-styled panel, or a success-tinted badge on your own markup without writing variant-specific CSS for each one.

## Variant Classes

Add one of these classes to any element to apply a semantic color:

-   `.wa-brand`
-   `.wa-neutral`
-   `.wa-success`
-   `.wa-warning`
-   `.wa-danger`

## How Variants Work

The variant classes don't apply styles directly. Instead, each one points a generic set of color tokens (like `--wa-color-fill-loud` and `--wa-color-on-loud`) at the matching [semantic color](https://webawesome.com/docs/tokens/color/#semantic-colors) group (`--wa-color-brand-fill-loud`, and so on). That means your own CSS can be written once, using the group-less tokens, and automatically pick up whatever variant is applied. When no variant class is set, the tokens fall back to `neutral`.

Web Awesome's [native styles](https://webawesome.com/docs/utilities/native/) use this pattern wherever it made sense, which is how a native `<button>` can pick up a `.wa-success` class and just work.

## Example: Custom Class with Variants

Here's a tiny `.callout` class that responds to every color variant without any extra selectors:

```html
<p class="callout">This is a callout.</p>
<p class="callout wa-brand">This is a callout.</p>
<p class="callout wa-success">This is a callout.</p>
<p class="callout wa-warning">This is a callout.</p>
<p class="callout wa-danger">This is a callout.</p>

<style>
  .callout {
    background-color: var(--wa-color-fill-quiet);
    border: 1px solid var(--wa-color-border-quiet);
    color: var(--wa-color-on-quiet);
    padding: var(--wa-space-m) var(--wa-space-l);
  }
</style>
```