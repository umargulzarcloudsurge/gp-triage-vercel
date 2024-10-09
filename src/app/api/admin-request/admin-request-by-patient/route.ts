import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		try {
			const result = await useDataverseGet('gp_adminrequests', `$select=_gp_patient_value&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and   ${requestType})&$count=true`);
			if (result.success) {
				const counts = {} as any;
				result.data.value.forEach((item: any) => counts[item["_gp_patient_value@OData.Community.Display.V1.FormattedValue"]] = (counts[item["_gp_patient_value@OData.Community.Display.V1.FormattedValue"]] || 0) + 1);

				const patientNames = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 5);
				const patientCounts = patientNames.map(name => counts[name]);

				return NextResponse.json({ patientNames, patientCounts },
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