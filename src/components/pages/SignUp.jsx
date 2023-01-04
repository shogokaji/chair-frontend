import { ErrorAlert } from '../molcules/alert/ErrorAlert';
import { SignUpInput } from "../organisms/auth/SignUpInput";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { useState } from 'react';
import { useContext } from 'react';
import { AlertContext } from '../../providers/AlertProvider';

export const SignUp = (props) => {
  const { onClickSignIn } = props;
  const [isSend, setIsSend] = useState(false);
  const { isOpenError, alertMessage } = useContext(AlertContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5"> アカウント登録</Typography>
      <Box sx={{ mx: "auto", }}>
        {isOpenError &&
          <ErrorAlert>
            {alertMessage}
          </ErrorAlert>
        }
      </Box>
      <Dialog open={isSend} sx={{ p: 2 }}>
        <DialogTitle fontSize="14px">メールを送信しました。</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            メールに記載されたリンクからログインしてください。
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <SignUpInput setIsSend={setIsSend} />
      <Box sx={{ mt: 2, textAlign: "end" }}>
        <Link variant="body2" onClick={onClickSignIn} >
          アカウントをお持ちの方はこちら
        </Link>
      </Box>
    </Box>
  );
}
