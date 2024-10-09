//"use client";
import React from 'react';
import AdminQueriesComponent from '@/app/components/AdminQueries';
import { random } from '@/app/util/Helper';
const AdminQueries = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const search = searchParams?.search || '' as string;
	return (
		<AdminQueriesComponent search={search} key={`${random()}-admin-queries`} />
	)
}
export default AdminQueries
