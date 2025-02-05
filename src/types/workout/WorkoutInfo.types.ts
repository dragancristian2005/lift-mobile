import { AddedExercise } from '../exercise/Exercise.types';

export type WorkoutInfo = {
  item: {
    exercise: {
      id: string;
      name: string;
      image: string;
      difficulty: string;
      demonstrationGif: string;
      description: string;
      type: string;
    };
    workoutExerciseSet: {
      reps: number;
      weight: number;
    }[];
  };
};

export type CreateWorkout = {
  workoutName: string;
  workoutExercises: AddedExercise[];
};
