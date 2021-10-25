import { firebaseStorageRef } from "../utils/firebase";
import axios from "axios";

//Download a specified url path from storage 
export const downloadFromURL = async (path) => {
    console.log("DOWNLOAD THIS: ", path);

    const fileRef = firebaseStorageRef.ref().child(path);

    let fileName = path.substring(path.lastIndexOf('/') + 1);

    let firestoreUrl = null;

    try {
      firestoreUrl = await fileRef.getDownloadURL();
    } catch (error) {
      firestoreUrl = null;
    }

    if (firestoreUrl !== null) {
      let blob = await axios.get(firestoreUrl, {
        responseType: "blob",
        timeout: 180000,
      });

      const url = URL.createObjectURL(new Blob([blob.data]));

      const a = document.createElement('a');
      a.href = url; 
      a.target = "_blank";
      a.download = fileName; 
      a.click(); 

      URL.revokeObjectURL(url);

    //   let file = new File([blob.data], fileName);
    //   console.log(file)
    } else {
      console.log("No file exists in Firebase Storage");
    }
}