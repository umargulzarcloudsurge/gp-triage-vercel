import { useDataverseGet, useDataversePatch } from '@/app/hooks/useDataerse';
import { authentication, random } from '@/app/util/Helper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next/dist/lib/load-custom-routes';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
	try {
		const body = await req.json();
		const salt = random();

		const password = authentication(salt, body.password);

		const dataverseData = {
			"gp_password": password,
			"gp_passwordsalt": salt
		};
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const res = await useDataversePatch("contacts(" + body.contactid + ")", dataverseData)
		console.log({ res });
		return NextResponse.json({
			result: res
		},
			{
				status: 201
			}
		)
	} catch (error) {
		return NextResponse.json({
			error: error
		},
			{
				status: 400
			}
		)
	}

}

