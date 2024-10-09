import React, { useState, useEffect } from 'react'
import ReactEcharts from "echarts-for-react";
import { Spin } from 'antd';
import axios from 'axios';
import ChartError from '../Error/ChartError';
import { setTriageAs } from '@/app/util/localStorage';

const chartData = {
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
		top: 'top',

	},
	series: [
		{
			name: 'Triage As',
			type: 'pie',
			radius: '80%',
			data: [

			],
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

const TriageAs = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(chartData);
	const [isError, setError] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				try {
					const { data } = await axios.post('api/bookings-summary/triage-as', { startDate: startDate, endDate: endDate, requestType });
					setData({} as any);
					chartData.series[0].data = [...data.data] as any;
					setData({ ...chartData });
					setLoading(false);
					setError(false);
					setTriageAs();
				} catch (error) {
					setLoading(false);
					setError(true);
				}
			} catch (error) {
				console.log({ error });
				setError(true);
			}
		})()
		return () => {
			setTriageAs("false");
		}
	}, [startDate, endDate, requestType]);
	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-1 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-[#252423] sm:text-lg text-center text-sm font-medium leading normal">
						Booking Summary By Triage As
					</p>
				</div>
				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading
					&&
					!(isError)
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

export default TriageAs