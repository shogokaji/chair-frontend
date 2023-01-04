import { Avatar, CircularProgress, Divider, IconButton, Link, List, ListItem, ListItemButton, Typography } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteNotifications, getNotifications } from "../../api/notification"
import { Box } from "@mui/system"
import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import moment from "moment"
import { MainHeader } from "../atoms/layout/MainHeader"
import { DeleteButton } from "../atoms/button/DeleteButton"
import { DeleteConfirmation } from "../organisms/modals/DeleteConfirmation"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetNotifications = async () => {
    const res = await getNotifications();
    try {
      setNotifications(res.data.notifications);
      setCurrentUser({ ...currentUser, notification: 0 })
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  const handleClickAvatar = (userId) => {
    navigate(`/${userId}`);
  }

  const handleClickDelete = () => {
    setOpen(true);
  }
  const deleteAction = async () => {
    const res = await deleteNotifications(currentUser.id);
    setNotifications(res.data.notifications);
  }

  const handleClickListItem = (diaryId, userId, role) => {
    if (role == "message")
      navigate(`/message/${userId}`)
    else if (role == "follow")
      navigate(`/${userId}`)
    else
      navigate(`/diaries/${diaryId}`)
  }

  useEffect(() => {
    handleGetNotifications();
  }, [])
  if (!loading) {
    return (
      <>
        <MainHeader>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              通知一覧
            </Box>
            <Box sx={{ display: notifications.length == 0 && "none" }}>
              <DeleteButton onClick={handleClickDelete} />
            </Box>
          </Box>
        </MainHeader>
        <List sx={{ width: "100%", height: "90vh", overflowY: "auto" }}>
          {notifications.length == 0 ?
            <Typography sx={{ mt: 3, textAlign: "center" }}>通知はありません。</Typography>
            :
            notifications?.map((item) => {
              const { notification, user } = item;
              return (
                <Box key={notification.id}>
                  <ListItemButton
                    sx={{
                      width: "90%",
                      display: "flex",
                      alignItems: "center",
                      mx: "auto",
                      flexGrow: 1,
                      borderRadius: 1,
                      bgcolor: notification.checked && "#EEEEEE"
                    }}
                    onClick={() => handleClickListItem(notification.diaryId, user.id, notification.action)}
                  >
                    <Avatar
                      alt="User Image"
                      src={user.image.url}
                      onClick={() => handleClickAvatar(user.id)}
                      sx={{
                        width: { xs: 40, sm: 50 },
                        height: { xs: 40, sm: 50 },
                        mr: 2,
                        "&:hover": {
                          cursor: "pointer",
                          opacity: "80%",
                          transition: "opacity 0.5s",
                        }
                      }} />
                    <Box sx={{ flexGrow: 1 }}>

                      <Box mt={2}>
                        {notification.action == "like" &&
                          <>
                            <Typography component="span" fontSize="12px">{user.name}さんがあなたの日記を</Typography>
                            <Link component="span" variant="caption" underline="hover">Cheer!</Link>
                            <Typography variant="caption">しました。</Typography>
                          </>
                        }
                        {notification.action == "comment" &&
                          <>
                            <Typography component="span" fontSize="12px">{user.name}さんがあなたの日記に</Typography>
                            <Link component="span" variant="caption" underline="hover">コメント</Link>
                            <Typography variant="caption">しました。</Typography>
                          </>
                        }
                        {notification.action == "message" &&
                          <>
                            <Typography component="span" fontSize="12px">{user.name}さんから</Typography>
                            <Link variant="caption" component="span" underline="hover">メッセージ</Link>
                            <Typography variant="caption">が届いています。</Typography>
                          </>
                        }
                        {notification.action == "follow" &&
                          <>
                            <Typography component="span" fontSize="12px">{user.name}さんがあなたを</Typography>
                            <Link component="span" underline="hover" variant="caption">フォロー</Link>
                            <Typography component="span" fontSize="12px">しました。</Typography>
                          </>
                        }

                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Typography fontSize="10px" textAlign="right" color="gray">
                          {moment(notification.createdAt).format("YYYY年MM月DD日 HH:mm")}
                        </Typography>
                      </Box>

                    </Box>
                  </ListItemButton>
                  <Divider variant="middle" sx={{ mt: 0.5, mb: 2 }} />
                </Box>
              )
            })}
        </List>

        <DeleteConfirmation
          open={open}
          setOpen={setOpen}
          action={deleteAction}
          children={"すべての通知を一括削除します。"}
        />
      </>
    )
  } else return <CircularProgress sx={{ position: "absolute", top: "50%", right: "50%" }} />
}
