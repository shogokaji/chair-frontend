import { like, unLike } from "../../../api/like";
import { Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


export const LikeButton = (props) => {
  const { isLiked, diaryId, diaries, setDiaries } = props;

  const handleLike = async () => {
    const res = await like(diaryId);
    try {
      if (res.status === 200) {
        const likes = res.data.likes
        setDiaries(diaries.map((value) => value.diary.id === diaryId ? { ...value, likes: likes } : value))
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleUnLike = async () => {
    const res = await unLike(diaryId);
    try {
      if (res.status === 200) {
        const likes = res.data.likes
        setDiaries(diaries.map((value) => value.diary.id === diaryId ? { ...value, likes: likes } : value))
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <Button
      onClick={isLiked ? handleUnLike : handleLike}
      variant={isLiked ? "contained" : "outlined"}
      size="small"
      fullWidth
      sx={{
        py: { sm: 1 },
        textTransform: "none"
      }}
    >
      {isLiked ?
        <><ThumbUpOffAltIcon sx={{ fontSize: "14px", mr: 1 }} />Cheer!</>
        : "応援する"}
    </Button>
  );
}
