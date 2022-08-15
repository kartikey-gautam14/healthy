import {
  Drawer,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
  Box,
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
  const [explain, setExplain] = useState([]);
  const [conditionDetail, setConditionDetail] = useState();
  useEffect(() => {
    // setConditions(preliminaryDaignosis.Diagnosis.conditions);

    setDaignosis(props.preliminaryDaignosis.Diagnosis);
    // setConditions(diagnosis.conditions);
    // console.log(diagnosis, conditions);
    setExplain(props.preliminaryDaignosis.Explain);
    console.log(props.preliminaryDaignosis);
  }, []);
  useEffect(() => {
    // console.log(props.preliminaryDaignosis.Diagnosis);
    setConditions(diagnosis.conditions);
    console.log(diagnosis, conditions);
  }, [diagnosis]);
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
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <Item>
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
        </Grid>
        {/* <Grid item xs={6} md={4}>
          <Typography variant='h6'>Kdnfaj</Typography>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default DisplayPreliminaryDiagnoisis;
