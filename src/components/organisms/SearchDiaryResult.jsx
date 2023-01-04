import { Box, ListItem, Typography } from "@mui/material";
import { DiaryAccordion } from "./DiaryAccordion";
import moment from "moment";

export const SearchDiaryResult = (props) => {
  const { diaries, setDiaries, handleClickLikesCounter, } = props;
  return (
    <Box>
      {diaries?.length === 0 ?
        <Typography sx={{ ml: 6, mt: 3, fontSize: "12px" }} >
          該当する投稿は見つかりませんでした。
        </Typography>
        :
        diaries?.map((content) => {
          const { diary } = content;
          return (
            <Box key={diary.id}>
              <Typography
                sx={{
                  px: 1,
                  borderRadius: 3,
                  backgroundColor: "#2196f3",
                  color: "#fff"
                }}>
                {moment(diary.createdAt).format("YYYY年MM月")}
              </Typography>
              <ListItem sx={{ px: 1, mb: 3 }}>
                <DiaryAccordion
                  content={content}
                  diaries={diaries}
                  setDiaries={setDiaries}
                  handleClickLikesCounter={handleClickLikesCounter}
                />
              </ListItem>
            </Box>
          )
        })}
    </Box>
  )
}
