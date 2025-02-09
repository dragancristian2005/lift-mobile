import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getWeekStreak = () =>
  axios.get('/workouts/week-streak').then(res => res.data);

export const useWeekStreak = () =>
  useQuery({
    queryKey: ['week-streak'],
    queryFn: getWeekStreak,
  });
