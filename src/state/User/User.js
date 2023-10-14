import React, { useState, useCallback } from "react";

const UserContext = React.createContext();

const AUTH_TOKEN = "SPINOMENAL_ASSIGNMENT";

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const verifyUser = useCallback((user, token) => {
    if(user && token === AUTH_TOKEN) {
      setUserId(user);
      setAuthorized(true);
      return true;
    } else {
      return false;
    };
  }, []);

  const disconnectUser = useCallback(() => {
    setUserId(null);
    setAuthorized(false);
  }, []);

  return (
    <UserContext.Provider value={{ userId, authorized, verifyUser, disconnectUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };