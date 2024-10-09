import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_adminrequests', `$select=_gp_patient_value&$filter=(_gp_gp_value eq ${getAccountId()} and createdon le ${endDate}T00:00:00.000Z and createdon ge ${startDate}T00:00:00.000Z and   ${requestType})&$count=true`);
		if (result.success) {
			return NextResponse.json({
				data: result.data
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