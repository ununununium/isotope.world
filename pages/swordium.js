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
import NextLink from "next/link";

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
		gap: "20px",
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

	return (
		<>
			<NextLink
				href={`/nft?chain_id=${chainId}&token_address=${data.token_address}&token_id=${data.token_id}`}
			>
				<Box
					style={{
						// border: "3px solid red",
						width: "220px",
						height: "352px",
						borderRadius: "10px",
						boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
					}}
				>
					<img
						style={{
							width: "220px",
							height: "220px",
							borderRadius: "10px",
							borderEndStartRadius: "0",
							borderEndEndRadius: "0",
						}}
						src={metadata?.image}
					/>
					<Box style={{ padding: "10px" }}>
						<div
							style={{
								fontWeight: "400",
								color: "#31344b",
								fontSize: "1.11rem",
							}}
						>
							{metadata?.name}
						</div>
					</Box>
				</Box>
			</NextLink>
		</>
	);
}

const SWORDIUM_TOKEN_ADDRESS = "0x02E09e142690F2d418858a7e3f443862b0D0D06D";
const SWORDIUM_CHAIN_ID = "0x13881";

function NFTBalance() {
	const { account } = useMoralisWeb3Api();
	// const { chainId, marketAddress, contractABI } = useMoralisDapp();
	const { Moralis } = useMoralis();
	const { resolveLink } = useIPFS();
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(account.getNFTsForContract, {
		chain: SWORDIUM_CHAIN_ID,
		token_address: SWORDIUM_TOKEN_ADDRESS,
	});

	useEffect(() => {
		getNFTBalance();
	}, [getNFTBalance]);

	// debug
	useEffect(() => {
		console.log("data=====");
		console.log(data);
	}, [data]);

	const NFTData = useMemo(() => filter(data?.result), [data]);

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
