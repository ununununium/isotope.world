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

// Create 800 objects with random position and rotation data
const positions = [...Array(100)].map((_, i) => ({
	index: i + 1,
	position: [
		30 - Math.random() * 60,
		30 - Math.random() * 60,
		30 - Math.random() * 60,
	],
	rotation: [Math.random() * 0, Math.random() * 0.01, Math.random() * 0],
}));

export default function Swords() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		console.log("hi");
		let res = await axios.get("/Uploaded-IPFS-Paths.json");
		console.log(res.data);
		setData(res.data);
	}, []);

	return (
		// <Suspense fallback={<span>loading...</span>}>
		<>
			<Canvas
				// Quick shortcut for setting up shadow maps
				shadows
				// Only render on changes and movement
				frameloop="demand"
				// Pixelratio using window.devicePixelRatio, no less than 1, no higher than 2
				dpr={[1, 2]}
				camera={{ position: [0, 0, 40] }}
				// Nice trick here, if your scene is static you can switch off shadowmap auto-update for more performance
				onCreated={({ gl }) => (
					(gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true)
				)}
			>
				<Suspense fallback={null}>
					{/* Let's render 800 Bust components with the data above */}
					{data.length > 0 &&
						positions.map((props, i) => (
							<Bust key={i} {...props} path={data[i].path} />
						))}
					<OrbitControls zoomSpeed={0.075} />
					<pointLight position={[0, 0, 0]} intensity={0.5} />
					<spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
					<Environment preset="city" />
				</Suspense>
			</Canvas>
		</>

		// </Suspense>
	);
}

function Bust(props) {
	return (
		<Detailed distances={[0, 15, 25, 35, 100]}>
			<Model
				path={props.path}
				scale={3}
				position={props.position}
				rotation={props.rotation}
			/>
		</Detailed>
	);
}

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

	// const obj = useLoader(OBJLoader, "../../cube_blue.obj");
	// return <primitive object={obj} />;
};
