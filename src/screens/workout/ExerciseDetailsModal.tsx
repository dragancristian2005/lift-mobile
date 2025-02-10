import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ExerciseDetailsModalProps } from '../../types/navigation/WorkoutStack.types';
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const ExerciseDetailsModal: React.FC<ExerciseDetailsModalProps> = ({
  route,
}) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const { name, image, difficulty, demonstrationGif, description, type } =
    route.params;

  const [loading, setLoading] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>
        {name}
      </Text>
      <View
        style={{
          width: '100%',
          gap: 5,
        }}>
        <Text style={[styles.info, { color: currentTheme.colors.text }]}>
          Difficulty: {difficulty}
        </Text>
        <Text style={[styles.info, { color: currentTheme.colors.text }]}>
          Type: {type}
        </Text>
      </View>
      <Image
        source={{ uri: image }}
        style={{ width: '100%', aspectRatio: 3 / 2, borderRadius: 8 }}
        resizeMode="cover"
      />
      <Text style={[styles.info, { color: currentTheme.colors.text }]}>
        {description}
      </Text>
      {loading && <ActivityIndicator size="large" color="#2e1aa9" />}
      <Image
        source={{ uri: demonstrationGif }}
        style={{
          width: '100%',
          aspectRatio: 5 / 4,
          borderRadius: 8,
          marginBottom: 25,
        }}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
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
  },
});

export default ExerciseDetailsModal;
