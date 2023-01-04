import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const MainHeader = ({ children }) => {
 return (
  <>
   <Box sx={{ mr: { xs: 2, sm: 5 }, mt: 3, mb: 1 }}>
    <Typography variant="subtitle1" sx={{ ml: 2, }}>
     {children}
    </Typography>
   </Box>
   <Divider />
  </>
 )
}
