import {
  Alert,
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
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const LoginScreen = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

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
      Alert.alert('All fields must be filled!');
    }
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Logo />
        <Text style={[styles.loginTxt, { color: currentTheme.colors.text }]}>
          Let’s get you signed in!
        </Text>
        <View style={{ gap: 14, marginBottom: 25 }}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.colors.card,
                color: currentTheme.colors.text,
              },
            ]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password: "
            placeholderTextColor={currentTheme.colors.border}
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.colors.card,
                color: currentTheme.colors.text,
              },
            ]}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={logIn}
          style={[
            styles.signInBtn,
            { backgroundColor: currentTheme.colors.primary },
          ]}>
          <Text
            style={{
              fontSize: 16,
              color: currentTheme.colors.notification,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={{ fontSize: 14, color: currentTheme.colors.text }}>
            Don&#39;t have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={{ fontSize: 14, color: currentTheme.colors.primary }}>
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
    height: 40,
    width: 275,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default LoginScreen;
