import Head from "next/head";
// import Image from "next/image";
import { Box } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { useNFTBalance } from "../hooks/useNFTBalance";
import { FileSearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "../helpers/networks";
import {
	useWeb3ExecuteFunction,
	useMoralisWeb3Api,
	useMoralisWeb3ApiCall,
} from "react-moralis";
import { useIPFS } from "../hooks/useIPFS";
import themeColors from "../theme/theme";

import { useRouter } from "next/router";
import ThreeDimModel from "../components/ThreeDimModel";
import CircularProgress from "@mui/material/CircularProgress";
import { Logos } from "../components/Chains/ChainToLogo";

import NextLink from "next/link";
import ContentLoader from "react-content-loader";
import axios from "axios";

import SWORDIUM_ABI from "../ABI/swordium_erc1155_abi.json";

const LOADING_ANIMATION_SPEED = 1;

const SWORDIUM_SMARTCONTRACT_ADDRESS =
	"0x5242F9889f37cC3308800AE515057a47b080F5a8";

const NFTNameContentLoader = (props) => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={296}
			height={200}
			viewBox="0 0 296 30"
			backgroundColor={themeColors.loadingBackground}
			foregroundColor={themeColors.loadingForeground}
			style={{
				// boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
				borderRadius: 10,
			}}
		>
			<rect x="0" y="0" rx="5" ry="5" width="296" height="25" />
		</ContentLoader>
	);
};

const DescriptionContentLoader = (props) => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={296}
			height={200}
			viewBox="0 0 296 200"
			backgroundColor={themeColors.loadingBackground}
			foregroundColor={themeColors.loadingForeground}
			style={
				{
					// boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
					// borderRadius: 10,
				}
			}
		>
			<rect x="0" y="0" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="30" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="60" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="90" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="120" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="150" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="180" rx="5" ry="5" width="296" height="20" />
		</ContentLoader>
	);
};

const AttributesContentLoader = (props) => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={64}
			height={22}
			viewBox="0 0 64 22"
			backgroundColor={themeColors.loadingBackground}
			foregroundColor={themeColors.loadingForeground}
		>
			<rect x="0" y="0" rx="5" ry="5" width="64" height="22" />
		</ContentLoader>
	);
};

const BlockchainInfoContentLoader = (props) => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={296}
			height={200}
			viewBox="0 0 296 200"
			backgroundColor={themeColors.loadingBackground}
			foregroundColor={themeColors.loadingForeground}
		>
			<rect x="0" y="0" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="30" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="60" rx="5" ry="5" width="296" height="20" />
			<rect x="0" y="90" rx="5" ry="5" width="296" height="20" />
		</ContentLoader>
	);
};

const MintingLoader = () => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={376}
			height={52.28}
			viewBox="0 0 376 52.28"
			backgroundColor={themeColors.foreground}
			foregroundColor={themeColors.background}
		>
			{/* Only SVG shapes */}
			<rect x="0" y="0" rx="10" ry="10" width="376" height="52.28" />
		</ContentLoader>
	);
};

const styles = {};

const AttributeItem = ({ item, key }) => {
	return (
		<div
			style={{
				borderRadius: "10px",
				boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
				width: "84px",
				padding: "10px",
			}}
			key={key}
		>
			{item != 0 ? (
				<div>{item.trait_type.toUpperCase()}</div>
			) : (
				<AttributesContentLoader />
			)}

			{item != 0 ? <div>{item.value}</div> : <AttributesContentLoader />}
		</div>
	);
};

const BlockchainInfoItem = ({ title, children }) => {
	return (
		<>
			<Box
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					overflow: "hidden",
					justifyContent: "start",
					paddingBottom: "8px",
				}}
			>
				<div
					style={{
						marginRight: "10px",
						color: themeColors.foreground,
						fontSize: "0.9rem",
						fontWeight: 550,
					}}
				>
					{title}
				</div>
				{children}
			</Box>
		</>
	);
};

