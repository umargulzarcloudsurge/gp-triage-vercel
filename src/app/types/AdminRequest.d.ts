export type AdminRequest = {
	'@odata.context': string;
	"@odata.count": number,
	value: AdminRequestDataRecord[];
	"@odata.nextLink": string;
}
export type AdminRequestValues = {
	'@odata.etag': string;
	'createdon@OData.Community.Display.V1.FormattedValue': string;
	createdon: string;
	gp_id: string;
	'_gp_patient_value@OData.Community.Display.V1.FormattedValue': string;
	_gp_patient_value: string;
	'gp_requesttype@OData.Community.Display.V1.FormattedValue'?: string;
	gp_requesttype?: number;
	'statuscode@OData.Community.Display.V1.FormattedValue': string;
	statuscode: number;
	gp_adminrequestid: string;
}

export type AdminRequestDataRecord = {
	'@odata.context': string;
	'@odata.etag': string;
	gp_comments?: any;
	'createdon@OData.Community.Display.V1.FormattedValue': string;
	createdon: string;
	_gp_doctorsletter_value?: any;
	'_gp_fitorsicknote_value@OData.Community.Display.V1.FormattedValue': string;
	_gp_fitorsicknote_value: string;
	gp_id: string;
	_gp_medication_value?: any;
	_gp_other_value?: any;
	'_gp_patient_value@OData.Community.Display.V1.FormattedValue': string;
	_gp_patient_value: string;
	_gp_referral_value?: any;
	'gp_requesttype@OData.Community.Display.V1.FormattedValue': string;
	gp_requesttype: number;
	'statuscode@OData.Community.Display.V1.FormattedValue': string;
	gp_assignto: number;
	statuscode: number;
	_gp_testresult_value?: any;
	gp_adminrequestid: string;
	gp_FitOrSickNote: GpFitOrSickNote;
	gp_DoctorsLetter: GpDoctorsLetter;
	gp_Referral: GPReferral;
	gp_Medication: GPMedication;
	gp_TestResult: GPTestResult;
	gp_Other: GPOther;
	gp_Medication?: any;
	gp_Other?: any;
	gp_Referral?: any;
	gp_TestResult?: any;
	gp_isread: boolean;
}

export type GpFitOrSickNote = {
	'@odata.etag': string;
	'gp_existingnote@OData.Community.Display.V1.FormattedValue': string;
	gp_existingnote: boolean;
	gp_id: string;
	gp_medicalproblem: string;
	gp_returnsoonerdetails: string;
	gp_timeframe: string;
	gp_fitorsicknoteid: string;
}

export type GpDoctorsLetter = {
	'@odata.etag': string;
	gp_id: string;
	gp_requestsummary: string;
	gp_doctorletterid: string;
}
export type GPReferral = {
	'@odata.etag': string;
	gp_id: string;
	gp_reason: string;
	gp_referralassistance: string;
	'gp_referralcategory@OData.Community.Display.V1.FormattedValue': string;
	gp_referralcategory: number;
	gp_whenreferralmade: string;
	gp_referralid: string;
}

export type GPMedication = {
	'@odata.etag': string;
	gp_details: string;
	gp_id: string;
	gp_medications: string;
	gp_medicationid: string;
}

export type GPTestResult = {
	'@odata.etag': string;
	gp_id: string;
	gp_testlocation: string;
	gp_testtimeframe: string;
	gp_typeoftest: string;
	gp_testresultid: string;
}

export type GPOther = {
	'@odata.etag': string;
	gp_details: string;
	gp_id: string;
	gp_otherid: string;
}