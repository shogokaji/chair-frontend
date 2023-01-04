import { useState, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DiaryForm } from "./modals/DiaryForm";
import { DiaryContext } from "../../providers/DiaryProvider";
import { Box, Link, List, ListItem, Typography } from "@mui/material";
import { LikesList } from "./modals/LikesList";
import { DiaryAccordion } from "./DiaryAccordion";


// DiaryIndex,LikingDiariesと共通化するべきか検討

export const UserDiaries = (props) => {
  const { diaries, setDiaries, isOtherUser } = props;
  const [editerOpen, setEditerOpen] = useState(false);
  const [likesListOpen, setLikesListOpen] = useState(false);
  const { myDiaries } = useContext(DiaryContext);
  //編集ターゲット用
  const [diary, setDiary] = useState();
  //likeしたユーザー一覧をListに渡して、リアルタイムで増減表現する
  const [likingUsers, setLikingUsers] = useState();

  const navigate = useNavigate();

  //編集ボタン
  const handleClickEdit = (diary) => {
    setDiary(diary);
    setEditerOpen(true);
  }


  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }

  //自分の日記か、他ユーザーの日記か分岐
  const TargetDiaries = isOtherUser ? diaries : myDiaries;

  return (
    <List
      sx={{
        width: { xs: "100%", md: "95%" },
        maxHeight: "90vh",
        overflowY: "scroll",
        mx: "auto"
      }}>
      <Typography sx={{ mr: 3, textAlign: "end", color: "gray", fontSize: "10px" }}>({TargetDiaries.length}件の日記)</Typography>
      {TargetDiaries.length === 0 &&
        <Typography sx={{ fontSize: "12px", mt: 3, textAlign: "center" }} >
          日記の投稿はまだありません。
        </Typography>
      }
      {TargetDiaries.map((content) => {
        const { diary } = content;

        if (!isOtherUser || diary.publish) {
          return (
            <Box key={diary.id} sx={{ mx: 2 }}>
              <Typography sx={{ mt: 2, px: 1, borderRadius: 3, backgroundColor: "#2196f3", color: "#fff" }}>
                {moment(diary.createdAt).format("YYYY年MM月")}
              </Typography>
              <ListItem sx={{ px: 1, mb: 3 }}>
                <DiaryAccordion
                  content={content}
                  diaries={TargetDiaries}
                  setDiaries={setDiaries}
                  handleClickLikesCounter={handleClickLikesCounter}
                  handleClickEdit={handleClickEdit}
                />
              </ListItem >
            </Box >
          );
        }
      })
      }
      {diary &&
        <DiaryForm
          isOpen={editerOpen}
          setIsOpen={setEditerOpen}
          diary={diary}
          setDiary={setDiary}
          role={"編集"}
        />
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
    </List >
  );
};
