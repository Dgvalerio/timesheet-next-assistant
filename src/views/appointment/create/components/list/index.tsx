import React, { Dispatch, FC, SetStateAction } from 'react';

import useAppointmentsListController from '@/views/appointment/create/components/list/controller';
import { CreateAppointmentLoad } from '@/views/appointment/create/controller';
import { ReadAppointmentItem } from '@/views/appointment/read/controller';
import EditIcon from '@mui/icons-material/Edit';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Skeleton,
  TextField,
  Typography,
  Divider,
  Tooltip,
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
          <Grid item xs={12}>
            <Typography variant="overline">
              {client} &gt; {project} &gt; {category}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
              Dás {start} às {end}
            </Typography>
          </Grid>
          <Grid item xs={8}>
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

const AppointmentsList: FC<{
  setLoadAppointments: Dispatch<SetStateAction<() => void>>;
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
}> = ({ onLoading, setOnLoading, setLoadAppointments }) => {
  const { appointmentDay, dayDate, setDayDate, worked, toWork } =
    useAppointmentsListController({
      onLoading,
      setOnLoading,
      setLoadAppointments,
    });

  return (
    <Grid
      item
      xs={12}
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={10}>
        <TextField
          label="Ver dia:"
          variant="standard"
          type="date"
          onChange={(event) => setDayDate(event.target.value)}
          name="date"
          value={dayDate}
          fullWidth
        />
      </Grid>
      {onLoading.includes(CreateAppointmentLoad.Appointments) ? (
        <Grid item xs={2} container spacing={1}>
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              width="100%"
              height={32}
              sx={{ transform: 'none' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              width="100%"
              height={14}
              sx={{ transform: 'none' }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={2} container>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="right"
              sx={{ color: 'text.secondary', float: 'right' }}
            >
              {worked}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Calculado com base nas 8 horas de trabalho previstas.">
              <Typography
                variant="subtitle2"
                align="right"
                sx={{ color: 'text.secondary', float: 'right' }}
              >
                {toWork}
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {onLoading.includes(CreateAppointmentLoad.Appointments) ? (
        <>
          <Grid item xs={12}>
            <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          {appointmentDay.items.length === 0 ? (
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Não há apontamentos para esse dia.
            </Typography>
          ) : (
            appointmentDay.items.map((appointment) => (
              <AppointmentItem key={appointment.id} appointment={appointment} />
            ))
          )}
          <br />
        </Grid>
      )}
    </Grid>
  );
};

export default AppointmentsList;
