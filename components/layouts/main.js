import Head from "next/head";
import NavBar from "../navbar";
// import Footer from "../footer";
// import Box from "@mui/material/Box";
import themeColors from "../../theme/theme";

const Main = ({ children, router }) => {
	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				backgroundColor: themeColors.background,
			}}
		>
			<NavBar path={router.asPath} />
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					marginTop: "100px",
					alignItems: "center",
					backgroundColor: themeColors.background,
					position: "relative",
					minHeight: "87vh",
				}}
			>
				{children}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
				}}
			>
				Copyright © 2022 Isotope LLC. All rights reserved.
			</div>
		</div>
	);
};

export default Main;
