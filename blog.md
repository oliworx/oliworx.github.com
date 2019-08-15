---
layout: blog
---
{::options parse_block_html="true" /}

{% for post in site.posts %}
<section>
  <h2>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  {{ post.content }}
</section>
{% endfor %}
