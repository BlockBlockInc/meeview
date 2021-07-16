import { Suspense, useState, useEffect } from "react";
import { useVrm } from "../utils/loadVrm";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Sky, Environment } from "@react-three/drei";

import Download from "./Download";
import VRMLooker from "./VRMLooker";
import Ground from "./Ground";
import Picker from "./Picker";

import Slider from "@material-ui/core/Slider";
import Switch from '@material-ui/core/Switch';

import poses from "../poses/poses.json";

import nz from "../assets/cubemap/nz.png";
import nx from "../assets/cubemap/nx.png";
import ny from "../assets/cubemap/ny.png";
import px from "../assets/cubemap/px.png";
import pz from "../assets/cubemap/pz.png";
import py from "../assets/cubemap/py.png";

function Body(props){
    // Meebits that were passed after fetching them
    const meebits = props.meebits;

    // VRM Loader
    const { vrm, loadVrm } = useVrm(); 

    // Settings
	const [ showSettings, setShowSettings ] = useState(false);
	const [ showBodySettings, setShowBodySettings ] = useState(false);
	const [ showMeebitsSettings, setMeebitsSettings ] = useState(); 
    const [ showPoseSettings, setPoseSettings ] = useState(); 

    // Environment 
    const [ rotate, setRotate ] = useState(false);
	const [ sky, setSky ] = useState(false);
	const [ grid, setGrid ] = useState(false);
	const [ stars, setStars ] = useState(false);	
	const [ environment, setEnvironment ] = useState(false);
	const [ ground, setGround ] = useState(true);

    // Lighting  
	const [ skyMieDirectionalG, setSkyMieDirectionalG ] = useState(0.3);
	const [ skyMieCoefficent, setSkyMieCoefficent ] = useState(0.08);
	const [ skyRayleigh, setSkyRayleigh ] = useState(8.7);
	const [ skyTurbidity, setSkyTurbidity ] = useState(8);
	const [ xPos, setXPos ] = useState(-1);
	const [ yPos, setYPos ] = useState(3);
	const [ zPos, setZPos ] = useState(90); 
	const [ ambientLight, setAmbientLight ] = useState(1);

    // Camera
	const [ dirLX, setDirLX ] = useState(3.5); 	
	const [ dirLY, setDirLY ] = useState(8.5); 
	const [ dirLZ, setDirLZ ] = useState(2); 

    // Head
	const [ head, setHead ] = useState(false);

    // Left Arms
	const [ lArmPosX, setlArmPosX ] = useState(0); 
	const [ lArmPosY, setlArmPosY ] = useState(0); 
	const [ lArmPosZ, setlArmPosZ ] = useState(0); 
	const [ lHandPosX, setlHandPosX ] = useState(0); 
	const [ lHandPosY, setlHandPosY ] = useState(0); 
	const [ lHandPosZ, setlHandPosZ ] = useState(0); 

    // Right Arms
	const [ rArmPosX, setrArmPosX ] = useState(0);
	const [ rArmPosY, setrArmPosY ] = useState(0);
	const [ rArmPosZ, setrArmPosZ ] = useState(0);
	const [ rHandPosX, setrHandPosX ] = useState(0); 
	const [ rHandPosY, setrHandPosY ] = useState(0); 
	const [ rHandPosZ, setrHandPosZ ] = useState(0); 

    // Left Leg 
	const [ leftUpperLegX, setlUpperLegX ] = useState(0);
	const [ leftUpperLegY, setlUpperLegY ] = useState(0);
	const [ leftUpperLegZ, setlUpperLegZ ] = useState(0);
	const [ leftLowerLegX, setlLowerLegX ] = useState(0);
	const [ leftLowerLegY, setlLowerLegY ] = useState(0);
	const [ leftLowerLegZ, setlLowerLegZ ] = useState(0);

    // Right Leg
	const [ rightUpperLegX, setrUpperLegX ] = useState(0);
	const [ rightUpperLegY, setrUpperLegY ] = useState(0);
	const [ rightUpperLegZ, setrUpperLegZ ] = useState(0);
	const [ rightLowerLegX, setrLowerLegX ] = useState(0);
	const [ rightLowerLegY, setrLowerLegY ] = useState(0);
	const [ rightLowerLegZ, setrLowerLegZ ] = useState(0);

    // Back
	const [ spineX, setSpineX ] = useState(0);
	const [ spineY, setSpineY ] = useState(0);
	const [ spineZ, setSpineZ ] = useState(0);

    // Hips 
	const [ hipX, setHipX ] = useState(0);
	const [ hipY, setHipY ] = useState(0);
	const [ hipZ, setHipZ ] = useState(0);

    // Head
	const [ headX, setHeadX ] = useState(0);
	const [ headY, setHeadY ] = useState(0);
	const [ headZ, setHeadZ ] = useState(0);

    // Handles slider changes 
	const handleRotate = (e) => {
		setRotate(e.target.checked);
	};

	const handleSky = (e) => {
		setSky(e.target.checked);
	};

	const handleGrid = (e) => {
		setGrid(e.target.checked);
	};

	const handleStars = (e) => {
		setStars(e.target.checked);
	};

	const handleSkyMieDirectionalG = (e, nv) => {
		setSkyMieDirectionalG(nv);
	};
	
	const handleSkyMieCoefficient = (e, nv) => {
		setSkyMieCoefficent(nv);
	};	

	const handleSkyRayleigh = (e, nv) => {
		setSkyRayleigh(nv);
	};

	const handleSkyTurbidity = (e, nv) => {
		setSkyTurbidity(nv);
	};
	
	const handleXPos = (e,nv) => {
		setXPos(nv);
	};

	const handleYPos = (e,nv) => {
		setYPos(nv);
	};

	const handleZPos = (e,nv) => {
		setZPos(nv);
	};

	const handleAmbientLight = (e,nv) => {
		setAmbientLight(nv);
	};	
	
	const handleDirLX = (e,nv) => {
		setDirLX(nv);
	};

	const handleDirLY = (e,nv) => {
		setDirLY(nv);
	};

	const handleDirLZ = (e,nv) => {
		setDirLZ(nv);
	};

	const handleEnvironment = (e) => {
		setEnvironment(e.target.checked);
	};

	const handleGround = (e) => {
		setGround(e.target.checked);
	};

	const handleHead = (e) => {
		setHead(e.target.checked);
	};

	const handleLArmPosX = (e,nv) => {
		setlArmPosX(nv);
	};

	const handleLArmPosY = (e,nv) => {
		setlArmPosY(nv);
	};

	const handleLArmPosZ = (e,nv) => {
		setlArmPosZ(nv);
	};

	const handleLHandPosX = (e,nv) => {
		setlHandPosX(nv);
	};

	const handleLHandPosY = (e,nv) => {
		setlHandPosY(nv);
	};

	const handleLHandPosZ = (e,nv) => {
		setlHandPosZ(nv);
	};

	const handleRArmPosX = (e,nv) => {
		setrArmPosX(nv);
	};	

	const handleRArmPosY = (e,nv) => {
		setrArmPosY(nv);
	};	

	const handleRArmPosZ = (e,nv) => {
		setrArmPosZ(nv);
	};	

	const handleRHandPosX = (e,nv) => {
		setrHandPosX(nv);
	};	

	const handleRHandPosY = (e,nv) => {
		setrHandPosY(nv);
	};	

	const handleRHandPosZ = (e,nv) => {
		setrHandPosZ(nv);
	};	

	const handleLUpperLegPosX = (e,nv) => {
		setlUpperLegX(nv);
	};

	const handleLUpperLegPosY = (e,nv) => {
		setlUpperLegY(nv);
	};

	const handleLUpperLegPosZ = (e,nv) => {
		setlUpperLegZ(nv);
	};

	const handleLLowerLegPosX = (e,nv) => {
		setlLowerLegX(nv);
	};

	const handleLLowerLegPosY = (e,nv) => {
		setlLowerLegY(nv);
	};

	const handleLLowerLegPosZ = (e,nv) => {
		setlLowerLegZ(nv);
	};

	const handleRUpperLegPosX = (e,nv) => {
		setrUpperLegX(nv);
	};

	const handleRUpperLegPosY = (e,nv) => {
		setrUpperLegY(nv);
	};

	const handleRUpperLegPosZ = (e,nv) => {
		setrUpperLegZ(nv);
	};

	const handleRLowerLegPosX = (e,nv) => {
		setrLowerLegX(nv);
	};

	const handleRLowerLegPosY = (e,nv) => {
		setrLowerLegY(nv);
	};

	const handleRLowerLegPosZ = (e,nv) => {
		setrLowerLegZ(nv);
	};

	const handleSpineX = (e,nv) => {
		setSpineX(nv);
	};

	const handleSpineY = (e,nv) => {
		setSpineY(nv);
	};

	const handleSpineZ = (e,nv) => {
		setSpineZ(nv);
	}

	const handleHipX = (e,nv) => {
		setHipX(nv);
	};

	const handleHipY = (e,nv) => {
		setHipY(nv);
	};

	const handleHipZ = (e,nv) => {
		setHipZ(nv);
	}

	const handleHeadX = (e,nv) => {
		setHeadX(nv);
	};

	const handleHeadY = (e,nv) => {
		setHeadY(nv);
	};

	const handleHeadZ = (e,nv) => {
		setHeadZ(nv);
	}

    // Set deafult Pose Settings 
    const defaultPoseSettings = () => {
        //left Arms 
        setlArmPosX(0); 
        setlArmPosY(0); 
	    setlArmPosZ(0); 
	    setlHandPosX(0); 
	    setlHandPosY(0); 
	    setlHandPosZ(0); 

        // Right Arms
        setrArmPosX(0);
	    setrArmPosY(0);
	    setrArmPosZ(0);
	    setrHandPosX(0); 
	    setrHandPosY(0); 
	    setrHandPosZ(0); 

        // Left Leg 
	    setlUpperLegX(0);
	    setlUpperLegY(0);
	    setlUpperLegZ(0);
	    setlLowerLegX(0);
	    setlLowerLegY(0);
	    setlLowerLegZ(0);

        // Right Leg
	    setrUpperLegX(0);
	    setrUpperLegY(0);
	    setrUpperLegZ(0);
	    setrLowerLegX(0);
	    setrLowerLegY(0);
        setrLowerLegZ(0);

         // Back
        setSpineX(0);
        setSpineY(0);
        setSpineZ(0);

        // Hips 
	    setHipX(0);
        setHipY(0);
        setHipZ(0);

        // Head
	    setHeadX(0);
        setHeadY(0);
        setHeadZ(0);
    };

    // Handle Pose Settings 
    const handlePoseSettings = (pose) => {
        console.log(pose);
        // Set to default, then change the settings 
        defaultPoseSettings();

        //left Arms 
        setlArmPosX(pose.lArmPosX); 
        setlArmPosY(pose.lArmPosY); 
	    setlArmPosZ(pose.lArmPosZ); 
	    setlHandPosX(pose.lHandPosX); 
	    setlHandPosY(pose.lHandPosY); 
	    setlHandPosZ(pose.lHandPosZ); 

        // Right Arms
        setrArmPosX(pose.rArmPosX);
	    setrArmPosY(pose.rArmPosY);
	    setrArmPosZ(pose.rArmPosZ);
	    setrHandPosX(pose.rHandPosX); 
	    setrHandPosY(pose.rHandPosY); 
	    setrHandPosZ(pose.rHandPosZ); 

        // Left Leg 
	    setlUpperLegX(pose.leftUpperLegX);
	    setlUpperLegY(pose.leftUpperLegY);
	    setlUpperLegZ(pose.leftUpperLegZ);
	    setlLowerLegX(pose.leftLowerLegX);
	    setlLowerLegY(pose.leftLowerLegY);
	    setlLowerLegZ(pose.leftLowerLegZ);

        // Right Leg
	    setrUpperLegX(pose.rightUpperLegX);
	    setrUpperLegY(pose.rightUpperLegY);
	    setrUpperLegZ(pose.rightUpperLegZ);
	    setrLowerLegX(pose.rightLowerLegX);
	    setrLowerLegY(pose.rightLowerLegY);
        setrLowerLegZ(pose.rightLowerLegZ);

         // Back
        setSpineX(pose.spineX);
        setSpineY(pose.spineY);
        setSpineZ(pose.spineZ);

        // Hips 
	    setHipX(pose.hipX);
        setHipY(pose.hipY);
        setHipZ(pose.hipZ);

        // Head
	    setHeadX(pose.headX);
        setHeadY(pose.headY);
        setHeadZ(pose.headZ);
    };

    // TODO: Set a random pose 
    const getRandomPose = (pose) => {
    };

	const handleSettings = (settings) =>  {
		console.log(settings);

		if(settings === 'body'){
			setShowBodySettings(true);
			setShowSettings(false);
			setMeebitsSettings(false);
            setPoseSettings(false);
			if(showBodySettings === true){
				setShowBodySettings(false);
			}
		}else if (settings === 'background'){
			setShowSettings(true);
			setShowBodySettings(false);
			setMeebitsSettings(false);
            setPoseSettings(false);
			if(showSettings === true){
				setShowSettings(false);
			}
		}else if (settings === 'meebits'){
			setMeebitsSettings(true);
			setShowBodySettings(false);
			setShowSettings(false);
            setPoseSettings(false);
			if(showMeebitsSettings === true){
				setMeebitsSettings(false);
			}
		}else if (settings == 'pose'){
            setPoseSettings(true);
            setMeebitsSettings(false);
			setShowBodySettings(false);
			setShowSettings(false);
            if(showPoseSettings === true){
                setPoseSettings(false);
            }
        }
	};

    const changeVrm = (event) => {
		loadVrm(window.URL.createObjectURL(meebits[event.target.id]));
	};

    useEffect(() => {
		if(meebits !== undefined) {
			loadVrm(window.URL.createObjectURL(meebits[0]));
		}
	}, [meebits]);

    return (
        <div className="flex">
            <div id="screenshot" className="relative z-0 w-full h-screen">
                <Canvas 
                    pixelRatio={window.devicePixelRatio}
                    gl={{antialias:true, preserveDrawingBuffer:true}}
                    gl2={true}
                    linear={true}
                    flat={true}
                    colorManagement={false}
                    concurrect={true}
                    shadows={true}
                    camera={{position: [0,-5,-1], fov: 50}}
                    frameloop="always"
                    concurrent
                >

                <VRMLooker 
                    vrmFile={vrm} 
                    headLock={head} 
                    lArmX={lArmPosX}  
                    lArmY={lArmPosY}  
                    lArmZ={lArmPosZ}  
                    lHandX={lHandPosX}  
                    lHandY={lHandPosY}  
                    lHandZ={lHandPosZ}  
                    rArmX={rArmPosX} 
                    rArmY={rArmPosY} 
                    rArmZ={rArmPosZ} 
                    rHandX={rHandPosX} 
                    rHandY={rHandPosY} 
                    rHandZ={rHandPosZ} 
                    leftULegX={leftUpperLegX}
                    leftULegY={leftUpperLegY}
                    leftULegZ={leftUpperLegZ}
                    leftLLegX={leftLowerLegX}
                    leftLLegY={leftLowerLegY}
                    leftLLegZ={leftLowerLegZ}
                    rightULegX={rightUpperLegX}
                    rightULegY={rightUpperLegY}
                    rightULegZ={rightUpperLegZ}
                    rightLLegX={rightLowerLegX}
                    rightLLegY={rightLowerLegY}
                    rightLLegZ={rightLowerLegZ}
                    spX={spineX}
                    spY={spineY}
                    spZ={spineZ}
                    hX={hipX}
                    hY={hipY}
                    hZ={hipZ}
                    hdX={headX}
                    hdY={headY}
                    hdZ={headZ}
                />
                
                {
                    ground === true ? <Ground /> : null
                }
                    
                <OrbitControls 
                enablePan={true} 
                minPolarAngle={0.5}
                maxPolarAngle={1.5}
                enableZoom={true}
                autoRotate={rotate}
                />

                {
                    grid === true ? <gridHelper args={[100,50]} /> : null
                }

                {
                    stars === true ? <Stars radius={20} 
                        depth={250}
                        count={5000}
                        factor={10}
                        saturation={100}
                        fade
                        /> : null
                }

                {
                    sky === true ? <Sky 
                        distance={450000}
                        sunPosition={[xPos, yPos, zPos]} 
                        mieCoefficient={skyMieCoefficent}
                        mieDirectionalG={skyMieDirectionalG}
                        rayleigh={skyRayleigh}
                        turbidity={skyTurbidity}
                        /> : null
                }

                {
                    environment === true ? 
                        <Suspense fallback={null}>
                            <Environment 
                                background={environment}
                                files={[px,nx,py,ny,pz,nz]}
                                preset={null}
                            /> 
                        </Suspense> : null
                }	

                <ambientLight intensity={ambientLight} />
                <directionalLight position={[dirLX,dirLY,dirLZ]} />
                </Canvas>
            </div>

        <div className="absolute z-20 top-3 right-3">
            <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                onClick={() => handleSettings('background')}>
                <span>Background</span>
            </button>
        </div>

            {showSettings === true ? 

            <div className="absolute z-20 top-24 right-3 w-auto bg-gray-100 rounded-lg mt-5 mr-2 h-5/6 overflow-auto">
                <div className="m-5"> 
                    <h1 className="font-nimbus text-lg font-bold text-left">Background Settings</h1>

                    <div className="flex">
                        <div className="mt-3">
                            <h1 className="font-nimbus text-md font-bold">Rotate</h1>
                            <Switch checked={rotate} onChange={handleRotate} />

                            <h1 className="font-nimbus text-md font-bold">Grid</h1>
                            <Switch checked={grid} onChange={handleGrid} />

                            <h1 className="font-nimbus text-md font-bold">Stars</h1>
                            <Switch checked={stars} onChange={handleStars} />

                            <h1 className="font-nimbus text-md font-bold">Sky</h1>
                            <Switch checked={sky} onChange={handleSky} />

                            <h1 className="font-nimbus text-md font-bold">x position</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={-50}
                                max={50}
                                step={1}
                                value={xPos}
                                onChange={handleXPos}
                            />

                            <h1 className="font-nimbus text-md font-bold">y position</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={-5}
                                max={10}
                                step={1}
                                value={yPos}
                                onChange={handleYPos}
                            />

                            <h1 className="font-nimbus text-md font-bold">z position</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={200}
                                step={1}
                                value={zPos}
                                onChange={handleZPos}
                            />

                            <h1 className="font-nimbus text-md font-bold">mieDirectionalG</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={1}
                                step={0.001}
                                value={skyMieDirectionalG}
                                onChange={handleSkyMieDirectionalG}
                            />

                            <h1 className="font-nimbus text-md font-bold">mieCoefficient</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={0.1}
                                step={0.001}
                                value={skyMieCoefficent}
                                onChange={handleSkyMieCoefficient}
                            />

                            <h1 className="font-nimbus text-md font-bold">Rayleigh</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                                step={0.5}
                                value={skyRayleigh}
                                onChange={handleSkyRayleigh}
                            />

                            <h1 className="font-nimbus text-md font-bold">Turbidity</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                                step={0.5}
                                value={skyTurbidity}	
                                onChange={handleSkyTurbidity}
                            />

                        </div>

                        <div className="mt-3 ml-10 mr-5">
                            <h1 className="font-nimbus text-md font-bold">Ambient Light</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={1}
                                step={0.05}
                                value={ambientLight}	
                                onChange={handleAmbientLight}
                            />

                            <h1 className="font-nimbus text-md font-bold">Directional Light</h1>

                            <h1 className="font-nimbus text-md font-bold">x</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                                step={0.5}
                                value={dirLX}	
                                onChange={handleDirLX}
                            />

                            <h1 className="font-nimbus text-md font-bold">y</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                                step={0.5}
                                value={dirLY}	
                                onChange={handleDirLY}
                            />

                            <h1 className="font-nimbus text-md font-bold">z</h1>
                            <Slider 
                                valueLabelDisplay="auto"
                                min={-10}
                                max={10}
                                step={0.5}
                                value={dirLZ}
                                onChange={handleDirLZ}
                            />


                            <h1 className="font-nimbus text-md font-bold">Ground</h1>
                            <Switch checked={ground} onChange={handleGround} />
                            
                            <h1 className="font-nimbus text-md font-bold">Ground Color</h1>
                            <Picker />

                            <h1 className="font-nimbus text-md font-bold mt-5">Background</h1>
                            <Switch checked={environment} onChange={handleEnvironment} />
                        </div>
                    </div>
                </div>
            </div> : null 
            }

        <div className="absolute z-20 top-16 right-3">
            <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                onClick={() => handleSettings('body')}>
                <span>Body</span>
            </button>
        </div>

        {
            showBodySettings === true ? 

                <div className="absolute z-20 top-24 right-3 w-auto bg-gray-100 rounded-lg mt-5 mr-2 overflow-auto h-5/6 max-w-lg">
                    <div className="m-5"> 
                        <h1 className="font-nimbus text-lg text-left">Body Settings</h1>
                        <div className="flex">
                            <div className="mt-3 w-48">
                                <h1 className="font-nimbus text-sm">Left Upper Arm</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-2}
                                    max={2}
                                    step={0.005}
                                    value={lArmPosX}	
                                    onChange={handleLArmPosX}
                                />

                                <h1 className="font-nimbus text-sm font-bold">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.4}
                                    max={2}
                                    step={0.005}
                                    value={lArmPosY}	
                                    onChange={handleLArmPosY}
                                />

                                <h1 className="font-nimbus text-sm font-bold">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={5}
                                    max={7.6}
                                    step={0.005}
                                    value={lArmPosZ}	
                                    onChange={handleLArmPosZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Left Lower Arm</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>

                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-0.96}
                                    max={2}
                                    step={0.005}
                                    value={lHandPosX}	
                                    onChange={handleLHandPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-2}
                                    max={0.4}
                                    step={0.005}
                                    value={lHandPosY}	
                                    onChange={handleLHandPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={6.5}
                                    max={9.8}
                                    step={0.005}
                                    value={lHandPosZ}	
                                    onChange={handleLHandPosZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Right Upper Arm</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.2}
                                    max={1.4}
                                    step={0.005}
                                    value={rArmPosX}	
                                    onChange={handleRArmPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.2}
                                    max={1.4}
                                    step={0.005}
                                    value={rArmPosY}	
                                    onChange={handleRArmPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.2}
                                    max={1.4}
                                    step={0.005}
                                    value={rArmPosZ}	
                                    onChange={handleRArmPosZ}
                                />
                                
                                <h1 className="font-nimbus text-sm mt-5">Right Lower Arm</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={2}
                                    step={0.005}
                                    value={rHandPosX}	
                                    onChange={handleRHandPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.2}
                                    max={1.4}
                                    step={0.005}
                                    value={rHandPosY}	
                                    onChange={handleRHandPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1.2}
                                    max={1.4}
                                    step={0.005}
                                    value={rHandPosZ}	
                                    onChange={handleRHandPosZ}
                                />
                            </div>

                            <div className="mt-3 ml-5 mr-5 w-48">
                                <h1 className="font-nimbus text-sm">Left Upper Leg</h1>

                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-2}
                                    max={2}
                                    step={0.005}
                                    value={leftUpperLegX}	
                                    onChange={handleLUpperLegPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={leftUpperLegY}	
                                    onChange={handleLUpperLegPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={leftUpperLegZ}	
                                    onChange={handleLUpperLegPosZ}
                                />
                                
                                <h1 className="font-nimbus text-sm mt-5">Left Lower Leg</h1>

                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-2}
                                    max={1}
                                    step={0.005}
                                    value={leftLowerLegX}	
                                    onChange={handleLLowerLegPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={leftLowerLegY}	
                                    onChange={handleLLowerLegPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={leftLowerLegZ}	
                                    onChange={handleLLowerLegPosZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Right Upper Leg</h1>

                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={rightUpperLegX}	
                                    onChange={handleRUpperLegPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={rightUpperLegY}	
                                    onChange={handleRUpperLegPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.005}
                                    value={rightUpperLegZ}	
                                    onChange={handleRUpperLegPosZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Right Lower Leg</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-2}
                                    max={1}
                                    step={0.001}
                                    value={rightLowerLegX}	
                                    onChange={handleRLowerLegPosX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={0}
                                    step={0.001}
                                    value={rightLowerLegY}	
                                    onChange={handleRLowerLegPosY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={rightLowerLegZ}	
                                    onChange={handleRLowerLegPosZ}
                                />
                            </div>

                            <div className="mt-3">
                                <h1 className="font-nimbus text-sm">Spine</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={spineX}	
                                    onChange={handleSpineX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={spineY}	
                                    onChange={handleSpineY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={spineZ}	
                                    onChange={handleSpineZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Hip</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={hipX}	
                                    onChange={handleHipX}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={hipY}	
                                    onChange={handleHipY}
                                />

                                <h1 className="font-nimbus text-sm">Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={hipZ}	
                                    onChange={handleHipZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Head</h1>
                                <h1 className="font-nimbus text-sm mt-2">X</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-0.7}
                                    max={1}
                                    step={0.001}
                                    value={headX}	
                                    onChange={handleHeadX}
                                />

                                <h1 className="font-nimbus text-sm"> Y</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-1}
                                    max={1}
                                    step={0.001}
                                    value={headY}	
                                    onChange={handleHeadY}
                                />

                                <h1 className="font-nimbus text-sm">Z</h1>
                                <Slider 
                                    valueLabelDisplay="auto"
                                    min={-0.4}
                                    max={0.4}
                                    step={0.001}
                                    value={headZ}	
                                    onChange={handleHeadZ}
                                />

                                <h1 className="font-nimbus text-sm mt-5">Lock Head</h1>
                                <Switch checked={head} onChange={handleHead} />
                            </div>
                        </div>
                    </div>
                </div> : null 
            } 

            <div className="absolute z-20 top-3 left-3">
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                    onClick={() => handleSettings('meebits')}>
                    <span>Meebits</span>
                </button>
            </div>

            {
                showMeebitsSettings === true ? 
                    <div className="absolute z-20 top-28 left-3 w-auto bg-gray-100 rounded-lg mr-2 overflow-auto max-w-lg">
                        <div className="m-5"> 
                            <h1 className="font-nimbus text-lg text-left mb-5">Your Meebits</h1>
                                {
                                    meebits.map((file, index) => 
                                        <div className="flex mb-2">
                                            <button className="font-nimbus hover:text-gray-500" id={index} onClick={(e) => changeVrm(e)}>{file.name}</button>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                    : null
            }

            <div className="absolute z-20 top-16 left-3">
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                    onClick={() => handleSettings('pose')}>
                    <span>Poses</span>
                </button>
            </div>

            {
                showPoseSettings === true ? 
                    <div className="absolute z-20 top-28 left-3 w-auto bg-gray-100 rounded-lg mr-2 overflow-auto max-w-lg">
                        <div className="m-5"> 
                            <h1 className="font-nimbus text-lg text-left mb-5">Poses</h1>
                                {
                                    poses.map((action, index) => 
                                        <div className="flex mb-2" key={index}>
                                            <button className="font-nimbus hover:text-gray-500" onClick={() => handlePoseSettings(action)}>{action.pose}</button>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                    : null
            }

            <div className="absolute z-20 top-3 left-40">
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                    onClick={() => defaultPoseSettings()}>
                    <span>Reset</span>
                </button>
            </div>

            <div className="absolute z-20 top-16 left-40">
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-32 rounded-full" 
                    onClick={() => getRandomPose(Math.floor(Math.random()*2))}>
                    <span>Random Pose</span>
                </button>
            </div>

            <Download />
        </div>
    );
	
}

export default Body; 
