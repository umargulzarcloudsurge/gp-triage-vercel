import React, { useState, useEffect } from 'react'
import { Spin } from 'antd';
import ReactEcharts from "echarts-for-react";
import axios from 'axios';
import ChartError from '../Error/ChartError';
import { setBookingSummaryBySymptoms } from '@/app/util/localStorage';

const chartData = {
	grid: {
		left: '32%',
		right: '5%',
		bottom: '25%',
		top: '-2%',
	},
	xAxis: [
		{
			// name: ' Symptoms Type',
			nameLocation: 'center',  // Center the yAxis name
			nameTextStyle: {
				fontWeight: 'normal',
				fontSize: 18,
				color: '#00000',
				padding: [20, 0, 0, 0],
				align: 'right'

			},
			axisLine: {
				show: false,
			},

			type: 'value',
			axisTick: {
				alignWithLabel: true
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
				}
			}
		}
	],
	yAxis: [
		{
			// name: 'Symptoms',
			nameLocation: 'center',  // Center the yAxis name
			nameTextStyle: {
				fontWeight: 'normal',
				fontSize: 18,
				color: '#00000',
				padding: [0, 0, 80, 0],

			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false
			},

			type: 'category',
			data: [],
			splitLine: {
				show: false,
				lineStyle: {
					type: 'dashed',
				}
			}
		}
	],
	series: [
		{
			itemStyle: {
				color: '#0e72b7', // Set the bar color
			},
			name: 'Direct',
			type: 'bar',
			barWidth: '60%',
			data: [],
			label: {
				position: 'right',
				show: true,
			},
		}
	]
};

const BookingSummaryBySymptoms = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(chartData);
	const [isError, setError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/bookings-summary/symptoms', { startDate, endDate, requestType });
				setData({} as any);
				chartData.yAxis[0].data = [...data.data.symptoms] as any;
				chartData.series[0].data = [...data.data.symptomsCounts] as any;
				setData(chartData);
				setLoading(false);
				setError(false);
				setBookingSummaryBySymptoms();
			} catch (error) {
				setError(true);
			}
		})()
		return () => {
			setBookingSummaryBySymptoms("false");
		}
	}, [startDate, endDate, requestType]);

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-1 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-[#252423] sm:text-lg text-center text-sm font-medium leading normal">
						Booking Summary By Symptoms
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
					isError &&
					<ChartError />
				}
			</div>
		</>
	)
}

export default BookingSummaryBySymptoms