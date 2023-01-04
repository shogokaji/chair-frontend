import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { getDiary } from "../../api/diary";
import { MainHeader } from "../atoms/layout/MainHeader";
import { getLikes, getUser } from "../../api/user";
import { AuthContext } from "../../providers/AuthProvider";
import { DiaryContext } from "../../providers/DiaryProvider";
import { ProfileBody } from "../molcules/ProfileBody";
import { UserDiaries } from "../organisms/UserDiaries";
import { UpdateProfile } from "../organisms/modals/UpdateProfile";
import { Box } from "@mui/system";
import Tab from '@mui/material/Tab';
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from "@mui/lab/TabContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { Divider, IconButton, Typography } from "@mui/material";
import { StartModal } from "../organisms/modals/StartModal";

export const Profile = () => {
  const [targetUser, setTargetUser] = useState();
  const [diaries, setDiaries] = useState([]);
  const [value, setValue] = useState("diaries");
  const [loading, setLoading] = useState(true);
  const [openEditer, setOpenEditer] = useState(false);
  const [likedDiaries, setLikedDiaries] = useState();
  const [openSetup, setOpenSetup] = useState(false);

  //currentUser.id===user.id?で毎回判断すべきか?
  const [isOtherUser, setIsOtherUser] = useState();

  const { currentUser } = useContext(AuthContext);
  const { myDiaries } = useContext(DiaryContext);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  //paramsIdから対象のユーザーを取得、存在しなければ404へ。
  const handleGetUser = async () => {
    if (params.id != currentUser.id) {
      setIsOtherUser(true);
      try {
        const res = await getUser(params.id);
        if (res.status === 200) {
          setTargetUser(res.user);
          const resGetDiary = await getDiary(res.user.id);
          setDiaries(resGetDiary.data.diaries);
        }
      } catch (err) {
        console.log(err);
        navigate("/notfound");
      }
    } else {
      setTargetUser(currentUser);
      setIsOtherUser(false);
      setDiaries(myDiaries);
      setOpenSetup(!currentUser.isSetup);
    }
    const resGetLikes = await getLikes(params.id);
    setLikedDiaries(resGetLikes.data.diaries);
    setLoading(false);
  }

  //タブの切り替えでurl切り替え
  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === "diaries" ?
      navigate(`/${targetUser.id}`)
      :
      navigate(`/${targetUser.id}/likes`);
  };

  const completeSetup = async () => {
    setOpenSetup(false);
    setOpenEditer(true);
  }

  // pathname次第でどちらのタブか分岐
  useEffect(() => {
    handleGetUser();
    setValue(location.pathname.includes("likes") ? "likes" : "diaries");
  }, [location.pathname]);


  if (!loading) {
    const tabItems = [
      { str: `${targetUser.name}さんの日記`, value: "diaries" },
      { str: "応援した日記", value: "likes" }
    ]
    return (
      <Box sx={{ position: "relative" }}>
        <MainHeader>
          {isOtherUser ?
            <>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              プロフィール
            </>
            :
            "HOME"}
        </MainHeader>

        <Box sx={{ display: "block", alignContent: "center", minWidth: "50%", mb: 1 }}>
          <ProfileBody
            setOpenEditer={setOpenEditer}
            user={targetUser}
            setUser={setTargetUser}
            isOtherUser={isOtherUser}
            setDiaries={setDiaries}
            diaries={isOtherUser ? diaries : myDiaries}
          />
          <UpdateProfile
            setUser={setTargetUser}
            openEditer={openEditer}
            setOpenEditer={setOpenEditer}
          />
          {!currentUser.isGest && <StartModal open={openSetup} completeSetup={completeSetup} />}
        </Box>

        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <TabList onChange={handleChange} centered >
              {tabItems.map((item) =>
                <Tab
                  key={item.str}
                  label={
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                        textTransform: "none"
                      }}>
                      {item.str}
                    </Typography>
                  }
                  value={item.value}>
                </Tab>
              )
              }
            </TabList>
            <Divider variant="middle" sx={{ mb: 1 }} />
          </Box>
          <TabPanel value={"diaries"} sx={{ p: 0 }}>
            <UserDiaries diaries={diaries} isOtherUser={isOtherUser} setDiaries={setDiaries} />
          </TabPanel>
          <TabPanel value={"likes"} sx={{ p: 0 }}>
            <Outlet context={[likedDiaries, setLikedDiaries]} />
          </TabPanel>
        </TabContext>
      </Box >
    );
  } else return <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
}
