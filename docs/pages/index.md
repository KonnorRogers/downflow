---
layout: default.njk
title: Downflow
---

<style>
.flow {
  color: var(--wa-color-neutral-50);
  text-decoration: underline wavy;
  color: var(--wa-color-brand-50);
  background: none;
  text-underline-offset: 4px; /* pushes the squiggle down a bit */
  padding: 0;
  font-family: var(--wa-font-family-body);
}
</style>

<div class="hero">
    <h1>Let your state <mark class="flow">flow</mark></h1>
    <p>Downflow adds live behavior to server rendered HTML. No build step. No virtual DOM. No new template language. No <code>eval</code>, so it won't fight your Content Security Policy.</p>
</div>

## Install

```
npm install downflow
```

## The whole pitch, in one example

```html
<script type="module">
  import { Application } from "downflow";

  const application = Application.start();

  application.context = {
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  };
</script>

<div>
  <button flow-action="click#decrement">-</button>
  <span flow-text="count">0</span>
  <button flow-action="click#increment">+</button>
</div>
```

`application.context` is your state. `flow-text` puts a value on the page. `flow-action` wires up an event. Downflow watches the page and keeps them in sync. Change the state from anywhere and every `flow-text`, `flow-attr`, and `flow-prop` pointed at it updates.

## Why

Most reactive libraries want you to write a template, write logic inside HTML attributes, or hand your Content Security Policy an `unsafe-eval`. Downflow reads values off plain objects. No template language, no expressions to evaluate, no reason to loosen your CSP. Read [why not use something that already exists?]({{ "/docs/introduction/why-not-something/" | url }}) for the full case.

## Start here

Head to [Getting Started]({{ "/docs/introduction/getting-started/" | url }}) to build the counter above step by step, or jump straight into [Learn]({{ "/docs/learn/bindings/" | url }}) for the full attribute reference.

---

This whole site runs on downflow. Every live example on these pages, down to the color switcher in the header, is the library rendering itself.
