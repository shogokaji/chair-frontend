import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Divider, TextField, Typography } from '@mui/material';
import { CloseModalButton } from "../../atoms/button/CloseModalButton";
import { editComment } from "../../../api/comment";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";

export const EditComment = (props) => {
 const { open, setOpen, comment, setComment, comments, setComments } = props;
 const params = useParams();
 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext)

 //react hooks form
 const {
  register,
  formState: { errors, isSubmitting },
  handleSubmit,
  reset,
 } = useForm({ mode: "onSubmit" })

 const onClose = () => {
  setComment();
  setOpen(false);
 }

 // 日記編集
 const onSubmit = async (newComment) => {
  const res = await editComment(params.id, comment.id, newComment);
  try {
   setComments(comments.map(value => value.comment.id === comment.id ? { ...value, comment: res.data.comment.comment } : value))
   setComment();
   setIsOpenSuccess(true);
   setAlertMessage("コメントを編集しました。")
   setOpen(false);
   reset();
  } catch (err) {
   console.log(err)
  }
 };

 return (
  <Dialog
   fullWidth
   open={open}
   keepMounted
   onClose={onClose}
   sx={{ display: "flex", flexDirection: "column" }}
  >
   <DialogTitle sx={{ pb: 1 }}>
    <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, }}>コメント編集</Typography>
   </DialogTitle>
   <CloseModalButton onClose={onClose} />

   <Divider variant='middle' />

   <DialogContent>
    <Box component="form" noValidate>
     <TextField
      fullWidth
      label="コメント(200字まで)"
      margin="dense"
      type="text"
      variant="outlined"
      multiline
      autoFocus
      inputProps={{ style: { fontSize: "12px" } }}
      maxRows={10}
      minRows={3}
      error={'text' in errors}
      helperText={errors.text?.message}
      defaultValue={comment.text}
      {...register('text', {
       required: "入力が必要です",
       maxLength: {
        value: 200,
        message: "200文字まで入力可能です",
       },
      })}
     />
    </Box>

    <DialogActions>
     <Box sx={{ width: "120px" }}>
      <SubmitButton
       loading={isSubmitting}
       onClick={handleSubmit(onSubmit)}
       children={"更新"}
      />
     </Box>
    </DialogActions>

   </DialogContent>
  </Dialog >
 )
}
