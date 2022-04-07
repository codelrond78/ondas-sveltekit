<script>
    import { LayerCake, Svg } from 'layercake';
    import RangeSlider from "svelte-range-slider-pips";
    //import Line from './Line.svelte'
    import MultiLine from './MultiLine.svelte'
    import { onDestroy } from 'svelte';
  	import Ring from 'ringjs';
    import {range} from 'range';

    const seriesColors = ['#ffe4b8', '#ffb3c0'];
    const seriesNames = ['onda', 'derivada'];
    const zKey = 'type';

    const t0 = 5; // 5 segundos, ventana inicial de 0 a 5 segundos
    const delta = 0.05;
    let ring = new Ring(t0/delta);
    let ringDerivada = new Ring(t0/delta);

    let fi0 = 0.0;
    let frecuencia = [1.0];
    let amplitud = [1.0];
    let data = [];

    const flatten = data => data.reduce((memo, group) => {
      return memo.concat(group.values);
    }, []);

    function onda(t){
        return amplitud[0]*Math.sin(2*Math.PI*frecuencia[0]*t + fi0)
    }

    function derivada(t){
      return amplitud[0]*Math.sin(0.5*2*Math.PI*frecuencia[0]*t + Math.PI)
    }

    range(0, t0, delta).forEach((t) => {
      ring.push({
        x: t,
        y: onda(t)
      });
      ringDerivada.push({
        x: t,
        y: derivada(t)
      });
    });

    let points = ring.toArray()
    let pointsDerivada = ringDerivada.toArray()
	  let t = 0;

    const handle = () => {	
      //return;
      ring.push(
        {
          x: t0 + t,
          y: onda(t0 + t)
        })
        ringDerivada.push(
        {
          x: t0 + t,
          y: derivada(t0 + t)
        })
      points = ring.toArray();
      pointsDerivada = ringDerivada.toArray();
      t = t + delta;
    }
    const interval = setInterval(handle, 1000.0*delta);

    onDestroy(() => {
		console.log('on destroy cancel interval')
		clearInterval(interval)
	});

  $: {
    data = []
    data.push({type: 'onda', values: points})
    data.push({type: 'derivada', values: pointsDerivada})
    data = data
  }


  </script>
  
  <style>
    .chart-container {
      width: 100%;
      height: 300px;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
      data={ data }
      x='x'
      y='y'
      z={zKey}
      flatData={flatten(data)}
      zDomain={seriesNames}
      zRange={seriesColors}
    >
        <Svg>        
            <MultiLine />
        </Svg>
    </LayerCake>
  </div>

  <button on:click={()=>clearInterval(interval)} 
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Stop
  </button>

<span>Amplitud: {amplitud[0]}</span><RangeSlider min={0} max={10.0} bind:values={amplitud} /> 
<span>Frecuencia: {frecuencia[0]}</span><RangeSlider min={1} max={10.0} bind:values={frecuencia} />