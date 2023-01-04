import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import { Box, useTheme } from '@mui/system';
import { Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AuthHeader = ({ setOpen }) => {

 const navigate = useNavigate();

 const handleClickLogin = () => {
  setOpen(true);
 }

 const handleClickAbout = () => {
  navigate("/about")
 }

 const theme = useTheme();
 const xsSize = useMediaQuery(theme.breakpoints.down('sm'));

 return (
  <>
   <AppBar sx={{ backgroundColor: "#2196f3", position: "fixed", }}>
    <Container maxWidth="100%">
     <Toolbar disableGutters sx={{ justifyContent: "space-between", display: "flex" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
       <ChairAltIcon sx={{ mr: 1 }} />
       <Typography
        variant="h5"
        noWrap
        component="a"
        sx={{
         mr: 2,
         display: { xs: 'flex', },
         flexGrow: 1,
         textAlign: "center",
         fontFamily: 'Solway, serif',
         fontWeight: 500,
         letterSpacing: '.3rem',
         color: 'inherit',
        }}
       >
        Chair
       </Typography>
      </Box>
      <Box sx={{ color: "#FFF", display: "flex", gap: { xs: 2, sm: 5 }, mr: { md: 5 } }}>
       <Button
        variant='outlined'
        size={xsSize ? 'small' : "medium"}
        onClick={handleClickAbout}
        sx={{
         color: "#fff", borderColor: "#fff",
         textTransform: "none",
         display: { xs: "none", sm: "block" }
        }}>
        Chairについて
       </Button>
       <Button
        variant='outlined'
        onClick={handleClickLogin}
        size={xsSize ? 'small' : "medium"}
        sx={{ color: "#fff", borderColor: "#fff" }}>
        ログイン
       </Button>
      </Box>
     </Toolbar>
    </Container>
   </AppBar>
  </>
 );
};
