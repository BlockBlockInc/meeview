import { useSnapshot } from "valtio"; 
import { state } from "../utils/groundState";

// Mesh for ground and ground color 
function Ground(props) {
	const snap = useSnapshot(state);

	return (
		<mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0, 0, 0]}>
			<planeBufferGeometry 
				attach="geometry" 
				args={[100,100]}
			/>
			<meshPhongMaterial
				attach="material"
				color={snap.groundColor}
				roughness={0.4}
			/>
		</mesh>
	);
}

export default Ground; 