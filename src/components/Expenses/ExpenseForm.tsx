import React from 'react';
import { Card, CardContent, TextField, Button, Stack, Typography, Rating, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useBudgetStore } from '../../store/useBudgetStore';
import { v4 as uuidv4 } from 'uuid';

export const ExpenseForm: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [amount, setAmount] = React.useState<string>('');
  const [category, setCategory] = React.useState<'exciting' | 'necessary'>('exciting');
  const [description, setDescription] = React.useState('');
  const [excitementLevel, setExcitementLevel] = React.useState<number | null>(null);
  const addExpense = useBudgetStore(state => state.addExpense);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount || !description) return;

    addExpense({
      id: uuidv4(),
      date: date.toISOString(),
      amount: Number(amount),
      category,
      description,
      excitementLevel: category === 'exciting' ? excitementLevel || undefined : undefined
    });

    setAmount('');
    setDescription('');
    setDate(new Date());
    setExcitementLevel(null);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          支出の登録
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <DatePicker
              label="日付"
              value={date}
              onChange={setDate}
            />
            <TextField
              label="金額"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{ startAdornment: '¥' }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>カテゴリー</InputLabel>
              <Select
                value={category}
                label="カテゴリー"
                onChange={(e) => setCategory(e.target.value as 'exciting' | 'necessary')}
              >
                <MenuItem value="exciting">ワクワクマネー</MenuItem>
                <MenuItem value="necessary">最低限必要マネー</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="説明"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            {category === 'exciting' && (
              <Stack spacing={1}>
                <Typography component="legend">ワクワク度</Typography>
                <Rating
                  value={excitementLevel}
                  onChange={(_, newValue) => setExcitementLevel(newValue)}
                  max={5}
                />
              </Stack>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              fullWidth
            >
              支出を登録する
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};