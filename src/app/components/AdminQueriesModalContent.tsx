import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import modalCrossIcon from "../../../public/images/close.png";
import logo from '../../../public/images/logo.svg';
import Image from "next/image";
import { AdminRequestDataRecord } from '../types/AdminRequest';
import TextArea from 'antd/es/input/TextArea';
import { Spin } from 'antd';
import { updateCommentsOnAdminQueries } from '../_actions/AdminQueriesCommentsAction';
import { message } from 'antd';

type ModelContentProps = {
	modalContent: AdminRequestDataRecord,
	handleCancelModal: Function
}

type State = {
	isLoading: boolean;
}
const AdminQueriesModalContent = ({ modalContent, handleCancelModal }: ModelContentProps) => {
	const [messageApi, contextHolder] = message.useMessage();
	const initState: State = {
		isLoading: false
	}
	const [state, setState] = useState<State>(initState);
	const [comments, setComments] = useState(modalContent.gp_comments);
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement)
		const gp_comments = formData.get("comments");
		if (gp_comments) {
			setState((prev) => ({ ...prev, isLoading: true }));
			const { success, data, message } = await updateCommentsOnAdminQueries({ gp_comments }, modalContent.gp_adminrequestid);
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


	return (
		<>
			<Spin spinning={state.isLoading} fullscreen />
			{contextHolder}
			<div className="flex pt-5 pb-20 px-10 flex-col gap-3 h-full">
				<div className="absolute right-3 top-3">
					<Image
						src={modalCrossIcon}
						alt="_close"
						width={40}
						className="cursor-pointer"
						onClick={() => {
							handleCancelModal();
						}}
					/>
				</div>
				<div className="w-full flex flex-col gap-12 justify-start ">
					<div className="flex flex-col gap-8 h-fit">
						<div className="flex flex-col gap-2">
							<p className="text-4xl font-bold leading-normal text-[#06152B]">
								{modalContent['_gp_patient_value@OData.Community.Display.V1.FormattedValue']}
							</p>
							<div className="flex flex-col">
								<p className="text-base text-[#06152B]">
									<span className="font-medium">Request Date: </span>
									{modalContent['createdon@OData.Community.Display.V1.FormattedValue']}
								</p>
								<p className="text-base text-[#06152B]">
									<span className="font-medium">Query Type: </span>
									{modalContent['gp_requesttype@OData.Community.Display.V1.FormattedValue']}
								</p>
							</div>
						</div>
						<div className='flex flex-row gap-3'>
							<div className="flex flex-col gap-2 h-full w-[50%]">
								<p className="text-base text-[#06152B] font-medium">
									Further Details:
								</p>
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 0 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>Summary</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_DoctorsLetter.gp_requestsummary
														}
													</div>
												</>
											}
										</>)
									})()
								}
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 1 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>Time Frame</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_FitOrSickNote.gp_timeframe
														}
													</div>
													<label className='font-semibold ml-1'>Return Sooner Details</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_FitOrSickNote.gp_returnsoonerdetails
														}
													</div>
													<label className='font-semibold ml-1'>Medical Problem</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_FitOrSickNote.gp_medicalproblem
														}
													</div>
													<label className='font-semibold ml-1'>Existing Notes</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_FitOrSickNote.gp_existingnote.toString()
														}
													</div>
												</>
											}
										</>)
									})()
								}
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 2 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>GP Reason</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Referral.gp_reason
														}
													</div>
													<label className='font-semibold ml-1'>When Referral Made</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Referral.gp_whenreferralmade
														}
													</div>
													<label className='font-semibold ml-1'>Referral Assistance</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Referral.gp_referralassistance
														}
													</div>
													<label className='font-semibold ml-1'>Referral Category</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Referral['gp_referralcategory@OData.Community.Display.V1.FormattedValue']
														}
													</div>
												</>
											}
										</>)
									})()
								}
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 3 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>Details</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Medication.gp_details
														}
													</div>
													<label className='font-semibold ml-1'>Medications</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Medication.gp_medications
														}
													</div>
												</>
											}
										</>)
									})()
								}
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 4 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>Test Locations</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_TestResult.gp_testlocation
														}
													</div>
													<label className='font-semibold ml-1'>Test Time Frame</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_TestResult.gp_testtimeframe
														}
													</div>
													<label className='font-semibold ml-1'>Type of Test</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_TestResult.gp_typeoftest
														}
													</div>
												</>
											}
										</>)
									})()
								}
								{
									(() => {
										return (<>
											{
												modalContent.gp_requesttype === 5 &&
												<>
													<label className='font-semibold ml-1'>GP ID</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Other.gp_id
														}
													</div>
													<label className='font-semibold ml-1'>Details</label>
													<div className="border border-[#D0D0D0] rounded-lg p-4 bg-white max-w-[569px]">
														{
															modalContent.gp_Other.gp_details
														}
													</div>

												</>
											}
										</>)
									})()
								}
							</div>
							<div className='flex flex-col   w-[50%] mt-7'>
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
											className="mt-3 middle none center mr-0 rounded-lg bg-[#0E72B7] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-[#0c69aa] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
											data-ripple-light="true"
											type='submit'
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<Image src={logo} alt="_logo" className="w-[66px] h-[65px] pb-4" />
				</div>
			</div>
		</>
	)
}

export default AdminQueriesModalContent;