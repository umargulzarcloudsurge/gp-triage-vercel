import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId, setAccountId, setContactId, setHospitalName, setUserFullName } from "@/app/util/Helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email } = await req.json() as { email: String };
		const { success, data, message } = await useDataverseGet('contacts',
			"$select=_parentcustomerid_value,jobtitle,fullname,gp_password,gp_passwordsalt&$filter=(emailaddress1 eq '" + email + "')");
		if (success) {
			if (data.value.length > 0) {
				const contact = data.value[0];
				setAccountId(contact._parentcustomerid_value);
				setContactId(contact.contactid);
				setUserFullName(contact.fullname);
				setHospitalName(contact['_parentcustomerid_value@OData.Community.Display.V1.FormattedValue']);
			}
		}
		return NextResponse.json(true, {
			status: 200,
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