import { useEffect, useState } from "react";
import moment from "moment";
import { getRelationalDiary } from "../../api/diary"
import { LikesList } from "../organisms/modals/LikesList";
import { Box } from "@mui/system";
import { ListItem, Typography, Link, CircularProgress, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DiaryAccordion } from "../organisms/DiaryAccordion";

export const Home = () => {
  const [diaries, setDiaries] = useState();
  const [loading, setLoading] = useState(true);
  const [likingUsers, setLikingUsers] = useState();
  const [likesListOpen, setLikesListOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetRelationalDiaries = async () => {
    const res = await getRelationalDiary();
    try {
      setDiaries(res.data.diaries)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }


  useEffect(() => {
    handleGetRelationalDiaries();
  }, [])

  if (!loading && diaries) {
    return (
      <Box sx={{ flexGrow: 1, minWidth: "250px", mx: 2, ml: { lg: 3 }, display: "flex", flexDirection: "column" }}>

        {diaries.length === 0 &&
          <Typography sx={{ ml: 6, mt: 3, fontSize: "12px" }} >
            日記の投稿はまだありません。
            <Link onClick={() => navigate(-1)}>戻る</Link>
          </Typography>}

        {diaries.map((content) => {
          const { diary } = content;
          return (
            <Box key={diary.id} >
              <Typography sx={{ px: 1, borderRadius: 3, backgroundColor: "#2196f3", color: "#fff" }}>
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
        {
          likingUsers &&
          <LikesList
            likesListOpen={likesListOpen}
            setLikesListOpen={setLikesListOpen}
            likingUsers={likingUsers}
            setLikingUsers={setLikingUsers}
          />
        }
      </Box>
    );
  } else return <CircularProgress sx={{ position: "absolute", top: "50%", right: "50%" }} />
}
