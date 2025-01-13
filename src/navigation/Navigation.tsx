import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './auth/AuthStack';
import { MainStack } from './main/MainStack';

const Navigation = () => {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <NavigationContainer>
      {isLogged ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
