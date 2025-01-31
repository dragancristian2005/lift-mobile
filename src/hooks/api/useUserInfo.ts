import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getUserInfo = async () =>
  axios.get('/auth/profile').then(res => res.data);

export const useUserInfo = () =>
  useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  });
