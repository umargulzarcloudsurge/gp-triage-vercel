import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import { getRequestByPatientName } from './dataFromServer';
import { Spin } from 'antd';
import ChartError from '../Error/ChartError';
import axios from 'axios';
import { setAdminRequestByPatient } from '@/app/util/localStorage';

const chartData = {
	grid: {
		left: '25%',
		right: '5%',
		bottom: '20%',
		top: '-2%',
	},
	xAxis: [
		{
			// name: 'Admin Requests',
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
			// name: 'Patient',
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

const AdminRequestByPatient = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {

	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [data, setData] = useState(chartData) as any;

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/admin-request/admin-request-by-patient', { startDate, endDate, requestType });
				setData({} as any);
				chartData.yAxis[0].data = [...data.patientNames] as any;
				chartData.series[0].data = [...data.patientCounts] as any;
				setData(chartData);
				setLoading(false);
				setError(false);
				setAdminRequestByPatient();
			} catch (error) {
				setLoading(false);
				setError(true);
				console.error({ error });
				setAdminRequestByPatient();
			}
		})()
		return () => {
			setAdminRequestByPatient("false");

		}
	}, [startDate, endDate, requestType]);

	return (
		<>
			{/* <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-5 h-[284px]    md:w-1/3 w-[100%]">
				<p className="text-[#252423] sm:text-lg text-sm font-medium leading normal ps-2 pt-2">
					Admin Requests by Patient
				</p>
				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading
					&&
					<ReactEcharts option={adminReqByPatientData} />
				}
			</div> */}

			<div className="bg-[#D5EDF4]   rounded-lg shadow-md flex flex-col gap-5 p-2 h-[290px] 2xl:col-span-2  w-full">
				<div className="p-2 border-b border-gray-100 relative z-50">
					<p className="text-black sm:text-lg text-sm font-medium">
						Admin Requests by Patient
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

export default AdminRequestByPatient