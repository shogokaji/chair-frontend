import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, IconButton, Typography, } from '@mui/material';
import { Avatar } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { List, ListItem, ListItemButton } from "@mui/material";
import { departmentList } from "../../../data/data";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FollowButton } from "../../atoms/button/FollowButton";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


export const LikesList = (props) => {
 const { likesListOpen, setLikesListOpen, likingUsers, setLikingUsers } = props;
 const { currentUser } = useContext(AuthContext);
 const navigate = useNavigate();
 const params = useParams();

 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

 const onClose = () => {
  setLikesListOpen(false);
  setLikingUsers();
 }
 const handleClickUser = (userId) => {
  params.id != userId &&
   navigate(`/${userId}`)
  onClose();
 }
 return (
  <>
   <Dialog
    fullWidth
    fullScreen={fullScreen}
    maxWidth="sm"
    open={likesListOpen}
    keepMounted
    onClose={onClose}
    sx={{ display: "flex", flexDirection: "column" }}
   >

    <DialogTitle sx={{ display: "flex", alignItems: "center", py: 1 }}>
     <IconButton onClick={onClose}><ArrowBackIcon /></IconButton>
     <Typography sx={{ fontSize: "16px" }}>cheer!したユーザー</Typography>
    </DialogTitle>


    <Divider variant='middle' />

    <DialogContent sx={{ pt: 0, }}>
     <List>
      {likingUsers?.map((user) => {
       return (
        <Box key={user.id} position="relative">
         <Box sx={{ position: "absolute", right: 5, top: 10, maxWidth: "100px", zIndex: 9999 }}>
          {user.id !== currentUser.id && <FollowButton user={user} />}
         </Box>
         <ListItemButton key={user.id} sx={{ display: "flex", px: 0, }} onClick={() => handleClickUser(user.id)}>
          <ListItem sx={{ px: 0 }}>
           <Box display="flex">
            <Avatar
             alt="user"
             src={user.image.url}
             sx={{ width: 40, height: 40, mx: 1 }} />
            <Box>
             <Typography fontSize="12px" >{user.name}</Typography>
             <Typography fontSize="10px" color="gray">{departmentList[user.department]}</Typography>
             <Typography fontSize="10px" mx="auto" mt={1}>{user.profile}</Typography>
            </Box>
           </Box>
          </ListItem>
         </ListItemButton>
        </Box>
       )
      })
      }
     </List>
    </DialogContent>
   </Dialog >
  </>


 );
}
