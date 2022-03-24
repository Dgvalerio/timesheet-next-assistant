import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { ScrapperApi } from '@/services/scrapperApi';
import { setCookies } from '@/store/user/actions';
import { timeToNumber } from '@/utils';
import { useTheme } from '@mui/material';

import { AxiosError } from 'axios';
import { ChartData } from 'chart.js';
import { differenceInBusinessDays } from 'date-fns';
import { mix } from 'polished';

interface ControllerReturn {
  monthlyWorkload: number;
  monthlyWorkloadWorked: number;
  data: ChartData<any, any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  onLoading: DashboardLoad[];
  setOnLoading: Dispatch<SetStateAction<DashboardLoad[]>>;
}

export enum DashboardLoad {
  GetMonthHours = 'get_month_hours',
}

const calcMonthlyWorkload = (dailyWorkload: number): number => {
  const now = new Date();
  const [year, month] = now.toISOString().split('-');

  const diff = differenceInBusinessDays(
    new Date(+year, +month, 1),
    new Date(+year, +month - 1, 1)
  );

  return diff * dailyWorkload;
};

const convertDate = (date: Date) => {
  const [aux] = date.toISOString().split('T');
  const [year, month, day] = aux.split('-');

  return `${day}/${month}/${year}`;
};

const useDashboardController = (): ControllerReturn => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { uid, cookies } = useSelector((state) => state.user);
  const [dailyWorkload] = useState<number>(8);
  const [monthlyWorkload, setMonthlyWorkload] = useState<number>(
    calcMonthlyWorkload(dailyWorkload)
  );
  const [monthlyWorkloadWorked, setMonthlyWorkloadWorked] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(true);
  const [onLoading, setOnLoading] = useState<DashboardLoad[]>([]);

  const loadMonthHours = useCallback(async () => {
    if (!uid || cookies.length === 0) return;
    setOnLoading((prev) =>
      prev.includes(DashboardLoad.GetMonthHours)
        ? prev
        : prev.concat(DashboardLoad.GetMonthHours)
    );

    try {
      const now = new Date();
      const [year, month] = now.toISOString().split('-');

      const response = await ScrapperApi.readTimeInterval({
        cookies,
        startDate: convertDate(new Date(+year, +month - 1, 1)),
        endDate: convertDate(new Date(+year, +month, 1)),
      });

      setMonthlyWorkloadWorked(
        response.interval ? timeToNumber(response.interval) : 0
      );
    } catch (e) {
      toast.error(
        (<AxiosError>e).response?.data.error ||
          'Falha ao carregar a carga horária mensal!'
      );

      if ((<AxiosError>e).response?.status === 401) {
        await dispatch(setCookies({ cookies: [] }));
      }
    } finally {
      setOnLoading((prev) =>
        prev.filter((item) => item !== DashboardLoad.GetMonthHours)
      );
    }
  }, [cookies, dispatch, uid]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: ChartData<any, any, any> = {
    labels: ['Horas não trabalhadas', 'Horas trabalhadas'],
    datasets: [
      {
        label: 'Horas trabalhadas',
        data: [monthlyWorkload - monthlyWorkloadWorked, monthlyWorkloadWorked],
        backgroundColor: [
          mix(
            0.8,
            theme.palette.background.default,
            theme.palette.primary.dark
          ),
          theme.palette.primary.dark,
        ],
        borderColor: [
          mix(
            0.8,
            theme.palette.background.default,
            theme.palette.primary.dark
          ),
          theme.palette.primary.dark,
        ],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    setMonthlyWorkload(checked ? calcMonthlyWorkload(dailyWorkload) : 160);

    if (cookies) void loadMonthHours();
  }, [checked, cookies, dailyWorkload, loadMonthHours]);

  return {
    monthlyWorkload,
    monthlyWorkloadWorked,
    data,
    checked,
    setChecked,
    onLoading,
    setOnLoading,
  };
};

export default useDashboardController;
