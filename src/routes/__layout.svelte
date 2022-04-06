<!-- __layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte'
  import '$lib/styles/style.scss';
  import "virtual:windi.css"
  //import { browser } from "$app/env";
  //if (browser) import("virtual:windi-devtools")
</script>

<Header />

<main>
  <slot />
</main>

<footer>Hello, I'm the footer.</footer>
