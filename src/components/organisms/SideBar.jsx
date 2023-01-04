import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { sideBarWidth } from "../../data/data";
import { Box, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { UserCard } from "../molcules/UserCard";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationList } from "../molcules/NavigationList";
import { useState } from "react";

export const SideBar = (props) => {
  const { setIsOpen } = props;
  const { currentUser } = useContext(AuthContext);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleUserCard = () => {
    navigate(`/${currentUser.id}`);
  }

  const onClickMenuItem = (action) => {
    if (action == "search") {
      setIsOpenSearch(!isOpenSearch);
    } else {
      navigate(action);
    }
  }

  return (
    <Paper elevation={1}
      sx={{
        height: "90vh",
        m: 1,
        width: sideBarWidth,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        position: "fixed",
        overflowY: "scroll",
      }}>

      {/* カード部分 */}
      {/* ログインユーザー以外のページにいる場合ボタンとして機能 */}
      <Button sx={{ textTransform: "none" }} onClick={currentUser.id != params.id ? handleUserCard : undefined}>
        <UserCard />
      </Button>

      {/* サイドバー　リスト部分 */}
      <Box sx={{
        display: "flex", flexDirection: "column", justifyContent: "center", mx: 2
      }}>
        <NavigationList onClick={onClickMenuItem} isOpenSearch={isOpenSearch} />
        <Button
          variant="contained"
          onClick={() => setIsOpen(true)}
          startIcon={<ModeEditIcon />}
          sx={{
            py: 3,
            px: 5,
            mt: 5,
            mb: 3,
            mx: "auto",
            borderRadius: 10,
          }}>
          日記を書く
        </Button>
      </Box >
    </Paper >
  );
}
