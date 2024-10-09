"use client";
import { DatePicker, FloatButton } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from "next/image";
import LogoImage from "../../../public/images/logoRoundedBg.png";
import patientsLogo from "../../../public/images/patients.png";
import symptomsLogo from "../../../public/images/symptoms.png";
import bookingsummryLogo from "../../../public/images/bookingsummry.png";
import TriageAs from './BookingSummaryCharts/TriageAs';
import BookingSummaryOverTheTimeChart from './BookingSummaryCharts/BookingSummaryOverTheTimeChart';
import BookingSummaryBySymptoms from './BookingSummaryCharts/BookingSummaryBySymptoms';
import BookingSummaryByServiceType from './BookingSummaryCharts/BookingSummaryByServiceType';
import BookingSummaryByAppointmentType from './BookingSummaryCharts/BookingSummaryByAppointmentType';
import axios from 'axios';
import { ClearOutlined } from '@ant-design/icons';
import { getHospitalName } from '../util/Helper';
import { message } from 'antd';
import { getBookingSummaryByAppointmentType, getBookingSummaryByServiceType, getBookingSummaryBySymptoms, getBookingSummaryOverTheTimeChart, getTriageAs } from '../util/localStorage';

type state = {
	startDate: string,
	endDate: string,
	requestType: string,
	totalPatient: number,
	totalSymptoms: number,
	totalBookings: number,
	sDate: string,
	eDate: string
};

