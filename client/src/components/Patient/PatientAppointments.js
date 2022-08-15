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
import {
  deleteAppointment,
  getAppointDetails,
} from '../../utils/patientActions';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([
    // {
    //   PatientId: '',
    //   DoctorId: {
    //     _id: new Object(),
    //     Name: '',
    //   },
    // DoctorName:
    //   BookingDate: '',
    //   AppointmentDate: '',
    //   TimeSlot: {
    //     startTime: '',
    //     endTime: '',
    //     status: '',
    //     _id: '',
    //   },
    //   FirstName: '',
    //   LastName: '',
    //   Email: '',
    //   Phone: '',
    //   Recipt: '',
    //   AppointmentMode: 0,
    //   Symptoms: '',
    //   Age: '',
    //   Sex: '',
    //   _id: new Object(''),
    // },
  ]);
  useEffect(() => {
    getAppointDetails().then((res) => {
      console.log(res);
      setAppointments(res);
    });
  }, []);
  const handleDelete = (id) => {
    deleteAppointment(id);
  };
  const history = useHistory();
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>App Date</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>AppointmentMode</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => {
              return (
                <TableRow>
                  <TableCell>{appointment.DoctorName}</TableCell>
                  {/* <TableCell>Date format bug</TableCell>
                  <TableCell>Date format bug</TableCell> */}
                  <TableCell>
                    {appointment.AppointmentDate.substring(0, 10)}
                  </TableCell>
                  <TableCell>
                    {appointment.BookingDate.substring(0, 10)}
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
                          pathname: '/patient/appointments/view',
                          state: { detail: appointment },
                        });
                      }}
                    >
                      View
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleDelete(appointment._id);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
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

export default PatientAppointments;
