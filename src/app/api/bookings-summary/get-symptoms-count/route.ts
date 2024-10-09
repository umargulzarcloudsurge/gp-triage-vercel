import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_bookingsummaries', `$select=gp_symptoms&$filter=(createdon ge ${startDate}T00:00:00.000Z and createdon le ${endDate}T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} and ${requestType})`);
		if (result.success) {
			let distinctsymptoms = new Set();
			result.data.value.forEach((symptom: any) => {
				distinctsymptoms.add(symptom["gp_symptoms"]);
			});
			return NextResponse.json({
				data: distinctsymptoms.size
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