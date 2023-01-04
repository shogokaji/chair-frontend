import * as React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SubNaviContents } from "../../../data/data";
import { signOut } from '../../../api/auth';
import { AuthContext } from '../../../providers/AuthProvider';
import { MainDrawer } from '../../organisms/MainDrawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import { deleteUser } from '../../../api/user';
import { Contact } from '../../organisms/modals/Contact';
import { SuccessAlert } from '../../molcules/alert/SuccessAlert';
import { AlertContext } from '../../../providers/AlertProvider';

export const Header = () => {
  const [openNavi, setOpenNavi] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const {
    currentUser,
    setIsSignedIn,
    setCurrentUser
  } = useContext(AuthContext);

  const { setIsOpenSuccess, setAlertMessage } = useContext(AlertContext);

  const handleClickNavMenu = (path) => {
    path == "contact" ? setOpenContact(path == "contact") : navigate(path);

  };

  const handleSignOut = async () => {
    const res = currentUser.isGest ? await deleteUser(currentUser.id) : await signOut();
    try {
      if (res.status === 200) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        navigate("/signin");
        setCurrentUser();
        setIsSignedIn(false);
        setIsOpenSuccess(true);
        setAlertMessage("ログアウトしました。");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AppBar sx={{ backgroundColor: "#2196f3", position: "fixed", }}>
        <Container maxWidth="100%">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

            <Box sx={{ display: { xs: "none", md: "flex" }, left: 0 }}>
              <ChairAltIcon
                sx={{ mr: 2, m: "auto", }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mx: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Chair
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={() => setOpenNavi(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Chair
            </Typography>

            <Box sx={{ display: { xs: 'none', md: "flex", mr: 10 } }}>
              {SubNaviContents.map((item) => (
                <Button
                  key={item.str}
                  onClick={() => handleClickNavMenu(item.path)}
                  variant="outlined"
                  sx={{
                    minWidth: "100px",
                    height: "25px",
                    mr: 3,
                    my: "auto",
                    color: 'inherit',
                    display: currentUser.isGest && item.path == "contact" ? "none" : "flex",
                    textTransform: "none"
                  }}
                >
                  <Typography sx={{ fontSize: "8px" }}>
                    {item.str}
                  </Typography>
                </Button>
              ))}
              <Tooltip title="ログアウト" arrow>
                <IconButton
                  onClick={handleSignOut}
                  color="inherit"
                  sx={{
                    backgroundColor: "info"
                  }}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {openAlert &&
        <Box sx={{ position: "absolute", bottom: 20, right: 10, zIndex: 999 }}>
          <SuccessAlert onClose={() => setOpenAlert(false)}>お問合せを送信しました。</SuccessAlert>
        </Box>}
      <Contact open={openContact} setOpen={setOpenContact} setOpenAlert={setOpenAlert} />
      <MainDrawer
        openNavi={openNavi}
        setOpenNavi={setOpenNavi}
        handleSignOut={handleSignOut}
      />
    </>
  );
};
