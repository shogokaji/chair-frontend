import { useNavigate } from "react-router-dom";
import { departmentList } from "../../data/data"
import { Avatar } from "@mui/material";
import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { FollowButton } from "../atoms/button/FollowButton";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const SearchUserResult = (props) => {
  const { users } = props;

  const { currentUser, } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickUser = (userId) => {
    currentUser.admin ? navigate(`/admin/${userId}`) : navigate(`/${userId}`)
  }

  return (
    <>
      <Box
        sx={{ ml: 2, display: "flex", alignItems: "center" }}>
        <Typography textAlign="center" my={1}>
          検索結果
        </Typography>
        <Typography fontSize="10px" color="gray">
          （全{users.length}件）
        </Typography>
      </Box>

      <Box sx={{ height: "90vh", overflowY: "scroll" }}>
        {
          users.length == 0 ?
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography>ユーザーが見つかりませんでした。</Typography>
            </Box>
            :
            users.map((user) => {
              return (
                <Box key={user.id} position="relative">
                  <Box sx={{ position: "absolute", right: 10, top: 10, maxWidth: "100px", zIndex: 500 }}>
                    {user.id !== currentUser.id && <FollowButton user={user} />}
                  </Box>
                  <ListItemButton key={user.id} sx={{ display: "flex", px: { xs: 0, sm: 2 }, position: "relative" }} onClick={() => handleClickUser(user.id)}>
                    <ListItem sx={{ px: 0 }}>
                      <Box display="flex">
                        <Avatar
                          alt="user"
                          src={user.image.url}
                          sx={{ width: 50, height: 50, mx: 1 }} />
                        <Box>
                          <Typography fontSize="14px">{user.name}</Typography>
                          <Typography fontSize="10px" color="gray">{departmentList[user.department]}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", mr: 5, mt: 1 }}>{user.profile}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  </ListItemButton>
                </Box>
              );
            })
        }

      </Box>
    </>

  )
}
