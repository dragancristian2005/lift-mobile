import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import cuid from 'cuid';
import { AddedExercise } from '../types/exercise/Exercise.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

interface KAddedExercisesListProps {
  item: AddedExercise;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<AddedExercise[]>>;
}

const KAddedExercisesList = ({
  item,
  setWorkoutExercises,
}: KAddedExercisesListProps) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const [setColors, setSetColors] = useState<Record<string, string>>({});

  const toggleColor = (setId: string, index: number) => {
    const lightGreen = '#b7d0b8';
    const darkGreen = '#468355';

    setSetColors(prevColors => ({
      ...prevColors,
      [setId]:
        prevColors[setId] === (isDarkTheme ? darkGreen : lightGreen)
          ? index % 2 === 0
            ? currentTheme.colors.card
            : 'rgba(255, 255, 255, 0)'
          : isDarkTheme
            ? darkGreen
            : lightGreen,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.exerciseName, { color: currentTheme.colors.text }]}>
        {item.name}
      </Text>
      {item.sets.length === 0 ? (
        <Text style={{ color: currentTheme.colors.text }}>No sets</Text>
      ) : (
        <View style={{ gap: 2, marginVertical: 5 }}>
          {item.sets.map((set, index) => (
            <View
              key={set.id}
              style={[
                {
                  backgroundColor:
                    setColors[set.id] ||
                    (index % 2 === 0
                      ? currentTheme.colors.card
                      : 'rgba(255, 255, 255, 0)'),
                },
                styles.setsContainer,
              ]}>
              <Text style={[styles.sets, { color: currentTheme.colors.text }]}>
                Set {index + 1}:
              </Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: currentTheme.colors.text }}>Reps:</Text>
                <TextInput
                  value={set.reps.toString()}
                  style={[styles.input, { color: currentTheme.colors.text }]}
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
                                  ? { ...s, reps: updatedReps }
                                  : s
                              ),
                            }
                          : exercise
                      )
                    );
                  }}
                />
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: currentTheme.colors.text }}>Weight:</Text>
                <TextInput
                  value={set.weight.toString()}
                  style={[styles.input, { color: currentTheme.colors.text }]}
                  keyboardType="numeric"
                  onChangeText={text => {
                    const updatedWeight = Number(text) || 0;
                    setWorkoutExercises(prev =>
                      prev.map(exercise =>
                        exercise.id === item.id
                          ? {
                              ...exercise,
                              sets: exercise.sets.map(s =>
                                s.id === set.id
                                  ? { ...s, weight: updatedWeight }
                                  : s
                              ),
                            }
                          : exercise
                      )
                    );
                  }}
                />
              </View>
              <View style={styles.setControls}>
                <TouchableOpacity
                  style={styles.markAsDoneBtn}
                  onPress={() => toggleColor(set.id, index)}>
                  <Text style={{ fontSize: 20, color: '#fff' }}>✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.addSet,
          { backgroundColor: currentTheme.colors.primary },
        ]}
        onPress={() =>
          setWorkoutExercises(prev =>
            prev.map(exercise =>
              exercise.id === item.id
                ? {
                    ...exercise,
                    sets: [
                      ...exercise.sets,
                      { id: cuid(), reps: 0, weight: 0 },
                    ],
                  }
                : exercise
            )
          )
        }>
        <Text
          style={[
            styles.addSetTxt,
            { color: currentTheme.colors.notification },
          ]}>
          +
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 5,
          color: currentTheme.colors.text,
        }}>
        Add set
      </Text>
    </View>
  );
};

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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetTxt: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
  },
  sets: {
    fontSize: 18,
  },
  setsContainer: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
  setControls: {
    flexDirection: 'row',
    gap: 5,
  },
  markAsDoneBtn: {
    backgroundColor: '#4ca65d',
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KAddedExercisesList;
