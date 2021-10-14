import { VRMSchema } from "@pixiv/three-vrm";
import { useRef, Suspense } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";

// Gets settings for Meebits pose here and lets us change that pose
function VRMLooker(props) {
  const vrm = props.vrmFile;
  const headL = props.headLock;

  const { viewport } = useThree();
  const ref = useRef();

  useFrame((state, delta) => {
    const leftArm = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.LeftUpperArm
    );
    leftArm.rotation.x = props.lArmX;
    leftArm.rotation.y = props.lArmY;
    leftArm.rotation.z = props.lArmZ;

    const rightArm = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.RightUpperArm
    );
    rightArm.rotation.x = -props.rArmX;
    rightArm.rotation.y = -props.rArmY;
    rightArm.rotation.z = -props.rArmZ;

    const leftHand = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.LeftLowerArm
    );
    leftHand.rotation.x = props.lHandX;
    leftHand.rotation.y = props.lHandY;
    leftHand.rotation.z = props.lHandZ;

    const rightHand = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.RightLowerArm
    );
    rightHand.rotation.x = props.rHandX;
    rightHand.rotation.y = props.rHandY;
    rightHand.rotation.z = props.rHandZ;

    // Legs
    const leftUpperLeg = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.LeftUpperLeg
    );
    leftUpperLeg.rotation.x = props.leftULegX;
    leftUpperLeg.rotation.y = props.leftULegY;
    leftUpperLeg.rotation.z = props.leftULegZ;

    const leftLowerLeg = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.LeftLowerLeg
    );
    leftLowerLeg.rotation.x = props.leftLLegX;
    leftLowerLeg.rotation.y = props.leftLLegY;
    leftLowerLeg.rotation.z = props.leftLLegZ;

    const rightUpperLeg = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.RightUpperLeg
    );
    rightUpperLeg.rotation.x = props.rightULegX;
    rightUpperLeg.rotation.y = props.rightULegY;
    rightUpperLeg.rotation.z = props.rightULegZ;

    const rightLowerLeg = vrm.humanoid.getBoneNode(
      VRMSchema.HumanoidBoneName.RightLowerLeg
    );
    rightLowerLeg.rotation.x = props.rightLLegX;
    rightLowerLeg.rotation.y = props.rightLLegY;
    rightLowerLeg.rotation.z = props.rightLLegZ;

    const spine = vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Spine);
    spine.rotation.x = props.spX;
    spine.rotation.y = props.spY;
    spine.rotation.z = props.spZ;

    const hips = vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
    hips.rotation.x = props.hX;
    hips.rotation.y = props.hY;
    hips.rotation.z = props.hZ;

    const head = vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head);
    head.rotation.x = props.hdX;
    head.rotation.y = props.hdY;
    head.rotation.z = props.hdZ;
  });

  useFrame((state, delta) => ref.current.update(delta));

  // Meebit's head follows mouse position
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;

    if (vrm && vrm.lookAt) {
      if (headL) {
        const head = vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head);
        head.lookAt(x, -y, 3);
      }
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive object={vrm.scene} />
      <FlyControls ref={ref} />
    </Suspense>
  );
}

export default VRMLooker;
