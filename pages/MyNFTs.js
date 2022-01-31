import React, { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import NFTGrid from "../components/NFTGrid";

function NFTCollection() {
	const router = useRouter();
	const { walletAddress } = router.query;
	const { Moralis } = useMoralis();
	const [NFTData, setNFTData] = useState(Array(20).fill(0));

	useEffect(async () => {
		if (Moralis && walletAddress) {
			const NFT = Moralis.Object.extend("NFT");
			const query = new Moralis.Query(NFT);
			query.equalTo("owner", walletAddress);
			const result = await query.find();

			console.log(result);

			setNFTData(result);
		}
	}, [Moralis, walletAddress]);

	return <NFTGrid NFTData={NFTData} />;
}

export default NFTCollection;
