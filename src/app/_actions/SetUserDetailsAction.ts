// "use server";
import { useDataverseGet } from "../hooks/useDataerse";
import { setAccountId, setContactId, setHospitalName, setUserFullName } from "../util/Helper";

export const setuserDetailsInCookies = async (email: string) => {
	const { success, data, message } = await useDataverseGet('contacts',
		"$select=_parentcustomerid_value,jobtitle,fullname,gp_password,gp_passwordsalt&$filter=(emailaddress1 eq '" + email + "')")
	if (success) {
		if (data.value.length > 0) {
			const contact = data.value[0];
			setAccountId(contact._parentcustomerid_value);
			setContactId(contact.contactid);
			setUserFullName(contact.fullname);
			setHospitalName(contact['_parentcustomerid_value@OData.Community.Display.V1.FormattedValue']);
		}
	}
	return {
		success
	}
}
