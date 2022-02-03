import React from 'react';

import { NextPage } from 'next';

import Icon from '@/components/icon';
import useListAppointmentsController from '@/views/wrapper/Worksheet/Read/components/list-appointments/controller';

const ListAppointments: NextPage = () => {
  const { appointments } = useListAppointmentsController();

  return (
    <>
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
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.cliente}</td>
                <td>{appointment.projeto}</td>
                <td>{appointment.categoria}</td>
                <td>{appointment.data}</td>
                <td>{appointment.horaInicial}</td>
                <td>{appointment.horaFinal}</td>
                <td>{appointment.total}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled
                    checked={appointment.naoContabilizado}
                  />
                </td>
                <td>
                  <span
                    className={
                      appointment.avaliacao === 'Aprovada'
                        ? 'approved'
                        : 'unapproved'
                    }
                  >
                    {appointment.avaliacao}
                  </span>
                </td>
                <td>
                  <button>
                    <Icon.Pencil />
                  </button>
                </td>
              </tr>
            ))}
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
    </>
  );
};

export default ListAppointments;
