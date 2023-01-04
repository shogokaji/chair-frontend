import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { createComment } from "../../../api/comment";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";


export const CommentForm = (props) => {

 const { comments, setComments, setLoading } = props;
 const { currentUser } = useContext(AuthContext);
 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

 //react form
 const {
  register,
  formState: { errors, isSubmitting },
  handleSubmit,
  reset,
 } = useForm();

 const params = useParams();


 const onSubmit = async (data) => {
  const res = await createComment(params.id, data)
  try {
   const newComment = res.data.comment
   setComments([...comments, newComment]);
   setIsOpenSuccess(true);
   setAlertMessage("日記にコメントしました。")
   reset();
  } catch (err) {
   console.log(err)
  }
  setLoading(false)
 }


 return (
  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "right", mx: { xs: 3, sm: 5 }, pb: 5, }}>
   <Box component="form" noValidate>
    <Box sx={{ display: "flex", alignItems: "center" }}>
     <Avatar
      alt="User Image"
      src={currentUser.image.url}
      sx={{
       width: { xs: 35, sm: 50 },
       height: { xs: 35, sm: 50 },
       mt: 1, mr: 1,
      }} />
     <Typography mt={1} variant="subtitle2">コメントする</Typography>
    </Box>
    <Box sx={{ ml: { xs: 0, sm: 5 } }}>
     <TextField
      fullWidth
      label="コメント(200字まで)"
      margin="dense"
      type="text"
      variant="outlined"
      multiline
      inputProps={{ style: { fontSize: "12px" } }}
      InputLabelProps={{ style: { fontSize: "14px" } }}
      maxRows={10}
      minRows={3}
      error={'text' in errors}
      helperText={errors.text?.message}
      {...register('text', {
       required: "入力が必要です",
       maxLength: {
        value: 200,
        message: "200文字まで入力可能です",
       },
      })}
     />
    </Box>
   </Box>
   <Box sx={{
    py: 1, my: 1, ml: "auto",
    height: { xs: "30px", sm: "40px" },
    width: { xs: "120px", sm: "180px" },
   }}>
    <SubmitButton
     onClick={handleSubmit(onSubmit)}
     loading={isSubmitting}
    >
     投稿
    </SubmitButton>
   </Box>
  </Box>
 )
}
