import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import NFTGrid from "../components/NFTGrid";

function collection() {
	const router = useRouter();
	const { id: collectionId } = router.query;

	const { Moralis } = useMoralis();
	const [NFTData, setNFTData] = useState(Array(20).fill(0));

	useEffect(async () => {
		if (Moralis && collectionId) {
			const Collection = Moralis.Object.extend("Collection");
			const query = new Moralis.Query(Collection);
			query.equalTo("objectId", collectionId);
			const result = await query.first();
			console.log(result.attributes.NFTs);
			setNFTData(result.attributes.NFTs);
		}
	}, [Moralis, collectionId]);

	return <NFTGrid NFTData={NFTData} />;
}

export default collection;
