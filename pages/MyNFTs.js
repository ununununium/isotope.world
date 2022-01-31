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

import ContentLoader from "react-content-loader";
const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: themeColors.background,
		flexDirection: "column",
		width: 940,
	},
	NFTs: {
		display: "flex",
		flexWrap: "wrap",
		WebkitBoxPack: "start",
		justifyContent: "flex-start",
		gap: "50px",
		// backgroundColor: "red",
		maxWidth: "940px",
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

function NFTPreview({ data, chainId }) {
	const metadata = data != 0 ? JSON.parse(data.metadata) : null;
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	const contentfulLoader = ({ src, quality, width }) => {
		const params = [`w=${width}`];

		if (quality) {
			params.push(`q=${quality}`);
		}

		return `${src}?${params.join("&")}`;
	};

	return (
		<>
			<NextLink
				href={`/nft?chain_id=${chainId}&token_address=${data?.token_address}&token_id=${data?.token_id}`}
			>
				<div
					style={{
						// border: "3px solid red",
						width: "260px",
						height: "320px",
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

					{metadata && (
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
				</div>
			</NextLink>
		</>
	);
}

function NFTCollection() {
	const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
	const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

	const {
		authenticate,
		isAuthenticated,
		logout,
		Moralis,
		initialize,
		isInitialized,
	} = useMoralis();

	const { walletAddress, chainId } = useMoralisDapp();

	const [NFTData, setNFTData] = useState(Array(20).fill(0));

	useEffect(async () => {
		if (isInitialized) {
			getNFTs();
		}
	}, [Moralis, initialize, isInitialized]);

	const getNFTs = async () => {
		const options = { chain: "0xa869", address: walletAddress };
		const nfts = await Moralis.Web3API.account.getNFTs(options);
		setNFTData(nfts.result);
		console.log(nfts);
	};

	if (!isAuthenticated) {
		return <div>Please Login First</div>;
	}

	return (
		<Box style={styles.content}>
			<div
				style={{
					width: "100%",
					height: "100px",
				}}
			>
				<button onClick={getNFTs}>refresh</button>
			</div>

			<Box style={styles.NFTs}>
				{NFTData.map((item, index) => {
					return <NFTPreview key={index} data={item} chainId={chainId} />;
				})}
			</Box>
		</Box>
	);
}

export default NFTCollection;
