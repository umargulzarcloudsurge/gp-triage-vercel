"use server";

import { useDataversePatch } from "../hooks/useDataerse";

export const updateCommentsOnAdminQueries = async (body: Record<string, any>, id: string) => {
	const { success, data, message } = await useDataversePatch(`gp_adminrequests(${id})`, body);
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