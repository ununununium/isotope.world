import themeColors from "../theme/theme";
import NextLink from "next/link";
import React, { useState } from "react";

export default function Logo({ fontSize, fontSizeHovered }) {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);
	return (
		<div style={{ display: "flex" }}>
			<NextLink href="/">
				<div
					style={{
						color: themeColors.foreground,
						fontWeight: "bold",
						fontSize: hovered ? fontSizeHovered : fontSize,
						fontFamily: "'Oxanium', cursive",
						cursor: "pointer",
						transition: "0.4s",
					}}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
				>
					ISOTOPE
				</div>
			</NextLink>
		</div>
	);
}
