import axios from "axios";

// Converts the vox file uploaded by user into a vrm file
export const convertVoxToVrm = async (file) => {
    console.log("convertVoxToVrm starting...");
    console.log("file ", file);

    const data = new FormData(); 
    data.append('file', file, file.name);

    const res = await axios.post('https://api.meeview.xyz/photobooth', data);

    if(res.data.status === "done"){
        return true; 
    }else {
        return false; 
    }
}

