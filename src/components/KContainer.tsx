import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

export interface KContainerProps {
  children: React.ReactNode;
}

const KContainer = ({ children }: KContainerProps) => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();

  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: currentTheme.colors.background,
      }}>
      {children}
    </SafeAreaView>
  );
};

export default KContainer;
