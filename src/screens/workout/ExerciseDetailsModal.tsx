import React from 'react';
import { View, Text } from 'react-native';
import { ExerciseDetailsModalProps } from '../../types/navigation/WorkoutStack.types';

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({
  route,
}) => {
  const { name } = route.params;

  return (
    <View>
      <Text>Exercise Details for {name}</Text>
    </View>
  );
};

export default ExerciseDetailsModal;
