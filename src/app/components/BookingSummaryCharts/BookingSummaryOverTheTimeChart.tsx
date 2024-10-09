import React, { useState, useEffect } from 'react'
import { Select, Spin } from 'antd';
import ReactEcharts from "echarts-for-react";
import axios from 'axios';
import { DefaultOptionType } from 'antd/es/select';
import { setBookingSummaryByAppointmentType, setBookingSummaryOverTheTimeChart } from '@/app/util/localStorage';

const chartData = {
	grid: {
		left: "7%",
		right: "2%",
		bottom: "5%",
		top: '7%',
		containLabel: true,
	},
	xAxis: {
		name: 'Year',
		nameLocation: 'center',
		nameTextStyle: {
			fontWeight: 'normal',
			fontSize: 18,
			color: '#00000',
			padding: [0, 0, 50, 0],
		},
		splitLine: {
			show: true,
			lineStyle: {
				type: 'dashed',
			}
		},
		type: 'category',
		data: [],//
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},

	},
	yAxis: {
		// name: 'Bookies Summaries',
		nameLocation: 'center',
		nameTextStyle: {
			fontWeight: 'normal',
			fontSize: 18,
			color: '#00000',
			padding: [0, 0, 30, 0],
		},
		splitLine: {
			show: true,
			lineStyle: {
				type: 'dashed',
			}
		},
		type: 'value',

	},
	series: [
		{
			symbol: 'none',
			lineStyle: {
				width: 3,
				color: '#108dff'
			},
			axisPointer: {
				show: false
			},
			data: [],
			type: 'line'
		}
	]
};
let overTheTimeData = {} as any;

const BookingSummaryOverTheTimeChart = ({ startDate, endDate, requestType, type }: { startDate: string, endDate: string, requestType: string, type: "Months" | "Quater" | "Weeks" | "Day" }) => {

	const [data, setChartData] = useState<any>(chartData);
	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	const setDataBasedOnSelectedType = () => {
		try {
			setError(false);
			if (type === "Months") {
				setLoading(true);
				setTimeout(() => {
					setChartData({ ...{} })
					chartData.xAxis.name = "";
					chartData.xAxis.data = [...overTheTimeData.monthslabel] as any;
					chartData.series[0].data = [...[]];
					chartData.series[0].data = overTheTimeData.allMonths as any
					setLoading(false);
					setChartData({ ...chartData })
				}, 50)
			}
			if (type === "Quater") {
				setLoading(true);
				setTimeout(() => {
					chartData.xAxis.name = "";
					chartData.xAxis.data = [...[]];
					chartData.xAxis.data = [...overTheTimeData.quaterLabel] as any;
					chartData.series[0].data = [...[]];
					chartData.series[0].data = [...overTheTimeData.allQuarters] as any
					setLoading(false);
					setChartData({ ...chartData })
				}, 50)
			}
			if (type === "Weeks") {
				setLoading(true);
				setTimeout(() => {
					chartData.xAxis.name = "";
					chartData.xAxis.data = [...[]];
					chartData.xAxis.data = [...overTheTimeData.weekLabels] as any;
					chartData.series[0].data = [...[]];
					chartData.series[0].data = [...overTheTimeData.allWeeks] as any
					setLoading(false);
					setChartData({ ...chartData })
				}, 50)
			}
			if (type === "Day") {
				setLoading(true);
				setTimeout(() => {
					
					chartData.xAxis.name = "";
					chartData.xAxis.data = [...[]];
					chartData.xAxis.data = [...overTheTimeData.dayslabel] as any;
					chartData.series[0].data = [...[]];
					chartData.series[0].data = [...overTheTimeData.allDays] as any
					setLoading(false);
					setChartData({ ...chartData })
				}, 50)
			}
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await axios.post('api/bookings-summary/over-the-time', { requestType });
				overTheTimeData = { ...data.data };
				setDataBasedOnSelectedType();
				setBookingSummaryOverTheTimeChart()
			} catch (error) {
				setError(true);
			}
		})()
		return () => {
			setBookingSummaryOverTheTimeChart("false");
		}
	}, [])

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col gap-5 h-[290px] p-1  w-full">
				<div className='flex w-full flex-row justify-between p-2 border-b border-gray-100'>
					<p className="text-[#252423] sm:text-lg text-center text-sm font-medium leading normal w-fit">
						Booking Summaries Over The Time Period
					</p>
					<Select
						defaultValue={{ value: type, label: type }}
						onChange={(e: DefaultOptionType) => {
							//@ts-ignore
							type = e as "Months" | "Quater" | "Weeks" | "Day";
							setDataBasedOnSelectedType();
						}} className='self-end w-56'>
						<Select.Option value="Months">Count by Months</Select.Option>
						<Select.Option value="Quater">Count by Quater</Select.Option>
						<Select.Option value="Weeks">Count by Weeks</Select.Option>
						<Select.Option value="Day">Count by Days</Select.Option>
					</Select>
				</div>

				{
					loading && <Spin spinning={true} className='flex justify-center items-center h-full' />
				}
				{
					!loading &&
					<ReactEcharts option={data} />
				}
			</div>
		</>
	)
}

export default BookingSummaryOverTheTimeChart