const Button = ({ style, children, onClick }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);
	return (
		<button
			style={{
				width: "100%",
				// height: "100px",
				borderRadius: "10px",
				boxShadow: hovered
					? "rgb(232 65 65) 2px 2px 30px, rgb(232 65 65) -2px -2px 30px"
					: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "30px",
				backgroundColor: themeColors.foreground,
				color: themeColors.background,
				fontSize: "2rem",
				fontWeight: "bold",
				transition: "0.4s",
				cursor: "pointer",
				border: "none",
				...style,
			}}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

function NFT() {
	const router = useRouter();
	const params = router.query;
	const { nftId } = params;
	const { Moralis, authenticate, isAuthenticated } = useMoralis();
	const [metadata, setMetadata] = useState(null);
	const [NFTData, setNFTData] = useState(null);
	const { walletAddress, chainId } = useMoralisDapp();
	const [isMinting, setIsMinting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);

	useEffect(async () => {
		if (Moralis && nftId) {
			const NFT = Moralis.Object.extend("NFT");
			const query = new Moralis.Query(NFT);
			query.equalTo("objectId", nftId);
			const result = await query.first();

			let NFTData = result?.attributes;
			setNFTData(NFTData);

			let metadataURL = NFTData.metadata;
			let fetchResult = await axios(metadataURL);

			console.log(fetchResult.data);
			setMetadata(fetchResult.data);
		}
	}, [Moralis, nftId]);

	const scheduleShow = async (result) => {
		if (result === "green") {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 2000);
		} else if (result === "red") {
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
			}, 2000);
		}
	};

	const mint = async () => {
		setIsMinting(true);

		if (!metadata) {
			setIsMinting(false);
			return;
		}

		console.log(NFTData);

		console.log(metadata);

		const sendOptions = {
			contractAddress: SWORDIUM_SMARTCONTRACT_ADDRESS,
			functionName: "mint",
			abi: SWORDIUM_ABI,
			params: { account: walletAddress, id: NFTData.mint_id, amount: 1 },
		};
		console.log("===============");
		console.log(sendOptions);
		console.log("===============");

		try {
			await Moralis.authenticate();
			const transaction = await Moralis.executeFunction(sendOptions);

			// marked minted
			const NFT = Moralis.Object.extend("NFT");
			const query = new Moralis.Query(NFT);
			query.equalTo("objectId", nftId);
			const currNFT = await query.first();
			currNFT.set("minted", true);

			currNFT.set("owner", walletAddress);

			await currNFT.save();

			setNFTData({ ...NFTData, minted: true });

			console.log("mint result ============");
			console.log(transaction);
			console.log("========================");
			scheduleShow("green");
		} catch (error) {
			console.log(error);
			scheduleShow("red");
		} finally {
			setIsMinting(false);
		}
	};

	const NFTOperationSection = ({ style, isMinting }) => {
		if (!NFTData) {
			return <></>;
		}

		if (!NFTData.minted) {
			if (isMinting) {
				return (
					<div style={{ ...style, marginTop: 30 }}>
						<MintingLoader />
					</div>
				);
			} else {
				return <Button onClick={mint}>Mint</Button>;
			}
		}

		if (NFTData.minted && !NFTData.listed) {
			return <Button>List</Button>;
		}

		if (NFTData.minted && NFTData.listed) {
			return <Button>BUY {NFTData.price}</Button>;
		}
	};

	return (
		<Box
			style={{
				width: "940px",
				// border: "1px solid black",
				display: "flex",
				flexDirction: "row",
				justifyContent: "space-between",
				position: "relative",
			}}
		>
			<Box
				style={{
					width: "45%",
					height: "80vh",
					// background: "blue",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					// border: "1px solid red",
				}}
			>
				{!metadata && <CircularProgress />}
				{metadata && (
					<ThreeDimModel
						// style={styles.model}
						gltf_path={metadata.gltf_model}
						scale={1.5}
					/>
				)}
			</Box>

			<Box
				style={{
					width: "40%",
					// height: "80vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					style={{
						width: "100%",
						minHeight: "50px",
						maxHeight: "50px",
						borderRadius: "10px",
						boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{!metadata && <NFTNameContentLoader />}

					{metadata && (
						<div
							style={{
								color: themeColors.background,
								fontWeight: "600",
								fontSize: "1.5rem",
								textShadow:
									"2px 2px 10px rgb(0,0,0), -2px -2px 15px rgb(255,255,255)",
							}}
						>
							{metadata.name}
						</div>
					)}
				</Box>

				<Box
					style={{
						width: "100%",
						// height: "100px",
						borderRadius: "10px",
						boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "30px",
						padding: "40px",
					}}
				>
					<div
						style={{
							alignSelf: "start",
							fontSize: "1.2rem",
							color: themeColors.foreground,
							fontWeight: "bold",
							marginBottom: "10px",
						}}
					>
						Description
					</div>
					{!metadata && <DescriptionContentLoader />}
					{metadata && (
						<p
							style={{
								color: themeColors.foreground,
								fontWeight: "350",
								fontSize: "1rem",
								height: "200px",
								overflow: "hidden",
							}}
						>
							{metadata.description}
						</p>
					)}
				</Box>

				<Box
					style={{
						width: "100%",
						// height: "100px",
						borderRadius: "10px",
						boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "30px",
						padding: "40px",
					}}
				>
					<div
						style={{
							alignSelf: "start",
							fontSize: "1.2rem",
							color: themeColors.foreground,
							fontWeight: "bold",
							marginBottom: "10px",
						}}
					>
						Attributes
					</div>

					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							gap: "20px",
							flexDirection: "row",
							// overflow: "auto",
							flexWrap: "wrap",
						}}
					>
						{!metadata &&
							Array(6)
								.fill(0)
								.map((item, index) => {
									return <AttributeItem item={item} key={index} />;
								})}
						{metadata &&
							metadata.attributes?.map((item, index) => {
								return <AttributeItem item={item} key={index} />;
							})}
					</div>
				</Box>

				<NFTOperationSection isMinting={isMinting} />

				{/* <div
						style={{
							width: "100%",
							// height: "100px",
							borderRadius: "10px",
							boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							marginTop: "30px",
							backgroundColor: themeColors.foreground,
						}}
					>
						<div
							style={{
								fontSize: "2rem",
								color: themeColors.background,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							Mint
						</div>
					</div> */}

				{/* <Box
						style={{
							width: "100%",
							// height: "100px",
							borderRadius: "10px",
							boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "start",
							marginTop: "30px",
							padding: "40px",
							marginBottom: "40px",
						}}
					>
						<div
							style={{
								alignSelf: "start",
								fontSize: "1.2rem",
								color: themeColors.foreground,
								fontWeight: "bold",
								marginBottom: "10px",
							}}
						>
							Blockchain Info
						</div>
						{!metadata && <BlockchainInfoContentLoader />}
						{metadata && (
							<div style={{ display: "flex", flexDirection: "column" }}>
								<BlockchainInfoItem title={"Token Address:"}>
									<a
										href={`${getExplorer(chain_id)}address/${
											NFTData.token_address
										}`}
										target={"_blank"}
										rel={"noopener noreferrer"}
									>
										{NFTData.token_address.slice(0, 10) + " ..."}
									</a>
								</BlockchainInfoItem>

								<BlockchainInfoItem title={"Chain ID:"}>
									<Logos chainId={chain_id} style={{ marginRight: "8px" }} />
									<div>{chain_id.slice(0, 10)}</div>
								</BlockchainInfoItem>

								<BlockchainInfoItem title={"Amount:"}>
									{NFTData.amount}
								</BlockchainInfoItem>

								<BlockchainInfoItem title={"Contract Type:"}>
									{NFTData.contract_type}
								</BlockchainInfoItem>
							</div>
						)}
					</Box> */}
			</Box>

			{showSuccess && (
				<div
					style={{
						position: "absolute",
						backgroundColor: "green",
						color: "white",
						width: 160,
						borderRadius: 10,
						textAlign: "center",
						fontSize: "1.5rem",
						padding: "5px",
						top: 50,
						left: 390,
					}}
				>
					success
				</div>
			)}

			{showFail && (
				<div
					style={{
						position: "absolute",
						backgroundColor: "red",
						color: "white",
						width: 160,
						borderRadius: 10,
						textAlign: "center",
						fontSize: "1.5rem",
						padding: "5px",
						top: 50,
						left: 390,
					}}
				>
					fail
				</div>
			)}
		</Box>
	);
}

export default NFT;
