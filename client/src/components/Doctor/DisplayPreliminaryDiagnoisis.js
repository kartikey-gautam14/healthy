import {
  Drawer,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
  Box,
  ListItemText,
  Card,
  TextField,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ExplainCondition from './ExplainCondition';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.primary,
}));
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const DisplayPreliminaryDiagnoisis = (props) => {
  const [open1, setopen1] = useState(false);
  const [diagnosis, setDaignosis] = useState({});
  const [conditions, setConditions] = useState([
    {
      common_name: '',
    },
  ]);
  const [riskFactors, setRiskFactors] = useState([]);
  const [explain, setExplain] = useState([]);
  const [conditionDetail, setConditionDetail] = useState();
  const [specialist, setSpecialist] = useState();

  useEffect(() => {
    // setConditions(preliminaryDaignosis.Diagnosis.conditions);

    setDaignosis(props.preliminaryDaignosis.Diagnosis);
    // setConditions(diagnosis.conditions);
    // console.log(diagnosis, conditions);
    setExplain(props.preliminaryDaignosis.Explain);
    setSpecialist(
      props.preliminaryDaignosis.Specialist.recommended_specialist.name
    );
    console.log(props.preliminaryDaignosis);
  }, []);
  useEffect(() => {
    // console.log(props.preliminaryDaignosis.Diagnosis);
    setConditions(diagnosis.conditions);
    console.log(diagnosis, conditions);
  }, [diagnosis]);
  useEffect(() => {
    const tempList = [];
    explain.map((items) => {
      items.supporting_evidence.map((item) => {
        if (item.id[0] == 'p') tempList.push(item);
      });
    });

    const ids = tempList.map((o) => o.id);

    const filtered = tempList.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    setRiskFactors(filtered);
    // console.log(filtered);
  }, [explain]);
  const handleConditions = (condition) => {
    setopen1(true);
    let index = conditions.indexOf(condition);
    // console.log(condition);
    setConditionDetail(explain[index]);
    // conditionDetail.name = condition.common_name;
  };
  const toggleDrawer = () => {
    setopen1(!open1);
  };
  return (
    <div>
      {/* You have submitted your preliminaryDaignosis */}
      <div className='grid-container'>
        <div className='grid-item'>
          <Item sx={{ padding: '10px' }}>
            <Typography variant='h5' sx={{ 'text-align': 'center' }}>
              Preliminary Results
            </Typography>
            <Typography
              variant='h6'
              sx={{
                'padding-top': '10px',
                'text-align': 'center',
                'padding-bottom': '10px',
              }}
            >
              These results are based on your response in preliminary diagnosis
            </Typography>

            <List>
              {conditions &&
                conditions.map((condition) => {
                  return (
                    <Fragment>
                      <ListItemButton
                        onClick={(e) => handleConditions(condition)}
                        key={condition.id}
                      >
                        <Typography variant='h6'>
                          {condition.common_name}
                        </Typography>
                      </ListItemButton>
                      <LinearProgressWithLabel
                        value={condition.probability * 100}
                      />
                    </Fragment>
                  );
                })}
            </List>
            <Drawer
              anchor='right'
              open={open1}
              onClose={(e) => toggleDrawer(false)}
            >
              <ExplainCondition details={conditionDetail} />
              {/* {conditionDetail.supporting_evidence[0].common_name} */}
            </Drawer>
          </Item>
        </div>

        <div className='grid-row-container'>
          <div className='grid-item'>
            <Card sx={{ padding: '10px' }}>
              <Typography variant='h5' sx={{ 'text-align': 'center' }}>
                Risk Factors
              </Typography>
              <List>
                {riskFactors &&
                  riskFactors.map((riskFactor) => {
                    return (
                      <ListItemButton key={riskFactor.id}>
                        <ListItemText>{riskFactor.common_name}</ListItemText>
                      </ListItemButton>
                    );
                  })}
              </List>
            </Card>
          </div>
          <div className='grid-item'>
            <Card sx={{ padding: '10px' }}>
              <Typography variant='h5' sx={{ 'text-align': 'center' }}>
                Specialists Recommended
              </Typography>
              <List>
                <ListItemText>{specialist}</ListItemText>
              </List>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPreliminaryDiagnoisis;
