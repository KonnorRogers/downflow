# Focus

**Full documentation:** https://webawesome.com/docs/tokens/focus

Design Tokens Focus

Focus tokens create a consistent, recognizable outline that lets keyboard users track where they are on the page. Together with [`--wa-color-focus`](?active_tab=color), these tokens assemble the focus ring applied to all interactive Web Awesome components.

| Custom Property | Description |
| --- | --- |
| \`--wa-focus-ring-style\` | Line style for the focus outline |
| \`--wa-focus-ring-width\` | Thickness of the focus outline |
| \`--wa-focus-ring\` | Shorthand combining style, width, and color into a complete focus outline value |
| \`--wa-focus-ring-offset\` | Gap between the element's edge and the focus outline |

See your theme's focus ring by navigating this form with your keyboard:

```html
<form class="wa-stack">
  <wa-input label="Text Input">
    <span slot="hint">Press <kbd>Tab</kbd> to move focus to other interactive elements.</span>
  </wa-input>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-button variant="brand">Button</wa-button>
</form>
```