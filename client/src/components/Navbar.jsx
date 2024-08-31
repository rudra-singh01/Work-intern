import React from 'react';
import Login from './Login';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="fixed" className="bg-[#8382823b]">
      <Toolbar className="flex  justify-between p-10">
        <Box className="flex items-center">
          <img src="" alt="Logo" className="h-8 w-auto" />
          <Typography variant="h6" component="div" className="ml-4">
            MyApp
          </Typography>
        </Box>

        <Box>
          <Login />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
