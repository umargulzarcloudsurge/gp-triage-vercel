import Calender from '@/app/components/CalenderComponent'
import { useDataverseGet } from '@/app/hooks/useDataerse'
import { getCalenderBooking, getUserDateTime } from '@/app/util/Helper';
import axios from 'axios';
import React from 'react'

const CalenderPage = async () => {
	const date = getUserDateTime();
	const { data, message, success } = await getCalenderBooking(date);
	return (
		<>
			{
				success === true
				&&
				<Calender booingSummaries={data} key={Math.random()} isServer={true} />
			}
		</>
	)
}

export default CalenderPage