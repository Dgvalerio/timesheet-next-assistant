import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { NextPage } from 'next';

import Wrapper from '@/components/wrapper';
import useDashboardController, {
  DashboardLoad,
} from '@/views/dashboard/controller';
import Styles from '@/views/dashboard/style';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Switch,
  CardActions,
  Skeleton,
} from '@mui/material';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const Dashboard: NextPage = () => {
  const {
    monthlyWorkload,
    monthlyWorkloadWorked,
    data,
    checked,
    setChecked,
    onLoading,
  } = useDashboardController();

  return (
    <Wrapper>
      <Styles.Container>
        <Grid container>
          <Grid item xs={4}>
            {onLoading.includes(DashboardLoad.GetMonthHours) ? (
              <Skeleton width="100%" height={490} sx={{ transform: 'none' }} />
            ) : (
              <Card variant="outlined">
                <CardContent>
                  <Doughnut data={data} />
                  <br />
                  <Typography gutterBottom variant="h5" component="div">
                    Horas trabalhadas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No mês atual devem ser trabalhadas{' '}
                    <b>{monthlyWorkload} horas</b>, das quais você já trabalhou{' '}
                    <b>{monthlyWorkloadWorked} horas</b>.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="caption" align="right">
                    Usar padrão de 160 horas
                  </Typography>
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                  />
                  <Typography variant="caption">
                    Calcular com base nos dias do mês
                  </Typography>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
      </Styles.Container>
    </Wrapper>
  );
};

export default Dashboard;
