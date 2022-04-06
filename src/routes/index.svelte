<script>
    import { browser } from '$app/env';
    import Plot from "$lib/components/CakePlot.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


{#if browser}
    <span>inicio del plot</span>
    <Plot />
    <span>fin del plot</span>
{/if}


<span>fin del index</span>