const BookingSummaryAnalytics = ({ endDate, startDate }: { startDate: string, endDate: string }) => {
	const [state, setState] = useState<state>(
		{
			startDate: startDate,
			endDate: endDate,
			requestType: 'gp_triageas ne null',
			totalRequest: 0,
			totalPatient: 0,
			totalSymptoms: 0,
			totalBookings: 0,
			eDate: endDate,
			sDate: startDate
		} as state);

	//const startDateRef = useRef<string>(startDate);
	//const endDateRef = useRef<string>(endDate);
	const [messageApi, contextHolder] = message.useMessage();
	const [hospitalName, setHospitalName] = useState<string>("");

	const getPatientCounts = async () => {
		try {
			const { data } = await axios.post('api/bookings-summary/get-patients-count', { startDate: state.startDate, endDate: state.endDate, requestType: state.requestType });
			setState((prev) => ({ ...prev, totalPatient: data.data }));
		} catch (error) {

		}
	}

	const getSymptomsCounts = async () => {
		try {
			const { data } = await axios.post('api/bookings-summary/get-symptoms-count', { startDate: state.startDate, endDate: state.endDate, requestType: state.requestType });
			setState((prev) => ({ ...prev, totalSymptoms: data.data }));
		} catch (error) {

		}
	}

	const getBookingsCounts = async () => {
		try {
			const { data } = await axios.post('api/bookings-summary/get-booking-count', { startDate: state.startDate, endDate: state.endDate, requestType: state.requestType });
			setState((prev) => ({ ...prev, totalBookings: data.data }));
		} catch (error) {

		}
	}

	useEffect(() => {
		(() => {
			getPatientCounts();
			getSymptomsCounts();
			getBookingsCounts();
		})()
	}, [state.startDate, state.endDate, state.requestType]);

	useEffect(() => {
		(async () => {
			const hName = await getHospitalName() as string
			setHospitalName(hName);
		})()
	}, [])

	const overTheTimeChartUseMemo = useMemo(() => {
		return <BookingSummaryOverTheTimeChart endDate='' requestType={state.requestType} startDate='' key={Math.random()} type='Months' />
	}, []);

	return (
		<>
			{contextHolder}
			<FloatButton onClick={() => {
				setState((prev) => (
					{
						...prev,
						requestType: 'gp_triageas ne null',
						sDate: startDate,
						eDate: endDate
					}));
				//startDateRef.current = startDate;
				//endDateRef.current = endDate;
			}} tooltip="Clear Filter" icon={<ClearOutlined />} type="primary" style={{ right: 24 }} />
			{/* <div className="flex flex-col sm:flex-row sm:justify-between md:px-5 px-4 pt-7">
				<h2 className="lg:text-2xl md:text-xl text-md font-[600]">
					Booking Dashboard
				</h2>
			</div> */}
			<div className="flex flex-col gap-4 mr-4 mt-0 ">
				<div className='grid grid-cols-12 grid-flow-row  gap-3 justify-center items-center mt-5  min-h-[120] max-h-auto w-full'>
					<div className=" col-span-4 lg:col-span-4 xl:col-span-2 h-[120px] flex justify-center items-center bg-[#D5EDF4] rounded-lg shadow-md">
						{/* <div className=" flex flex-col lg:flex-row gap-1 sm:gap-3 items-center p-1 pt-2 2xl:p-3 relative ">
							<div className="  border-[#91caddab] flex rounded-md justify-center items-center">
								<Image src={LogoImage} alt="logo" width={40} height={40} />
							</div>
							<div className="ml-2">
								<p className="text-black font-medium text-md leading-normal">
									Triage
								</p>
								<a className="text-gray-600 sm:font-medium sm:text-md text-sm leading-normal">
									<p className=" text-[#0E72B7]">
										{hospitalName}
									</p>
								</a>
							</div>
						</div> */}
						<div className=" flex flex-row gap-3 items-center p-1 pt-2 2xl:p-3 relative w-full">
							<div className="  border-[#91caddab] flex rounded-md justify-center items-center">
								<Image src={LogoImage} alt="logo" width={40} height={40} />
							</div>
							<div className="ml-2">
								<p className="text-black font-medium text-md leading-normal">
									Triages
								</p>
								<a className=" font-medium text-md leading-normal relative">
									<p className=" text-[#0E72B7]">{hospitalName}</p>
								</a>
							</div>
						</div>
					</div>
					<div className=" col-span-8 lg:col-span-8 xl:col-span-3  h-[120px] flex justify-center items-center  bg-[#D5EDF4]  rounded-lg shadow-md">
						<div className='flex flex-row gap-1 sm:gap-3 p-1 sm:p-3 h-full w-full'>
							<button onClick={() => {

								if (getTriageAs() === false ||
									getBookingSummaryBySymptoms() === false ||
									getBookingSummaryByServiceType() === false ||
									getBookingSummaryByAppointmentType() === false ||
									getBookingSummaryOverTheTimeChart() === false) {
									return;
								}

								setState((prev) => ({ ...prev, requestType: 'gp_triageas eq 1' }));
							}} className={` ${state.requestType === 'gp_triageas eq 1' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-center capitalize btn cursor-pointer  text-[12px] md:text-sm hover:bg-[#0E72B7] text-black hover:text-white font-normal rounded-md shadow-md-md  px-1 py-2 basis-full flex items-center justify-center `}>
								Urgent
							</button>
							<button onClick={() => {
								if (getTriageAs() === false ||
									getBookingSummaryBySymptoms() === false ||
									getBookingSummaryByServiceType() === false ||
									getBookingSummaryByAppointmentType() === false ||
									getBookingSummaryOverTheTimeChart() === false) {
									return;
								}
								setState((prev) => ({ ...prev, requestType: 'gp_triageas eq 2' }));
							}} className={` ${state.requestType === 'gp_triageas eq 2' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-center capitalize btn cursor-pointer  text-[12px] md:text-sm hover:bg-[#0E72B7] text-black hover:text-white font-normal rounded-md shadow-md-md  px-1 py-2 basis-full flex items-center justify-center`}>
								Semi-Urgent
							</button>
							<button onClick={() => {
								if (getTriageAs() === false ||
									getBookingSummaryBySymptoms() === false ||
									getBookingSummaryByServiceType() === false ||
									getBookingSummaryByAppointmentType() === false ||
									getBookingSummaryOverTheTimeChart() === false) {
									return;
								}
								setState((prev) => ({ ...prev, requestType: 'gp_triageas eq 3' }));
							}} className={`${state.requestType === 'gp_triageas eq 3' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-center capitalize btn cursor-pointer  text-[12px] md:text-sm hover:bg-[#0E72B7] text-black hover:text-white font-normal rounded-md shadow-md-md  px-1 py-2 basis-full flex items-center justify-center`}>
								Non-Urgent
							</button>
						</div>
					</div>

					<div className=" col-span-12 lg:col-span-6 xl:col-span-3 p-2 h-[120px] flex flex-col justify-center items-center  bg-[#D5EDF4]  rounded-lg shadow-md">
						<div className="flex gap-1 w-full justify-center items-center">
							<DatePicker
								placeholder='Start Date'
								value={dayjs(state.sDate)}
								allowClear={false}
								onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
									setState((prev) => ({ ...prev, sDate: dates as string }))
								}}
								className="md:py-1.5 px-1 md:px-2 w-full h-[40px]  bg-gray-100 hover:bg-gray-200 border border-[#9BD4E3] text-gray-500 font-medium  rounded-md shadow-md"
							/>
							<DatePicker
								placeholder='End Date'
								value={dayjs(state.eDate)}
								allowClear={false}
								onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
									setState((prev) => ({ ...prev, eDate: dates as string }))
								}}
								className="md:py-1.5 px-1 md:px-2 w-full h-[40px]  bg-gray-100 hover:bg-gray-200 border border-[#9BD4E3] text-gray-500 font-medium  rounded-md shadow-md"
							/>
						</div>
						<div className="flex w-full justify-end mt-2 items-center">
							<button onClick={() => {

								if (state.sDate && state.eDate) {
									if (state.sDate > state.eDate) {
										messageApi.open({
											type: 'warning',
											content: 'The start date should be earlier than the end date.',
										});
										return;
									}
									setState((prev) => (
										{
											...prev,
											startDate: state.sDate,
											endDate: state.eDate
										}));
									return;
								}
								if (!state.sDate) {
									messageApi.open({
										type: 'warning',
										content: 'Please select start date.',
									});
									return;
								}
								if (!state.eDate) {
									messageApi.open({
										type: 'warning',
										content: 'Please select end date.',
									});
									return;
								}
							}} className="bg-[#2f7ecc] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">
								Apply
							</button>
						</div>
					</div>

					<div className='col-span-12 lg:col-span-6 xl:col-span-4 gap-3 h-[120px] flex justify-center items-center'>

						<div className="     bg-[#D5EDF4] rounded-lg shadow-md w-full h-full relative flex justify-center items-center">
							<div className=" absolute top-2 right-0 flex rounded-md justify-center items-center">
								<Image src={patientsLogo} alt='logo' width={30} height={30} />
							</div>
							<div className='flex flex-row gap-3 justify-center items-center'>
								<div className='flex justify-center flex-col items-center'>
									<p className="text-[#0E72B7] font-bold text-lg leading-normal">
										{state.totalPatient}
									</p>
									<p className="text-gray-600 sm:font-medium sm:text-lg text-sm leading-normal">
										Patients
									</p>
								</div>
							</div>
						</div>
						<div className="     bg-[#D5EDF4] rounded-lg shadow-md w-full h-full relative flex justify-center items-center">
							<div className=" absolute top-2 right-0 flex rounded-md justify-center items-center">
								<Image src={symptomsLogo} alt='logo' width={40} height={40} />
							</div>
							<div className='flex flex-row gap-3 justify-center items-center'>
								<div className='flex justify-center flex-col items-center'>
									<p className="text-[#0E72B7] font-bold text-lg leading-normal">
										{state.totalSymptoms}
									</p>
									<p className="text-gray-600 sm:font-medium sm:text-lg text-sm leading-normal">
										Symptoms
									</p>
								</div>
							</div>
						</div>
						<div className="     bg-[#D5EDF4] rounded-lg shadow-md w-full h-full relative flex justify-center items-center">
							<div className=" absolute top-2 right-0 flex rounded-md justify-center items-center">
								<Image src={bookingsummryLogo} alt='logo' width={30} height={30} />
							</div>
							<div className='flex flex-row gap-3 justify-center items-center '>
								<div className='flex justify-center flex-col items-center'>
									<p className="text-[#0E72B7] font-bold   text-lg leading-normal">
										{state.totalBookings}
									</p>
									<p className="text-gray-600 sm:font-medium sm:text-lg text-sm leading-normal">
										Bookings
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* All Charts */}
				<div className=" flex flex-col gap-3 mt-2">
					<div className=" grid grid-cols-12 grid-flow-row gap-5">
						<div className=' col-span-12 md:col-span-5 lg:col-span-6 xl:col-span-4'>
							<TriageAs endDate={state.endDate} startDate={state.startDate} requestType={state.requestType} />
						</div>
						<div className='col-span-12 md:col-span-7 lg:col-span-6 xl:col-span-4'>
							<BookingSummaryBySymptoms endDate={state.endDate} startDate={state.startDate} requestType={state.requestType} />
						</div>
						{/* <div className='col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-5'>
							<BookingSummaryByServiceType endDate={state.endDate} startDate={state.startDate} requestType={state.requestType} />
						</div> */}
						<div className='col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-4 '>
							<BookingSummaryByAppointmentType endDate={state.endDate} startDate={state.startDate} requestType={state.requestType} />
						</div>
						<div className=' col-span-12 md:col-span-12 xl:col-span-12 order-last'>
							{overTheTimeChartUseMemo}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BookingSummaryAnalytics