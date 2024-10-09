import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import { getRequestTypeCharts } from './dataFromServer';
import { Spin } from 'antd';
import ChartError from '../Error/ChartError';
import axios from 'axios';
import { setAdminRequestByType } from '@/app/util/localStorage';


const chartData = {
	grid: {
		left: '5%',
		right: '2%',
		bottom: '10%',
		top: '10%%',
		containLabel: true
	},
	xAxis: [
		{
			// name: 'Request Type',
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
			// name: 'Admin Requests',
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


const AdminRequestByType = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {

	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [data, setData] = useState(chartData) as any;

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/admin-request/admin-request-by-type', { startDate, endDate, requestType });
				setData({} as any);
				chartData.xAxis[0].data = [...data.requestTypes] as any;
				chartData.series[0].data = [...data.counts] as any;
				setData(chartData);
				setLoading(false);
				setAdminRequestByType();
			} catch (error) {
				console.error({ error });
				setLoading(false);
				setError(true);
			}
		})()
		return () => {
			setAdminRequestByType("false");
		}
	}, [startDate, endDate, requestType]);
	return (
		<>
			{/* <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col 2xl:col-span-2 gap-5 h-[284px] p-3   w-full"  >
				<p className="text-[#252423] sm:text-lg text-sm font-medium leading normal">
					Admin Requests by Request Type
				</p>
				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading
					&&
					<ReactEcharts option={admiReqByTypeChartData} />
				}
			</div> */}

			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-2 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-black sm:text-lg text-sm font-medium leading-normal">
						Admin Requests by Request Type
					</p>
				</div>
				{loading ? (
					<div className='flex justify-center items-center h-full'>
						<Spin spinning={true} />
					</div>
				) : (
					<>
						{
							isError &&
							<ChartError />
						}
						{
							!(isError) &&
							<ReactEcharts option={data} style={{ height: 'calc(100% - 1rem)' }} />
						}
					</>
				)}
			</div>

		</>
	)
}

export default AdminRequestByType