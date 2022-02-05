import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
// import Blockie from "./Blockie";
import { useState, useEffect, useRef } from "react";
import Address from "./Address/Address";
// import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
import themeColors from "../theme/theme";
import NextLink from "next/link";
import useWindowSize from "../hooks/useWindowSize";

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

const MenuItem = ({ visible, onClick, children }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	if (!visible) {
		return <></>;
	}
	return (
		<div
			style={{
				background: visible ? themeColors.background : "rgba(0,0,0,0)",
				color: visible ? themeColors.foreground : "rgba(0,0,0,0)",
				border: "none",
				boxShadow: "2px 2px 5px #bfc8d0,-2px -2px 5px #ffffff",
				borderRadius: 10,
				padding: 15,
				transition: "0.4s",
				textAlign: "left",
				cursor: "pointer",
			}}
			onClick={onClick}
			onMouseEnter={() => toggleHover(true)}
			onMouseLeave={() => toggleHover(false)}
		>
			{children}
		</div>
	);
};

function useOnClickOutside(ref, handler) {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}

function Desktop() {
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { walletAddress, chainId } = useMoralisDapp();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const ref = useRef();
	useOnClickOutside(ref, () => setIsModalVisible(false));

	if (!isAuthenticated) {
		return (
			<div
				style={styles.account}
				onClick={() => authenticate({ signingMessage: "Hello Isotope.World" })}
			>
				<p style={styles.text}>Authenticate</p>
			</div>
		);
	}

	return (
		<div style={styles.account} ref={ref}>
			<p
				style={{
					fontSize: 14,
					fontWeight: 600,
					...styles.text,
				}}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				{getEllipsisTxt(walletAddress, 4)}
			</p>

			<div
				style={{
					display: "flex",
					position: "absolute",
					background: isModalVisible ? themeColors.background : "rgba(0,0,0,0)",
					boxShadow: isModalVisible
						? "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff"
						: "none",
					cursor: isModalVisible ? "pointer" : "auto",
					top: 65,
					width: 160,
					height: 200,
					right: 10,
					padding: 10,
					borderRadius: 10,
					transition: "0.4s",
					flexDirection: "column",
					gap: 10,
				}}
			>
				<NextLink href={"/MyAccount"}>
					<MenuItem visible={isModalVisible}> My Account </MenuItem>
				</NextLink>

				<NextLink href={`/MyNFTs?walletAddress=${walletAddress}`}>
					<MenuItem visible={isModalVisible}> My NFTs </MenuItem>
				</NextLink>

				<MenuItem visible={isModalVisible} onClick={logout}>
					Logout
				</MenuItem>
			</div>
		</div>
	);
}

function Mobile() {
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { walletAddress, chainId } = useMoralisDapp();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const ref = useRef();
	useOnClickOutside(ref, () => setIsModalVisible(false));

	if (!isAuthenticated) {
		return (
			<div
				style={styles.account}
				onClick={() => authenticate({ signingMessage: "Hello Isotope.World" })}
			>
				<p style={styles.text}>Authenticate</p>
			</div>
		);
	}

	return (
		<div style={styles.account} ref={ref}>
			<p
				style={{ fontSize: 14, fontWeight: 600, ...styles.text }}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				{getEllipsisTxt(walletAddress, 4)}
			</p>

			<div
				style={{
					display: "flex",
					position: "absolute",
					background: isModalVisible ? themeColors.background : "rgba(0,0,0,0)",
					boxShadow: isModalVisible
						? "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff"
						: "none",
					cursor: isModalVisible ? "pointer" : "auto",
					top: 65,
					width: 160,
					height: 200,
					right: 10,
					padding: 10,
					borderRadius: 10,
					transition: "0.4s",
					flexDirection: "column",
					gap: 10,
				}}
			>
				<NextLink href={"/MyAccount"}>
					<MenuItem visible={isModalVisible}> My Account </MenuItem>
				</NextLink>

				<NextLink href={`/MyNFTs?walletAddress=${walletAddress}`}>
					<MenuItem visible={isModalVisible}> My NFTs </MenuItem>
				</NextLink>

				<MenuItem visible={isModalVisible} onClick={logout}>
					Logout
				</MenuItem>
			</div>
		</div>
	);
}

export default function Account() {
	const { width } = useWindowSize();

	return width < 940 ? <Mobile /> : <Desktop />;
}
