"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Popover, Checkbox, Spin } from "antd";
import grayDeleteIcon from "../../../public/images/gray-delete-icon.svg";
import calendarIcon from "../../../public/images/dark-blue-calendar-icon.svg";
import editIcon from "../../../public/images/black-edit-icon.svg";
import redDeleteIcon from "../../../public/images/red-delete-icon.svg";
import CommonModal from "@/app/components/CommonModal";
import { calculateAge } from "@/app/util/CalculateAge";
import { TriageType, TriageModelDataType } from "../types/TriagesType";
import { TriageModalContent } from "./TriageModelContent";
import { TriageTableHeader } from "./TriageTableHeader";
import { TriageIndividualRecord } from "../_actions/TriageIndividualRecord";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import { updateisReadServerActionTriage } from "../_actions/AdminQueryDataServerAction";
import { message } from 'antd';
import axios from "axios";


type TriageTableProps = {
  TriageData: TriageType;
  search: string,
  isServer: boolean,
};

type IState = {
  search: string
  currentPage: number;
  modalContent: TriageType;
  selectedRowKeys: [];
  modalOpen: boolean;
  isLoading: boolean;
  currentPageNumber: number,
  selectedPageNumber: number,
  isChange: boolean,
  data: any,
  isServer: boolean,
};
let nextLink = "";
export const TriageTable = ({ TriageData, search, isServer }: TriageTableProps) => {
  const [state, setState] = useState<IState>({
    currentPageNumber: 1,
    selectedPageNumber: 1,
    modalOpen: false,
    isChange: false,
    isLoading: false,
    isServer: isServer,
    data: structuredClone(TriageData),
  } as IState);
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  if (!nextLink) {
    if (state.data["@odata.nextLink"]) {
      nextLink = state.data["@odata.nextLink"]
    }
  }
  if (search) {
    if (state.data["@odata.nextLink"]) {
      nextLink = state.data["@odata.nextLink"]
    }
  }

  useEffect(() => {
    if (state.isServer) {
      setState((prev) => ({ ...prev, data: structuredClone(TriageData), isServer: false }))
    }
  }, [state.isServer])

  useEffect(() => {
    (async () => {
      if (state.isChange) {
        const urlObject = new URL(nextLink);
        const skipTokenParams = urlObject.searchParams.get("$skiptoken") as string;
        const pageNumberMatch = skipTokenParams.match(/pagenumber=\"(\d+)\"/);
        if (pageNumberMatch) {
          const pageNumber = pageNumberMatch[1];
          const newLink = skipTokenParams.replace(`pagenumber="${pageNumber}"`, `pagenumber="${state.selectedPageNumber}"`)
          urlObject.searchParams.set('$skiptoken', newLink);
          try {
            setState((prev) => ({ ...prev, isLoading: true }));
            const { data } = await axios.post('api/get-next-record', { url: urlObject.toString() })
            setState((prev) => ({ ...prev, data: data.data, isLoading: false }))
          } catch (error) {
            setState((prev) => ({ ...prev, isLoading: false }));
            messageApi.open({
              type: 'error',
              content: 'An Error occured.',
            });
          }
        } else {
          console.error("Failed to extract page number from cookie string");
        }
      }
    })()
  }, [state.selectedPageNumber])

  const handleCancelModal = () => {
		setState((prev) => (
			{
				...prev,
				modalOpen: false,
			}
		)
		);
	};


  return (
    <>
      {contextHolder}
      <Spin spinning={state.isLoading} fullscreen />
      <div className="">
        <table width="100% overflow-scroll border-0">
          <tbody>
            <TriageTableHeader />
            {
              state.data.value?.length > 0 ? <>
                {state.data.value?.map((item: any) => (
                  <tr
                    key={item.gp_id}
                    className={`flex gap-2 text-[12px] sm:text-base justify-start items-center py-4 px-2 bg-white  rounded-lg mb-3 hover:bg-[#fafafa] hover:cursor-pointer ${item.gp_isread ? 'bg-[#fafafa]' : 'font-bold bg-gray-100'}`}
                    onClick={() => {
                      (async () => {
                        setState((prev) => ({
                          ...prev,
                          isLoading: true,
                        }));
                        const updateIsReadPromise = new Promise(async (res, rej) => {
                          if (item.gp_isread === false) {
                            const { success, data, message } = await updateisReadServerActionTriage(item.gp_bookingsummaryid);
                            if (success) {
                              return res({ isRead: true, isAlreadyDone: false });
                            }
                            return rej(message);
                          }
                          res({ isAlreadyDone: true })
                        })

                        const modalDataPromise = new Promise(async (res, rej) => {
                          const { success, data, message } = await TriageIndividualRecord(item.gp_bookingsummaryid);
                          if (success) {
                            return res({ modalContent: true, data: data });
                          }
                          return rej(message);
                        })

                        const promisAll = await Promise.all([updateIsReadPromise, modalDataPromise]) as any;
                        if (promisAll[1].modalContent === true) {
                          if (promisAll[0].isAlreadyDone === false) {
                            const index = state.data.value.indexOf(item);
                            state.data.value[index].gp_isread = true;

                          }
                          setState((prev) => (
                            {
                              ...prev,
                              modalOpen: true,
                              modalContent: promisAll[1].data,
                              isLoading: false,
                              data: state.data
                            }
                          )
                          );
                          return;
                        }



                        // @ts-ignore

                        if (success) {
                          setState((prev) => ({
                            ...prev,
                            modalOpen: true,
                            modalContent: { ...state.data[1] },
                            isLoading: false,
                          }));
                          return;
                        }
                        setState((prev) => ({
                          ...prev,
                          isLoading: false,
                        }));
                      })();
                    }}
                  >
                    <td className="w-[3%]">
                      <Checkbox
                        defaultChecked={false}
                        checked={item.checked}
                      />
                    </td>
                    <td className="w-[10%] text-[#06152B] font-base leading-normal">
                      {item.gp_id}
                    </td>
                    <td className="w-[17%] flex justify-start text-[#06152B] font-base leading-normal">
                      {item.gp_Patient.gp_fullname}
                    </td>
                    <td className="w-[7%]">
                      <p className="text-[#06152B] text-[12px] sm:text-base leading-normal">
                        {calculateAge(item.gp_Patient.gp_birthday)}
                      </p>
                    </td>
                    <td className="w-[21.16%] text-left text-[#06152B] text-[12px] sm:text-base leading-normal">
                      {item.gp_symptoms}
                    </td>
                    <td className="w-[19.16%] flex justify-center gap-4 ">
                      <Image src={calendarIcon} width={15} height={15} alt="Icon" />

                      <p className="text-[#06152B] text-[12px] sm:text-base leading-normal">
                        {item.gp_slotstart.split("T")[0]}
                      </p>
                    </td>
                    <td
                      className={`w-[19.16%] flex py-3 px-8 justify-center items-center rounded-full text-[12px] sm:text-base leading-normal ${item[
                        "gp_triageas@OData.Community.Display.V1.FormattedValue"
                      ] === "Semi-Urgent"
                        ? "text-[#0B132B]"
                        : item[
                          "gp_triageas@OData.Community.Display.V1.FormattedValue"
                        ] === "Non-Urgent"
                          ? "text-[#0E72B7]"
                          : "text-[#FC8D71]"
                        } ${item[
                          "gp_triageas@OData.Community.Display.V1.FormattedValue"
                        ] === "Semi-Urgent"
                          ? "bg-[#9BD4E3]"
                          : item[
                            "gp_triageas@OData.Community.Display.V1.FormattedValue"
                          ] === "Non-Urgent"
                            ? "bg-[#CDEAF1]"
                            : "bg-[#FEE8E3]"
                        }`}
                    >
                      {item["gp_triageas@OData.Community.Display.V1.FormattedValue"]}
                    </td>
                    <td className="w-[2%] flex justify-center items-center ">

                      <Popover
                        placement="bottom"
                        content={
                          <div className="bg-white rounded-lg p-0 flex flex-col gap-1">
                            <div className="cursor-pointer bg-[#f5f5fd] flex items-center gap-2 rounded-lg p-2 w-[90px] text-[#0B132B] text-sm leading-normal font-medium">
                              <Image
                                src={editIcon}
                                width={18}
                                height={18}
                                alt="Icon"
                              />
                              Edit
                            </div>
                            <div
                              className="cursor-pointer bg-[#fff7fb] flex items-center gap-2 rounded-lg p-2 w-[90px] text-[#FC8D71] text-sm leading-normal font-medium"
                            >
                              <Image
                                src={redDeleteIcon}
                                width={18}
                                height={18}
                                alt="Icon"
                              />
                              Delete
                            </div>
                          </div>
                        }
                      >

                      </Popover>
                    </td>
                  </tr>
                ))}
              </> : <div className="h-96 flex items-center justify-center">
                <div className="ant-empty-image">
                  <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                      <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                      <g fill-rule="nonzero" stroke="#d9d9d9">
                        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                        <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path>
                      </g>
                    </g>
                  </svg>
                  <div className="text-center text-slate-300 ant-empty-description">No data</div>
                </div>
              </div>
            }
          </tbody>
        </table>
        <div className="flex justify-center">
          <Pagination
            onChange={(e) => { setState((prev) => (
                {
                  ...prev,
                  selectedPageNumber: e,
                  isChange: true
                }))
            }}
            defaultCurrent={1}
            total={state.data["@odata.count"] as number}
          />
        </div>
      </div>
      {
        !(state.isLoading) &&
        <CommonModal
          title=""
          isModalOpen={state.modalOpen}
          handleCancel={handleCancelModal}
        >
          <TriageModalContent
            modalContent={state.modalContent}
            isLoading={state.isLoading}
            handleCancelModal={handleCancelModal}
          />
        </CommonModal>
      }
    </>
  );
};


