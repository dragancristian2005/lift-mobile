import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';
import ExercisesList from '../../components/ExercisesList';
import { ExerciseModalProps } from '../../types/navigation/WorkoutStack.types';
import { useExercises } from '../../hooks/api/useExercises';

const ExercisesModal: React.FC<ExerciseModalProps> = ({ route }) => {
  const { workoutExercises, setWorkoutExercises } = route.params;

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useExercises();
  const allExercises = data?.pages.flatMap(page => page) || [];

  return (
    <View style={{ flex: 1, width: '100%', gap: 15, padding: 15 }}>
      <Text style={{ alignSelf: 'center', fontSize: 24 }}>Exercises:</Text>
      {isError ? (
        <Text>There was an error fetching the exercises.</Text>
      ) : isPending ? (
        <ActivityIndicator />
      ) : (
        <ExercisesList
          allExercises={allExercises}
          workoutExercises={workoutExercises}
          setWorkoutExercises={setWorkoutExercises}
          loadMoreWorkouts={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </View>
  );
};

export default ExercisesModal;
