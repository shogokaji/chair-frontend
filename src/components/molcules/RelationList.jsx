import { useNavigate } from "react-router-dom"
import { departmentList } from "../../data/data"
import { Avatar, Box, Link, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FollowButton } from "../atoms/button/FollowButton";


export const RelationList = (props) => {
  const { userId, relations, children } = props;
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleClickUser = (id) => {
    navigate(`/${id}`)
  }
  return (
    <List>
      {relations.length === 0 ?
        <Typography variant="caption">
          {children}はまだいません。<br />
          <Link onClick={() => navigate(`/${userId}`)}>
            プロフィールへ戻る
          </Link>
        </Typography>
        :
        relations.map((user) => {
          return (
            <Box key={user.id} position="relative">
              <Box sx={{ position: "absolute", right: 5, top: 10, maxWidth: "100px", zIndex: 500 }}>
                {user.id !== currentUser.id && <FollowButton user={user} />}
              </Box>
              <ListItemButton key={user.id} sx={{ display: "flex", px: 0, position: "relative" }} onClick={() => handleClickUser(user.id)}>
                <ListItem sx={{ px: 0 }}>
                  <Box display="flex">
                    <Avatar
                      alt="user"
                      src={user.image.url}
                      sx={{ width: 50, height: 50, mx: 1 }} />
                    <Box>
                      <Typography>{user.name}</Typography>
                      <Typography fontSize="10px" color="gray">{departmentList[user.department]}</Typography>
                      <Typography fontSize="12px" mx="auto" mt={1}>{user.profile}</Typography>
                    </Box>
                  </Box>
                </ListItem>
              </ListItemButton>
            </Box>
          );
        })}
    </List>
  );
}
