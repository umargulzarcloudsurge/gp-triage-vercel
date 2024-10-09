
// "use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { useDataverseGet } from "../hooks/useDataerse";
import { AdminRequestToday } from "./AdminRequestToday";
import ReactEChartsComponent from "./ReactEChartsComponent";
import { getAccountId } from "../util/Helper";
import ChartError from "./Error/ChartError";
// import { ChartType } from "../types/enums";

export const TotalAdminRequest = async () => {

  const bookingsummariesPromise = new Promise(async (res, rej) => {
    const { data, success, message } = await useDataverseGet('gp_adminrequests', "$select=gp_adminrequestid&$filter=(_gp_gp_value eq '" + getAccountId() + "')&$count=true");
    if (success) {
      res(data["@Microsoft.Dynamics.CRM.totalrecordcount"]);
      return;
    }
    rej({ message })
  });

  const gp_bookingsummariesCharts = new Promise(async (res, rej) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, success, message } = await useDataverseGet('gp_adminrequests', "$select=gp_adminrequestid,createdon&$filter=(_gp_gp_value eq '" + getAccountId() + "' and Microsoft.Dynamics.CRM.Last7Days(PropertyName='createdon'))&$count=true");
    if (success) {
      const countDays = [0, 0, 0, 0, 0, 0, 0];
      data?.value.forEach((entry: any) => countDays[new Date(entry.createdon).getDay()]++);
      res(countDays);
      return;
    }
    rej({ message })
  });

  const result = await Promise.allSettled([bookingsummariesPromise, gp_bookingsummariesCharts]) as any;
  result.map((res: any) => {
  })



  return (
    <Fragment>
      <div className=" flex justify-between w-full rounded-[10px] md:pt-[0px] sm:pt-[80px]">
        <div className="w-full h-[232px] bg-white flex flex-col gap-2 rounded-[10px] shadow-md">
          <div className="flex justify-evenly gap-1 pt-8 ps-1">
            <Image
              src="/images/line-chart-icon-2.svg"
              alt="Image"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-2">
              <div className="flex gap-8 flex-wrap">
                <p className="text-[#515b6b] text-sm leading normal ">
                  Admin Requests
                </p>
                <AdminRequestToday />
              </div>
              <p className="text-[#555A6B] text-2xl font-bold">
                {
                  result[0].status === 'fulfilled'
                  &&
                  result[0]?.value
                }
              </p>
              {
                result[0].status === 'rejected'
                &&
                <p className="text-red-800 text-2xl font-bold ">An error occured</p>
              }
            </div>
          </div>
          {
            result[1].status === 'fulfilled'
            &&
            <ReactEChartsComponent
              option={result[1].value}
              type={"Line Chart"} offSetColor1="#fcac97"
              offSetColor2="rgb(252, 141, 113)"
            />
          }
          {
            result[1].status === 'rejected'
            &&
            <ChartError />
          }
        </div>
      </div>
    </Fragment>
  );
};