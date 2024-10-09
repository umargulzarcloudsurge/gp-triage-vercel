import { useDataverseGet, useDataverseGetAsUrl, useDataversePatch } from '@/app/hooks/useDataerse';
import { authentication, getCalenderBooking, random } from '@/app/util/Helper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next/dist/lib/load-custom-routes';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
	try {
		const { url } = await req.json();
		const { data, message, success } = await useDataverseGetAsUrl(url);
		if (success) {
			return NextResponse.json({ success, data, message },
				{
					status: 200
				}
			)
		}
		return NextResponse.json(
			{
				data,
				message
			},
			{
				status: 400
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
