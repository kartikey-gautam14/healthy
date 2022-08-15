import React, { useEffect, useState } from 'react';

const DoctorFindAppointment = (props) => {
  const [appointment, setAppointment] = useState({});
  const [doctorId, setDoctorId] = useState('');
  console.log(props);
  useEffect(() => {
    setAppointment(props.appoinment);
    setDoctorId(props.appointment.DoctorId);
  }, []);
  useEffect(() => {}, [appointment]);
  return <div>{doctorId}</div>;
};

export default DoctorFindAppointment;
