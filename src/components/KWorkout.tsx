import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format, formatDuration, intervalToDuration } from 'date-fns';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { KWorkoutPops } from '../types/workout/workout.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';
import { useDeleteWorkout } from '../hooks/api/useDeleteWorkout';

const KWorkout = ({ navigation, item }: KWorkoutPops) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const formattedDate = format(new Date(item.date), 'EEEE, dd MMM yyyy');

  const exerciseInfo = useMemo(
    () =>
      item.workoutExercise.reduce((acc: Record<string, string[]>, exercise) => {
        acc[exercise.exercise.name] = exercise.workoutExerciseSet.map(
          set => `${String(set.reps)}x${String(set.weight)}kg`
        );
        return acc;
      }, {}),
    [item.workoutExercise]
  );

  const totalWeight = useMemo(
    () =>
      item.workoutExercise.reduce(
        (acc, exercise) =>
          acc +
          exercise.workoutExerciseSet.reduce(
            (setAcc, set) => setAcc + set.reps * set.weight,
            0
          ),
        0
      ),
    [item.workoutExercise]
  );

  const workoutDuration = useMemo(() => {
    const duration = intervalToDuration({
      start: item.date,
      end: item.finished,
    });
    return formatDuration(duration, {
      format: ['hours', 'minutes'],
    });
  }, [item.date, item.finished]);

  const deleteWorkoutMutation = useDeleteWorkout();
  const queryClient = useQueryClient();

  const handleDelete = (workoutId: string) => {
    deleteWorkoutMutation.mutate(workoutId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['weekly-progress'],
        });
        queryClient.invalidateQueries({ queryKey: ['week-streak'] });
        queryClient.invalidateQueries({ queryKey: ['latest-workout'] });
        queryClient.invalidateQueries({ queryKey: ['workouts'] });
      },
      onError: error => {
        console.error('Failed to delete workout:', error);
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.workoutBtn,
          { backgroundColor: currentTheme.colors.card },
        ]}
        onPress={() =>
          navigation.navigate('WorkoutScreen', {
            id: item.id,
            name: item.name,
            date: formattedDate,
            duration: workoutDuration,
            totalWeight: totalWeight.toString(),
          })
        }>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[styles.workoutName, { color: currentTheme.colors.text }]}>
            {item.name}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'tomato',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingHorizontal: 5,
            }}
            onPress={() => handleDelete(item.id)}>
            <Text style={{ color: '#fff' }}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: currentTheme.colors.text }}>{formattedDate}</Text>
        <View style={styles.workoutInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={styles.workoutDetails}>
              <Feather
                name="clock"
                size={12}
                color={currentTheme.colors.text}
              />
              <Text style={{ color: currentTheme.colors.text }}>
                {workoutDuration}
              </Text>
            </View>
            <View style={styles.workoutDetails}>
              <MaterialCommunityIcons
                name="weight"
                size={12}
                color={currentTheme.colors.text}
              />
              <Text style={{ color: currentTheme.colors.text }}>
                {totalWeight}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 15 }}>
            <Text style={{ fontSize: 16, color: currentTheme.colors.text }}>
              Exercises:
            </Text>
            {Object.keys(exerciseInfo).map(exercise => (
              <View
                key={exercise}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 5,
                }}>
                <Text style={{ color: '#777' }}>
                  {exerciseInfo[exercise].length} x {exercise}:{' '}
                </Text>
                <Text style={{ color: '#777' }}>
                  {exerciseInfo[exercise].join(', ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  workoutBtn: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 5,
    padding: 20,
    gap: 5,
  },
  workoutName: {
    fontSize: 23,
  },
  workoutInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
    gap: 20,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default KWorkout;
