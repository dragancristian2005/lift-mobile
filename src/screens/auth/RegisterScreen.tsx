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
import { Logo } from '../../components/Logo';
import { useAuth } from '../../contexts/auth/auth.context';

const RegisterScreen = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createAccount = () => {
    if (!email || !username || !password || !confirmPassword) {
      throw new Error('All fields must be filled!');
    } else if (password === confirmPassword) {
      axios
        .post<{ access_token: string }>('/auth/register', {
          email,
          username,
          password,
        })
        .then(({ data }) => {
          signIn(data.access_token);
        });
    } else {
      throw new Error('Passwords do not match!');
    }
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.registerTxt}>Let’s Get You Started!</Text>
        <View style={{ gap: 14, marginBottom: 25 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email: "
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
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
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password: "
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={createAccount}>
          <Text style={{ color: 'white', fontSize: 16 }}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={{ fontSize: 14 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={{ fontSize: 14, color: '#2e1aa9' }}> Log in here</Text>
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
  registerTxt: {
    fontSize: 28,
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  registerBtn: {
    backgroundColor: '#520080',
    height: 40,
    width: 275,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
