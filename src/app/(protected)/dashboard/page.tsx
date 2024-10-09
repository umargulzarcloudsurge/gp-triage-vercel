import React from 'react'
import Dashboard from '@/app/components/Dashboard';
import { firstDayOfTheMonth, lastDayOfTheMonth } from '@/app/util/Helper';

const DashboardPage = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	let startDate = searchParams?.startDate || '' as string;
	let endDate = searchParams?.endDate || '' as string;
	if (!startDate || !endDate) {
		startDate = await firstDayOfTheMonth() as string;
		endDate = await lastDayOfTheMonth() as string;
	}
	return (
		<Dashboard startDate={startDate} endDate={endDate} />
	)
}
export default DashboardPage