import { Suspense, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";

function Download() {
	const dButton = useCallback(async (e) => {
		if(e.keyCode === 67){
			await download();
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", dButton, false); 

		return () => {
			document.removeEventListener("keydown", dButton, false);
		};
	},[dButton]);

	const download = async () => {
	    const canvas = await html2canvas(document.querySelector("#screenshot"));
	
	    canvas.style.display = "none";
	    document.body.appendChild(canvas);
	
	    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    const a = document.createElement("a");
	
	    a.setAttribute("download", "Meeview.png");
	    a.setAttribute("href", image);
	    a.click();
	
		canvas.remove();
	}

	return (
		 <div className="absolute z-10 inset-x-0 bottom-5">
			<div className="flex justify-center">
				<Suspense>
					<button className="bg-gray-900 hover:bg-gray-800 focus:outline-none text-white font-bold py-2 px-10 rounded-lg" onClick={download}>
	    				Cheese 📸
					</button>
				</Suspense>
			</div>
		</div>
	);
}

export default Download;
