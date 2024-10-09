"use server";

import crypto from "crypto";
import dayjs from "dayjs";
import { cookies } from 'next/headers'
import { useDataverseGet } from "../hooks/useDataerse";

export const authentication = (salt: string, password: string) => {
	return crypto.createHmac("sha256", [salt, password].join('/')).update('secret').digest("hex");
}

export const random = () => crypto.randomBytes(128).toString("base64");

export const getContactId = () => {
	const cookieStore = cookies()
	return cookieStore.get("contact_id")?.value
}

export const setContactId = (contactId: string) => {
	cookies().set('contact_id', contactId, {
		maxAge: 7 * 24 * 60 * 60, // 7 days,
		httpOnly: true
	});
}

export const deleteContactId = () => {
	cookies().delete("contact_id");
}

export const getAccountId = () => {
	const cookieStore = cookies()
	return cookieStore.get("account_id")?.value
}

export const setAccountId = (accountId: string) => {
	cookies().set('account_id', accountId, {
		maxAge: 7 * 24 * 60 * 60, // 7 days,
		httpOnly: true
	})
}

export const deleteAccountId = () => {
	cookies().delete("account_id");
}

export const getUserDateTime = () => {
	"use client";
	const year = dayjs().get('year');
	const month = dayjs().get('month') + 1 > 9 ? dayjs().get('month') : `0${dayjs().get('month') + 1}`;
	const date = dayjs().get('date') + 1 > 9 ? dayjs().get('date') : `0${dayjs().get('date') + 1}`;
	//year-month-day
	return `${year}-${month}-${date}`
}
export const firstDayOfTheMonth = () => {
	"use client";
	return new Promise((res, rej) => {
		const date = new Date();
		const year = date.getFullYear();
		let month = String(date.getMonth() + 1);
		month = month.length === 1 ? `0${month}` : month;
		res(`${year}-${month}-${'01'}`);
	})
}

export const lastDayOfTheMonth = () => {
	"use client";
	return new Promise((res, rej) => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		} as any;
		const dateArr = new Date(year, month + 1, 0)
			.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
			.split("/");
		const dateStr = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
		res(dateStr);
	})
}


const getOrdinalSuffix = (dayOfMonth: any) => {
	if (dayOfMonth >= 11 && dayOfMonth <= 13) {
		return 'th';
	}
	switch (dayOfMonth % 10) {
		case 1: return "st";
		case 2: return "nd";
		case 3: return "rd";
		default: return "th";
	}
}

export const getDaysInYear = () => {
	"use client";
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const daysInYear = [];

	for (let i = 0; i < 12; i++) {
		const daysInMonth = new Date(2024, i + 1, 0).getDate(); // Get the number of days in the current month
		const monthDays = [];

		for (let j = 1; j <= daysInMonth; j++) {
			const date = new Date(2024, i, j);
			const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
			const dayOfMonth = j;
			const month = months[i];
			const formattedDate = `${dayName} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${month}`;
			monthDays.push(formattedDate);
		}

		daysInYear.push(monthDays);
	}

	const days = [] as Array<string>;
	daysInYear.forEach((item: Array<string>) => {
		item.forEach((day: string) => {
			days.push(day);
		})
	})

	return days;
}

export const setUserFullName = (name: string) => {
	cookies().set('user_full_name', name, {
		maxAge: 7 * 24 * 60 * 60, // 7 days,
		httpOnly: true
	});
}

export const getUserFullName = () => {
	return new Promise((res, rej) => {
		const cookieStore = cookies()
		res(cookieStore.get("user_full_name")?.value)
	})
}

export const setHospitalName = (name: string) => {
	cookies().set('hospital_name', name, {
		maxAge: 7 * 24 * 60 * 60, // 7 days,
		httpOnly: true
	});
}

export const getHospitalName = async () => {
	return new Promise((res, rej) => {
		const cookieStore = cookies()
		res(cookieStore.get("hospital_name")?.value)
	})

}

export const removeHospitalName = () => {
	cookies().delete("hospital_name");
}

export const removeUserFullName = () => {
	cookies().delete("user_full_name");
}

export const getShortMonthNames = (startDate: Date, endDate: Date): Record<string, any> => {
	const months: Record<string, any> = {};
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const shortMonthName = currentDate.toLocaleString('default', { month: 'short' });
		months[shortMonthName] = 0;
		//months.push({ [shortMonthName]: 0 });
		currentDate.setMonth(currentDate.getMonth() + 1);
	}
	return months;
}

export const getCalenderBooking = async (date: string, operator: string = "ge") => {
	const { success, data, message } = await useDataverseGet('gp_bookingsummaries', `$select=gp_appointmenttypetext,_gp_patient_value,gp_slotstart&$filter=gp_slotstart ${operator} ${date}T00:00:00.000Z &$orderby=gp_slotstart asc`);
	return { success, data, message };
}

export const getCalenderBookingBasedOndate = async (date: string) => {
	const { success, data, message } = await useDataverseGet('gp_bookingsummaries', `$select=gp_appointmenttypetext,_gp_patient_value,gp_slotstart&$filter=Microsoft.Dynamics.CRM.On(PropertyName='gp_slotstart',PropertyValue='${date}') &$orderby=gp_slotstart  asc `, true);
	console.log("booking data ", data)
	return { success, data, message };
	//?$filter=Microsoft.Dynamics.CRM.On(PropertyName='gp_slotstart',PropertyValue='2023-09-01')
}

export const isPageNumber = (pageNumberToCheck: number, currentPageNumber: number) => {
	return new Promise((res, rej) => {
		if (pageNumberToCheck === currentPageNumber - 1) {
			return res("previous");
		} else if (pageNumberToCheck === currentPageNumber + 1) {
			return res("next");
		} else {
			return rej("not_relevant");
		}
	})
}

