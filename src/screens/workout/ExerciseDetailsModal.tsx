import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { ExerciseDetailsModalProps } from '../../types/navigation/WorkoutStack.types';

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({
  route,
}) => {
  const { name, image, difficulty, demonstrationGif, description, type } =
    route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View
        style={{
          width: '100%',
          gap: 5,
        }}>
        <Text style={styles.info}>Difficulty: {difficulty}</Text>
        <Text style={styles.info}>Type: {type}</Text>
      </View>
      <Image
        source={{ uri: image }}
        style={{ width: '100%', aspectRatio: 3 / 2, borderRadius: 8 }}
        resizeMode="cover"
      />
      <Text style={styles.info}>{description}</Text>
      <Image
        source={{ uri: demonstrationGif }}
        style={{
          width: '100%',
          aspectRatio: 5 / 4,
          borderRadius: 8,
          marginBottom: 25,
        }}
        resizeMode="cover"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 25,
  },
  title: {
    fontSize: 24,
  },
  info: {
    fontSize: 16,
    color: '#444',
  },
});

export default ExerciseDetailsModal;
