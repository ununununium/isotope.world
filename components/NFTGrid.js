import Head from "next/head";
import Image from "next/image";
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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Logos } from "../components/Chains/ChainToLogo";
import { isWebGL2Available } from "@react-three/drei";
import ContentLoader from "react-content-loader";
import SWORDIUM_ABI from "../ABI/swordium_erc1155_abi.json";

const SWORDIUM_SMARTCONTRACT_ADDRESS =
	"0x5242F9889f37cC3308800AE515057a47b080F5a8";

const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: themeColors.background,
		position: "relative",
		marginBottom: "50px",
	},
	NFTs: {
		display: "flex",
		flexWrap: "wrap",
		WebkitBoxPack: "start",
		justifyContent: "flex-start",
		gap: "50px",
		// backgroundColor: "red",
		maxWidth: "940px",
		padding: 28,
	},
};
const LOADING_ANIMATION_SPEED = 2;
const NFTPreviewContentLoader = (props) => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={240}
			height={320}
			viewBox="0 0 240 320"
			backgroundColor={themeColors.loadingBackground}
			foregroundColor={themeColors.loadingForeground}
		>
			{/* Only SVG shapes */}
			<rect x="0" y="0" rx="10" ry="10" width="240" height="240" />

			<rect x="0" y="260" rx="5" ry="5" width="190" height="30" />
			<rect x="210" y="260" rx="5" ry="5" width="30" height="30" />
		</ContentLoader>
	);
};

const MintingLoader = () => {
	return (
		<ContentLoader
			speed={LOADING_ANIMATION_SPEED}
			width={240}
			height={34.67}
			viewBox="0 0 240 34.67"
			backgroundColor={themeColors.foreground}
			foregroundColor={themeColors.background}
		>
			{/* Only SVG shapes */}
			<rect x="0" y="0" rx="10" ry="10" width="240" height="34.67" />
		</ContentLoader>
	);
};

const Button = ({ style, children, onClick }) => {
	return (
		<button
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
				color: themeColors.background,
				fontSize: "2rem",
				fontWeight: "bold",
				transition: "0.4s",
				cursor: "pointer",
				border: "none",
				...style,
			}}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

