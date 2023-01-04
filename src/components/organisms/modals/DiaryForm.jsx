import { useState, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createDiary, getDiary, updateDiary } from "../../../api/diary";
import { DiaryContext } from "../../../providers/DiaryProvider";
import Dialog from '@mui/material/Dialog';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Divider, Tooltip, Typography } from '@mui/material';
import { CloseModalButton } from "../../atoms/button/CloseModalButton";
import { DiaryBody, DiaryImage, DiaryPublish, DiaryTitle } from "../../molcules/form/DiaryInputs";
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext } from "../../../providers/AuthProvider";
import { AlertContext } from "../../../providers/AlertProvider";
import { SubmitButton } from "../../atoms/button/SubmitButton";

export const DiaryForm = (props) => {
 const { isOpen, setIsOpen, diary, setDiary, role } = props;
 const { currentUser } = useContext(AuthContext);

 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

 const { myDiaries, setMyDiaries } = useContext(DiaryContext);
 const [preview, setPreview] = useState(diary?.image.url);

 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

 //react hooks form
 const methods = useForm({ mode: "onSubmit" });
 const { handleSubmit, setValue, formState: { isSubmitting } } = methods;
 const resetValues = ["title", "body", "image"]

 //編集モーダルを閉じる
 const onClose = () => {
  diary && setDiary();
  setIsOpen(false);
 }

 // 日記編集
 const onSubmit = async (data) => {
  console.log(data.publish)
  const imageFile = data.image && data.image[0]
  const newData = { ...data, image: imageFile }
  if (role == "作成") {
   const res = await createDiary(newData);
   try {
    if (res.status == 200) {
     const res = await getDiary(currentUser.id)
     setMyDiaries(res.data.diaries)
     onClose();
     setIsOpenSuccess(true);
     setAlertMessage("日記を投稿しました。")
     // updateにdefaultValueがかかるためresetの代替
     resetValues.map((item) => {
      setValue(item, "")
     })
     setPreview("")
    }
   } catch (err) {
    console.log(err)
   }
  }
  else if (role == "編集") {
   const res = await updateDiary(diary.id, newData);
   try {
    setMyDiaries(myDiaries.map(value => value.diary.id === diary.id ? { ...value, diary: res.data.diary } : value))
    setIsOpenSuccess(true);
    setAlertMessage("日記を編集しました。")
    onClose();
   } catch (err) {
    console.log(err)
   }
  }
 };

 return (
  <>
   <FormProvider {...methods} >
    <Dialog
     fullWidth
     fullScreen={fullScreen}
     maxWidth="sm"
     open={isOpen}
     keepMounted
     onClose={onClose}
     sx={{ display: "flex", flexDirection: "column" }}
    >
     <DialogTitle sx={{ pb: 1 }}>
      <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, }}>{`日記${role}`}</Typography>
     </DialogTitle>
     <CloseModalButton onClose={onClose} />

     <Divider variant='middle' />

     <DialogContent>
      <Box sx={{
       display: { xs: "block", sm: "flex" },
       justifyContent: "space-between",
       alignItems: "center",
       mb: 1
      }} >

       <FormControl
        sx={{
         display: "flex",
         flexDirection: "column",
         width: "100%",
        }}>

        <DiaryTitle value={diary?.title} />

        <Box sx={{
         position: "absolute",
         right: 0,
         width: { xs: "80px", sm: "120px" },
         mb: 3,
        }}>
         <FormLabel sx={{
          display: "flex"
         }}>
          <Typography variant='caption'>公開設定</Typography>
          <Tooltip title="非公開にするとあなた以外のユーザーはこの日記を閲覧できなくなります。">
           <InfoIcon fontSize="10px" />
          </Tooltip>
         </FormLabel>
         <DiaryPublish value={diary?.publish} />
        </Box>
       </FormControl>
      </Box>

      <DiaryBody value={diary?.body} >本文(400文字まで)</DiaryBody>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
       <DiaryImage preview={preview} setPreview={setPreview} />
       <DialogActions>
        <Box
         sx={{
          height: { xs: "35px", sm: "40px" },
          width: { xs: "100px", sm: "200px" }
         }}>
         <SubmitButton
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
         >
          投稿
         </SubmitButton>
        </Box>
       </DialogActions>
      </Box>
     </DialogContent>
    </Dialog >
   </FormProvider>
  </>
 );
}
