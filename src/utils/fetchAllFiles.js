import { firebaseStorageRef } from "../utils/firebase";

// Fetches users converted files from firebase storage
export const fetchAllFiles = async (meebitIDs) => {
  const fileRef = firebaseStorageRef.ref();

  console.log("FETCHING FILES");

  let meebits = []; 
  let temp = []; 
  // Iterate through response and find the files
  for (let i = 0; i < meebitIDs.length; i++) {
    console.log(i)

    // clean up id to fit the 00000 format 
    const id = meebitIDs[i];
    const paddedId = id.padStart(5, '0'); 

    console.log(paddedId);

    const folder = "meebit_" + paddedId + "_t_solid/";
    const fileLoc = `convertedFiles/${folder}`;

    let files = null;

    try {
        files = await fileRef.child(fileLoc).list();
    } catch (error) {
      console.log(error);
    }

    let items = files.items; 

    if(items.length !== 0){
        console.log(items[2].name);
            
        const imgPath = `convertedFiles/${folder}${items[2].name}`;
        const fileRefImgPath = firebaseStorageRef.ref().child(imgPath);

        let firestoreUrl = null;

        try {
        firestoreUrl = await fileRefImgPath.getDownloadURL();
        } catch (error) {
        firestoreUrl = null;
        }

        console.log("IMG URL : ", firestoreUrl)


        for(let i = 0; i < items.length; i++){
            temp.push({name: `convertedFiles/${folder}${items[i].name}`, imgUrl: firestoreUrl});
        }

        meebits.push(temp);
        temp = [];
    }
  }

  console.log(meebits);

  return meebits;
};
