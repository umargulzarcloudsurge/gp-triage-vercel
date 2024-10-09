// "use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { useDataverseGet } from "../hooks/useDataerse";
import { calculateAge } from "../util/CalculateAge";
import { split } from "postcss/lib/list";
import { getAccountId } from "../util/Helper";



export const RecentAppointmentsBooked = async () => {
  const { data, success, message } = await useDataverseGet('gp_bookingsummaries', "$select=gp_symptoms,gp_triageas&$expand=gp_Patient($select=gp_birthday,gp_fullname)&$filter=_gp_gp_value eq " + getAccountId() + "&$orderby=createdon desc&$top=10&$count=true");

  return (
    <Fragment>
      <div
        className="shadow-md mt-5 2xl:ms-[25px] xl:ms-[15px] lg:ms-[20px] md:mx-5 sm:mx-5 mx-3 lg:mx-0 bg-[#fafcfd] flex flex-col lg:gap-4 gap-10 px-5  pt-8 2xl:w-[66%] xl:w-[62%] lg:w-[56%]
		  						 md:w-[93%] sm:w-[94%] w-[80%] rounded-lg overflow-auto "
      >
        <div className="flex gap-6 justify-between items-center">
          <p className="text-gray-600 sm:ps-2 ps-2 sm:font-medium sm:text-lg text-sm leading-normal">
            Recent Appointments Booked
          </p>
          <Link href="/triages">
            <p className="text-[13px] text-[#3A36DB]">See More</p>
          </Link>
        </div>
        {/*===== Patient Info Table======= */}
        <div className="h-[415px] overflow-y-scroll calenderTable mt-5">
          <table width="100%">
            <tbody>
              <tr className="flex gap-1 px-2 justify-start items-center sticky top-0 h-10  bg-[#fafcfd] z-[1]">
                <td className="w-[25%] text-[#4b5769] text-base leading-normal font-medium">
                  <div className="flex items-center text-sm">
                    Name
                    {/* <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a> */}
                  </div>
                </td>
                <td className="w-[15%] text-[#4b5769] text-base leading-normal font-medium">
                  <div className="flex items-center text-sm">
                    Age
                    {/* <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a> */}
                  </div>
                </td>
                <td className="w-[25%] text-[#4b5769] text-base leading-normal font-medium">
                  <div className="flex items-center text-sm">
                    Presenting Complaint
                    {/* <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a> */}
                  </div>
                </td>
                <td className="w-[35%] text-[#4b5769] text-base leading-normal font-medium">
                  <div className="flex items-center text-sm">
                    Status
                    {/* <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a> */}
                  </div>
                </td>
              </tr>
              {data.value.map((item: any, index: number) => (
                <tr key={index} className="flex gap-2 justify-between items-center py-4 px-2 bg-white rounded-lg mb-3 hover:bg-[#F0F0F0] hover:cursor-pointer border-b">
                  <td className="w-[25%] text-[#06152B] font-base leading-normal">
                    {item["gp_Patient"].gp_fullname}
                  </td>
                  <td className="w-[15%] text-[#06152B] font-base leading-normal">
                    {calculateAge(item.gp_Patient.gp_birthday.split("T")[0])}
                  </td>
                  <td className="w-[25%]">
                    <p className="text-[#06152B] font-base leading-normal">
                      {item["gp_symptoms"]}
                    </p>
                  </td>
                  <td
                    className={`w-[35%] flex py-3 px-8 justify-center items-center rounded-full text-base leading-normal ${item["gp_triageas@OData.Community.Display.V1.FormattedValue"] === "Semi-Urgent"
                      ? "text-[#0B132B]"
                      : item["gp_triageas@OData.Community.Display.V1.FormattedValue"] === "Non-Urgent"
                        ? "text-[#0E72B7]"
                        : "text-[#FC8D71]"
                      } ${item["gp_triageas@OData.Community.Display.V1.FormattedValue"] === "Semi-Urgent"
                        ? "bg-[#9BD4E3]"
                        : item["gp_triageas@OData.Community.Display.V1.FormattedValue"] === "Non-Urgent"
                          ? "bg-[#CDEAF1]"
                          : "bg-[#FEE8E3]"
                      }`}
                  >
                    {item["gp_triageas@OData.Community.Display.V1.FormattedValue"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
