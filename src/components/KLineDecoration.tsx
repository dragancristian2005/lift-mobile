import { View } from 'react-native';
import React from 'react';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KLineDecoration = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <View
      style={{
        width: '100%',
        height: 2,
        backgroundColor: currentTheme.colors.primary,
      }}
    />
  );
};

export default KLineDecoration;
