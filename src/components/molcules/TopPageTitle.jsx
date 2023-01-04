import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const TopPageTitle = () => {
 return (
  <Box
   sx={{
    color: "#fff",
    mt: { xs: "20%", sm: "6%" },
    py: { xs: "5%", md: "15%" },
    textAlign: { xs: "center" },
    boxSizing: "borderBox",
   }}
  >
   <Typography
    variant="h3"
    component="h3"
   >
    ようこそ
   </Typography>
   <Typography
    variant="h2"
    component="h2"
   >
    Chairへ
   </Typography>
  </Box>
 );
}
