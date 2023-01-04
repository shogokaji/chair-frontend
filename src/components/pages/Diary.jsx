import { useContext } from "react";
import { Box, Button, Divider, IconButton, Link, ListItemButton, Typography, } from "@mui/material";
import { DiaryIndex } from "../organisms/DiaryIndex";
import { MainHeader } from "../atoms/layout/MainHeader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Search from "@mui/icons-material/Search";

export const Diary = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClickSearch = () => {
    navigate("/search/users")
  }
  return (
    <Box sx={{ height: "90vh", overflowY: "scroll" }}>
      <MainHeader>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Typography>みんなの日記</Typography>
          <Typography fontSize="10px" color="gray">(フォロー中のユーザーの日記)</Typography>
        </Box>
      </MainHeader>
      <Divider sx={{ mb: 1 }} />
      <Box>
        {currentUser?.follows.length === 0 ?
          <>
            <Typography sx={{ textAlign: "center", mt: 3 }}>フォロー中のユーザーはいません。</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 5 }}>
              <Button variant="contained" onClick={handleClickSearch}>
                <Search />
                <Typography>探しに行く</Typography>
              </Button>
            </Box>
          </>
          :
          <DiaryIndex />
        }
      </Box>
    </Box>
  );
}
