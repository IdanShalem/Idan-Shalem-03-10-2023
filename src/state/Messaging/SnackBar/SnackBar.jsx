import { useEffect } from "react";
import "./SnackBar.css"

const SnackBar = ({
  messageData,
  handleClose
}) => {

  useEffect(() => {
    if(messageData.open) {
      setTimeout(() => {
        handleClose();
      }, [3000]);
    };
  }, [handleClose, messageData]);

  return (
    messageData.open &&
      <div id="snackbar" className={messageData.type}>
        {messageData.message}
      </div>
  );
};

export default SnackBar;