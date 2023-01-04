import { Button, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export const EditButton = ({ onClick }) => {
 return (
  <Button
   onClick={onClick}
   variant="outlined"
   size="small"
   fullWidth
   sx={{ py: { sm: 1 } }}
  >
   <EditIcon sx={{ fontSize: "16px", mr: 1 }} />
   <Typography fontSize="12px" sx={{ display: { xs: "none", sm: "inline-block" } }}>
    編 集
   </Typography>
  </Button>
 );
}
