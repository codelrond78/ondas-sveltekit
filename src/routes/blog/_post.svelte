<!-- _post.svelte -->
<script context="module">
  //import 'prismjs/themes/prism.css';
  import '$lib/styles/prism-gruvbox-light.css';
  //https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-dark.css
</script>

<script>
  export let title
  export let date
</script>

<h1>{title}</h1>

<p>Published: {date}</p>

<slot />
