import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { formatDuration, intervalToDuration } from 'date-fns';
import { KContainer } from '../../components';
import { CreateWorkoutScreenProps } from '../../types/workout/workout.types';
import { AddedExercise } from '../../types/exercise/Exercise.types';
import KAddedExercisesList from '../../components/KAddedExercisesList';
import { useSetCreateWorkout } from '../../hooks/api/setCreateWorkout';
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const CreateWorkoutScreen: React.FC<CreateWorkoutScreenProps> = ({
  navigation,
}) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const queryClient = useQueryClient();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<AddedExercise[]>([]);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const createWorkout = useSetCreateWorkout();

  useEffect(() => {
    const timer = setInterval(() => {
      setEndTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const workoutDuration = useMemo(() => {
    const duration = intervalToDuration({
      start: startTime,
      end: endTime,
    });

    return formatDuration(duration, {
      format: ['hours', 'minutes', 'seconds'],
    });
  }, [endTime, startTime]);

  const handleCreate = async () => {
    if (!workoutName.trim()) {
      alert('You must give your workout a name!');
      return;
    }
    if (workoutExercises.length === 0) {
      alert('You must add exercises to your workout!');
      return;
    }

    await createWorkout.mutateAsync({
      workoutName,
      workoutExercises,
      startTime,
      endTime,
    });
    await queryClient.invalidateQueries({ queryKey: ['weekly-progress'] });
    await queryClient.invalidateQueries({ queryKey: ['week-streak'] });
    await queryClient.invalidateQueries({ queryKey: ['latest-workout'] });
    navigation.goBack();
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          New Workout
        </Text>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 20, color: currentTheme.colors.text }}>
            Workout Name:{' '}
          </Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name..."
            placeholderTextColor={currentTheme.colors.text}
            style={styles.nameInput}
          />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.createBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}
            onPress={handleCreate}>
            <Text
              style={[
                styles.createBtnTxt,
                { color: currentTheme.colors.notification },
              ]}>
              Finish Workout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.clearBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}
            onPress={() => setWorkoutExercises([])}>
            <Text
              style={[
                styles.clearBtnTxt,
                { color: currentTheme.colors.notification },
              ]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, color: currentTheme.colors.text }}>
          Duration: {workoutDuration}
        </Text>
        <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
          Workout Exercises:{' '}
        </Text>
        <View style={{ width: '100%', gap: 15 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ExercisesModal', {
                workoutExercises,
                setWorkoutExercises,
              })
            }
            style={[
              styles.addExerciseBtn,
              { backgroundColor: currentTheme.colors.card },
            ]}>
            <View
              style={[
                styles.addExerciseTxtContainer,
                { backgroundColor: currentTheme.colors.background },
              ]}>
              <Text
                style={[
                  styles.addExerciseTxt,
                  { color: currentTheme.colors.primary },
                ]}>
                +
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: currentTheme.colors.text }}>
              Add Exercise
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', maxHeight: '60%' }}>
          {workoutExercises.length === 0 ? (
            <Text style={{ color: currentTheme.colors.text }}>
              There are no exercises in your workout.
            </Text>
          ) : (
            <FlatList
              data={workoutExercises}
              renderItem={({ item }) => (
                <KAddedExercisesList
                  item={item}
                  setWorkoutExercises={setWorkoutExercises}
                />
              )}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  nameInput: {
    height: 30,
    padding: 5,
    fontSize: 20,
  },
  subtitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  controls: {
    flexDirection: 'row',
    width: '95%',
    height: 30,
    gap: 5,
    justifyContent: 'center',
  },
  clearBtn: {
    width: '20%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnTxt: {
    fontWeight: '500',
  },
  createBtn: {
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnTxt: {
    fontWeight: '500',
  },
  addExerciseBtn: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  addExerciseTxtContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExerciseTxt: {
    fontSize: 40,
    lineHeight: 42,
  },
});

export default CreateWorkoutScreen;
