import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';
import ExercisesList from '../../components/ExercisesList';
import { ExerciseModalProps } from '../../types/navigation/WorkoutStack.types';
import { useExercises } from '../../hooks/api/useExercises';
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const ExercisesModal: React.FC<ExerciseModalProps> = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

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
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          color: currentTheme.colors.text,
        }}>
        Exercises:
      </Text>
      {isError ? (
        <Text style={{ color: currentTheme.colors.text }}>
          There was an error fetching the exercises.
        </Text>
      ) : isPending ? (
        <ActivityIndicator color={currentTheme.colors.primary} />
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
