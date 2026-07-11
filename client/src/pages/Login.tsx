import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { login } from '../services/auth.service';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login({
        username,
        password,
      });

      localStorage.setItem('token', data.access_token);

      navigate('/dashboard');
    } catch (error) {
      alert('Sai tài khoản hoặc mật khẩu');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          mt: 10,
          p: 5,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar sx={{ mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Library Management
          </Typography>

          <Typography mb={3}>
            Đăng nhập hệ thống
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            sx={{ mt: 3 }}
            variant="contained"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;