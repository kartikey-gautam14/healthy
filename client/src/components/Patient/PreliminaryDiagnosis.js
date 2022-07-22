import DeleteIcon from '@mui/icons-material/Delete';
import {
  CircularProgress,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useEffect, useState } from 'react';
import {
  inferDiagnosis,
  inferExplain,
  inferSearch,
  inferSpecialist,
  inferSuggest,
  inferTraige,
} from '../../utils/infermedicaApi/infermedicaApi';
import { useHistory } from 'react-router';

import { submitPreliminaryDiagnosis } from '../../utils/patientActions';
const useStyles = makeStyles({
  landingCard: {
    justifyContent: 'center',
  },
  cardcontent: {
    marginLeft: 20,
    marginRight: 20,
  },
  screenConatiner: {
    display: 'inline-block',
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
  },
  screen: {
    // display: 'flex',
    'padding-top': '20px',
    'padding-right': '150px',
    'padding-bottom': '20px',
    'padding-left': '150px',
  },
  split: {
    'min-height': '100%',
    display: 'flex',
    'flex-wrap': 'wrap',
  },
  screenContent: {
    'min-height': '347px',
  },
  screenTextHeader: {
    order: '1',
    width: '59%',
    'align-self': 'flex-end',
    'padding-top': '40px',
    'padding-right': '0px',
    'padding-bottom': '40px',
    'padding-left': '30px',
  },
  actionArea: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
  riskFactor: {
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'column',
    'padding-top': '50px',
    'padding-right': '30px',
    'padding-bottom': '50px',
    'padding-left': '30px',
  },
  textCenter: {
    'text-align': 'center',
  },
  symptoms: {
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'column',
    'padding-top': '50px',
    'padding-right': '30px',
    'padding-bottom': '50px',
    'padding-left': '30px',
  },
  symptomsContent: {},
});
const initialRiskFactors = [
  {
    id: 'p_7',
    name: 'High BMI',
    common_name: 'Obesity',
    choice_id: '',
  },
  {
    id: 'p_9',
    name: 'Hypertension',
    common_name: 'Hypertension',
    choice_id: '',
  },
  {
    id: 'p_28',
    name: 'Smoking cigarettes',
    common_name: 'Smoking cigarettes',
    choice_id: '',
  },
  {
    id: 'p_264',
    name: 'Recent physical injury',
    common_name: 'Recent physical injury',
    choice_id: '',
  },
  {
    id: 'p_10',
    name: 'High cholesterol',
    common_name: 'High cholesterol',
    choice_id: '',
  },
];
const initialAppointmnet = [
  {
    PatientId: '',
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
];
const evidence = [
  // {
  //   id: 's_21',
  //   choice_id: 'present',
  //   source: 'initial',
  // },
  // {
  //   id: 's_1193',
  //   choice_id: 'present',
  //   source: 'initial',
  // },
];
const initialQuestion = {
  question: {
    type: '',
    text: '',
    items: [
      {
        id: '',
        name: '',
        choices: [
          {
            id: '',
            label: '',
          },
          {
            id: '',
            label: '',
          },
          {
            id: '',
            label: '',
          },
        ],
      },
    ],
    extras: {},
  },
  conditions: [
    {
      id: '',
      name: '',
      common_name: '',
      probability: 0,
    },
  ],
  extras: {},
  has_emergency_evidence: false,
  should_stop: false,
};
const explain = [];
const PreliminaryDiagnosis = (props) => {
  const [step, setStep] = useState(1);
  const classes = useStyles();
  const [interviewId, setInterviewId] = useState('');
  const [read, setRead] = useState(false);
  const [error2, setError2] = useState(false);
  const [riskFactors, setRiskFactors] = useState(initialRiskFactors);
  const [next3, setNext3] = useState(5);
  const [symptomFilter, setSymptonFilter] = useState('');
  const [appointment, setAppointment] = useState(initialAppointmnet);
  const [next4, setNext4] = useState(2);
  const [next6, setNext6] = useState(0);
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([
    {
      id: '',
      label: '',
    },
  ]);
  const [filteredSymptom, setFilteredSymptom] = useState([
    { id: '', label: '' },
  ]);
  const [questions, setQuestions] = useState(initialQuestion);
  const [selectedSymptoms, setSelectedSymptoms] = useState([
    // {
    //   id: 's_21',
    //   label: 'Headache',
    // },
    // {
    //   id: 's_1193',
    //   label: 'Headache, severe',
    // },
  ]);
  const [suggestedSymptoms, setsuggestedSymptoms] = useState([
    {
      id: '',
      name: '',
      common_name: '',
    },
  ]);
  const [checked, setChecked] = useState([]);
  const [traige, setTraige] = useState({
    id: '',
  });
  const [specialist, setSpecialist] = useState({
    id: '',
  });
  const searchItems = (symptomFilter) => {
    const filterData = symptoms.filter((item) => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(symptomFilter.toLowerCase());
    });
    // console.log(filterData);
    setFilteredSymptom(filterData);
    // console.log(filteredSymptom);
  };
  const history = useHistory();
  const handleRiskFactors = (riskFactor) => {
    setRiskFactors(riskFactor);
  };
  const handleStepChange = (steps) => {
    setStep(steps);
  };
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked);
  };
  const handleStepChange4 = () => {
    selectedSymptoms.map((symptom) => {
      evidence.push({
        id: symptom.id,
        choice_id: 'present',
        source: 'initial',
      });
    });
    riskFactors.map((riskFactor) => {
      if (riskFactor.choice_id == 'present' || riskFactor.choice_id == 'absent')
        evidence.push({
          id: riskFactor.id,
          choice_id: riskFactor.choice_id,
          source: 'predefined',
        });
    });
    console.log(evidence);
    const suggestSymptom = {
      sex: appointment.Sex,
      age: {
        value: appointment.Age,
      },
      suggest_method: 'symptoms',
      evidence: evidence,
    };
    inferSuggest(suggestSymptom, interviewId).then((res) => {
      console.log(res.data);
      setsuggestedSymptoms(res.data);
    });
    setStep(step + 1);
  };
  const handleStepChange5 = () => {
    checked.map((item) => {
      evidence.push({
        id: item.id,
        choice_id: 'present',
      });
    });
    console.log(evidence);
    const packet = {
      sex: appointment.Sex,
      age: {
        value: appointment.Age,
      },
      evidence: evidence,
      extras: {
        include_condition_details: true,
      },
    };
    inferDiagnosis(packet, interviewId).then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    });

    setNext6(0);
    setStep(step + 1);
  };
  const handleStepChange6 = () => {
    setQuestions(initialQuestion);
    const packet = {
      sex: appointment.Sex,
      age: {
        value: appointment.Age,
      },
      evidence: evidence,
      extras: {
        include_condition_details: true,
      },
    };
    inferDiagnosis(packet, interviewId).then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    });
    if (questions.should_stop == true) {
      preliminaryDiagnosisComplete();
    }
    setNext6(0);
  };
  const preliminaryDiagnosisComplete = () => {
    // inferTraige()
    setStep(step + 1);
    const packet = {
      sex: appointment.Sex,
      age: {
        value: appointment.Age,
      },
      evidence: evidence,
    };
    inferTraige(packet, interviewId).then((res) => {
      console.log(res.data);
      setTraige(res.data);
    });
    inferSpecialist(packet, interviewId).then((res) => {
      console.log(res.data);
      setSpecialist(res.data);
    });

    questions.conditions.map((condition) => {
      packet.target = condition.id;
      inferExplain(packet, interviewId).then((res) => {
        console.log(res.data);
        // setOpen(false);
        explain.push({
          id: condition.id,
          supporting_evidence: res.data.supporting_evidence,
          conflicting_evidence: res.data.conflicting_evidence,
          unconfirmed_evidence: res.data.unconfirmed_evidence,
        });
      });
    });

    console.log(evidence, questions, traige, specialist, explain);
  };
  const handleSubmit = () => {
    const appointmentId = appointment._id;
    submitPreliminaryDiagnosis(
      appointmentId,
      questions,
      evidence,
      traige,
      specialist,
      explain
    ).then((res) => console.log('Submitted'));

    // setStep(step + 1);
    window.location.reload();
    // history.push({
    //   pathname: '/patient/appointments/view',
    //   state: { detail: appointment },
    // });
  };
  const handleRemoveSymptom = (item) => {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom.id != item.id)
    );
    console.log(selectedSymptoms);
    setNext4(next4 - 1);
  };
  const handleFilterChange = (temp) => {
    setSymptonFilter(temp);
    if (temp.length < 2) {
      setSymptoms([]);
      setFilteredSymptom([]);
    }
    if (temp.length == 2) {
      console.log(temp);
      inferSearch(
        temp,
        appointment.Age,
        appointment.Sex,
        2000,
        interviewId
      ).then((tempSympt) => {
        // console.log(tempSympt);
        setSymptoms(tempSympt);
      });
    }
    if (temp.length >= 2) {
      searchItems(temp);
    }
  };
  useEffect(() => {
    setInterviewId(Math.random().toString(36).slice(2));
    // setNext3(5);
    setAppointment(props.appointment);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  switch (step) {
    case 1:
      return (
        // <Container>

        <Fragment>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={(e) => handleClose}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          {/* <Box className={classes.screen}> */}
          <Card sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                'align-self': 'flex-end',
              }}
              component='div'
            >
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='h2' variant='h5'>
                  Hello!
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='p'
                >
                  You’re about to use a short (3 min), safe and anonymous health
                  checkup. Your answers will be carefully analyzed and you’ll
                  learn about possible causes of your symptoms.
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='p'
                >
                  InterviewId: {interviewId}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component='img'
              sx={{ width: 300 }}
              src={process.env.PUBLIC_URL + '/static/images/helpdesk.jpg'}
              alt='Intro'
            />
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => setStep(step + 1)}>
              Next
            </Button>
          </div>
          {/* </Box> */}
        </Fragment>
        // </Container>
      );

    case 2:
      return (
        <Fragment>
          <Card sx={{ display: 'flex' }}>
            <div className={classes.screen}>
              <h3>Terms of Service</h3>
              <p>
                Before using the checkup, please read Terms of Service. Remember
                that:
              </p>
              <ul>
                <li>
                  <strong>Checkup is not a diagnosis.</strong> Checkup is for
                  informational purposes and is not a qualified medical opinion.
                </li>
                <li>
                  <strong>Do not use in emergencies.</strong> In case of health
                  emergency, call your local emergency number immediately.
                </li>
                <li>
                  <strong>Your data is safe.</strong> Information that you
                  provide is anonymous and not shared with anyone.
                </li>
              </ul>

              <FormControlLabel
                label='I read and accept Terms of Service and Privacy Policy.'
                control={
                  <Checkbox
                    checked={read}
                    onChange={(e) => {
                      console.log(!read);
                      setRead(!read);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
              />
            </div>

            <CardMedia
              component='img'
              sx={{ width: 300 }}
              src={process.env.PUBLIC_URL + '/static/images/instruction.svg'}
              alt='Intro'
            />
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => setStep(step - 1)}>
              Back
            </Button>
            {read && (
              <Button
                variant='contained'
                onClick={(e) => {
                  setStep(step + 1);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </Fragment>
      );

    case 3:
      return (
        <Fragment>
          {/* <RiskFactors
                    riskFactors={riskFactors}
                    handleRiskFactors={handleRiskFactors}
                    step={step}
                    handleStepChange={handleStepChange}
                    classes={classes}
                  /> */}
          <Card>
            <div className={classes.riskFactor}>
              <h3 className={classes.textCenter}>
                Please check all the statements below that apply to you.
              </h3>
              <p className={classes.textCenter}>
                Select one answer in each row.
              </p>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    {riskFactors.map((riskFactor) => {
                      return (
                        <TableRow>
                          <TableCell>{riskFactor.common_name}</TableCell>
                          <TableCell align='right'>
                            <FormControl component='fieldset'>
                              <RadioGroup
                                row
                                name='row-radio-buttons-group'
                                defaultValue={riskFactor.choice_id}
                                onChange={(e) => {
                                  if (riskFactor.choice_id == '')
                                    setNext3(next3 - 1);
                                  riskFactor.choice_id = e.target.value;
                                  // console.log(riskFactor);
                                }}
                              >
                                <FormControlLabel
                                  value='present'
                                  control={<Radio />}
                                  label='Yes'
                                />
                                <FormControlLabel
                                  value='absent'
                                  control={<Radio />}
                                  label='No'
                                />
                                <FormControlLabel
                                  value='unknown'
                                  control={<Radio />}
                                  label="Don't Know"
                                />
                              </RadioGroup>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableHead>
                </Table>
              </TableContainer>
            </div>
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => setStep(step - 1)}>
              Back
            </Button>
            {next3 == 0 && (
              <Button
                variant='contained'
                onClick={(e) => {
                  setStep(step + 1);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </Fragment>
      );

    case 4:
      return (
        <Fragment>
          {/* <Symptoms /> */}
          <Card>
            <div className={classes.symptoms}>
              <h3 className={classes.textCenter}>Add Symptoms</h3>
              <p className={classes.textCenter}>
                Search and add Symptoms ( Add atleast 2 symptoms for best result
                )
              </p>
              <div className={classes.symptomsContent}>
                <input
                  value={symptomFilter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                />
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                  }}
                >
                  {filteredSymptom.map((item) => {
                    return (
                      <ListItemButton
                        key={item.id}
                        onClick={(e) => {
                          setSelectedSymptoms((selectedSymptoms) => [
                            ...selectedSymptoms,
                            item,
                          ]);

                          setNext4(next4 + 1);
                          setSymptonFilter('');
                          setFilteredSymptom([
                            {
                              id: '',
                              label: '',
                            },
                          ]);
                          console.log(selectedSymptoms);
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    );
                  })}
                </List>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                  }}
                >
                  {selectedSymptoms.map((item) => {
                    return (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <IconButton
                            onClick={(e) => {
                              handleRemoveSymptom(item);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => setStep(step - 1)}>
              Back
            </Button>
            {next4 >= 2 && (
              <Button variant='contained' onClick={(e) => handleStepChange4()}>
                Next
              </Button>
            )}
          </div>
        </Fragment>
      );

    //suggest more symptoms based on the symptoms before
    case 5:
      return (
        <Fragment>
          {/* <Symptoms /> */}
          <Card>
            <div className={classes.symptoms}>
              <h3 className={classes.textCenter}>
                Do you have any of the following symptoms?
              </h3>

              <div className={classes.symptomsContent}>
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': { padding: 0 },
                  }}
                >
                  {suggestedSymptoms.map((item) => {
                    return (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Checkbox
                            edge='end'
                            onChange={(e) => handleToggle(item)}
                            checked={checked.indexOf(item) != -1}
                          />
                        }
                      >
                        <ListItemText primary={item.common_name} />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => setStep(step - 1)}>
              Back
            </Button>
            <Button variant='contained' onClick={(e) => handleStepChange5()}>
              Next
            </Button>
          </div>
        </Fragment>
      );

    //daignosis part starts
    case 6:
      return (
        <Fragment>
          <Card>
            <div className={classes.symptoms}>
              <h3 className={classes.textCenter}>{questions.question.text}</h3>
              {questions.question.type == 'single' && (
                <FormControl component='fieldset'>
                  <RadioGroup
                    row
                    name='row-radio-buttons-group'
                    onChange={(e) => {
                      evidence.push({
                        id: questions.question.items[0].id,
                        choice_id: e.target.value,
                      });
                      // handleStepChange6();
                      // console.log(riskFactor);
                    }}
                  >
                    <FormControlLabel
                      value='present'
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value='absent'
                      control={<Radio />}
                      label='No'
                    />
                    <FormControlLabel
                      value='unknown'
                      control={<Radio />}
                      label="Don't Know"
                    />
                  </RadioGroup>
                </FormControl>
              )}
              {questions.question.type == 'group_single' && (
                <FormControl component='fieldset'>
                  <RadioGroup
                    column
                    name='row-radio-buttons-group'
                    onChange={(e) => {
                      evidence.push({
                        id: e.target.value,
                        choice_id: 'present',
                      });
                      // console.log(evidence);
                      // handleStepChange6();
                    }}
                  >
                    {questions.question.items.map((item) => {
                      return (
                        <FormControlLabel
                          value={item.id}
                          control={<Radio />}
                          label={item.name}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
              {questions.question.type == 'group_multiple' && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      {questions.question.items.map((item) => {
                        return (
                          <TableRow>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align='right'>
                              <FormControl component='fieldset'>
                                <RadioGroup
                                  row
                                  name='row-radio-buttons-group'
                                  onChange={(e) => {
                                    const temp = e.target.value;
                                    const index = evidence.findIndex(
                                      (obj) => obj.id == item.id
                                    );
                                    if (index == -1) {
                                      setNext6(next6 + 1);
                                      evidence.push({
                                        id: item.id,
                                        choice_id: temp,
                                      });
                                    } else {
                                      evidence[index].choice_id = temp;
                                    }
                                    // console.log(riskFactor);
                                  }}
                                >
                                  <FormControlLabel
                                    value='present'
                                    control={<Radio />}
                                    label='Yes'
                                  />
                                  <FormControlLabel
                                    value='absent'
                                    control={<Radio />}
                                    label='No'
                                  />
                                  <FormControlLabel
                                    value='unknown'
                                    control={<Radio />}
                                    label="Don't Know"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableHead>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => handleStepChange6()}>
              Next
            </Button>
          </div>
        </Fragment>
      );
    case 7:
      return (
        <Fragment>
          <Card>
            <div className={classes.symptoms}>
              <h3 className={classes.textCenter}>
                You have completed your PreliminaryDiagnosis
              </h3>
              <p className={classes.textCenter}> Submit to Continue</p>
            </div>
          </Card>
          <div className={classes.actionArea}>
            <Button variant='contained' onClick={(e) => handleSubmit()}>
              Submit
            </Button>
          </div>
        </Fragment>
      );
    default:
      return <Fragment>Hello</Fragment>;
  }
};

export default PreliminaryDiagnosis;
