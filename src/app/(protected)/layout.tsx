import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import { getServerSession } from 'next-auth';
import SessionProvider from '../../Providers/SessionProvider';
import Sidebar from "../components/Sidebar";
const inter = Inter({ subsets: ["latin"] });
import { redirect } from 'next/navigation';
import { QueryProvider } from "@/Providers/QueryProvider";
import { getAccountId, getContactId, getHospitalName, getUserFullName } from "../util/Helper";
import { setuserDetailsInCookies } from "../_actions/SetUserDetailsAction";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import BotBackground from "../../../public/images/Bot Background.jpg"
import Patient_Logo from "../../../public/images/Patient_Logo.png"
import Logo_1 from "../../../public/images/Logo_1.png"
export const metadata: Metadata = {
	title: "Gp triage",
	description: "Gp triage",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}

	const accountId = getAccountId();
	const contactId = getContactId();
	const userName = getUserFullName();
	const hospistalName = getHospitalName();
	// (async () => {
	// 	// "use server"
	// 	await setuserDetailsInCookies(session.user?.email as string);
	// })()
	if (!accountId || !contactId || !userName || !hospistalName) {
		(() => {
			signOut();
			redirect('/login');
		})()
	}

	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					{/* <Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={BotBackground} fill />
					<Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={Patient_Logo} fill />
					<Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={Logo_1} fill /> */}
					<QueryProvider >
						<SessionProvider session={session}>
							<Sidebar>
								{
									children
								}
							</Sidebar>
						</SessionProvider>
					</QueryProvider>
				</body>
			</html>
		</>
	);
}