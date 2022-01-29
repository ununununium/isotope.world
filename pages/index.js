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
								<Image
									width={80}
									height={80}
									src={require("/assets/avalanche-avax.svg")}
									alt=""
								/>
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
