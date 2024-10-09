import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import ReactEcharts from "echarts-for-react";
import axios from 'axios';
import ChartError from '../Error/ChartError';
import { setBookingSummaryByServiceType } from '@/app/util/localStorage';



const chartData = {
	grid: {
		left: '12%',
		right: '2%',
		bottom: '20%',
		top: '15%%',
		containLabel: true
	},
	xAxis: [
		{
			// name: 'Service Type',
			nameLocation: 'center',
			nameTextStyle: {
				fontWeight: 'normal',
				fontSize: 18,
				color: '#00000',
				padding: [50, 0, 0, 0],
			},
			axisLine: {
				show: false,
			},
			type: 'category',
			data: [],
			axisTick: {
				show: false
			},
			axisLabel: {
				interval: 0,
				formatter: function (value: any) {
					// Split the label into multiple lines based on space
					return value.split(' ').join('\n');
				},
				textStyle: {
					whiteSpace: 'pre-wrap', // Allow wrapping within words
				},

			},
			splitLine: {
				show: false,
				lineStyle: {
					type: 'dashed',
				},
			},
		},
	],
	yAxis: [
		{
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
				},
			},
			// name: 'Booking Summaries',
			nameLocation: 'center',
			nameTextStyle: {
				fontWeight: 'normal',
				fontSize: 18,
				color: '#00000',
				padding: [0, 0, 30, 0],
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			type: 'value',
		},
	],
	series: [
		{
			itemStyle: {
				color: '#0e72b7', // Set the bar color
			},
			type: 'bar',
			data: [],
			label: {
				position: 'top',
				show: true,
			},
		},
	],
};

const BookingSummaryByServiceType = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(chartData);
	const [isError, setError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/bookings-summary/service-type', { startDate, endDate, requestType });
				setData({} as any);
				chartData.xAxis[0].data = [...data.data.serviceTypes] as any;
				chartData.series[0].data = [...data.data.serviceTypesCounts] as any;
				setData(chartData);
				setLoading(false);
				setError(false);
				setBookingSummaryByServiceType();
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		})()
		return () => {
			setBookingSummaryByServiceType("false");
		}
	}, [startDate, endDate, requestType]);

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-1 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-[#252423] sm:text-lg text-center text-sm font-medium leading normal">
						Booking Summaries by Service Type
					</p>
				</div>
				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading
					&&
					!isError
					&&
					<ReactEcharts option={data} />
				}
				{
					isError
					&&
					<ChartError />
				}
			</div>
		</>
	)
}

export default BookingSummaryByServiceType