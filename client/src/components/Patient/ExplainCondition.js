import {
  Typography,
  Box,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const ExplainCondition = (props) => {
  const [supporting, setSupporting] = useState([]);
  const [conflicting, setConflicting] = useState([]);
  useEffect(() => {
    // console.log(props.details);
    setSupporting(props.details.supporting_evidence);
    setConflicting(props.details.conflicting_evidence);
  }, []);
  return (
    <Box
      sx={{
        'padding-top': '50px',
        'padding-left': '25px',
        'padding-right': '25px',
        'padding-bottom': '50px',
      }}
    >
      {/* <Typography>{props.name}</Typography> */}
      <Typography> Supporting Evidence</Typography>
      <List>
        <ul className='supporting-evidence'>
          {' '}
          {supporting.map((item) => {
            return <li>{item.common_name}</li>;
          })}
        </ul>
      </List>
      <Typography> Conflicting Evidence</Typography>
      <List>
        <ul className='conflicting-evidence'>
          {' '}
          {conflicting.map((item) => {
            return <li>{item.common_name}</li>;
          })}
        </ul>
      </List>
    </Box>
  );
};

export default ExplainCondition;
