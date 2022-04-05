<script>
	import RangeSlider from "svelte-range-slider-pips";
	import "@carbon/charts/styles.min.css";
	import { StackedAreaChart } from "@carbon/charts-svelte";
  	import { onDestroy } from 'svelte';
	import Ring from 'ringjs';
	var ring = new Ring(50);

	let bound = [75];
	let counter = 0;
	let data = [];
	
	function onda(t){
		return Math.sin(2*Math.PI*t)
	}

	const t0 = 5;
	[...Array(t0*10).keys()].forEach((i) => ring.push(i*0.1));

	data = ring.toArray().map(t => ({
		"group": "Dataset 0",
		"date": t,
		"value": onda(t)
	}))	
  
	let t = 0;

	const handle = () => {				
		ring.push(t)
		data = ring.toArray().map(t => ({
			"group": "Dataset 0",
			"date": t0 + t,
			"value": onda(t0 + t)
		}));
		t = t + 0.1;
	}
	const interval = setInterval(handle, 100);

	onDestroy(() => clearInterval(interval));

</script>

<StackedAreaChart
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
			"scaleType": "time",
			"mapsTo": "date"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}}
	/>

<RangeSlider min={0} max={100} bind:values={bound} />