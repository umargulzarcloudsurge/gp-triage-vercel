import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import { getOverTheTime } from './dataFromServer';
import { Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import ChartError from '../Error/ChartError';
import { setAdminRequestByCount } from '@/app/util/localStorage';


const chartData = {
	grid: {
		left: "4%",
		right: "2%",
		bottom: "5%",
		top: '7%',
		containLabel: true,
	},
	xAxis: {
		// name: 'Count by Year, Quarter, Month and Day',
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
		data: [],
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},

	},
	yAxis: {
		// name: 'Count',
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
const AdminRequestByCount = ({ requestType, type }: { requestType: string, type: string }) => {

	const [data, setChartData] = useState<any>(chartData);
	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await getOverTheTime(requestType);
				const { message, success, data } = res.overTheTime;
				if (success) {
					overTheTimeData = { ...data };
					setDataBasedOnSelectedType();
					setAdminRequestByCount();
					//setLoading(false);
				} else {
					setError(true);
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				setError(true);
				console.error({ error });
				setAdminRequestByCount("false")
			}
		})()
		return () => {
			setAdminRequestByCount("false")
		}
	}, [requestType])

	const setDataBasedOnSelectedType = () => {
		try {
			setError(false);
			if (type === "Months") {
				setLoading(true);
				setTimeout(() => {
					//setChartData({ ...{} })
					chartData.xAxis.data = [...[]];
					chartData.xAxis.data = [...overTheTimeData.monthslabel] as any;
					chartData.series[0].data = [...[]];
					chartData.series[0].data = overTheTimeData.allMonths as any
					setChartData({ ...chartData })
					setLoading(false);
				}, 50)
			}
			if (type === "Quater") {
				setLoading(true);
				setTimeout(() => {
					//chartData.xAxis.name = "Quater";
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
					//chartData.xAxis.name = "Month";
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
			console.log({ error });
		}
	}

	return (
		<>
			<div className="bg-[#D5EDF4]  rounded-lg shadow-md flex flex-col gap-5 h-[290px] p-1  w-full">
				<div className='flex w-full flex-row justify-between p-2 border-b border-gray-100'>
					<p className="text-black sm:text-lg text-sm font-medium leading-normal w-fit">
						Admin Reqests Over The Time Period
					</p>
					<Select placeholder="Select" onChange={(e) => {
						//@ts-ignore
						type = e as "Months" | "Quater" | "Weeks" | "Day";
						setDataBasedOnSelectedType();
					}} className='self-end w-56  rounded-md '>
						<Select.Option value="Months">Count by Months</Select.Option>
						<Select.Option value="Quater">Count by Quater</Select.Option>
						<Select.Option value="Weeks">Count by Weeks</Select.Option>
						<Select.Option value="Day">Count by Days</Select.Option>
					</Select>
				</div>

				{
					loading && <Spin spinning={true}
						className='flex justify-center items-center h-full' />
				}
				{
					!loading && !isError &&
					<ReactEcharts option={data} style={{ height: 'calc(100% - 1rem)' }} />
				}
				{
					isError &&
					<ChartError />
				}
				{/* {loading ? (
					<div className='flex justify-center items-center h-full'>
						<Spin spinning={true} />
					</div>
				) : (
					<ReactEcharts option={data} style={{ height: 'calc(100% - 1rem)' }} />
				)} */}
			</div>

		</>
	)
}

export default AdminRequestByCount