import axios from 'axios';

// Fetch users meebits from OpenSea API 
export const fetchMeebits = async (userAddress) => {
    const meebitContractAddy = '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7';

    const config = {
		method: 'get',
		url: `https://api.opensea.io/api/v1/assets?owner=${userAddress}&asset_contract_address=${meebitContractAddy}&order_direction=desc&offset=0&limit=20`,
		timeout: 1000,
		responseType: 'json'
	}; 
	
	const response = await axios(config); 
    const assets = response.data.assets;

    let meebits = [];

    if (assets.length === null) {
        throw Error("We ran into an error! Reload the page and try again!");
    }   

    if(assets.length === 0){
        return [];
    }

    if(assets.length > 0) {
        for (let i = 0; i < assets.length; i++){
            meebits.push(assets[i].token_id);
        }
    }

    return meebits;  
};