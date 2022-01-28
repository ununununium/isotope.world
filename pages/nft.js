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

const styles = {};

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

function NFT(props) {
	const router = useRouter();
	const params = router.query;
	const { chain_id, token_address, token_id } = params;

	const { account, token } = useMoralisWeb3Api();
	// const { chainId, marketAddress, contractABI } = useMoralisDapp();
	// const { Moralis } = useMoralis();
	// const { resolveLink } = useIPFS();
	// const {
	// 	fetch: getNFTBalance,
	// 	data,
	// 	error,
	// 	isLoading,
	// } = useMoralisWeb3ApiCall(account.getNFTsForContract, {
	// 	chain: chain_id,
	// 	token_address: token_address,
	// });

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
			<Box
				style={{
					width: "940px",
					// border: "1px solid black",
					display: "flex",
					flexDirction: "row",
					justifyContent: "space-between",
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
						{!metadata && <CircularProgress />}
						{metadata && (
							<div
								style={{
									// fontFamily: "Poppins,sans-serif",
									// fontSize: "20px",
									color: themeColors.foreground,
									fontWeight: "350",
									fontSize: "1rem",
									// textShadow:
									// "-8px -8px 12px rgba(255,255,255,0.4) 8px 8px 12px rgba(0,0,0,0.08)",
									// caretColor: "#262626",
									// outline: "none",
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
						{!metadata && <CircularProgress />}
						{metadata && (
							<p
								style={{
									// fontFamily: "Poppins,sans-serif",
									// fontSize: "20px",
									color: themeColors.foreground,
									fontWeight: "350",
									fontSize: "1rem",
									height: "200px",
									overflow: "hidden",

									// textShadow:
									// "-8px -8px 12px rgba(255,255,255,0.4) 8px 8px 12px rgba(0,0,0,0.08)",
									// caretColor: "#262626",
									// outline: "none",
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
						{!metadata && <CircularProgress />}
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
							{metadata &&
								metadata.attributes?.map((e, index) => {
									return (
										<div
											style={{
												borderRadius: "10px",
												boxShadow:
													"6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
												width: "84px",
												padding: "10px",
											}}
											key={index}
										>
											<div>{e.trait_type.toUpperCase()}</div>
											<div>{e.value}</div>
										</div>
									);
								})}
						</div>
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
						{!metadata && <CircularProgress />}
						{metadata && (
							<Box style={{ display: "flex", flexDirection: "column" }}>
								<BlockchainInfoItem title={"Token Address:"}>
									<a
										href={`${getExplorer(chain_id)}address/${
											NFTData.token_address
										}`}
										target={"_blank"}
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
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
	// return (
	// 	<>
	// 		<Box style={styles.content}>
	// 			{metadata && (
	// 				<Box style={styles.nftDetail}>
	// 					<Box style={styles.row1}>
	// 						<ThreeDimModel
	// 							style={styles.model}
	// 							gltf_path={metadata.gltf_model}
	// 							scale={1.5}
	// 						/>

	// 						<Box style={styles.description}>
	// 							<h2
	// 								style={{
	// 									borderRadius: "10px",
	// 									background: "#e1ebf5",
	// 									boxShadow:
	// 										"inset 4px 4px 8px #bfc8d0,inset -4px -4px 8px #ffffff",
	// 									textAlign: "center",
	// 									color: themeColors.foreground,
	// 								}}
	// 							>
	// 								{metadata.name}
	// 							</h2>
	// 							<div
	// 								style={{
	// 									borderRadius: "10px",
	// 									background: "#e1ebf5",
	// 									boxShadow:
	// 										"inset 4px 4px 8px #bfc8d0,inset -4px -4px 8px #ffffff",
	// 									textAlign: "center",
	// 									color: themeColors.foreground,
	// 									height: "307px",
	// 									padding: "8px",
	// 									marginTop: "20px",
	// 									overflow: "hidden",
	// 								}}
	// 							>
	// 								{NFT_ATTRIBUTES.map((e, index) => {
	// 									return (
	// 										<div key={index}>{e.trait_type + " : " + e.value}</div>
	// 									);
	// 								})}
	// 							</div>
	// 						</Box>
	// 					</Box>

	// 					<p
	// 						style={{
	// 							borderRadius: "10px",
	// 							background: "#e1ebf5",
	// 							boxShadow: "4px 4px 8px #bfc8d0,-4px -4px 8px #ffffff",
	// 							textAlign: "start",
	// 							color: themeColors.foreground,
	// 							border: "none",
	// 							marginTop: "8px",
	// 							width: "100%",
	// 							fontSize: "20px",
	// 							padding: "50px",
	// 							fontSize: "1rem",
	// 						}}
	// 					>
	// 						{metadata.description}
	// 					</p>
	// 				</Box>
	// 			)}
	// 		</Box>
	// 	</>
	// );
}

export default NFT;
