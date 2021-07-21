import { useState, useEffect } from "react";
import { firestoreRef } from "../utils/firebase";

import Modal from "@material-ui/core/Modal"; 
import Backdrop from "@material-ui/core/Backdrop"; 
import Fade from "@material-ui/core/Fade"; 
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center', 
	},
	paper: {
		backgroundColor: theme.palette.common.black, 
		height: 700,
		width: 1400,
		borderRadius: '15px'
	}
}));

function Gallery() {
    const [ poses, setPoses ] = useState([]);

    const classes = useStyles();
	const [open, setOpen] = useState(false); 

    const handleClick = () => {
	  	setOpen(true); 
    }; 
  
    const handleExit = () => {
		setOpen(false);
    }; 

    useEffect(() => {
        const fetchGalleryFromStorage = async () => {

            const fileRef = firestoreRef.collection('gallery');

            fileRef.onSnapshot((querySnapshot) => {
                const items = []; 
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });

                setPoses(items);
            });
        };

        fetchGalleryFromStorage();
    }, []);


    return(
        <div className="m-10">

            <div>
                <h1 className="text-2xl font-nimbus">MEEVIEW GALLERY</h1>
                <h1 className="text-md font-nimbus mt-1">Poses from the MeebitsDao Community</h1>
            </div>

            <div className="flex flex-row flex-wrap">
            {
                poses && poses.map((file, index) => {
                    return(
                        <div className="mt-10 mr-20" key={index}>
                            <div className="bg-white rounded-lg shadow-lg">
                                <button onClick={handleClick}>
                                        <img className="rounded-t-lg object-contain h-40" src={file.url}></img>
                                        
                                        <div className="p-3 flex flex-col text-left">
                                                <h1 className="font-nimbus text-xl mb-3">Submitted by {file.submitter}</h1>
                                                <h1 className="font-nimbus text-md text-gray-700">Meebit's Name: {file.name}</h1>
                                                <h1 className="font-nimbus text-md text-gray-700">Meebit's Pose: {file.pose}</h1>                                        
                                        </div>
                                </button>
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
                                        <img className="rounded-lg" src={file.url}></img>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    );
                })
            }

            </div>
            
        </div>
    );
}

export default Gallery;



