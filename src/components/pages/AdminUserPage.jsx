import { Button, CardMedia, Dialog, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useContext, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom";
import { deleteComment, getCommentList } from "../../api/comment";
import { deleteDiary, getDiary } from "../../api/diary";
import { deleteMessage, getMessage } from "../../api/message";
import { getUser } from "../../api/user";
import { AuthContext } from "../../providers/AuthProvider"
import DeleteIcon from '@mui/icons-material/Delete';

export const AdminUserPage = () => {
 const { currentUser } = useContext(AuthContext);
 const [targetUser, setTargetUser] = useState();
 const [diaries, setDiaries] = useState([]);
 const [comments, setComments] = useState([]);
 const [messages, setMessages] = useState([]);
 const [loading, setLoading] = useState(true);
 const [image, setImage] = useState();
 const [targetItem, setTargetItem] = useState("diary");
 const params = useParams();

 const handleGetUser = async () => {
  const res = await getUser(params.id)
  setTargetUser(res.user);
  setLoading(false)
 }

 const handleGetItems = async () => {
  if (targetItem == "diary") {
   const res = await getDiary(params.id);
   setDiaries(res.data.diaries)
  } else if (targetItem == "comment") {
   const res = await getCommentList(params.id);
   setComments(res.data.comments);
  } else {
   const res = await getMessage(params.id);
   setMessages(res.data.messages);
  }
 }

 //日記画像の表示
 const handleClickImage = (url) => {
  setImage(url);
 }

 //確認対象の切り替え
 const handleClickTarget = (target) => {
  setTargetItem(target)
 }

 //Clickアクション
 const handleClickDiary = async (diaryId) => {
  const res = await deleteDiary(diaryId);
  handleGetItems();
 }

 const handleClickComment = async (diaryId, commentId) => {
  const res = await deleteComment(diaryId, commentId);
  handleGetItems();
 }

 const handleClickMessage = async (messageId) => {
  const res = await deleteMessage(messageId);
  handleGetItems();
 }

 useEffect(() => {
  handleGetUser();
 }, [])

 useEffect(() => {
  handleGetItems();
 }, [targetItem])

 //roomId表示非表示用のフラッグ
 let roomFlag;

 if (!loading) {
  if (currentUser.admin) {
   return (
    <Box mt={2}>
     <Typography textAlign="center" variant="h6">ユーザー情報</Typography>
     <Typography>ユーザー名：{targetUser.name}</Typography>
     <Typography>疾患：{targetUser.disease}</Typography>
     <Typography>好きなこと：{targetUser.favorite}</Typography>
     <Typography>プロフィール：{targetUser.profile}</Typography>
     <Stack direction="row">
      <Button onClick={() => handleClickTarget("diary")}>日記</Button>
      <Button onClick={() => handleClickTarget("comment")}>コメント</Button>
      <Button onClick={() => handleClickTarget("message")}>メッセージ</Button>
     </Stack>

     {targetItem == "diary" &&
      <Box>
       <Typography textAlign="center" variant="h6">日記</Typography>
       <Stack spacing={3}>
        {diaries?.map((content) => {
         const { diary } = content;
         return (
          <Box key={diary.id} sx={{ border: "solid 1px ", display: "flex", justifyContent: "space-between" }} >
           <Box>
            <Typography sx={{ mb: 1 }}>{diary.id}　タイトル：　{diary.title}　　{diary.publish ? "公開" : "非公開"}</Typography>
            <Typography>{diary.body}</Typography>
            {diary.image.url && <Button onClick={() => handleClickImage(diary.image.url)}>画像</Button>}
           </Box>
           <IconButton onClick={() => handleClickDiary(diary.id)}> <DeleteIcon /></IconButton>
          </Box>
         )
        })}
       </Stack>
       <Dialog open={image} onClose={() => setImage()}>
        <CardMedia
         component="img"
         src={image}
         alt="post image"
        />
       </Dialog>
      </Box>
     }

     {targetItem == "comment" &&
      <Box>
       <Typography textAlign="center" variant="h6">コメント</Typography>
       <Stack spacing={5}>
        <Box>
         {comments?.map((comment) => {
          return (
           <Box key={comment.id} display="flex" alignItems="center">
            <Typography>id：{comment.id}　　{comment.text}</Typography>
            <IconButton onClick={() => handleClickComment(comment.diaryId, comment.id)}><DeleteIcon /></IconButton>
           </Box>
          )
         })}
        </Box>
       </Stack>
      </Box>
     }

     {targetItem == "message" &&
      <Box>
       <Typography textAlign="center" variant="h6">メッセージ</Typography>
       <Stack spacing={1}>
        {messages?.map((message) => {
         let flag = false;
         if (roomFlag !== message.roomId) {
          roomFlag = message.roomId
          flag = true;
         }
         return (
          <>
           {flag && <Divider />}
           <Box key={message.id}>
            {flag && <Typography>room_id：{message.roomId}</Typography>}
            <Box sx={{ display: "flex", alignItems: "center" }}>
             <Typography>{message.body}</Typography>
             <IconButton onClick={() => handleClickMessage(message.id)}><DeleteIcon /></IconButton>
            </Box>
           </Box>
          </>
         )
        })}
       </Stack>
      </Box>
     }
    </Box>
   )
  } else return <Navigate to="/notfound" />
 } else return <></>;
}
