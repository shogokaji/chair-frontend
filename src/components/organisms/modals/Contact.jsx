import { useForm } from "react-hook-form";
import { createContact } from "../../../api/contact";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, Divider, FormControl, FormLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";
import { CloseModalButton } from "../../atoms/button/CloseModalButton";
import { AuthContext } from "../../../providers/AuthProvider";

export const Contact = (props) => {
 const { open, setOpen } = props;
 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);
 const { currentUser } = useContext(AuthContext);

 const onClose = () => {
  setOpen(false);
 }

 const {
  register,
  reset,
  handleSubmit,
  formState: {
   errors,
   isSubmitting
  } } = useForm({
   defaultValues: {
    name: "",
    email: "",
    body: ""
   }
  });

 const onSubmit = async (contact) => {
  const data = currentUser.isGest ? contact : { ...contact, email: currentUser.email }
  console.log(data)
  const res = await createContact(data);
  try {
   if (res.status == 200) {
    setIsOpenSuccess(true);
    setAlertMessage("お問合せを送信しました。");
    reset();
   }
  } catch (err) {
   console.log(err)
  }
  onClose();
 }

 return (
  <>
   <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>お問い合わせ</DialogTitle>
    <CloseModalButton onClose={onClose} />
    <Divider />
    <DialogContent sx={{ pt: 0, my: 2 }}>
     <DialogContentText variant="caption">
      問題や気になった点、ご意見などお気軽にお問合せください。
     </DialogContentText>
     <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl>
       <FormLabel sx={{ fontSize: "12px" }}>お名前</FormLabel>
       <TextField
        fullWidth
        size='small'
        margin="dense"
        type="text"
        variant="outlined"
        error={'name' in errors}
        helperText={errors.name?.message}
        inputProps={{ style: { fontSize: "12px" } }}
        {...register('name', {
         required: "入力が必要です",
         maxLength: {
          value: 12,
          message: "12文字まで登録可能です",
         },
         pattern: {
          value: /^(?! |　).*$/,
          message: "空白は文字の途中のみ使用可能です。"
         },
        })}
       />
      </FormControl>
      {currentUser.isGest &&
       <FormControl>
        <FormLabel sx={{ fontSize: "12px" }}>メールアドレス</FormLabel>
        <TextField
         autoComplete="email"
         fullWidth
         size='small'
         type="email"
         margin="dense"
         {...register("email", {
          required: "入力が必要です",
          pattern: {
           value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
           message: "入力形式がメールアドレスではありません。"
          }
         })}
         error={'email' in errors}
         helperText={errors.email?.message}
        />
       </FormControl>
      }
      <FormControl >
       <FormLabel sx={{ fontSize: "12px" }}>お問合せ内容</FormLabel>
       <TextField
        fullWidth
        margin="dense"
        type="text"
        variant="outlined"
        multiline
        inputProps={{ style: { fontSize: "14px" } }}
        maxRows={10}
        minRows={4}
        error={'body' in errors}
        helperText={errors.body?.message}
        {...register('body', {
         required: "入力が必要です",
         maxLength: {
          value: 400,
          message: "400文字まで入力可能です",
         },
        })}
       />
      </FormControl>

     </Box>
    </DialogContent>
    <Divider />
    <DialogActions>
     <Box sx={{ width: "100px", mr: 2 }}>
      <SubmitButton
       loading={isSubmitting}
       onClick={handleSubmit(onSubmit)}
      >
       送信
      </SubmitButton>
     </Box>
    </DialogActions>
   </Dialog>
  </>

 );
}
