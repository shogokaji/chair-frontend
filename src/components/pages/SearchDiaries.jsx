import { departmentList, searchMenuProps } from "../../data/data"
import { Button, CircularProgress, Divider, FormControl, InputLabel, Box, Typography } from "@mui/material";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { searchDiaries, sortDiaries } from "../../api/diary";
import { useEffect } from "react";
import { SearchHeader } from "../atoms/layout/SearchHeader";
import { SearchSubtitle } from "../molcules/SearchSubtitle";
import { SearchDiaryModal } from "../organisms/SearchDiaryModal";
import { LikesList } from "../organisms/modals/LikesList";
import { SearchDiaryResult } from "../organisms/SearchDiaryResult";

const sortButtonItems = [
  { str: "Cheer！の多い日記", sort: "like" },
  { str: "コメントの多い日記", sort: "comment" },
  { str: "今日の投稿", sort: "day" },
  { str: "キーワード検索", sort: "keyWord" }
]

export const SearchDiaries = () => {
  //ソート前,後で分けてリストを柔軟に変動させる
  const [diaries, setDiaries] = useState();
  const [sortedDiaries, setSortedDiaries] = useState();

  //ソート用の診療科、Select用
  const [value, setValue] = useState(12);

  const [sortTarget, setSortTarget] = useState("like");
  const [likingUsers, setLikingUsers] = useState();
  const [likesListOpen, setLikesListOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  //いいね一覧
  const handleClickLikesCounter = (likes) => {
    setLikingUsers(likes)
    setLikesListOpen(true);
  }

  //キーワード検索
  const onSubmit = (data) => {
    setLoading(true);
    handleGetSearch(data);
  }

  const handleGetSearch = async (data) => {
    const res = await searchDiaries(data);
    try {
      setDiaries(res.data.diaries)
      setSortedDiaries(res.data.diaries)
      setOpenModal(false)
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  //Sortボタン
  const handleClick = (value) => {
    setSortTarget(value);
    setValue(12);

    value == "keyWord" ?
      setOpenModal(true)
      :
      setLoading(true)
  };

  const handleGetSort = async () => {
    if (sortTarget == "keyWord") return null;
    const res = await sortDiaries({ sort: sortTarget });
    try {
      setDiaries(res.data.diaries)
      setSortedDiaries(res.data.diaries)
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  //絞り込みメニュー
  const onChangeDepartment = (event, newValue) => {
    setValue(event.target.value);
    setSortedDiaries(
      event.target.value == 12 ?
        diaries  //12の"全ての診療科"であればソート前の一覧を返す
        :
        diaries.filter((value) => value.user.department == event.target.value)
    )
  }
  //初回レンダリング時に初期値"like"で取得
  useEffect(() => {
    handleGetSort();
  }, [sortTarget])

  const SortButtons = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          lignItems: "center",
          gap: 1, mt: 2, mb: 3, mx: { xs: 0, sm: 2 }
        }}>
        {sortButtonItems.map((item) =>
          <Box key={item.str} sx={{ width: { xs: "45%", sm: "24%" } }}>
            <Button
              fullWidth
              size="small"
              variant={sortTarget == item.sort ? "contained" : "outlined"}
              onClick={() => handleClick(item.sort)}
              sx={{ textTransform: "none", borderRadius: 10, }}>
              {item.str}
            </Button>
          </Box>
        )}
      </Box>
    )
  }

  // 絞り込み対象によってタイトルを変更
  const SubTitle = () => {
    let subTitle
    for (let i = 0; i < sortButtonItems.length; i++) {
      if (sortButtonItems[i].sort === sortTarget)
        subTitle = sortButtonItems[i].str
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center", mx: { xs: 0, ms: 2 } }}>
        <Typography>
          {subTitle}
        </Typography>
        <Typography fontSize="10px" color="gray">
          （全{sortedDiaries?.length}件）
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      <SearchHeader>日記を探す</SearchHeader>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <SearchSubtitle>条件別で探す</SearchSubtitle>
      </Box>
      <SortButtons />
      <Box sx={{ mx: { xs: 1, sm: 2 } }}>

        {diaries &&
          <Box sx={{ mb: 1 }}>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <SubTitle />
              <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1, mr: 1 }}>
                <FormControl>
                  <InputLabel>
                    <Typography variant="subtitle1">絞り込み</Typography>
                  </InputLabel>
                  <Select
                    variant="outlined"
                    MenuProps={searchMenuProps}
                    size="small"
                    defaultValue=""
                    displayEmpty
                    label="絞り込み"
                    value={value}
                    onChange={onChangeDepartment}
                    sx={{ height: "30px", minWidth: "150px", maxWidth: "240px" }}
                  >
                    <MenuItem value={12} >
                      <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: 0.5, }}>
                        全ての診療科
                      </Typography>
                    </MenuItem>
                    {departmentList.map((content, index) => (
                      <MenuItem key={content} value={index} >
                        <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: 0.5, }}>
                          {content}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Divider />
          </Box>
        }

        <Box sx={{ height: "90vh", overflowY: "scroll", mx: 1, position: "relative" }}>
          {loading ?
            <CircularProgress sx={{ position: "absolute", right: "45%", mt: 15 }} />
            :
            <SearchDiaryResult
              diaries={value == 12 ? diaries : sortedDiaries}
              setDiaries={value == 12 ? setDiaries : setSortedDiaries}
              handleClickLikesCounter={handleClickLikesCounter}
            />
          }
        </Box>

        <LikesList
          likesListOpen={likesListOpen}
          setLikesListOpen={setLikesListOpen}
          likingUsers={likingUsers}
          setLikingUsers={setLikingUsers}
        />

        <SearchDiaryModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmit}
        />
      </Box>

    </Box >
  );
}




