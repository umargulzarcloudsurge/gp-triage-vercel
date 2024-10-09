import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import { getRequestByStatusCharts } from './dataFromServer';
import { Spin } from 'antd';
import ChartError from '../Error/ChartError';
import axios from 'axios';
import { setAdminRequestByStatus } from '@/app/util/localStorage';

const chartData = {
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
			name: 'Request Type',
			type: 'pie',
			radius: ['40%', '80%'],
			data: [],
			label: {
				show: true,
				formatter: '{c} ({d}%)', // Display label name, value, and percentage
			},
			center: ['38%', '50%'],
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

const AdminRequestByStatus = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {

	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [data, setData] = useState(chartData) as any;
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/admin-request/admin-request-by-status', { startDate, endDate, requestType });
				setData({} as any);
				chartData.series[0].data = [...data.data] as any;
				setData(chartData);
				setLoading(false);
				setAdminRequestByStatus();
			} catch (error) {
				console.error({ error });
				setLoading(false);
				setError(true);
				setAdminRequestByStatus();
			}
		})()
		return () => {
			setAdminRequestByStatus("false");
		}
	}, [startDate, endDate, requestType]);

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-1 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-black sm:text-lg text-sm font-medium leading-normal">
						Admin Requests by Status
					</p>
				</div>
				{loading ? (
					<div className='flex justify-center items-center h-full'>
						<Spin spinning={true} />
					</div>
				) : (
					<>
						{!isError && <ReactEcharts option={data} style={{ height: 'calc(100% - 1rem)' }} />}
						{isError && <ChartError />}
					</>
				)}
			</div>

		</>
	)
}

export default AdminRequestByStatus