import Cookies from "js-cookie";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createNewPassword } from "../../api/auth";
import { AuthHeader } from "../atoms/layout/AuthHeader";
import { ErrorAlert } from "../molcules/alert/ErrorAlert";
import { Box } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { PasswordConfirmationInput, PasswordInput, } from "../molcules/form/AuthInputs";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AlertContext } from "../../providers/AlertProvider";
import { SubmitButton } from "../atoms/button/SubmitButton";

export const ResetPassword = () => {
 const navigate = useNavigate();
 const search = useLocation().search;
 const query = new URLSearchParams(search);
 const { setIsOpenSuccess, alertMessage, setAlertMessage, setIsOpenError, isOpenError } = useContext(AlertContext);

 const method = useForm();
 const { handleSubmit, formState: { isSubmitting } } = method;

 const onSubmit = async (params) => {
  Cookies.set("_access_token", query.get("access-token"));
  Cookies.set("_client", query.get("client"));
  Cookies.set("_uid", query.get("uid"));
  try {
   const res = await createNewPassword(params);
   if (res.status === 200) {
    navigate("/");
    setIsOpenSuccess(true);
    setAlertMessage("パスワードを変更しました。");
   }
  } catch (err) {
   console.log(err);
   setIsOpenError(true);
   setAlertMessage("送信できませんでした。");
  }
 };

 if (query.get("access-token")) {
  return (
   <FormProvider {...method}>
    <AuthHeader />
    <Dialog open={true}>

     <DialogTitle>パスワード再設定</DialogTitle>
     <DialogContent>
      {isOpenError && <ErrorAlert>{alertMessage}</ErrorAlert>}
      <DialogContentText>新しいパスワードを入力してください。</DialogContentText>
      <Box component="form" sx={{ mt: 1 }}>
       <PasswordInput />
       <PasswordConfirmationInput />
      </Box>
     </DialogContent>
     <DialogActions sx={{ mr: 2 }}>
      <Box sx={{ width: "120px" }}>
       <SubmitButton
        loading={isSubmitting}
        children="送信"
        onClick={handleSubmit(onSubmit)}
       />
      </Box>
     </DialogActions>
    </Dialog>
   </FormProvider>
  )
 } else return <Navigate to="/signin" />
}
