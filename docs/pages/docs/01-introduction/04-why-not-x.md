---
title: Why not?
---

## Why Not `thing`?

Good question! Let's talk about why I personally did not find other library's suitable for the problem I wanted to solve.

### Alpine

Alpine, while you can write components in JS, _feels_ like it moves so much logic into HTML, almost to the point of being a new language. I like the ideas and concepts behind Alpine, but something about it has never clicked. I particularly don't like inlining JS and using JS in HTML strings. The lines get too blurry.

### Stimulus

Stimulus is nice, and is largely the reason behind the creation of this library. But Stimulus has some things I don't particularly love. Mainly, there's no real concept of "state" or "rendering". You can add it, but everything requires a Controller, for better or worse. Its clunky, and decoupled almost to the point of being annoying. However, if you like it, who am I to judge.

### petite-vue

Petite vue is interesting, as its a templating language, and has a lot of similarities to what I wanted. The key problem I found is I wasn't interested in making models for everything, and I found {% raw %}`{{ }}`{% endraw %} syntax is largely incompatible with server rendered views without having to write the same markup twice, which I had no interest in.

### htmx

htmx is a different paradigm. Downflow is mainly intended for "frontend" state. If you have a server, and the html / data can come from there...use it.

### DataStar

Data star is interesting, as it does a lot of things, but also feels like Alpine to me. A very heavy DSL I don't particularly vibe with. And that is fine. Use it if you want. I'm not holding you hostage.

## Why don't you support `flow-context="{ foo: "bar" }"`

Because inevitably you will hit Content Security Policy (CSP) issues by evaluating within a `new Function()` or using `eval()`, which most of the above libraries do.

See:

- DataStar - <https://data-star.dev/reference/security#content-security-policy>
- petite-vue - <https://github.com/vuejs/petite-vue#security-and-csp>
- Alpine - <https://alpinejs.dev/advanced/csp> - (uses a specific CSP build which is a ~1000 line parser, and not all syntax is supported like `x-html` for example. <https://github.com/alpinejs/alpine/blob/main/packages/csp/src/directives/x-html.js> )
- htmx - <https://htmx.org/essays/web-security-basics-with-htmx/>

And sometimes, you don't have control over the CSP. (We won't get into the nitty gritty of CSPs, as thats an entire article on its own.)
