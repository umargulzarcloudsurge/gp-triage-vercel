import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_adminrequests', `$select=gp_requesttype&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and  ${requestType})&$count=true`);
		if (result.success) {
			const requestTypeCounts = {} as any;
			const requestTypes = ["Doctor's Letter", 'Question about Medication', 'Something Else', 'Test Results', 'Questions about a Referral', 'Fit (sick) Note'];

			result.data.value.forEach((item: any) => {
				const requestType = item['gp_requesttype@OData.Community.Display.V1.FormattedValue'];
				requestTypeCounts[requestType] = (requestTypeCounts[requestType] || 0) + 1;
			});
			const counts = requestTypes.map(type => requestTypeCounts[type] || 0);
			return NextResponse.json({ counts, requestTypes },
				{
					status: 200
				}
			)
		}
		return NextResponse.json({
			error: { error: message }
		},
			{
				status: 400
			}
		)
	} catch (error: any) {
		return NextResponse.json({
			error: error
		},
			{
				status: 400
			}
		)
	}
}