import { signUp } from '../../../api/auth';
import { Box } from '@mui/material';
import { EmailInput, NameInput, PasswordConfirmationInput, PasswordInput } from '../../molcules/form/AuthInputs';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { AlertContext } from '../../../providers/AlertProvider';
import { SubmitButton } from '../../atoms/button/SubmitButton';

export const SignUpInput = ({ setIsSend }) => {
 const methods = useForm();
 const { handleSubmit, formState: { isSubmitting } } = methods;
 const { setIsOpenError, setAlertMessage } = useContext(AlertContext);

 const onSubmit = async (data) => {
  const params = {
   ...data,
   confirmSuccessUrl: process.env.REACT_APP_SUCCESS_URL
  }
  setIsOpenError(false);
  try {
   const res = await signUp(params);
   setIsSend(true);
  } catch (err) {
   console.log(err)
   setIsOpenError(true);
   setAlertMessage("アカウント登録に失敗しました。")
  }
 };

 return (
  <FormProvider {...methods} >

   <Box component="form"
    sx={{
     width: "100%",
     mt: 3, maxWidth: "300px"
    }}>
    <Stack spacing={2}>
     <NameInput />
     <EmailInput />
     <PasswordInput />
     <PasswordConfirmationInput />
    </Stack>
    <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
     <SubmitButton
      onClick={handleSubmit(onSubmit)}
      loading={isSubmitting}>
      登録
     </SubmitButton>
    </Box>
   </Box>
  </FormProvider>
 );
}
