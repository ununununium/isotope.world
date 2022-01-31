import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
// import Blockie from "./Blockie";
// import { Button, Card, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import Address from "./Address/Address";
// import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
import themeColors from "../theme/theme";
import NextLink from "next/link";

const styles = {
	account: {
		height: "42px",
		padding: "0 15px",
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
	useEffect(
		() => {
			const listener = (event) => {
				// Do nothing if clicking ref's element or descendent elements
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
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler]
	);
}

function Account() {
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
				style={{ marginRight: "5px", ...styles.text }}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				{getEllipsisTxt(walletAddress, 6)}
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
	// return (
	// 	<>
	// 		<div style={styles.account} onClick={() => setIsModalVisible(true)}>
	// 			<p style={{ marginRight: "5px", ...styles.text }}>
	// 				{getEllipsisTxt(walletAddress, 6)}
	// 			</p>
	// 			<Blockie currentWallet scale={3} />
	// 		</div>
	// 		<Modal
	// 			visible={isModalVisible}
	// 			footer={null}
	// 			onCancel={() => setIsModalVisible(false)}
	// 			bodyStyle={{
	// 				padding: "15px",
	// 				fontSize: "17px",
	// 				fontWeight: "500",
	// 			}}
	// 			style={{ fontSize: "16px", fontWeight: "500" }}
	// 			width="400px"
	// 		>
	// 			Account
	// 			<Card
	// 				style={{
	// 					marginTop: "10px",
	// 					borderRadius: "1rem",
	// 				}}
	// 				bodyStyle={{ padding: "15px" }}
	// 			>
	// 				<Address
	// 					avatar="left"
	// 					size={6}
	// 					copyable
	// 					style={{ fontSize: "20px" }}
	// 				/>
	// 				<div style={{ marginTop: "10px", padding: "0 10px" }}>
	// 					<a
	// 						href={`${getExplorer(chainId)}/address/${walletAddress}`}
	// 						target="_blank"
	// 						rel="noreferrer"
	// 					>
	// 						<SelectOutlined style={{ marginRight: "5px" }} />
	// 						View on Explorer
	// 					</a>
	// 				</div>
	// 			</Card>
	// 			<Button
	// 				size="large"
	// 				type="primary"
	// 				style={{
	// 					width: "100%",
	// 					marginTop: "10px",
	// 					borderRadius: "0.5rem",
	// 					fontSize: "16px",
	// 					fontWeight: "500",
	// 				}}
	// 				onClick={() => {
	// 					logout();
	// 					setIsModalVisible(false);
	// 				}}
	// 			>
	// 				Disconnect Wallet
	// 			</Button>
	// 		</Modal>
	// 	</>
	// );
}

export default Account;
