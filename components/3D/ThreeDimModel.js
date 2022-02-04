import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Suspense } from "react";
import { useRef } from "react";
import Loader from "./Loader";

const Model = ({ fileName, scale, position }) => {
	const ref = useRef();
	let gltf = useLoader(GLTFLoader, fileName);

	useFrame((state, delta) => {
		// ref.current.rotation.x += 0.01;
		ref.current.rotation.y += 0.01;
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
				<Suspense fallback={<Loader />}>
					<Light brightness={0.5} color={"white"} />
					<BackLight brightness={0.5} color={"white"} />

					<Model
						fileName={props.gltf_path}
						scale={props.scale}
						position={[0, 0, 0]}
					/>

					<OrbitControls />
					<Environment preset="sunset" background={false} />
				</Suspense>
			</Canvas>
		</>
	);
}
