import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const clearWorkouts = () => axios.delete('workouts/clear-workouts');

export const useClearWorkouts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearWorkouts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weekly-progress'] });
      queryClient.invalidateQueries({ queryKey: ['week-streak'] });
      queryClient.invalidateQueries({ queryKey: ['latest-workout'] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
    onError: (error: any) => {
      console.error('Failed to clear workouts:', error);
    },
  });
};
