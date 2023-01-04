import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
 const { children } = props;
 const [loading, setLoading] = useState(true);
 const [isSignedIn, setIsSignedIn] = useState(false);
 const [currentUser, setCurrentUser] = useState();

 return (
  <AuthContext.Provider
   value={{
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
   }}
  >
   {children}
  </AuthContext.Provider>
 );
}
