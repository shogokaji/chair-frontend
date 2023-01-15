import { useState } from "react";
import { AuthHeader } from "../atoms/layout/AuthHeader";
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { SignInCard } from "../molcules/SignInCard";
import { AuthModal } from "../organisms/auth/AuthModal";
import { gestSignIn, getCurrentUser } from "../../api/auth";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Cookies from "js-cookie";
import { SuccessAlert } from "../molcules/alert/SuccessAlert";
import { AlertContext } from "../../providers/AlertProvider";

export const SignIn = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const { isOpenSuccess, alertMessage } = useContext(AlertContext);

  const navigate = useNavigate();

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleClickSignup = () => {
    setOpenSignUp(true);
    setOpenSignIn(false);
  }

  const handleGestLogin = async () => {
    try {
      const res = await gestSignIn();

      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);

      setIsSignedIn(true);
      const data = await getCurrentUser();
      setCurrentUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  const onClickSignIn = () => {
    setOpenSignIn(true);
    setOpenSignUp(false);
  }

  const handleClickChair = () => {
    navigate("/about")
  }

  const handleCloseModal = () => {
    setOpenSignIn(false);
    setOpenSignUp(false);
  }

  const signInButtons = [
    { str: "いますぐ始める", color: "success", width: true, action: () => handleClickSignup() },
    { str: "ゲストログイン", color: "inherit", width: false, action: () => handleGestLogin() },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#FFFAF0", position: "relative" }}>

        <AuthHeader setOpen={setOpenSignIn} />
        <Grid container component="main" sx={{
          width: "100%", height: '100vh', my: "auto",
          bgcolor: "rgba(255,255,255,0.4)",
          backgroundBlendMode: "lighten",
          backgroundImage: `url(${process.env.REACT_APP_WEB_DOMEIN}/top.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: "right",
        }}>
          <CssBaseline />
          <Grid item xs={12} md={7}>
            <Box sx={{
              mt: { xs: 15, sm: 20, md: 30 },
              display: "flex",
              flexDirection: "column",
              zIndex: 200
            }}>
              {isOpenSuccess && <SuccessAlert>{alertMessage}</SuccessAlert>}
              <Typography
                variant="subtitle1"
                sx={{
                  mr: { xs: 0, md: 30 },
                  textAlign: "center",
                }}>
                闘病生活日記SNS
              </Typography>
              <Typography
                variant="h1"
                onClick={handleClickChair}
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontFamily: 'Solway, serif',
                  fontWeight: 700,
                  letterSpacing: '.6rem',
                  color: 'inherit',
                  "&:hover": {
                    cursor: "pointer",
                    opacity: "80%",
                    transition: "opacity 0.5s",
                  }
                }}>
                Chair
              </Typography>
              <Divider sx={{ width: "60%", mx: "auto" }} variant="middle" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  日々の記録を日記として残す。<br />
                  似た境遇のユーザー同士が繋がる。<br />
                  コメントやメッセージで励ましあう。
                </Typography>
              </Box>

              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40%",
                gap: 3, mt: 5, mx: "auto",
              }}>
                {signInButtons.map((item) =>
                  <Button
                    key={item.str}
                    fullWidth={item.width}
                    color={item.color}
                    variant="contained"
                    onClick={item.action}
                    sx={{
                      transition: ".6s ease",
                      "&:hover": {
                        transform: "scale(1.1)"
                      }
                    }}>{item.str}</Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={0} md={5}
            sx={{
              p: 1,
              pt: "64px",
              height: "100%",
              width: "100%",
              display: { xs: "none", md: "block" },
              position: "relative"
            }}>
            <SignInCard />
          </Grid>
        </Grid >
        <AuthModal
          openSignIn={openSignIn}
          openSignUp={openSignUp}
          onClose={handleCloseModal}
          onClickSignIn={onClickSignIn}
        />
      </Box >
    </ThemeProvider >
  );
}
