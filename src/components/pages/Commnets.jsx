import { CircularProgress, Typography } from "@mui/material";
import { deleteComment, getComments } from "../../api/comment";
import { useNavigate, useParams, } from "react-router-dom";
import { Box } from "@mui/system";
import { Divider, IconButton, } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { MainHeader } from "../atoms/layout/MainHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LikesList } from "../organisms/modals/LikesList";
import { DeleteConfirmation } from "../organisms/modals/DeleteConfirmation";
import { EditComment } from "../organisms/modals/EditComment";
import { CommentForm } from "../organisms/comment/CommentForm";
import { CommentList } from "../organisms/comment/CommentList";
import { DiaryDetails } from "../organisms/comment/DiaryDetails";
import { AlertContext } from "../../providers/AlertProvider";

export const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [diaryData, setDiaryData] = useState();
  const [comments, setComments] = useState();
  const [targetComment, setTargetComment] = useState();
  const [likingUsers, setLikingUsers] = useState();
  const [likesListOpen, setLikesListOpen] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openEditer, setOpenEditer] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

  const navigate = useNavigate();
  const params = useParams();


  const handleClickAvatar = (userId) => {
    navigate(`/${userId}`)
  }

  //いいねしたユーザー一覧表示
  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }

  //コメント編集
  const handleClickEdit = (comment) => {
    setOpenEditer(true);
    setTargetComment(comment);
  }

  //削除メニュークリック時、対象をセットしてモーダルを開く
  const handleClickDelete = (comment) => {
    setTargetComment(comment);
    setOpenConfirmation(true);
  }

  //コメント削除
  const handleDeleteComment = async (comment) => {
    const res = await deleteComment(params.id, comment.id);
    const resData = res.data.comment
    setComments(comments.filter(value => value.comment.id !== resData.id));
    setOpenConfirmation(false);
    setTargetComment();
    setIsOpenSuccess(true);
    setAlertMessage("コメントを削除しました。")
  }

  //コメント一覧取得
  const handleGetComments = async () => {
    const res = await getComments(params.id)
    setComments(res.data.comment);
    setDiaryData(res.data.diary);
    setLoading(false);
  }

  useEffect(() => {
    handleGetComments()
  }, []);

  if (!loading) {
    return (
      <Box>
        <MainHeader>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          コメント一覧
        </MainHeader>
        <DiaryDetails
          handleClickAvatar={handleClickAvatar}
          handleClickLikesCounter={handleClickLikesCounter}
          diaryData={diaryData}
          setLikingUsers={setLikingUsers}
          comments={comments}
        />

        <Typography sx={{ mt: 5, mx: 2, mb: 1 }}>この日記へのコメント</Typography>

        <Divider variant="middle" />

        <CommentList
          comments={comments}
          diary={diaryData.diary}
          handleClickAvatar={handleClickAvatar}
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
        />

        {currentUser.isGest ?
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <Typography>コメントにはアカウントの作成が必要です。</Typography>
          </Box>
          :
          <CommentForm comments={comments} setComments={setComments} setLoading={setLoading} />
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

        {
          targetComment &&
          <>
            <EditComment
              open={openEditer}
              setOpen={setOpenEditer}
              comment={targetComment}
              setComment={setTargetComment}
              comments={comments}
              setComments={setComments}
            />

            <DeleteConfirmation
              open={openConfirmation}
              setOpen={setOpenConfirmation}
              action={() => handleDeleteComment(targetComment)}>
              このコメントを削除します。
            </DeleteConfirmation>
          </>
        }

      </Box >
    )
  } else return <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
}

