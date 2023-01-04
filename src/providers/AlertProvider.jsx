


import { useState } from "react";
import { createContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = (props) => {
 const { children } = props;
 const [isOpenError, setIsOpenError] = useState(false);
 const [isOpenSuccess, setIsOpenSuccess] = useState(false);
 const [alertMessage, setAlertMessage] = useState("");

 return (
  <AlertContext.Provider
   value={{
    isOpenError,
    setIsOpenError,
    isOpenSuccess,
    setIsOpenSuccess,
    alertMessage,
    setAlertMessage
   }}
  >
   {children}
  </AlertContext.Provider >
 );
}
