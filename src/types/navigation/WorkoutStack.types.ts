import { RouteProp } from '@react-navigation/native';

type WorkoutStackParamList = {
  WorkoutMain: undefined;
  ExerciseDetailsModal: {
    name: string;
    image: string;
    difficulty: string;
    demonstrationGif: string;
    description: string;
    type: string;
  };
};

export type ExerciseDetailsModalProps = {
  route: RouteProp<WorkoutStackParamList, 'ExerciseDetailsModal'>;
};
