import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getLatestWorkout = () =>
  axios.get('workouts/latest-workout').then(res => res.data);

export const useLatestWorkout = () =>
  useQuery({
    queryKey: ['latest-workout'],
    queryFn: getLatestWorkout,
  });
