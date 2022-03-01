import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';
import { Scrapper, ScrapperApi } from '@/services/scrapperApi';
import { setCookies } from '@/store/user/actions';
import { invertDate, minutesToTime, timeToMinutes } from '@/utils';

import { AxiosError } from 'axios';

export interface ReadAppointmentItem {
  id: string;
  client: string;
  project: string;
  category: string;
  start: string;
  end: string;
  total: string;
  notMonetize: boolean;
  description: string;
  commits?: string[];
}
interface AppointmentDaysObject {
  [key: string]: { items: ReadAppointmentItem[]; total: string };
}
export interface AppointmentDay {
  date: string;
  items: ReadAppointmentItem[];
  total: string;
}

interface ControllerReturn {
  isLoading: boolean;
  appointments: AppointmentDay[];
}

const adaptEntity = (
  appointment: Scrapper.Read.Appointments.Appointment
): ReadAppointmentItem => ({
  id: appointment.id,
  client: appointment.cliente,
  project: appointment.projeto,
  category: appointment.categoria,
  start: appointment.horaInicial,
  end: appointment.horaFinal,
  total: minutesToTime(
    timeToMinutes(appointment.horaFinal) -
      timeToMinutes(appointment.horaInicial)
  ),
  notMonetize: appointment.naoContabilizado,
  commits: appointment.commit.split(' '),
  description: appointment.descricao,
});

const Manage = {
  Client: new ClientRepository(),
  Project: new ProjectRepository(),
  Category: new CategoryRepository(),
};

const useReadAppointmentsController = (): ControllerReturn => {
  const dispatch = useDispatch();
  const { uid, cookies } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentDay[]>([]);

  const loadAppointments = useCallback(async () => {
    if (!uid) return;
    setIsLoading(true);

    try {
      const response = await ScrapperApi.readAppointments({ cookies });

      if (!response.appointments) {
        setAppointments([]);
        return;
      }

      const groupedByDate = response.appointments.reduce(
        (previous, current) => {
          const aux: AppointmentDaysObject = previous;

          const entity = adaptEntity(current);

          if (aux[current.data]) {
            aux[current.data].items.push(entity);
            aux[current.data].total = minutesToTime(
              timeToMinutes(entity.total) +
                timeToMinutes(aux[current.data].total)
            );
          } else {
            aux[current.data] = { items: [entity], total: entity.total };
          }

          return { ...aux };
        },
        {}
      );

      const inArray: AppointmentDay[] = (<
        [string, { items: ReadAppointmentItem[]; total: string }][]
      >Object.entries(groupedByDate)).map(([date, { items, total }]) => ({
        date,
        items,
        total,
      }));

      const sortedByTimes: AppointmentDay[] = inArray.map((item) => {
        const aux = item;

        aux.items = item.items.sort((previous, current) => {
          const previousStartTime = previous.start;
          const currentStartTime = current.start;

          if (previousStartTime > currentStartTime) return 1;
          if (previousStartTime < currentStartTime) return -1;
          return 0;
        });

        return aux;
      });

      const sortedByDate = sortedByTimes.sort((previous, current) => {
        const previousDate = invertDate(previous.date);
        const currentDate = invertDate(current.date);

        if (previousDate > currentDate) return -1;
        if (previousDate < currentDate) return 1;
        return 0;
      });

      const appointmentsPromise = sortedByDate.map(async (appointmentDay) => {
        const aux = appointmentDay;

        const auxDate = new Date(aux.date.split('/').reverse().join('/'));
        const auxDateString = auxDate.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        aux.date = auxDateString[0].toUpperCase() + auxDateString.slice(1);

        const promise = aux.items.map(async (appointment) => {
          const client = await Manage.Client.show({
            field: 'id',
            value: appointment.client,
          });
          const project = await Manage.Project.show({
            field: 'id',
            value: appointment.project,
          });
          const category = await Manage.Category.show({
            field: 'id',
            value: appointment.category,
          });

          return {
            ...appointment,
            client: client!.title,
            project: project!.name,
            category: category!.name,
          } as ReadAppointmentItem;
        });

        aux.items = await Promise.all(promise);

        aux.total = `foram trabalhadas ${aux.total.replace(':', 'h')}m`;

        return aux;
      });

      setAppointments(await Promise.all(appointmentsPromise));
    } catch (e) {
      toast.error(
        (<AxiosError>e).response?.data.error ||
          'Falha ao carregar apontamentos!'
      );

      if ((<AxiosError>e).response?.status === 401) {
        dispatch(setCookies({ cookies: [] }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [cookies, dispatch, uid]);

  useEffect(() => {
    if (cookies) {
      void loadAppointments();
    }
  }, [cookies, loadAppointments]);

  return { isLoading, appointments };
};

export default useReadAppointmentsController;
