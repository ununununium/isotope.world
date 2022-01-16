import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";
import { useRef } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Model = ({ fileName, scale, position }) => {
	const ref = useRef();

	let gltf = useLoader(GLTFLoader, fileName);
	// let gltf = useLoader(GLTFLoader, fileName, (loader) => {
	// 	const dracoLoader = new DRACOLoader();
	// 	dracoLoader.setDecoderPath("/draco-gltf/");
	// 	loader.setDRACOLoader(dracoLoader);
	// });
	useFrame((state, delta) => {
		// ref.current.rotation.x += 0.01;
		ref.current.rotation.y += 0.01;
		// ref.current.rotation.z += 0.01;
	});
	// const { nodes, materials } = useGLTF(fileName);
	// console.log(nodes);
	// return (
	// 	<mesh
	// 		receiveShadow
	// 		castShadow
	// 		geometry={nodes["Stone-3191"].geometry}
	// 		material={materials.default}
	// 		material-envMapIntensity={0.25}
	// 	/>
	// );
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
						fileName={"../../../Poimandres.gltf"}
						scale={props.scale}
						position={[0, 0, 0]}
					/>

					{/* <Model
						fileName={
							"https://ipfs.moralis.io:2053/ipfs/QmeU7A8tL6cDCzSiUtvTxg8RStk1RQRWGZmEjt1o1JJLHE/swordium/0000000000000000000000000000000000000000000000000000000000000001.gltf"
						}
						scale={props.scale}
						position={[0, 0, 0]}
					/> */}

					<OrbitControls />
					<Environment preset="sunset" background={false} />
				</Suspense>
			</Canvas>
		</>
	);
}
