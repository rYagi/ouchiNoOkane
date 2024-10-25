import React from 'react';
import { Paper, Grid, Typography, Box, Chip, IconButton } from '@mui/material';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isToday, 
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useBudgetStore } from '../../store/useBudgetStore';
import { Expense, Event } from '../../types/money';

export const MonthlyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { expenses, events } = useBudgetStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: ja });
  const calendarEnd = endOfWeek(monthEnd, { locale: ja });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weeks = React.useMemo(() => {
    const weeks: Date[][] = [];
    let week: Date[] = [];
    
    days.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    });
    
    return weeks;
  }, [days]);

  const getDateEvents = (date: Date): Array<Expense | Event> => {
    const dayExpenses = expenses.filter(expense => 
      format(new Date(expense.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const dayEvents = events.filter(event => 
      format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return [...dayExpenses, ...dayEvents];
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderDayContent = (date: Date) => {
    const dateEvents = getDateEvents(date);
    const totalAmount = dateEvents.reduce((sum, item) => 
      sum + ('amount' in item ? item.amount : item.budgetAmount), 0
    );

    return (
      <Box 
        sx={{ 
          height: '100%',
          minHeight: 80,
          p: 1,
          bgcolor: !isSameMonth(date, currentDate) 
            ? 'action.disabledBackground' 
            : isToday(date) 
              ? 'action.hover' 
              : 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: isToday(date) ? 'primary.main' : 'divider',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: isToday(date) ? 'bold' : 'normal',
            color: !isSameMonth(date, currentDate) ? 'text.disabled' : 'text.primary',
          }}
        >
          {format(date, 'd')}
        </Typography>
        {dateEvents.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {dateEvents.slice(0, 2).map((item) => (
              <Chip
                key={item.id}
                label={`¥${('amount' in item ? item.amount : item.budgetAmount).toLocaleString()}`}
                size="small"
                color={item.category === 'exciting' ? 'primary' : 'secondary'}
                sx={{ mb: 0.5, width: '100%', height: 20 }}
              />
            ))}
            {dateEvents.length > 2 && (
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                他 {dateEvents.length - 2} 件
              </Typography>
            )}
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
              計: ¥{totalAmount.toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <IconButton onClick={handlePrevMonth} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {format(currentDate, 'yyyy年MM月', { locale: ja })}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
          <Grid item xs key={day}>
            <Typography 
              align="center" 
              sx={{ 
                color: index === 0 ? 'error.main' : index === 6 ? 'primary.main' : 'text.secondary',
                fontWeight: 'bold',
                mb: 1
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {weeks.map((week, weekIndex) => (
        <Grid container spacing={1} key={weekIndex} sx={{ mt: weekIndex === 0 ? 0 : 1 }}>
          {week.map((date: Date) => (
            <Grid item xs key={date.toISOString()}>
              {renderDayContent(date)}
            </Grid>
          ))}
        </Grid>
      ))}
    </Paper>
  );
};