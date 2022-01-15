import React, { useState, useEffect } from "react";
import themeColors from "theme";
import ThreeDimModel from "./ThreeDimModel";

const styles = {
	content: {
		backgroundColor: themeColors.background,
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	placeholder: {
		color: themeColors.foreground,
		fontSize: "40px",
		fontWeight: "bold",
	},
	border: {
		position: "absolute",
		background: "none",
		transition: "all 0.5s ease-in-out",
	},
};

function Home() {
	return (
		<div style={styles.content}>
			{/* <div style={styles.placeholder}>Hello ISOTOPE.WORLD !</div> */}
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<ThreeDimModel fileName={"sword_01.gltf"} scale={0.1} />
				{/* <ThreeDimModel fileName={"NFT_00001.gltf"} /> */}
				{/* <ThreeDimModel fileName={"NFT_00002.gltf"} />
				<ThreeDimModel fileName={"NFT_00003.gltf"} />
				<ThreeDimModel fileName={"NFT_00004.gltf"} />
				<ThreeDimModel fileName={"NFT_00005.gltf"} /> */}
			</div>

			{/* <div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<ThreeDimModel fileName={"NFT_00006.gltf"} />
				<ThreeDimModel fileName={"NFT_00007.gltf"} />
				<ThreeDimModel fileName={"NFT_00008.gltf"} />
				<ThreeDimModel fileName={"NFT_00009.gltf"} />
				<ThreeDimModel fileName={"NFT_00010.gltf"} />
			</div> */}

			<div id="fourth" className="buttonBox">
				<button className="exploreButton">ISOTOPE.WORLD Comming Soon</button>
				<div className="border"></div>
				<div className="border"></div>
				<div className="border"></div>
				<div className="border"></div>
			</div>
		</div>
	);
}

export default Home;
