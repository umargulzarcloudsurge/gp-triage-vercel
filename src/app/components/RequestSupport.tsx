"use client";
import React, { FormEvent, MouseEventHandler, useState } from 'react'
import Image from 'next/image';
import { Spin } from 'antd';
import { getServerSession } from 'next-auth';
import { User } from '../types/user';
import { requestSupportSubmitAction } from '../_actions/RequestSupprotServerAction';
import { message } from 'antd';
type iState = {
	isLoading: boolean;
	message: string
}

type RequestSupportProps = {
	user: User;
}

const RequestSupport = ({ user }: RequestSupportProps) => {


	const [messageApi, contextHolder] = message.useMessage();

	const [state, setState] = useState<iState>({
		isLoading: false,
		message: ""
	} as iState);

	const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		if (!state.message) {
			messageApi.open({
				type: 'error',
				content: 'Please fill in the message',
			});
			return;
		}
		setState((prev) => (
			{
				...prev,
				isLoading: true
			}))
		const { success, data, message } = await requestSupportSubmitAction(state.message);
		setState((prev) => (
			{
				...prev,
				isLoading: false,
				message: ""
			}))
		if (success) {
			messageApi.open({
				type: 'success',
				content: 'Request has been sent to administrator',
			});
			return;
		}
		if (!success) {
			messageApi.open({
				type: 'error',
				content: 'An expected error occured.',
			});
			return;
		}
	}

	const onChangeEventHandler = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget;
		setState((prev) => ({
			...prev, message: value
		}))
	}
	return (
		<>
			{contextHolder}
			<Spin spinning={state.isLoading} fullscreen />
			<div
				className="pt-10 pl-8 pr-16 bg-[#f1f4fa] flex flex-col gap-12">
				<h2 className='lg:text-2xl md:text-xl text-md font-[600]'>Request Support</h2>
				<div className="flex md:flex-row flex-col md:gap-20 gap-10 items-center">
					{/* <form onSubmit={submitHandler} className='w-full'> */}
					<div className="lg:p-10 p-5 rounded-[10px] bg-[#e7ecf2] flex flex-col gap-3 md:w-[70%] w-[100%]">
						<div className="flex flex-col gap-1">
							<label className="text-[#1F2D41] font-dm-sans text-sm leading-normal">
								Name:
							</label>
							<input
								disabled={true}
								onChange={onChangeEventHandler}
								name='name'
								defaultValue={user.name}
								type="text"
								className="px-2 py-3 rounded-[10px] bg-white border border-[#E3E3E3] outline-none"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-[#1F2D41] font-dm-sans text-sm leading-normal">
								Email:
							</label>
							<input
								disabled={true}
								onChange={onChangeEventHandler}
								name='email'
								defaultValue={user.email}
								type="email"
								className="px-2 py-3 rounded-[10px] bg-white border border-[#E3E3E3] outline-none"
							/>
						</div>
						{/* <div className="flex flex-col gap-1">
							<label className="text-[#1F2D41] font-dm-sans text-sm leading-normal">
								Phone:
							</label>
							<input
								onChange={onChangeEventHandler}
								name='phone'
								value={state.data.phone}
								type="tel"
								className="px-2 py-3 rounded-[10px] bg-white border border-[#E3E3E3] outline-none"
							/>
						</div> */}
						<div className="flex flex-col gap-1">
							<label className="text-[#1F2D41] font-dm-sans text-sm leading-normal">
								Message:
							</label>
							<textarea
								onChange={onChangeEventHandler}
								name='message'
								value={state.message}
								className="px-2 py-3 rounded-[10px] bg-white border border-[#E3E3E3] h-[216px] outline-none" />
						</div>
						<div>
							<button type="submit" onClick={submitHandler} className="dashborad-btn py-3 px-8  me-2 mb-2 text-xs text-[#0B132B] focus:outline-none bg-[#9BD4E3] rounded-full border border-gray-200 hover:bg-[#9bd5e3da] ">Submit</button>
						</div>
					</div>
					{/* </form> */}
					<div className='pb-8 md:pb-0'>
						<Image src='/images/blur-logo.svg' alt="ViewCrunch" layout="responsive" width={100} height={50} />
					</div>

				</div>

			</div>
		</>
	)
}

export default RequestSupport