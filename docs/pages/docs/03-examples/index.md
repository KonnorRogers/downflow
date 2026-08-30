---
title: Examples
---

<ol style="list-style: none; display: grid; gap: 1rem;" role="list">
  {%- for doc in getCollectionForCategory("examples", collections.docs) -%}
    <li>
      <a href="{{ doc.url | url }}">
        > {{ doc.data.title }}
      </a>
    </li>
  {%- endfor -%}
</ol>


