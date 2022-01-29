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

function Home() {
	return (
		<div style={styles.content}>
			{/* <div style={styles.placeholder}>Hello ISOTOPE.WORLD !</div> */}
			<div
				style={{
					height: "50vh",
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Swords />
				{/* <ThreeDimModel scale={1} /> */}
			</div>
			<div
				style={{
					backgroundColor: themeColors.background,
					height: "100vh",
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
						marginTop: 50,
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
					The Metaverse Ready 3D NFT PLATFORM
				</div>

				<NavbarLinkItem
					href={
						"/NFTCollection?chain_id=0xa869&token_address=0xbd20048caa54526d9dcfcd135708d15723eda46a"
					}
					label={"Explore Swordium 3D NFT Collection"}
				/>
			</div>
		</div>
	);
}

export default Home;
