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
const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: themeColors.background,
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

function NFTPreview({
	data,
	collectionName,
	collectionId,
	chainId,
	tokenAddress,
}) {
	const { Moralis } = useMoralis();

	// const metadata = data != 0 ? JSON.parse(data.metadata) : null;
	const [metadata, setMetadata] = useState(null);

	const [hovered, setHovered] = useState(false);
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

	return (
		<>
			<NextLink
				href={`/nft?collectionId=${collectionId}&nftId=${data.id}`}
				// href={`/nft?chain_id=${chainId}&token_address=${tokenAddress}&token_id=${data?.token_id}`}
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
				</div>
			</NextLink>
		</>
	);
}

const CHAIN_ID = "0xa869";
const TOKEN_ADDRESS = "0xbd20048caa54526d9dcfcd135708d15723eda46a";

function NFTCollection() {
	const router = useRouter();
	const { name: collectionName, id: collectionId } = router.query;

	const { Moralis } = useMoralis();
	const [NFTData, setNFTData] = useState(Array(20).fill(0));

	useEffect(async () => {
		if (Moralis && collectionName && collectionId) {
			// const Metadata = Moralis.Object.extend(collectionName);
			// const query = new Moralis.Query(Metadata);
			// const results = await query.find();

			const Collection = Moralis.Object.extend("Collection");
			const query = new Moralis.Query(Collection);
			query.equalTo("objectId", collectionId);
			const result = await query.first();
			console.log(result.attributes.NFTs);
			setNFTData(result.attributes.NFTs);

			// const Collection = Moralis.Object.extend("Collection");
			// const query = new Moralis.Query(Collection);
			// query.equalTo("objectId", collectionId);
			// const result = await query.first();
			// let pointer = result.attributes.NFTs[0];

			// const NFTQuery = new Moralis.Query(pointer);
			// NFTQuery.equalTo("objectId", nftId);

			// let NFTRes = await NFTQuery.first();
			// console.log(NFTRes);
			// console.log(NFTRes.attributes);
		}
	}, [Moralis, collectionName]);

	return (
		<Box style={styles.content}>
			<Box style={styles.NFTs}>
				{NFTData.map((item, index) => {
					return (
						<NFTPreview
							key={index}
							data={item}
							collectionName={collectionName}
							collectionId={collectionId}
							chainId={CHAIN_ID}
							tokenAddress={TOKEN_ADDRESS}
						/>
					);
				})}
			</Box>
		</Box>
	);
}

export default NFTCollection;
