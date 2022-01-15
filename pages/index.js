import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

// export default function Home() {
// 	return <div className={styles.container}>123</div>;
// }

import React, { useState, useEffect } from "react";
import themeColors from "../theme/theme";
import ThreeDimModel from "../components/ThreeDimModel";
import Swords from "../components/Swords";

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
				<Swords />
				{/* <ThreeDimModel scale={1} /> */}
			</div>

			{/* <div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<ThreeDimModel fileName={"Swordium-00006.gltf"} scale={1} />
				<ThreeDimModel fileName={"Swordium-00007.gltf"} scale={1} />
				<ThreeDimModel fileName={"Swordium-00008.gltf"} scale={1} />
				<ThreeDimModel fileName={"Swordium-00009.gltf"} scale={1} />
				<ThreeDimModel fileName={"Swordium-00010.gltf"} scale={1} />
			</div> */}

			<div id="fourth" className="buttonBox">
				<button className="exploreButton">ISOTOPE.WORLD Coming Soon</button>
				<div className="border"></div>
				<div className="border"></div>
				<div className="border"></div>
				<div className="border"></div>
			</div>
		</div>
	);
}

export default Home;
