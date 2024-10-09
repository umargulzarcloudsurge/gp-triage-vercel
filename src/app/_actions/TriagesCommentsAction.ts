"use server";

import { useDataversePatch } from "../hooks/useDataerse";

export const updateCommentsOnTriages = async (body: Record<string, any>, id: string) => {
	const { success, data, message } = await useDataversePatch(`gp_bookingsummaries(${id})`, body);
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