import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <AuthStackNavigator.Navigator
    screenOptions={{ headerShown: false, animation: 'none' }}>
    <AuthStackNavigator.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStackNavigator.Screen
      name="RegisterScreen"
      component={RegisterScreen}
    />
  </AuthStackNavigator.Navigator>
);
