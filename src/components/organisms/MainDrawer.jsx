import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import { drawerWidth } from "../../data/data";
import { Copyright } from "../molcules/Copyright"
import { DrawerCard } from "../molcules/DrawerCard"
import { DrawerList } from '../molcules/DrawerList';

export const MainDrawer = (props) => {
 const { window } = props;
 const { openNavi, setOpenNavi, handleSignOut } = props;
 const container = window !== undefined ? () => window().document.body : undefined

 const onClose = () => {
  setOpenNavi(false)
 }
 return (
  <Drawer
   container={container}
   variant="temporary"
   open={openNavi}
   onClose={onClose}
   ModalProps={{
    keepMounted: true,
   }}
   sx={{
    display: {
     xs: 'block',
     md: 'none'
    },
    '& .MuiDrawer-paper': {
     width: drawerWidth
    },
   }}>
   <Box  >
    <DrawerCard onClose={onClose} />
    <Divider />
    <DrawerList handleSignOut={handleSignOut} onClose={onClose} />
   </Box >
   <Copyright sx={{ mt: 2 }} />
  </Drawer>
 )
}
