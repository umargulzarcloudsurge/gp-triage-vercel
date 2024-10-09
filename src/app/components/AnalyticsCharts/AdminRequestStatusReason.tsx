import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import { getStatusReasonCharts } from './dataFromServer';
import { Spin } from 'antd';
const adminReasonChartData = {
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
const AdminRequestStatusReason = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data, message, success } = await getStatusReasonCharts(startDate, endDate, requestType);
				setLoading(false);
				if (success) {
					adminReasonChartData.series[0].data = [...data] as any;
				}
			} catch (error) {

			}
		})()
	}, [startDate, endDate, requestType]);


	return (
		<>
			{/* <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col 2xl:col-span-2 gap-5 h-[284px] p-3   w-full">
				<p className="text-[#252423] sm:text-lg text-sm font-medium leading normal">
					Admin Requests by Status Reason
				</p>
				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading
					&&
					<ReactEcharts option={adminReasonChartData} />
				}
			</div> */}

			<div className="bg-[#D5EDF4] rounded-lg shadow-md flex flex-col 2xl:col-span-2 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-black text-lg font-semibold">
						Admin Requests by Status Reason
					</p>
				</div>
				{loading ? (
					<div className='flex justify-center items-center h-full'>
						<Spin spinning={true} />
					</div>
				) : (
					<ReactEcharts option={adminReasonChartData} style={{ height: 'calc(100% - 1rem)' }} />
				)}
			</div>

		</>
	)
}

export default AdminRequestStatusReason