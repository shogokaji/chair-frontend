import { CardMedia, CircularProgress, Dialog, List, Paper, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { departmentList } from "../../../data/data";
import { Box } from "@mui/system";
import { Avatar, Divider, IconButton, } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useEffect, useState, useContext } from "react";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";

export const DiaryDetails = (props) => {
 const [openImage, setOpenImage] = useState(false);

 const { handleClickAvatar, diaryData, handleClickLikesCounter, comments } = props;

 const handleClickImage = () => {
  setOpenImage(true);
 }

 const { diary, user, likes } = diaryData;
 return (

  <Paper sx={{ my: 1, mx: { xs: 2, sm: 5 }, py: 0.5, borderRadius: "10px" }}>
   <Box sx={{ display: "flex", flexGrow: 1, m: 1 }}>
    <Box sx={{ flexGrow: 1 }}>
     <Box sx={{ display: "flex", mt: 1 }}>
      <Avatar
       alt="User Image"
       src={user.image.url}
       onClick={() => handleClickAvatar(user.id)}
       sx={{
        width: { xs: 40, sm: 50 },
        height: { xs: 40, sm: 50 },
        mx: 1,
        "&:hover": {
         cursor: "pointer",
         opacity: "80%",
         transition: "opacity 0.5s",
        }
       }} />
      <Box sx={{ display: "flex" }}>
       <Box>
        <Typography sx={{ fontSize: { xs: "10px", sm: "12px" }, mr: 2 }}>{user.name}</Typography>
        <Typography sx={{ fontSize: "10px", color: "gray" }}>{departmentList[user.department]}</Typography>
       </Box>

      </Box>
     </Box>
     <Typography variant="subtitle2" sx={{ mx: "auto", textAlign: "center" }} >
      『 {diary.title} 』
     </Typography>
    </Box>

   </Box>
   <Divider variant="middle" />
   <Box sx={{ m: 2, px: 2 }}>
    <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, whiteSpace: 'pre-line', wordBreak: "break-all" }}>
     {diary.body}
    </Typography>
    {diary.image?.url ?
     <CardMedia
      component="img"
      src={diary.image.url}
      alt="post image"
      onClick={handleClickImage}
      sx={{ width: "60%", height: "60%", mx: "auto", mt: 2 }}
     />
     : <></>
    }
    <Dialog
     open={openImage}
     onClose={() => setOpenImage(false)}>
     <CardMedia
      component="img"
      src={diary.image.url}
      alt="post image"
     />
    </Dialog>
   </Box>
   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mx: 2 }}>
    <Box sx={{ display: "flex" }}>

     <IconButton onClick={() => handleClickLikesCounter(likes)} sx={{ display: "flex", alignItems: "center" }}>
      <ThumbUpOffAltIcon sx={{ fontSize: "18px", color: "gray" }} />
      <Typography sx={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
       {likes.length}
      </Typography>
     </IconButton>

     <IconButton
      sx={{
       display: "flex",
       alignItems: "center"
      }}>
      <ChatBubbleOutline sx={{ fontSize: "18px", color: "gray" }} />
      <Typography sx={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
       {comments.length}
      </Typography>
     </IconButton>
    </Box>
    <Typography
     color="gray"
     fontSize="10px"
     children={`投稿日：${moment(diary.createdAt).format("YYYY-MM-DD HH:mm")}`}
    />
   </Box>
  </Paper>
 )
}
