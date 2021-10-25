import axios from "axios";

// Converts the vox file uploaded by user into a vrm file
export const convertVoxToVrm = async (file) => {
    console.log("convertVoxToVrm starting...");
    console.log("file ", file);

    const data = new FormData(); 
    data.append('file', file, file.name);

    const headers = {
        'Access-Control-Allow-Origin': "*"
    }

    const res = await axios.post('https://meeview.xyz/photobooth', data, {
        headers: headers
    });

    if(res.data.status === "done"){
        return true; 
    }else {
        return false; 
    }
}

