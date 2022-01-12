import React, { FC } from 'react';

import Image from 'next/image';

import Icon from '../../../../components/icon';
import useWorksheetReadController from './controller';
import { WorksheetReadStyles as Styles } from './styles';

const WorksheetRead: FC = () => {
  const {
    client,
    setClient,
    project,
    setProject,
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
    logout,
  } = useWorksheetReadController();

  return (
    <Styles.Container>
      <aside>
        <div>
          <Image
            src="https://luby-timesheet.azurewebsites.net/Content/custom/image/logo/timesheet_login.png"
            alt="Timesheet Azure Logo"
            width={120}
            height={52}
          />
        </div>
        <nav>
          <button>
            <Icon.History /> Apontamentos <Icon.ArrowRight />
          </button>
          <button>
            <Icon.Speedometer /> Relatórios <Icon.ArrowRight />
          </button>
        </nav>
      </aside>
      <main>
        <header>
          <div>
            <div>
              <Image
                src="https://luby-timesheet.azurewebsites.net/Content/neon/assets/images/thumb-1@2x.png"
                alt="Perfil Avatar"
                width={32}
                height={32}
              />
              <span>Davi Gonçalves Valério</span>
            </div>
            <div>
              <Icon.Message />
              <span>0</span>
            </div>
            <button onClick={logout}>
              Sair
              <Icon.SignOut />
            </button>
          </div>
          <hr />
          <div>
            <h1>Criar novo apontamento</h1>
          </div>
        </header>
        <section>
          <p>Formulário</p>
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Cliente</label>
                <select
                  onChange={(event) => setClient(event.target.value)}
                  value={client}
                  required
                >
                  <option>[Selecione]</option>
                </select>
              </div>
              <div>
                <label>Projeto</label>
                <select
                  onChange={(event) => setProject(event.target.value)}
                  value={project}
                  required
                >
                  <option>[Selecione]</option>
                </select>
              </div>
              <div>
                <label>Categoria</label>
                <select
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
                  required
                >
                  <option>[Selecione]</option>
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
              <div>
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
                <input type="time" disabled value={totalProjectTime} />
              </div>
              <div>
                <label>Total de Horas Utilizadas</label>
                <input type="time" disabled value={totalUtilizedTime} />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Informe a Descrição"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                required
              />
              <div>
                <button type="submit">
                  <span>Adicionar</span>
                  <Icon.Check />
                </button>
              </div>
            </div>
          </form>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>CLIENTE</th>
                <th>PROJETO</th>
                <th>CATEGORIA</th>
                <th>DATA</th>
                <th>HORA INICIAL</th>
                <th>HORA FINAL</th>
                <th>TOTAL (HH:MM)</th>
                <th>NÃO CONTABILIZADO?</th>
                <th>AVALIAÇÃO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>
                  <input type="checkbox" disabled />
                </td>
                <td>
                  <span className="approved">ABC</span>
                </td>
                <td>
                  <button>
                    <Icon.Pencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>ABC</td>
                <td>
                  <input type="checkbox" disabled checked />
                </td>
                <td>
                  <span className="unapproved">ABC</span>
                </td>
                <td>
                  <button>
                    <Icon.Pencil />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </section>
        <section>
          <span>Mostrando de 1 até X de registros</span>
          <nav>
            <button>
              <Icon.ArrowLeft /> Anterior
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>
              Próximo <Icon.ArrowRight />
            </button>
          </nav>
        </section>
        <section>
          <button>
            <Icon.ArrowFullLeft /> Home
          </button>
        </section>
        <footer>
          <hr />
          <span>
            © 2018 <b>Timesheet</b> Todos os direitos reservados
          </span>
        </footer>
      </main>
    </Styles.Container>
  );
};

export default WorksheetRead;
