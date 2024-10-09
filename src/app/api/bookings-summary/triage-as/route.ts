import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { endDate, startDate, requestType } = await req.json() as { startDate: String, endDate: string, requestType: string };

		const result = await useDataverseGet('gp_bookingsummaries', `$select=gp_triageas&$filter=(createdon ge ${startDate}T00:00:00.000Z and createdon le ${endDate}T00:00:00.000Z and _gp_gp_value eq ${getAccountId()} and ${requestType})&$count=true`);
		if (result.success) {
			const counts = result.data.value.reduce((acc: any, entry: any) => (acc[entry["gp_triageas@OData.Community.Display.V1.FormattedValue"]]++, acc), { "Semi-Urgent": 0, "Urgent": 0, "Non-Urgent": 0 });
			const items = [];
			for (const [key, value] of Object.entries(counts)) {
				const item = { itemStyle: { color: "" } } as { value: number, name: string, itemStyle: { color: string } };
				item.name = key;
				item.value = value as number;
				switch (key) {
					case "Semi-Urgent":
						item.itemStyle.color = '#f28b70';
						break;
					case 'Urgent':
						item.itemStyle.color = '#108dff';
						break;
					case 'Non-Urgent':
						item.itemStyle.color = '#9bd4e3';
						break;
				}
				items.push(item);
			}
			return NextResponse.json({
				data: items
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