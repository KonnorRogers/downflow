---
---

Targets are how a controller finds its own elements without reaching for `querySelector`. Targets require two parts:

`static targets = []` as an array of strings on the controller, and then set on an element via `flow-target="<controller-name>.<target-name>"`

An element can have multiple targets as long as they are all space separated. A controller can also have multiple targets.

## Declaring a target

To declare a target, set the static field to `static targets = ["<target-name>"]`

In this case, we'll make an `output` target.

```js
import { Controller } from "downflow";

class HelloController extends Controller {
  static controllerName = "hello";
  static targets = ["output"];

  greet() {
    this.outputTarget.textContent = "Hello!";
  }
}
```

## Mark it in HTML

`flow-target` takes `controllerName.targetName`.

```html
<form flow-controller="hello">
  <button type="button" flow-action="click->hello#greet">Greet</button>
  <div flow-target="hello.output"></div>
</form>
```

Declaring `static targets = ["output"]` gives you three things on the controller:

- `this.outputTarget`: the first matching element, or `null` if there isn't one.
- `this.outputTargets`: every matching element, as an array.
- `this.hasOutputTarget`: `true` or `false`, based on whether or not there are any targets detected.

## Multiple controllers, one element

`flow-target` accepts a space separated list, so one element can serve several controllers at once.

```html
<div flow-controller="example-1 example-2">
  <div flow-target="example-1.item example-2.item">Item 1</div>
</div>
```

## Lifecycle of targets

When a matching element shows up, downflow calls `<name>TargetConnected`. When it disappears or the attribute changes, it calls `<name>TargetDisconnected`.

```js
class ListController extends Controller {
  static targets = ["item"];

  itemTargetConnected(element) {
    console.log("new item", element);
  }

  itemTargetDisconnected(element) {
    console.log("item gone", element);
  }
}
```

## Nesting

A target only belongs to the closest controller with a matching `flow-controller` name. Nest the same controller name inside itself and the outer one stops counting targets that live inside the inner one.

```html
<div flow-controller="example">
  <div flow-target="example.item">Counted by the outer controller</div>
  <div flow-controller="example">
    <div flow-target="example.item">Counted by the inner controller only</div>
  </div>
</div>
```
