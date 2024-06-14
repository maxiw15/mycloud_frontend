import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Center, TextInput, PasswordInput, Space, Button, Anchor } from '@mantine/core';
import { login, signUp } from '../redux/slices/authSlice';

function Auth({ action }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const validateUsername = (username) => /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(username);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleLogin = async () => {
    const response = await dispatch(login({ username, password }));
    if (login.fulfilled.match(response)) {
      navigate('/');
    } else {
      setError('Login failed. Incorrect data.');
    }
  };

  const handleSignUp = async () => {
    let valid = true;
    if (!validateUsername(username)) {
      setUsernameError('Invalid username format.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Invalid password format.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      return;
    }

    const response = await dispatch(signUp({ username, fullName, email, password }));
    if (signUp.fulfilled.match(response)) {
      navigate('/');
    } else {
      setError('Sign up failed. Try again with another username.');
    }
  };

  return (
    <Center h={700}>
      <Container>
        {action === 'signup' && (
          <>
            <TextInput
              style={{ width: '400px' }}
              label="Username"
              size='md'
              value={username}
              error={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Space h="lg" />
            <TextInput
              style={{ width: '400px' }}
              label="Full Name"
              size='md'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Space h="lg" />
            <TextInput
              style={{ width: '400px' }}
              label="Email"
              size='md'
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Space h="lg" />
          </>
        )}
        {action === 'signin' && (
          <>
            <TextInput
              style={{ width: '400px' }}
              label="Username"
              size='md'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Space h="lg" />
          </>
        )}
        <PasswordInput
          style={{ width: '400px' }}
          size="md"
          label="Password"
          value={password}
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (action === 'signin' ? handleLogin() : handleSignUp())}
        />
 <Space h="xl" />
        {error && (
          <Center>
            <div style={{ color: 'red' }}>{error}</div>
          </Center>
        )}
        {action === 'signin' ? (
          <>
            <Center>
              <Button variant="filled" size='md' style={{ width: '150px' }} onClick={handleLogin}>
                Login
              </Button>
            </Center>
            <Space h="md" />
            <Center>
              <Anchor href="/signup">
                Sign up
              </Anchor>
            </Center>
          </>
        ) : (
          <Center>
            <Button variant="filled" size='md' style={{ width: '150px' }} onClick={handleSignUp}>
              Sign up
            </Button>
          </Center>
        )}
      </Container>
    </Center>
  );
}

export default Auth;
