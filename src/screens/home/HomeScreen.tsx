import { Button, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KContainer } from '../../components';
import { RootStackParamList } from '../navigation/types';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <KContainer>
      <Text>HomeScreen</Text>
      <Button
        title="Create Workout"
        onPress={() => navigation.navigate('CreateWorkoutScreen')}
      />
      <Button
        title="Chest Workout"
        onPress={() => navigation.navigate('WorkoutScreen', { id: 'abc' })}
      />
    </KContainer>
  );
};

export default HomeScreen;
