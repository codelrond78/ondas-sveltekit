<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
 <script>
    import { getContext } from 'svelte';
  
    function color(type){
        //['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];
        if(type === 'onda'){
            return '#ff7ac7';
        }
        else {
            return '#ff00cc';
        }
    }

    const { data, xGet, yGet, zGet } = getContext('LayerCake');
  
    $: path = values => {
      return 'M' + values
        .map(d => {
          return $xGet(d) + ',' + $yGet(d);
        })
        .join('L');
    };
  </script>
  
  <g class="line-group">
    {#each $data as group}
      <path
        class='path-line'
        d='{path(group.values)}'
        stroke="{color(group.type)}"
      ></path>
    {/each}
  </g>
  
  <style>
    .path-line {
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-width: 3px;
    }
  </style>