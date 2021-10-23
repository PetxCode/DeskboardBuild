import React, { useState, useEffect, createContext } from "react";
import { app } from "./../../base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userData = app.firestore().collection("dataBaseUsers");

  const [currentUser, setCurrentUser] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
