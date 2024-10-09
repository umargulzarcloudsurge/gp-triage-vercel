"use client";
import React, { useEffect, useState } from 'react'
import { BooingSummaries, BookingSummariesValues } from '../types/bookingsummaries'
import { Calendar as AntdCalender, Col, Row, Select, Checkbox, Spin, Pagination, message } from 'antd';
import Image from 'next/image';
import CalenderIcon from '../../../public/images/dark-blue-calendar-icon.svg';
import GrayClockIcon from '../../../public/images/gray-clock-icon.svg';
import LocationIcon from '../../../public/images/blue-location-icon.svg';
import dayjs from 'dayjs';
import axios from 'axios';


export type CalenderProps = {
	booingSummaries: BooingSummaries,
	isServer: boolean,
}

type IState = {
	currentPage: number;
	isLoading: boolean;
	currentPageNumber: number,
	selectedPageNumber: number,
	isChange: boolean,
	data: any,
	isServer: boolean,
};

let nextLink = "";
const CalenderComponent = ({ booingSummaries, isServer }: CalenderProps) => {
	const [state, setState] = useState<IState>({
		currentPageNumber: 1,
		selectedPageNumber: 1,
		isChange: false,
		isLoading: false,
		isServer: isServer
	} as IState);
	//debugger
	const [messageApi, contextHolder] = message.useMessage();
	const [bookingDate, setbookingDate] = useState({} as any);
	const [bookingData, setbookingData] = useState({ ...booingSummaries } as any);
	const [date, setDate] = useState("")

	useEffect(() => {
		(async () => {
			if (date) {
				setState((prev) => ({ ...prev, isLoading: true }));
				const { data, status } = await axios.post('api/calender/get-booking-summaries', { date, operator: "eq" });
				setState((prev) => ({ ...prev, isLoading: false }));
				if (status === 200) {
					debugger
					setbookingData(data.data)
				}

			}
		})()
	}, [date]);



	if (!nextLink) {
		if (bookingData["@odata.nextLink"]) {
			nextLink = bookingData["@odata.nextLink"]
		}
	}
	useEffect(() => {
		if (state.isServer) {
			setState((prev) => ({ ...prev, bookingDate: structuredClone(booingSummaries) }))
		}
	}, [state.isServer])

	useEffect(() => {
		(async () => {
			if (state.isChange) {
				const urlObject = new URL(nextLink);
				const skipTokenParams = urlObject.searchParams.get("$skiptoken") as string;
				const pageNumberMatch = skipTokenParams.match(/pagenumber=\"(\d+)\"/);
				if (pageNumberMatch) {
					const pageNumber = pageNumberMatch[1];
					const newLink = skipTokenParams.replace(`pagenumber="${pageNumber}"`, `pagenumber="${state.selectedPageNumber}"`)
					urlObject.searchParams.set('$skiptoken', newLink);
					try {
						setState((prev) => ({ ...prev, isLoading: true }));
						const { data } = await axios.post('api/get-next-record', { url: urlObject.toString() })
						console.log("next record", data)
						data.data.value.map((item: any) => {
							console.log(dayjs(item.gp_slotstart).format('DD,MMM YYYY'))
							console.log(dayjs(item.gp_slotstart).format('h:mm A'));
						})
						setState((prev) => ({ ...prev, isLoading: false }));
						setbookingData(structuredClone(data.data))
					} catch (error) {
						setState((prev) => ({ ...prev, isLoading: false }));
						messageApi.open({
							type: 'error',
							content: 'An Error occured.',
						});
					}
				} else {
					console.error("Failed to extract page number from cookie string");
				}
			}
		})()
	}, [state.selectedPageNumber])

	console.log(bookingData.value.length)

	return (
		<>
			<Spin fullscreen spinning={state.isLoading} />
			<div
				className="sm:p-8 p-3 pt-10 flex flex-col gap-8 bg-[#f1f4fa]">
				{/* Page Heading */}
				<p className="text-[#06152B] font-dm-sans text-2xl font-bold leading-normal">
					Appointment Calendar
				</p>

				<div className="flex flex-col lg:flex-row gap-6 h-full">
					{/* side informations */}
					<div className="flex gap-8 bg-white mt-3 rounded-md p-8 h-inherit lg:w-fit">
						<div className="flex flex-col gap-8 w-full">
							<div className="flex flex-col gap-5">
								<AntdCalender
									fullscreen={false}
									onChange={(e) => {
										const date = e.format("YYYY-MM-DD");
										setDate(date)
									}}
									headerRender={({ value, onChange }: any) => {
										const start = 0;
										const end = 12;
										const monthOptions = [];
										let current = value.clone();
										const localeData = value.localeData();
										const months = [];
										for (let i = 0; i < 12; i++) {
											current = current.month(i);
											months.push(localeData.monthsShort(current));
										}
										for (let i = start; i < end; i++) {
											monthOptions.push(
												<Select.Option key={i} value={i} className="month-item">
													{months[i]}
												</Select.Option>
											);
										}
										const year = value.year();
										const month = value.month();
										const options = [];
										for (let i = year - 10; i < year + 10; i += 1) {
											options.push(
												<Select.Option key={i} value={i} className="year-item">
													{i}
												</Select.Option>
											);
										}
										return (
											<div style={{ padding: 8 }}>
												<Row gutter={8}>
													<Col>
														<Select
															size="small"
															popupMatchSelectWidth={false}
															className="my-year-select"
															value={year}
															onChange={(newYear) => {
																const now = value.clone().year(newYear);
																onChange(now);
															}}
														>
															{options}
														</Select>
													</Col>
													<Col>
														<Select
															size="small"
															popupMatchSelectWidth={false}
															value={month}
															onChange={(newMonth) => {
																const now = value.clone().month(newMonth);
																onChange(now);
															}}
														>
															{monthOptions}
														</Select>
													</Col>
												</Row>
											</div>
										);
									}}
									className="w-[300px] border  border-[#F1F4FA] rounded-md p-2"
								/>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="w-full overflow-hidden overflow-x-hidden">
						<table width="100%" border={0}>
							<tbody>
								<tr className="flex gap-1 pb-2 px-2 justify-start items-center sticky top-0 h-10  bg-[#f1f4fa] z-[1]">
									<td className="w-[5%]">
										<div className="flex items-center">
											<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
											<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
										</div>

									</td>
									<td className="w-[22.5%] text-[#4b5769] text-base leading-normal font-medium">
										<div className="flex items-center text-sm">
											Date
											<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg></a>
										</div>
									</td>
									<td className="w-[22.5%] text-[#4b5769] text-base leading-normal font-medium">
										<div className="flex items-center text-sm">
											Time
											<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg></a>
										</div>
									</td>
									<td className="w-[22.5%] text-[#4b5769] text-base leading-normal font-medium">
										<div className="flex items-center text-sm">
											Name
											<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg></a>
										</div>
									</td>
									<td className="w-[22.5%] text-[#4b5769] text-base leading-normal font-medium ">
										<div className="flex items-center text-sm">
											Appointment Type
											<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg></a>
										</div>
									</td>
								</tr>
								{bookingData && bookingData.value && bookingData.value.map((item: BookingSummariesValues) => (
									<tr key={item.gp_bookingsummaryid} className="flex  justify-start items-center py-4 px-2 bg-white rounded-lg mb-3 hover:bg-[#fafafa] hover:cursor-pointer">
										<td className="w-[5%] ps-1">
											<div className="flex items-center">
												<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
												<label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
											</div>
										</td>
										<td className="w-[22.5%] flex gap-3 items-center">
											<Image src={CalenderIcon} width={15} height={15} alt="Icon" />
											<p className="text-[#06152B] font-base leading-normal">
												{dayjs(item.gp_slotstart).format('DD,MMM YYYY')}
											</p>
										</td>
										<td className="w-[22.5%] flex gap-3 items-center">
											<Image src={GrayClockIcon} width={15} height={15} alt="Icon" />

											<p className="text-[#06152B] font-base leading-normal">
												{dayjs(item.gp_slotstart).format('h:mm A')}
											</p>
										</td>
										<td className="w-[22.5%]">
											<p className="text-[#06152B] font-base leading-normal">
												{item['_gp_patient_value@OData.Community.Display.V1.FormattedValue']}
											</p>
										</td>
										<td className="w-[22.5%] flex gap-4 py-3 px-5 min-w-[171px] rounded-full bg-[#ebebfb]">
											<Image src={LocationIcon} width={15} height={15} alt="Icon" />
											<p className="text-[#0E72B7] text-base leading-normal">
												{item.gp_appointmenttypetext}
											</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{bookingData.value.length > 0 ?
							<Pagination
								onChange={(e) => {
									setState((prev) => (
										{
											...prev,
											selectedPageNumber: e,
											isChange: true
										}))
								}}
								defaultCurrent={state.currentPage}
								total={bookingData["@odata.count"] as number}
							/> : null
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default CalenderComponent