import { UserInfo } from '../types/user/UserInfo.types';

export const convertToNumeric = (userInfo: UserInfo) => ({
  weight: userInfo.weight === '' ? undefined : Number(userInfo.weight),
  bodyFat: userInfo.bodyFat === '' ? undefined : Number(userInfo.bodyFat),
  goalWeight:
    userInfo.goalWeight === '' ? undefined : Number(userInfo.goalWeight),
  goalBodyFat:
    userInfo.goalBodyFat === '' ? undefined : Number(userInfo.goalBodyFat),
});

export const convertToString = (data: Partial<UserInfo>) => ({
  weight: data.weight?.toString() ?? '',
  bodyFat: data.bodyFat?.toString() ?? '',
  goalWeight: data.goalWeight?.toString() ?? '',
  goalBodyFat: data.goalBodyFat?.toString() ?? '',
});
