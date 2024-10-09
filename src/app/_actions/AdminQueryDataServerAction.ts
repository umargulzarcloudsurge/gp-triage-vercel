"use server";

import { useDataverseGet, useDataversePatch } from "../hooks/useDataerse";

export const adminQueryDataServerAction = async (id: string) => {
	const { success, data, message } = await useDataverseGet(`gp_adminrequests(${id})`, "$select=gp_comments,createdon,_gp_doctorsletter_value,_gp_fitorsicknote_value,gp_id,_gp_medication_value,_gp_other_value,_gp_patient_value,_gp_referral_value,gp_requesttype,statuscode,_gp_testresult_value&$expand=gp_DoctorsLetter($select=gp_id,gp_requestsummary),gp_FitOrSickNote($select=gp_existingnote,gp_id,gp_medicalproblem,gp_returnsoonerdetails,gp_timeframe),gp_Medication($select=gp_details,gp_id,gp_medications),gp_Other($select=gp_details,gp_id),gp_Referral($select=gp_id,gp_reason,gp_referralassistance,gp_referralcategory,gp_whenreferralmade),gp_TestResult($select=gp_id,gp_testlocation,gp_testtimeframe,gp_typeoftest)");
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
export const updateisReadServerAction = async (id: string) => {
	const { success, data, message } = await useDataversePatch(`gp_adminrequests(${id})`, { "gp_isread": true });
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
export const updateisReadServerActionTriage = async (id: string) => {
	const { success, data, message } = await useDataversePatch(`gp_bookingsummaries(${id})`, { "gp_isread": true });
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
