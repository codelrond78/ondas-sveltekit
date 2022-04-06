<script>
    import { LayerCake, Svg } from 'layercake';
    import RangeSlider from "svelte-range-slider-pips";
    import Line from './Line.svelte'
    import { onDestroy } from 'svelte';
	import Ring from 'ringjs';
    import {range} from 'range';

    const t0 = 5; // 5 segundos, ventana inicial de 0 a 5 segundos
    const delta = 0.05;
    let ring = new Ring(t0/delta);

    let fi0 = 0.0;
    let frecuencia = [1.0];
    let amplitud = [1.0];

    function onda(t){
        return amplitud[0]*Math.sin(2*Math.PI*frecuencia[0]*t + fi0)
    }

    range(0, t0, delta).forEach((t) => ring.push({
		x: t,
		y: onda(t)
	}));

    let points = ring.toArray()
  
	let t = 0;

	const handle = () => {	
		ring.push({
			x: t0 + t,
            y: onda(t0 + t)
		})
		points = ring.toArray();
		t = t + delta;
	}
	const interval = setInterval(handle, 1000.0*delta);

    onDestroy(() => {
		console.log('on destroy cancel interval')
		clearInterval(interval)
	});
  </script>
  
  <style>
    .chart-container {
      width: 100%;
      height: 300px;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
      data={ points }
      x='x'
      y='y'
    >
        <Svg>        
            <!--<Scatter fill={'blue'} r={3} />-->
            <Line />
        </Svg>
    </LayerCake>
  </div>

  <button on:click={()=>clearInterval(interval)} 
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Stop
  </button>

<span>Amplitud: {amplitud[0]}</span><RangeSlider min={0} max={10.0} bind:values={amplitud} /> 
<span>Frecuencia: {frecuencia[0]}</span><RangeSlider min={1} max={10.0} bind:values={frecuencia} />