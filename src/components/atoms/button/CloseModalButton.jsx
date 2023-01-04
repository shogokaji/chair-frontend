import { IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export const CloseModalButton = (props) => {
 const { onClose } = props;
 return (
  <IconButton
   aria-label="close"
   onClick={onClose}
   sx={{
    position: 'absolute',
    right: 8,
    top: 8,
   }}
  >
   <CancelIcon sx={{ fontSize: "25px" }} />
  </IconButton>
 );
}
