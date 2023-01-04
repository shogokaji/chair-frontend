import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { RelationList } from "../molcules/RelationList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Relations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("followings");

  const user = location.state
  const followings = user?.follows
  const followers = user?.followers

  const isFollowings = location.pathname.indexOf("followings") > 0;
  const TabItems = [{ str: "フォロー", value: "followings", users: followings }, { str: "フォロワー", value: "followers", users: followers }]

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${user.id}/${newValue}`, { state: user })
  };

  useEffect(() => {
    isFollowings ? setValue("followings") : setValue("followers")
  }, [])

  if (user) {
    return (
      <Box sx={{ mt: 2, mx: "auto", width: "90%" }} >
        <Button
          display="flex"
          onClick={() => navigate(`/${user.id}`)}
          sx={{ textTransform: "none" }}>
          <ArrowBackIcon />
          <Avatar
            alt="user"
            src={user.image.url}
            sx={{ width: 50, height: 50, mx: 1 }} />
          <Typography color="black" variant="subtitle1">{user.name}</Typography>
        </Button>
        <Box sx={{ mt: 1 }}>
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              {TabItems.map((item) =>
                <Tab
                  key={item.str}
                  label={item.str}
                  value={item.value}
                  sx={{
                    flexGrow: 1,
                    transition: "0.5s",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                      opacity: 1
                    },
                  }} />
              )}
            </TabList>
            <Divider />
            {TabItems.map((item) =>
              <TabPanel key={item.str} value={item.value} sx={{ p: 0 }}>
                <RelationList userId={user.id} relations={item.users}>
                  {item.str}
                </RelationList>
              </TabPanel>
            )}
          </TabContext>
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/notfound" />
  }
}
