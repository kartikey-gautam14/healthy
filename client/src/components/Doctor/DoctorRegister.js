import { Container, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from '../../utils/Auth';

const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 20,
    display: 'block',
    width: '100%',
  },
});
const DoctorRegister = (props) => {
  const classes = useStyle();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const history = useHistory();
  useEffect(() => {
    if (Auth.loggedIn()) {
      if (Auth.isdoctor()) history.push('/doctor/home');
      else history.push('/patient/home');
    }
  }, []);
  const doRegister = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      console.log('Password doesnot match');
    } else {
      const headers = {
        'Content-Type': 'application/json',
      };

      axios
        .post(
          'http://localhost:5000/doctor/register',
          {
            Email: email,
            Password: password1,
            Username: username,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          history.push('/doctor/home');
        })
        .catch((error) => {
          console.log('Error ========>', error.response.data);
        });
    }
  };

  return (
    <Container>
      <Typography className={classes.field}>Sign Up</Typography>
      <form onSubmit={doRegister}>
        <TextField
          type='text'
          name='username'
          placeholder='username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          type='text'
          name='email'
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          type='password'
          name='password1'
          placeholder='Password'
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <TextField
          type='password'
          name='password2'
          placeholder='Renter Password'
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <Button type='submit' variant='outlined'>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default DoctorRegister;
