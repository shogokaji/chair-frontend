import * as React from 'react';
import { useContext } from 'react';
import { drawerWidth, departmentList } from "../../data/data";
import { AuthContext } from '../../providers/AuthProvider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { UserNameInput } from './form/ProfileInput';

export const DrawerCard = (props) => {
 const { onClose } = props;
 const { currentUser } = useContext(AuthContext);
 const { name, department } = currentUser;
 const navigate = useNavigate();
 const nameSize = currentUser.name.length > 8 ? "12px" : "16px";
 const handleClick = () => {
  navigate(`/${currentUser.id}`);
  onClose();
 }
 return (
  <Button
   onClick={handleClick}
   sx={{
    height: "100px",
    width: drawerWidth,
    mr: 0,
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
   }}>
   <Avatar alt="User Image" src={currentUser.image.url}
    sx={{
     ml: 2,
     width: 60,
     height: 60
    }} />
   <Box
    sx={{
     mr: 1,
     display: "flex",
     flexDirection: "column",
     justifyContent: "flex-end",
     textAlign: "right"
    }}>
    <Typography variant="subtitle1" noWrap
     sx={{
      textAlign: "center",
      mt: 1,
      fontSize: nameSize
     }}>
     {name}
    </Typography>
    <Typography variant="caption" color="inherit"
     sx={{
      fontSize: "12px",
      textAlign: "right",
      mt: 1
     }}>
     {departmentList[department]}
    </Typography>
   </Box>
  </Button>
 );
}
