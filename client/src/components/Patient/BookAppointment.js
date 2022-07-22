import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { bookAppoinment } from '../../utils/patientActions';

const BookAppointment = (props) => {
  const history = useHistory();
  const { doctorId, name, specialization, date, timeSlot, location } =
    props || {};
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState('');
  // const [timeSlot, setTimeSlot] = useState({
  //   startTime: '',
  //   endTime: '',
  //   status: '',
  //   _id: '',
  // });

  const book = () => {
    // e.preventDefault();

    const appointmentData = {
      doctorId,
      date,
      timeSlot,
      firstName,
      lastName,
      name,
      email,
      phone,
      age,
      sex,
    };
    // console.log(appointmentData);
    bookAppoinment(appointmentData, history);
  };
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <Box
        component='div'
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='standard-read-only-input'
          label='Doctor Name'
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='standard-read-only-input'
          label='Specialization'
          value={specialization}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box
        sx={{
          'justify-content': 'center',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            'flex-direction': 'row',
            'justify-content': 'center',
          }}
          variant='h6'
          component='h2'
        >
          Patient Details
        </Typography>
      </Box>
      <Box
        component='div'
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          label='First Name'
          required
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label='Last Name'
          required
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <Box
        component='div'
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          label='Email'
          required
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Phone Number'
          required
          name='phone'
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
      >
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-standard-label'>Sex</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            label='Sex'
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
      >
        <Typography> Age </Typography>
        <Slider
          defaultValue={50}
          aria-label='Default'
          valueLabelDisplay='auto'
          onChange={(e) => setAge(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
        }}
      >
        <Button variant='contained' onClick={(e) => book()}>
          Book
        </Button>
      </Box>
    </Box>
  );
};

export default BookAppointment;
