import { useState } from "react";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormContext } from "react-hook-form";


export const NameInput = () => {
 const { register, formState: { errors } } = useFormContext();
 return (
  <TextField
   margin="dense"
   fullWidth
   type="text"
   label="ユーザー名"
   autoComplete="name"
   autoFocus
   {...register('name', {
    required: "入力が必要です",
    maxLength: {
     value: 12,
     message: "12文字まで登録可能です",
    },
    pattern: {
     value: /^(?! |　).*$/,
     message: "空白は文字の途中のみ使用可能です。"
    },
   })}
   error={'name' in errors}
   helperText={errors.name?.message}
  />

 );
}

export const EmailInput = () => {
 const { register, formState: { errors } } = useFormContext();
 return (
  <TextField
   autoComplete="email"
   fullWidth
   type="email"
   margin="dense"
   label={<Typography>Email<sup>*</sup></Typography>}
   {...register("email", {
    required: "入力が必要です",
    pattern: {
     value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
     message: "入力形式がメールアドレスではありません。"
    }
   })}
   error={'email' in errors}
   helperText={errors.email?.message}
  />
 );
}

export const PasswordInput = () => {
 const { register, formState: { errors } } = useFormContext();
 const [showPassword, setShowPassword] = useState(false);

 //パスワード可視化
 const handleClickShowPassword = () => {
  setShowPassword(!showPassword);
 };

 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 return (
  <FormControl variant="outlined" fullWidth>
   <InputLabel htmlFor="password" error={!!errors.password}>Password<sup>*</sup></InputLabel>
   <OutlinedInput
    error={'password' in errors}
    type={showPassword ? 'text' : 'password'}
    label="Password"
    endAdornment={
     <InputAdornment position="end">
      <IconButton
       aria-label="toggle password visibility"
       onClick={handleClickShowPassword}
       onMouseDown={handleMouseDownPassword}
       edge="end"
      >
       {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
     </InputAdornment>
    }
    {...register('password', {
     required: "入力が必要です",
     minLength: {
      value: 6,
      message: "6文字以上入力してください",
     },
    })}
   />
   <FormHelperText error>
    {errors.password?.message}
   </FormHelperText>
  </FormControl>
 );
}

export const PasswordConfirmationInput = () => {
 const { register, formState: { errors }, getValues } = useFormContext();

 return (
  <TextField
   margin="dense"
   fullWidth
   label="パスワード再入力"
   type="password"
   {...register('password_confirmation', {
    required: "入力が必要です",
    validate: (value) => {
     return (
      value === getValues("password") || "パスワードと一致しません"
     )
    },
   })}
   error={'password_confirmation' in errors}
   helperText={errors.password_confirmation?.message}
  />
 )
}
