import {
  Container,
  Box,
  TextField,
  Card,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import DisplayPreliminaryDiagnoisis from './DisplayPreliminaryDiagnoisis';
import PreliminaryDiagnosis from './PreliminaryDiagnosis';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  textField: {
    'padding-top': '10px',
    'padding-left': '10px',
    'padding-right': '10px',
    'padding-bottom': '10px',
  },
  card: {
    'padding-top': '40px',
    'padding-right': '30px',
    'padding-bottom': '40px',
    'padding-left': '30px',
  },
  screen: {
    display: 'flex',
    'flex-direction': 'column',
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    'justify-content': 'center',
  },
  screenContent: {
    'padding-top': '20px',
    'padding-right': '150px',
    'padding-bottom': '20px',
    'padding-left': '150px',
  },
});
const PatientEditAppointments = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const appointment = location.state.detail;
  const [preliminary, setPreliminary] = useState(false);
  const [preliminaryDaignosis, setPreliminaryDiagnosis] = useState({ id: '' });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // getPremil
    axios
      .post(
        'http://localhost:5000/patient/preliminaryDaignosis/check',
        {
          AppointmentId: appointment._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setPreliminaryDiagnosis(res.data);
        setPreliminary(true);
        setOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        setPreliminary(false);
      });
    console.log(appointment);
  }, []);
  const handleClose = () => {
    setOpen(true);
  };
  return (
    <Box className={classes.screen}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!open}
        onClick={(e) => handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box component='div' className={classes.screenContent}>
        <Card
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1 },
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
          }}
          noValidate
          autoComplete='off'
          className={classes.card}
        >
          <Typography sx={{ padding: '10px' }} variant='h5'>
            Appointment Details
          </Typography>
          <Box
            component='div'
            sx={{
              display: 'flex',
              'flex-direction': 'row',
              'justify-content': 'center',
              // 'padding-top': '40px',
              // 'padding-bottom': '10px',
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='standard-read-only-input'
              label='Patient Name'
              value={appointment.FirstName + ' ' + appointment.LastName}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            <TextField
              id='standard-read-only-input'
              label='Age'
              value={appointment.Age}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            {appointment.AppointmentMode == 'female' && (
              <TextField
                id='standard-read-only-input'
                label='Gender'
                value='Female'
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
            )}
            {appointment.Sex == 'male' && (
              <TextField
                id='standard-read-only-input'
                label='Gender'
                value='Male'
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
            )}
            <TextField
              id='standard-read-only-input'
              label='Phone Number'
              value={appointment.Phone}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
          </Box>
          <Box
            component='div'
            sx={{
              display: 'flex',
              'flex-direction': 'row',
              'justify-content': 'center',
              // 'padding-top': '40px',
              // 'padding-bottom': '10px',
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='standard-read-only-input'
              label='Doctor Name'
              value={appointment.DoctorName}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            <TextField
              id='standard-read-only-input'
              label='Appointment Date'
              value={appointment.AppointmentDate.substring(0, 10)}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            <TextField
              id='standard-read-only-input'
              label='Time Slot'
              value={
                appointment.TimeSlot.startTime +
                '-' +
                appointment.TimeSlot.endTime
              }
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            {appointment.AppointmentMode == 0 && (
              <TextField
                id='standard-read-only-input'
                label='Mode'
                value='Online'
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
            )}
            {appointment.AppointmentMode == 1 && (
              <TextField
                id='standard-read-only-input'
                label='Mode'
                value='Offline'
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
            )}
          </Box>
        </Card>
      </Box>
      <Box component='div' className={classes.screenContent}>
        <Typography sx={{ padding: '10px' }} variant='h5'>
          Preliminary Diagnosis
        </Typography>
        {/* {!open && (
          <img src={process.env.PUBLIC_URL + '/static/images/loading.gif'} />
        )} */}
        {open && !preliminary && (
          <PreliminaryDiagnosis appointment={appointment} />
        )}
        {open && preliminary && (
          <DisplayPreliminaryDiagnoisis
            preliminaryDaignosis={preliminaryDaignosis}
          />
        )}
      </Box>
    </Box>
  );
};

export default PatientEditAppointments;
