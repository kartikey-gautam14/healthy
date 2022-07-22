import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  styled,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDoctorsList } from '../../utils/patientActions';
const useStyles = makeStyles({
  listCard: {
    display: 'block',
    width: '200px',
    height: '100%',
  },
});
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body0,
  padding: theme.spacing(0, 0, 0, 0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const PatientSearchDoctor = () => {
  const classes = useStyles();
  const history = useHistory();
  const [doctors, setDoctors] = useState([
    {
      Name: '',
      Address: '',
      Gender: '',
      City: '',
      Degree: '',
      Specialisation: '',
      State: '',
      PhoneNumber: '',
      user: {
        _id: new Object(),
        Name: '',
      },
      _id: new Object(''),
    },
  ]);
  useEffect(() => {
    getDoctorsList().then((res) => {
      console.log(res);
      setDoctors(res);
    });
  }, []);

  return (
    <div className='container'>
      <Card>
        <CardHeader title='Filter'></CardHeader>
      </Card>
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={2.5}
      >
        {doctors.map((doctor) => (
          <Item>
            <Card className={classes.listCard}>
              <CardHeader title={doctor.Name} />
              <CardContent>{doctor.Specialisation}</CardContent>
              <CardActions>
                <Button
                  onClick={(e) => {
                    history.push({
                      pathname: '/patient/findAppointments',
                      state: doctor,
                    });
                  }}
                  variant='contained'
                  color='secondary'
                >
                  Book
                </Button>
              </CardActions>
            </Card>
          </Item>
        ))}
      </Stack>
    </div>
  );
};

export default PatientSearchDoctor;
