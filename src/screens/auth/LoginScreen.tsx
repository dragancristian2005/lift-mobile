import { Button, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { KContainer } from '../../components';
import { AuthStackParamList } from '../../types/navigation/AuthStack.types';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  return (
    <KContainer>
      <Text>Login Screen</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.replace('RegisterScreen')}
      />
    </KContainer>
  );
};

export default LoginScreen;
