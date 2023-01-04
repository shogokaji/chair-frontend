import { useNavigate } from "react-router-dom";
import { ageList, departmentList, sexList } from "../../data/data";
import { Box } from "@mui/system";
import { Avatar, Button, CardMedia, Dialog, Divider, Typography } from "@mui/material";
import { FollowButton } from "../atoms/button/FollowButton";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { DeleteConfirmation } from "../organisms/modals/DeleteConfirmation";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Cookies from "js-cookie";
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser } from "../../api/user";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "../../api/auth";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { AlertContext } from "../../providers/AlertProvider";
import { RecommendSignUp } from "./alert/RecomendSIgnUp";

export const ProfileBody = (props) => {
  const { setOpenEditer, user, setUser, diaries, isOtherUser } = props;
  const { name, sex, age, department, disease, favorite, profile } = user;
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openProfileImage, setOpenProfileImage] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const { currentUser, setCurrentUser, setIsSignedIn } = useContext(AuthContext);
  const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const profileTexts = [
    { str: "疾患", data: disease },
    { str: "好きなこと", data: favorite },
  ]

  const relationItems = [
    { str: "フォロー", count: user.follows.length, path: `/${user.id}/followings`, },
    { str: "フォロワー", count: user.followers.length, path: `/${user.id}/followers`, }
  ]

  const profileItems = [
    { str: "年代", data: ageList[age] },
    { str: "性別", data: sexList[sex] },
    { str: "日記数", data: diaries.length }
  ]

  const menuItems = [
    { str: "プロフィール編集", icon: <EditIcon sx={{ fontSize: "18px" }} /> },
    { str: "ログアウト", icon: <LogoutIcon sx={{ fontSize: "18px" }} /> },
    { str: "アカウント削除", icon: <DeleteIcon sx={{ fontSize: "18px" }} /> }
  ]


  //Menuアイテム
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setOpenEditer(true);
    setAnchorEl(null)
  }

  const handleClickSignOut = async () => {
    const res = currentUser.isGest ? await deleteUser(currentUser.id) : await signOut();
    try {
      if (res.status === 200) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        navigate("/signin");
        setIsOpenSuccess(true);
        setAlertMessage("ログアウトしました。");
        setCurrentUser();
        setIsSignedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleClickDelete = () => {
    setOpenConfirmation(true);
    setAnchorEl(null)
  }

  //MenuItemの配列に応じてonClickイベントを分岐
  const menuEvent = (index) => {
    if (index == 0) handleClickEdit();
    else if (index == 1) handleClickSignOut();
    else handleClickDelete();
  }

  //deleteConfirmationに渡すaction  
  const deleteAccount = async () => {
    try {
      const res = await deleteUser(currentUser.id);
      if (res.status === 200) {
        setIsSignedIn(false);
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        setIsOpenSuccess(true);
        setAlertMessage("アカウントを削除しました。");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleClickAvatar = () => {
    setOpenProfileImage(true);
  }

  const handleClickMessage = () => {
    currentUser.isGest ?
      setOpenReject(true)
      :
      navigate(`/message/${user.id}`)
  }

  return (
    <Box sx={{ mx: 2, mb: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", ml: { sm: 2 } }}>
          <Avatar
            onClick={handleClickAvatar}
            alt="user" src={user.image.url}
            sx={{
              mt: 2,
              width: { xs: 100, sm: 180 },
              height: { xs: 100, sm: 180 },
              "&:hover": {
                cursor: "pointer",
                opacity: "80%",
                transition: "opacity 0.5s",
              }
            }} />
          <Box sx={{ mx: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <Typography sx={{ fontSize: { xs: "14px", sm: "20px" }, fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography sx={{ fontSize: { xs: "10px", sm: "12px" }, color: "gray" }} >
              {departmentList[department]}
            </Typography>
          </Box>
        </Box>
        <Dialog
          open={openProfileImage}
          onClose={() => setOpenProfileImage(false)}>
          <CardMedia
            component="img"
            src={user.image.url}
            alt="User Image"
          />
        </Dialog>

        <Box sx={{ mt: 2 }}>
          {user.id === currentUser.id && !currentUser.isGest ?
            <>
              <IconButton onClick={handleClickMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                open={open}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
              >
                {menuItems.map((item, index) => {
                  return (
                    <MenuItem
                      key={item.str}
                      onClick={() => menuEvent(index)}
                      sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ color: "gray", mr: 1, mt: 0.5 }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                        {item.str}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
            :
            <Box sx={{ display: "flex" }}>
              {isOtherUser &&
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexGrow: 1
                }}>
                  <IconButton onClick={handleClickMessage} >
                    <MailOutlineIcon color="primary" />
                  </IconButton>
                  <Box sx={{ width: { xs: "90px", sm: "120px" } }}>
                    <FollowButton user={user} setUser={setUser} />
                  </Box>
                </Box>
              }
            </Box>
          }
        </Box>
      </Box>
      <Box sx={{ ml: { sm: 3 }, my: 1, maxWidth: "600px" }}>


        <Typography sx={{
          fontSize: { xs: "10px", sm: "12px" },
          my: 2,
          wordBreak: "break-all"
        }}>
          {profile}
        </Typography>

        <Box sx={{ display: "flex" }}>
          {relationItems.map((item) =>
            <Button
              key={item.str}
              onClick={() => navigate(item.path, { state: user })}
              sx={{ color: "inherit", pb: 0 }}>
              <Typography sx={{ fontSize: "10px", mr: 0.5 }}>
                {item.count}
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray" }}>
                {item.str}
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
      <DeleteConfirmation
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        action={deleteAccount}
        children={"日記を含むすべてのデータが削除されます。"}
      />
      <Divider />
      <Box sx={{ display: "flex", mt: 1, ml: { sm: 5 } }}>
        {profileItems.map((item) =>
          <Box key={item.str} sx={{ mt: 1, width: "60px", mr: 2 }}>
            <Typography sx={{ color: "gray", fontSize: "12px" }}>
              {item.str}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                borderRadius: 3,
                border: "0.5px solid silver",
                p: 0.5,
                textAlign: "center"
              }}>
              {item.data}
            </Typography>
          </Box>
        )}
      </Box>
      {
        profileTexts.map((item) =>
          <Box key={item.str} sx={{ mt: 1, ml: { sm: 5 }, maxWidth: "450px" }}>
            <Typography sx={{ color: "gray", fontSize: "12px" }}>
              {item.str}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                borderRadius: 3,
                border: "0.5px solid silver",
                p: 1
              }}>
              {item.data}
            </Typography>
          </Box>
        )
      }
      <RecommendSignUp open={openReject} setOpen={setOpenReject} />
    </Box >
  );
}
