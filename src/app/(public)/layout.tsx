import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import BotBackground from "../../../public/images/Bot Background.jpg"
import Patient_Logo from "../../../public/images/Patient_Logo.png"
import Logo_1 from "../../../public/images/Logo_1.png"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gp triage",
	description: "Gp triage",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					{/* <Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={BotBackground} fill />
					<Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={Patient_Logo} fill />
					<Image style={{ display: "none" }} width={500} height={500} alt="Image 1" src={Logo_1} fill /> */}
					{
						children
					}
				</body>
			</html>
		</>
	);
}