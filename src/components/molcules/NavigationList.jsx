import { Badge, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useState } from 'react';
import { RecommendSignUp } from './alert/RecomendSIgnUp';

export const NavigationList = (props) => {
  const { onClick, isOpenSearch } = props;
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const drawerItems = [
    { str: "日記を読む", action: "/diaries", icon: <MenuBookIcon /> },
    { str: "メッセージ", action: "/messages", icon: <EmailIcon /> },
    { str: "探す", action: "search", icon: <SearchIcon /> },
    { str: "通知", action: "/notifications", icon: <Badge badgeContent={currentUser.notification} color="primary"><NotificationsIcon /></Badge> },
  ]

  const seachListItems = [
    { str: "日記を探す", path: "diaries", icon: <BookIcon fontSize='20px' /> },
    { str: "ユーザーを探す", path: "users", icon: <PersonIcon fontSize='20px' /> },
  ]

  const handleClickItem = (action) => {
    if (action == "/messages" && currentUser.isGest)
      setOpen(true)
    else
      onClick(action)
  }

  return (
    <>
      {drawerItems.map((item) => {
        return (
          <Box key={item.str} sx={{ mt: 2 }}>
            <ListItemButton onClick={() => handleClickItem(item.action)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                secondary={item.str}
                secondaryTypographyProps={{
                  fontSize: "14px",
                }} />
              {item.action == "search" ?
                isOpenSearch ? <ExpandLess sx={{ color: "gray" }} /> : <ExpandMore sx={{ color: "gray" }} />
                :
                <></>
              }
            </ListItemButton>
            <Divider variant='middle' />
            {item.action == "search" &&
              <Collapse in={isOpenSearch} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {seachListItems.map((item) =>
                    <ListItemButton key={item.str} sx={{ pl: 4 }} onClick={() => onClick(`/search/${item.path}`)}>
                      <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end", mr: 1 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        secondary={item.str}
                        secondaryTypographyProps={{
                          fontSize: "12px",
                        }}
                      />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>
            }
          </Box>
        )
      })
      }
      <RecommendSignUp open={open} setOpen={setOpen} />
    </>
  )
}
