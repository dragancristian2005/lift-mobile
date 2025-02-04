import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import cuid from 'cuid';
import { AddedExercise } from '../types/exercise/Exercise.types';

interface KAddedExercisesListProps {
  item: AddedExercise;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<AddedExercise[]>>;
}

const KAddedExercisesList = ({
  item,
  setWorkoutExercises,
}: KAddedExercisesListProps) => (
  <View style={styles.container}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    {item.sets.length === 0 ? (
      <Text>No sets</Text>
    ) : (
      <View style={{ gap: 2, marginVertical: 5 }}>
        {item.sets.map((set, index) => (
          <View
            style={[
              index % 2 !== 0
                ? { backgroundColor: 'rgba(255,255,255,0)' }
                : { backgroundColor: '#cccccc' },
              styles.setsContainer,
            ]}>
            <Text style={styles.setAndReps}>
              Set {index + 1}: {set.reps} x {set.weight}kg
            </Text>
          </View>
        ))}
      </View>
    )}
    <TouchableOpacity
      style={styles.addSet}
      onPress={() =>
        setWorkoutExercises(prev =>
          prev.map(exercise =>
            exercise.id === item.id
              ? {
                  ...exercise,
                  sets: [...exercise.sets, { id: cuid(), reps: 0, weight: 0 }],
                }
              : exercise
          )
        )
      }>
      <Text style={styles.addSetTxt}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
  },
  addSet: {
    backgroundColor: '#2e1aa9',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetTxt: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
  },
  setAndReps: {
    fontSize: 20,
  },
  setsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});

export default KAddedExercisesList;
