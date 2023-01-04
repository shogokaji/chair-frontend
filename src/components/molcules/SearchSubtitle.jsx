import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const SearchSubtitle = ({ children, accordion, open }) => {
 return (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1, px: 1, mx: "auto", color: "#FFF", border: "solid 1px #A9A9A9", borderRadius: 10, bgcolor: "#A9A9A9", gap: 1 }}>
   <SearchIcon />
   <Typography fontSize="0.8rem" variant="center">
    {children}
   </Typography>
   {accordion && <ExpandMoreIcon sx={{ transform: open && "rotate(180deg)", }} />}
  </Box>
 )
}
