import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getWorkoutInfo = (workoutId: string) =>
  axios.get(`/workouts/${workoutId}`).then(res => res.data);

export const useWorkoutInfo = (workoutId: string) =>
  useQuery({
    queryKey: ['workout-info', workoutId],
    queryFn: () => getWorkoutInfo(workoutId),
  });
