import { Dialog, DialogContent, DialogContentText, IconButton, TextField, Box, InputBase, } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";

export const SearchDiaryModal = (props) => {

 const { open, onClose, onSubmit } = props;
 const {
  register,
  handleSubmit,
 } = useForm();

 return (
  <Dialog open={open} onClose={onClose} fullWidth >
   <DialogContent>
    <DialogContentText fontSize="12px" py={3}>
     タイトル、本文にキーワード含む日記を検索します。
    </DialogContentText>
    <Box component="form" sx={{ display: "flex", alignItems: "center", py: 2, }}>
     <TextField
      autoFocus
      fullWidth
      margin="dense"
      variant="outlined"
      placeholder="キーワード検索"
      size="small"
      inputProps={{ style: { fontSize: "14px" } }}
      {...register('keyWord', {
       required: true,
       pattern: {
        value: /^(?! |　).*$/,   //空白のみ、空白開始を検証
       },
      })} />
     <IconButton
      onClick={handleSubmit(onSubmit)}
      color="primary"
      size="small"
      sx={{ ml: 1, mt: 0.5, border: "1px solid", borderRadius: 1, px: 1 }}
     >
      <SearchIcon />
     </IconButton>
    </Box>
   </DialogContent>
  </Dialog>
 )
}
