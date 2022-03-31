<script>
	import "@carbon/charts/styles.min.css";
	import { StackedAreaChart } from "@carbon/charts-svelte";
  import { onDestroy } from 'svelte';

let counter = 0;
  
	const handle = () => {
    data[0].value -= 1000;
    data[1].value -= 1000;
    data[2].value -= 1000;
    data[3].value -= 1000;
    data[4].value -= 1000;
    data = data;
    counter += 1;
    console.log(counter)
  }
	const interval = setInterval(handle, 100);

	onDestroy(() => clearInterval(interval));

let data = [
  /*{
		"group": "Dataset 1",
		"date": "2018-12-31T23:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-04T23:00:00.000Z",
		"value": 65000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-07T23:00:00.000Z",
		"value": 10000
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-12T23:00:00.000Z",
		"value": 49213
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-16T23:00:00.000Z",
		"value": 51213
	},*/
	{
		"group": "Dataset 2",
		"date": "2018-12-31T23:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-04T23:00:00.000Z",
		"value": 25000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-07T23:00:00.000Z",
		"value": 60000
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-12T23:00:00.000Z",
		"value": 30213
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-16T23:00:00.000Z",
		"value": 55213
	},/*
	{
		"group": "Dataset 3",
		"date": "2018-12-31T23:00:00.000Z",
		"value": 30000
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-04T23:00:00.000Z",
		"value": 20000
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-07T23:00:00.000Z",
		"value": 40000
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-12T23:00:00.000Z",
		"value": 60213
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-16T23:00:00.000Z",
		"value": 25213
	}*/
];
  
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
