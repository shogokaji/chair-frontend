import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import moment from 'moment';
import { Typography } from '@mui/material';


// Profileデータ
export const ageList = [
 "-",
 "10代",
 "20代",
 "30代",
 "40代",
 "50代",
 "60代",
 "70代",
 "80代",
 "90代",
];

export const sexList = [
 "-",
 "女性",
 "男性",
];

export const departmentList = [
 "呼吸器内科・外科",
 "消化器内科・外科",
 "循環器内科・外科",
 "整形外科",
 "婦人科",
 "精神科",
 "脳神経外科",
 "眼科・耳鼻咽頭科",
 "皮膚科",
 "泌尿器科",
 "小児科",
 "その他の科",
];

// Header サイドバーデータ
export const NaviContents = [
 { str: "日記を読む", icon: <MenuBookIcon />, action: "/diaries" },
 { str: "探す", icon: <SearchIcon />, action: "/users" },
 { str: "メッセージ", icon: <EmailIcon />, action: "/messages" },
 { str: "通知", icon: <NotificationsIcon />, action: "/noifications" },
];

export const SubNaviContents = [
 { str: "お問い合わせ", path: "contact" },
 { str: "Chairについて", path: "/about" }
]

export const settings = [
 { str: 'プロフィール', icon: <InsertEmoticonIcon sx={{ opacity: "0.6" }} /> },
 { str: 'ログアウト', icon: <Logout sx={{ opacity: "0.6" }} /> },
];

export const drawerWidth = 240;
export const sideBarWidth = "300px";


//曜日の取得
export const getDiaryDay = (createdAt) => {
 const year = moment(createdAt).format("YYYY");
 const month = moment(createdAt).format("MM");
 const jsMonth = month - 1;
 const day = moment(createdAt).format("DD");
 const dayOfWeek = [
  { day: "(日)", color: "red" },
  { day: "(月)", color: "inheirt" },
  { day: "(火)", color: "inherit" },
  { day: "(水)", color: "inherit" },
  { day: "(木)", color: "inherit" },
  { day: "(金)", color: "inherit" },
  { day: "(土)", color: "blue" },
 ];
 const date = new Date(year, jsMonth, day)
 return (
  dayOfWeek[date.getDay()]
 );
}

//Search Menu
export const searchMenuProps = {
 PaperProps: {
  style: {
   maxHeight: 200,
   width: '20ch',
  }
 }
}

