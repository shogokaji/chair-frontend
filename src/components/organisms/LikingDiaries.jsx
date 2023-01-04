import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, List, ListItem, Typography } from "@mui/material";
import { LikesList } from "./modals/LikesList";
import { DiaryAccordion } from "./DiaryAccordion"
import moment from "moment";

export const LikingDiaries = () => {
  const [likedDiaries, setLikedDiaries] = useOutletContext();
  const [likingUsers, setLikingUsers] = useState();
  const [likesListOpen, setLikesListOpen] = useState(false);

  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }

  return (
    <List
      sx={{
        width: { xs: "100%", md: "95%" },
        maxHeight: "90vh",
        overflowY: "scroll",
        mx: "auto"
      }}>
      <Typography
        sx={{
          mr: 3,
          textAlign: "end",
          color: "gray",
          fontSize: "10px"
        }}>
        ({likedDiaries.length}件の日記)
      </Typography>
      {likedDiaries.length === 0 &&
        <Typography textAlign="center" fontSize="12px" mt={3}>
          応援した日記はまだありません。
        </Typography>
      }
      <Box sx={{ mx: 2, display: "flex", flexDirection: "column" }}>
        {likedDiaries.map((content, index) => {
          const { diary } = content;
          return (
            <Box key={diary.id} >
              <Typography sx={{ px: 1, borderRadius: 3, backgroundColor: "#2196f3", color: "#fff" }}>
                {moment(diary.createdAt).format("YYYY年MM月")}
              </Typography>
              <ListItem sx={{ px: 1, mb: 3, order: -index }} >
                <DiaryAccordion
                  content={content}
                  diaries={likedDiaries}
                  setDiaries={setLikedDiaries}
                  handleClickLikesCounter={handleClickLikesCounter}
                />
              </ListItem >
            </Box>
          );
        })}
      </Box>
      {likingUsers &&
        <LikesList
          likesListOpen={likesListOpen}
          setLikesListOpen={setLikesListOpen}
          likingUsers={likingUsers}
          setLikingUsers={setLikingUsers} />
      }
    </List >
  );
};
