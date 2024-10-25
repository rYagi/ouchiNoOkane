import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { useBudgetStore } from '../../store/useBudgetStore';

export const BudgetOverview: React.FC = () => {
  const { getCurrentMonthBudget, expenses } = useBudgetStore();
  const currentBudget = getCurrentMonthBudget();

  const calculateProgress = (category: 'exciting' | 'necessary') => {
    if (!currentBudget) return 0;
    
    const totalExpenses = expenses
      .filter(e => e.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
      
    const budget = category === 'exciting' 
      ? currentBudget.excitingMoney 
      : currentBudget.necessaryMoney;
      
    return (totalExpenses / budget) * 100;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          今月の予算状況
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography color="primary" gutterBottom>
            ワクワクマネー
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress('exciting')} 
            color="primary"
          />
        </Box>
        
        <Box>
          <Typography color="secondary" gutterBottom>
            最低限必要マネー
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress('necessary')} 
            color="secondary"
          />
        </Box>
      </CardContent>
    </Card>
  );
};