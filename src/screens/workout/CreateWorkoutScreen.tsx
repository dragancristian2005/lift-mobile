import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import { useExercises } from '../../hooks/api/useExercises';
import { CreateWorkoutScreenProps } from '../../types/workout/workout.types';
import ExercisesList from '../../components/ExercisesList';
import { AddedExercise } from '../../types/exercise/Exercise.types';
import KAddedExercisesList from '../../components/KAddedExercisesList';
import { useSetCreateWorkout } from '../../hooks/api/setCreateWorkout';

const CreateWorkoutScreen: React.FC<CreateWorkoutScreenProps> = ({
  navigation,
}) => {
  const queryClient = useQueryClient();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<AddedExercise[]>([]);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useExercises();
  const allExercises = data?.pages.flatMap(page => page) || [];
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
    navigation.goBack();
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={styles.title}>New Workout</Text>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 20, color: '#444' }}>Workout Name: </Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name..."
            style={styles.nameInput}
          />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createBtnTxt}>Finish Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setWorkoutExercises([])}>
            <Text style={styles.clearBtnTxt}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, color: '#444' }}>
          Duration: {workoutDuration}
        </Text>
        <Text style={styles.subtitle}>Workout Exercises: </Text>
        <View style={{ width: '100%', maxHeight: '23%' }}>
          {workoutExercises.length === 0 ? (
            <Text>There are no exercises in your workout.</Text>
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
        <Text style={styles.subtitle}>Exercises:</Text>
        {isError ? (
          <Text>There was an error fetching the exercises.</Text>
        ) : isPending ? (
          <ActivityIndicator color="#2e1aa9" size="large" />
        ) : allExercises.length === 0 ? (
          <Text>No exercises available.</Text>
        ) : (
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
        )}
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
    backgroundColor: '#2e1aa9',
    width: '20%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnTxt: {
    color: '#fff',
    fontWeight: '500',
  },
  createBtn: {
    backgroundColor: '#2e1aa9',
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnTxt: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default CreateWorkoutScreen;
