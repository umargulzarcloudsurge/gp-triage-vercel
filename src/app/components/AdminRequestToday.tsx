import React from "react";
import { useDataverseGet } from "../hooks/useDataerse";
import { getAccountId } from "../util/Helper";


export const AdminRequestToday = async () => {
    const { data, success, message } = await useDataverseGet('gp_adminrequests', "$select=gp_adminrequestid&$filter=(_gp_gp_value%20eq%20" + getAccountId() + "%20and%20Microsoft.Dynamics.CRM.Today(PropertyName='createdon'))&$count=true");

  return (
    <p className="text-[#0E72B7] text-xs leading-normal ">{data["@Microsoft.Dynamics.CRM.totalrecordcount"]} Queries Today</p>
  );
};
