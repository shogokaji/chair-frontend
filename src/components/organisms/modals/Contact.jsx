import { useForm } from "react-hook-form";
import { createContact } from "../../../api/contact";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, Divider, FormControl, FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";
import { CloseModalButton } from "../../atoms/button/CloseModalButton";

export const Contact = (props) => {
 const { open, setOpen } = props;
 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

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
    body: ""
   }
  });

 const onSubmit = async (data) => {
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
    <DialogContent sx={{ pt: 0, mt: 2 }}>
     <DialogContentText variant="caption">
      問題や気になった点、ご意見などお気軽にお問合せください。
     </DialogContentText>
     <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
      <FormControl>
       <FormLabel>お名前</FormLabel>
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
      <FormControl sx={{ mt: 2 }} >
       <FormLabel>お問合せ内容</FormLabel>
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
