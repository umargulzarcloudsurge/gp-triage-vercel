import BookingSummaryAnalytics from '@/app/components/BookingSummaryAnalytics'
import { firstDayOfTheMonth, lastDayOfTheMonth } from '@/app/util/Helper';
import React from 'react'

const BookingSummary = async () => {

	const first = await firstDayOfTheMonth() as string;
	const last = await lastDayOfTheMonth() as string;

	return (
		<>
			<BookingSummaryAnalytics endDate={last} startDate={first} />
		</>
	)
}

export default BookingSummary