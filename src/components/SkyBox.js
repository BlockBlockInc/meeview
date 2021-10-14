import { useThree, useFrame } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import m1 from "../assets/cubemap/n_B.png";
import m2 from "../assets/cubemap/n_D.png";
import m3 from "../assets/cubemap/n_L.png";
import m4 from "../assets/cubemap/p_F.png";
import m5 from "../assets/cubemap/p_R.png";
import m6 from "../assets/cubemap/p_U.png";

function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  // Preload the images for Skybox
  const texture = loader.load([m1, m2, m3, m4, m5, m6]);

  scene.background = texture;
  return null;
}

export default SkyBox;
