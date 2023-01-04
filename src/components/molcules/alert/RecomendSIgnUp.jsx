import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { deleteUser } from '../../../api/user';
import { AuthContext } from '../../../providers/AuthProvider';
import { Box } from '@mui/system';
import { Button, Dialog, DialogContent, Typography } from '@mui/material';

export const RecommendSignUp = (props) => {
 const { open, setOpen } = props;

 const { currentUser, setCurrentUser, setIsSignedIn } = useContext(AuthContext);

 const handleClose = () => {
  setOpen(false);
 }

 const navigate = useNavigate();

 const handleClickSignUp = async () => {
  const res = await deleteUser(currentUser.id);
  try {
   if (res.status === 200) {
    Cookies.remove("_access_token")
    Cookies.remove("_client")
    Cookies.remove("_uid")
    navigate("/signin");
    setCurrentUser();
    setIsSignedIn(false);
   }
  } catch (err) {
   console.log(err);
  }
 }

 return (
  <Dialog open={open} onClose={handleClose}>
   <DialogContent sx={{ p: 3 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
     <Typography sx={{ fontSize: "14px" }}>
      メッセージを送るにはアカウント登録が必要です。
     </Typography>
     <Button
      variant="contained"
      color="success"
      onClick={handleClickSignUp}>
      アカウント登録へ
     </Button>
    </Box>
   </DialogContent>
  </Dialog>
 )
}
