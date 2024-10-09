"use server";

import { useDataversePatch, useDataversePost } from "../hooks/useDataerse";
import { getContactId } from "../util/Helper";

export const requestSupportSubmitAction = async (query: string) => {

	const body = {
		"gp_GPUser@odata.bind": `/contacts(${getContactId()})`,
		"gp_supportmessage": query
	};

	const { success, data, message } = await useDataversePost('gp_supports', body);
	if (success) {
		return {
			success,
			data
		}
	}
	return {
		success,
		message
	}
	// console.log({ message });
}
