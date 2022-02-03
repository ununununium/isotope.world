import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import themeColors from "../theme/theme";
import NextLink from "next/link";
import { SWORDIUM_COLLECTION } from "../miscellaneous/Links";
import { MdEmail } from "react-icons/md";

const TeamMemberIntroduction = ({ photo, name, title, children }) => {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				boxShadow: hovered
					? "6px 6px 12px #d0fff0,-6px -6px 12px #d0fff0"
					: "none",
				padding: 20,
				margin: 10,
				transition: "0.4s",
				flex: 1,
			}}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>
			<div
				style={{
					width: 200,
					height: 200,
					borderRadius: 200,
					overflow: "hidden",
					alignSelf: "center",
					marginBottom: 30,
				}}
			>
				<Image src={photo} alt="photo" width={200} height={200} />
			</div>

			<div
				style={{
					fontSize: 30,
				}}
			>
				{name}
			</div>

			<div
				style={{
					fontSize: 18,
					marginBottom: 4,
				}}
			>
				{title}
			</div>
			<div style={{ fontSize: 16 }}>{children}</div>
		</div>
	);
};

const team = () => {
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
						marginTop: 50,
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
							gap: 5,
						}}
					>
						<div
							style={{
								width: 150,
								height: 150,
								borderRadius: 100,
								boxShadow: "6px 6px 12px #bfc8d0,-6px -6px 12px #ffffff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<MdEmail
								style={{ height: 80, width: 80, color: themeColors.foreground }}
							/>
						</div>

						<div style={{ fontSize: 23, color: "#ff7676" }}>EMAIL</div>
						<div style={{ fontSize: 20, color: "black" }}>
							yuting.isotope@gmail.com
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default team;
