---
layout: default.njk
title: Downflow
---

<div class="hero">
  <img
    class="pixel"
    width="256"
    height="256"
    src="{{ "/assets/images/water-dude.png" | url }}"
    style="width: auto; margin: 0 auto; margin-top: var(--wa-space-xl);"
  >
  <h1 style="margin-top: 0;">Let your state <mark class="emphasis">flow</mark></h1>
  <p class="wa-font-size-xl">Reactive DOM updates that don't drive a steamroller through your DOM.</p>
</div>

<br>


<div style="display: grid; place-content: center; grid-auto-flow: column; gap: var(--wa-space-m);">
  <wa-button class="call-to-action" href="{{ "/docs/references/why-downflow/" | url }}" size="l" variant="neutral" appearance="outlined">
    Why Downflow?
  </wa-button>
  <wa-button class="call-to-action" href="{{ "/docs/introduction/getting-started/" | url }}" size="l" variant="brand" appearance="filled">
    Get Started
    <wa-icon name="arrow-right" slot="end"></wa-icon>
  </wa-button>
</div>

<!--

## Install

```shell
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
-->
