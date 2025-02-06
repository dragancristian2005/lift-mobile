import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import cuid from 'cuid';
import KLineDecoration from './KLineDecoration';
import { WorkoutInfo } from '../types/workout/WorkoutInfo.types';

const KWorkoutInfo = ({ item }: WorkoutInfo) => (
  <View style={styles.container}>
    <Text style={{ fontSize: 20 }}>{item.exercise.name}</Text>
    <Image
      source={{ uri: item.exercise.image }}
      style={{
        width: '95%',
        aspectRatio: 3 / 2,
        borderRadius: 8,
      }}
      resizeMode="cover"
    />
    <View style={styles.exerciseInfoContainer}>
      <KLineDecoration />
      <Text style={styles.exerciseInfoTxt}>
        Difficulty: {item.exercise.difficulty}
      </Text>
      <KLineDecoration />
      <Text style={styles.exerciseInfoTxt}>Type: {item.exercise.type}</Text>
      <KLineDecoration />
      <Text style={styles.exerciseInfoTxt}>
        Description: {item.exercise.description.slice(0, 150)}
        {item.exercise.description.length > 150 ? '...' : ''}
      </Text>
      <KLineDecoration />
      {item.workoutExerciseSet.map(
        (set: { reps: number; weight: number }, index: number) => (
          <View
            key={cuid()}
            style={[
              index % 2 !== 0
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#dddddd' },
              { padding: 8, borderRadius: 8, marginTop: 5 },
            ]}>
            <Text style={styles.exerciseInfoTxt}>
              Set {index + 1}: {set.reps.toString()} x {set.weight.toString()}kg
            </Text>
          </View>
        )
      )}
      <KLineDecoration />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  exerciseInfoContainer: {
    width: '90%',
    paddingVertical: 10,
    gap: 10,
  },
  exerciseInfoTxt: {
    fontSize: 16,
    color: '#555',
  },
});

export default KWorkoutInfo;
