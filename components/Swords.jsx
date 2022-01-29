import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
	useGLTF,
	Detailed,
	OrbitControls,
	Environment,
} from "@react-three/drei";
import axios from "axios";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// Create 800 objects with random position and rotation data
const DISPLAY_AMOUNT = 5;
const positions = [...Array(DISPLAY_AMOUNT)].map((_, i) => ({
	index: i + 1,
	position: [(i - DISPLAY_AMOUNT / 2 + 0.5) * 5, 0, 0],
	// position: [
	// 	30 - Math.random() * 60,
	// 	30 - Math.random() * 60,
	// 	30 - Math.random() * 60,
	// ],
	rotation: [0, 0.01, 0],
}));

export default function Swords() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		let res = await axios.get("/GLTF-Paths.json");
		console.log(res.data);
		setData(res.data);
	}, []);

	return (
		<Canvas
			// Quick shortcut for setting up shadow maps
			// shadows
			// Only render on changes and movement
			// frameloop="demand"
			// Pixelratio using window.devicePixelRatio, no less than 1, no higher than 2
			// dpr={[1, 2]}
			camera={{ position: [0, 0, 10] }}
			// Nice trick here, if your scene is static you can switch off shadowmap auto-update for more performance
			// onCreated={({ gl }) => (
			// 	(gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true)
			// )}
			style={{
				background: "rgb(225,235,245)",
				background:
					"linear-gradient(180deg, rgba(225,235,245,1) 0%, rgba(255,208,208,1) 51%, rgba(225,235,245,1) 100%)",
			}}
		>
			<Suspense fallback={null}>
				{/* Let's render 800 Bust components with the data above */}
				{data.length > 0 &&
					positions.map((props, i) => (
						<Bust key={i} {...props} path={data[i]} />
					))}
				<OrbitControls zoomSpeed={0.075} />
				{/* <pointLight position={[0, 0, 0]} intensity={0.5} /> */}
				<spotLight intensity={0.8} position={[0, 10, 60]} />
				<spotLight intensity={0.8} position={[0, -10, -60]} />
				{/* <spotLight intensity={3} position={[10, -10, 30]} /> */}
				{/* <Environment preset="city" /> */}
			</Suspense>
		</Canvas>
	);
}

function Bust(props) {
	return (
		// <Detailed distances={[0, 15, 25, 35, 100]}>
		<Model
			path={props.path}
			scale={3}
			position={props.position}
			rotation={props.rotation}
		/>
		// </Detailed>
	);
}

const Model = ({ path, scale, position, rotation }) => {
	const ref = useRef();

	let gltf = useLoader(GLTFLoader, path);
	// let gltf = useLoader(GLTFLoader, path, (loader) => {
	// 	const dracoLoader = new DRACOLoader();
	// 	dracoLoader.setDecoderPath("/draco-gltf/");
	// 	loader.setDRACOLoader(dracoLoader);
	// });

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

	// const obj = useLoader(OBJLoader, "../../cube_blue.obj");
	// return <primitive object={obj} />;
};
