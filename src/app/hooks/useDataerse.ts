import axiosClient from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAxiosAccessTokenDataverse } from "./useAxiosAccessTokenDataverse";


const getAxiosHeaders = (isPagination: boolean = false, pageSize: number = 10) => {
	if (isPagination) {
		return `odata.maxpagesize=${pageSize},odata.include-annotations="*"`;
	}
	return `odata.include-annotations="OData.Community.Display.V1.FormattedValue,Microsoft.Dynamics.CRM.totalrecordcount"`;
}


const instance = axiosClient.create({
	baseURL: process.env.NEXT_PUBLIC_DATAVERSE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=utf-8",
		"Prefer": `odata.include-annotations="OData.Community.Display.V1.FormattedValue,Microsoft.Dynamics.CRM.totalrecordcount"`
	},
});

const paginateInstance = axiosClient.create({
	baseURL: process.env.NEXT_PUBLIC_DATAVERSE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=utf-8",
		"Prefer": `odata.maxpagesize=10,odata.include-annotations="*",Microsoft.Dynamics.CRM.totalrecordcount`
	},
});

export const useDataverseGetAsUrl = async (url: string) => {
	const { success, access_token, message } = await useAxiosAccessTokenDataverse();
	if (success) {
		paginateInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.Authorization = `Bearer ${access_token}`;
			return config;
		});
		const data = await paginateInstance.get(url);
		return {
			success: true,
			data: data.data
		}
	}
	return {
		success: false,
		message: message
	}
}

export const useDataverseGet = async (entity: string, selectQuery: string | null, isPagination = false) => {
	const res = await useAxiosAccessTokenDataverse();
	if (res.success) {
		instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.Authorization = `Bearer ${res.access_token}`;
			return config;
		});
		paginateInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.Authorization = `Bearer ${res.access_token}`;
			return config;
		});
		try {
			if (isPagination) {
				const data = await paginateInstance.get(`${entity}?${selectQuery}&$count=true`);
				return {
					success: true,
					data: data.data
				}
			}
			const data = await instance.get(`${entity}?${selectQuery}`);
			return {
				success: true,
				data: data.data
			}
		} catch (error: any) {
			console.error(error);
			return {
				success: false,
				message: error.error
			}
		}
	}
	return {
		success: false,
		message: "unable to authorize please contact administrator"
	}
}

export const useDataversePost = async (entity: string, data: object) => {
	const res = await useAxiosAccessTokenDataverse();
	if (res.success) {
		instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.Authorization = `Bearer ${res.access_token}`;
			return config;
		});
		try {
			const res = await instance.post(entity, data);
			return {
				success: true,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				message: error.message
			}
		}
	}
	return {
		success: false,
		message: "unable to authorize please contact administrator"
	}
}

export const useDataversePatch = async (entity: string, data: Record<string, any>) => {
	const res = await useAxiosAccessTokenDataverse();
	console.log("access token", res)
	if (res.success) {
		instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			config.headers.Authorization = `Bearer ${res.access_token}`;
			return config;
		});
		try {
			const res = await instance.patch(entity, data);
			return {
				success: true,
				data: res.data
			}
		} catch (error: any) {
			return {
				success: false,
				message: error.message
			}
		}

	}
	return {
		success: false,
		message: "unable to authorize please contact administrator"
	}
}