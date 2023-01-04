import { List, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { departmentList } from "../../../data/data";
import { Box } from "@mui/system";
import { Avatar, Divider, IconButton, } from "@mui/material";
import { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../../../providers/AuthProvider";
import EditIcon from '@mui/icons-material/Edit';

export const CommentList = (props) => {
 const { handleClickAvatar, comments, diary, handleClickEdit, handleClickDelete } = props;
 const { currentUser } = useContext(AuthContext);

 return (
  <List sx={{ display: "flex", flexDirection: "column", mx: { xs: 2, sm: 5 }, my: 1 }}>
   {comments.length === 0 ?
    <Typography fontSize="12px">コメントはまだありません。</Typography>
    :
    comments.map((item) => {
     const { comment, user } = item;
     return (
      <Box key={comment.id} sx={{
       mx: 1, my: 2,
      }}>
       <Box sx={{ display: "flex" }}>
        <Avatar
         alt="User Image"
         src={user.image.url}
         onClick={() => handleClickAvatar(user.id)}
         sx={{
          width: { xs: 40, sm: 50 },
          height: { xs: 40, sm: 50 },
          mr: 1,
          "&:hover": {
           cursor: "pointer",
           opacity: "80%",
           transition: "opacity 300ms",
          }
         }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
         <Box>
          <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>{user.name}</Typography>
          <Typography sx={{ fontSize: "10px", color: "gray", }}>{departmentList[user.department]}</Typography>
         </Box>
         <Box sx={{ display: "flex" }}>
          {user.id === currentUser.id &&
           <Tooltip title="編集" >
            <IconButton onClick={() => handleClickEdit(comment)} sx={{ pr: { xs: 0, sm: 1 }, pb: { xs: 0, sm: 1 } }}>
             <EditIcon sx={{ fontSize: { xs: "18px", sm: "22px" } }} />
            </IconButton>
           </Tooltip>
          }
          {(user.id === currentUser.id || diary.userId === currentUser.id) &&
           <Tooltip title="削除" >
            <IconButton onClick={() => handleClickDelete(comment)} sx={{ pb: { xs: 0, sm: 1 } }}>
             <DeleteIcon sx={{ fontSize: { xs: "18px", sm: "22px" } }} />
            </IconButton>
           </Tooltip>
          }
         </Box>
        </Box>
       </Box>
       <Box sx={{ ml: { xs: 0, sm: 5 }, mt: 1, mb: 3, p: 1, border: "solid 0.5px silver", borderRadius: "10px" }}>
        <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, whiteSpace: 'pre-line', wordBreak: "break-all", p: 1 }} >
         {comment.text}
        </Typography>
        < Typography
         color="gray"
         fontSize="10px"
         textAlign="right"
         mt={1}
         children={`投稿日：${moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}`}
        />
       </Box>
       <Divider />
      </Box>
     )
    })
   }
  </List >
 )
}
