import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateWorkoutScreen, WorkoutScreen } from '../../screens';
import { Tabs } from '../tabs/Tabs';
import { MainStackParamList } from '../../types/navigation/MainStack.types';
import ExerciseDetailsModal from '../../screens/workout/ExerciseDetailsModal';
import ExercisesModal from '../../screens/workout/ExercisesModal';

const AppStackNavigator = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <AppStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <AppStackNavigator.Screen name="Tabs" component={Tabs} />
    <AppStackNavigator.Screen name="WorkoutScreen" component={WorkoutScreen} />
    <AppStackNavigator.Screen
      name="CreateWorkoutScreen"
      component={CreateWorkoutScreen}
    />
    <AppStackNavigator.Screen
      name="ExerciseDetailsModal"
      component={ExerciseDetailsModal}
      options={{ presentation: 'modal', title: 'Exercise Details' }}
    />
    <AppStackNavigator.Screen
      name="ExercisesModal"
      component={ExercisesModal}
      options={{ presentation: 'modal', title: 'Exercises' }}
    />
  </AppStackNavigator.Navigator>
);
