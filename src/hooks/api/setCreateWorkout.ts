import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkout } from '../../types/workout/WorkoutInfo.types';

const setCreateWorkout = async (workoutInfo: CreateWorkout) =>
  axios.post('/workouts/create-workout', workoutInfo);

export const useSetCreateWorkout = () =>
  useMutation({
    mutationFn: setCreateWorkout,
  });
