import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import themeColors from "../theme/theme";
import NextLink from "next/link";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";
import { MdEmail } from "react-icons/md";
import useWindowSize from "../hooks/useWindowSize";

const Desktop = () => {
	return (
		<>
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: 300,
					background:
						"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(255,208,208,1) 50%, rgba(225,235,245,1) 100%)",
					zIndex: 0,
				}}
			></div>

			<div
				style={{
					width: 940,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					zIndex: 1,
				}}
			>
				<div
					style={{
						marginTop: 100,
						fontSize: 70,
						fontWeight: "bold",
						textAlign: "center",
						color: themeColors.foreground,
					}}
				>
					Contact ISOTOPE
				</div>

				<div
					style={{
						fontSize: 30,
						fontWeight: 400,
						textAlign: "center",
						color: themeColors.foreground,
					}}
				>
					Get in touch with us to get the ball rolling
				</div>

				<div style={{ display: "flex", flexDirection: "row", marginTop: 100 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 10,
						}}
					>
						<div
							style={{
								width: 100,
								height: 100,
								borderRadius: 100,
								boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<MdEmail
								style={{ height: 50, width: 50, color: themeColors.foreground }}
							/>
						</div>

						<div style={{ fontSize: 23, color: "#ff7676" }}>EMAIL</div>
						<div style={{ fontSize: 20, color: "#00ade6" }}>
							yuting.isotope@gmail.com
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const Mobile = () => {
	return (
		<>
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: 300,
					background:
						"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(255,208,208,1) 50%, rgba(225,235,245,1) 100%)",
					zIndex: 0,
				}}
			></div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					zIndex: 1,
				}}
			>
				<div
					style={{
						marginTop: 150,
						fontSize: 40,
						fontWeight: "bold",
						textAlign: "center",
						color: themeColors.foreground,
					}}
				>
					Contact ISOTOPE
				</div>

				<div
					style={{
						fontSize: 18,
						fontWeight: 400,
						textAlign: "center",
						color: themeColors.foreground,
					}}
				>
					Get in touch with us to get the ball rolling
				</div>

				<div style={{ display: "flex", flexDirection: "row", marginTop: 50 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 5,
						}}
					>
						<div
							style={{
								width: 100,
								height: 100,
								borderRadius: 100,
								boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<MdEmail
								style={{ height: 50, width: 50, color: themeColors.foreground }}
							/>
						</div>

						<div style={{ fontSize: 18, color: "#ff7676" }}>EMAIL</div>
						<div style={{ fontSize: 16, color: "black" }}>
							yuting.isotope@gmail.com
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default function contact() {
	const { width } = useWindowSize();

	return width < 940 ? <Mobile /> : <Desktop />;
}
