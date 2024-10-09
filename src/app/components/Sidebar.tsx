"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../sidebar.module.css';
// import { deleteAccountId, deleteContactId, getUserFullNameOnClient } from '../util/Helper';
import { DeleteCookiesContactAndAccount } from '../_actions/DeleteCookiesServerAction';
import { getHospitalName, getUserFullName } from '../util/Helper';
import { Button, Modal } from 'antd';




const Sidebar = ({ children }: any) => {
	const pathname = usePathname();
	const [userName, setUserName] = useState<string>("");
	const [hospitalName, setHospitalName] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();



	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		await DeleteCookiesContactAndAccount();
		signOut();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};





	useEffect(() => {
		(async () => {
			const name = await getUserFullName() as string
			const hName = await getHospitalName() as string
			setUserName(name)
			setHospitalName(hName);
		})()
	}, [])






	return (
		<>
			<Modal className='bg-white h-32 logoutModal' title="Confirmation" open={isModalOpen} onCancel={handleCancel} footer={(_, { OkBtn, CancelBtn }) => (
				<>
					<CancelBtn />
					<Button className='bg-[#0E72B7] text-white' onClick={handleOk} >Confirm</Button>
				</>
			)} >
				<p>Are you sure you want to log out?</p>
			</Modal>
			<div className='flex z-10'>
				<div className='fixed md:w-[240px] w-[80px] h-screen bg-[#E5E5E5]  '>

					<div className='pt-6 md:flex md:justify-center  hidden' >

						<Image src='/images/logo.png' alt="Logo" width={74} height={73} />
					</div>
					<div className='pt-6 ps-5  md:hidden ' >

						<Image src='/images/logo.png' alt="Logo" width={50} height={50} />
					</div>
					<div className="flex flex-col items-start">
						<Link href='/'
							className='md:mt-5 sm:mt-9 mt-11'>
							<div className='flex justify-center items-center cursor-pointer'>

								<div className={pathname === '/' ? styles.iconActive : styles.iconnonActive}>

									<svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#8C929B" className={pathname === '/' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>
								</div>

								<p className='ps-4 md:block hidden'>
									<span className={pathname === '/' ? styles.active : styles.nonActive}>Dashboard</span>
								</p>
							</div>
						</Link>

						<Link href='/analytics' className='md:mt-5 mt-8'>
							<div className='flex justify-center items-center cursor-pointer'>
								<div className={pathname === '/analytics' ? styles.iconActive : styles.iconnonActive}>
									{/* <RxDashboard size={30} className='text-blue-600  ps-3' /> */}
									<svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M5.33 0H14.669C18.07 0 19.99 1.929 20 5.33V14.67C20 18.07 18.07 20 14.669 20H5.33C1.929 20 0 18.07 0 14.67V5.33C0 1.929 1.929 0 5.33 0ZM10.049 15.86C10.48 15.86 10.839 15.54 10.879 15.11V4.92C10.919 4.61 10.77 4.299 10.5 4.13C10.219 3.96 9.879 3.96 9.61 4.13C9.339 4.299 9.19 4.61 9.219 4.92V15.11C9.27 15.54 9.629 15.86 10.049 15.86ZM14.65 15.86C15.07 15.86 15.429 15.54 15.48 15.11V11.83C15.509 11.509 15.36 11.21 15.089 11.04C14.82 10.87 14.48 10.87 14.2 11.04C13.929 11.21 13.78 11.509 13.82 11.83V15.11C13.86 15.54 14.219 15.86 14.65 15.86ZM6.219 15.11C6.179 15.54 5.82 15.86 5.389 15.86C4.959 15.86 4.599 15.54 4.56 15.11V8.2C4.53 7.889 4.679 7.58 4.95 7.41C5.219 7.24 5.56 7.24 5.83 7.41C6.099 7.58 6.25 7.889 6.219 8.2V15.11Z" fill="#8C929B" className={pathname === '/analytics' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>
								</div>
								<p className='ps-4 md:block hidden'>
									<span className={pathname === '/analytics' ? styles.active : styles.nonActive}>Analytics</span>
								</p>
							</div>
						</Link>


						<Link href='/triages'
							className='md:mt-6 mt-8'
						>
							<div className='flex justify-center items-center cursor-pointer'>

								<div className={pathname === '/triages' ? styles.iconActive : styles.iconnonActive}>

									<svg width="20" height="20" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M19.7872 6.53905C19.6518 6.67058 19.4681 6.74574 19.2747 6.74574C18.559 6.74574 17.9787 7.30945 17.9787 7.9953C17.9787 8.68585 18.5522 9.24674 19.2611 9.25426C19.6605 9.25802 20 9.5286 20 9.91662V12.3265C20 14.3549 18.3075 16 16.2186 16H13.0658C12.7398 16 12.4758 15.7435 12.4758 15.4269V13.3975C12.4758 13.0029 12.1567 12.6929 11.7505 12.6929C11.354 12.6929 11.0251 13.0029 11.0251 13.3975V15.4269C11.0251 15.7435 10.7611 16 10.4362 16H3.78143C1.70213 16 0 14.3558 0 12.3265V9.91662C0 9.5286 0.339458 9.25802 0.738878 9.25426C1.44874 9.24674 2.02128 8.68585 2.02128 7.9953C2.02128 7.32824 1.46035 6.8209 0.725339 6.8209C0.531915 6.8209 0.348162 6.74574 0.212766 6.61421C0.0773694 6.48268 0 6.30417 0 6.11627V3.68291C0 1.65731 1.706 0 3.7911 0H10.4362C10.7611 0 11.0251 0.256489 11.0251 0.573106V2.97827C11.0251 3.36348 11.354 3.68291 11.7505 3.68291C12.1567 3.68291 12.4758 3.36348 12.4758 2.97827V0.573106C12.4758 0.256489 12.7398 0 13.0658 0H16.2186C18.3075 0 20 1.64416 20 3.67352V6.0411C20 6.22901 19.9226 6.40752 19.7872 6.53905ZM11.7505 10.8702C12.1567 10.8702 12.4758 10.5508 12.4758 10.1656V6.40752C12.4758 6.02231 12.1567 5.70288 11.7505 5.70288C11.354 5.70288 11.0251 6.02231 11.0251 6.40752V10.1656C11.0251 10.5508 11.354 10.8702 11.7505 10.8702Z" fill="#8C929B" className={pathname === '/triages' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>

								</div>

								<p className='ps-4 md:block hidden'>

									<span className={pathname === '/triages' ? styles.active : styles.nonActive}>Triages</span>
								</p>
							</div>
						</Link>
						<Link href='/calender' className='md:mt-6 mt-8'>
							<div className='flex justify-center items-center cursor-pointer'>
								<div className={pathname === '/calender' ? styles.iconActive : styles.iconnonActive}>
									<svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M13.4109 0.768617L13.4119 1.51824C16.1665 1.73413 17.9862 3.61119 17.9891 6.48975L18 14.9155C18.0039 18.054 16.0322 19.985 12.8718 19.99L5.15188 20C2.01119 20.004 0.0148166 18.027 0.0108673 14.8795L6.64975e-06 6.55272C-0.00394266 3.65517 1.75153 1.78311 4.50617 1.53024L4.50518 0.780611C4.5042 0.340832 4.83001 0.00999726 5.26444 0.00999726C5.69886 0.00899776 6.02468 0.338833 6.02567 0.778612L6.02666 1.47826L11.8914 1.47027L11.8904 0.770616C11.8894 0.330837 12.2152 0.00100176 12.6497 2.26549e-06C13.0742 -0.000997234 13.4099 0.328838 13.4109 0.768617ZM1.52148 6.86157L16.4696 6.84158V6.49175C16.4272 4.34283 15.349 3.21539 13.4138 3.04748L13.4148 3.81709C13.4148 4.24688 13.0801 4.5877 12.6556 4.5877C12.2212 4.5887 11.8943 4.24887 11.8943 3.81909L11.8934 3.00949L6.02863 3.01749L6.02962 3.82609C6.02962 4.25687 5.70479 4.5967 5.27036 4.5967C4.83594 4.5977 4.50913 4.25887 4.50913 3.82809L4.50815 3.05847C2.58286 3.25137 1.51753 4.38281 1.52049 6.55072L1.52148 6.86157ZM12.2399 11.4043V11.4153C12.2498 11.8751 12.625 12.2239 13.0801 12.2139C13.5244 12.2029 13.8789 11.8221 13.869 11.3623C13.8483 10.9225 13.4918 10.5637 13.0485 10.5647C12.5944 10.5747 12.2389 10.9445 12.2399 11.4043ZM13.0554 15.892C12.6013 15.882 12.235 15.5032 12.234 15.0435C12.2241 14.5837 12.5884 14.2029 13.0426 14.1919H13.0525C13.5165 14.1919 13.8927 14.5707 13.8927 15.0405C13.8937 15.5102 13.5185 15.891 13.0554 15.892ZM8.17212 11.4203C8.19187 11.8801 8.56804 12.2389 9.02221 12.2189C9.46651 12.1979 9.82096 11.8181 9.80121 11.3583C9.79035 10.9085 9.42504 10.5587 8.98074 10.5597C8.52657 10.5797 8.17113 10.9605 8.17212 11.4203ZM9.02616 15.8471C8.57199 15.8671 8.1968 15.5082 8.17607 15.0485C8.17607 14.5887 8.53052 14.2089 8.98469 14.1879C9.42899 14.1869 9.79529 14.5367 9.80516 14.9855C9.82589 15.4463 9.47046 15.8261 9.02616 15.8471ZM4.10433 11.4553C4.12408 11.915 4.50025 12.2749 4.95442 12.2539C5.39872 12.2339 5.75317 11.8531 5.73243 11.3933C5.72256 10.9435 5.35725 10.5937 4.91196 10.5947C4.45779 10.6147 4.10334 10.9955 4.10433 11.4553ZM4.95837 15.8521C4.5042 15.8731 4.12901 15.5132 4.10828 15.0535C4.10729 14.5937 4.46273 14.2129 4.9169 14.1929C5.3612 14.1919 5.7275 14.5417 5.73737 14.9915C5.7581 15.4513 5.40365 15.8321 4.95837 15.8521Z" fill="#8C929B" className={pathname === '/calender' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>
								</div>
								<p className='ps-4 md:block hidden'>
									<span className={pathname === '/calender' ? styles.active : styles.nonActive}>Calendar</span>
								</p>
							</div>
						</Link>
						<Link href='/admin-queries' className='md:mt-6 mt-8'>
							<div className='flex justify-center items-center cursor-pointer'>
								<div className={pathname === '/admin-queries' ? styles.iconActive : styles.iconnonActive}>
									<svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M4.81 0H13.191C16.28 0 18 1.78 18 4.83V15.16C18 18.26 16.28 20 13.191 20H4.81C1.77 20 0 18.26 0 15.16V4.83C0 1.78 1.77 0 4.81 0ZM5.08 4.66V4.65H8.069C8.5 4.65 8.85 5 8.85 5.429C8.85 5.87 8.5 6.22 8.069 6.22H5.08C4.649 6.22 4.3 5.87 4.3 5.44C4.3 5.01 4.649 4.66 5.08 4.66ZM5.08 10.74H12.92C13.35 10.74 13.7 10.39 13.7 9.96C13.7 9.53 13.35 9.179 12.92 9.179H5.08C4.649 9.179 4.3 9.53 4.3 9.96C4.3 10.39 4.649 10.74 5.08 10.74ZM5.08 15.31H12.92C13.319 15.27 13.62 14.929 13.62 14.53C13.62 14.12 13.319 13.78 12.92 13.74H5.08C4.78 13.71 4.49 13.85 4.33 14.11C4.17 14.36 4.17 14.69 4.33 14.95C4.49 15.2 4.78 15.35 5.08 15.31Z" fill="#8C929B" className={pathname === '/admin-queries' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>
								</div>
								<p className='ps-4 md:block hidden'>
									<span className={pathname === '/admin-queries' ? styles.active : styles.nonActive}>Admin Queries</span>
								</p>
							</div>
						</Link>
						<Link href='/request-support' className='md:mt-6 mt-7'>
							<div className='flex justify-center items-center cursor-pointer'>
								<div className={pathname === '/request-support' ? styles.iconActive : styles.iconnonActive}>
									<svg width="20" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M17.9023 11.58C18.26 11.77 18.536 12.07 18.7301 12.37C19.1083 12.99 19.0776 13.75 18.7097 14.42L17.9943 15.62C17.6162 16.26 16.911 16.66 16.1855 16.66C15.8278 16.66 15.4292 16.56 15.1022 16.36C14.8365 16.19 14.5299 16.13 14.2029 16.13C13.1911 16.13 12.3429 16.96 12.3122 17.95C12.3122 19.1 11.372 20 10.1968 20H8.80692C7.62145 20 6.68125 19.1 6.68125 17.95C6.66081 16.96 5.81259 16.13 4.80085 16.13C4.46361 16.13 4.15702 16.19 3.90153 16.36C3.5745 16.56 3.16572 16.66 2.81825 16.66C2.08245 16.66 1.37729 16.26 0.99917 15.62L0.29402 14.42C-0.0841044 13.77 -0.104544 12.99 0.273581 12.37C0.437094 12.07 0.743681 11.77 1.09115 11.58C1.37729 11.44 1.56125 11.21 1.73498 10.94C2.24596 10.08 1.93937 8.95 1.07071 8.44C0.0589696 7.87 -0.268057 6.6 0.314459 5.61L0.99917 4.43C1.59191 3.44 2.85913 3.09 3.88109 3.67C4.77019 4.15 5.925 3.83 6.4462 2.98C6.60972 2.7 6.70169 2.4 6.68125 2.1C6.66081 1.71 6.77323 1.34 6.9674 1.04C7.34553 0.42 8.03024 0.02 8.77627 0H10.2172C10.9735 0 11.6582 0.42 12.0363 1.04C12.2203 1.34 12.3429 1.71 12.3122 2.1C12.2918 2.4 12.3838 2.7 12.5473 2.98C13.0685 3.83 14.2233 4.15 15.1226 3.67C16.1344 3.09 17.4118 3.44 17.9943 4.43L18.679 5.61C19.2718 6.6 18.9447 7.87 17.9228 8.44C17.0541 8.95 16.7475 10.08 17.2687 10.94C17.4322 11.21 17.6162 11.44 17.9023 11.58ZM6.60972 10.01C6.60972 11.58 7.9076 12.83 9.51208 12.83C11.1165 12.83 12.3838 11.58 12.3838 10.01C12.3838 8.44 11.1165 7.18 9.51208 7.18C7.9076 7.18 6.60972 8.44 6.60972 10.01Z" fill="#8C929B" className={pathname === '/request-support' ? styles.iconsvgActive : styles.iconnonsvgActive} />
									</svg>
								</div>
								<p className='ps-4 md:block hidden'>
									<span className={pathname === '/request-support' ? styles.active : styles.nonActive}>Request Support</span>
								</p>
							</div>
						</Link>
					</div>
					<div className='absolute bottom-5 ps-6 md:block hidden'>
						<div className='flex items-center'>
							<div className='bg-white items-center rounded-lg'>
								<Image src='/images/profile.png' alt="ProfileIcon" width={40} height={40} />
							</div>
							<div className='flex flex-col ps-2'>
								<p className='text-[15px] font-500'>
									{
										userName
									}
								</p>
								<span className='text-[12px] text-gray-500 '>{hospitalName}</span>
							</div>
							<div className='ps-5 cursor-pointer'>
								<button className='md:mt-6 mt-7' onClick={showModal}>
									<Image src='/images/Logout.svg' width={18} height={18} alt="ProfileIcon" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<main className='md:ml-[240px] ml-[80px] w-full'>{children}</main>
			</div>
		</>
	)
}

export default Sidebar