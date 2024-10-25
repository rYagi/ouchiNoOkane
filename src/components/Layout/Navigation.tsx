import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          おうちのお金こう使おう！
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            ホーム
          </Button>
          <Button color="inherit" component={RouterLink} to="/budget">
            予算設定
          </Button>
          <Button color="inherit" component={RouterLink} to="/expenses">
            支出管理
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};