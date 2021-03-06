import { useState, useEffect } from "react";
import { useEagerConnect, useInactiveListener } from "./utils/loaders";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./utils/connectors";
import getErrorMessage from "./utils/errors";
import { fetchMeebits } from "./utils/api";
import { fetchFromStorage } from "./utils/fetchStorage";
import { Link } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import MobileDefault from "./components/MobileDefault";

import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { BrowserView, MobileView } from "react-device-detect";

// import PopUp from "./components/Modal";

function App() {
  const [open, setOpen] = useState(true);

  const [errorSnackBar, setErrorSnackBar] = useState(true);
  const [errorMeebitsFetchSnackBar, setErrorMeebitsFetchSnackBar] =
    useState(true);
  const [message, setMessage] = useState("");

  const { connector, library, account, activate, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  const [loading, setLoading] = useState(false);
  const [meebits, setMeebits] = useState();

  const [meebitsResultError, setMeebitsResultError] = useState(false);
  const [noMeebits, setNoMeebits] = useState(false);

  const [meebitsLength, setMeebitsLength] = useState();

  // Snackbars
  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const handleErrorSnackBarClose = () => {
    setErrorSnackBar(false);
  };

  const handleErrorMeebitsFetchSnackBarClose = () => {
    setErrorMeebitsFetchSnackBar(false);
  };

  // Connect to Metamask
  const handleClick = async () => {
    // Account should activate here
    setActivatingConnector(injected);
    activate(injected);
  };

  // Fetch Meebits from Firebase storage when Metamask is connected
  const handleFetchMeebits = async () => {
    setLoading(true);

    // Fetches Meebits IDs.
    const meebitIDs = await fetchMeebits(account);
    console.log(meebitIDs);

    // Fetch default meebit
    const defaultMeebit = await fetchFromStorage(["5220"]);

    // If we load default, we won't see the snackbar messages
    if (meebitIDs === null) {
      setMeebitsLength(null);
      setMessage(
        "There was an error retriving your Meebits! Refresh the tab and try again!"
      );
    } else if (meebitIDs.length === 0) {
      setMeebitsLength(0);
      setMessage("There were no Meebits were found in your wallet!");
      setMeebits(defaultMeebit);
    } else if (meebitIDs.length > 0) {
      // Fetch Meebits from firebase storage
      const firebaseStorageResponse = await fetchFromStorage(meebitIDs);

      if (firebaseStorageResponse.length === 0) {
        setMeebitsLength(0);
        setMessage("Your VRM hasn't been uploaded yet! Loading Default!");
        setMeebits(defaultMeebit);
      } else {
        // VRM Files
        setMeebits(firebaseStorageResponse);
      }
    }

    setLoading(false);
  };

  const handleDemo = async () => {
    // Fetches default meebit
    const defaultMeebit = await fetchFromStorage(["5220"]);
    setMeebits(defaultMeebit);
  };

  useEffect(() => {
    if (meebitsLength === null) {
      setMeebitsResultError(true);
    } else if (meebitsLength === 0) {
      setNoMeebits(true);
    }
  }, [meebitsLength]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const eagerConnect = useEagerConnect();
  useInactiveListener(!eagerConnect || !!activatingConnector);

  return (
    <>
      <BrowserView>
        {!!meebits ? (
          <Body meebits={meebits} />
        ) : (
          <div className="flex h-screen">
            <div className="flex flex-col m-auto">
              <div className="flex flex-col justify-center items-center pl-7 pr-7">
                <Header />

                {!!account === true ? (
                  <Snackbar
                    open={open}
                    onClose={handleSnackBarClose}
                    autoHideDuration={3000}
                  >
                    <Alert onClose={handleSnackBarClose} severity="success">
                      You're connected to Metamask!
                    </Alert>
                  </Snackbar>
                ) : null}

                {
                  <Link to="/upload">
                    <button
                      className="outline-none	text-md font-bold mt-4 text-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 text-white font-bold h-12 w-80 rounded-md"
                    >
                      Upload your Meebit Now
                    </button>
                  </Link>
                }

                {!!(account && library) === false ? (
                  <button
                    className="outline-none	text-md font-bold mt-4 text-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 text-white font-bold h-12 w-80 rounded-md"
                    onClick={handleClick}
                  >
                    Connect to Metamask
                  </button>
                ) : loading === false ? (
                  <button
                    className="outline-none	text-md font-bold mt-4 text-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 text-white font-bold h-12 w-80 rounded-md"
                    onClick={handleFetchMeebits}
                  >
                    Load Meebit
                  </button>
                ) : (
                  <button className="outline-none	animate-bounce text-md font-bold mt-4 text-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 text-white font-bold h-12 w-80 rounded-md">
                    Loading Meebit!
                  </button>
                )}

                {
                  <Link to="/files">
                    <button
                      className="outline-none	text-md font-bold mt-4 text-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-black hover:bg-gray-900 text-white font-bold h-12 w-80 rounded-md"
                    >
                      Your Meebit Files
                    </button>
                  </Link>
                }

                {
                  <button
                    className="absolute bottom-20 right-8 outline-none	text-md font-bold text-center justify-center bg-black hover:bg-gray-900 text-white font-bold h-12 w-52 rounded-full"
                    onClick={handleDemo}
                  >
                    Demo
                  </button>
                }

                {!!error && (
                  <Snackbar
                    open={errorSnackBar}
                    onClose={handleErrorSnackBarClose}
                    autoHideDuration={3000}
                  >
                    <Alert onClose={handleErrorSnackBarClose} severity="error">
                      {getErrorMessage(error)}
                    </Alert>
                  </Snackbar>
                )}

                {(meebitsResultError || noMeebits) && (
                  <Snackbar
                    open={errorMeebitsFetchSnackBar}
                    onClose={handleErrorMeebitsFetchSnackBarClose}
                    autoHideDuration={3000}
                  >
                    <Alert
                      onClose={handleErrorMeebitsFetchSnackBarClose}
                      severity="error"
                    >
                      {message}
                    </Alert>
                  </Snackbar>
                )}
              </div>

              <Link to="/gallery">
                <button className="absolute bottom-6 right-8 bg-black hover:bg-gray-900 focus:outline-none text-white text-lg font-bold h-12 w-52 rounded-full">
                  Community Gallery
                </button>
              </Link>
            </div>
          </div>
        )}
      </BrowserView>

      <MobileView>
        <MobileDefault />
      </MobileView>
    </>
  );
}

export default App;
