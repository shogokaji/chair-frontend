import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, } from "react-router-dom";
import { indexDiary } from "../../api/diary";
import { Typography, Link, Box, ListItem, CircularProgress, } from "@mui/material";
import { LikesList } from "./modals/LikesList";
import { DiaryAccordion } from "./DiaryAccordion";

export const DiaryIndex = () => {
  const [diaries, setDiaries] = useState();
  const [loading, setLoading] = useState(true);
  const [likingUsers, setLikingUsers] = useState();
  const [likesListOpen, setLikesListOpen] = useState(false);
  const navigate = useNavigate();

  //currentUser以外の全ての日記を取得しdiariesに格納
  const handleGetDiaries = async () => {
    const res = await indexDiary();
    try {
      if (res.status === 200) {
        setDiaries(res.data.diaries);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  //いいねしたユーザー一覧モーダルを表示
  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }

  useEffect(() => {
    handleGetDiaries();
  }, []);

  if (!loading) {
    return (
      <Box sx={{ flexGrow: 1, minWidth: "250px", mx: 2, ml: { lg: 3 }, display: "flex", flexDirection: "column" }}>

        {diaries.length === 0 ?
          <Typography sx={{ ml: 6, mt: 3, fontSize: "12px" }} >
            投稿はまだありません。
            <Link onClick={() => navigate(-1)}>戻る</Link>
          </Typography>
          :
          diaries.map((content) => {
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
            );
          })
        }
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
