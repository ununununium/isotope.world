import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
	useGLTF,
	Detailed,
	OrbitControls,
	Environment,
} from "@react-three/drei";

// Create 800 objects with random position and rotation data
const positions = [...Array(10)].map((_, i) => ({
	index: i + 1,
	position: [
		30 - Math.random() * 60,
		30 - Math.random() * 60,
		30 - Math.random() * 60,
	],
	rotation: [Math.random() * 0, Math.random() * 0.01, Math.random() * 0],
}));

export default function Swords() {
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
					{positions.map((props, i) => (
						<Bust key={i} {...props} />
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
	const str = "00000" + props.index;
	const last5 = str.slice(str.length - 5);
	const fileName = "Swordium-" + last5 + ".gltf";
	console.log("aaa");
	return (
		<Detailed distances={[0, 15, 25, 35, 100]}>
			<Model
				fileName={fileName}
				scale={3}
				position={props.position}
				rotation={props.rotation}
			/>
		</Detailed>
	);
}

const Model = ({ fileName, scale, position, rotation }) => {
	const ref = useRef();
	// const MODEL_NAME = "NFT_00003.gltf";
	const MODEL_NAME = fileName;
	// const MODEL_NAME = "petertesting.glb";
	let gltf = useLoader(GLTFLoader, "../../" + MODEL_NAME);

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
