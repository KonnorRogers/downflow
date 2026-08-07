---
layout: default.njk
title: TITLE
---

{% for doc in collections.docs %}
<wa-card>
  <p>Title: {{ doc.title }}</p>
  <p>Slug: {{ doc.fileSlug }}</p>
  <p>Permalink: <a href="{{ doc.url }}">{{ doc.url }}</a></p>
  <p>output: {{ doc.outputPath }}</p>
</wa-card>
<br>
{% endfor %}

Hello World.
