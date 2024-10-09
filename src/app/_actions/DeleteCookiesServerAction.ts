"use server";

import { useDataverseGet } from "../hooks/useDataerse";
import { deleteAccountId, deleteContactId, removeHospitalName, removeUserFullName } from "../util/Helper";

export const DeleteCookiesContactAndAccount = async () => {

	return new Promise((res, rej) => {
		try {
			deleteAccountId();
			deleteContactId();
			removeUserFullName();
			removeHospitalName();
			res(true);
		} catch (error) {
			rej(error);
		}
	})

}
