import React, { Fragment } from "react";
import Header from "./Header";
import { TotalAppointmentsBooked } from "./TotalAppointmentsBooked";
import { TotalAdminRequest } from "./TotalAdminRequest";
import { RecentAppointmentsBooked } from "./RecentAppointmentsBooked";
import { AppointmentsBookedPerMonth } from "./AppointmentsBookedPerMonth";
import { AppointmentsbyTriageCategory } from "./AppointmentsbyTriageCategory";
import { useDataverseGet } from "../hooks/useDataerse";
import { getAccountId } from "../util/Helper";

const Dashboard = async ({ endDate, startDate }: { startDate: string, endDate: string }) => {

  return (
    <Fragment>
      <Header />
      <div>
        <div className="md:mt-7 sm:mt-6 grid md:grid-cols-2 md:gap-9 sm:gap-0 gap-5  2xl:ps-[25px] xl:ps-[15px] lg:ps-[20px] md:px-5 sm:px-5 px-3 lg:px-0 pt-8 2xl:w-[67%] xl:w-[63%] lg:w-[58%] md:w-[100%] sm:w-[100%] w-[80%]">
          {/* Total Appointments & Total Admin Queries */}
          <TotalAppointmentsBooked />
          <TotalAdminRequest />
        </div>

        {/* Recent Appoinments */}
        <RecentAppointmentsBooked />

        <div className="flex">
          <div className="lg:absolute top-[88px] 2xl:right-[20px] xl:right-[15px] lg:right-[20px]  xl:w-[370px] lg:w-[300px] sm:w-[100%] w-[80%] md:mx-5 lg:mx-0 sm:mx-5 mx-3 md:mt-5 sm:mt-5 mt-3 lg:mt-9 2xl:w-1/4">
            <div className="flex flex-col gap-6">
              {/*=== Appointments Booked Per Month ====*/}
              <AppointmentsBookedPerMonth accountId={getAccountId()} startDate={startDate} endDate={endDate} />
              {/* Appointments by Triage Category */}
              <AppointmentsbyTriageCategory endDate={endDate} startDate={startDate} key={Math.random()} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
