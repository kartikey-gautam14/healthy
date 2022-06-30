import { Button, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getAppointDetails } from '../../utils/DoctorActions';
import { sendvideourl } from '../../utils/DoctorActions';
const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      PatientId: '',
      PatientUsername: '',
      DoctorName: '',
      DoctorId: {
        _id: new Object(),
        Name: '',
      },
      BookingDate: '',
      AppointmentDate: '',
      TimeSlot: {
        startTime: '',
        endTime: '',
        status: '',
        _id: '',
      },
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Recipt: '',
      AppointmentMode: 0,
      Symptoms: '',
      Age: '',
      Sex: '',
      _id: new Object(''),
    },
  ]);
  useEffect(() => {
    getAppointDetails().then((res) => {
      console.log(res);
      setAppointments(res);
    });
  }, []);
  const history = useHistory();
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => {
              return (
                <TableRow>
                  <TableCell>
                    {appointment.AppointmentDate.substring(0, 10)}
                  </TableCell>
                  <TableCell>
                    {appointment.TimeSlot.startTime +
                      ' - ' +
                      appointment.TimeSlot.endTime}
                  </TableCell>
                  <TableCell>
                    {appointment.FirstName + ' ' + appointment.LastName}
                  </TableCell>
                  {appointment.AppointmentMode == 0 && (
                    <TableCell>Online</TableCell>
                  )}
                  {appointment.AppointmentMode == 1 && (
                    <TableCell>Offline</TableCell>
                  )}

                  <TableCell align='center'>
                    <Button
                      onClick={(e) => {
                        history.push({
                          pathname: '/doctor/appointments/view',
                          state: { detail: appointment },
                        });
                      }}
                    >
                      View
                    </Button>
                    <Button
                      onClick={(e) => {
                        const random = Math.random().toString(16).substr(2, 14);
                        sendvideourl(
                          appointment,
                          'http://localhost:3001/' + random
                        );
                        //  console.log(random);
                      }}
                    >
                      Video Call
                    </Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DoctorAppointments;
