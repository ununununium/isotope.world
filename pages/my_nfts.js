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
		gap: "10px",
		// backgroundColor: "red",
		maxWidth: "940px",
	},
};

const filter = (nfts) => {
	return nfts?.filter((nft) => {
		return JSON.parse(nft.metadata)?.gltf_model;
	});
};

function NFTPreview({ data }) {
	const metadata = JSON.parse(data.metadata);

	return (
		<>
			<Box
				style={{
					// border: "3px solid red",
					width: "180px",
					height: "180px",
				}}
			>
				<img
					style={{
						width: "100%",
						height: "100%",
					}}
					src={metadata?.image}
				/>
			</Box>
		</>
	);
}

function NFTBalance() {
	const { account } = useMoralisWeb3Api();
	const { chainId, marketAddress, contractABI } = useMoralisDapp();
	const { Moralis } = useMoralis();
	const { resolveLink } = useIPFS();
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(account.getNFTs, { chain: chainId });

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
					return <NFTPreview key={index} data={item} />;
				})}
			</Box>
		</Box>
	);
}

export default NFTBalance;
