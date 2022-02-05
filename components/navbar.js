import React from "react";

import themeColors from "../theme/theme";
import Logo from "./logo";
import Account from "./Account";
import Chains from "./Chains";
import NextLink from "next/link";
import { useState, useRef } from "react";
import { SiDiscord } from "react-icons/si";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";
import useWindowSize from "../hooks/useWindowSize";
import { GrMenu } from "react-icons/gr";
import useOnClickOutside from "../hooks/useOnClickOutside";

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
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "Roboto, sans-serif",
		padding: "10px",
		backgroundColor: themeColors.background,
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

const NavbarLinkItem = ({ href, label, style, onClick }) => {
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
						...style,
					}}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					onClick={onClick}
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

function Desktop() {
	return (
		<div style={styles.header}>
			<Logo fontSizeHovered={30} fontSize={28} />

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

			<Account />
		</div>
	);
}

function Mobile() {
	const [open, setOpen] = useState(false);
	const ref = useRef();
	useOnClickOutside(ref, () => setOpen(false));

	return (
		<div
			style={{
				position: "fixed",
				zIndex: 2,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				fontFamily: "Roboto, sans-serif",
				backgroundColor: themeColors.background,
				position: "relative",
			}}
		>
			<div
				style={{
					// width: "100%",
					position: "absolute",
					zIndex: 4,
					padding: 10,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: 70,
				}}
			>
				<Logo fontSizeHovered={22} fontSize={20} />
			</div>

			<div
				style={{
					width: "100%",
					padding: 10,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					zIndex: 3,
					height: 70,
					backgroundColor: themeColors.background,
				}}
			>
				<div
					onClick={() => {
						setOpen(!open);
					}}
				>
					<GrMenu style={{ width: 30, height: 30 }} />
				</div>

				<Account />
			</div>

			<div
				style={{
					position: "absolute",
					paddingTop: 40,
					top: open ? 40 : -170,
					transition: "0.4s",
					zIndex: 2,
					background: themeColors.background,
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
				ref={ref}
			>
				<NavbarLinkItem
					href={SWORDIUM_COLLECTION}
					label="Swordium"
					style={{ borderRadius: 0, width: "100%" }}
					onClick={() => setOpen(false)}
				/>
				<NavbarLinkItem
					href="/team"
					label="Team"
					style={{ borderRadius: 0, width: "100%" }}
					onClick={() => setOpen(false)}
				/>
				<NavbarLinkItem
					href="/contact"
					label="Contact"
					style={{ borderRadius: 0, width: "100%" }}
					onClick={() => setOpen(false)}
				/>
			</div>
		</div>
	);
}

export default function navbar() {
	const { width } = useWindowSize();

	return width < 940 ? <Mobile /> : <Desktop />;
}
