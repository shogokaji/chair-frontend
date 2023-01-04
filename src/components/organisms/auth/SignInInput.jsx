import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { EmailInput, PasswordInput } from "../../molcules/form/AuthInputs";
import { getCurrentUser, signIn } from "../../../api/auth";
import { AuthContext } from "../../../providers/AuthProvider";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { SubmitButton } from "../../atoms/button/SubmitButton";

export const SignInInput = (props) => {

 const methods = useForm();
 const { handleSubmit, formState: { isSubmitting } } = methods;
 const { handleOpenAlert } = props;
 const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
 const navigate = useNavigate();

 const onSubmit = async (params) => {
  try {
   const res = await signIn(params);
   if (res.status === 200) {
    Cookies.set("_access_token", res.headers["access-token"]);
    Cookies.set("_client", res.headers["client"]);
    Cookies.set("_uid", res.headers["uid"]);
    setIsSignedIn(true);
    const data = await getCurrentUser();
    setCurrentUser(data.user);
    navigate("/");
   } else {
    handleOpenAlert(true);
   }
  } catch (err) {
   handleOpenAlert(true);
   console.log(err);
  }
 };

 return (
  <FormProvider {...methods} >
   <Box component="form" noValidate sx={{ maxWidth: { xs: "400px" }, mx: "auto" }}>
    <Stack spacing={3}>
     <EmailInput />
     <PasswordInput />
    </Stack>
    <Box sx={{ width: "80%", mx: "auto", mt: 3 }}>
     <SubmitButton
      loading={isSubmitting}
      onClick={handleSubmit(onSubmit)
      }>
      ログイン
     </SubmitButton>
     {/* <SubmitButton onSubmit={onSubmit}>ログイン</SubmitButton> */}
    </Box>
   </Box >
  </FormProvider>
 );
}
