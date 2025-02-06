import React from 'react';
import { AddedExercise } from '../exercise/Exercise.types';

export type MainStackParamList = {
  Tabs: undefined;
  WorkoutScreen: {
    id: string;
    name: string;
    date: string;
    duration: string;
    totalWeight: string;
  };
  CreateWorkoutScreen: undefined;
  ExerciseDetailsModal: {
    name: string;
    image: string;
    difficulty: string;
    demonstrationGif: string;
    description: string;
    type: string;
  };
  ExercisesModal: {
    workoutExercises: AddedExercise[];
    setWorkoutExercises: React.Dispatch<React.SetStateAction<AddedExercise[]>>;
  };
};
