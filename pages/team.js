import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import themeColors from "../theme/theme";
import NextLink from "next/link";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";

const TeamMemberIntroduction = ({ photo, name, title, children }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				boxShadow: hovered
					? "6px 6px 12px #d0fff0,-6px -6px 12px #d0fff0"
					: "none",
				padding: 20,
				margin: 10,
				transition: "0.4s",
				flex: 1,
			}}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>
			<div
				style={{
					width: 200,
					height: 200,
					borderRadius: 200,
					overflow: "hidden",
					alignSelf: "center",
					marginBottom: 30,
				}}
			>
				<Image src={photo} alt="photo" width={200} height={200} />
			</div>

			<div
				style={{
					fontSize: 30,
				}}
			>
				{name}
			</div>

			<div
				style={{
					fontSize: 18,
					marginBottom: 4,
				}}
			>
				{title}
			</div>
			<div style={{ fontSize: 16 }}>{children}</div>
		</div>
	);
};

const team = () => {
	return (
		<>
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: 300,
					background:
						"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(208,255,240,1) 51%, rgba(225,235,245,1) 100%)",
					zIndex: 0,
				}}
			></div>

			<div
				style={{
					width: 940,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					zIndex: 1,
				}}
			>
				<div
					style={{
						fontSize: "50px",
						textAlign: "center",
						marginTop: "50px",
						fontWeight: "500",
						// background: "rgb(225,235,245)",
						background:
							"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(208,255,240,1) 51%, rgba(225,235,245,1) 100%)",
					}}
				>
					{/* Thank you so much for interested in Isotope */}
				</div>

				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "row",
						marginTop: 100,
						justifyContent: "space-between",
					}}
				>
					<TeamMemberIntroduction
						photo={"/team/YutingZhong_Photo.jpeg"}
						name={"Yuting Zhong"}
						title={"Founder, CEO, CTO"}
					>
						Hey There! Hope you enjoy our product. I am the main software
						engineer and idea generator in our team. I designed and built the
						entire website as well as the backend services. I also worked with
						our artist Peter using code to create the our first Generative 3D
						Art NFT collection{" "}
						<NextLink href={SWORDIUM_COLLECTION}>Swordium</NextLink>.
					</TeamMemberIntroduction>

					<TeamMemberIntroduction
						photo={"/team/BradleyTian_Photo.jpeg"}
						name={"Bradley Tian"}
						title={"Co-Founder, Marketing Expert"}
					>
						Hello! I am Bradley, a current undergraduate at UC Berkeley studying
						computer science and business administration. I'm interested in
						financial analysis, software development, and decentralized
						technology. At Isotope, I am responsible for developing product
						roadmaps and marketing strategies.
					</TeamMemberIntroduction>
					<TeamMemberIntroduction
						photo={"/team/PeterZheng_Photo.jpeg"}
						name={"Peter Zheng"}
						title={"Co-Founder, Cheif Artist"}
					>
						Hello! I am Peter, a current undergraduate at Rhode Island School of
						Design. At Isotope, I am responsible for creating NFT arts. Check
						out our first Generative 3D Art NFT Collection{" "}
						<NextLink href={SWORDIUM_COLLECTION}>Swordium</NextLink>.
					</TeamMemberIntroduction>
				</div>
			</div>
		</>
	);
};

export default team;
