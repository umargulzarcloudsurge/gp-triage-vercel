import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import ReactEcharts from "echarts-for-react";
import axios from 'axios';
import ChartError from '../Error/ChartError';
import { setBookingSummaryByAppointmentType } from '@/app/util/localStorage';
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
			name: 'Appointment Type',
			type: 'pie',
			radius: ['40%', '80%'],
			data: [],
			label: {
				show: true,
				formatter: '{c} ({d}%)',
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
type KeyValuePair = [key: any, value: any];

const BookingSummaryByAppointmentType = ({ startDate, endDate, requestType }: { startDate: string, endDate: string, requestType: string }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(chartData);
	const [isError, setError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = (await axios.post('api/bookings-summary/appointment-type', { startDate, endDate, requestType })).data;
				setData({} as any);
				const cData: Array<any> = [];
				for (const [key, value] of Object.entries(data) as KeyValuePair) {
					cData.push(
						{
							value: value.total,
							name: key.replaceAll("_", " "),
							itemStyle: { color: value.color }
						}
					)
					console.log(`${key}: ${value}`);
				}
				chartData.series[0].data = [...cData] as any;
				/*
					{ value: 12, name: 'Telephone', itemStyle: { color: '#0e72b7' } },
					{ value: 100, name: 'Video', itemStyle: { color: '#9bd4e3' } },
					{ value:30, name: 'In-Person', itemStyle: { color: '#f28b70' } },

				**/
				// chartData.series[0].data = [
				// 	{
				// 		value: 12, name: "Test", itemStyle: { color: "#434343" }
				// 	}
				// ] as any;
				setData(chartData);
				setLoading(false);
				setError(false);
				setBookingSummaryByAppointmentType();
			} catch (error) {
				setLoading(false);
			}
		})()
		return () => {
			setBookingSummaryByAppointmentType("false")

		}
	}, [startDate, endDate, requestType]);

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col 2xl:col-span-1 gap-5 h-[290px] p-2 w-full">
				<div className="p-2 border-b border-gray-100">
					<p className="text-[#252423] sm:text-lg text-center text-sm font-medium leading normal">
						Booking Summaries by Appointment Type
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

export default BookingSummaryByAppointmentType