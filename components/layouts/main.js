import Head from "next/head";
import NavBar from "../navbar";
// import Footer from "../footer";
import Box from "@mui/material/Box";
import themeColors from "../../theme/theme";

const Main = ({ children, router }) => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: themeColors.background,
			}}
		>
			<NavBar path={router.asPath} />
			<Box
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					marginTop: "100px",
				}}
			>
				{children}

				{/* <Footer /> */}
			</Box>
		</div>
	);
};

export default Main;
