import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

export default function HomeLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fruit Store</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ textAlign: 'center', padding: '20px', marginTop: '20px', backgroundColor: '#f4f4f4' }}>
        <Typography variant="body2" style={{color:"black"}}>© 2024 Dinesh. All rights reserved.</Typography>
      </Box>
    </>
  );
}