function NFTPreview({ data, chainId }) {
	const { Moralis } = useMoralis();

	// const metadata = data != 0 ? JSON.parse(data.metadata) : null;
	const [metadata, setMetadata] = useState(null);
	const { walletAddress } = useMoralisDapp();
	const [hovered, setHovered] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);

	const toggleHover = () => setHovered(!hovered);

	useEffect(async () => {
		if (data) {
			const NFTQuery = new Moralis.Query(data);
			NFTQuery.equalTo("objectId", data.id);
			let NFTRes = await NFTQuery.first();
			setMetadata(NFTRes.attributes);
		}
	}, [data]);

	const contentfulLoader = ({ src, quality, width }) => {
		const params = [`w=${width}`];

		if (quality) {
			params.push(`q=${quality}`);
		}

		return `${src}?${params.join("&")}`;
	};

	const mint = async () => {
		setIsMinting(true);

		if (!metadata) {
			setIsMinting(false);
			return;
		}

		console.log(metadata);

		const sendOptions = {
			contractAddress: SWORDIUM_SMARTCONTRACT_ADDRESS,
			functionName: "mint",
			abi: SWORDIUM_ABI,
			params: { account: walletAddress, id: metadata.mint_id, amount: 1 },
		};

		try {
			await Moralis.authenticate();

			const transaction = await Moralis.executeFunction(sendOptions);

			// marked minted
			const NFT = Moralis.Object.extend("NFT");
			const query = new Moralis.Query(NFT);
			query.equalTo("objectId", data.id);
			const currNFT = await query.first();
			currNFT.set("minted", true);
			currNFT.set("owner", walletAddress);

			await currNFT.save();

			setMetadata({ ...metadata, minted: true });

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
		if (!metadata) {
			return <></>;
		}

		if (!metadata.minted) {
			if (isMinting) {
				return (
					<div style={{ ...style, bottom: 0 }}>
						<MintingLoader />
					</div>
				);
			} else {
				return (
					<Button style={style} onClick={mint}>
						Mint
					</Button>
				);
			}
		}

		if (metadata.minted && !metadata.listed) {
			return (
				<Button
					style={{
						...style,
						background: themeColors.background,
						color: themeColors.foreground,
						boxShadow:
							"inset 5px 5px 10px #b1b1b1,inset -5px -5px 10px #ffffff",
					}}
				>
					Minted
				</Button>
			);
		}

		if (metadata.minted && metadata.listed) {
			return (
				<Button style={{ ...style, background: "green" }}>
					BUY {metadata.price}
				</Button>
			);
		}
	};

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

	return (
		<div style={{ position: "relative" }}>
			<NextLink
				href={`/nft?nftId=${data.id}`}
				// href={`/nft?chain_id=${chainId}&token_address=${tokenAddress}&token_id=${data?.token_id}`}
			>
				<div
					style={{
						// border: "3px solid red",
						width: "260px",
						height: "350px",
						padding: "10px",
						borderRadius: "10px",
						boxShadow: hovered
							? "rgb(232 65 65) 2px 2px 30px, rgb(232 65 65) -2px -2px 30px"
							: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
						transition: "0.4s",
						cursor: "pointer",
					}}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
				>
					{!metadata && <NFTPreviewContentLoader />}

					{metadata && metadata.image && (
						<Image
							className="nftPreviewImage"
							width="260px"
							height="260px"
							src={metadata?.image}
							loader={contentfulLoader}
							alt={""}
						/>
					)}

					{metadata && (
						<Box style={{ padding: "10px" }}>
							<div
								style={{
									fontWeight: "400",
									color: "#31344b",
									fontSize: "1.11rem",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									fontFamily: "'Oxanium', cursive",
								}}
							>
								{metadata?.name}
								<Logos chainId={chainId} />
							</div>
						</Box>
					)}

					{/* {metadata.minted ? "minted" : "not minted"} */}
				</div>
			</NextLink>

			<NFTOperationSection
				style={{
					position: "absolute",
					width: "240px",
					fontSize: "1.3rem",
					bottom: 10,
					left: 10,
				}}
				isMinting={isMinting}
			/>

			{showSuccess && (
				<div
					style={{
						position: "absolute",
						backgroundColor: "green",
						color: "white",
						left: 0,
						width: 160,
						borderRadius: 10,
						textAlign: "center",
						fontSize: "1.5rem",
						padding: "5px",
						top: 50,
						left: 50,
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
						left: 0,
						width: 160,
						borderRadius: 10,
						textAlign: "center",
						fontSize: "1.5rem",
						padding: "5px",
						top: 50,
						left: 50,
					}}
				>
					fail
				</div>
			)}
		</div>
	);
}

function NFTGrid({ NFTData }) {
	// const router = useRouter();
	// const { id: collectionId } = router.query;

	// const { Moralis } = useMoralis();
	// const [NFTData, setNFTData] = useState(Array(20).fill(0));

	// useEffect(async () => {
	// 	if (Moralis && collectionId) {
	// 		const Collection = Moralis.Object.extend("Collection");
	// 		const query = new Moralis.Query(Collection);
	// 		query.equalTo("objectId", collectionId);
	// 		const result = await query.first();
	// 		console.log(result.attributes.NFTs);
	// 		setNFTData(result.attributes.NFTs);
	// 	}
	// }, [Moralis, collectionId]);
	const CHAIN_ID = "0xa869";

	return (
		<div style={styles.content}>
			<div style={styles.NFTs}>
				{NFTData.map((item, index) => {
					return <NFTPreview key={index} data={item} chainId={CHAIN_ID} />;
				})}
			</div>
		</div>
	);
}

export default NFTGrid;
