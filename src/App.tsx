import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from 'date-fns/locale';
import { theme } from './theme';
import { Navigation } from './components/Layout/Navigation';
import { BudgetOverview } from './components/Dashboard/BudgetOverview';
import { BudgetForm } from './components/Budget/BudgetForm';
import { ExpensePage } from './components/Expenses/ExpensePage';
import { MonthlyCalendar } from './components/Calendar/MonthlyCalendar';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <Container component="main" maxWidth="lg" sx={{ py: 4, flex: 1 }}>
              <Routes>
                <Route path="/" element={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <BudgetOverview />
                    <MonthlyCalendar />
                  </Box>
                } />
                <Route path="/budget" element={<BudgetForm />} />
                <Route path="/expenses" element={<ExpensePage />} />
                <Route path="*" element={<BudgetOverview />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;