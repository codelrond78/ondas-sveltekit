<script>
  import { useInterval } from '@svelte-use/core'

  const { counter, pause, resume } = useInterval(200, { controls: true })
</script>

<div>{$counter}</div>
<button on:click={pause}>Pause</button>
<button on:click={resume}>Resume</button>
