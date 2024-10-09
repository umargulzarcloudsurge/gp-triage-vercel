//"use client";
import React, { Fragment } from "react";
import useLineChart from "../hooks/useChart";
import Image from "next/image";
import ReactEChartsComponent from "./ReactEChartsComponent";
import { useDataverseGet } from "../hooks/useDataerse";
import { getAccountId } from "../util/Helper";
import ChartError from "./Error/ChartError";

type Props = {
  startDate: string,
  endDate: string
}

export const AppointmentsbyTriageCategory = async ({ endDate, startDate }: Props) => {
  let options = [] as any;
  const { data, success, message } = await useDataverseGet(
    "gp_bookingsummaries",
    `$select=gp_bookingsummaryid,gp_triageas&$filter=(Microsoft.Dynamics.CRM.OnOrBefore(PropertyName='createdon',PropertyValue='${endDate}') and Microsoft.Dynamics.CRM.OnOrAfter(PropertyName='createdon',PropertyValue='${startDate}') and _gp_gp_value eq ${getAccountId()})&$count=true`
  );
  if (success) {
    const counts = data?.value.reduce(
      (acc: any, entry: any) => (
        acc[entry["gp_triageas@OData.Community.Display.V1.FormattedValue"]]++,
        acc
      ),
      { "Semi-Urgent": 0, Urgent: 0, "Non-Urgent": 0 }
    );
    options = [
      {
        value: counts["Non-Urgent"],
        name: "Non-Urgent",
        itemStyle: { color: "#0e72b7" },
      },
      {
        value: counts["Semi-Urgent"],
        name: "Semi-Urgent",
        itemStyle: { color: "#9bd4e3" },
      },
      {
        value: counts["Urgent"],
        name: "Urgent",
        itemStyle: { color: "#f28b70" },
      },
    ];
  }
  return (
    <Fragment>
      <div className="flex flex-col gap-2 p-6 rounded-lg bg-white mb-10 shadow-md">
        <div className="flex gap-1">
          <p className="text-gray-600 text-md font-medium leading-normal">
            Appointments by Triage Category
          </p>
          <Image
            src="/images/gray-action-icon.svg"
            className="ps-1"
            width={20}
            height={20}
            alt="Appointment-Image"
          />
        </div>
        {!(success) &&
          <ChartError />
        }

        {
          success &&
          <ReactEChartsComponent
            option={options}
            type={"Donut Chart"}
            offSetColor1=""
            offSetColor2=""
          />
        }
      </div>
    </Fragment>
  );
};
