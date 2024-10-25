import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Rating, Box } from '@mui/material';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useBudgetStore } from '../../store/useBudgetStore';

export const ExpenseList: React.FC = () => {
  const expenses = useBudgetStore(state => state.expenses);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          支出履歴
        </Typography>
        <List>
          {expenses.map((expense) => (
            <ListItem
              key={expense.id}
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  ¥{expense.amount.toLocaleString()}
                </Typography>
                <Chip
                  label={expense.category === 'exciting' ? 'ワクワク' : '必要'}
                  color={expense.category === 'exciting' ? 'primary' : 'secondary'}
                  size="small"
                />
              </Box>
              <ListItemText
                primary={expense.description}
                secondary={format(new Date(expense.date), 'yyyy年MM月dd日', { locale: ja })}
              />
              {expense.excitementLevel && (
                <Rating value={expense.excitementLevel} readOnly />
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};