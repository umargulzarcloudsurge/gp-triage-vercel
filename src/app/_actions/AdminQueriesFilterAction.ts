"use server";

import { useDataverseGet, useDataversePatch } from "../hooks/useDataerse";

export const adminQueriesFilterAction = async (url: string) => {
	const { success, data, message } = await useDataverseGet('gp_adminrequests', url, true);
	if (success) {
		return {
			success, data
		}
	}
	return {
		success,
		message
	}
} 