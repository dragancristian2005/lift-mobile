import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkout } from '../../types/workout/WorkoutInfo.types';

const setCreateWorkout = async (workoutInfo: CreateWorkout) =>
  axios.post('/workouts/create-workout', workoutInfo).then(res => res.data);

export const useSetCreateWorkout = () =>
  useMutation({
    mutationFn: setCreateWorkout,
  });
