import { Text, View } from 'react-native';
import React from 'react';
import ExercisesList from '../../components/ExercisesList';
import { ExerciseModalProps } from '../../types/navigation/WorkoutStack.types';

const ExercisesModal: React.FC<ExerciseModalProps> = ({ route }) => {
  const {
    allExercises,
    navigation,
    workoutExercises,
    setWorkoutExercises,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = route.params;
  return (
    <View style={{ flex: 1, width: '100%', gap: 15, padding: 15 }}>
      <Text style={{ alignSelf: 'center', fontSize: 24 }}>Exercises:</Text>
      <ExercisesList
        allExercises={allExercises}
        navigation={navigation}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
        loadMoreWorkouts={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
};

export default ExercisesModal;
