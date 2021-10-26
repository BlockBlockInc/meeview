import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { fetchMeebits } from "../utils/api";
import { fetchAllFiles } from "../utils/fetchAllFiles";
import { downloadFromURL } from "../utils/downloadFromUrl";
import { Loading } from "./Loader";
import { injected } from "../utils/connectors";

export default function Files() {
    const { account, activate} = useWeb3React();

    const [loading, setLoading] = useState(null);
    const [noFiles, setNoFiles] = useState(false);
    const [files, setFiles] = useState([]);
    
    const getData = useCallback(async (account) => {
        setLoading(true);
                
        const ids = await fetchMeebits(account);
        
        if(ids.length > 0){
            const resFiles = await fetchAllFiles(ids);
            setFiles(resFiles);
        }else{
            setNoFiles(true);
        }
        
        setLoading(false);
    },  []);

    useEffect(() => {
        if(!!account){
            getData(account);
        }
    },[getData]);

    useEffect(() => {
        activate(injected);
    }, []);
    
    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-col">
                <Link to="/">
                    <button className="text-md font-nimbus hover:text-gray-600">
                        <u>Home</u>
                    </button>
                </Link>

                <div className="border-solid border-black rounded-md">
                    <h1 className="text-2xl font-nimbus mt-5">Your Meebit Files</h1>
                </div>
            </div>

            <div className={"flex flex-col mt-8 mb-4"}>
                {
                    !!account ? <p className="font-nimbus">You have {files.length} uploaded Meebits.</p> : <p className="font-nimbus">Connect to Metamask on homepage to view your files!</p>
                }
            </div>

            <div className="flex flex-col mt-8">
                {
                    loading ? 
                    <div className="flex flex-row items-center space-x-4">
                        <p className="font-nimbus">Your meebits are loading.</p>
                        <Loading style="w-10 h-10 mt-2"/> 
                    </div> : null
                }

                {
                    files.length === 0 && noFiles ? <p className="font-nimbus">No files found!</p> : null
                }
                
                {
                    files && files.map((file, idx) => {
                       return(
                            <div key={idx} className="flex flex-col mb-16">
                                {
                                    <div className="flex flex-col mb-4"> 
                                        <img src={file[0].imgUrl} alt ="" className="object-cover w-40 h-40 rounded-full border-gray-500 shadow-sm"/>
                                    </div>
                                }
                                {
                                    <p className="font-nimbus text-lg">
                                        {
                                            file[0].name.split('/')[2].split('_')[0] + " " + file[0].name.split('/')[2].split('_')[1]
                                        }
                                    </p>
                                }
                                {
                                    file.map((curr, idx) => {
                                        return(
                                            <div key={idx}>
                                                {
                                                    <button onClick={() => {downloadFromURL(curr)}}><p className="font-nimbus hover:text-gray-500 cursor-pointer">{idx+1}. {curr.name.split('/')[2].substring()}</p></button>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                       )
                    })
                }
            </div>
        </div>
    )
}