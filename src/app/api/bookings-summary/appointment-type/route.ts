import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";


const getRandomColor = () => {
	const colors = ["#D8EFD3", "#80B9AD", "#80B9AD", "#B7B597", "#FFBF78", "#FFE8C5", "#ECB176", "#A1DD70", "#ACE1AF", "#FFDB5C"];
	return colors[Math.floor(Math.random() * 11)]

}

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };
		const result = await useDataverseGet('gp_bookingsummaries', `$select=gp_appointmenttypetext&$filter=(createdon ge ${startDate}T00:00:00.000Z and createdon le ${endDate}T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} )`);//and ${requestType}
		if (result.success) {
			const transformedData: Record<string, { total: number, color: string }> = {};
			result.data.value.forEach((item: any, index: number) => {
				const attribute = item.gp_appointmenttypetext ? item.gp_appointmenttypetext.replaceAll(" ", "_") : "";
				if (attribute) {
					//if (attribute) {
					if (transformedData[attribute]) {
						transformedData[attribute].total = transformedData[attribute].total + 1;
						//transformedData[attribute].color = transformedData[attribute].total + 1;
						console.log("test", transformedData[attribute], attribute);
					} else {
						transformedData[attribute] = { color: getRandomColor(), total: 1 };
						//transformedData[attribute]= getRandomColor();
					}
					//}
				}
			});
			console.log("transformedData", transformedData)
			// const counts = result.data.value.reduce((acc: any, entry: any) => (acc[entry["gp_appointmenttype@OData.Community.Display.V1.FormattedValue"]]++, acc), { "Telephone": 0, "Video": 0, "In-Person": 0 });
			// const data = [
			// 	{ value: counts["Telephone"], name: 'Telephone', itemStyle: { color: '#0e72b7' } },
			// 	{ value: counts["Video"], name: 'Video', itemStyle: { color: '#9bd4e3' } },
			// 	{ value: counts["In-Person"], name: 'In-Person', itemStyle: { color: '#f28b70' } },
			// ]

			return NextResponse.json({
				data: transformedData
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
		console.error(error)
		return NextResponse.json({
			error: error
		},
			{
				status: 400
			}
		)
	}
}