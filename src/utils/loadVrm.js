import { useState, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM } from "@pixiv/three-vrm";

export const useVrm = () => {
  const [vrm, setVRM] = useState(null);
  const { current: loader } = useRef(new GLTFLoader());

  const loadVrm = (url) => {
    loader.load(
      url,
      async (gltf) => {
        const newModel = await VRM.from(gltf);

        if (vrm) {
          vrm.scene.clear();
        }

        setVRM(newModel);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return { vrm, loadVrm };
};
