import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import URLS from '../../constants/urls';
import USER_APIS from '../../apis/userapis';
import baseService from '../../apis/service';
import RESPONSE_CODES from '../../constants/responseCodes';

const theme = createTheme();

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const response = await baseService.post(USER_APIS.signup, {
        fullname: data.get('fullname'),
        email: data.get('email'),
        password: data.get('password'),
      });
      if (response.data.response_code === RESPONSE_CODES.ok) {
        toast('Account created successfully');
        navigate(URLS.login);
      }
    } catch (err) {
      toast('Something went wrong');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="fullname" label="Full Name" name="fullname" autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link to={URLS.login}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
