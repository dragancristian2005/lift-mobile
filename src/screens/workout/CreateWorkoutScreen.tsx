import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { KContainer } from '../../components';
import { useExercises } from '../../hooks/api/useExercises';
import KExercise from '../../components/KExercise';
import { CreateWorkoutScreenProps } from '../../types/workout/workout.types';

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
            style={{ width: '100%', height: '50%' }}
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
          <FlatList
            data={allExercises}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ExerciseDetailsModal', {
                    name: item.name,
                    image: item.image,
                    difficulty: item.difficulty,
                    demonstrationGif: item.demonstrationGif,
                    description: item.description,
                    type: item.type,
                  })
                }>
                <KExercise
                  item={item}
                  workoutExercises={workoutExercises}
                  setWorkoutExercises={setWorkoutExercises}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreWorkouts}
            onEndReachedThreshold={0.5}
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
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  subtitle: {
    alignSelf: 'flex-start',
    fontSize: 22,
  },
});

export default CreateWorkoutScreen;
