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

const styles = {
	NFTs: {
		display: "flex",
		flexWrap: "wrap",
		WebkitBoxPack: "start",
		justifyContent: "flex-start",
		margin: "0 auto",
		maxWidth: "1000px",
		gap: "10px",
	},
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

	return (
		<Box style={styles.NFTs}>
			{/* <div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div> */}

			{data?.result.map((item, index) => {
				return <NFTPreview key={index} data={item} />;
			})}
		</Box>
	);
}

export default NFTBalance;
