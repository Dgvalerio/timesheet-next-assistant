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
  CircularProgress,
  Backdrop,
} from '@mui/material';

const CreateAppointment: NextPage = () => {
  const {
    clients,
    client,
    clientError,
    projects,
    project,
    projectError,
    categories,
    category,
    categoryError,
    date,
    dateError,
    initialTime,
    initialTimeError,
    finalTime,
    finalTimeError,
    accounted,
    description,
    descriptionError,
    commit,
    commitError,
    commitVisible,
    handleSubmit,
    updateField,
    isLoading,
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
                name="client"
                value={client}
                onChange={updateField}
                disabled={clients.length <= 0}
                error={!!clientError}
                helperText={clientError}
                required
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
                name="project"
                value={project}
                onChange={updateField}
                disabled={projects.length <= 0}
                error={!!projectError}
                helperText={projectError}
                required
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
                name="category"
                value={category}
                onChange={updateField}
                disabled={categories.length <= 0}
                error={!!categoryError}
                helperText={categoryError}
                required
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
                onChange={updateField}
                name="date"
                value={date}
                error={!!dateError}
                helperText={dateError}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hora Inicial"
                variant="outlined"
                type="time"
                onChange={updateField}
                name="initialTime"
                value={initialTime}
                error={!!initialTimeError}
                helperText={initialTimeError}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hora Final"
                variant="outlined"
                type="time"
                onChange={updateField}
                name="finalTime"
                value={finalTime}
                error={!!finalTimeError}
                helperText={finalTimeError}
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
                  type="text"
                  onChange={updateField}
                  value={commit}
                  error={!!commitError}
                  helperText={commitError}
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
                onChange={updateField}
                name="description"
                value={description}
                error={!!descriptionError}
                helperText={descriptionError}
                fullWidth
                rows={4}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="accounted"
                    checked={accounted}
                    onChange={updateField}
                  />
                }
                label="Não Contabilizado?"
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" disabled={isLoading}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Styles.Container>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

export default CreateAppointment;
