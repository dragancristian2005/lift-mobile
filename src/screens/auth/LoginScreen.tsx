import { Button, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import { KContainer } from '../../components';
import { AuthStackParamList } from '../../types/navigation/AuthStack.types';
import { useAuth } from '../../contexts/auth/auth.context';

const LoginScreen = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const logIn = () => {
    axios
      .post<{ access_token: string }>('/auth/login', {
        username: 'cristi',
        password: 'password123',
      })
      .then(({ data }) => {
        signIn(data.access_token);
      });
  };

  return (
    <KContainer>
      <Text>Login Screen</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.replace('RegisterScreen')}
      />
      {/* TextInput user */}
      {/* TextInput pass */}
      <Button title="Sign in" onPress={logIn} />
    </KContainer>
  );
};

export default LoginScreen;
