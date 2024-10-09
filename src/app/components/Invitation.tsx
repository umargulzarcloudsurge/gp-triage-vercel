"use client";
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import Image from 'next/image';
import logo from "../../../public/images/logo.svg";
import hidePasswordIcon from "../../../public/images/hide-password-icon.svg";
import { Checkbox, Spin } from 'antd';
import primaryLogo from "../../../public/images/primary-logo.svg";
import loginImg1 from "../../../public/images/login-img-1.png";
import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import showPasswordIcon from "../../../public/images/show-password-icon.svg";

export type InvitationType = {
	contactid: string;
	emailaddress1: string;
};



const Invitation = ({ contactid, emailaddress1 }: InvitationType) => {
	const [messageApi, contextHolder] = message.useMessage();
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordBlack, setIsPasswordBlack] = useState<boolean>(false);
	const [validation, setValidations] = useState(
		{
			eightCharValidations: false,
			oneLower: false,
			oneCapital: false,
			oneNumber: false,
			oneSpecialCharacter: false
		}
	);
	const { push } = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			if (validation.eightCharValidations === false || validation.oneCapital === false || validation.oneLower === false || validation.oneNumber === false || validation.oneSpecialCharacter === false) {
				setIsPasswordBlack(true);
				return;
			}
			const formData = new FormData(e.target as HTMLFormElement);
			const password = formData.get("password");
			const confirmpassword = formData.get("confirmpassword");
			if (!password || !confirmpassword) {
				messageApi.open({
					type: 'error',
					content: "Password and Confirm Password Required",
				});
				return;
			}
			if (password !== confirmpassword) {
				messageApi.open({
					type: 'error',
					content: "Password and confirm Password doesn't match",
				});
				return;
			}
			const body = { password, contactid };
			try {
				setLoading(true);
				const { data } = await axios.post('api/contact', body);
				setLoading(false);
				if (data.result.success) {
					messageApi.open({
						type: 'success',
						content: "Password has been changed. Please login to continue",
					});
					setTimeout(() => {
						push('/login')
					}, 1000)
					return
				}
				messageApi.open({
					type: 'error',
					content: "An un-expected error occured",
				});
			} catch (error) {
				messageApi.open({
					type: 'success',
					content: "An un-expected error occured",
				});
			}

		} catch (error) {
			messageApi.open({
				type: 'error',
				content: "An unexpected error occured. Please contact administrator",
			});
		}
	}

	const setPasswordValidations = (val: string) => {

		if (val.length < 8) {
			setValidations((prev) => ({ ...prev, eightCharValidations: false }))
		} else {
			setValidations((prev) => ({ ...prev, eightCharValidations: true }))
		}

		if (val.match(/[a-z]/)) {
			setValidations((prev) => ({ ...prev, oneLower: true }))
		} else {
			setValidations((prev) => ({ ...prev, oneLower: false }))
		}
		if (val.match(/[A-Z]/)) {
			setValidations((prev) => ({ ...prev, oneCapital: true }))
		} else {
			setValidations((prev) => ({ ...prev, oneCapital: false }))
		}
		if (val.match(/\d/)) {
			setValidations((prev) => ({ ...prev, oneNumber: true }))
		} else {
			setValidations((prev) => ({ ...prev, oneNumber: false }))
		}
		var specialCharacter = /(?=.*[~`!@#$%^&*()[\]\/\\_\-\+\=|{};:"'<,>.?/])/; // Removing single quote
		if (val.match(specialCharacter)) {
			setValidations((prev) => ({ ...prev, oneSpecialCharacter: true }))
		} else {
			setValidations((prev) => ({ ...prev, oneSpecialCharacter: false }))
		}
		if (validation.eightCharValidations === false || validation.oneCapital === false || validation.oneLower === false || validation.oneNumber === false || validation.oneSpecialCharacter === false) {
			setIsPasswordBlack(true);
		} else {
			setIsPasswordBlack(false);
		}
	}

	return (
		<>
			{contextHolder}
			<Spin fullscreen spinning={loading} />
			<div className='absolute left-0 w-full h-full'>
				<div
					className="flex justify-start items-center h-[100%]"
				>
					<div
						className="w-full  md:w-[50%] lg:w-[35%] h-[100%] bg-[#E5E5E5] flex flex-col gap-1 justify-center items-center px-10"
					>
						<div className="flex flex-col justify-center items-center gap-5">
							<Image src={logo} alt="logo" />
							<p className="text-[#0B132B] text-2xl font-dm-sans font-medium leading-normal">
								Change Password
							</p>
						</div>
						<div className="flex flex-col gap-8 w-full">
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-10">
									<div className="flex flex-col gap-6">
										<div className="flex flex-col gap-5">
											<div className="flex flex-col gap-2">
												<label className="text-[#06152B] font-dm-sans text-base font-medium leading-normal">
													Password
												</label>
												<div className="flex gap-2 bg-[#F1F4FA] rounded-lg pr-4 relative">
													<input
														name='password'
														onBlur={(e) => {
															setPasswordValidations(e.target.value as string)
														}}
														onFocus={(e) => {
															setPasswordValidations(e.target.value as string)
														}}
														onKeyUp={(e) => {
															//@ts-ignore
															setPasswordValidations(e.target.value as string)
														}}
														type={showPassword ? "text" : "password"}
														placeholder=""
														className="bg-[#F1F4FA] p-4 rounded-lg border-nonde outline-none h-50px w-full"
													/>
													<Image
														src={showPassword ? hidePasswordIcon : showPasswordIcon}
														alt="pass"
														className="cursor-pointer w-5"
														onClick={() => setShowPassword(!showPassword)}
													/>
													{
														isPasswordBlack &&
														<div id="pswd_info" className='shadow-md rounded-lg'>
															<h4> Password must be at least:</h4>
															<ul className="pswd_info_ul">
																<li id="length" className={`${validation.eightCharValidations ? "valid" : "invalid"}`}>
																	Min 8 characters.
																</li>
															</ul>
															{/* <h4> and contain at least:</h4> */}
															<ul className="pswd_info_ul">
																<li id="lower" className={`${validation.oneLower ? "valid" : "invalid"}`}>Includes at least 1 lowercase.</li>
																<li id="capital" className={`${validation.oneCapital ? "valid" : "invalid"}`}>Includes at least 1 Uppercase.</li>
																<li id="number" className={`${validation.oneNumber ? "valid" : "invalid"}`}>Includes at least 1 numbers. </li>
																<li id="character" className={`${validation.oneSpecialCharacter ? "valid" : "invalid"}`}>Includes at least 1 special character. </li>
															</ul>
														</div>
													}
												</div>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-[#06152B] font-dm-sans text-base font-medium leading-normal">
													Confirm Password
												</label>
												<div className="flex gap-2 bg-[#F1F4FA] rounded-lg pr-4">
													<input
														name='confirmpassword'
														type="password"
														placeholder=""
														className="bg-[#F1F4FA] p-4 rounded-lg border-nonde outline-none h-50px w-full"
													/>
												</div>
											</div>
										</div>
									</div>

									<button
										type='submit'
										className="bg-[#0E72B7] rounded-lg py-4 px-4 w-full font-dm-sans text-base font-medium leading-normal text-white"
									>Change Password

									</button>
								</div>
							</form>
						</div>
					</div>

					{/* Side Img */}
					<div
						className="hidden md:flex md:w-[50%] lg:w-[65%] bg-no-repeat bg-cover  flex-col gap-20 items-center justify-center px-40 bg-[#F1F4FA]"
					>
						<div className="flex justify-center items-center w-full">
							<Image src={primaryLogo} alt="logo" />
						</div>
						<div className="flex justify-center items-center w-[300px] md:w-[400] lg:w-[500]">
							<Image src={loginImg1} alt="logo_bg" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Invitation