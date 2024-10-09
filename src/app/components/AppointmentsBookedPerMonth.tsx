
import React, { Fragment } from "react";
import ReactEChartsComponent from "./ReactEChartsComponent";
import { useDataverseGet } from "../hooks/useDataerse";
import { useSearchParams } from "next/navigation";
import { getAccountId, getShortMonthNames } from "../util/Helper";
import ChartError from "./Error/ChartError";
export type AppointmentsBookedPerMonthProps = {
  accountId?: string,
  startDate: string,
  endDate: string,
}


export const AppointmentsBookedPerMonth = async ({ accountId, endDate, startDate }: AppointmentsBookedPerMonthProps) => {
  const { success, data, message } = await useDataverseGet('gp_bookingsummaries', `$select=gp_bookingsummaryid,createdon&$filter=(Microsoft.Dynamics.CRM.OnOrBefore(PropertyName='createdon',PropertyValue='${endDate}') and Microsoft.Dynamics.CRM.OnOrAfter(PropertyName='createdon',PropertyValue='${startDate}') and _gp_gp_value eq ${getAccountId()})&$count=true`) as any;
  const chartData = new Array<number>;
  const months = new Array<string>;

  if (success) {
    const monthsShortNames = getShortMonthNames(new Date(startDate), new Date(endDate));
    data?.value.forEach((entry: any) => {
      const createdDate = new Date(entry.createdon);
      const month = createdDate.toLocaleString('en-gb', { month: 'short' });
      monthsShortNames[month] = (monthsShortNames[month] || 0) + 1;
    });
    for (const [key, value] of Object.entries(monthsShortNames)) {
      months.push(key);
      chartData.push(value as number);
    }
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-2 px-2 pt-6 rounded-lg bg-white shadow-md">
        <p className="text-gray-600 xl:text-lg text-md font-[400] leading-normal ps-3">
          Appointments Booked Per Month
        </p>
        {
          success &&
          <ReactEChartsComponent
            option={chartData}
            monthsData={[...months]}
            type={"Bar Chart"}
            offSetColor1=""
            offSetColor2=""
          />
        }
        {
          !(success) &&
          <ChartError />
        }
      </div>
    </Fragment>
  );
};
function useServerContext(): { searchParams: any; } {
  throw new Error("Function not implemented.");
}

