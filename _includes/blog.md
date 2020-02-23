## Blog
<ul>
  {% for post in site.posts %}
    <li>
      <small>{{ post.date | date: "%d %b %Y" }}</small>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
