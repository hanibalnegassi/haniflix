import {
  Box,
  Container,
  Card,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
import { useEffect, useState, useRef } from 'react';
import useApiClient from 'src/hooks/useApiClient';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUser, setUser } from 'src/store/reducers/auth';
import { useNavigate } from 'react-router';
import { useLoginMutation } from 'src/store/rtk-query/authApi';

import spinnerSvg from 'src/assets/svgs/spinner.svg'

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

// U2FsdGVkX19047kDfNolCdiD8n3NRGnah/C1vQ5t7QM=

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const client = useApiClient();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef(null);


  //rtk
  const [login, loginState] = useLoginMutation()

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  const onLogin = async () => {
    const credentials = {
      email: username,
      password
    };

    ///
    try {
      const res = await login(credentials)

      if (res['data']) {
        dispatch(setUser(res['data']));
      }

      if (res?.data?.isAdmin && res?.data?.isAdmin !== true) {
        setError('Only administrators can login here');
      }

      if (!res?.data) {
        setError(res?.error?.data?.message || "Error encountered during login")
      }
    }
    catch (err) {
      console.error(err);
      setError(err);
    };
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onLogin();
    }
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <img src="/logo.png" style={{ width: '50%' }} />
        </Box>
        <Card sx={{ p: 2, mb: 10, borderRadius: 1 }}>
          <Box
            component={'form'}
            sx={{
              '& .MuiTextField-root': { m: 1 }
            }}
          >
            {error?.length > 0 ? (
              <Typography color={'red'} align="center">
                {error}
              </Typography>
            ) : null}
            <TextField
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  passwordInputRef.current?.focus()
                }
              }}
              required
              fullWidth
            />
            <TextField
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputRef={passwordInputRef}
              onKeyDown={handleKeyDown}
              required
              fullWidth
            />
            <Box className='flex gap-2' marginLeft={1} marginTop={3}>
              <Button variant="contained" onClick={onLogin}>
                Login
              </Button>
              {
                loginState.isLoading ? <img src={spinnerSvg} /> : undefined
              }
            </Box>
          </Box>
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Login;
