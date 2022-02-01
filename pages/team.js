import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

export default function Team() {
	return (
		<div
			style={{
				width: 940,
				height: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<div style={{ width: "30%", height: "100px", background: "red" }}>
				123
			</div>
			<div style={{ width: "30%", height: "100px", background: "red" }}></div>
			<div style={{ width: "30%", height: "100px", background: "red" }}></div>
		</div>
	);
}
