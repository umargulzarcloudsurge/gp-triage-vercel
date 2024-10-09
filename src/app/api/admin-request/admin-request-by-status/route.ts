import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=statuscode&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and  ${requestType})&$count=true`);
			if (result.success) {
				const counts = result.data.value.reduce((acc: any, entry: any) => (acc[entry["statuscode@OData.Community.Display.V1.FormattedValue"]]++, acc), { "In-Progress": 0, "Completed": 0 });
				const data = [
					{ value: counts["In-Progress"], name: 'In-Progress', itemStyle: { color: '#0e72b7' } },
					{ value: counts["Completed"], name: 'Completed', itemStyle: { color: '#9bd4e3' } },
				]
				return NextResponse.json({
					data
				},
					{
						status: 200
					}
				)
			}
			return NextResponse.json({
				error: { message: result.message }
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