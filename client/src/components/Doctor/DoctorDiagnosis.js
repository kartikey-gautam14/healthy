import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  TextField,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { getDiagnosis } from '../../utils/DoctorActions';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DoctorFindAppointment from './DoctorFindAppointment';
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
const previous = [];
const DoctorDiagnosis = (props) => {
  const [appointment, setAppointment] = useState({});
  const [diagnosis, setDaignosis] = useState({
    _id: '',
    AppointmentId: '',
    DoctorNote: '',
    DoctorPrivateNote: '',
    Prescription: '',
  });
  const [doctorNote, setDoctorNote] = useState('');
  const [doctorPrivateNote, setDoctorPrivateNote] = useState('');
  const [prescription, setPrescription] = useState('');
  const [condition, setCondition] = useState('');
  const [labTest, setLabTest] = useState([]);
  const [open, setOpen] = useState(false);
  const [diag, setDiag] = useState({});
  const [open2, setOpen2] = useState(true);
  const [previous, setPrevious] = useState([]);
  const [schedule, setSchedule] = useState(false);
  const handleSchedule = () => {
    setSchedule(true);
  };
  const handleScheduleClose = () => {
    setSchedule(false);
  };
  // const [previous,setPrevious] = useState([]);
  useEffect(() => {
    console.log(props);

    setAppointment(props.appointment);
    axios
      .post(
        'http://localhost:5000/doctor/diagnosis/fetch',
        {
          AppointmentId: props.appointment._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // console.log(res.data);
        setPrevious(res.data.Diagnosis);
        // previous = res.data.Diagnosis;

        // setOpen2(true);
      })
      .catch((err) => console.log(err));
    // console.log(props.daignosis);
    // setDaignosis(props.daignosis);
    setPrevious(props.diagnosis);
    // console.log(props.daignosis);
  }, []);
  const classes = useStyles();
  useEffect(() => {
    // getDiagnosis(appointment._id).then((res) => {
    //   console.log(res);
    //   setDaignosis(res);
    // });
    console.log(appointment);
    // axios
    //   .post(
    //     'http://localhost:5000/doctor/diagnosis/fetch',
    //     {
    //       AppointmentId: props.appointment._id,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': localStorage.getItem('token'),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     // console.log(res.data);
    //     setPrevious(res.data.Diagnosis);
    //     // previous = res.data.Diagnosis;

    //     // setOpen2(true);
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .post(
    //     'http://localhost:5000/doctor/diagnosis/fetch',
    //     {
    //       AppointmentId: appointment._id,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': localStorage.getItem('token'),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     previous = res.data.Diagnosis;
    //     const index = previous.findIndex(
    //       (item) =>
    //         item.PrescriptionDate.substring(0, 10) ===
    //         appointment.AppointmentDate.substring(0, 10)
    //     );
    //     if (index == -1) setOpen2(true);
    //     // setOpen2(true);
    //   })
    //   .catch((err) => console.log(err));
    // previous = props.diagnosis;
    // const index = previous.findIndex(
    //   (item) =>
    //     item.PrescriptionDate.substring(0, 10) ===
    //     appointment.AppointmentDate.substring(0, 10)
    // );
    // if (index == -1) setOpen2(true);
  }, [appointment]);
  useEffect(() => {
    console.log(previous);
    if (previous.length > 0) {
      const q = new Date();
      var m = q.toISOString().substring(0, 10);
      console.log(q, m);
      const t = previous[previous.length - 1].PrescriptionDate.substring(0, 10);
      if (t == m) setOpen2(false);
      else setOpen2(true);
    }
  }, [previous]);
  const handleSubmit = () => {
    const packet = {
      Condition: condition,
      DoctorNote: doctorNote,
      DoctorPrivateNote: doctorPrivateNote,
      Prescription: prescription,
      LabTest: labTest,
      PrescriptionDate: new Date(),
    };
    console.log(new Date(), packet);
    const newList = [...previous];
    newList.push(packet);
    console.log(newList);
    axios
      .post(
        'http://localhost:5000/doctor/diagnosis/update',
        {
          AppointmentId: appointment._id,
          Diagnosis: newList,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPrevious(res.data.Diagnosis);
        // previous = res.data.Diagnosis;
        // console.log(previous);
        setOpen2(true);
      })
      .catch((err) => console.log(err));
  };
  const handleOpen = (item) => {
    setOpen(true);
    setDiag(item);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
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
          Previous Diagnosis
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Prescription Date</TableCell>
                <TableCell>Doctor Note</TableCell>
                <TableCell>Doctor Hidden Note </TableCell>
                <TableCell>Condition</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {previous.length > 0 &&
                previous.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {item.PrescriptionDate.substring(0, 10)}
                      </TableCell>

                      <TableCell>{item.DoctorNote}</TableCell>
                      <TableCell>{item.DoctorPrivateNote}</TableCell>
                      <TableCell>{item.Condition}</TableCell>

                      <TableCell align='center'>
                        <Button
                          onClick={(e) => {
                            handleOpen(item);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {open2 && (
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
            Diagnosis
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
              id='outlined-basic'
              label='Diagnosed Conditions'
              multiline
              rows={4}
              onChange={(e) => setCondition(e.target.value)}
              className={classes.textField}
            />
            <TextField
              id='outlined-basic'
              label='Doctor Note'
              multiline
              rows={4}
              onChange={(e) => setDoctorNote(e.target.value)}
              className={classes.textField}
            />
            <TextField
              id='outlined-basic'
              label='Doctor Private Note'
              multiline
              onChange={(e) => setDoctorPrivateNote(e.target.value)}
              rows={4}
              className={classes.textField}
            />
            <TextField
              id='outlined-basic'
              label='Prescription'
              multiline
              rows={4}
              onChange={(e) => setPrescription(e.target.value)}
              className={classes.textField}
            />
          </Box>
          <Box
            component='div'
            sx={{
              display: 'flex',
              'flex-direction': 'row',
              'justify-content': 'flex-end',
              'padding-top': '10px',
              // 'padding-bottom': '10px',
            }}
            noValidate
            autoComplete='off'
          >
            <Button variant='outlined' onClick={(e) => handleSubmit()}>
              {' '}
              Submit Diagnosis{' '}
            </Button>
          </Box>
        </Card>
      )}
      <Card>
        <Typography>Actions</Typography>
        <Box
          component='div'
          sx={{
            display: 'flex',
            'flex-direction': 'row',
            'justify-content': 'center',
            'padding-top': '10px',
            // 'padding-bottom': '10px',
          }}
          noValidate
          autoComplete='off'
        >
          {/* <Button variant='outlined' onClick>Close Treatment</Button> */}
          <Button variant='outlined' onClick={(e) => handleSchedule()}>
            Schedule Another Day
          </Button>
        </Box>
      </Card>
      <Dialog open={open} onClose={(e) => handleClose()}>
        <DialogTitle>Prescription Details</DialogTitle>
        <DialogContent>{diag.Condition}</DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose()}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={schedule} onClose={(e) => handleScheduleClose()}>
        <DialogTitle>ReSchedule Appointment</DialogTitle>
        <DialogContent>
          <DoctorFindAppointment appointment={appointment} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleScheduleClose()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DoctorDiagnosis;
