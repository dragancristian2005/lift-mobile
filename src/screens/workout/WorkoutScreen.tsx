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
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ route, navigation }) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const { id, name, date, duration, totalWeight } = route.params;
  const { data, isPending, isError } = useWorkoutInfo(id);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredExercises =
    data?.workoutExercise.filter((item: { exercise: { name: string } }) =>
      item.exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <KContainer>
      <View style={{ flex: 1, alignItems: 'center', marginBottom: 50 }}>
        <Text style={[styles.workoutName, { color: currentTheme.colors.text }]}>
          {name}
        </Text>
        <View style={styles.workoutInfoContainer}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Workout Details:{' '}
          </Text>
          <View style={styles.workoutInfo}>
            <Text style={[styles.info, { color: currentTheme.colors.border }]}>
              Date: {date}
            </Text>
            <Text style={[styles.info, { color: currentTheme.colors.border }]}>
              Duration: {duration}
            </Text>
            <Text style={[styles.info, { color: currentTheme.colors.border }]}>
              Total Weight: {totalWeight} kg
            </Text>
          </View>
        </View>
        <View style={styles.workoutExerciseContainer}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Exercises:{' '}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              width: '95%',
              alignItems: 'center',
            }}>
            <TextInput
              style={[
                styles.searchBar,
                { backgroundColor: currentTheme.colors.card },
              ]}
              placeholder="Search exercises..."
              placeholderTextColor={currentTheme.colors.text}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.workoutExercise}>
            {isError ? (
              <Text style={{ color: currentTheme.colors.text }}>
                There was an error fetching workout info.
              </Text>
            ) : isPending ? (
              <Text style={{ color: currentTheme.colors.text }}>
                Loading...
              </Text>
            ) : filteredExercises.length === 0 ? (
              <Text style={{ color: currentTheme.colors.text }}>
                No exercises found.
              </Text>
            ) : (
              <FlatList
                data={filteredExercises}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ExerciseDetailsModal', {
                        name: item.exercise.name,
                        image: item.exercise.image,
                        difficulty: item.exercise.difficulty,
                        demonstrationGif: item.exercise.demonstrationGif,
                        description: item.exercise.description,
                        type: item.exercise.type,
                      })
                    }>
                    <KWorkoutInfo item={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.exercise.id}
                style={{ width: '100%' }}
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
