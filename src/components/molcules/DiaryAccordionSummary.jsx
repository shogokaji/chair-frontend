
import moment from "moment";
import { departmentList, getDiaryDay } from "../../data/data";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Avatar, Typography, Tooltip, } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';


export const DiaryAccordionSummary = (props) => {
 const { user, diary } = props;
 const navigate = useNavigate();
 const { currentUser } = useContext(AuthContext);

 //日付、曜日を取得
 const dayData = getDiaryDay(diary.createdAt);

 const handleClickAvatar = (userId) => {
  navigate(`/${userId}`);
 }
 return (
  <AccordionSummary
   sx={{
    display: "flex",
    pl: 0,
    pr: { xs: 0, sm: 2 },
   }}
   expandIcon={<ExpandMoreIcon />}
  >
   <Box sx={{ display: "flex", flexGrow: 1, }}>
    <Box

     sx={{
      width: { xs: "40px", sm: "60px" },
      color: dayData.color,
      my: "auto"
     }}>
     <Typography
      sx={{
       fontSize: { xs: "12px", sm: "16px" },
       textAlign: "center"
      }}>
      {moment(diary.createdAt).format("DD")}
     </Typography>
     <Typography
      sx={{
       fontSize: { xs: "10px", sm: "14px" },
       textAlign: "center"
      }}>
      {dayData.day}
     </Typography>
    </Box>
    <Box sx={{ flexGrow: 1, }}>
     <Box sx={{ display: "flex" }}>
      <Avatar
       alt="User Image"
       src={user.image.url}
       onClick={() => handleClickAvatar(user.id)}
       sx={{
        width: { xs: 30, sm: 50 },
        height: { xs: 30, sm: 50 },
        mx: 1,
        "&:hover": {
         cursor: "pointer",
         opacity: "80%",
         transition: "opacity 0.5s",
        }
       }} />
      <Box>
       <Typography sx={{ fontSize: { xs: "10px", sm: "12px" }, mr: 2 }}>{user.name}</Typography>
       <Typography fontSize="10px" color="gray">
        {departmentList[user.department]}
       </Typography>
      </Box>
     </Box>
     <Typography
      sx={{
       mt: { xs: 2, sm: 0 },
       fontSize: { xs: "14px", sm: "16px" },
       textAlign: "center",
      }}>
      『 {diary.title} 』
     </Typography>
    </Box>
   </Box>
   {diary.image.url && <PhotoOutlinedIcon sx={{ fontSize: "18px", color: "gray", mr: 1 }} />}
   <Box
    color="gray"
    textAlign="right"
    sx={{
     position: "absolute",
     right: { xs: 10, sm: 20 },
     display: user.id !== currentUser.id && "none"
    }}>
    {diary.publish ?
     <Tooltip title="公開"><LockOpenOutlinedIcon sx={{ fontSize: "18px" }} /></Tooltip>
     :
     <Tooltip title="非公開"><LockOutlinedIcon sx={{ fontSize: "18px" }} /></Tooltip>
    }
   </Box>
  </AccordionSummary>
 );
}
