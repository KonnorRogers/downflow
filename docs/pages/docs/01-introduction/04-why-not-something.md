---
title: Why not use something that already exists?
---

Fair question! Let's talk about why I personally did not find other libraries to be what I wanted.

I'm going to give a quick overview of why I personally did not find other libraries fit my needs, and you may just say, "Konnor, you're dumb." And that is fair, and I would probably agree.

### Alpine

Alpine, while you can write components in JS, _feels_ like it moves so much logic into HTML, almost to the point of being a new language. I like the ideas and concepts behind Alpine, but something about it has never clicked. I don't like inlining JS and using JS in HTML strings. I am comfortable writing JS, and writing my JS inside of HTML attributes just feels wrong.

### Stimulus

Stimulus is nice, and is a large inspiration behind the creation of this library. But Stimulus has some things I don't particularly love. Mainly, there's no real concept of "state" or "rendering". You can add it, but everything requires a Controller, for better or worse. Stimulus has no concept of "common" operations, things like setting the `textContent` of an element, rendering a list, reading from shared state, etc. Stimulus is heavily decoupled, which you might think is great, but I felt it could use a little extra power to handle common use cases.

### petite-vue

Petite Vue partially served as inspiration for downflow. It has a lot of interesting ideas and similarities to what I wanted. The key problem I found is that declaring a reactive data object per component before you can bind anything tedious, and I also did not feel the handlebars like syntax of using:
{% raw %}`{{ }}`{% endraw %}
was compatible with server rendered views without having to write the same markup twice, which I had no interest in. I wanted a frontend library where I could "enhance" server rendered views, not have to write them twice.

### htmx

htmx is a different paradigm. Downflow is mainly intended for "frontend" state. If you have a server, and the html / data can come from there, then htmx is a much stronger fit for you.

### DataStar

DataStar is interesting, as it does a lot of things similar to `downflow`. It uses signals for backing state, it handles common use cases, etc. Similar to htmx, DataStar is largely centered around backend-driven state over a SSE (Server Sent Event) connection. The thing that is hard for me with DataStar is it has a very big DSL, almost to the point of dissuading you from writing JavaScript. DataStar solves this by giving you a very large number of attributes to pick from to solve your problem. Downflow encourages you to write controllers for places where you need extra control.

## Content Security Policies (CSP)

Finally, let's address the elephant in the room. Content Security Policies. CSP for short.

Almost every library I listed above (besides Stimulus) has an issue with CSP in some form.

The majority of apps with a dedicated security team will have strict CSPs. CSPs don't fully protect you from XSS and other nastiness, but they do reduce the blast radius. I won't talk about what settings you should have for your CSP, purely because that is a much longer essay, and frankly, I'm not sure I would do it justice.

Regardless, you have probably tried to use Alpine, or htmx, or DataStar, or any other library in your company's app and hit the issue of "X violates your Content Security Policy." You're just looking to do some simple DOM manipulation, not have to schedule a meeting with your security team about why they should relax the CSPs for the application.

This is why `downflow` doesn't support constructs like `flow-context="{ foo: "bar" }"` for defining contexts, because inevitably, you will hit Content Security Policy (CSP) issues because it needs to be evaluated with using either `new Function()` or using `eval()`, which most of the above libraries do, and requires a CSP that allows `unsafe-eval`.

See:

- DataStar - <https://data-star.dev/reference/security#content-security-policy>
- petite-vue - <https://github.com/vuejs/petite-vue#security-and-csp>
- Alpine - <https://alpinejs.dev/advanced/csp> - (uses a specific CSP build which is a ~1000 line parser, and not all syntax is supported like `x-html` for example. <https://github.com/alpinejs/alpine/blob/main/packages/csp/src/directives/x-html.js> )
- htmx - <https://htmx.org/essays/web-security-basics-with-htmx/>


This is not to say `downflow` is 100% safe and security focused and will protect you from Cross Site Scripting Attacks (XSS). That is simply not true. It is also not the intent of `downflow` or why it was created. Downflow was created to avoid modifying your CSP, not to protect you from XSS.

Downflow resolves bindings by property lookup, not by evaluating expressions, so it needs no `unsafe-eval` in your CSP. However, things like component rendering, attributes like `flow-action` can still be used to exfiltrate data, and as such, untrusted input should always be sanitized.

