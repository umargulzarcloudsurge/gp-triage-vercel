import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId, getDaysInYear } from "@/app/util/Helper";
import { NextResponse } from "next/server";


const calculateRecordsByWeek = (data: any) => {
	const recordsByWeek = new Array(53).fill(0);
	data.forEach((item: any) => {
		const createdDate = new Date(item.createdon);
		const weekNumber = getWeekNumber(createdDate);
		recordsByWeek[weekNumber] += 1;
	});
	return recordsByWeek;
}

const getWeekNumber = (date: any) => {
	const startOfYear = new Date(date.getFullYear(), 0, 1) as any;
	const diff = date - startOfYear;
	const oneWeek = 604800000;
	return Math.ceil((diff + startOfYear.getDay() * oneWeek) / oneWeek);
}

export async function POST(req: Request) {
	try {
		const { requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_bookingsummaries', `$select=createdon&$filter=(createdon ge 2023-01-01T00:00:00.000Z and createdon le 2024-12-31T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} and ${requestType})&$count=true`);
		if (result.success) {
			const records = result.data.value as any;
			const monthCounts = {} as any;
			const quarterCounts = {} as any;
			const weekCounts = {} as any;
			const dayCounts = {} as any;

			records.forEach((record: any) => {
				const createdOn = new Date(record.createdon);
				const monthKey = createdOn.toISOString().substr(0, 7);
				const quarterKey = Math.floor((createdOn.getMonth() + 3) / 3);
				const weekKey = createdOn.toISOString().substr(0, 10);
				const dayKey = createdOn.toISOString().substr(0, 10);

				monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
				quarterCounts[quarterKey] = (quarterCounts[quarterKey] || 0) + 1;
				weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;
				dayCounts[dayKey] = (dayCounts[dayKey] || 0) + 1;
			});

			const allMonths = Array.from({ length: 12 }, (_, index) => {
				const monthKey = `${new Date().getFullYear()}-${String(index + 1).padStart(2, '0')}`;
				return monthCounts[monthKey] || 0;
			});

			const allQuarters = Array.from({ length: 4 }, (_, index) => {
				const quarterKey = index + 1;
				return quarterCounts[quarterKey] || 0;
			});

			const allWeeks = calculateRecordsByWeek(records);

			const today = new Date();
			const nextYear = new Date(today.getFullYear() + 1, 0, 1);
			//@ts-ignore
			const numWeeks = Math.floor((nextYear - today) / (7 * 24 * 60 * 60 * 1000));
			const weekLabels = Array.from({ length: numWeeks }, (_, index) => `Week ${index + 1}`);
			const monthslabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			const quaterLabel = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
			const allDays = Array.from({ length: 365 }, (_, index) => {
				const date = new Date(`${new Date().getFullYear()}-01-01T00:00:00Z`);
				date.setDate(date.getDate() + index);
				const dayKey = date.toISOString().substr(0, 10);
				return dayCounts[dayKey] || 0;
			});
			const dayslabel = getDaysInYear();
			return NextResponse.json({
				data: { allMonths, allQuarters, allWeeks, allDays, weekLabels, monthslabel, quaterLabel, dayslabel }
			}, {
				status: 200
			})
		}
		return NextResponse.json({
			message: result.message
		}, {
			status: 400
		})
	} catch (error) {
		return NextResponse.json({
			error: error
		},
			{
				status: 400
			}
		)
	}
}