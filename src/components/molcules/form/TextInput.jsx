import { useFormContext } from "react-hook-form";
import { TextField } from '@mui/material';

export const TextInput = (props) => {
 const { defaultValue, label, role, maxLength } = props;
 const { register, formState: { errors } } = useFormContext();
 return (
  <TextField
   fullWidth
   inputProps={{ style: { fontSize: "12px" } }}
   InputLabelProps={{ style: { fontSize: "14px" } }}
   label={label}
   margin="dense"
   type="text"
   variant="outlined"
   multiline
   defaultValue={defaultValue}
   maxRows={7}
   minRows={maxLength > 25 ? 4 : 1}
   error={role in errors}
   helperText={errors[role]?.message}
   color="primary"
   size='small'
   {...register(role, {
    maxLength: {
     value: maxLength,
     message: `${maxLength}文字まで登録可能です`,
    },
   })}
  />
 )
}
