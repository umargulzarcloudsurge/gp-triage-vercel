"use server";

import { useDataverseGet } from "../hooks/useDataerse";

export const TriageIndividualRecord = async (id: string) => {
	const { success, data, message } = await useDataverseGet(`gp_bookingsummaries(${id})`, "$select=gp_appointmenttype,gp_comments,createdon,gp_id,_gp_patient_value,gp_servicetype,gp_slotend,gp_slotstart,gp_symptoms,gp_triageas,gp_triagesummary,gp_appointmenttypetext&$expand=gp_Patient($select=gp_birthday,gp_fullname)");
	if (success) {
		return {
			success: true,
			data: data
		}
	}
	return {
		success: false,
		message
	}
}
