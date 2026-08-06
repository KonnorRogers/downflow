## Next

- `flow-context` can be one of `$form`, `$context`, or `<controller-name>`, and will read from the controller's `context`
- Added global `application.functions` that can be called from anywhere
- Added `flow-prop`, `flow-attr`, and `flow-context` attributes.
- Changed syntax for `#form`, `#context`, and `<controller_name>#state` to now be unified under `flow-context`.
- Removed hacky reactivity and moved to `@vue/reactivity`. `application.context` is now a reactive ref, and `Controller.state` is now reactive by default.
- Removed `global` controller. If you want it, attach a `data-controller="global"` to the top level root element. It was too hacky to stay.
