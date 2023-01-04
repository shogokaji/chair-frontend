
import { departmentList } from "../../data/data";
import { Avatar, Box, Divider, Card, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { DiaryContext } from "../../providers/DiaryProvider";

export const UserCard = () => {
  const { currentUser } = useContext(AuthContext);
  const { myDiaries } = useContext(DiaryContext);
  const { name, image, department, follows, followers } = currentUser;
  const nameSize = name.length > 8 ? "12px" : "16px";
  return (
    <Card sx={{ width: "100%", }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        mx: 1
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Avatar
            alt="user"
            src={image.url}
            sx={{ width: 70, height: 70, mr: 2, my: 2 }} />
          <Typography
            sx={{ fontSize: "10px", mt: "auto" }}>

            <BookIcon
              color="inherit"
              sx={{ fontSize: "20px", opacity: "0.6" }}
            />
            {myDiaries?.length}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "left", mx: 2, fontSize: nameSize }}>
          {name}
        </Typography>
        <Divider />
        <Box sx={{
          ml: 2,
          opacity: "0.6",
          textAlign: "left",
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography
            variant="caption"
            color={"inherit"}
            sx={{ fontSize: "12px", mt: 1 }}>
            {departmentList[department]}
          </Typography>
          <Box sx={{ display: "flex", }}>
            <Typography
              variant="caption"
              sx={{ fontSize: "10px", mr: 2 }}>
              {follows.length}フォロー</Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "10px", mb: 2 }}>
              {followers.length}フォロワー</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
