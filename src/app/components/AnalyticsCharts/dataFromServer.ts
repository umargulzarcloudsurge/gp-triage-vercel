"use client";

import { ChartDataByOverTheTime, ChartDataByPatientName, ChartDataByRequestStatus, ChartDataByRequestType, ChartDataByStatusReasons } from "@/app/_actions/AnalyticsAdminRequestQuery";

export const getStatusReasonCharts = async (startDate: string, endDate: string, requestType: string | null) => {
	try {
		const { data, message, success } = await ChartDataByStatusReasons(startDate, endDate, requestType) as { success: boolean, data: any, message: string };
		return { data, success, message };
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}
export const getRequestTypeCharts = async (startDate: string, endDate: string, requestType: string | null) => {
	try {
		const { data, message, success } = await ChartDataByRequestType(startDate, endDate, requestType) as { success: boolean, data: any, message: string };
		return { data, success, message };
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}

export const getRequestByStatusCharts = async (startDate: string, endDate: string, requestType: string) => {
	try {
		const { data, message, success } = await ChartDataByRequestStatus(startDate, endDate, requestType) as { success: boolean, data: any, message: string };
		return { data, success, message };
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}

export const getRequestByPatientName = async (startDate: string, endDate: string, requestType: string | null) => {
	try {
		const { data, success, message } = await ChartDataByPatientName(startDate, endDate, requestType) as { success: boolean, data: any, message: string };
		return { data, success, message };
	} catch (error: any) {
		return { success: false, message: error.message };
	}
}

export const getOverTheTime = async (requestType: string | null) => {
	try {
		const result = await ChartDataByOverTheTime(requestType) as { success: boolean, data: any, message: string };
		return { overTheTime: { data: result.data, success: true } };
	} catch (error: any) {
		return {
			overTheTime: {
				success: false,
				message: error.message
			}
		};
	}
}