import React from 'react';

import { NextPage } from 'next';

import Wrapper from '@/components/wrapper';
import useCreateAppointmentController from '@/views/appointment/create/controller';
import Styles from '@/views/appointment/create/style';
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const CreateAppointment: NextPage = () => {
  const {
    clients,
    client,
    setClient,
    projects,
    project,
    setProject,
    categories,
    category,
    setCategory,
    date,
    setDate,
    initialTime,
    setInitialTime,
    finalTime,
    setFinalTime,
    accounted,
    setAccounted,
    description,
    setDescription,
    commit,
    setCommit,
    commitVisible,
    handleSubmit,
  } = useCreateAppointmentController();

  return (
    <Wrapper>
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Novo apontamento</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            component="form"
            onSubmit={handleSubmit}
            justifyContent="space-between"
          >
            <Grid item xs={4}>
              <TextField
                select
                label="Cliente"
                value={client}
                onChange={(event) => setClient(event.target.value)}
                required
                disabled={clients.length <= 0}
                fullWidth
              >
                {clients.map(({ id, title }) => (
                  <MenuItem key={id} value={id}>
                    {title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Projeto"
                value={project}
                onChange={(event) => setProject(event.target.value)}
                required
                disabled={projects.length <= 0}
                fullWidth
              >
                {projects.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                disabled={categories.length <= 0}
                fullWidth
              >
                {categories.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Data"
                variant="outlined"
                type="date"
                onChange={(event) => setDate(event.target.value)}
                value={date}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hora Inicial"
                variant="outlined"
                type="time"
                onChange={(event) => setInitialTime(event.target.value)}
                value={initialTime}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="finalTime"
                label="Hora Final"
                variant="outlined"
                type="time"
                onChange={(event) => setFinalTime(event.target.value)}
                value={finalTime}
                required
                fullWidth
              />
            </Grid>

            {commitVisible && (
              <Grid item xs={12}>
                <TextField
                  name="commit"
                  label="Link do commit"
                  variant="outlined"
                  type="url"
                  onChange={(event) => setCommit(event.target.value)}
                  value={commit}
                  required
                  fullWidth
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Informe a Descrição"
                variant="outlined"
                required
                multiline
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                fullWidth
                rows={4}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accounted}
                    onChange={(event) => setAccounted(event.target.checked)}
                  />
                }
                label="Não Contabilizado?"
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit">
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Styles.Container>
    </Wrapper>
  );
};

export default CreateAppointment;
