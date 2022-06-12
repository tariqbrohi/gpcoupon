import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/popular2.jpg';
import {
  Typography,
  Stack,
  Stepper,
  StepLabel,
  Step,
  TextField,
  Button,
} from '@mui/material';
import { useStyles } from '../../styles/pages/confirmationStyles';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';

import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();

  const router = useRouter();

  const handleClose = () => {};

  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#ff3c78',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#ff3c78',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#ff3c78',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#ff3c78',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const steps = ['Reciepent', 'Payment'];

  return (
    <Layout>
      <div className={classes.mainConfirmation}>
        <Stack spacing={2}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            <Step key={'receipt'}>
              <StepLabel StepIconComponent={QontoStepIcon}>Receipt</StepLabel>
            </Step>
            <Step key={'payment'}>
              <StepLabel StepIconComponent={QontoStepIcon}>Payment</StepLabel>
            </Step>
          </Stepper>

          <Typography variant="h6">
            Please fill in the recipient information
          </Typography>
          <TextField label="Name" variant="outlined" />

          <Typography variant="h6">Sender Name</Typography>
          <TextField label="Sender Name" variant="outlined" />

          <Typography variant="h6">Give it a personal touch</Typography>
          <TextField
            label="I got something! I hope you like it"
            multiline
            rows={5}
            // variant="outlined"
          />
          <Button
            className={classes.buttonContained}
            //   onClick={() => {
            //     setShowConfirm(true);
            //   }}
            variant="contained"
          >
            Continue
          </Button>
        </Stack>
      </div>
    </Layout>
  );
}
