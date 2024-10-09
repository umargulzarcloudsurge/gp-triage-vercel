import RequestSupport from '@/app/components/RequestSupport'
import { User } from '@/app/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'

const RequestSupportPage = async () => {

	const session = await getServerSession();
	const user = session?.user as User;

	return (
		<>
			<RequestSupport user={user} />
		</>
	)
}

export default RequestSupportPage