import { Suspense, useState } from "react";
import html2canvas from "html2canvas";

import Modal from "@material-ui/core/Modal"; 
import Backdrop from "@material-ui/core/Backdrop"; 
import Fade from "@material-ui/core/Fade"; 
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

import {firebaseStorageRef, firestoreRef}  from '../utils/firebase'
import defaultPose from "../poses/defaultPose.json";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center', 
	},
	paper: {
		backgroundColor: theme.palette.common.black,
		height: 380,
		width: 700,
		padding: theme.spacing(2, 4, 3),
		borderRadius: '15px'
	}
}));

function Download(props) {

	let latestPose = props.pose;

	// State for input form
	const [ submitterName, setSubmitterName ] = useState("");
	const [ meebitName, setMeebitName ] = useState("");
	const [ poseName, setPoseName ] = useState("");

	// Modal Stuff
	const classes = useStyles();
	const [open, setOpen] = useState(false); 

	// SnackBar 
	const [ openSB, setOpenSB ] = useState(false); 
	const [ openSBError, setOpenSBError ] = useState(false); 

    const handleClick = () => {
	  	setOpen(true); 
    }; 
  
    const handleExit = () => {
		setOpen(false);
    }; 

	// Snackbars
	const handleSnackBarClose = () => {
		setOpenSB(false);
	};

	const handleSnackBarErrorClose = () => {
		setOpenSBError(false);
	};


	const takeScreenshot = async () => {
 		const canvas = await html2canvas(document.querySelector("#screenshot"), {
			scale: 5
		});
	
	    canvas.style.display = "none";
	    document.body.appendChild(canvas);
		
		const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

		const a = document.createElement("a");
		a.setAttribute("download", "Meeview.png");
		a.setAttribute("href", image);
		a.click();
	
		canvas.remove();

		return image; 
	};

	const submitForm = async (event) => {
		event.preventDefault();

		// Set a default pose if the pose is undefined
		if(latestPose === undefined){
			latestPose = defaultPose[0];
		}

		const img = await takeScreenshot(); 

		let randomImageUID =  Math.floor(Math.random() * Date.now()).toString();

		// Add image to firebase storage
		var uploadImage = firebaseStorageRef.ref(`/gallery/${"galleryImage_" + randomImageUID}`).putString(img, 'data_url');

        uploadImage.on('state_changed', (snapshot) => {
            console.log('Uploading');
        }, (error) => {
            console.log('Error Uploading Image');
			setOpenSBError(true);
        }, () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {

                const payload = {
                    'submitterName': submitterName,
                    'meebitName': meebitName, 
                    'poseName': poseName, 
					'pose': latestPose,
                    'imgFile': downloadURL
                };

				let randomUID =  Math.floor(Math.random() * Date.now()).toString();
								
                firestoreRef.collection('gallery').doc(randomUID).set(payload).then(()=>{
                    console.log("Uploaded");
                });
                
            });
        });

		// Open snackbar
		setOpenSB(true);

		setSubmitterName("");
		setMeebitName("");
		setPoseName("");

		handleExit();
	};

	const handleSubmitterNameChanges = (event) => {
		setSubmitterName(event.target.value);
	};

	const handleMeebitNameChanges = (event) => {
		setMeebitName(event.target.value);
	};

	const handlePoseNameChanges = (event) => {
		setPoseName(event.target.value);
	};

	return (
		 <div className="absolute z-10 inset-x-0 bottom-5">
			<div className="flex justify-center">
				<Suspense>
					<button className="bg-gray-900 hover:bg-gray-800 focus:outline-none text-white font-bold py-2 px-10 rounded-lg" onClick={handleClick}>
	    				Cheese 📸
					</button>
				</Suspense>

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
							<button className="text-white font-nimbus text-lg hover:text-yellow-300" onClick={takeScreenshot}>👉 Download Your Screenshot!</button>
							<h1 className="text-white font-nimbus text-md mt-6">👉 Submit your picture and pose to our community gallery!</h1>

							<form className="mt-4 rounded" onSubmit={submitForm}>
								<div className="flex flex-col space-y-4">
									<input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="What's your name.." value={submitterName} onChange={handleSubmitterNameChanges} />
									<input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="What's your Meebit's name..." value={meebitName} onChange={handleMeebitNameChanges} />
									<input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name your pose..." value={poseName} onChange={handlePoseNameChanges} />
									<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
								</div>
							</form>
						</div>
					</Fade>
				</Modal>

				<Snackbar open={openSB} onClose={handleSnackBarClose} autoHideDuration={3000}>
					<Alert onClose={handleSnackBarClose} severity="success">Your pose has been uploaded! 🥳</Alert>
				</Snackbar>

				<Snackbar open={openSBError} onClose={handleSnackBarErrorClose} autoHideDuration={3000}>
					<Alert onClose={handleSnackBarErrorClose} severity="failure">Error uploading your image! Please try again!</Alert>
				</Snackbar>
			</div>
		</div>
	);
}

export default Download;
