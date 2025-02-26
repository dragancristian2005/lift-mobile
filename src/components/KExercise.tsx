import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AddedExercise, Exercise } from '../types/exercise/Exercise.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

interface KExerciseProps {
  item: Exercise;
  workoutExercises: AddedExercise[];
  setWorkoutExercises: React.Dispatch<React.SetStateAction<AddedExercise[]>>;
}

const KExercise = ({
  item,
  workoutExercises,
  setWorkoutExercises,
}: KExerciseProps) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.colors.card }]}>
      <View style={styles.exerciseInfo}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 90, aspectRatio: 4 / 3, borderRadius: 8 }}
            resizeMode="cover"
          />
          <View style={{ gap: 5 }}>
            <Text
              style={[styles.infoName, { color: currentTheme.colors.text }]}>
              {item.name.length >= 18
                ? `${item.name.slice(0, 15)}...`
                : item.name}
            </Text>
            <Text style={[styles.info, { color: currentTheme.colors.text }]}>
              Difficulty: {item.difficulty}
            </Text>
            <Text style={[styles.info, { color: currentTheme.colors.text }]}>
              Type: {item.type}
            </Text>
          </View>
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            style={[
              styles.addBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}
            onPress={() => {
              if (workoutExercises.some(exercise => exercise.id === item.id)) {
                alert('This exercise is already in your workout!');
              } else {
                setWorkoutExercises(prev => [
                  ...prev,
                  { id: item.id, name: item.name, sets: [] },
                ]);
              }
            }}>
            <Text style={styles.addBtnTxt}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  infoName: {
    fontSize: 18,
  },
  info: {
    fontSize: 14,
    color: '#444',
  },
  addBtn: {
    backgroundColor: '#2e1aa9',
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 40 / 2,
  },
  addBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtnTxt: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default KExercise;
