import React, { FC } from 'react';

import Image from 'next/image';

import Authenticator from '@/components/authenticator';
import Icon from '@/components/icon';
import CreateAppointment from '@/views/wrapper/Worksheet/Read/components/create-appointment';
import ListAppointments from '@/views/wrapper/Worksheet/Read/components/list-appointments';
import useWorksheetReadController from '@/views/wrapper/Worksheet/Read/controller';
import Styles from '@/views/wrapper/Worksheet/Read/style';

const WorksheetRead: FC = () => {
  const { logout } = useWorksheetReadController();

  return (
    <Authenticator>
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
          <CreateAppointment />
          <ListAppointments />
          <section id="footer">
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
    </Authenticator>
  );
};

export default WorksheetRead;
