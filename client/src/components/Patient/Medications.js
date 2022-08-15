import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getlabreports, getpresctiption } from '../../utils/profileactions';

const FileDownload = require('js-file-download');
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function createData(ind, name, date, doctor, url) {
  return { ind, name, date, doctor, url };
}
function createData2(ind, name, date, Lab, url) {
  return { ind, name, date, Lab, url };
}

const downloadprescription = (index) => {
  console.log(index);
  return axios
    .post(
      'http://localhost:5000' + index,
      {},
      { responseType: 'blob' },
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          index: index,
        },
      }
    )
    .then((res) => {
      console.log(res);
      FileDownload(res.data, index.substring(9));
    });
};
const Medications = (props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  var [rows, setRows] = React.useState([]);
  const [emptyrows, setEmptyrows] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(null);
  const [step, setStep] = React.useState(0);
  var loading = false;
  useEffect(() => {
    prescriptions();
  }, [localStorage.getItem('token')]);
  const prescriptions = () => {
    rows = []; // clear the table
    getpresctiption().then((data) => {
      for (let i = 0; i < data.length; i++) {
        //  console.log(i);
        rows.push(
          createData(
            i + 1,
            data[i].patient,
            data[i].Date.substring(0, 10),
            data[i].Doctor,
            data[i].url
          )
        );
      }
      loading = true;
      setRows([...rows]);
    });
  };
  const labtest = () => {
    rows = []; // clear the table
    getlabreports().then((data) => {
      for (let i = 0; i < data.length; i++) {
        rows.push(
          createData2(
            i + 1,
            data[i].patient,
            data[i].Date.substring(0, 10),
            data[i].Lab,
            data[i].url
          )
        );
      }
      loading = true;
      setRows([...rows]);
    });
  };
  const Upload = async (e) => {
    e.preventDefault();

    const doc = document.querySelector('#upfile');
    if (step) var lab = document.querySelector('#lab');
    else var doctor = document.querySelector('#doctor');
    const date = document.querySelector('#date');
    const patient = document.querySelector('#patient');
    const formData = new FormData();
    formData.append('file', doc.files[0]);
    if (!step)
      axios.post('http://localhost:5000/file_upload', formData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          val: date.value,
          doctor: doctor.value,
          patient: patient.value,
          'Content-Type': 'multipart/form-data',
        },
      });
    else {
      axios.post('http://localhost:5000/file_upload', formData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          val: date.value,
          Lab: lab.value,
          patient: patient.value,
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    setOpen(false);
    window.location.reload();
  };
  switch (step) {
    case 0:
      return (
        <div>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                setStep(1);
                labtest();
              }}
            >
              See Lab Tests
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align='right'>Name</StyledTableCell>
                    <StyledTableCell align='right'>Date</StyledTableCell>
                    <StyledTableCell align='right'>Doctor</StyledTableCell>
                    <StyledTableCell align='right'>Download</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.ind}>
                      <StyledTableCell component='th' scope='row'>
                        {row.ind}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.doctor}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <IconButton
                          color='primary'
                          aria-label='download'
                          onClick={() => {
                            downloadprescription(row.url);
                          }}
                        >
                          <GetAppOutlinedIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <Button onClick={handleOpen}>Upload Prescription</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Upload Prescription
                </Typography>
                <h5>Patient Name</h5>
                <Typography sx={{ mt: 2 }}>
                  <TextField
                    id='patient'
                    label='Patient Name'
                    variant='outlined'
                  />
                  <h5>Doctor Name</h5>
                  <Typography sx={{ mt: 2 }}>
                    <TextField
                      id='doctor'
                      label='Doctor Name'
                      variant='outlined'
                    />
                    <h5>Select Date</h5>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='Date'
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField id='date' {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    <h5>Attach Prescription</h5>
                    <label htmlFor='contained-button-file'>
                      <Input accept='*' id='upfile' multiple type='file' />
                    </label>
                    <Button
                      type='submit'
                      onClick={Upload}
                      variant='contained'
                      color='primary'
                    >
                      Upload
                    </Button>
                  </Typography>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      );
      break;
    case 1:
      return (
        <div>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                setStep(0);
                prescriptions();
              }}
            >
              See Prescriptions
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align='right'>Name</StyledTableCell>
                    <StyledTableCell align='right'>Date</StyledTableCell>
                    <StyledTableCell align='right'>Lab Name</StyledTableCell>
                    <StyledTableCell align='right'>Download</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.ind}>
                      <StyledTableCell component='th' scope='row'>
                        {row.ind}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell align='right'>{row.Lab}</StyledTableCell>
                      <StyledTableCell align='right'>
                        <IconButton
                          color='primary'
                          aria-label='download'
                          onClick={() => {
                            downloadprescription(row.url);
                          }}
                        >
                          <GetAppOutlinedIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <Button onClick={handleOpen}>Upload Lab Report</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Upload Lab Report
                </Typography>
                <h5>Patient Name</h5>
                <Typography sx={{ mt: 2 }}>
                  <TextField
                    id='patient'
                    label='Patient Name'
                    variant='outlined'
                  />
                  <h5>Laboratory Name</h5>
                  <Typography sx={{ mt: 2 }}>
                    <TextField id='lab' label='Lab Name' variant='outlined' />
                    <h5>Select Date</h5>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='Date'
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField id='date' {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    <h5>Attach Lab Reports</h5>
                    <label htmlFor='contained-button-file'>
                      <Input accept='*' id='upfile' multiple type='file' />
                    </label>
                    <Button
                      type='submit'
                      onClick={Upload}
                      variant='contained'
                      color='primary'
                    >
                      Upload
                    </Button>
                  </Typography>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      );
      break;
  }
};
export default Medications;
