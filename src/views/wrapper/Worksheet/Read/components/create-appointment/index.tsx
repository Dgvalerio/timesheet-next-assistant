import React from 'react';

import { NextPage } from 'next';

import Icon from '@/components/icon';
import useCreateAppointmentController from '@/views/wrapper/Worksheet/Read/components/create-appointment/controller';
import Styles from '@/views/wrapper/Worksheet/Read/components/create-appointment/style';

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
    totalProjectTime,
    totalUtilizedTime,
    description,
    setDescription,
    handleSubmit,
  } = useCreateAppointmentController();

  return (
    <Styles.Container>
      <section id="title">
        <p>Formulário</p>
      </section>
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Cliente</label>
              <select
                onChange={(event) => setClient(event.target.value)}
                value={client}
                required
                disabled={clients.length <= 0}
              >
                {clients.map(({ id, title }) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Projeto</label>
              <select
                onChange={(event) => setProject(event.target.value)}
                value={project}
                required
                disabled={projects.length <= 0}
              >
                <option value="-1">[Selecione]</option>
                {projects.map(({ Id, Name }) => (
                  <option key={Id} value={Id}>
                    {Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Categoria</label>
              <select
                onChange={(event) => setCategory(event.target.value)}
                value={category}
                disabled={categories.length <= 0}
              >
                <option value="-1">[Selecione]</option>
                {categories.map(({ Id, Name }) => (
                  <option key={Id} value={Id}>
                    {Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Data</label>
              <input
                type="date"
                onChange={(event) => setDate(event.target.value)}
                value={date}
                required
              />
            </div>
            <div>
              <label>Hora Inicial</label>
              <input
                type="time"
                onChange={(event) => setInitialTime(event.target.value)}
                value={initialTime}
                required
              />
            </div>
            <div>
              <label>Hora Final</label>
              <input
                type="time"
                onChange={(event) => setFinalTime(event.target.value)}
                value={finalTime}
                required
              />
            </div>
          </div>
          <div>
            <div className="checkbox-group">
              <label>Não Contabilizado?</label>
              <input
                type="checkbox"
                onChange={(event) => setAccounted(event.target.value)}
                value={accounted}
                required
              />
            </div>
            <div>
              <label>Total de Horas no Projeto</label>
              <input type="number" disabled value={totalProjectTime} />
            </div>
            <div>
              <label>Total de Horas Utilizadas</label>
              <input type="text" disabled value={totalUtilizedTime} />
            </div>
          </div>
          <div>
            <div className="textarea-group">
              <textarea
                placeholder="Informe a Descrição"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit">
                <span>Adicionar</span>
                <Icon.Check />
              </button>
            </div>
          </div>
        </form>
      </section>
    </Styles.Container>
  );
};

export default CreateAppointment;
