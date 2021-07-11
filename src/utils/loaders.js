import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

// Metamask wallet 
export function useEagerConnect() {
    const { activate, active } = useWeb3React(); 
    const [ tried, setTried ] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if(isAuthorized){
                activate(injected, undefined, true).catch(() => {
                    setTried(true);
                });
            }else{
                setTried(true);
            }
        });
    }, [activate]);

    useEffect(() => {
        if(!tried && active) {
            setTried(true);
        }
    }, [tried, active]);

    return tried; 
}

export function useInactiveListener(suppress=false){
    const { active, error, activate } = useWeb3React(); 

    useEffect(()=>{
        const { ethereum } = window; 

        if (ethereum && ethereum.on && !active && !error & !suppress){
            const handleConnect = () => {
                activate(injected);
            }

            const handleAccountsChanged = (accounts) => {
                if(accounts.length > 0){
                    activate(injected);
                }
            }
            
            ethereum.on('connect', handleConnect);
            ethereum.on('handleAccountsChanged', handleAccountsChanged);
            
            return () => {
                if(ethereum.removeListener){
                    ethereum.removeListener('connect', handleConnect);
                    ethereum.removeListener('handleAccountsChanged', handleAccountsChanged);
                }
            };
        }
    }, [active, error, suppress, activate]);
}   