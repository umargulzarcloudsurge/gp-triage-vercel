
import { useDataverseGet } from "@/app/hooks/useDataerse";
import { User } from "@/app/types/user";
import { setAccountId, setContactId, setHospitalName, setUserFullName } from "@/app/util/Helper";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authentication } from "../../../util/Helper";
export const authOptions: AuthOptions = {
	pages: {
		signIn: "/login"
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "text", placeholder: "" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				try {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const { success, data } = await useDataverseGet('contacts',
						"$select=_parentcustomerid_value,jobtitle,fullname,gp_password,gp_passwordsalt&$filter=(emailaddress1 eq '" + credentials?.email + "')")
					if (success) {
						console.log(success, data);
						if (data.value.length > 0) {
							const contact = data.value[0];
							//@ts-ignore
							const expectedHash = authentication(contact.gp_passwordsalt, credentials?.password);
							if (expectedHash === contact.gp_password) {
								setAccountId(contact._parentcustomerid_value);
								setContactId(contact.contactid);
								setUserFullName(contact.fullname);
								setHospitalName(contact['_parentcustomerid_value@OData.Community.Display.V1.FormattedValue'])
								return {
									contactId: contact.contactid,
									email: credentials?.email,
									name: contact.fullname,
									password: "",
									id: contact.contactid,
									_parentcustomerid_value: contact._parentcustomerid_value
								} as User;
							}
						}
						return null
					}
					return null;
				} catch (error) {
					console.error("error login", error)
					return null;
				}
			},
		})
	],
	callbacks: {
		async session({ session, token, user }: any) {
			return session;
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.contactid = (user as User).contactId;
				token.email = (user as User).email;
				token.name = (user as User).name;
			}
			return token;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET
};

