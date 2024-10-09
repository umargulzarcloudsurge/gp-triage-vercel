"use server";

import { useDataverseGet } from "../hooks/useDataerse";
import { getAccountId, getDaysInYear } from "../util/Helper";

export const ChartDataByStatusReasons = async (startDate: string, endDate: string, requestType: string | null) => {
	return new Promise(async (res, rej) => {
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=statuscode&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and ${requestType})&$count=true`);
			if (result.success) {
				const counts = result.data.value.reduce((acc: any, entry: any) => (acc[entry["statuscode@OData.Community.Display.V1.FormattedValue"]]++, acc), { "In-Progress": 0, "Completed": 0, "Pending": 0, "Cancelled": 0 });
				const items = [];
				for (const [key, value] of Object.entries(counts)) {
					const item = { itemStyle: { color: "" } } as { value: number, name: string, itemStyle: { color: string } };
					item.name = key;
					item.value = value as number;
					switch (key) {
						case "Pending":
							item.itemStyle.color = '#0e72b7';
							break;
						case 'Cancelled':
							item.itemStyle.color = '#108dff';
							break;
						case 'Completed':
							item.itemStyle.color = '#9bd4e3';
							break;
						case "In-Progress":
							item.itemStyle.color = '#f28b70';
							break;
					}
					items.push(item);
				}
				return res({ success: true, data: items });
			}
			return rej({ success: false, message: result.message })
		} catch (error: any) {
			rej({ success: false, message: error })
		}
	})

}

export const ChartDataByRequestType = async (startDate: string, endDate: string, requestType: string | null) => {
	return new Promise(async (res, rej) => {
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=gp_requesttype&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and  ${requestType})&$count=true`);
			if (result.success) {

				const requestTypeCounts = {} as any;
				const requestTypes = ["Doctor's Letter", 'Question about Medication', 'Something Else', 'Test Results', 'Questions about a Referral', 'Fit (sick) Note'];

				result.data.value.forEach((item: any) => {
					const requestType = item['gp_requesttype@OData.Community.Display.V1.FormattedValue'];
					requestTypeCounts[requestType] = (requestTypeCounts[requestType] || 0) + 1;
				});
				const counts = requestTypes.map(type => requestTypeCounts[type] || 0);

				return res({ success: true, data: { counts, requestTypes } });
			}
			return rej({ success: false, message: result.message })
		} catch (error: any) {
			rej({ success: false, message: error })
		}
	})

}

export const ChartDataByRequestStatus = async (startDate: string, endDate: string, requestType: string | null) => {
	return new Promise(async (res, rej) => {
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=statuscode&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and  ${requestType})&$count=true`);
			if (result.success) {
				const counts = result.data.value.reduce((acc: any, entry: any) => (acc[entry["statuscode@OData.Community.Display.V1.FormattedValue"]]++, acc), { "In-Progress": 0, "Completed": 0 });
				const data = [
					{ value: counts["In-Progress"], name: 'In-Progress', itemStyle: { color: '#0e72b7' } },
					{ value: counts["Completed"], name: 'Completed', itemStyle: { color: '#9bd4e3' } },
				]
				return res({ success: true, data: data });
			}
			return rej({ success: false, message: result.message })
		} catch (error: any) {
			rej({ success: false, message: error })
		}
	})
}

export const ChartDataByPatientName = async (startDate: string, endDate: string, requestType: string | null) => {
	return new Promise(async (res, rej) => {
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=_gp_patient_value&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and   ${requestType})&$count=true`);
			if (result.success) {
				const counts = {} as any;
				result.data.value.forEach((item: any) => counts[item["_gp_patient_value@OData.Community.Display.V1.FormattedValue"]] = (counts[item["_gp_patient_value@OData.Community.Display.V1.FormattedValue"]] || 0) + 1);

				const patientNames = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 5);
				const patientCounts = patientNames.map(name => counts[name]);

				return res({ success: true, data: { patientNames, patientCounts } });
			}
			return rej({ success: false, message: result.message })
		} catch (error: any) {
			rej({ success: false, message: error })
		}
	})
}


const calculateRecordsByWeek = (data: any) => {
	const recordsByWeek = new Array(53).fill(0);
	data.forEach((item: any) => {
		const createdDate = new Date(item.createdon);
		const weekNumber = getWeekNumber(createdDate);
		recordsByWeek[weekNumber] += 1;
	});
	return recordsByWeek;
}

function getWeekNumber(date: any) {
	const startOfYear = new Date(date.getFullYear(), 0, 1) as any;
	const diff = date - startOfYear;
	const oneWeek = 604800000;
	return Math.ceil((diff + startOfYear.getDay() * oneWeek) / oneWeek);
}

export const ChartDataByOverTheTime = async (requestType: string | null) => {
	return new Promise(async (res, rej) => {
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=createdon&$filter=(_gp_gp_value eq ${getAccountId()} and ${requestType})&$count=true`);
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

				const allDays = Array.from({ length: 365 }, (_, index) => {
					const date = new Date(`${new Date().getFullYear()}-01-01T00:00:00Z`);
					date.setDate(date.getDate() + index);
					const dayKey = date.toISOString().substr(0, 10);
					return dayCounts[dayKey] || 0;
				});
				const today = new Date();
				const nextYear = new Date(today.getFullYear() + 1, 0, 1);
				//@ts-ignore
				const numWeeks = Math.floor((nextYear - today) / (7 * 24 * 60 * 60 * 1000)); 

				const weekLabels = Array.from({ length: numWeeks }, (_, index) => `Week ${index + 1}`);
				const monthslabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				const quaterLabel = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
				const dayslabel = getDaysInYear();
				return res({
					success: true, data:
					{
						allMonths,
						allQuarters,
						allWeeks,
						allDays,
						weekLabels,
						monthslabel,
						quaterLabel,
						dayslabel
					}
				});
			}
			return rej({ success: false, message: result.message })
		} catch (error: any) {
			rej({ success: false, message: error })
		}
	})
}


