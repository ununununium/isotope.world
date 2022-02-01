import Head from "next/head";
import Image from "next/image";
import themeColors from "../theme/theme";

const TeamMemberIntroduction = ({ name, title, children }) => {
	return (
		<div style={{ width: "30%" }}>
			<div
				style={{
					fontSize: 30,
				}}
			>
				{name}
			</div>

			<div
				style={{
					fontSize: 20,
				}}
			>
				{title}
			</div>
			{children}
		</div>
	);
};

const contact = () => {
	return (
		<>
			<div
				style={{
					width: 940,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						background: "",
						fontSize: "50px",
						textAlign: "center",
						marginTop: "50px",
						fontWeight: "500",
						color: themeColors.foreground,
					}}
				>
					Thank you so much for interested in Isotope.World
				</div>

				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "row",
						marginTop: 100,
						justifyContent: "space-between",
					}}
				>
					<TeamMemberIntroduction
						name={"Yuting Zhong"}
						title={"Founder, CEO, CTO"}
					>
						Hey There! Hope you enjoy our product. I am the main software
						engineer in our team. I coded the entire website. I also worked with
						our artist Peter to create the 3D Generative NFT collection
						Swordium. Before I found the ISOTOPE L.L.C. I worked at Amazon as a
						Software Dev Engineer Intern, Maryland Transportation Institue as
						Fullstack Developer and I just graduated from University of Maryland
						College Park.
					</TeamMemberIntroduction>
				</div>
			</div>
		</>
	);
};

export default contact;
