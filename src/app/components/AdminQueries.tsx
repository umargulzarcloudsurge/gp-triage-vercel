import React from 'react'
import AdminRequestTable from './AdminRequestTable'
import { useDataverseGet } from '../hooks/useDataerse';
import { AdminRequest } from '../types/AdminRequest';
import { getAccountId } from '../util/Helper';
import SearchComponent from './SearchComponent';

const AdminQueriesComponent = async ({ search }: { search: string }) => {
	let pendingQuery = '';
	let completedQuery = '';
	let isSearch = false;
	const requestType = [
		{
			name: "Doctor's Letter",
			value: 0
		},
		{
			name: "Fit (sick) Note",
			value: 1
		},
		{
			name: "Questions about a Referral",
			value: 2
		},
		{
			name: "Question about Medication",
			value: 3
		},
		{
			name: "Test Results",
			value: 4
		},
		{
			name: "Something Else",
			value: 5
		}
	];

	const textBasedRequestType = requestType.find(i => i.name.toLowerCase().includes(search.toLowerCase()));
	let intRequestType: number | null = null;
	if (textBasedRequestType) {
		intRequestType = textBasedRequestType.value;
	}
	if (search) {
		isSearch = true;
		search = search.replace("'", "''")
		pendingQuery = `$select=gp_isread,gp_assignto,createdon,gp_id,_gp_patient_value,gp_requesttype,statuscode&$filter=((contains(gp_id,'${search}') or gp_requesttype eq ${intRequestType} or contains(gp_Patient/gp_fullname,'${search}')) and (_gp_gp_value eq ${getAccountId()} and statecode eq 0))`;
		completedQuery = `$select=gp_isread,gp_assignto,createdon,gp_id,_gp_patient_value,gp_requesttype,statuscode&$filter=((contains(gp_id,'${search}') or gp_requesttype eq ${intRequestType} or contains(gp_Patient/gp_fullname,'${search}')) and (_gp_gp_value eq ${getAccountId()} and statecode eq 1))`;
	} else {
		pendingQuery = '$select=gp_isread,gp_assignto,createdon,gp_id,_gp_patient_value,gp_requesttype,statuscode&$filter=(_gp_gp_value eq ' + getAccountId() + ' and statuscode eq 1)';
		completedQuery = '$select=gp_isread,gp_assignto,createdon,gp_id,_gp_patient_value,gp_requesttype,statuscode&$filter=(_gp_gp_value eq ' + getAccountId() + ' and statuscode eq 2)';
	}
	const promisePendingQueries = new Promise(async (res, rej) => {
		const { success, data, message } = await useDataverseGet('gp_adminrequests', pendingQuery, true,);
		if (success) {
			res(data);
			return;
		}
		rej({ message });
	});
	const promiseCompletedQueries = new Promise(async (res, rej) => {
		const { success, data, message } = await useDataverseGet('gp_adminrequests', completedQuery, true);
		if (success) {
			res(data);
			return;
		}
		rej({ message });
	});
	const result = await Promise.allSettled([promisePendingQueries, promiseCompletedQueries]) as any;
	return (
		<>
			<div
				className="p-8 pt-7 flex flex-col gap-12 bg-[#f1f4fa] bg-no-repeat bg-cover">
				<div className="flex justify-between md:flex-row flex-col items-center gap-6">
					{/* Header */}
					<p className="text-[#06152B] font-dm-sans md:text-lg text-sm font-bold leading-normal">
						Administrative Queries
					</p>
					<SearchComponent placeholder='Search' />
				</div>
				<div className='lg:w-[100%]'>
					<div className="flex flex-col gap-4">
						{/* Todo Table */}
						<div className="p-6 rounded-[15px] bg-white flex flex-col gap-10 overflow-hidden overflow-x-hidden">
							<div className="flex justify-between items-center gap-6">
								<p className="text-[#0B132B] text-base font-medium leading-normal">
									To Do{" "}
								</p>
							</div>
							{
								result[0].status === 'rejected' &&
								<></>
							}
							{
								result[0].status === 'fulfilled' &&
								<AdminRequestTable
									isSearch={isSearch}
									adminRequests={structuredClone(result[0].value) as AdminRequest}
									isServer={true}
									key={Math.random()}
									query={pendingQuery}
								/>
							}
						</div>
						{/* Completed Table */}
						<div className="p-8 rounded-[15px] bg-[#FCFDFE] flex flex-col gap-10 overflow-hidden overflow-x-hidden">
							<div className="flex justify-between items-center gap-6">
								<p className="text-[#0B132B] text-base font-medium leading-normal">
									Completed{" "}
								</p>
							</div>
							{
								result[1].status === 'rejected' &&
								<></>
							}
							{
								result[1].status === 'fulfilled' &&
								<AdminRequestTable
									isSearch={isSearch}
									adminRequests={structuredClone(result[1].value) as AdminRequest}
									isServer={true}
									key={Math.random()}
									query={completedQuery}
								/>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminQueriesComponent