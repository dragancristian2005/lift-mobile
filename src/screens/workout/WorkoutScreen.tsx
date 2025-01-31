import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KContainer } from '../../components';
import { WorkoutScreenProps } from '../../types/workout/workout.types';

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ route }) => {
  const { id, name } = route.params;

  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={styles.workoutName}>{name}</Text>
        <Text>{id}</Text>
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  workoutName: {
    fontSize: 32,
    marginVertical: 25,
  },
});

export default WorkoutScreen;
