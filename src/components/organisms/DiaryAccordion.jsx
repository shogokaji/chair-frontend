import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../../providers/AuthProvider";
import { LikeButton } from "../atoms/button/LikeButton";

import { Box } from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Divider, Typography, IconButton, CardMedia, Dialog, Tooltip, } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { EditButton } from "../atoms/button/EditButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import { DeleteConfirmation } from "./modals/DeleteConfirmation";
import { DiaryContext } from "../../providers/DiaryProvider";
import { deleteDiary } from "../../api/diary"
import { DiaryAccordionSummary } from "../molcules/DiaryAccordionSummary";
import { AlertContext } from "../../providers/AlertProvider";

export const DiaryAccordion = (props) => {
 const { content, diaries, setDiaries, handleClickLikesCounter, handleClickEdit } = props;
 const { user, diary, likes, comments } = content;
 const { currentUser } = useContext(AuthContext);
 const { myDiaries, setMyDiaries } = useContext(DiaryContext);
 const [openAlert, setOpenAlert] = useState(false);
 const [openPhotoDetail, setOpenPhotoDetail] = useState(false);

 const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);
 const navigate = useNavigate();

 const handleClickComment = (content) => {
  navigate(`/diaries/${content.diary.id}`, { state: content });
 }

 const handleClickDelete = () => {
  setOpenAlert(true);
 }

 // 日記削除
 const handleDeleteDiary = async () => {
  const res = await deleteDiary(diary.id);
  try {
   setOpenAlert(false);
   setMyDiaries(myDiaries.filter(value => value.diary.id !== diary.id))
   setIsOpenSuccess(true);
   setAlertMessage("日記を削除しました。")
  } catch (err) {
   console.log(err)
  }
 }

 const handleClickPhoto = () => {
  setOpenPhotoDetail(true);
 }

 //like済みかどうかのフラグ
 const isLiked = likes.some(user => user.id === currentUser.id);

 return (
  <Accordion sx={{ width: "100%", height: "100%", }}>
   <DiaryAccordionSummary user={user} diary={diary} />
   <Divider variant="middle" />

   <AccordionDetails sx={{ my: 2, mx: { xs: 0, sm: 2 } }}>
    <Typography
     sx={{
      fontSize: { xs: "12px", sm: "14px" },
      whiteSpace: 'pre-line',
      wordBreak: "break-all"
     }}>
     {diary.body}
    </Typography>
    {diary.image?.url ?
     <CardMedia
      component="img"
      src={diary.image.url}
      alt="post image"
      onClick={handleClickPhoto}
      sx={{ width: "60%", height: "60%", mx: "auto", mt: 2 }}
     />
     : <></>
    }

   </AccordionDetails>
   <Typography
    sx={{ mr: 2, textAlign: "right", fontSize: { xs: "10px", sm: "12px" }, color: "gray" }}
    children={`投稿日：${moment(diary.createdAt).format("YYYY-MM-DD HH:mm")}`}
   />

   <Divider variant="middle" />

   <Box
    sx={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     ml: 2, my: 1,
    }}>
    <Box display="flex" alignItems="center">
     <Tooltip title="Cheer一覧へ">
      <IconButton
       onClick={() => handleClickLikesCounter(likes)}
       sx={{
        display: "flex",
        alignItems: "center"
       }}>
       <ThumbUpOffAltIcon sx={{ fontSize: "18px", color: "gray" }} />
       <Typography sx={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
        {likes.length}
       </Typography>
      </IconButton>
     </Tooltip>

     <Tooltip title="コメント一覧へ">
      <IconButton
       onClick={() => handleClickComment(content)}
       sx={{
        display: "flex",
        alignItems: "center"
       }}>
       <ChatBubbleOutlineIcon sx={{ fontSize: "18px", color: "gray" }} />
       <Typography sx={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
        {comments.length}
       </Typography>
      </IconButton>
     </Tooltip>
     {user.id === currentUser.id &&
      <>
       <DeleteButton onClick={handleClickDelete} />
       <DeleteConfirmation
        open={openAlert}
        setOpen={setOpenAlert}
        action={handleDeleteDiary}>
        この日記を削除します。
       </DeleteConfirmation>
      </>
     }
    </Box>

    <Box sx={{ mr: 1, width: { xs: "80px", sm: "120px" } }}>
     {user.id !== currentUser.id ?
      <LikeButton
       isLiked={isLiked}
       diaryId={diary.id}
       diaries={diaries}
       setDiaries={setDiaries}
      />
      :
      <EditButton onClick={() => handleClickEdit(diary)} />
     }
    </Box>
   </Box>

   <Dialog
    open={openPhotoDetail}
    onClose={() => setOpenPhotoDetail(false)}>
    <CardMedia
     component="img"
     src={diary.image.url}
     alt="post image"
    />
   </Dialog>

  </Accordion>
 )
}
