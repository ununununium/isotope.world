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
import { MdGeneratingTokens } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import { BsFillSafeFill } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";
import { GiImperialCrown } from "react-icons/gi";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";

const styles = {
	content: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
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
			<div style={{ height: 80, overflow: "hidden" }}>
				<Icon style={{ width: 70, height: 70 }} />
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
					height: "125.7px",
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
						href={SWORDIUM_COLLECTION}
						label={"Explore Swordium 3D NFT Collection"}
					/>
				</div>
			</div>

			<div
				style={{
					// height: "calc(100vh - 100px)",
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
					Our Primary Objectives
				</div>

				<div
					style={{
						width: "940px",
						display: "flex",
						flexDirection: "row",

						gap: 20,
						flexWrap: "wrap",
						marginTop: 20,
						paddingBottom: 20,
					}}
				>
					<IntroductionCard
						Icon={MdGeneratingTokens}
						title={"Tokenization Service"}
						text={
							"Provide streamlined uploading, minting, listing services for content creators. Getting your products on-chain is just a few clicks away."
						}
					/>
					<IntroductionCard
						Icon={StorefrontIcon}
						title={"NFT Marketplace"}
						text={
							"Develop a user-friendly marketplace for creators and customers to trade digital asset collections. Trading made easy without the jargon!"
						}
					/>
					<IntroductionCard
						Icon={BsFillSafeFill}
						title={"Secure Showcase"}
						text={
							"Provide creators with a secure platform to reveal their initial designs to the world. No more copyright infringement or stolen content."
						}
					/>
				</div>
			</div>
			<div
				style={{
					// height: "calc(100vh - 100px)",
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
						marginTop: 100,
					}}
					id="introduction"
				>
					Key Features
				</div>

				<div
					style={{
						width: "940px",
						display: "flex",
						flexDirection: "row",
						gap: 20,
						flexWrap: "wrap",
						marginTop: 10,
						paddingBottom: 20,
					}}
				>
					<IntroductionCard
						Icon={ThreeDRotationIcon}
						title={"3D NFTs"}
						text={
							"We provide state-of-art 3D NFT viewing and interacting user experience."
						}
					/>

					<IntroductionCard
						Icon={PublicIcon}
						title={"Metaverse Ready"}
						text={
							"Your 3D NFTs are ready for metaverse from the moment of creation. Raw model file access will be granted for owners to exhibit across different metaverses."
						}
					/>

					<IntroductionCard
						Icon={({ style }) => (
							<Image
								width={70}
								height={70}
								style={style}
								src={require("/assets/logos/avalanche-avax.svg")}
								alt=""
							/>
						)}
						title={"Mint on Avalanche"}
						text={
							<div>
								{
									"NFTs will be minted on Avalanche Chain for the sake of high transaction speed, low costs, and eco-friendliness."
								}{" "}
								<a
									href={"https://www.avax.network/"}
									target="_blank"
									rel={"noopener noreferrer"}
								>
									<br /> Learn more about Avalanche
								</a>
							</div>
						}
					/>

					<IntroductionCard
						Icon={({ style }) => (
							<Image
								width={175}
								height={70}
								style={style}
								src={require("/assets/logos/IPFS_logo.png")}
								alt=""
							/>
						)}
						title={"Distributed Data Storage"}
						text={
							<div>
								{
									"NFT data will be stored on IPFS for the sake of immutability, efficiency and permanency."
								}{" "}
								<br />
								<a
									href={"https://ipfs.io/"}
									target="_blank"
									rel={"noopener noreferrer"}
								>
									{" "}
									Learn more about IPFS
								</a>
							</div>
						}
					/>

					<IntroductionCard
						Icon={MdCloudUpload}
						title={"Create NFTs for Free"}
						text={
							"Creating and hosting your pre-minted NFTs on our platform is completely free."
						}
					/>

					<IntroductionCard
						Icon={GiImperialCrown}
						title={"Eternal Royalty Fee"}
						text={
							"When transaction happened, a designated percentage of the transaction amount will be rewarded back to the NFT creator."
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
							First generative 3D Model NFT collection created by Isotope.world.
							This collection contains 10,000 unique collectible swords. Stay
							tune for miniting.
						</div>

						<NavbarLinkItem
							href={SWORDIUM_COLLECTION}
							label={"Explore Swordium 3D NFT Collection"}
						/>
					</div>

					<div style={{ width: "100%", height: "80vh" }}>
						<Swords amount={1} indicies={[6]} />
					</div>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
}

export default Home;
