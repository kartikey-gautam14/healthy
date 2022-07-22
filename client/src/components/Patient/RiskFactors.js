import React from 'react';
import { Card } from '@mui/material';
const RiskFactors = (
  riskFactors,
  handleRiskFactors,
  step,
  handleStepChange,
  classes
) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <div>
        <h3>Please check all the statements below that apply to you.</h3>
      </div>
    </Card>
  );
};

export default RiskFactors;
