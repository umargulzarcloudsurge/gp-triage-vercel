export type BooingSummaries = {
	'@odata.context': string;
	value: BookingSummariesValues[];
}
export type BookingSummariesValues = {
	'@odata.etag': string;
	// 'gp_appointmenttype@OData.Community.Display.V1.FormattedValue': string;
	// gp_appointmenttype: number;
	'_gp_patient_value@OData.Community.Display.V1.FormattedValue': string;
	_gp_patient_value: string;
	'gp_slotstart@OData.Community.Display.V1.FormattedValue': string;
	gp_slotstart: string;
	gp_bookingsummaryid: string;
	gp_appointmenttypetext: string;
}