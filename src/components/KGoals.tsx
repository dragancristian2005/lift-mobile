import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserInfo } from '../hooks/api/useUserInfo';
import { UserInfo } from '../types/user/UserInfo.types';
import { useSetUserInfo } from '../hooks/api/setUserInfo';
import { convertToNumeric, convertToString } from '../utility/userInfoUtils';
import KWeightGoals from './KWeightGoals';
import KBodyFatGoals from './KBodyFatGoals';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KGoals = () => {
  const { data, isPending, isError } = useUserInfo();
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const mutation = useSetUserInfo();
  const queryClient = useQueryClient();

  const [modifiedUserInfo, setModifiedUserInfo] = useState<UserInfo>({
    weight: '',
    bodyFat: '',
    goalWeight: '',
    goalBodyFat: '',
  });

  const [savedUserInfo, setSavedUserInfo] = useState<UserInfo>({
    weight: '',
    bodyFat: '',
    goalWeight: '',
    goalBodyFat: '',
  });

  const handleSave = async () => {
    const numericUserInfo = convertToNumeric(modifiedUserInfo);
    mutation.mutate(numericUserInfo, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user-info'] });
        setSavedUserInfo(modifiedUserInfo);
      },
    });
  };

  useEffect(() => {
    if (data) {
      const formattedData = convertToString(data);
      setModifiedUserInfo(formattedData);
      setSavedUserInfo(formattedData);
    }
  }, [data]);

  return isError ? (
    <Text>There was an error fetching goals data.</Text>
  ) : isPending ? (
    <ActivityIndicator color={currentTheme.colors.primary} />
  ) : (
    <View style={styles.container}>
      <KWeightGoals
        modifiedUserInfo={modifiedUserInfo}
        setModifiedUserInfo={setModifiedUserInfo}
        handleSave={handleSave}
        savedUserInfo={savedUserInfo}
      />
      <KBodyFatGoals
        modifiedUserInfo={modifiedUserInfo}
        setModifiedUserInfo={setModifiedUserInfo}
        handleSave={handleSave}
        savedUserInfo={savedUserInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 25,
  },
});

export default KGoals;
