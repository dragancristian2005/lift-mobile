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
};
