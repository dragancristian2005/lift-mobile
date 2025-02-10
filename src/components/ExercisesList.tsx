import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import KExercise from './KExercise';
import { MainStackParamList } from '../types/navigation/MainStack.types';
import { AddedExercise, Exercise } from '../types/exercise/Exercise.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

interface ExercisesListProps {
  allExercises: Exercise[];
  workoutExercises: AddedExercise[];
  setWorkoutExercises: Dispatch<SetStateAction<AddedExercise[]>>;
  loadMoreWorkouts: () => void;
}

const ExercisesList = ({
  allExercises,
  workoutExercises,
  setWorkoutExercises,
  loadMoreWorkouts,
}: ExercisesListProps) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const filteredExercises = allExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View style={styles.searchControls}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Enter exercise name..."
          placeholderTextColor={currentTheme.colors.text}
          style={[
            styles.searchBar,
            { backgroundColor: currentTheme.colors.card },
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setSearchQuery('');
          }}
          style={[
            styles.clearBtn,
            { backgroundColor: currentTheme.colors.primary },
          ]}>
          <Text
            style={[
              styles.clearBtnTxt,
              { color: currentTheme.colors.notification },
            ]}>
            Clear Search
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ExerciseDetailsModal', {
                name: item.name,
                image: item.image,
                difficulty: item.difficulty,
                demonstrationGif: item.demonstrationGif,
                description: item.description,
                type: item.type,
              })
            }>
            <KExercise
              item={item}
              workoutExercises={workoutExercises}
              setWorkoutExercises={setWorkoutExercises}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreWorkouts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchControls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  clearBtn: {
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    width: '64%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,

    elevation: 3,
  },
  clearBtnTxt: {
    fontWeight: '500',
  },
});

export default ExercisesList;
