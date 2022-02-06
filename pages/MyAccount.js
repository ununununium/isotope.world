import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import themeColors from "../theme/theme";
import NextLink from "next/link";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";
import useWindowSize from "../hooks/useWindowSize";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
const styles = {
	account: {
		height: "40px",
		padding: "0 12px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "fit-content",
		borderRadius: "12px",
		background: themeColors.background,
		boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
		cursor: "pointer",
	},
	text: {
		color: themeColors.foreground,
	},
};

const Desktop = () => {
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { walletAddress, chainId } = useMoralisDapp();

	if (!isAuthenticated) {
		return (
			<div
				style={styles.account}
				onClick={() => authenticate({ signingMessage: "Hello ISOTOPE" })}
			>
				<p style={styles.text}>Authenticate</p>
			</div>
		);
	}

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
					// display: "flex",
					// flexDirection: "column",
					// alignItems: "center",
					zIndex: 1,
					marginTop: 130,
					fontSize: 20,
					color: themeColors.foreground,
				}}
			>
				Wallet Address: {walletAddress}
			</div>
		</>
	);
};

const Mobile = () => {
	return <Desktop />;
};

export default function MyAccount() {
	const { width } = useWindowSize();

	return width < 940 ? <Mobile /> : <Desktop />;
}
