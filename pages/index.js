import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

// export default function Home() {
// 	return <div className={styles.container}>123</div>;
// }

import React, { useState, useEffect } from "react";
import themeColors from "../theme/theme";
import ThreeDimModel from "../components/ThreeDimModel";
import Swords from "../components/Swords";
import NextLink from "next/link";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import PublicIcon from "@mui/icons-material/Public";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { SiDiscord } from "react-icons/si";

const styles = {
	content: {
		backgroundColor: themeColors.background,
		width: "100%",
		// height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	placeholder: {
		color: themeColors.foreground,
		fontSize: "40px",
		fontWeight: "bold",
	},
	border: {
		position: "absolute",
		background: "none",
		transition: "all 0.5s ease-in-out",
	},
};

const NavbarLinkItem = ({ href, label }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<NextLink href={href}>
			<div
				style={{
					height: "42px",
					padding: "0 15px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "fit-content",
					borderRadius: "12px",
					// backgroundColor: "rgb(244, 244, 244)",
					background: themeColors.background,
					boxShadow: hovered
						? "rgb(232 65 65) 2px 2px 30px, rgb(232 65 65) -2px -2px 30px"
						: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
					cursor: "pointer",
					color: themeColors.background,
					background: themeColors.foreground,
					transitionDuration: "0.4s",
					marginTop: 30,
					fontFamily: "'Oxanium', cursive",
					fontSize: 20,
				}}
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}
			>
				{label}
			</div>
		</NextLink>
	);
};

const IntroductionCard = ({ Icon, title, text }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<div
			style={{
				width: 300,
				height: 300,
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				borderRadius: 10,
				boxShadow: hovered
					? "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff"
					: "none",
				transition: "0.4s",
			}}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>
			<div style={{ width: 100, height: 100, overflow: "hidden" }}>
				<Icon style={{ width: 80, height: 80 }} />
			</div>

			<div
				style={{
					fontFamily: "'Oxanium', cursive",
					fontSize: "1.3rem",
					textAlign: "center",
					marginTop: "20px",
					marginBottom: "10px",
				}}
			>
				{title}
			</div>

			<div
				style={{
					fontFamily: "'Oxanium', cursive",
					fontSize: "1rem",
					textAlign: "left",
				}}
			>
				{text}
			</div>
		</div>
	);
};

function Home() {
	return (
		<div style={styles.content}>
			<div style={{ width: "100%", height: "calc(100vh - 100px)" }}>
				<div
					style={{
						height: "50vh",
						width: "100%",
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Swords
						amount={5}
						indicies={[2, 4, 7, 10, 17]}
						style={{
							background: "rgb(225,235,245)",
							background:
								"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(255,208,208,1) 51%, rgba(225,235,245,1) 100%)",
						}}
					/>
				</div>
				<div
					style={{
						backgroundColor: themeColors.background,
						height: "calc(50vh - 100px)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						style={{
							fontFamily: "'Oxanium', cursive",
							fontSize: 52,
							color: themeColors.foreground,
							marginTop: 30,
						}}
					>
						Welcome To Isotope.World
					</div>

					<div
						style={{
							fontFamily: "'Oxanium', cursive",
							fontSize: 34,
							color: themeColors.foreground,
						}}
					>
						The Almighty NFT Platform
					</div>

					<NavbarLinkItem
						href={
							"/NFTCollection?chain_id=0xa869&token_address=0xbd20048caa54526d9dcfcd135708d15723eda46a"
						}
						label={"Explore Swordium 3D NFT Collection"}
					/>
				</div>

				<div
					style={{
						height: "calc(100vh - 100px)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						background: themeColors.background,
					}}
				>
					<div
						style={{
							fontFamily: "'Oxanium', cursive",
							fontSize: 32,
							color: themeColors.foreground,
							textAlign: "center",
						}}
						id="introduction"
					>
						What is Isotope.World?
					</div>

					<div
						style={{
							width: "940px",
							display: "flex",
							flexDirection: "row",

							gap: 20,
							flexWrap: "wrap",
							marginTop: 20,
						}}
					>
						<IntroductionCard
							Icon={StorefrontIcon}
							title={"NFT Marketplace"}
							text={"A perfect place to mint, buy, sell or bid NFTs."}
						/>

						<IntroductionCard
							Icon={ThreeDRotationIcon}
							title={"3D NFTs"}
							text={
								"We support viewing and interacting with 3D NFTs on our website."
							}
						/>

						<IntroductionCard
							Icon={PublicIcon}
							title={"Metaverse Ready"}
							text={
								"All 3D NFTs will be Metaverse Ready. You will also able to share the same item across different metaverses."
							}
						/>

						<IntroductionCard
							Icon={() => (
								<svg
									width="104"
									height="100"
									viewBox="0 0 1504 1504"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
										fill="#E84142"
									/>
								</svg>
							)}
							title={"Resides on Avalanche"}
							text={
								"Avalanche is featured in high transaction speed, low costs, and eco-friendliness. Every NFT will be deployed on Avalanche."
							}
						/>

						<IntroductionCard
							Icon={MovieFilterIcon}
							title={"Create Your Own NFT"}
							text={
								"You will able to create and mint your own NFT of any content"
							}
						/>

						<IntroductionCard
							Icon={AllInclusiveIcon}
							title={"NFT of All Type"}
							text={
								"We ofcourse support all types of NFTs including 3D models, 2D images, videos, songs etc."
							}
						/>
					</div>
				</div>
				<div
					style={{
						height: "calc(100vh - 100px)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						background: themeColors.background,
					}}
				>
					<div
						style={{
							width: 940,
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div>
							<div
								style={{
									fontFamily: "'Oxanium', cursive",
									fontSize: 52,
									fontWeight: "bold",
									color: themeColors.foreground,
									textAlign: "left",
									width: 570,
								}}
							>
								Swordium
							</div>

							<div
								style={{
									fontFamily: "'Oxanium', cursive",
									fontSize: "1.5rem",
									textAlign: "left",
									color: themeColors.foreground,
									width: 400,
								}}
							>
								First generative 3D Model NFT collection created by
								Isotope.world. This collection contains 10,000 unique
								collectible swords. Stay tune for miniting.
							</div>

							<NavbarLinkItem
								href={
									"/NFTCollection?chain_id=0xa869&token_address=0xbd20048caa54526d9dcfcd135708d15723eda46a"
								}
								label={"Explore Swordium 3D NFT Collection"}
							/>
						</div>

						<div style={{ width: "100%", height: "80vh" }}>
							<Swords amount={1} indicies={[6]} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
