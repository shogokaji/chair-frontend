import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { setUpUser, updateUser } from "../../../api/user";
import { getCurrentUser } from "../../../api/auth";
import { AuthContext } from "../../../providers/AuthProvider";
import { CloseModalButton } from "../../atoms/button/CloseModalButton";
import { UpdateProfileInputs } from "../../molcules/UpdateProfileInputs";
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";


export const UpdateProfile = (props) => {
 const { setUser, openEditer, setOpenEditer } = props;
 const { currentUser, setCurrentUser } = useContext(AuthContext);
 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

 const methods = useForm();
 const { handleSubmit, formState: { isSubmitting } } = methods;

 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

 // キャンセルボタン
 const onClose = async (data) => {
  if (!currentUser.isSetup) {
   const res = await setUpUser();
   const userData = data ? data : currentUser;
   setCurrentUser({ ...userData, isSetup: true })
  }
  setOpenEditer(false);
 }

 // 更新ボタン
 const onSubmit = async (data) => {
  const imageFile = data.image && data.image[0];
  const newData = { ...data, image: imageFile };
  const res = await updateUser(currentUser?.id, newData);
  try {
   if (res.status == 200) {
    const res = await getCurrentUser();
    console.log(res);
    setCurrentUser(res.user);
    setUser(res.user);
    setIsOpenSuccess(true);
    setAlertMessage("プロフィールを編集しました。");
    onClose(res.user);
   }
  } catch (err) {
   console.log(err);
  }
 };


 return (
  <FormProvider {...methods} >
   <Dialog
    open={openEditer}
    onClose={() => onClose()}
    fullWidth
    fullScreen={fullScreen}
    maxWidth="sm"
    keepMounted
    sx={{
     display: "flex",
     flexDirection: "column",
    }}
   >
    <DialogTitle fontSize="16px">プロフィール編集</DialogTitle>
    <CloseModalButton onClose={() => onClose()} />

    <Divider variant='center' />

    <DialogContent sx={{ pt: 1 }}>
     <UpdateProfileInputs />
     <DialogActions
      sx={{
       mt: 1, ml: "auto",
       width: { xs: "40%", sm: "30%" }
      }}>
      <SubmitButton
       loading={isSubmitting}
       onClick={handleSubmit(onSubmit)}>
       更新
      </SubmitButton>
     </DialogActions>
    </DialogContent>
   </Dialog >
  </FormProvider>
 )
}
