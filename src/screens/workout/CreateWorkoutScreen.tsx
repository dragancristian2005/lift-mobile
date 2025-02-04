import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { KContainer } from '../../components';
import { useExercises } from '../../hooks/api/useExercises';
import { CreateWorkoutScreenProps } from '../../types/workout/workout.types';
import ExercisesList from '../../components/ExercisesList';

const CreateWorkoutScreen: React.FC<CreateWorkoutScreenProps> = ({
  navigation,
}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<string[]>([]);

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useExercises();
  const allExercises = data?.pages.flatMap(page => page) || [];

  const loadMoreWorkouts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Create Workout</Text>
        <Text style={styles.subtitle}>Workout Details: </Text>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 18, color: '#444' }}>Workout Name: </Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name..."
            style={styles.nameInput}
          />
        </View>
        <Text style={styles.subtitle}>Workout Exercises: </Text>
        {workoutExercises.length === 0 ? (
          <Text>There are no exercises in your workout.</Text>
        ) : (
          <FlatList
            data={workoutExercises}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={item => item}
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
          />
        )}
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
            loadMoreWorkouts={loadMoreWorkouts}
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
    gap: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  nameInput: {
    borderRadius: 8,
    height: 30,
    padding: 5,
    width: '55%',
  },
  subtitle: {
    alignSelf: 'flex-start',
    fontSize: 22,
  },
});

export default CreateWorkoutScreen;
