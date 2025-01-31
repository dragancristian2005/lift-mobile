import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Dispatch, SetStateAction } from 'react';
import { MainStackParamList } from '../navigation/MainStack.types';

export interface Workout {
  id: string;
  name: string;
  date: string;
  finished: string;
  user_id: string;
  workoutExercise: {
    exercise: {
      name: string;
    };
    workoutExerciseSet: {
      reps: number;
      weight: number;
    }[];
  }[];
}

type WorkoutScreenRouteProp = RouteProp<
  { WorkoutScreen: { id: string; name: string } },
  'WorkoutScreen'
>;

export interface WorkoutScreenProps {
  route: WorkoutScreenRouteProp;
}

export interface KWorkoutPops {
  navigation: NavigationProp<MainStackParamList>;
  item: Workout;
}

export interface KWorkoutControlsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface Exercise {
  id: string;
  exerciseId: string;
  workoutId: string;
}

export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  workoutExerciseId: string;
}
