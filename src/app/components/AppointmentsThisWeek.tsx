import React, { Fragment } from "react";
import { useDataverseGet } from "../hooks/useDataerse";
import { getAccountId } from "../util/Helper";


export const AppointmentsThisWeek = async () => {
    const { data, success, message } = await useDataverseGet('gp_bookingsummaries', "$select=gp_bookingsummaryid&$filter=(_gp_gp_value%20eq%20" + getAccountId() + "%20and%20Microsoft.Dynamics.CRM.Last7Days(PropertyName='createdon'))&$count=true");

  return (
    <p className="text-[#0E72B7] xl:ps-5 text-xs leading-normal">
      {data["@Microsoft.Dynamics.CRM.totalrecordcount"]} This Week
    </p>
  );
};
