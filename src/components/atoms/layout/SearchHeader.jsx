import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom"
import { MainHeader } from "./MainHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SearchHeader = ({ children }) => {
 const navigate = useNavigate();
 return (
  <MainHeader>
   <Box sx={{ display: "flex", alignItems: "center" }}>
    <IconButton onClick={() => navigate(-1)}>
     <ArrowBackIcon />
    </IconButton>
    {children}
   </Box>
  </MainHeader>
 )
}
