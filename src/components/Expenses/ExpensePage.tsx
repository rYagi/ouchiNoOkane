import React from 'react';
import { Grid } from '@mui/material';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';

export const ExpensePage: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ExpenseForm />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseList />
      </Grid>
    </Grid>
  );
};