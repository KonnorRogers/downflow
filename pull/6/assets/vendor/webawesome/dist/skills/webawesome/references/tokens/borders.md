# Borders

**Full documentation:** https://webawesome.com/docs/tokens/borders

Design Tokens Borders

Border tokens define the edges and corners of Web Awesome components. They use `rem` units so they scale with root font size. You can adjust individual tokens or use scale multipliers to change all widths or radii at once.

## Border Style

A single style token controls the line type used for all component borders throughout the library.

| Custom Property | Description |
| --- | --- |
| \`--wa-border-style\` | Standard border line style used across all components |

## Border Width

Border width tokens use `rem` units and are scaled by `--wa-border-width-scale`. Values below `1` make all borders thinner; values above `1` make them thicker.

| Custom Property | Description |
| --- | --- |
| \`--wa-border-width-scale\` | Global multiplier for all border width calculations |
| \`--wa-border-width-s\` | Thin border, used for most component outlines |
| \`--wa-border-width-m\` | Medium border, used for emphasized borders |
| \`--wa-border-width-l\` | Thick border, used for prominent outlines |

## Border Radius

Border radius tokens control the corner rounding of components. Size-based tokens use `rem` units and scale with `--wa-border-radius-scale`. Values below `1` make corners sharper; values above `1` make them rounder. Shape tokens provide fixed shapes regardless of the scale.

| Custom Property | Description |
| --- | --- |
| \`--wa-border-radius-scale\` | Global multiplier for all border radius calculations |
| \`--wa-border-radius-s\` | Small corner rounding, for compact components like badges and checkboxes |
| \`--wa-border-radius-m\` | Medium corner rounding, the default for most inputs and buttons |
| \`--wa-border-radius-l\` | Large corner rounding, for cards and panels |
| \`--wa-border-radius-pill\` | Fully rounded ends, creating a pill shape regardless of element size |
| \`--wa-border-radius-circle\` | Perfectly circular shape; element must have a 1:1 aspect ratio |
| \`--wa-border-radius-square\` | No corner rounding; sharp, square corners |