import { useNavigate, useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useAppSelector } from './store/hooks';
import { selectUser } from './store/reducers/auth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { SocketProvider } from "./contexts/SocketContext";

function App() {
  const user = useAppSelector(selectUser);
  const content = useRoutes(router);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }
  }, [user]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SocketProvider>
          <CssBaseline />
          {content}
        </SocketProvider>
      </LocalizationProvider>
      <Toaster />
    </ThemeProvider>
  );
}
export default App;
