<script>
	import RangeSlider from "svelte-range-slider-pips";
	import "@carbon/charts/styles.min.css";
	import { LineChart } from "@carbon/charts-svelte";
  	import { onDestroy } from 'svelte';
	import Ring from 'ringjs';
	import {range} from 'range';

	var ring = new Ring(50);

	let fi0 = 0.0;
	let frecuencia = [1.0];
	let amplitud = [1.0];
	let data = [];
	
	function onda(t){
		return amplitud[0]*Math.sin(2*Math.PI*frecuencia[0]*t + fi0)
	}

	const t0 = 5; // 5 segundos, ventana inicial de 0 a 5 segundos
	const delta = 0.1; // 0.1 segundos, intervalo para calculo

	range(0, t0, delta).forEach((t) => ring.push({
		"group": "Dataset 0",
		"date": t,
		"value": onda(t)
	}));
	
	data = ring.toArray()
  
	let t = 0;

	const handle = () => {	
		//return ;			
		ring.push({
			"group": "Dataset 0",
			"date": t0 + t,
			"value": onda(t0 + t)
		})
		data = ring.toArray();
		t = t + delta;
	}
	const interval = setInterval(handle, 1000.0*delta);

	onDestroy(() => {
		console.log('on destroy cancel interval')
		clearInterval(interval)
	});

</script>

<button class="btn" on:click={()=>clearInterval(interval)}>stop</button>

<LineChart
	data={data}
	options={{
	"animations": false,
	"title": "Stacked area (time series)",
	"axes": {
		"left": {
			"stacked": true,
			"scaleType": "linear",
			"mapsTo": "value"
		},
		"bottom": {
			"scaleType": "linear",
			"mapsTo": "date",
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>

<span>Amplitud: {amplitud[0]}</span><RangeSlider min={0} max={10.0} bind:values={amplitud} /> 
<span>Frecuencia: {frecuencia[0]}</span><RangeSlider min={1} max={10.0} bind:values={frecuencia} />
