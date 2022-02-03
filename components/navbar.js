import React from "react";
import Box from "@mui/material/Box";
import themeColors from "../theme/theme";
import Logo from "./logo";
import Account from "./Account";
import Chains from "./Chains";
import NextLink from "next/link";
import { useState } from "react";
import { SiDiscord } from "react-icons/si";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";

const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		fontFamily: "Roboto, sans-serif",
		color: "#041836",
		marginTop: "10px",
		padding: "10px",
		height: "100%",
	},
	header: {
		position: "fixed",
		zIndex: 1,
		width: "100%",
		// height: "80px",
		// background: "#fff",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "Roboto, sans-serif",
		// borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
		padding: "10px",
		// boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
		// boxShadow:
		// 	"6px 6px 14px 0 rgba(0, 0, 0, 0.2),-8px -8px 18px 0 rgba(255, 255, 255, 0.55)",
		backgroundColor: themeColors.background,
		// border: "1px solid black",
	},
	headerRight: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		fontSize: "15px",
		fontWeight: "600",
	},
	neu: {
		background: "transparent",
		boxShadow:
			"6px 6px 14px 0 rgba(0, 0, 0, 0.2),-8px -8px 18px 0 rgba(255, 255, 255, 0.55)",
		borderRadius: "40px",
		padding: "4px 30px 20px",
		minHeight: "380px",
	},
};

const NavbarLinkItem = ({ href, label }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<>
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
							? "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff"
							: "none",
						cursor: "pointer",
						color: themeColors.foreground,
						transitionDuration: "0.4s",
						fontFamily: "'Oxanium', cursive",
						fontSize: 18,
					}}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
				>
					{label}
				</div>
			</NextLink>
		</>
	);
};

const DiscordJoinButton = () => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<a
			href={"https://discord.gg/hM8g6jjddv"}
			target={"_blank"}
			rel={"noopener noreferrer"}
		>
			<div
				style={{
					width: 120,
					height: 38,
					color: "white",
					fontSize: "1.4rem",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: themeColors.foreground,
					justifyContent: "center",
					borderRadius: 10,
					boxShadow: hovered
						? "rgb(232 65 65) 2px 2px 30px, rgb(232 65 65) -2px -2px 30px"
						: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
					transition: "0.4s",
					cursor: "pointer",
				}}
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}
			>
				<SiDiscord style={{ marginBottom: 4, marginRight: 12 }} />
				<div
					style={{
						color: "white",
						fontSize: "1rem",
						fontFamily: "'Oxanium', cursive",
					}}
				>
					JOIN US
				</div>
			</div>
		</a>
	);
};

export default function navbar({ path }) {
	return (
		<Box style={styles.header}>
			<Logo />

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 10,
					marginLeft: "auto",
					marginRight: "50px",
					// backgroundColor: "red",
					alignItems: "center",
				}}
			>
				<DiscordJoinButton />
				{/* <NavbarLinkItem href="/" label="Home" /> */}
				{/* <NavbarLinkItem
					href="/NFTCollection?chain_id=0xa869&token_address=0xbd20048caa54526d9dcfcd135708d15723eda46a"
					label="Swordium"
				/> */}

				<NavbarLinkItem href={SWORDIUM_COLLECTION} label="Swordium" />
				<NavbarLinkItem href="/team" label="Team" />
				<NavbarLinkItem href="/contact" label="Contact" />
			</div>

			<div style={styles.headerRight}>
				{/* <Chains /> */}
				{/* <NativeBalance /> */}
				<Account />
			</div>
		</Box>
	);
}
