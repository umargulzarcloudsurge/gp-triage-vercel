"use client";

import { DatePicker, FloatButton, Row, Spin } from "antd";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import LogoImage from "../../../public/images/logo.png";
import Logorounded from "../../../public/images/logoRoundedBg.png";
import adminReqImage from "../../../public/images/adminRequst.png";
import dayjs from "dayjs";
import AdminRequestStatusReason from "./AnalyticsCharts/AdminRequestStatusReason";
import AdminRequestByStatus from "./AnalyticsCharts/AdminRequestByStatus";
import AdminRequestByType from "./AnalyticsCharts/AdminRequestByType";
import AdminRequestByPatient from "./AnalyticsCharts/AdminRequestByPatient";
import AdminRequestByCount from "./AnalyticsCharts/AdminRequestByCount";
import { message } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { getHospitalName } from "../util/Helper";
import axios from "axios";
import { getAdminRequestByCount, getAdminRequestByPatient, getAdminRequestByStatus, getAdminRequestByType } from "../util/localStorage";

type state = {
  startDate: string;
  endDate: string;
  totalRequest: number;
  requestType: string
};

const AdminRequestAnalytics = ({
  endDate,
  startDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const [state, setState] = useState<state>({
    startDate: startDate,
    endDate: endDate,
    requestType: "gp_requesttype ne null",
    totalRequest: 0
  } as state);




  const startDateRef = useRef<string>("");
  const endDateRef = useRef<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [hospitalName, setHospitalName] = useState<string>("");
  useEffect(() => {
    (async () => {
      const hName = await getHospitalName() as string
      setHospitalName(hName);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const { data } = await axios.post('api/admin-request/admin-total-request', { startDate: state.startDate, endDate: state.endDate, requestType: state.requestType })
      setState((prev) => ({ ...prev, totalRequest: data.data['@Microsoft.Dynamics.CRM.totalrecordcount'] }))
    })()
  }, [state.startDate, state.endDate, state.requestType])

  const overTheTimeChartUseMemo = useMemo(() => {
    return < AdminRequestByCount requestType={state.requestType} type="Months" />
  }, [])

  const setRequestType = (requestType: string) => {

    if (
      getAdminRequestByStatus() === false ||
      getAdminRequestByPatient() === false ||
      getAdminRequestByType() === false ||
      getAdminRequestByCount() === false
    ) {
      return;
    }

    setState((prev) => ({
      ...prev,
      requestType: requestType,
    }))
  }

  return (
    <>
      {contextHolder}

      <FloatButton onClick={() => {
        setState((prev) => (
          {
            ...prev,
            requestType: 'gp_requesttype ne null',
            startDate: startDate,
            endDate: endDate
          }));
      }} tooltip="Clear Filter" icon={<ClearOutlined />} type="primary" style={{ right: 24 }} />
      {/* <div className="flex flex-col sm:flex-row sm:justify-between md:px-5 px-4 pt-7">
        <h2 className="lg:text-2xl md:text-xl text-md font-[600]">
          Request Dashboard
        </h2>
      </div> */}
      <div className="flex flex-col gap-4 mr-4 mt-0 ">
        <div className="grid grid-cols-12 grid-flow-row auto-rows-max gap-3 justify-center items-center mt-5  w-full   ">
          <div className="col-span-6 sm:col-start-1 xl:col-span-2 basis-1/3 h-[120px] flex justify-center items-center bg-[#D5EDF4]  rounded-lg shadow-md relative">
            <div className=" flex flex-row gap-3 items-center p-1 pt-2 2xl:p-3 w-full h-full">
              <div className="  border-[#91caddab] flex rounded-md justify-center items-center">
                <Image src={Logorounded} alt="logo" width={40} height={40} />
              </div>
              <div className="ml-2">
                <p className="text-black font-medium text-md leading-normal">
                  Admin Requests
                </p>
                <a className=" font-medium text-md leading-normal relative">
                  <p className=" text-[#0E72B7]">{hospitalName}</p>
                </a>
              </div>
            </div>
          </div>

          <div className=" col-span-12  lg:col-span-8   xl:col-span-5 basis-1/3 h-[120px] flex justify-center items-center bg-[#D5EDF4]  rounded-lg shadow-md">
            <div className="flex gap-2 mx-3 pt-3 pb-3 h-full">
              <button
                onClick={() => {
                  setRequestType("gp_requesttype eq 0")
                }
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 0",
                  // }))
                }
                className={`text-center capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 0' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'}   text-[12px] md:text-xs hover:bg-[#0E72B7]   text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 basis-full flex items-center justify-center`}
              >
                Doctor&apos;s Letter
              </button>
              <button
                onClick={() => setRequestType("gp_requesttype eq 1")
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 1",
                  // })
                  // )
                }
                className={`text-center  capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 1' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-[12px] md:text-xs hover:bg-[#0E72B7]  text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 flex items-center justify-center basis-full`}
              >
                Fit (sick) Note
              </button>
              <button
                onClick={() => setRequestType("gp_requesttype eq 2")
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 2",
                  // }))
                }
                className={`text-center  capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 2' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-[12px] md:text-xs hover:bg-[#0E72B7]  text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 flex items-center justify-center basis-full`}
              >
                Questions about a Referral
              </button>
              <button
                onClick={() => setRequestType("gp_requesttype eq 3")
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 3",
                  // }))
                }
                className={`text-center  capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 3' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-[12px] md:text-xs hover:bg-[#0E72B7]  text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 flex items-center justify-center basis-full`}
              >
                Question about Medication
              </button>
              <button
                onClick={() => setRequestType("gp_requesttype eq 4")
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 4",
                  // }))
                }
                className={`text-center  capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 4' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-[12px] md:text-xs hover:bg-[#0E72B7]  text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 flex items-center justify-center basis-full`}
              >
                Test Results
              </button>
              <button
                onClick={() => setRequestType("gp_requesttype eq 5")
                  // setState((prev) => ({
                  //   ...prev,
                  //   requestType: "gp_requesttype eq 5",
                  // }))
                }
                className={`text-center  capitalize btn cursor-pointer ${state.requestType === 'gp_requesttype eq 5' ? 'bg-[#0E72B7] text-white' : 'bg-[#ADDCE9]'} text-[12px] md:text-xs hover:bg-[#0E72B7]  text-black hover:text-white font-normal rounded-md shadow-md  px-1 py-2 flex items-center justify-center basis-full`}
              >
                Something Else
              </button>
            </div>
          </div>

          <div className=" col-span-12 lg:col-span-4 order-8 xl:col-start-8 xl:col-span-3 basis-2/5 p-2 h-[120px] flex flex-col justify-center items-center  bg-[#D5EDF4]  rounded-lg shadow-md">
            <div className="flex gap-1 w-full justify-center items-center">
              <DatePicker
                placeholder="Start Date"
                defaultValue={dayjs(state.startDate)}
                allowClear={false}
                onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
                  startDateRef.current = dates as string;
                }}
                className="md:py-1.5 px-1 md:px-2 w-full h-[40px]  bg-gray-100 hover:bg-gray-200 border border-[#9BD4E3] text-gray-500 font-medium  rounded-md shadow-md"
              />

              <DatePicker
                placeholder="End Date"
                defaultValue={dayjs(state.endDate)}
                allowClear={false}
                onChange={(date: dayjs.Dayjs, dates: string | string[]) => {
                  endDateRef.current = dates as string;
                }}
                className="md:py-1.5 px-1 md:px-2 w-full h-[40px]  bg-gray-100 hover:bg-gray-200 border border-[#9BD4E3] text-gray-500 font-medium  rounded-md shadow-md"
              />
            </div>
            <div className="flex w-full justify-end mt-2 items-center">
              <button onClick={() => {
                const sD = startDateRef.current;
                const eD = endDateRef.current;
                if (sD && eD) {
                  if (sD > eD) {
                    messageApi.open({
                      type: 'warning',
                      content: 'The start date should be earlier than the end date.',
                    });
                    return;
                  }
                  setState((prev) => ({ ...prev, startDate: sD, endDate: eD }));
                  return;
                }
                if (!sD) {
                  messageApi.open({
                    type: 'warning',
                    content: 'Please select start date.',
                  });
                  return;
                }
                if (!eD) {
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

          <div className="col-span-6 xl:col-span-2 col-start-7 row-start-1 xl:col-start-11 h-[120px] flex flex-col justify-center items-center bg-[#D5EDF4]  rounded-lg shadow-md   relative">
            <div className="flex flex-row gap-3 items-center p-1 pt-2 2xl:p-3 ">
              <div className=" absolute top-2 right-0 flex rounded-md justify-center items-center">
                <Image
                  src={adminReqImage}
                  alt="logo"
                  width={50}
                  height={50}
                  className=" w-8 "
                />
              </div>
              <div>
                <p className="text-[#0E72B7] font-medium text-lg md:text-4xl text-center leading-normal">
                  {state.totalRequest}
                </p>
                <a className="text-black font-medium text-xs md:text-sm  leading-normal">
                  Total Admin Request
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All Charts */}
        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-12 grid grid-cols-12 gap-3">
            {/* Donut Chart Section */}
            <div className="col-span-12 md:col-span-5 xl:col-span-3">
              <AdminRequestByStatus
                endDate={state.endDate}
                startDate={state.startDate}
                requestType={state.requestType}
              />
            </div>


            <div className="col-span-12 md:col-span-7 xl:col-span-4">

              {/* Bar Chart Section */}
              <AdminRequestByPatient
                endDate={state.endDate}
                startDate={state.startDate}
                requestType={state.requestType}
              />
            </div>
            <div className="col-span-12 xl:col-span-5">

              {/* Column Chart Section */}
              <AdminRequestByType
                endDate={state.endDate}
                startDate={state.startDate}
                requestType={state.requestType}
              />
            </div>

            {/* Pie Chart Section
						<AdminRequestStatusReason endDate={state.endDate} startDate={state.startDate} requestType={state.requestType} /> */}
          </div>
          <div className="flex md:flex-row col-span-12 flex-col gap-5">
            {/* Line Chart Section */}
            {overTheTimeChartUseMemo}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRequestAnalytics;
