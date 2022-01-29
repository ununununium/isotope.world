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

const filter = (nfts) => {
	return nfts?.filter((nft) => {
		return JSON.parse(nft.metadata)?.gltf_model;
	});
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

// const SWORDIUM_TOKEN_ADDRESS = "0xbd20048cAa54526d9DCfCD135708d15723Eda46a";
// const SWORDIUM_CHAIN_ID = "0xa869";
// https://isotope.world/NFTCollection?chain_id=0xa869&token_address=0xbd20048caa54526d9dcfcd135708d15723eda46a
function NFTCollection() {
	const router = useRouter();
	const params = router.query;
	const { chain_id, token_address } = params;

	const { account, token } = useMoralisWeb3Api();
	// const { chainId, marketAddress, contractABI } = useMoralisDapp();
	// const SWORDIUM_TOKEN_ADDRESS = "0xbd20048cAa54526d9DCfCD135708d15723Eda46a";
	// const SWORDIUM_CHAIN_ID = "0xa869";
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(token.getAllTokenIds, {
		chain: chain_id,
		address: token_address,
	});

	useEffect(() => {
		getNFTBalance();
	}, [getNFTBalance]);

	// debug
	useEffect(() => {
		console.log("data=====");
		console.log(data);
	}, [data]);

	// const NFTData = useMemo(() => filter(data?.result), [data]);

	const [NFTData, setNFTData] = useState(Array(20).fill(0));
	useEffect(() => {
		let res = filter(data?.result);
		if (res) {
			setNFTData(res);
		}
	}, [data]);

	return (
		<Box style={styles.content}>
			<Box style={styles.NFTs}>
				{NFTData.map((item, index) => {
					return <NFTPreview key={index} data={item} chainId={chain_id} />;
				})}
			</Box>
		</Box>
	);
}

export default NFTCollection;
