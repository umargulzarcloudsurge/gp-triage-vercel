import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export const useAxiosAccessTokenDataverse = async () => {
	let data = {
		'grant_type': process.env.NEXT_PUBLIC_GRANT_TYPE,
		'client_id': process.env.NEXT_PUBLIC_CLIENT_ID,
		'client_secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
		'scope': process.env.NEXT_PUBLIC_SCOPE
	};
	console.log(data);
	let config = {
		method: 'post',
		url: process.env.NEXT_PUBLIC_TOKEN_URL,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: data
	};
	try {
		const res = await axios.request(config);
		console.log("access_token", res.data.access_token)
		//return;
		return {
			success: true,
			access_token: res.data.access_token
		}
	} catch (error: any) {
		console.error({ error });
		return {
			success: false,
			message: error.message
		}
	}
}
