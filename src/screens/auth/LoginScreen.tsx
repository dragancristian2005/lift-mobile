import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import { KContainer } from '../../components';
import { AuthStackParamList } from '../../types/navigation/AuthStack.types';
import { useAuth } from '../../contexts/auth/auth.context';
import { Logo } from '../../components/Logo';

const LoginScreen = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = () => {
    if (username && password) {
      axios
        .post<{ access_token: string }>('/auth/login', {
          username,
          password,
        })
        .then(({ data }) => {
          signIn(data.access_token);
        });
    } else {
      throw new Error('All fields must be filled!');
    }
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.loginTxt}>Let’s get you signed in!</Text>
        <View style={{ gap: 14, marginBottom: 25 }}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username: "
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password: "
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={logIn} style={styles.signInBtn}>
          <Text style={{ color: 'white', fontSize: 16 }}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={{ fontSize: 14 }}>Don&#39;t have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={{ fontSize: 14, color: '#2e1aa9' }}>
              {' '}
              Create one here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 275,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  loginTxt: {
    fontSize: 28,
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtn: {
    backgroundColor: '#520080',
    height: 40,
    width: 275,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default LoginScreen;
