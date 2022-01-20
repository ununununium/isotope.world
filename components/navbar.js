import React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Menu } from "antd";
import themeColors from "../theme/theme";
import Logo from "./logo";
import Account from "./Account";
import Chains from "./Chains";
import NextLink from "next/link";

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
export default function navbar({ path }) {
	return (
		<Box style={styles.header}>
			<Logo />
			<Menu
				mode="horizontal"
				style={{
					display: "flex",
					fontSize: "1rem",
					marginLeft: "50px",
					width: "100%",
					backgroundColor: themeColors.background,
					// color: themeColors.foreground
					// color: "#31344b !important",
					borderBottom: "none",
					fontWeight: "400",
				}}
				defaultSelectedKeys={["/"]}
				selectedKeys={[path]}
			>
				<Menu.Item key="/">
					<NextLink href="/">Home</NextLink>
				</Menu.Item>

				<Menu.Item key="/about">
					<NextLink href="/about">About</NextLink>
				</Menu.Item>

				<Menu.Item key="/swordium">
					<NextLink href="/swordium">Swordium</NextLink>
				</Menu.Item>

				{/* <Menu.Item key="/my_nfts">
					<NextLink href="/my_nfts">My NFTs</NextLink>
				</Menu.Item> */}
			</Menu>

			<div style={styles.headerRight}>
				{/* <Chains /> */}
				{/* <NativeBalance /> */}
				<Account />
			</div>
		</Box>
	);
}
