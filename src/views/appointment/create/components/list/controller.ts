import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CategoryRepository } from '@/services/firestore/Category/Repository';
import { ClientRepository } from '@/services/firestore/Client/Repository';
import { ProjectRepository } from '@/services/firestore/Project/Repository';
import { ScrapperApi } from '@/services/scrapperApi';
import { setCookies } from '@/store/user/actions';
import { invertDate, minutesToTime, timeToMinutes } from '@/utils';
import { CreateAppointmentLoad } from '@/views/appointment/create/controller';
import {
  AppointmentDay,
  ReadAppointmentItem,
  AppointmentDaysObject,
  adaptEntity,
} from '@/views/appointment/read/controller';

import { AxiosError } from 'axios';

interface ControllerParams {
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
  appointmentsLoaded: () => void;
  loadingAppointments: number;
}

interface ControllerReturn {
  appointmentDay: AppointmentDay;
  dayDate: string;
  setDayDate: Dispatch<SetStateAction<string>>;
  worked: string;
  toWork: string;
}

export type Controller = (params: ControllerParams) => ControllerReturn;

const Manage = {
  Client: new ClientRepository(),
  Project: new ProjectRepository(),
  Category: new CategoryRepository(),
};

const voidDay = (actualDate: string) => {
  const aux = {
    date: '',
    items: [],
    total: '00:00',
  };

  const auxDate = new Date(actualDate.replace('-', '/'));
  const auxDateString = auxDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  aux.date = auxDateString[0].toUpperCase() + auxDateString.slice(1);

  return aux;
};

const useAppointmentsListController: Controller = ({
  setOnLoading,
  appointmentsLoaded,
  loadingAppointments,
}) => {
  const dispatch = useDispatch();
  const { uid, cookies } = useSelector((state) => state.user);
  const [dayDate, setDayDate] = useState(
    (() => {
      const date = new Date();

      return date.toISOString().split('T')[0];
    })()
  );
  const [hoursNeeded] = useState('08:00');
  const [worked, setWorked] = useState('');
  const [toWork, setToWork] = useState(`Faltam ${hoursNeeded}`);
  const [appointmentDay, setAppointmentDay] = useState<AppointmentDay>(
    voidDay(dayDate)
  );

  const loadAppointments = useCallback(async () => {
    if (!uid) return;

    setOnLoading((prev) =>
      prev.includes(CreateAppointmentLoad.Appointments)
        ? prev
        : prev.concat(CreateAppointmentLoad.Appointments)
    );

    try {
      const response = await ScrapperApi.readAppointments({
        cookies,
        date: dayDate.split('-').reverse().join('/'),
      });

      if (!response.appointments) {
        setAppointmentDay(voidDay(dayDate));

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

        return aux;
      });

      const [resultDay] = await Promise.all(appointmentsPromise);

      if (resultDay) {
        const sumWorked =
          timeToMinutes(hoursNeeded) - timeToMinutes(resultDay.total);

        setAppointmentDay(resultDay);
        setToWork(
          sumWorked > 0
            ? `Faltam ${minutesToTime(sumWorked)}`
            : `${minutesToTime(Math.abs(sumWorked))} extras`
        );
        setWorked(`${resultDay.total} trabalhadas`);
      } else {
        setToWork(`Faltam ${hoursNeeded}`);
        setWorked('00:00 trabalhadas');
        setAppointmentDay(voidDay(dayDate));
      }
    } catch (e) {
      toast.error(
        (<AxiosError>e).response?.data.error ||
          'Falha ao carregar apontamentos!'
      );

      if ((<AxiosError>e).response?.status === 401) {
        await dispatch(setCookies({ cookies: [] }));
      }
    } finally {
      setOnLoading((prev) =>
        prev.filter((item) => item !== CreateAppointmentLoad.Appointments)
      );
    }
  }, [uid, setOnLoading, cookies, dayDate, hoursNeeded, dispatch]);

  useEffect(() => {
    if (cookies) {
      void loadAppointments();
    }
  }, [cookies, loadAppointments]);

  useEffect(() => {
    if (loadingAppointments <= 0) return;

    console.log('Update load appointments');
    void loadAppointments().finally(() => appointmentsLoaded());
  }, [appointmentsLoaded, loadAppointments, loadingAppointments]);

  return { appointmentDay, dayDate, setDayDate, worked, toWork };
};

export default useAppointmentsListController;
