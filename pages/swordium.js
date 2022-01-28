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

import { Logos } from "../components/Chains/ChainToLogo";
import { isWebGL2Available } from "@react-three/drei";

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
	const metadata = JSON.parse(data.metadata);
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
				href={`/nft?chain_id=${chainId}&token_address=${data.token_address}&token_id=${data.token_id}`}
			>
				<div
					style={{
						// border: "3px solid red",
						// width: "230px",
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
					<Image
						className="nftPreviewImage"
						width="260px"
						height="260px"
						src={metadata?.image}
						loader={contentfulLoader}
					/>

					<Box style={{ padding: "10px" }}>
						<div
							style={{
								fontWeight: "400",
								color: "#31344b",
								fontSize: "1.11rem",
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							{metadata?.name}
							<Logos chainId={chainId} />
						</div>
					</Box>
				</div>
			</NextLink>
		</>
	);
}

// const SWORDIUM_TOKEN_ADDRESS = "0x02E09e142690F2d418858a7e3f443862b0D0D06D";
// const SWORDIUM_TOKEN_ADDRESS = "0x7F6071864Ee738F80De5c7872B775aDDe7647441";
// const SWORDIUM_CHAIN_ID = "0x13881";

function NFTBalance() {
	const { account, token } = useMoralisWeb3Api();
	// const { chainId, marketAddress, contractABI } = useMoralisDapp();
	const SWORDIUM_TOKEN_ADDRESS = "0xbd20048cAa54526d9DCfCD135708d15723Eda46a";
	const SWORDIUM_CHAIN_ID = "0xa869";
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(token.getAllTokenIds, {
		chain: SWORDIUM_CHAIN_ID,
		address: SWORDIUM_TOKEN_ADDRESS,
	});

	useEffect(() => {
		console.log("fetching");
		console.log(data);
		getNFTBalance();
	}, []);

	// debug
	useEffect(() => {
		console.log("data=====");
		console.log(data);
	}, [data]);

	// const NFTData = useMemo(() => filter(data?.result), [data]);

	const [NFTData, setNFTData] = useState(null);
	useEffect(() => {
		setNFTData(filter(data?.result));
	}, [data]);

	return (
		<Box style={styles.content}>
			<Box style={styles.NFTs}>
				{NFTData?.map((item, index) => {
					return (
						<NFTPreview key={index} data={item} chainId={SWORDIUM_CHAIN_ID} />
					);
				})}
			</Box>
		</Box>
	);
}

export default NFTBalance;
