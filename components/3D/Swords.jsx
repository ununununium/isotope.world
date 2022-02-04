import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Loader from "./Loader";

export default function Swords({ amount, indicies, style }) {
	const DISPLAY_AMOUNT = amount;
	const positions = [...Array(DISPLAY_AMOUNT)].map((_, i) => ({
		index: i + 1,
		position: [(i - DISPLAY_AMOUNT / 2 + 0.5) * DISPLAY_AMOUNT, 0, 0],
		rotation: [0, 0.01, 0],
	}));

	const [data, setData] = useState([]);

	useEffect(async () => {
		let res = await axios.get("/GLTF-Paths.json");
		setData(res.data);
	}, []);

	return (
		<Canvas camera={{ position: [0, 0, 10] }} style={style}>
			<Suspense fallback={<Loader />}>
				{data.length > 0 &&
					amount != 1 &&
					positions.map((props, i) => (
						<Model key={i} {...props} scale={3} path={data[indicies[i]]} />
					))}
				{data.length > 0 && amount === 1 && (
					<Model
						path={data[indicies[0]]}
						scale={3}
						position={[0, 0, 0]}
						rotation={[0, 0.01, 0]}
					/>
				)}
				<OrbitControls zoomSpeed={0.075} />
				<spotLight intensity={0.8} position={[0, 10, 60]} />
				<spotLight intensity={0.8} position={[0, -10, -60]} />
			</Suspense>
		</Canvas>
	);
}

// function Bust(props) {
// 	return (
// 		<Model
// 			path={props.path}
// 			scale={3}
// 			position={props.position}
// 			rotation={props.rotation}
// 		/>
// 	);
// }

const Model = ({ path, scale, position, rotation }) => {
	const ref = useRef();
	let gltf = useLoader(GLTFLoader, path);

	useFrame((state, delta) => {
		ref.current.rotation.x += rotation[0];
		ref.current.rotation.y += rotation[1];
		ref.current.rotation.z += rotation[2];
	});

	return (
		<>
			<primitive
				ref={ref}
				object={gltf.scene}
				scale={scale}
				position={position}
			/>
		</>
	);
};
