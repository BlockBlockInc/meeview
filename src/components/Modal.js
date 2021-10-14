import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.common.black,
    height: 380,
    width: 700,
    padding: theme.spacing(2, 4, 3),
    borderRadius: "15px",
  },
}));

function PopUp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleExit = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="absolute bottom-6 right-6">
        <button
          className="bg-black hover:bg-gray-900 focus:outline-none text-white font-bold h-10 w-10 rounded-full"
          onClick={handleClick}
        >
          ?
        </button>
      </div>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleExit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className="text-white font-nimbus text-2xl"></h2>
            <p className="text-white font-nimbus text-lg mt-5"></p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PopUp;
