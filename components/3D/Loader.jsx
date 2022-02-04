import { useProgress, Html } from "@react-three/drei";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function Loader() {
	const { progress } = useProgress();

	return (
		<Html center>
			<Box sx={{ width: 200 }}>
				<LinearProgress variant="determinate" value={progress} />
			</Box>
		</Html>
	);
}

export default Loader;
