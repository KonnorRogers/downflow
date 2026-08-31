# Customizing & Theming

**Full documentation:** https://webawesome.com/docs/customizing

You can customize the look and feel of Web Awesome at a high level with themes. For an overview of how the theming system works — [themes](https://webawesome.com/docs/themes), [palettes](https://webawesome.com/docs/color-palettes), [variants](https://webawesome.com/docs/tokens/color#variant-colors), and dark mode — see [Theming](https://webawesome.com/docs/theming-overview). For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

## Themes

Web Awesome uses [themes](https://webawesome.com/docs/themes) to apply a cohesive look and feel across the entire library. Themes are built with a collection of predefined CSS custom properties, which we call [design tokens](https://webawesome.com/docs/tokens), and there are many pre-built themes to choose from.

### Use a Pre-Built Theme

[Sign up](https://webawesome.com/signup) or [log in](https://webawesome.com/login) to create a project, then follow the steps below.

#### Free Workspace Projects

| Step | Action |
| --- | --- |
| 1 | Go to your project's Settings. |
| 2 | Find Theme and select the theme you'd like to use. |
| 3 | Find Color Palette and select the palette you'd like to use. |
| 4 | Save your changes to immediately update anywhere you're using your project. |

#### Pro Workspace Projects

| Step | Action |
| --- | --- |
| 1 | Go to your project's Settings. |
| 2 | Press Edit Your Theme to open the Theme Builder. |
| 3 | Select a pre-built theme or customize colors, fonts, icons, and more. |
| 4 | Save your theme to immediately update anywhere you're using your project. |

### Theme Builder

The Theme Builder is a visual editor for **Pro workspace projects** that lets you customize your project's [theme](https://webawesome.com/docs/themes), [color palette](https://webawesome.com/docs/color-palettes), [variant colors](https://webawesome.com/docs/tokens/color#variant-colors), fonts, roundness, spacing, and icons — with a live preview as you go. Saves apply instantly anywhere you're using your project.

You can launch the Theme Builder from your project's Settings by pressing Edit Your Theme.

### Light & Dark Mode

Every theme is designed to adapt to light and dark mode. Light mode styles are applied by default, but you can apply a specific color scheme to an entire page or just a section with `class="wa-light"` or `class="wa-dark"`.

```html
<div class="wa-grid">
  <wa-card class="wa-light">
    <div slot="header" class="wa-split wa-color-text-quiet">
      <h4 class="wa-heading-s">Light</h4>
      <wa-icon name="sun-bright" variant="regular"></wa-icon>
    </div>
    <div class="wa-stack">
      <wa-input label="# of Waffles" type="number" value="3"></wa-input>
      <wa-select label="Toppings" multiple value="jelly-beans">
        <wa-option value="whipped-cream">Whipped cream</wa-option>
        <wa-option value="hershey">Hershey's Kisses</wa-option>
        <wa-option value="jelly-beans">Jelly beans</wa-option>
      </wa-select>
      <wa-button appearance="filled" variant="brand">
        <wa-icon slot="start" name="waffle"></wa-icon>
        Make Waffles
      </wa-button>
    </div>
  </wa-card>

  <wa-card class="wa-dark">
    <div slot="header" class="wa-split wa-color-text-quiet">
      <h4 class="wa-heading-s">Dark</h4>
      <wa-icon name="moon-stars" variant="regular"></wa-icon>
    </div>
    <div class="wa-stack">
      <wa-input label="# of Waffles" type="number" value="3"></wa-input>
      <wa-select label="Toppings" multiple value="jelly-beans">
        <wa-option value="whipped-cream">Whipped cream</wa-option>
        <wa-option value="hershey">Hershey's Kisses</wa-option>
        <wa-option value="jelly-beans">Jelly beans</wa-option>
      </wa-select>
      <wa-button appearance="filled" variant="brand">
        <wa-icon slot="start" name="waffle"></wa-icon>
        Make Waffles
      </wa-button>
    </div>
  </wa-card>
</div>
```

#### Inverting the Color Scheme

You can force a section to behave like `.wa-dark` in light mode and like `.wa-light` in dark mode by using `class="wa-invert"`.

```html
<p>This card will always use the opposite of the color scheme applied to the docs.</p>

<wa-card class="wa-invert">
  <div slot="header" class="wa-split wa-color-text-quiet">
    <h4 class="wa-heading-s">Invert</h4>
    <wa-icon name="swap"></wa-icon>
  </div>
  <div class="wa-flank:end wa-align-items-end">
    <wa-select label="Location" value="upside-down">
      <wa-option value="lab">Hawkins Lab</wa-option>
      <wa-option value="mall">Starcourt Mall</wa-option>
      <wa-option value="upside-down">The Upside Down</wa-option>
    </wa-select>
    <wa-button id="go-button" appearance="filled" variant="brand">
      <wa-icon label="Go" name="person-to-portal" family="duotone"></wa-icon>
    </wa-button>
    <wa-tooltip for="go-button"> Go! </wa-tooltip>
  </div>
</wa-card>
```

#### Detecting Color Scheme Preference

While both light and dark mode styles are built-in to all themes, Web Awesome doesn't automatically detect the user's color scheme preference. We recommend doing this at the application level.

Follow these best practices for supporting both light and dark mode:

-   Check for [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme) and use its value by default
-   Allow the user to override this setting in your app
-   Remember the user's preference and restore it on subsequent visits

Let's assume you have a button with `id="color-scheme-button"` that simply toggles between light and dark mode. You can use the following JS snippet to apply `class="wa-dark"` to the `<html>` element accordingly:

```js
// Function to apply color scheme
function applyScheme(dark) {
  document.documentElement.classList.toggle('wa-dark', dark);
}

// Function to get the user's preferred color scheme
// Grabs from local storage if available or falls back to system preference
function getPreferredScheme() {
  const savedMode = localStorage.getItem('wa-color-scheme');
  if (savedMode !== null) return savedMode === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Apply the preferred color scheme on load
applyScheme(getPreferredScheme());

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  // If nothing in local storage, update accordingly
  const savedMode = localStorage.getItem('wa-color-scheme');
  if (!savedMode) {
    applyScheme(event.matches);
  }
});

// Listen for clicks on the color scheme button
document.getElementById('color-scheme-button').addEventListener('click', () => {
  const toDark = !document.documentElement.classList.contains('wa-dark');
  applyScheme(toDark);
  localStorage.setItem('wa-color-scheme', toDark ? 'dark' : 'light');
});
```

### Customizing with CSS

For even more customizations, you can off-road and override any theme just with CSS — no preprocessor required. All tokens use the `--wa-` prefix to prevent collisions with other libraries. Write a stylesheet that overrides Web Awesome's [design tokens](https://webawesome.com/docs/tokens) and you're off to the races.

Here's a starter that tweaks fonts, spacing, and corner radius across both color schemes:

```css
/* Custom CSS — applies to both light and dark mode */
:where(:root),
.wa-light,
.wa-dark,
.wa-invert {
  --wa-font-family-body: 'Inter', sans-serif;
  --wa-font-family-heading: 'Crimson Pro', serif;
  --wa-border-radius-scale: 1.5;
  --wa-space-scale: 1.125;
}
```

To create your own light mode styles, scope your styles to the following selectors:

```css
:where(:root),
.wa-light,
.wa-dark .wa-invert {
  /* your styles here */
}
```

To create your own dark mode styles, scope your styles to these selectors:

```css
.wa-dark,
.wa-invert {
  /* your styles here */
}
```

| Selector | What It Targets |
| --- | --- |
| \`:where(:root)\` | The default scope, with low specificity so other theme classes can override it |
| \`.wa-light\` | Explicit light sections |
| \`.wa-dark\` | Explicit dark sections |
| \`.wa-invert\` | Flips the current color scheme on this element |
| \`.wa-dark .wa-invert\` | An inverted descendant inside a dark section (becomes light) |

For a complete list of all custom properties used for theming, refer to `src/styles/themes/default.css` in the project's source code.

### Using Multiple Themes

You can use multiple themes on a single page as long as the styles for each theme are scoped to a specific class. All pre-built themes are scoped to their own classes. The Default theme is additionally scoped to `:where(:root)` so that the styles are applied automatically.

Simply load the theme stylesheets, then add your preferred classes to each element.

```html
<!-- Load each theme's stylesheet -->
<link rel="stylesheet" href="https://ka-f.webawesome.com/webawesome@3.10.0/styles/themes/awesome.css" />
<link rel="stylesheet" href="https://ka-f.webawesome.com/webawesome@3.10.0/styles/themes/shoelace.css" />

<wa-callout class="wa-theme-awesome wa-brand-yellow" style="margin-block-start: 0;">
  <wa-icon slot="icon" name="face-awesome"></wa-icon>
  <div class="wa-flank:end">
    <span>This callout uses <code>wa-theme-awesome</code> and <code>wa-brand-yellow</code>.</span>
    <wa-button variant="brand" size="s">Yellow Button</wa-button>
  </div>
</wa-callout>

<wa-callout class="wa-theme-shoelace wa-brand-cyan">
  <wa-icon slot="icon" name="shoelace" family="brands"></wa-icon>
  <div class="wa-flank:end">
    <span>This callout uses <code>wa-theme-shoelace</code> and <code>wa-brand-cyan</code>.</span>
    <wa-button variant="brand" size="s">Cyan Button</wa-button>
  </div>
</wa-callout>
```

You can also use multiple variant colors on the same page. **On each element where you change the variant color, also add `wa-theme-*` — even if the theme doesn't change.** Otherwise the theme keeps using its original variant colors.

```html
<!-- Add class="wa-theme-default" to each element whose brand color changes -->
<wa-callout>
  <div class="wa-stack wa-align-items-start wa-gap-xs">
    <span>The buttons in this callout use multiple brand colors.</span>
    <div class="wa-cluster">
      <wa-button class="wa-theme-default wa-brand-cyan" variant="brand" size="s">Cyan</wa-button>
      <wa-button class="wa-theme-default wa-brand-indigo" variant="brand" size="s">Indigo</wa-button>
      <wa-button class="wa-theme-default wa-brand-purple" variant="brand" size="s">Purple</wa-button>
      <wa-button class="wa-theme-default wa-brand-pink" variant="brand" size="s">Pink</wa-button>
    </div>
  </div>
</wa-callout>
```

## Customizing Components

While themes offer a high-level way to customize the library, individual components offer different hooks as a low-level way to customize them one at a time. Web Awesome components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose a set of CSS parts, custom properties, and custom states that can be targeted to customize their appearance.

### CSS Parts

CSS parts offer the most flexibility to customize individual components. The "parts" exposed by each component can be targeted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Parts allow you to style _any_ standard CSS property, not just those exposed through custom properties. Here's an example that modifies buttons with the `gradient-button` class.

```html
<wa-button class="gradient-button"> Gradient Button </wa-button>

<style>
  .gradient-button::part(base) {
    background: linear-gradient(217deg, var(--wa-color-indigo-50), var(--wa-color-purple-50), var(--wa-color-red-50));
    border: solid 1px var(--wa-color-purple-50);
    transition:
      transform 100ms,
      box-shadow 100ms;
  }

  .gradient-button::part(base):hover {
    box-shadow: var(--wa-shadow-m);
    transform: translateY(-3px);
  }

  .gradient-button::part(base):active {
    box-shadow: inset var(--wa-shadow-s);
    transform: translateY(0);
  }

  .gradient-button::part(label) {
    color: white;
    text-shadow: rgb(0 0 0 / 0.3) 0 -1px;
  }
</style>
```

CSS parts have a few important advantages:

-   Customizations can be made to components with explicit selectors, such as `::part(icon)`, rather than implicit selectors, such as `.button > div > span + .icon`, that are much more fragile.
    
-   The internal structure of a component will likely change as it evolves. By exposing CSS parts through an API, the internals can be reworked without fear of breaking customizations as long as its parts remain intact.
    
-   It encourages us to think more about how components are designed and how customizations should be allowed before users can take advantage of them. Once we opt a part into the component's API, it's guaranteed to be supported and can't be removed until a major version of the library is released.
    

Most (but not all) components expose parts. You can find them in each component's API documentation under the "CSS Parts" section.

### Custom Properties

Components expose custom properties that are scoped to the component, not global, so they do not have the same `--wa-` prefix as a theme's custom properties. These custom properties reflect common qualities of a component, such as `--background-color`, `--border-style`, `--size`, etc.

You can set custom properties on a component in your stylesheet.

```css
wa-avatar {
  --size: 6rem;
}
```

This will also work if you need to target a subset of components with a specific class.

```css
wa-avatar.your-class {
  --size: 6rem;
}
```

Alternatively, you can set them inline directly on the element.

```html
<wa-avatar style="--size: 6rem;"></wa-avatar>
```

The custom properties exposed by each component can be found in the component's API documentation.

### Custom States

Components can expose custom states that allow you to style them based on their current condition using the `:state()` selector. Custom states provide a way to target specific component states that aren't covered by standard pseudo-classes like `:hover` or `:focus`. Here's an example that styles a checkbox that's checked.

```css
wa-checkbox:state(checked) {
  outline: dotted 2px tomato;
}
```

Custom states can be combined with CSS parts and custom properties to create sophisticated customizations. The custom states exposed by each component can be found in the component's API documentation under the "Custom States" section.

### Native Elements

If you're using [native styles](https://webawesome.com/docs/utilities/native), any custom styles added for a component should also target the corresponding native element. In general, the same styles you declare for components will work just the same to style their native counterparts.

For example, we can give `<input type="checkbox">` the same custom styles as [`<wa-checkbox>`](https://webawesome.com/docs/components/checkbox) by using standard CSS properties and CSS parts:

```html
<wa-checkbox class="pinkify">Web Awesome checkbox</wa-checkbox>
<br />
<label>
  <input type="checkbox" class="pinkify" />
  HTML checkbox
</label>

<style>
  wa-checkbox.pinkify::part(control),
  input[type='checkbox'].pinkify {
    border-width: 3px;
  }

  wa-checkbox.pinkify:state(checked)::part(control),
  input[type='checkbox'].pinkify:checked {
    background-color: hotpink;
    border-color: hotpink;
    color: lavenderblush;
  }
</style>
```