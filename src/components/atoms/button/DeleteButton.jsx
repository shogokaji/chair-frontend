import { IconButton, Tooltip, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const DeleteButton = (props) => {
 const { onClick } = props;
 return (
  <Tooltip title="削除">
   <IconButton
    type="submit"
    variant="outlined"
    onClick={onClick}
   >
    <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px", color: "gray" }} />
   </IconButton>
  </Tooltip>
 );
}
