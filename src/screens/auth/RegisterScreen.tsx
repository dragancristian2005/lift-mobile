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
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const RegisterScreen = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

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
        <Text style={[styles.registerTxt, { color: currentTheme.colors.text }]}>
          Let’s Get You Started!
        </Text>
        <View style={{ gap: 14, marginBottom: 25 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              { backgroundColor: currentTheme.colors.card },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              { backgroundColor: currentTheme.colors.card },
            ]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              { backgroundColor: currentTheme.colors.card },
            ]}
            secureTextEntry
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              { backgroundColor: currentTheme.colors.card },
            ]}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            styles.registerBtn,
            { backgroundColor: currentTheme.colors.primary },
          ]}
          onPress={createAccount}>
          <Text
            style={{
              fontSize: 16,
              color: currentTheme.colors.notification,
            }}>
            Register
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={{ fontSize: 14, color: currentTheme.colors.text }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={{ fontSize: 14, color: currentTheme.colors.primary }}>
              {' '}
              Log in here
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
