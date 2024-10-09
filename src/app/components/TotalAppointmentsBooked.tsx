import React, { Fragment } from "react";
import Image from "next/image";
import { useDataverseGet } from "../hooks/useDataerse";
import { AppointmentsThisWeek } from "./AppointmentsThisWeek";
import ReactEChartsComponent from "./ReactEChartsComponent";
import { ChartType } from "../types/enums";
import { getAccountId } from "../util/Helper";
import ChartError from "./Error/ChartError";

export const TotalAppointmentsBooked = async () => {

  const bookingsummariesPromise = new Promise(async (res, rej) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, success, message } = await useDataverseGet('gp_bookingsummaries', "$select=gp_bookingsummaryid,createdon&$filter=(_gp_gp_value eq '" + getAccountId() + "')&$count=true");
    if (success) {
      res(data["@Microsoft.Dynamics.CRM.totalrecordcount"]);
      return;
    }
    rej({ message });
  });
  const gp_bookingsummariesCharts = new Promise(async (res, rej) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, success, message } = await useDataverseGet(
      "gp_bookingsummaries",
      "$select=gp_bookingsummaryid,createdon&$filter=(_gp_gp_value eq '" + getAccountId() + "' and Microsoft.Dynamics.CRM.Last7Days(PropertyName='createdon'))&$count=true"
    );
    if (success) {
      const countDays = [0, 0, 0, 0, 0, 0, 0];
      data?.value.forEach(
        (entry: any) => countDays[new Date(entry.createdon).getDay()]++
      );
      res(countDays);
      return;
    }
    rej({ message });
  });

  const result = await Promise.allSettled([bookingsummariesPromise, gp_bookingsummariesCharts]) as any;


  return (
    <Fragment>
      <div className="flex justify-between w-full rounded-lg h-[170px] ">
        <div className="w-full h-[232px] bg-white flex flex-col gap-2 rounded-lg shadow-md">
          <div className="flex justify-evenly pt-9 ">
            <Image
              src="/images/line-chart-icon-1.svg"
              alt="Appointment-booked-Image"
              width={60}
              height={60}
            />
            <div className="flex flex-col gap-2 pe-2">
              <div className="flex gap-8 flex-wrap">
                <p className="text-[#515b6b] text-sm leading normal ">
                  Appointments Booked
                </p>
                <AppointmentsThisWeek />
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
                <p className="text-red-800 text-2xl font-bold">An error occured</p>
              }
            </div>
          </div>
          {
            result[1].status === 'fulfilled'
            &&
            <ReactEChartsComponent
              option={result[1]?.value}
              type={"Line Chart"}
              offSetColor1="#9BD4E3"
              offSetColor2="rgb(1, 191, 236)"
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
