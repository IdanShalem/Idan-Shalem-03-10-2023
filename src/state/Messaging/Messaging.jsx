import React, { useState, useCallback } from "react";
import SnackBar from "./SnackBar/SnackBar";

const MessagingContext = React.createContext();

const initialMessageState = {
  type: "",
  message: "",
  open: false,
};

const MessagingProvider = React.memo(({ children }) => {
  const SnackbarTypes = {
    ERROR_MESSAGE: "errorMessage",
    SUCCESS_MESSAGE: "successMessage",
  };

  const [messageData, setMessageData] = useState(initialMessageState);

  const showSnackBar = useCallback(
    (message, type) => setMessageData({ message, type, open: true }),
    []
  );

  const handleClose = useCallback(() => {
    setMessageData(initialMessageState);
  }, []);

  return (
    <MessagingContext.Provider value={{ showSnackBar, SnackbarTypes }}>
      <SnackBar messageData={messageData} handleClose={handleClose} />
      {children}
    </MessagingContext.Provider>
  );
});

export { MessagingContext, MessagingProvider };
