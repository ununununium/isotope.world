import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";
import { useRef } from "react";

const Model = ({ fileName, scale, position }) => {
	const ref = useRef();
	// const MODEL_NAME = "NFT_00003.gltf";
	const MODEL_NAME = fileName;
	// const MODEL_NAME = "petertesting.glb";
	let gltf = useLoader(GLTFLoader, MODEL_NAME);

	useFrame((state, delta) => {
		ref.current.rotation.y += 0.01;
		// ref.current.rotation.x += 0.01;
		// ref.current.rotation.z += 0.01;
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

function Light({ brightness, color }) {
	return (
		<rectAreaLight
			width={3}
			height={3}
			color={color}
			intensity={brightness}
			position={[10, 10, 10]}
			lookAt={[0, 0, 0]}
			penumbra={1}
			castShadow
		/>
	);
}

function BackLight({ brightness, color }) {
	return (
		<rectAreaLight
			width={3}
			height={3}
			color={color}
			intensity={brightness}
			position={[10, -5, 10]}
			lookAt={[0, 0, 0]}
			penumbra={1}
			castShadow
		/>
	);
}

export default function ThreeDimModel(props) {
	return (
		<>
			<Canvas style={props.style}>
				<Suspense fallback={null}>
					<Light brightness={0.1} color={"white"} />
					<BackLight brightness={0.1} color={"white"} />
					<Model
						fileName={
							"https://ipfs.moralis.io:2053/ipfs/QmeU7A8tL6cDCzSiUtvTxg8RStk1RQRWGZmEjt1o1JJLHE/swordium/0000000000000000000000000000000000000000000000000000000000000000.gltf"
						}
						scale={props.scale}
						position={[0, 0, 0]}
					/>

					<Model
						fileName={
							"https://ipfs.moralis.io:2053/ipfs/QmeU7A8tL6cDCzSiUtvTxg8RStk1RQRWGZmEjt1o1JJLHE/swordium/0000000000000000000000000000000000000000000000000000000000000001.gltf"
						}
						scale={props.scale}
						position={[1, 0, 0]}
					/>

					<OrbitControls />
					<Environment preset="sunset" background={false} />
				</Suspense>
			</Canvas>
		</>
	);
}
