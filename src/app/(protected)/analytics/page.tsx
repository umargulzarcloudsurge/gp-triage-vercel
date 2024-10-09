import React from 'react'
import { Tabs } from 'antd';
import AdminRequestAnalytics from '@/app/components/AdminRequestAnalytics';
import { useDataverseGet } from '@/app/hooks/useDataerse';
import { firstDayOfTheMonth, getAccountId, lastDayOfTheMonth } from '@/app/util/Helper';
import BookingSummaryAnalytics from '@/app/components/BookingSummaryAnalytics';
import { color } from 'echarts';

const Analyticspage = async () => {
	const first = await firstDayOfTheMonth() as string;
	const last = await lastDayOfTheMonth() as string;

	return (
		<>
			<Tabs
				defaultActiveKey="1"
				size='large'
				type='card'
				tabBarGutter={10}
				// centered
				style={{ paddingLeft: 32, marginTop: 20, }}
				items={[
					{
						label: 'Admin Request',

						key: '1',
						children: <AdminRequestAnalytics endDate={last} startDate={first} key={Math.random()} />,
					},

					{
						label: 'Booking Summary',
						key: '2',
						children: <BookingSummaryAnalytics endDate={last} startDate={first} />,
					},
				]}
			/>

		</>
	)
}

export default Analyticspage;