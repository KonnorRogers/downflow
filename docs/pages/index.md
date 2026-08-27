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


<div style="display: grid; place-content: center;">
  <wa-button class="call-to-action" href="{{ "/docs/introduction/getting-started/" | url }}" size="l" variant="brand" appearance="filled">
    Get Started
    <wa-icon name="arrow-right" slot="end"></wa-icon>
  </wa-button>
</div>

<style>
.animated-pipes {
  height: calc(32px * 12);
  width: 100%;
}

.pipe {
  --frame-offset-y: 0px;
  --frame-offset-x: 0px;
  --frame-gap: 256px;      /* stride between frames on the sheet */
  width: 16px;        /* the visible art within each cell */
  height: 16px;

  transform: translateZ(1px);
  will-change: transform;
  zoom: 8;
  animation: frame-by-frame 2s steps(var(--frames)) infinite;
  margin-top: -0.25px;

  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: url('{{ "/assets/images/water-tubes.png" | url }}');
  background-position: var(--frame-offset-x) calc(-1 * var(--frame-offset-y));
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

.pipe-down {
  --frames: 16;
}


.pipe-corner-bottom-right {
  --frames: 2;
  --frame-offset-y: -48px;
  background-image: url('{{ "/assets/images/water-tubes.png" | url }}');
  animation: frame-by-frame 0.300s steps(var(--frames)) infinite;
}

.pipe-horizontal {
  --frames: 16;
  transform: rotate(270deg);
}


@keyframes frame-by-frame {
  from {
    background-position:
      var(--frame-offset-x)
      var(--frame-offset-y);
  }
  to {
    background-position:
      calc(var(--frame-offset-x) - var(--frames) * var(--frame-gap))
      var(--frame-offset-y);
  }
}

.pipe-node {
  display: inline-block;
  padding: 1rem;
  border: 2px solid light-dark(black, white);
}
</style>


<!-- <div class="animated-pipes"> -->
<!--   <div class="pipe-node">State</div> -->
<!--   <div class="pipe pipe-down"></div> -->
<!--   <div class="pipe pipe-down"></div> -->
<!--   <div class="pipe pipe-down"></div> -->
<!--   <div class="pipe-node">Node</div> -->

<!--   <div style="display: flex;"> -->
<!--     <div class="pipe pipe-corner-bottom-right"></div> -->
<!--     <div class="pipe pipe-horizontal"></div> -->
<!--   </div> -->
<!-- </div> -->


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
