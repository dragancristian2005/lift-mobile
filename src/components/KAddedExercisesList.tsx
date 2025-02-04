import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
            key={set.id}
            style={[
              index % 2 !== 0
                ? { backgroundColor: 'rgba(255,255,255,0)' }
                : { backgroundColor: '#cccccc' },
              styles.setsContainer,
            ]}>
            <Text style={styles.sets}>Set {index + 1}:</Text>
            <View style={{ alignItems: 'center' }}>
              <Text>Reps:</Text>
              <TextInput
                value={set.reps.toString()}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={text => {
                  const updatedReps = Number(text) || 0;
                  setWorkoutExercises(prev =>
                    prev.map(exercise =>
                      exercise.id === item.id
                        ? {
                            ...exercise,
                            sets: exercise.sets.map(s =>
                              s.id === set.id ? { ...s, reps: updatedReps } : s
                            ),
                          }
                        : exercise
                    )
                  );
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>Weight:</Text>
              <TextInput
                value={set.weight.toString()}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={text => {
                  const updatedReps = Number(text) || 0;
                  setWorkoutExercises(prev =>
                    prev.map(exercise =>
                      exercise.id === item.id
                        ? {
                            ...exercise,
                            sets: exercise.sets.map(s =>
                              s.id === set.id
                                ? { ...s, weight: updatedReps }
                                : s
                            ),
                          }
                        : exercise
                    )
                  );
                }}
              />
            </View>
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
  sets: {
    fontSize: 20,
  },
  setsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default KAddedExercisesList;
