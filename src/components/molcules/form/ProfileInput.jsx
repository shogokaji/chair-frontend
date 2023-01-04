import { useFormContext } from "react-hook-form";
import { departmentList, ageList, sexList } from '../../../data/data';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Avatar, IconButton } from '@mui/material';
import { useCallback } from "react";

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: '20ch',
    }
  }
}

export const UserNameInput = ({ value }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <FormControl sx={{ display: "flex", flexDirection: "column", maxWidth: "230px", }}>
      <FormLabel>
        <Typography variant="caption">ユーザー名</Typography>
      </FormLabel>
      <TextField
        fullWidth
        size='small'
        margin="dense"
        type="text"
        variant="standard"
        error={'name' in errors}
        helperText={errors.name?.message}
        defaultValue={value}
        inputProps={{ style: { fontSize: "12px" } }}
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
      />
    </FormControl>
  )
}

export const SexInput = ({ value }) => {
  const { register } = useFormContext();
  return (
    <FormControl sx={{ mr: 3, minWidth: "120px" }}>
      <InputLabel>性別</InputLabel>
      <Select
        size="small"
        defaultValue={value}
        label="性別"
        {...register("sex")}
        inputlabelprops={{ style: { fontSize: "12px" } }}
        input={< OutlinedInput sx={{ fontSize: '12px' }} label="性別" />}
        MenuProps={menuProps}
      >
        {sexList.map((sex, index) => {
          let children = index === 0 ? "選択しない" : sex;
          return <MenuItem key={sex} value={index}>{children}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export const AgeInput = (props) => {
  const { register } = useFormContext();
  const { value } = props;
  return (
    <FormControl sx={{ mr: 3, minWidth: "120px" }}>
      <InputLabel>年齢</InputLabel>
      <Select
        size="small"
        defaultValue={value}
        label="年齢"
        {...register("age")}
        inputlabelprops={{ style: { fontSize: "12px" } }}
        input={< OutlinedInput sx={{ fontSize: '12px' }} label="年齢" />}
        MenuProps={menuProps}
      >
        {ageList.map((age, index) => {
          let children = index === 0 ? "選択しない" : age;
          return <MenuItem key={age} value={index}>{children}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export const DepartmentInput = (props) => {
  const { register } = useFormContext();
  const { value } = props;
  return (
    <FormControl sx={{ minWidth: "140px" }}>
      <InputLabel sx={{ fontSize: "14px" }}>診療科</InputLabel>
      <Select
        size="small"
        defaultValue={value}
        {...register("department", {
          required: "必ず選択してください"
        })}
        inputlabelprops={{ style: { fontSize: "12px" } }}
        input={<OutlinedInput sx={{ fontSize: '12px' }} label="診療科" />}
        MenuProps={menuProps}
      >
        {departmentList.map((department, index) => {
          return <MenuItem key={department} value={index} >{department}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export const ProfileImageInput = (props) => {
  const { prevImage, preview, setPreview } = props;
  const { register, formState: { errors } } = useFormContext();

  const previewImage = useCallback(async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  }, [])
  return (
    <>
      <IconButton component="label" sx={{ pl: 0, mr: 1 }}>
        <input
          type="file"
          accept="image/*"
          id="icon-button-file"
          hidden
          {...register("image", {
            validate: files => {
              if (files != null) {
                if (files[0]?.size > 20000000)
                  return "画像データサイズが大きすぎます。"
                else if (files[0] && !["image/jpeg", "image/jpg", "image/png"].includes(
                  files[0].type))
                  return "未対応の画像形式です。"
              }
            },
          })}
          onChange={(e) => {
            register('image').onChange(e)
            previewImage(e)
          }}
        />
        <Avatar alt="profile image" src={preview} sx={{ height: { xs: "100px", sm: "160px" }, width: { xs: "100px", sm: "160px" } }} />
      </IconButton>
      <FormHelperText error={errors.image} sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
        {errors.image?.message}
      </FormHelperText>
    </>
  )
}
