import { NavigationProp } from '@react-navigation/native';
import { Dispatch, SetStateAction } from 'react';
import { AddedExercise, Exercise } from '../exercise/Exercise.types';

export type MainStackParamList = {
  Tabs: undefined;
  CreateWorkoutScreen: undefined;
  WorkoutScreen: {
    id: string;
    name: string;
    date: string;
    duration: string;
    totalWeight: number;
  };
  ExerciseDetailsModal: {
    name: string;
    image: string;
    difficulty: string;
    demonstrationGif: string;
    description: string;
    type: string;
  };
  ExercisesModal: {
    allExercises: Exercise[];
    navigation: NavigationProp<MainStackParamList>;
    workoutExercises: AddedExercise[];
    setWorkoutExercises: Dispatch<SetStateAction<AddedExercise[]>>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };
};
