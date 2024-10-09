import Invitation from '@/app/components/Invitation'
import { useDataverseGet } from '@/app/hooks/useDataerse';
import React from 'react'

const InvitationPage = async ({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string };
}) => {
	if (searchParams) {
		const code = searchParams["code"] as string;
		const query = "$select=_adx_invitecontact_value&$expand=adx_inviteContact($select=contactid,emailaddress1)&$filter=adx_invitationcode eq '" + code + "'";
		const result = await useDataverseGet('adx_invitations', query);
		let record = {} as any;
		if (result.success) {
			var { data } = result;
			if (data.value.length === 1) {
				record = data.value[0];
				if (record.adx_inviteContact?.contactid) {
					return (
						<>
							<Invitation
								contactid={record.adx_inviteContact.contactid}
								emailaddress1={record.adx_inviteContact.emailaddress1}
								key="contact_value"
							/>
						</>
					)
				}
			}
		}
	}
}

export default InvitationPage