import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post('http://localhost:3000/admin-portal/login', {
        email: email,
        password: password
      });
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('role', loginResponse.data.role);
      setRole(loginResponse.data.role);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hmm..',
        text: error.response.data.message
      });
    }
  };

  useEffect(() => {
    switch (role) {
      case 'staffManager':
        navigate('/staff-management');
        break;
      case 'transportManager':
        navigate('/transport-management');
        break;
      case 'sysAdmin':
        navigate('/home');
        break;
    }
  }, [role, navigate]);

  return (
    <Container onSubmit={handleLogin} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-controlled"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="outlined-controlled"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
