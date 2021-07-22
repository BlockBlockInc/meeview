import { useState, useEffect } from "react";
import { firestoreRef } from "../utils/firebase";

import Modal from "@material-ui/core/Modal"; 
import Backdrop from "@material-ui/core/Backdrop"; 
import Fade from "@material-ui/core/Fade"; 
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"; 

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center', 
	},
	paper: {
		backgroundColor: theme.palette.common.black, 
		height: 650,
		width: 1100,
        borderRadius: "10px"
	}
}));

function Gallery() {
    const [ poses, setPoses ] = useState([]);
    const [ imgLink, setImgLink ] = useState(); 

    const classes = useStyles();
	const [ open, setOpen ] = useState(false); 
    const [ loading, setLoading ] = useState(false); 

    const handleClick = (link) => {
        setImgLink(link);
	  	setOpen(true); 
    }; 
  
    const handleExit = () => {
		setOpen(false);
    }; 

    const downloadPose = async (pose) => {
        // Set Json, turn into blob and create an object url
        const jsonPose = JSON.stringify(pose);
        const blob = new Blob([[jsonPose]],{ type:'application/json' });
        const href = await URL.createObjectURL(blob);

        // Create anchor tag for download
        const link = document.createElement('a');
        link.href = href;
        link.download = "MeeviewPose.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchGalleryFromStorage = async () => {

            const fileRef = firestoreRef.collection('gallery');

            fileRef.onSnapshot((querySnapshot) => {
                const items = []; 

                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    
                    // Check data 
                    if (data.submitterName === ""){
                        data.submitterName = "MeebitsDao Member"
                    }
                    
                    if(data.meebitName === ""){
                        data.meebitName = "No Name"
                    }

                    if(data.poseName === ""){
                        data.poseName = "No Pose Name"
                    }

                    items.push(data);
                });

                setPoses(items);
            });
        };

        fetchGalleryFromStorage();
        setLoading(true);
    }, []);

    return(
        <div className="m-10">

            <div>
                <Link to="/">
                    <button className="text-md font-nimbus hover:text-gray-600"><u>Home</u></button>
                </Link>

                <div className="border-solid border-black rounded-md">
                    <h1 className="text-2xl font-nimbus mt-5">MEEVIEW GALLERY</h1>
                    <h1 className="text-md font-nimbus mt-1">Poses from the MeebitsDao Community</h1>
                </div>
            </div>

            <div className="flex flex-row flex-wrap">
            {
                poses && poses.map((file, index) => {
                    return(
                        <div className="mt-10 mr-20" key={index}>
                            <div className="bg-white rounded-lg shadow-xl w-80 h-72">
                                <div>
                                    <button onClick={() => handleClick(file.imgFile)}>
                                            <img className="rounded-t-lg object-contain" src={file.imgFile} alt="img"></img>
                                           
                                            <div className="p-3 flex flex-col text-left">
                                                    <h1 className="font-bold text-sm mb-2">Submitted by {file.submitterName}</h1>
                                                    <h1 className="font-semibold text-sm">Meebit's Name: {file.meebitName}</h1>
                                                    <h1 className="font-semibold text-sm">Meebit's Pose: {file.poseName}</h1>   
                                            </div>
                                    </button>

                                    <div>
                                        <button className="font-bold text-sm hover:text-gray-500 pl-3" onClick={() => downloadPose(file.pose)}>Download Pose</button>                                     
                                    </div>
                                </div>

                                <Modal
                                className={classes.modal}
                                open={open}
                                onClose={handleExit}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500, 
                                }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.paper}>						
                                            <img className="rounded-lg" src={imgLink} alt="img"></img>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                    );
                })
            }

            {
                !loading === true ? 
                    <div> 
                        <h1 className="font-nimbus text-md mt-10">Loading...</h1>
                    </div>
                    : null
            }
            </div>
        </div>
    );
}

export default Gallery;



