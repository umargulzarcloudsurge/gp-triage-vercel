"use client"
import React, { FormEvent, FormEventHandler, useState } from 'react';
import logo from "../../../public/images/logo.svg";
import loginBg from "../../../public/images/login-bg.svg";
import loginImg1 from "../../../public/images/login-img-1.png";
import primaryLogo from "../../../public/images/primary-logo.svg";
import showPasswordIcon from "../../../public/images/show-password-icon.svg";
import hidePasswordIcon from "../../../public/images/hide-password-icon.svg";
import { Checkbox, Spin } from 'antd';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import Link from 'next/link';


const LoginComponent = () => {
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.target as HTMLFormElement);
		const res = await signIn('credentials', {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		});
		setLoading(false);
		if (res?.ok == true) {
			messageApi.open({
				type: 'success',
				content: 'Login Successfully',
			});
			router.push('/');
			return;
		}
		messageApi.open({
			type: 'error',
			content: 'Invalid username or password',
		});
	}
	return (
		<>
			{contextHolder}
			<Spin spinning={isLoading} fullscreen />
			<div className='absolute left-0 w-full h-full'>
				<div
					className="flex justify-start items-center h-full"
				>
					{/* Login Fields */}
					<div
						className="w-full  md:w-[50%] lg:w-[35%] bg-[#E5E5E5] flex flex-col gap-1 justify-center items-center px-10 h-full"
					>
						<div className="flex flex-col justify-center items-center gap-5">
							<Image src={logo} alt="logo" />
							<p className="text-[#0B132B] text-2xl font-dm-sans font-medium leading-normal">
								Log in
							</p>
						</div>
						<div className="flex flex-col gap-8 w-full">
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-10">
									<div className="flex flex-col gap-6">
										<div className="flex flex-col gap-5">
											<div className="flex flex-col gap-2">
												<label className="text-[#06152B] font-dm-sans text-base font-medium leading-normal">
													Email Address
												</label>
												<input
													//defaultValue={window.location.href.includes('localhost') ? 'api@testing.com' : ''}
													defaultValue={''}
													name='email'
													type="email"
													placeholder="example@gmail.com"
													className="bg-[#F1F4FA] p-4 rounded-lg border-nonde outline-none h-50px w-full"
												/>

											</div>
											<div className="flex flex-col gap-2">
												<label className="text-[#06152B] font-dm-sans text-base font-medium leading-normal">
													Password
												</label>
												<div className="flex gap-2 bg-[#F1F4FA] rounded-lg pr-4">
													<input

														//defaultValue={window.location.href.includes('localhost') ? '123' : ''}
														defaultValue={''}
														name='password'
														type={showPassword ? "text" : "password"}
														placeholder="*****"
														className="bg-[#F1F4FA] p-4 rounded-lg border-nonde outline-none h-50px w-full"
													/>
													<Image
														src={showPassword ? hidePasswordIcon : showPasswordIcon}
														alt="pass"
														className="cursor-pointer w-5"
														onClick={() => setShowPassword(!showPassword)}
													/>
												</div>
											</div>
										</div>
										<div className="flex gap-6 justify-between items-center">
											<Checkbox
												className="text-[#06152B] text-sm font-dm-sans leading-normal"

											>
												Remember me
											</Checkbox>
											<p className="cursor-pointer text-[#FC8D71] text-sm font-dm-sans leading-normal">
												<Link href={'/reset-password'}>
													Reset Password?
												</Link>
											</p>
										</div>
									</div>
									<button
										className="bg-[#0E72B7] rounded-lg py-4 px-4 w-full font-dm-sans text-base font-medium leading-normal text-white"
									>Log in

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
							<Image src={primaryLogo} alt="logo" className='' />
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

export default LoginComponent