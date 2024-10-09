"use server";
import axios from "axios";

export const ResetPasswordAction = async (email: string) => {
	try {
		const { data } = await axios.post(process.env.NEXT_RESET_PASSWORD_FLOW_URL!, { email });
		if (data.status) {
			return {
				success: data.status,
				data,
				status: 200
			}
		}
		return {
			success: false,
			data,
			status: 400
		}
	} catch (error) {
		return {
			success: false,
			message: JSON.stringify(error),
			status: 400
		}
	}
}
