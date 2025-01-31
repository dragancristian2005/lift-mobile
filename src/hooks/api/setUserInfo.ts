import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { NumericUserInfo } from '../../types/user/UserInfo.types';

const setUserInfo = async (userInfo: NumericUserInfo) =>
  axios.post('users/user-info', userInfo);

export const useSetUserInfo = () =>
  useMutation({
    mutationFn: setUserInfo,
  });
