import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const getExercises = ({ pageParam }: { pageParam: number }) =>
  axios.get(`/exercises?page=${pageParam}&limit=5`).then(res => res.data);

export const useExercises = () =>
  useInfiniteQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 6) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
