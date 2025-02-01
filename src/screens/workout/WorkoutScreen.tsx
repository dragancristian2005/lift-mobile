import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { KContainer } from '../../components';
import { useWorkoutInfo } from '../../hooks/api/useWorkoutInfo';
import KWorkoutInfo from '../../components/KWorkoutInfo';
import { WorkoutScreenProps } from '../../types/workout/workout.types';

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ route, navigation }) => {
  const { id, name, date, duration, totalWeight } = route.params;
  const { data, isPending, isError } = useWorkoutInfo(id);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredExercises = data?.workoutExercise.filter(
    (item: { exercise: { name: string } }) =>
      item.exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KContainer>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.workoutName}>{name}</Text>
        <View style={styles.workoutInfoContainer}>
          <Text style={styles.subtitle}>Workout Details: </Text>
          <View style={styles.workoutInfo}>
            <Text style={styles.info}>Date: {date}</Text>
            <Text style={styles.info}>Duration: {duration}</Text>
            <Text style={styles.info}>Total Weight: {totalWeight} kg</Text>
          </View>
        </View>
        <View style={styles.workoutExerciseContainer}>
          <Text style={styles.subtitle}>Exercises: </Text>
          <View
            style={{
              justifyContent: 'center',
              width: '95%',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search exercises..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.workoutExercise}>
            {isError ? (
              <Text>There was an error fetching workout info.</Text>
            ) : isPending ? (
              <Text>Loading...</Text>
            ) : (
              <FlatList
                data={filteredExercises}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ExerciseDetailsModal', {
                        name: item.exercise.name,
                      })
                    }
                    key={item.exercise.id}>
                    <KWorkoutInfo item={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.exercise.id}
                style={{ width: '95%' }}
                showsVerticalScrollIndicator={false}
                onScroll={() => Keyboard.dismiss()}
                scrollEventThrottle={16}
              />
            )}
          </View>
        </View>
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  workoutName: {
    fontSize: 32,
    marginBottom: 20,
  },
  workoutInfoContainer: {
    width: '95%',
    marginVertical: 20,
  },
  workoutInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 5,
  },
  subtitle: {
    fontSize: 26,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
  workoutExerciseContainer: {
    width: '95%',
    flex: 1,
  },
  workoutExercise: {
    paddingVertical: 10,
    gap: 5,
  },
  searchBar: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default WorkoutScreen;
