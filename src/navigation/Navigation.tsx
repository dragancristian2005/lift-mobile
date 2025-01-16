import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './auth/AuthStack';
import { MainStack } from './main/MainStack';
import { useAuth } from '../contexts/auth/auth.context';

const Navigation = () => {
  const { loggedIn } = useAuth();

  return (
    <NavigationContainer>
      {loggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
