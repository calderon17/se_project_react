import React from "react";
import { removeToken } from "../utils/auth";
import { useState } from "react";

const CurrentUserContext = React.createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleLogin(userData) {
    setCurrentUser(userData);
  }

  function handleLogout() {
    setCurrentUser(null);
    removeToken();
  }

  function handleUpdate(updatedUserData) {
    setCurrentUser(updatedUserData);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser, // this stores the logged in user-data
        setCurrentUser,
        isLoading, // tracks when we are checking the authentaction status
        setIsLoading,
        handleLogin,
        handleLogout,
        handleUpdate,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
