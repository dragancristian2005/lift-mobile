// import { NavigationContainer } from '@react-navigation/native';
// import { useMemo, useState } from 'react';
// import { AuthStack } from './auth/AuthStack';
// import { MainStack } from './main/MainStack';
// import { useAuth } from '../contexts/auth/auth.context';
// import DarkTheme from '../theme/DarkTheme';
// import LightTheme from '../theme/LightTheme';
// import { ThemeContext } from '../contexts/theme/theme.context';
//
// const Navigation = () => {
//   const { loggedIn } = useAuth();
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//
//   const themeContextValue = useMemo(
//     () => ({ isDarkTheme, setIsDarkTheme }),
//     [isDarkTheme]
//   );
//
//   return (
//     <ThemeContext.Provider value={themeContextValue}>
//       <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
//         {loggedIn ? <MainStack /> : <AuthStack />}
//       </NavigationContainer>
//     </ThemeContext.Provider>
//   );
// };
//
// export default Navigation;
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStack } from './auth/AuthStack';
import { MainStack } from './main/MainStack';
import { useAuth } from '../contexts/auth/auth.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';
import { ThemeContext } from '../contexts/theme/theme.context';

const THEME_STORAGE_KEY = 'themePreference';

const Navigation = () => {
  const { loggedIn } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme !== null) {
          setIsDarkTheme(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme ? 'dark' : 'light'
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDarkTheme]);

  const themeContextValue = useMemo(
    () => ({ isDarkTheme, setIsDarkTheme: toggleTheme }),
    [isDarkTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
        {loggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default Navigation;
