import {
  CardHeader,
  Container,
  Card,
  Box,
  TextField,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../utils/patientActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BookAppointment from './BookAppointment';
import { useHistory } from 'react-router-dom';
const PatientFindAppointments = (props) => {
  const [date, setDate] = useState('');
  const [buttonDis, setbuttondis] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [doctorId, setId] = useState('');
  const [specialization, setSpecialization] = useState('');

  const history = useHistory();
  useEffect(() => {
    setName(props.location.state.Name);
    setId(props.location.state.user._id);
    // console.log(props.location.state.user._id);
    setSpecialization(props.location.state.Specialisation);
  }, []);
  const [timeSlots, setTimeSlots] = useState([
    {
      startTime: '',
      endTime: '',
      status: '',
      _id: new Object(''),
    },
  ]);
  const [timeSlot, setTimeSlot] = useState({
    startTime: '',
    endTime: '',
    status: '',
    _id: '',
  });
  // const { doctorId, name, degree, specialization, location } =
  //   (props.location && props.location.state) || {};

  const handleClickOpen = (timeSlot) => {
    setOpen(true);
    setTimeSlot(timeSlot);
    // history.push({
    //   pathname: '/patient/bookAppointment',
    //   state: { doctorId, name, degree, specialization, location, date },
    // });
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div className='conatiner'>
      <Container>
        <Card>
          <CardHeader title={name} subheader={specialization} />
        </Card>
      </Container>

      <div className='appointment'>
        <Container>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              'margin-top': '20px',
              'justify-content': 'center',
              padding: '10px',
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='date'
              label='Appointment Date'
              type='date'
              defaultValue={date}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setDate(e.target.value);
                console.log(date);
              }}
            />
            <Button
              onClick={(e) => {
                getAppointments(doctorId, date).then((data) =>
                  setTimeSlots(data)
                );
                console.log(timeSlots);
              }}
              variant='contained'
            >
              Find Appointments
            </Button>
          </Box>
        </Container>
        <Container>
          <Typography variant='h6' component='h2'>
            {date}
          </Typography>
          <Typography>Online Appointments</Typography>
          <ButtonGroup>
            {timeSlots.map((timeSlot) => {
              if (timeSlot.status == '0')
                return (
                  <Button
                    variant='contained'
                    color='success'
                    onClick={(e) => handleClickOpen(timeSlot)}
                  >
                    {timeSlot.startTime + ' - ' + timeSlot.endTime}
                  </Button>
                );
            })}
          </ButtonGroup>
          <Typography>Offline Appointments</Typography>
          <ButtonGroup>
            {timeSlots.map((timeSlot) => {
              if (timeSlot.status == '1')
                return (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={(e) => handleClickOpen(timeSlot)}
                  >
                    {timeSlot.startTime + ' - ' + timeSlot.endTime}
                  </Button>
                );
            })}
          </ButtonGroup>
          <Typography>Unavailable Appointments</Typography>
          <ButtonGroup>
            {timeSlots.map((timeSlot) => {
              if (timeSlot.status == '2')
                return (
                  <Button variant='contained' disabled='true'>
                    {timeSlot.startTime + ' - ' + timeSlot.endTime}
                  </Button>
                );
            })}
          </ButtonGroup>
          <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>BookAppointment</DialogTitle>
            <DialogContent>
              <BookAppointment
                doctorId={doctorId}
                name={name}
                specialization={specialization}
                date={date}
                timeSlot={timeSlot}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default PatientFindAppointments;
