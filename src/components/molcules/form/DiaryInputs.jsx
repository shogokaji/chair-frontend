import { CardMedia, FormHelperText, FormLabel, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

export const DiaryTitle = (props) => {
  const { value } = props;
  const { register, formState: { errors } } = useFormContext();
  return (
    <>
      <FormLabel sx={{ fontSize: "14px" }}>
        タイトル
        <Typography variant='caption' >(15文字まで)</Typography>
      </FormLabel>
      <TextField
        fullWidth
        margin="dense"
        type="text"
        variant="standard"
        error={'title' in errors}
        helperText={errors.title?.message}
        defaultValue={value}
        inputProps={{ style: { fontSize: "14px" } }}
        {...register('title', {
          required: "入力が必要です",
          maxLength: {
            value: 15,
            message: "15文字まで入力可能です",
          },
        })}
        sx={{ maxWidth: { xs: "240px", sm: "300px" } }}
      />
    </>
  )
}

export const DiaryPublish = (props) => {
  const { value } = props;
  const { register } = useFormContext();
  return (
    <Select
      size="small"
      defaultValue={value === undefined ? true : value}
      fullWidth
      {...register("publish")}
      sx={{ minWidth: "80px", alignItems: "center" }}
    >
      <MenuItem value={true}><Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: 0.5 }}>公開</Typography></MenuItem>
      <MenuItem value={false}><Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, mt: 0.5 }}>非公開</Typography></MenuItem>
    </Select >
  );
}

export const DiaryBody = (props) => {
  const { value } = props;
  const { register, formState: { errors } } = useFormContext();
  return (
    <TextField
      fullWidth
      label="本文(400文字まで)"
      margin="dense"
      type="text"
      variant="outlined"
      multiline
      inputProps={{ style: { fontSize: "14px" } }}
      InputLabelProps={{ style: { fontSize: "14px" } }}
      defaultValue={value}
      maxRows={10}
      minRows={7}
      error={'body' in errors}
      helperText={errors.body?.message}
      {...register('body', {
        required: "入力が必要です",
        maxLength: {
          value: 400,
          message: "400文字まで入力可能です",
        },
      })}
    />
  );
}


export const DiaryImage = (props) => {
  const { preview, setPreview } = props;
  const { register, formState: { errors }, setValue } = useFormContext()
  const previewImage = useCallback(async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  }, [])

  const handleCancel = () => {
    //valueをnullにセットして画像削除、""ではfile形式じゃないのでDBに干渉できなかった
    setValue("image", null);
    setPreview("");
  }

  return (
    <Box>
      <IconButton component="label" sx={{ display: preview && "none" }}>
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
        <CameraAltIcon />
      </IconButton>
      {preview &&
        <Box sx={{ width: "100%", height: "100%", mt: 1 }}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleCancel} sx={{ color: "gray", }}>
              <CloseIcon fontSize="small" sx={{ color: "gray" }} />
            </IconButton>
            <FormHelperText error={errors.image} sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
              {errors.image?.message}
            </FormHelperText>
          </Box>
          <Box mx={2}>
            <CardMedia
              component="img"
              src={preview}
              alt="post image"
            />
          </Box>
        </Box>
      }
    </Box>
  )
}
