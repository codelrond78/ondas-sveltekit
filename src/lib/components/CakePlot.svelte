<script>
    import { LayerCake, Svg } from 'layercake';
    import Scatter from './Scatter.svelte'
    import { onDestroy } from 'svelte';
	import Ring from 'ringjs';
    import {range} from 'range';

    let ring = new Ring(50);

    let fi0 = 0.0;
    let frecuencia = [1.0];
    let amplitud = [1.0];

    function onda(t){
        return amplitud[0]*Math.sin(2*Math.PI*frecuencia[0]*t + fi0)
    }

    const t0 = 5; // 5 segundos, ventana inicial de 0 a 5 segundos
    const delta = 0.1; // 0.1 segundos, intervalo para calculo

    range(0, t0, delta).forEach((t) => ring.push({
		x: t,
		y: onda(t)
	}));

    let points = ring.toArray()
  
	let t = 0;

	const handle = () => {	
		return ;			
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
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
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
            <Scatter fill={'blue'} r={3} />
        </Svg>
    </LayerCake>
  </div>