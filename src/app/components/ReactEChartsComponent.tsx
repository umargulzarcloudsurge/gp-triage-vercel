"use client"
import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import useChart from '../hooks/useChart';
import axios from 'axios';
import { useDataverseGet } from '../hooks/useDataerse';
import { ChartType } from '../types/enums';


export interface IReactEChartsComponent {
	option: Array<any>,
	type: "Line Chart" | "Bar Chart" | "Donut Chart" | "Pie Chart" | "Active",
	offSetColor1: string,
	offSetColor2: string,
	monthsData?: Array<string>
}
const ReactEChartsComponent = ({ option, type, offSetColor1, offSetColor2, monthsData = [] }: IReactEChartsComponent) => {
	const [data] = useChart(
		option,
		type,
		offSetColor1,
		offSetColor2,
		monthsData
	);
	return (
		<>
			<ReactEcharts option={data} />
		</>
	)
}

export default ReactEChartsComponent