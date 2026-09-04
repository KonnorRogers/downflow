---
---

{% set html %}
<script type="module">
  import { Application } from "downflow"

  const application = new Application()

  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  application.filters = {
    escape (str) {
      return str.replace(/[&<>"']/g, function(match) {
        return escapeMap[match];
      });
    },
    sanitize (str) {
    },
    toSrcDoc (str) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            ${str}
          </body>
        </html>
      `
    }
  }
  application.start()
</script>
<textarea flow-bind:html>
  <p>I am contenteditable. Type in me.</p>
</textarea>

<iframe srcdoc=""></iframe>
{% endset %}

{{ frame(html) }}
