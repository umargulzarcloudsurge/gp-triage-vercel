export type TriageType = {
  [x: string]: any;
  '@odata.etag': string;
  gp_id: string;
  'gp_slotstart@OData.Community.Display.V1.FormattedValue': string;
  gp_slotstart: string;
  gp_symptoms: string;
  'gp_triageas@OData.Community.Display.V1.FormattedValue': string;
  gp_triageas: number;
  gp_bookingsummaryid: string;
  gp_Patient: GpPatient;
}
export type GpPatient = {
  'gp_birthday@OData.Community.Display.V1.FormattedValue': string;
  gp_birthday: string;
  gp_fullname: string;
  gp_patientid: string;
}



export type TriageModelDataType = {
  '@odata.context': string;
  '@odata.etag': string;
  gp_appointmenttypetext: string;
  gp_appointmenttype: number;
  gp_comments?: any;
  'createdon@OData.Community.Display.V1.FormattedValue': string;
  createdon: string;
  gp_id: string;
  '_gp_patient_value@OData.Community.Display.V1.FormattedValue': string;
  _gp_patient_value: string;
  gp_servicetype: string;
  'gp_slotend@OData.Community.Display.V1.FormattedValue': string;
  gp_slotend: string;
  'gp_slotstart@OData.Community.Display.V1.FormattedValue': string;
  gp_slotstart: string;
  gp_symptoms: string;
  'gp_triageas@OData.Community.Display.V1.FormattedValue': string;
  gp_triageas: number;
  gp_triagesummary: string;
  gp_bookingsummaryid: string;
  gp_isread: boolean;
  gp_Patient: GpPatientModel;
}
export type GpPatientModel = {
  '@odata.etag': string;
  'gp_birthday@OData.Community.Display.V1.FormattedValue': string;
  gp_birthday: string;
  gp_fullname: string;
  gp_patientid: string;
}