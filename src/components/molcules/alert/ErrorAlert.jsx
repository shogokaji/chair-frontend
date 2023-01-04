import { Alert, Typography } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "../../../providers/AlertProvider";

export const ErrorAlert = ({ children }) => {
 const { setIsOpenError } = useContext(AlertContext)
 const handleClose = () => {
  setIsOpenError(false);
 }
 return (
  <Alert severity="warning" onClose={handleClose}>
   <Typography
    component="p"
    variant="caption">
    {children}
   </Typography>
  </Alert >
 );
}
