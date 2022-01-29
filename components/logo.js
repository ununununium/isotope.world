import themeColors from "../theme/theme";
import NextLink from "next/link";
import React, { useState } from "react";

export default function Logo() {
	const [hovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!hovered);
	return (
		<div style={{ display: "flex" }}>
			<NextLink href="/">
				<div
					style={{
						color: themeColors.foreground,
						fontWeight: "bold",
						fontSize: hovered ? 30 : 28,
						fontFamily: "'Oxanium', cursive",
						cursor: "pointer",
						transition: "0.4s",
					}}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
				>
					ISOTOPE.WORLD
				</div>
			</NextLink>
		</div>
	);
}
