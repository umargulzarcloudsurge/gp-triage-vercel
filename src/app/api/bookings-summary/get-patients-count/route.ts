import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_bookingsummaries', `$select=_gp_patient_value&$filter=(createdon ge ${startDate}T00:00:00.000Z and createdon le ${endDate}T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} and ${requestType})&$count=true`);
		if (result.success) {
			let distinctPatients = new Set();
			result.data.value.forEach((patient: any) => {
				distinctPatients.add(patient["_gp_patient_value@OData.Community.Display.V1.FormattedValue"]);
			});
			console.log("Distinct number of patients:", distinctPatients.size);
			return NextResponse.json({
				data: distinctPatients.size
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