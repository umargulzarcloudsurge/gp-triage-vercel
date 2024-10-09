import { useDataverseGet, useDataversePatch } from '@/app/hooks/useDataerse';
import { authentication, getCalenderBooking, getCalenderBookingBasedOndate, random } from '@/app/util/Helper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next/dist/lib/load-custom-routes';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
	try {
		const { date, operator } = await req.json();
		const { data, message, success } = await getCalenderBookingBasedOndate(date);
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
