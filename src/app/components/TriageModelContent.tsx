"use client";
import React, { FormEvent, useEffect, useState } from "react";
import modalCrossIcon from "../../../public/images/close.png";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import { TriageModelDataType, TriageType } from "../types/TriagesType";
import { TriageIndividualRecord } from "../_actions/TriageIndividualRecord";
import { calculateAge } from "../util/CalculateAge";
import { getSymptoms } from "../util/GetSymptomsArray";
import { getInitialComplaint } from "../util/GetInitialComplaint";
import { getPossibleCauses } from "../util/GetPossibleCauses";
import { Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { message } from 'antd';
import { updateCommentsOnTriages } from "../_actions/TriagesCommentsAction";

type ModelContentProps = {
    modalContent: TriageType;
    handleCancelModal: Function;
    isLoading: boolean;
};

type IModelData = {
    ModelData: TriageModelDataType;
};

type State = {
    isLoading: boolean;
};

export const TriageModalContent = ({ modalContent, handleCancelModal }: any) => {
    debugger
    const [state, setState] = useState<State>({ isLoading: false, } as State);
    const [messageApi, contextHolder] = message.useMessage();
    const [comments, setComments] = useState(modalContent.gp_comments);

    const handleCloseModel = (e: any) => {
        e.preventDefault();
        handleCancelModal();
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const gp_comments = formData.get("comments");
        if (gp_comments) {
            setState((prev) => ({ ...prev, isLoading: true }));
            const { success, data, message } = await updateCommentsOnTriages({ gp_comments }, modalContent.gp_bookingsummaryid);
            setState((prev) => ({ ...prev, isLoading: false }));
            if (success) {
                messageApi.open({
                    type: 'success',
                    content: 'Comments added successfully.',
                });
                return
            }
            messageApi.open({
                type: 'error',
                content: 'An error occured while adding comments.',
            });
        }
    }


    const initialComplaint = modalContent ? getInitialComplaint(modalContent) : null;
    const possibleCauses = modalContent ? getPossibleCauses(modalContent) : null;

    return (
        <>
            {contextHolder}
            <Spin spinning={state.isLoading} fullscreen />
            <div className="triage-model flex pt-6 pb-20 px-10 flex-col gap-3">
                <div className="flex justify-end items-center w-full"></div>
                {/* <div className="absolute left-0 -top-5 -z-1">
                    <Image
                        src={bgImage}
                        alt="_close"
                        className="cursor-pointer z-20"
                    // onClick={handleCloseModel}
                    />
                </div> */}
                <div className="absolute right-3 top-3">
                    <Image
                        src={modalCrossIcon}
                        width={40}
                        alt="_close"
                        className="cursor-pointer rounded-full"
                        onClick={handleCloseModel}
                    />
                </div>
                <div className="w-full flex flex-col gap-8 justify-start max-w-[800px] absolute top-8 pb-4">
                    <p className="text-4xl font-bold leading-normal text-[#06152B]">
                        {modalContent["gp_Patient"].gp_fullname}
                    </p>
                    <div className="grid gap-6 grid-cols-2 ">
                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">Age: </span>{" "}
                            {calculateAge(
                                modalContent.gp_Patient.gp_birthday.split("T")[0]
                            )}
                        </p>

                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">Appointment Type: </span>{" "}
                            {
                                modalContent[
                                "gp_appointmenttypetext"
                                ]
                            }
                        </p>

                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">Initial Complaint: </span>
                            {initialComplaint}
                        </p>

                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">Triage Date: </span>{" "}
                            {modalContent?.createdon?.split("T")[0]}
                        </p>

                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">Start Date: </span>
                            {modalContent.gp_slotstart}
                        </p>

                        <p className="text-base text-[#06152B]">
                            <span className="font-medium">End Date: </span>
                            {modalContent.gp_slotend}
                        </p>

                        <div>
                            <p className="text-base text-[#06152B] font-medium">
                                Other Problems or Symptoms:
                            </p>
                            <ul>
                                {getSymptoms(modalContent)?.map((symptom: any) => {
                                    return <li key={Math.random()}>• {symptom}</li>;
                                })}
                            </ul>
                        </div>


                        <div>
                            <p className="text-base text-[#06152B] font-medium">
                                Possible Causes:
                            </p>
                            {possibleCauses && possibleCauses.length > 0 ? (
                                <ul>
                                    {possibleCauses.map((cause: string, index: number) => (
                                        <li key={index}>{`${index + 1}. ${cause}`}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>I could not find a possible cause for the symptoms.</p>
                            )}
                        </div>
                        {/* {modalContent && modalContent.gp_comments? */}
                        <div className="">

                            <form className='w-full' onSubmit={onSubmit}>
                                {
                                    (() => {
                                        return (<>
                                            <label className='font-semibold ml-1'>Comments</label>
                                            <TextArea placeholder="Comments" allowClear className='h-60 mt-3' name='comments' value={comments} onChange={(e) => {
                                                setComments(e.target.value as string);
                                            }} /></>)
                                    })()
                                }
                                <div className='w-full flex justify-end'>
                                    <button
                                        className="mt-3 middle none center mr-0 rounded-lg bg-[#0E72B7] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:bg-[#0c69aa] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true"
                                        type='submit'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                        </div>
                        {/* : null */}
                        {/* } */}

                    </div>


                    {/* <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-4xl font-bold leading-normal text-[#06152B]">
                                {modalContent["gp_Patient"].gp_fullname}
                            </p>
                            <div className="flex justify-between items-start gap-4">
                                <p className="text-base text-[#06152B]">
                                    <span className="font-medium">Age: </span>{" "}
                                    {calculateAge(
                                        modalContent.gp_Patient.gp_birthday.split("T")[0]
                                    )}
                                </p>
                                <p className="text-base text-[#06152B]">
                                    <span className="font-medium">Initial Complaint: </span>
                                    {initialComplaint}
                                </p>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <p className="text-base text-[#06152B]">
                                    <span className="font-medium">Triage Date: </span>{" "}
                                    {modalContent?.createdon?.split("T")[0]}
                                </p>
                                <p className="text-base text-[#06152B]">
                                    <span className="font-medium">Appointment Type: </span>{" "}
                                    {
                                        modalContent[
                                        "gp_appointmenttype@OData.Community.Display.V1.FormattedValue"
                                        ]
                                    }
                                </p>

                            </div>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <p className="text-base text-[#06152B] font-medium">
                                    Other Problems or Symptoms:
                                </p>
                                <ul>
                                    {getSymptoms(modalContent)?.map((symptom: any) => {
                                        return <li>• {symptom}</li>;
                                    })}
                                </ul>
                            </div>

                            <div>
                                <p className="text-base text-[#06152B] font-medium">
                                    Possible Causes:
                                </p>
                                {possibleCauses && possibleCauses.length > 0 ? (
                                    <ul>
                                        {possibleCauses.map((cause: string, index: number) => (
                                            <li key={index}>{`${index + 1}. ${cause}`}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>I could not find a possible cause for the symptoms.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2"></div>
                    </div> */}
                    <Image src={logo} alt="_logo" className="w-[66px] h-[65px] pb-4 " />
                </div>
            </div>
        </>
    );
};
