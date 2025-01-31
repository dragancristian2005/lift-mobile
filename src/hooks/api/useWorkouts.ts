import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const getWorkouts = ({ pageParam }: { pageParam: number }) =>
  axios
    .get(`/workouts/user-workouts?limit=5&page=${pageParam}`)
    .then(res => res.data);

export const useWorkouts = () =>
  useInfiniteQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (_lastPage < 6) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
