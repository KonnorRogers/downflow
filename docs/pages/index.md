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
    alt="pixel art image of a water droplet"
    style="width: auto; margin: 0 auto; margin-top: var(--wa-space-xl);"
    fetchpriority="high"
  >
  <h1 style="margin-top: 0;">Let your state <mark class="emphasis">flow</mark></h1>
  <p class="wa-font-size-xl">Reactive DOM updates that don't drive a steamroller through your DOM.</p>
</div>

<br>


<div style="display: grid; place-content: center; grid-template-columns: repeat(auto-fit, minmax(200px, auto)); gap: var(--wa-space-m);">
  <wa-button class="call-to-action" href="{{ "/docs/references/why-downflow/" | url }}" size="l" variant="neutral" appearance="outlined">
    Why Downflow?
  </wa-button>
  <wa-button class="call-to-action" href="{{ "/docs/introduction/getting-started/" | url }}" size="l" variant="brand" appearance="filled">
    Get Started
    <wa-icon name="arrow-right" slot="end"></wa-icon>
  </wa-button>
</div>
