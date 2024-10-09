import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_bookingsummaries', `$select=gp_servicetype&$filter=(createdon ge ${startDate}T00:00:00.000Z and createdon le ${endDate}T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} and ${requestType})`);
		if (result.success) {

			const counts = {} as any;
			result.data.value.forEach((item: any) => counts[item["gp_servicetype"]] = (counts[item["gp_servicetype"]] || 0) + 1);
			const serviceTypes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 5);
			const serviceTypesCounts = serviceTypes.map(name => counts[name]);
			return NextResponse.json({
				data: { serviceTypesCounts, serviceTypes }
			}, {
				status: 200
			})

			// const serviceTypeCounts = {} as any;
			// const serviceTypes = ["Clinical Oncology", 'Question about Medication', 'Something Else', 'Test Results', 'Questions about a Referral', 'Fit (sick) Note'];
			// result.data.value.forEach((item: any) => {
			// 	const requestType = item['gp_servicetype'];
			// 	serviceTypeCounts[requestType] = (serviceTypeCounts[requestType] || 0) + 1;
			// });
			// const counts = serviceTypes.map(type => serviceTypeCounts[type] || 0);
			// return NextResponse.json({
			// 	data: { counts, serviceTypes }
			// }, {
			// 	status: 200
			// })
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