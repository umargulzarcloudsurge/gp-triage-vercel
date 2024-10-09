"use server";

import { useDataversePatch } from "../hooks/useDataerse";

export const updateStatusServerAction = async (body: Record<string, any>, url: string) => {
	const { success, data, message } = await useDataversePatch(url, body);
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