import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Dispatch, SetStateAction } from 'react';
import { AddedExercise, Exercise } from '../exercise/Exercise.types';
import { MainStackParamList } from './MainStack.types';

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
  ExerciseModal: {
    allExercises: Exercise[];
    navigation: NavigationProp<MainStackParamList>;
    workoutExercises: AddedExercise[];
    setWorkoutExercises: Dispatch<SetStateAction<AddedExercise[]>>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };
};

export type ExerciseDetailsModalProps = {
  route: RouteProp<WorkoutStackParamList, 'ExerciseDetailsModal'>;
};

export type ExerciseModalProps = {
  route: RouteProp<WorkoutStackParamList, 'ExerciseModal'>;
};
