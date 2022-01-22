import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import DriverIcon from '@material-ui/icons/DriveEta';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" arial-label="menu">
          <DriverIcon />
        </IconButton>

        <Typography variant="h6">Code Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
};
