import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './MainStack.types';

export type ExerciseDetailsModalProps = {
  route: RouteProp<MainStackParamList, 'ExerciseDetailsModal'>;
};

export type ExerciseModalProps = {
  route: RouteProp<MainStackParamList, 'ExercisesModal'>;
};
