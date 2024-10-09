import ResetPassword from '@/app/components/ResetPassword'
import ResetPasswordDataverse from '@/app/components/ResetPasswordDataverse'
import React from 'react'

const ResetPasswordPage = ({
	searchParams,
}: {
	searchParams: any;
}) => {
	const contactId = searchParams['conatctid'] as string | undefined;
	const email = searchParams['email'] as string | undefined;
	console.error({ searchParams })
	return (
		<>
			{
				(() => {
					if (!contactId || !email) {
						return (
							<>
								<ResetPassword />
							</>
						)
					}
				})()
			}
			{
				(() => {
					if (contactId || email) {
						const contactId = searchParams['conatctid'] as string
						const email = searchParams['email'] as string
						return (
							<>
								<ResetPasswordDataverse contactid={contactId}
									emailaddress1={email} key={Math.random()} />
							</>
						)
					}
				})()
			}
		</>
	)
}

export default ResetPasswordPage
