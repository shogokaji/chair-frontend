import { useForm } from "react-hook-form";
import { createMessage } from "../../../api/message";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material"
import { Box } from "@mui/system";
import SendSharpIcon from '@mui/icons-material/SendSharp';

export const MessageForm = (props) => {
 const { roomData, messages, setMessages } = props;

 const {
  register,
  formState: { isSubmitting, isValid },
  handleSubmit,
  reset,
  getValues
 } = useForm({ mode: "onChange" })

 const onSubmit = async (data) => {
  const newData = { ...data, roomId: roomData.roomId }
  const res = await createMessage(newData)
  try {
   setMessages([...messages, res.data.message])
   reset();
  } catch (err) {
   console.log(err)
  }
 }

 return (
  <>
   <Box
    component="form"
    sx={{
     display: "flex",
     alignItems: "end",
     mx: 1,
     ml: { xs: 1, sm: 10 },
     mb: 2
    }}>
    <TextField
     fullWidth
     autoFocus
     label="メッセージ"
     margin="dense"
     type="body"
     variant="outlined"
     multiline
     size="small"
     inputProps={{ style: { fontSize: "12px" } }}
     InputLabelProps={{ style: { fontSize: "14px" } }}
     maxRows={5}
     {...register('body', {
      required: "入力が必要です",
      maxLength: {
       value: 200,
       message: "200文字まで入力可能です",
      },
      pattern: {
       value: /.*\S+.*/,
       message: "空白は文字の途中のみ使用可能です。"
      },
     })}
    />
    <LoadingButton
     onClick={handleSubmit(onSubmit)}
     loading={isSubmitting}
     disabled={!isValid}
     fullWidth
     size="small"
     variant="contained"
     sx={{
      py: 1,
      ml: 0.5,
      mb: 0.5,
      height: "40px",
      width: { xs: "60px", sm: "100px" },
     }}
    >
     <SendSharpIcon />
    </LoadingButton>
   </Box>
  </>
 )
}
