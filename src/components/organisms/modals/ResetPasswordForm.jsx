import { useState } from 'react';
import { resetPassword } from '../../../api/auth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, DialogContentText } from "@mui/material";
import { Box } from "@mui/system";
import { EmailInput } from "../../molcules/form/AuthInputs"
import { FormProvider, useForm } from 'react-hook-form';
import { CloseModalButton } from '../../atoms/button/CloseModalButton';
import { SubmitButton } from '../../atoms/button/SubmitButton';

export const ResetPasswordForm = (props) => {
  const { openResetForm, setOpenResetForm } = props;
  const [result, setResult] = useState();
  const methods = useForm({ mode: "onSubmit" });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const handleClose = () => {
    setOpenResetForm(false);
  };

  const handleCloseAlert = () => {
    setResult();
  }

  const onSubmit = async (data) => {
    const params = {
      email: data.email,
      redirectUrl: process.env.REACT_APP_RESETPASSWORD_URL
    }
    setResult();
    try {
      const res = await resetPassword(params);
      setResult("success");
    } catch (err) {
      setResult("warning");
    }
  }

  return (
    <FormProvider {...methods} >
      <Dialog open={openResetForm} onClose={handleClose} fullWidth maxWidth={"xs"}>
        <Box sx={{ py: 2, }}>
          <DialogTitle>パスワード再設定</DialogTitle>
          <CloseModalButton onClose={handleClose} />
          <DialogContent sx={{ py: 0 }}>
            {result &&
              <Alert severity={result} onClose={handleCloseAlert}>
                {result == "success" ?
                  "再設定用メールを送信しました。メールに記載されたURLから変更をおこなってください。"
                  :
                  "パスワードの変更に失敗しました。入力したメールアドレスに誤りがないかご確認ください。"
                }
              </Alert>}
            <DialogContentText>再設定用URLを送信します。</DialogContentText>
            <Box component="form" sx={{ mt: 1 }}>
              <EmailInput />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box width="120px" mr={2}>
              <SubmitButton
                onClick={handleSubmit(onSubmit)}
                loading={isSubmitting}>
                送信
              </SubmitButton>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </FormProvider>
  );
}
