import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/system";
import { useState } from "react";
import { CloseModalButton } from "../../atoms/button/CloseModalButton";
import { SignUp } from "../../pages/SignUp";
import { SignInPaper } from "./SignInPaper";


export const AuthModal = (props) => {
 const { openSignIn, openSignUp, onClose, onClickSignIn } = props;
 const [isAlertOpen, setIsAlertOpen] = useState(false);


 let theme = createTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

 return (
  <>
   <Dialog
    open={openSignIn}
    fullScreen={fullScreen}
    maxWidth="sm"
    fullWidth
    onClose={onClose}
    sx={{
     maxWidth: { sm: "80%" },
     mx: "auto"
    }}>
    <CloseModalButton onClose={onClose} />
    <DialogContent>
     <SignInPaper
      isAlertOpen={isAlertOpen}
      setIsAlertOpen={setIsAlertOpen}
     />
    </DialogContent>
   </Dialog>

   <Dialog
    onClose={onClose}
    open={openSignUp}
    fullScreen={fullScreen}
    maxWidth="sm"
    fullWidth
    sx={{
     maxWidth: { sm: "80%" },
     mx: "auto"
    }} >
    <CloseModalButton onClose={onClose} />
    <DialogContent>
     <SignUp
      onClickSignIn={onClickSignIn}
     />
    </DialogContent>
   </Dialog>
  </>
 );
}
