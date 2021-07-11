import { firebaseStorageRef } from "../utils/firebase";
import axios from 'axios';

// Fetches users vrm files from firebase storage
export const fetchFromStorage = async (meebitIDs) => {

    const fileRef = firebaseStorageRef.ref().child('meebits');

    const meebits = []; 

    // Iterate through response and find the files
    for (let i = 0; i < meebitIDs.length; i++) {
        const fileName = 'meebit_' + meebitIDs[i] + '_t.vrm';

        let file = null; 

        try {
            file = fileRef.child(fileName);
        }catch(error){
            console.log(error);
        }

        let firestoreUrl = null;

        try {
            firestoreUrl = await file.getDownloadURL();
        }catch (error){
            firestoreUrl = null;
        }

        if(firestoreUrl !== null) {
            let blob = await axios.get(firestoreUrl, {responseType: 'blob', timeout: 20000});
            let file = new File([blob.data], fileName);
            
            meebits.push(file);
        }else{
            console.log("No file exists in Firebase Storage");
        }
    }

    return meebits;
};