import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getWeeklyProgress = () =>
  axios
    .get<Record<string, 0 | 1 | 2>>(`/workouts/weekly-progress`)
    .then(res => res.data);

export const useWeeklyProgress = () =>
  useQuery({
    queryKey: ['weekly-progress'],
    queryFn: getWeeklyProgress,
  });
