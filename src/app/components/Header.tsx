"use client";
import React, { useEffect, useState } from "react"
import { DatePicker, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const Header = () => {

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const searchParams = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();
	const { replace, push } = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if(endDate){
			if (startDate > endDate) {
				messageApi.open({
					type: 'warning',
					content: 'The start date should be earlier than the end date.',
				});
				return;
			}
		}
		const params = new URLSearchParams(searchParams);
		if (startDate) {
			params.set('startDate', startDate);
		} else {
			params.delete('startDate');
		}
		if (endDate) {
			params.set('endDate', endDate);
		} else {
			params.delete('endDate');
		}
		push(`${pathname}?${params.toString()}`);
	}, [startDate, endDate])

	const onChange = (date: any, dateString: any, type: "startdate" | "enddate") => {
		if (type === "startdate") {
			setStartDate(dateString)
		}
		if (type === "enddate") {
			setEndDate(dateString)
			
		}
	};
	return (
		<>
		{contextHolder}
			<div className='flex flex-col sm:flex-row sm:justify-between md:px-5 px-4 pt-7'>
				<h2 className='lg:text-2xl md:text-xl text-md font-[600]'>GP Triage Dashboard</h2>
				<div className="flex md:gap-3 gap-1 items-center me-1 pt-2 sm:pt-0">
					{/* Date Selectors */}
					<DatePicker onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
						onChange(date, dates, "startdate");
					}} className="md:py-1.5 px-1 md:px-2" />
					<DatePicker onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
						onChange(date, dates, "enddate");
					}} className="md:py-1.5 px-1 md:px-2" />
				</div>
			</div>
		</>
	)
}

export default Header