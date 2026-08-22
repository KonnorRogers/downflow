# Transitions

**Full documentation:** https://webawesome.com/docs/tokens/transitions

Design Tokens Transitions

Transition tokens make interactions feel more lively and help users understand the relationship between their action and its outcome.

Mouse over or focus the preview swatches below to see each token in action.

## Duration

Web Awesome uses different transition durations to make it easy to track a component's state while minimizing sluggish or distracting movement.

Properties that change between frequent, incidental states (like hover) typically use faster durations than properties that change between intentional states (like opening a menu or checking a box).

| Custom Property | Description |
| --- | --- |
| \`--wa-transition-fast\` | Fast duration for frequent, incidental state changes like hover and focus |
| \`--wa-transition-normal\` | Standard duration for typical state changes |
| \`--wa-transition-slow\` | Slow duration for intentional, impactful state changes like opening a panel or checking a box |

## Easing

Easing controls the standard `transition-timing-function` used for transitions throughout Web Awesome.

| Custom Property | Description |
| --- | --- |
| \`--wa-transition-easing\` | \`transition-timing-function\` Timing function () used for all Web Awesome transitions |