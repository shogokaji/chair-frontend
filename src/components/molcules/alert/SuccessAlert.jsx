import { Alert, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AlertContext } from "../../../providers/AlertProvider";

export const SuccessAlert = ({ children }) => {
  const { setIsOpenSuccess } = useContext(AlertContext);

  const handleClose = () => {
    setIsOpenSuccess(false)
  }
  return (
    <Box sx={{ position: "absolute", top: "80px", right: 10, zIndex: 999 }}>
      <Alert
        severity="success"
        onClose={handleClose}
        sx={{ py: 1, px: { xs: 1, sm: 5 } }}>
        <Typography component="p" variant="subtitle2">
          {children}
        </Typography>
      </Alert>
    </Box>
  );
}
