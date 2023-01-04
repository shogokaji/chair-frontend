import { LoginAlert } from "../../molcules/alert/LoginAlert";
import { SignInInput } from "./SignInInput";
import { Avatar, Link, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { ResetPasswordForm } from "../modals/ResetPasswordForm";
import { useState } from "react";

export const SignInPaper = (props) => {
  const { isAlertOpen, setIsAlertOpen } = props;
  const [openResetForm, setOpenResetForm] = useState(false);

  //パスワード再設定用フォーム
  const handleClickResetPassword = () => {
    setOpenResetForm(true);
  }

  const handleOpenAlert = () => {
    setIsAlertOpen(true)
  }

  const handleOnClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        pt: { xs: 10, sm: 0 }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>


        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, mt: 2, mb: 6 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" children="ログイン" />
        </Box>
        <Box sx={{ width: { sm: "80%" }, mx: "auto" }}>
          {isAlertOpen && <LoginAlert handleOnClose={handleOnClose} />}
        </Box>
        <SignInInput handleOpenAlert={handleOpenAlert} />
        <Box sx={{ position: "relative", py: 5 }}>
          <Link onClick={handleClickResetPassword}
            sx={{
              position: "absolute",
              right: 5,
              "&:hover": {
                cursor: "pointer"
              }
            }}
            fontSize="14px"
          >
            パスワードをお忘れですか?
          </Link>
        </Box>
        <ResetPasswordForm
          openResetForm={openResetForm}
          setOpenResetForm={setOpenResetForm} />
      </Box >
    </Box >
  );
}
