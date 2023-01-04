import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Copyright = (props) => {
 return (
  <Typography variant="caption" color="text.secondary" align="center" {...props}>
   {'Copyright © '}
   <Link color="inherit" href={process.env.REACT_APP_WEB_DOMEIN}>
    Chair App
   </Link>{' '}
   {new Date().getFullYear()}
   {'.'}
  </Typography>
 );
}
