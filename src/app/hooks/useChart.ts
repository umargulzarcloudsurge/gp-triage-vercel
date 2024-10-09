"use client";
import { useState, useEffect } from "react";
import * as echarts from 'echarts'
import donutChartIcon from '../../../public/images/donut-chart-icon.svg';
import { ChartType } from "../types/enums";

// Custom colors for bar chart
const customColors = [

	"#FC8D71",
	"#9BD4E3",
	"#FC8D71",
	"#9BD4E3",
	"#9BD4E3",
	"#FC8D71",
	"#9BD4E3",
	"#FC8D71",
	"#9BD4E3",
	"#FC8D71",
	"#9BD4E3",
	"#FC8D71",
	"#9BD4E3",
];

const getLineChartData = (data: Array<number>, name: string, offsetColor1: string, offsetcolor2: string) => {
	const config = {
		toolbox: {
			feature: {
				saveAsImage: { show: false },
			},
		},
		grid: {
			left: "-10%",
			right: "0%",
			top: "-3%",
			bottom: "-20%",

			containLabel: true,
		},
		xAxis: [
			{
				show: false,
				type: "category",
				boundaryGap: false,
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			},
		],
		yAxis: [
			{
				show: false,
				type: "value",

			},
		],
		series: [
			{
				name: name,
				type: "line",
				stack: "Total",
				smooth: true,
				lineStyle: {
					width: 0,
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: offsetColor1,//"#9BD4E3",

						},
						{
							offset: 1,
							color: offsetcolor2,// "rgb(1, 191, 236)",
						},
					]),
				},
				emphasis: {
					focus: "series",
				},
				data: [] as Array<number>,
			},
		],
	};
	//const serires = config.series.find(i => i.name.toLowerCase() === name.toLowerCase())!;//?.data;//.push()
	if (data) {
		data.forEach((i: number) => {
			config.series[0].data.push(i);
		})
	}
	return config;
}

const lineChart2 = {
	toolbox: {
		feature: {
			saveAsImage: { show: false },
		},
	},
	grid: {
		left: "-10%",
		right: "0%",
		top: "-3%",
		bottom: "-20%",
		containLabel: true,
	},
	xAxis: [
		{
			show: false,
			type: "category",
			boundaryGap: false,
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
	],
	yAxis: [
		{
			show: false,
			type: "value",
		},
	],
	series: [
		{
			name: "Line 1",
			type: "line",
			stack: "Total",
			smooth: true,
			lineStyle: {
				width: 0,
			},
			showSymbol: false,
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "#FC8D71",
					},
					{
						offset: 1,
						color: "#FC8D71",
					},
				]),
			},
			emphasis: {
				focus: "series",
			},
			data: [140, 232, 101, 264, 90, 340, 250],
		},
	],
};

// const getBarChartData = (data: Array<any>) => {
const getBarChartData = (months: Array<string> | undefined, data: Array<number>) => {
	// Bar Chart Options
	const config = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		legend: { show: false },
		grid: {
			top: "1%",
			left: "3%",
			right: "14%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			show: false,
			type: "value",
		},
		yAxis: {
			axisLine: {
				show: false,

			},
			axisTick: {
				show: false,
			},
			type: "category",
			data: months,
		},
		series: [
			{
				name: "Appoinments Book Per Month",
				type: "bar",
				stack: "total",
				label: {
					position: "right",
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: data,
				itemStyle: {
					color: function (params: any) {
						return customColors[params.dataIndex];
					},
					borderRadius: [0, 20, 20, 0], // Top-right and bottom-right borderRadius
				},
				barMaxWidth: 15, // Adjust this value to reduce the height of the bars
				barCategoryGap: "10%", // Adjust this value to reduce the gap between bars
			},
		],
	};

	if (data) {
		data.forEach((i: number) => {
			config.series[0].data.push(i);
		})
	}
	return config;
}

const getDonutChart = (data: Array<any>,) => {
	const config = {
		title: {
			// text: '',
			rich: {
				myIcon: {
					height: 70, // Set the height of your icon
					width: 70, // Set the width of your icon

					backgroundColor: {
						backgroundImage: "../images/donut-chart-icon.svg", // Use the imported icon as the background image
					},
				},
			},
			left: "center",
			top: "center",
		},
		legend: {
			show: true,
			bottom: 10,
			left: 'center',
			icon: 'circle'
		},
		graphic: [
			{
				type: 'image',
				id: 'myIcon',
				right: 'center',
				top: 'center',
				z: 10,
				bounding: 'raw',
				origin: [20, 20],
				style: {
					backgroundImage: `url('${donutChartIcon}')`, // Use the imported icon as the background image
					width: 45,
					height: 45,
				},
			},
		],
		series: [
			{
				type: "pie",
				data: [
					//{ value: 21, name: 'Routine', itemStyle: { color: '#0e72b7' } },
					//{ value: 40, name: 'Semi-Urgent', itemStyle: { color: '#9bd4e3' } },
					//{ value: 30, name: 'Urgent', itemStyle: { color: '#f28b70' } },
				] as Array<object>,
				radius: ["70%", "55%"],
				label: {
					show: false, // Hide the labels
				},
				itemStyle: {
					borderRadius: 0, // Border radius for the chart portions
					borderWidth: 0,
					borderColor: "#fff",
				},
			},
		],
	};

	if (data) {
		data.forEach((i: object) => {
			config.series[0].data.push(i);
		})
	}
	return config;


}

const getPieChartData = (data: Array<any>) => {
	return {
		grid: {
			top: '10%',
			left: '10%'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			right: 'right',
			icon: 'circle',
			top: 'center',

		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: '80%',
				data: [...data],
				center: ['38%', '50%'],

				label: {
					show: true,
					formatter: '{c} ({d}%)', // Display label name, value, and percentage
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
}



const useChart = (chartData: Array<number>, chartType: string, offSetColor1: string, offSetColor2: string, months: Array<string> | undefined) => {
	let data = new Object();
	if (chartType === "Line Chart") {
		data = getLineChartData(chartData, "Line Chart", offSetColor1, offSetColor2);
	}
	if (chartType === "Bar Chart") {
		data = getBarChartData(months, chartData);
	}
	if (chartType === "Donut Chart") {
		data = getDonutChart(chartData);
	}
	if (chartType === "Pie Chart") {
		data = getPieChartData(chartData);
	}
	return [data];
};

export default useChart;

