import React from "react";
import Box from "@mui/material/Box";
import themeColors from "../theme/theme";
import Logo from "./logo";
import Account from "./Account";
import Chains from "./Chains";
import NextLink from "next/link";
import { useState } from "react";

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
				}}
			>
				<NavbarLinkItem href="/" label="Home" />
				<NavbarLinkItem href="/swordium" label="Swordium" />

				<NavbarLinkItem href="/about" label="About" />
			</div>

			<div style={styles.headerRight}>
				{/* <Chains /> */}
				{/* <NativeBalance /> */}
				<Account />
			</div>
		</Box>
	);
}
