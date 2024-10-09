"use client";

import { Pagination, Select, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { AdminRequest, AdminRequestDataRecord, AdminRequestValues } from '../types/AdminRequest';
import Image from 'next/image';
import tickIcon from '../../../public/images/tick-icon.svg';
import CommonModal from './CommonModal';
import AdminQueriesModalContent from './AdminQueriesModalContent';
import { useRouter } from "next/navigation"
import { message } from 'antd';
import { updateStatusServerAction } from '../_actions/AdminQueriesServerAction';
import { adminQueryDataServerAction, updateisReadServerAction } from '../_actions/AdminQueryDataServerAction';
import axios from 'axios';
import { adminAssignedToAction } from '../_actions/AdminAssignedToAction';
import { adminQueriesFilterAction } from '../_actions/AdminQueriesFilterAction';

type AdminRequestTableProps = {
	adminRequests: AdminRequest,
	isServer: boolean,
	isSearch: boolean,
	query: string
}
type IState = {
	selectedRowKeys: [],
	modalContent: AdminRequestDataRecord,
	modalOpen: boolean,
	isLoading: boolean,
	currentPageNumber: number,
	selectedPageNumber: number
	isChange: boolean,
	adminRequests: AdminRequest,
	isServer: boolean,
	selectedFilter: string
}
let nextLink = "";
const AdminRequestTable = ({ adminRequests, isServer, isSearch, query }: AdminRequestTableProps) => {
	// debugger
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();
	const [state, setState] = useState<IState>(
		{
			modalOpen: false,
			isChange: false,
			isLoading: false,
			currentPageNumber: 1,
			selectedPageNumber: 1,
			adminRequests: structuredClone(adminRequests),
			isServer: isServer,
			selectedFilter: ""
		} as IState);
	if (!nextLink) {
		if (state.adminRequests["@odata.nextLink"]) {
			nextLink = state.adminRequests["@odata.nextLink"]
		}
	}
	if (isSearch) {
		if (state.adminRequests["@odata.nextLink"]) {
			nextLink = state.adminRequests["@odata.nextLink"]
		}
	}
	const onSelectChange = (newSelectedRowKeys: any) => {
		setState((prev) => (
			{
				...prev,
				selectedRowKeys: newSelectedRowKeys
			}
		)
		);
	};

	useEffect(() => {
		if (state.isServer) {
			setState((prev) => ({ ...prev, adminRequests: structuredClone(adminRequests) }))
		}
	}, [state.isServer])

	const getAdminRequest = (isAssignedTo = -1) => {
		(async () => {
			//debugger
			if (state.isChange) {
				debugger
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
						setState((prev) => ({ ...prev, adminRequests: data.data, isLoading: false }))
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
	}
	useEffect(() => {
		getAdminRequest();
	}, [state.selectedPageNumber])
	const rowSelection = {
		selectedRowKeys: state.selectedRowKeys,
		onChange: onSelectChange,
	};

	const handleCancelModal = () => {
		setState((prev) => (
			{
				...prev,
				modalOpen: false,
			}
		)
		);
	};

	const updateStatus = async (record: AdminRequestDataRecord) => {
		const body = { statecode: record.statuscode === 1 ? 1 : 0 };
		const url = `gp_adminrequests(${record.gp_adminrequestid})`;
		setState((prev) => ({ ...prev, isLoading: true }));
		const res = await updateStatusServerAction(body, url);
		setState((prev) => ({ ...prev, isLoading: false }));
		if (res.success) {
			messageApi.open({
				type: 'success',
				content: 'Status Updated Successfully',
			});
			router.refresh();
			return;
		}
		messageApi.open({
			type: 'error',
			content: 'An Error occured while updating status',
		});
	}

	// Table Column Names
	const columns = [
		{
			title: "ID",
			dataIndex: "gp_id",
			render: (text: any, record: AdminRequestDataRecord) => {
				return (<>
					<p
						onClick={() => {
							(async () => {
								setState((prev) => ({
									...prev,
									isLoading: true
								}))
								const updateIsReadPromise = new Promise(async (res, rej) => {
									if (record.gp_isread === false) {
										const { success, data, message } = await updateisReadServerAction(record.gp_adminrequestid);
										if (success) {
											return res({ isRead: true, isAlreadyDone: false });
										}
										return rej(message);
									}
									res({ isAlreadyDone: true })
								})
								const modalDataPromise = new Promise(async (res, rej) => {
									const { success, data, message } = await adminQueryDataServerAction(record.gp_adminrequestid);
									if (success) {
										return res({ modalContent: true, data: data });
									}
									return rej(message);
								})

								const promisAll = await Promise.all([updateIsReadPromise, modalDataPromise]) as any;
								if (promisAll[1].modalContent === true) {
									if (promisAll[0].isAlreadyDone === false) {
										const index = state.adminRequests.value.indexOf(record);
										state.adminRequests.value[index].gp_isread = true;
									}
									setState((prev) => (
										{
											...prev,
											modalOpen: true,
											modalContent: promisAll[1].data,
											isLoading: false,
											adminRequests: structuredClone(state.adminRequests)
										}
									)
									);
									return;
								}
								setState((prev) => (
									{
										...prev,
										isLoading: false
									}
								))


							})()
						}}
						className="cursor-pointer text-[#0E72B7] text-sm leading-normal font-dm-sans">
						{text}
					</p >
				</>)
			},
		},
		{
			title: "Task Name",
			dataIndex: "gp_requesttype@OData.Community.Display.V1.FormattedValue",
			render: (text: any, record: any) => {
				return (<>
					<p
						className="text-[#515b6b] text-sm leading-normal font-dm-sans">
						{text}
					</p>
				</>)
			},
		},
		{
			title: "Start Date",
			dataIndex: "createdon@OData.Community.Display.V1.FormattedValue",
			render: (text: any, record: any) => (
				<p className="text-[#FC8D71] text-sm leading-normal font-dm-sans">
					{text}
				</p>
			),
		},
		{
			title: "Patient",
			dataIndex: "_gp_patient_value@OData.Community.Display.V1.FormattedValue",
			render: (text: any, record: any) => (
				<p className="text-[#515b6b] text-sm leading-normal font-dm-sans">
					{text}
				</p>
			),
		},
		{
			title: "Assigned To",
			dataIndex: "gp_assignto@OData.Community.Display.V1.FormattedValue",
			render: (text: any, record: any) => (
				<Select onChange={async (e) => {
					const body = { gp_assignto: e };
					const url = `gp_adminrequests(${record.gp_adminrequestid})`;
					try {
						setState((prev) => ({ ...prev, isLoading: true }));
						const res = await adminAssignedToAction(body, url)
						setState((prev) => ({ ...prev, isLoading: false, isChange: true }));
						setTimeout(() => {
							getAdminRequest();
						}, 0)
						message.success("Assigned to updated successfuly")
						// debugger
					} catch (e) {
						// debugger
						setState((prev) => ({ ...prev, isLoading: false }));
						message.error("An error while updating record");
					}
				}}
					style={{ width: "70%" }} value={text}>
					<Select.Option value="1">Pharmacy</Select.Option>
					<Select.Option value="2">Reception</Select.Option>
					<Select.Option value="3">Secretaries</Select.Option>
					<Select.Option value="4">Practice Mangement</Select.Option>
					<Select.Option value="5">Nursing</Select.Option>
					<Select.Option value="6">PA</Select.Option>
					<Select.Option value="7">GP</Select.Option>
				</Select>
			),
		},
		{
			title: "Status",
			dataIndex: "statuscode@OData.Community.Display.V1.FormattedValue",
			render: (text: any, record: any) => (
				<button
					className={`py-[6px] px-3 rounded-lg ${text === "In-Progress" ? "bg-[#0E72B7]" : "bg-[#9BD4E3]"
						} ${text === "In-Progress" ? "text-white" : "text-[#0B132B]"
						} text-sm leading-normal`}>
					{
						text === "In-Progress" ? "Pending" : "Done"
					}
				</button>
			),
		},
		{
			title: "Actions",
			render: (text: any, record: any) => (
				<div className="flex gap-5 items-center">
					<Image src={tickIcon}
						alt="edit" className="cursor-pointer"
						onClick={() => {
							updateStatus(record)
						}}
					/>

				</div>
			),
		},
	];

	return (
		<>
			{contextHolder}
			<Spin spinning={state.isLoading} fullscreen />
			<div style={{ alignSelf: "end", width: "250px", display: "flex", justifyContent: 'center', alignItems: "center", gap: "5px" }}>
				<p style={{ width: "80px", fontWeight: "600", fontSize: "14px" }}>Filter By</p>
				<Select onChange={async (e) => {
					try {
						let params = new URLSearchParams(query);
						let filter = params.get("$filter");
						let updatedFilter = `(${filter} and gp_assignto eq ${parseInt(e)})`;
						params.set("$filter", updatedFilter);
						const q = params.toString();
						setState((prev) => ({ ...prev, isLoading: true, selectedFilter: e }));
						const res = await adminQueriesFilterAction(q);
						setState((prev) => ({ ...prev, isLoading: false, adminRequests: structuredClone(res.data) }))
					} catch (error) {
					}
				}}
					style={{ width: "80%", alignSelf: "end" }} value={state.selectedFilter}>
					<Select.Option value="1">Pharmacy</Select.Option>
					<Select.Option value="2">Reception</Select.Option>
					<Select.Option value="3">Secretaries</Select.Option>
					<Select.Option value="4">Practice Mangement</Select.Option>
					<Select.Option value="5">Nursing</Select.Option>
					<Select.Option value="6">PA</Select.Option>
					<Select.Option value="7">GP</Select.Option>
				</Select>
			</div>

			<Table
				rowSelection={rowSelection}
				columns={columns}
				pagination={false}
				dataSource={state.adminRequests.value}
				className="whiteHeader"
				rowClassName={(record: AdminRequestDataRecord, index: number) => {
					return record.gp_isread ? "" : "font-bold bg-gray-100";
				}}
			/>
			<Pagination onChange={(e) => {
				setState((prev) => (
					{
						...prev,
						selectedPageNumber: e,
						isChange: true
					}))
			}}
				defaultCurrent={1}
				total={state.adminRequests["@odata.count"] as number} />
			{
				!(state.isLoading) &&
				<CommonModal
					title={state.modalContent && state.modalContent['gp_requesttype@OData.Community.Display.V1.FormattedValue']}
					isModalOpen={state.modalOpen}
					handleCancel={handleCancelModal}>
					{
						<AdminQueriesModalContent
							modalContent={{ ...state.modalContent }}
							handleCancelModal={handleCancelModal}
						/>
					}
				</CommonModal>
			}
		</>
	)
}

export default AdminRequestTable