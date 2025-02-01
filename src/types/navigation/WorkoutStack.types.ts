import { RouteProp } from '@react-navigation/native';

type WorkoutStackParamList = {
  WorkoutMain: undefined;
  ExerciseDetailsModal: { name: string };
};

export type ExerciseDetailsModalProps = {
  route: RouteProp<WorkoutStackParamList, 'ExerciseDetailsModal'>;
};
