---
layout: blog
---
{::options parse_block_html="true" /}

{% for post in site.posts %}
<section>
  <h2>{{ post.title }}</h2>
  <time>{{ post.date | date: "%-d %B %Y" }}</time>
  {{ post.content }}
</section>
{% endfor %}
