import React from 'react';

import { NextPage } from 'next';

import Wrapper from '@/components/wrapper';
import useReadAppointmentsController, {
  ReadAppointmentItem,
} from '@/views/appointment/read/controller';
import Styles from '@/views/appointment/read/style';
import EditIcon from '@mui/icons-material/Edit';
import {
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const AppointmentItem: React.FC<{ appointment: ReadAppointmentItem }> = ({
  appointment: { id, client, project, category, start, end, description },
}) => {
  return (
    <Accordion sx={{ width: '100%' }}>
      <AccordionSummary
        expandIcon={<EditIcon />}
        aria-controls={`appointment-${id}-content`}
        id={`appointment-${id}-header`}
      >
        <Grid container alignItems="center">
          <Grid xs={12}>
            <Typography variant="overline">
              {client} &gt; {project} &gt; {category}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="h6">
              Dás {start} às {end}
            </Typography>
          </Grid>
          <Grid xs={8}>
            <Typography sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const ReadAppointments: NextPage = () => {
  const { appointments, isLoading } = useReadAppointmentsController();

  return (
    <Wrapper>
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Seus apontamentos</Typography>
          </Grid>
          <Grid item xs={12}>
            {appointments.map((appointmentDay) => (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  {appointmentDay.date}
                  <Typography sx={{ float: 'right' }}>
                    {appointmentDay.total}
                  </Typography>
                </Typography>
                {appointmentDay.items.map((appointment) => (
                  <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
                <br />
              </>
            ))}
          </Grid>
        </Grid>
      </Styles.Container>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

export default ReadAppointments;
