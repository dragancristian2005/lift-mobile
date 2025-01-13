import { Button, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { KContainer } from '../../components';
import { AuthStackParamList } from '../../types/navigation/AuthStack.types';

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  return (
    <KContainer>
      <Text>RegisterScreen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.replace('LoginScreen')}
      />
    </KContainer>
  );
};

export default RegisterScreen;
