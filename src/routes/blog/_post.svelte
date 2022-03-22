<!-- _post.svelte -->
<script context="module">
  //import 'prismjs/themes/prism.css';
  import '$lib/styles/prism-solarized-dark-atom.css';
</script>

<script>
  export let title
  export let date
</script>

<h1 class="text-2xl">{title}</h1>

<p>Published: {date}</p>

<article class="prose">
  <slot />
</article>
