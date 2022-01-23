import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FaCarAlt } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" arial-label="menu">
          <FaCarAlt />
        </IconButton>

        <Typography variant="h6">Code Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
};
