import { Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton";

export const UpdateButton = (props) => {
 const { loading, onClick } = props;
 return (
  <LoadingButton
   type="submit"
   variant="contained"
   sx={{ height: { xs: "35px", sm: "40px" }, width: { xs: "100px", sm: "200px" } }}
   onClick={onClick}
   loading={loading}
   size="small"
  >
   <Typography variant="caption">
    更新
   </Typography>
  </LoadingButton>
 )
}
