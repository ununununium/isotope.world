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

const styles = {
	content: {
		display: "flex",
		backgroundColor: themeColors.background,
		flexDirection: "column",
		height: "100%",
		maxWidth: "1000px",
	},
	model: {
		width: "400px",
		height: "400px",
		borderRadius: "10px",
		boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
	},
	nftDetail: {
		display: "flex",
		flexWrap: "wrap",
		WebkitBoxPack: "start",
		justifyContent: "center",
		gap: "30px",
		// backgroundColor: "red",
		maxWidth: "940px",
	},
	description: {
		width: "248px",
		height: "400px",
		borderRadius: "10px",
		boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
		padding: "20px",
	},
	row1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
};

const findNFTbyId = (nfts, token_id) => {
	const results = nfts?.filter((nft) => {
		return JSON.parse(nft.metadata)?.gltf_model && nft.token_id === token_id;
	});
	if (results?.length > 0) {
		const NFTData = results[0];
		const metadata = JSON.parse(NFTData?.metadata);
		return { NFTData, metadata };
	} else {
		return { NFTData: undefined, metadata: undefined };
	}
};

const NFT_ATTRIBUTES = [
	{
		trait_type: "blade",
		value: "B-1",
	},
	{
		trait_type: "guard",
		value: "G-1",
	},
	{
		trait_type: "handle",
		value: "H-1",
	},
	{
		trait_type: "pommel",
		value: "P-1",
	},
	{
		trait_type: "stone",
		value: "S-1",
	},
];

function NFT(props) {
	const router = useRouter();
	const params = router.query;
	const { chain_id, token_address, token_id } = params;

	const { account } = useMoralisWeb3Api();
	// const { chainId, marketAddress, contractABI } = useMoralisDapp();
	// const { Moralis } = useMoralis();
	// const { resolveLink } = useIPFS();
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(account.getNFTsForContract, {
		chain: chain_id,
		token_address: token_address,
	});

	useEffect(() => {
		getNFTBalance();
	}, [getNFTBalance]);

	// debug
	useEffect(() => {
		console.log("data=====");
		console.log(data);
	}, [data]);

	const { NFTData, metadata } = useMemo(
		() => findNFTbyId(data?.result, token_id),
		[data]
	);

	console.log("metadata========");
	console.log(NFTData);
	console.log(metadata);
	console.log("========");

	return (
		<>
			<Box style={styles.content}>
				{metadata && (
					<Box style={styles.nftDetail}>
						<Box style={styles.row1}>
							<ThreeDimModel
								style={styles.model}
								gltf_path={metadata.gltf_model}
								scale={1.5}
							/>

							<Box style={styles.description}>
								<h2
									style={{
										borderRadius: "10px",
										background: "#e1ebf5",
										boxShadow:
											"inset 4px 4px 8px #bfc8d0,inset -4px -4px 8px #ffffff",
										textAlign: "center",
										color: themeColors.foreground,
									}}
								>
									{metadata.name}
								</h2>
								<div
									style={{
										borderRadius: "10px",
										background: "#e1ebf5",
										boxShadow:
											"inset 4px 4px 8px #bfc8d0,inset -4px -4px 8px #ffffff",
										textAlign: "center",
										color: themeColors.foreground,
										height: "307px",
										padding: "8px",
										marginTop: "20px",
										overflow: "hidden",
									}}
								>
									{NFT_ATTRIBUTES.map((e, index) => {
										return <div key={index}>{e.trait_type}</div>;
									})}
									{/* {metadata.description} */}
								</div>
							</Box>
						</Box>

						<button
							style={{
								borderRadius: "10px",
								background: "#e1ebf5",
								boxShadow: "4px 4px 8px #bfc8d0,-4px -4px 8px #ffffff",
								textAlign: "center",
								color: themeColors.foreground,
								border: "none",
								marginTop: "8px",
								width: "100%",
								fontSize: "20px",
								padding: "50px",
							}}
						></button>
					</Box>
				)}
			</Box>
		</>
	);
}

export default NFT;
