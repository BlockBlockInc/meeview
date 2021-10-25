import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { convertVoxToVrm } from "../utils/convertVox";
import { Loading } from "./Loader";
import axios from "axios";

export default function Upload() {
    const [uploading, isDoneUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        setLoading(true);

        console.log("FILE", acceptedFiles)
        const file = acceptedFiles[0];

        const uploadResult = await convertVoxToVrm(file); 

        isDoneUploading(uploadResult);
        setLoading(false);
    }, []);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: '.vox', onDrop});

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-col">
                <Link to="/">
                <button className="text-md font-nimbus hover:text-gray-600">
                    <u>Home</u>
                </button>
                </Link>

                <div className="border-solid border-black rounded-md">
                    <h1 className="text-2xl font-nimbus mt-5">UPLOAD YOUR VOX FILE</h1>
                    <p className="text-sm font-nimbus mt-6">Your default upload Meebit file name should be formatted this way: meebit_XXXXX_t_solid.vox</p>
                    <p className="text-sm font-nimbus mt-1">Other file names will not work!</p>
                </div>
            </div>

            <div {...getRootProps()} className="flex flex-col justify-center items-center mt-10 w-96 pl-8 pr-8 h-20 border-2 rounded-lg border-black">
                <input {...getInputProps()} />
                
                {
                    isDragActive ?
                    <p className="font-nimbus">Drop files here</p> :
                    <p className="font-nimbus">Drag and drop file here</p>
                }
            </div>

            <div className="flex flex-col mt-8">
                {
                    loading ? 
                    <div className="flex flex-row items-center space-x-8">
                        <p className="font-nimbus">Your vox file is converting.</p>
                        <Loading />
                    </div> 
                    : null
                }
            </div>

            <div className="flex flex-col mt-8">
                {
                    !loading && uploading ? 
                    <div className="flex flex-col">
                        <p className="font-nimbus">Your vox file conversion is complete.</p>
                        <p className="font-nimbus">You can head over to the homepage and try out the photobooth.</p>
                    </div> 
                    : null
                }

                {
                    !uploading ?  
                    <div className="flex flex-col">
                        <p className="font-nimbus">Error uploading your vox file. Try again!</p>
                    </div> : null
                }
            </div>
        </div>
    )
}