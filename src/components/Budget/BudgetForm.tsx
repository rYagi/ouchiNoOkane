import React from 'react';
import { Card, CardContent, TextField, Button, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useBudgetStore } from '../../store/useBudgetStore';
import { v4 as uuidv4 } from 'uuid';

export const BudgetForm: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [excitingMoney, setExcitingMoney] = React.useState('');
  const [necessaryMoney, setNecessaryMoney] = React.useState('');
  const { addBudget } = useBudgetStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && excitingMoney && necessaryMoney) {
      addBudget({
        id: uuidv4(),
        month: date.toISOString().slice(0, 7),
        excitingMoney: Number(excitingMoney),
        necessaryMoney: Number(necessaryMoney)
      });
      setExcitingMoney('');
      setNecessaryMoney('');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          月間予算設定
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DatePicker
            label="月を選択"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            views={['year', 'month']}
          />
          <TextField
            label="ワクワクマネー"
            type="number"
            value={excitingMoney}
            onChange={(e) => setExcitingMoney(e.target.value)}
            InputProps={{ startAdornment: '¥' }}
          />
          <TextField
            label="最低限必要マネー"
            type="number"
            value={necessaryMoney}
            onChange={(e) => setNecessaryMoney(e.target.value)}
            InputProps={{ startAdornment: '¥' }}
          />
          <Button type="submit" variant="contained" color="primary">
            予算を設定
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};