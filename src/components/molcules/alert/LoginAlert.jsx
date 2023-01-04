import { Alert, Typography } from "@mui/material";

export const LoginAlert = (props) => {
 const { handleOnClose } = props;
 return (
  <Alert
   severity="error"
   onClose={handleOnClose}
   sx={{ width: { xs: "100%", sm: "100%" }, m: "auto", mb: 1 }}
  >
   <Typography component="p" variant="caption">メールアドレスまたはパスワードに誤りがあります。</Typography>
  </Alert>
 );
}
