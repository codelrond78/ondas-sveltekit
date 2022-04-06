<script>
    import { getContext } from 'svelte';
    const { data, x, xScale, y, yScale } = getContext('LayerCake');
  
    export let fill = '#000';
    export let r = 5;
  </script>
  
  <g>
    {#each $data as d}
      <circle cx='{ $xScale($x(d)) }' cy='{ $yScale($y(d)) }' {fill} {r} />
    {/each}
  </g>