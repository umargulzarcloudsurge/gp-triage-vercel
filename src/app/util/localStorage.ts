"use client";

export const setAdminRequestByStatus = (val: string = "true") => {
	localStorage.setItem("setAdminRequestByStatus", val);
}
export const getAdminRequestByStatus = () => {
	if (localStorage.getItem("setAdminRequestByStatus") === "true") {
		return true;
	}
	return false;
}

export const setAdminRequestByPatient = (val: string = "true") => {
	localStorage.setItem("AdminRequestByPatient", val);
}
export const getAdminRequestByPatient = () => {
	if (localStorage.getItem("AdminRequestByPatient") === "true") {
		return true;
	}
	return false;
}

export const setAdminRequestByType = (val: string = "true") => {
	localStorage.setItem("AdminRequestByType", val);
}
export const getAdminRequestByType = () => {
	if (localStorage.getItem("AdminRequestByType") === "true") {
		return true;
	}
	return false;
}

export const setAdminRequestByCount = (val: string = "true") => {
	localStorage.setItem("AdminRequestByCount", val);
}
export const getAdminRequestByCount = () => {
	if (localStorage.getItem("AdminRequestByCount") === "true") {
		return true;
	}
	return false;
}

export const setTriageAs = (val: string = "true") => {
	localStorage.setItem("TriageAs", val);
}
export const getTriageAs = () => {
	if (localStorage.getItem("TriageAs") === "true") {
		return true;
	}
	return false;
}

export const setBookingSummaryBySymptoms = (val: string = "true") => {
	localStorage.setItem("BookingSummaryBySymptoms", val);
}
export const getBookingSummaryBySymptoms = () => {
	if (localStorage.getItem("BookingSummaryBySymptoms") === "true") {
		return true;
	}
	return false;
}

export const setBookingSummaryByServiceType = (val: string = "true") => {
	localStorage.setItem("BookingSummaryByServiceType", val);
}
export const getBookingSummaryByServiceType = () => {
	if (localStorage.getItem("BookingSummaryByServiceType") === "true") {
		return true;
	}
	return false;
}

export const setBookingSummaryByAppointmentType = (val: string = "true") => {
	localStorage.setItem("BookingSummaryByAppointmentType", val);
}
export const getBookingSummaryByAppointmentType = () => {
	if (localStorage.getItem("BookingSummaryByAppointmentType") === "true") {
		return true;
	}
	return false;
}
export const setBookingSummaryOverTheTimeChart = (val: string = "true") => {
	localStorage.setItem("BookingSummaryOverTheTimeChart", val);
}
export const getBookingSummaryOverTheTimeChart = () => {
	if (localStorage.getItem("BookingSummaryOverTheTimeChart") === "true") {
		return true;
	}
	return false;
}
