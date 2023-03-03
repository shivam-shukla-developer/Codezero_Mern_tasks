import * as React from 'react';
import Box from '@mui/material/Box';
import AppNavMenu from './AppNavMenu';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom";

function AppMenu(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppNavMenu/>

      <Box component="main" sx={{ p: 3, width: '100%' }} >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppMenu;