import { Button, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KContainer } from '../../components';
import { RootStackParamList } from '../home/HomeScreen';

const LiftScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <KContainer>
      <Text>LiftScreen</Text>
      <Button
        title="Chest Workout"
        onPress={() => navigation.navigate('WorkoutScreen')}
      />
    </KContainer>
  );
};

export default LiftScreen;
