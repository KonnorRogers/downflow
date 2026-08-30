# Breadcrumb

`<wa-breadcrumb>`

Stable [Navigation](https://webawesome.com/docs/components/?category=navigation) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Breadcrumbs display a trail of links that show users where they are in a site's hierarchy. They help users understand the current location and navigate back to parent pages.

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html
<wa-breadcrumb>
  <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
  <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
  <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
  <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
</wa-breadcrumb>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/breadcrumb/breadcrumb.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/breadcrumb/breadcrumb.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/breadcrumb/breadcrumb.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaBreadcrumb from '@awesome.me/webawesome/dist/react/breadcrumb/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — One or more breadcrumb items to display.
- `separator` — The separator to use between breadcrumb items. Works best with `<wa-icon>`.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `label` | `label` | The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by screen readers and other assistive devices to provide more context for users. | `string` | `''` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you'll need to add event listeners to handle clicks.

For websites, you'll probably want to use links instead. You can make any breadcrumb item a link by applying an `href` attribute to it. Now, when the user activates it, they'll be taken to the corresponding page — no event listeners required.

The last item represents the current page. Use `href=""` so it points at itself — `<wa-breadcrumb>` will mark it with `aria-current="page"` and style it as non-interactive for you.

```html
<wa-breadcrumb>
  <wa-breadcrumb-item href="https://example.com/home">Homepage</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services">Our Services</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services/digital">Digital Media</wa-breadcrumb-item>

  <wa-breadcrumb-item href="">Web Design</wa-breadcrumb-item>
</wa-breadcrumb>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like [`<wa-icon>`](https://webawesome.com/docs/components/icon) next to any breadcrumb item.

```html
<wa-breadcrumb>
  <wa-breadcrumb-item>
    <wa-icon slot="start" name="house"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Articles</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    <wa-icon slot="end" name="umbrella-beach"></wa-icon>
    Traveling
  </wa-breadcrumb-item>
</wa-breadcrumb>
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

```html
<wa-breadcrumb>
  <wa-icon slot="separator" name="angles-right" variant="solid"></wa-icon>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>

<br />

<wa-breadcrumb>
  <wa-icon slot="separator" name="arrow-right" variant="solid"></wa-icon>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>

<br />

<wa-breadcrumb>
  <span slot="separator">/</span>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>
```

### Custom Colors

Breadcrumb labels match the color set on [`<wa-breadcrumb-item>`](https://webawesome.com/docs/components/breadcrumb-item). Content in the `start`, `end`, and `separator` slots can be styled using CSS parts.

```html
<style>
  .redcrumbs wa-breadcrumb-item {
    color: firebrick;
  }
  .redcrumbs wa-breadcrumb-item:last-of-type {
    color: crimson;
  }
  .redcrumbs wa-breadcrumb-item::part(separator) {
    color: pink;
  }
  .redcrumbs wa-breadcrumb-item::part(start),
  .redcrumbs wa-breadcrumb-item::part(end) {
    color: currentColor;
  }
</style>
<wa-breadcrumb class="redcrumbs">
  <wa-breadcrumb-item>
    <wa-icon slot="start" name="house" variant="solid"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Articles</wa-breadcrumb-item>
  <wa-breadcrumb-item>Traveling</wa-breadcrumb-item>
</wa-breadcrumb>
```

### With Dropdowns

Dropdown menus can be placed in the default slot to provide additional options.

```html
<wa-breadcrumb>
  <wa-breadcrumb-item>Homepage</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    <wa-dropdown>
      <wa-button slot="trigger" size="s" appearance="filled" pill>
        <wa-icon label="More options" name="ellipsis" variant="solid"></wa-icon>
      </wa-button>
      <wa-dropdown-item type="checkbox" checked>Web Design</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Web Development</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Marketing</wa-dropdown-item>
    </wa-dropdown>
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Our Services</wa-breadcrumb-item>
  <wa-breadcrumb-item>Digital Media</wa-breadcrumb-item>
</wa-breadcrumb>
```

Alternatively, you can place dropdown menus in a `start` or `end` slot.

```html
<wa-breadcrumb>
  <wa-breadcrumb-item>Homepage</wa-breadcrumb-item>
  <wa-breadcrumb-item>Our Services</wa-breadcrumb-item>
  <wa-breadcrumb-item>Digital Media</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    Web Design
    <wa-dropdown slot="end">
      <wa-button slot="trigger" size="s" appearance="filled" pill>
        <wa-icon label="More options" name="ellipsis" variant="solid"></wa-icon>
      </wa-button>
      <wa-dropdown-item type="checkbox" checked>Web Design</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Web Development</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Marketing</wa-dropdown-item>
    </wa-dropdown>
  </wa-breadcrumb-item>
</wa-breadcrumb>
```
