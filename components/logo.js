import themeColors from "../theme/theme";
import NextLink from "next/link";

export default function Logo() {
	return (
		<div style={{ display: "flex" }}>
			<NextLink href="/">
				<div
					style={{
						color: themeColors.foreground,
						fontWeight: "bold",
						fontSize: "20px",
					}}
				>
					ISOTOPE.WORLD
				</div>
			</NextLink>
		</div>
	);
}
