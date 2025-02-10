import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const deleteWorkout = async (workoutId: string) =>
  axios.delete(`/workouts/delete-workout/${workoutId}`);

export const useDeleteWorkout = () =>
  useMutation({
    mutationFn: deleteWorkout,
  });
