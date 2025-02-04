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
import { NavigationProp } from '@react-navigation/native';
import KExercise from './KExercise';
import { MainStackParamList } from '../types/navigation/MainStack.types';
import { AddedExercise, Exercise } from '../types/exercise/Exercise.types';

interface ExercisesListProps {
  allExercises: Exercise[];
  navigation: NavigationProp<MainStackParamList>;
  workoutExercises: AddedExercise[];
  setWorkoutExercises: Dispatch<SetStateAction<AddedExercise[]>>;
  loadMoreWorkouts: () => void;
}

const ExercisesList = ({
  allExercises,
  navigation,
  workoutExercises,
  setWorkoutExercises,
  loadMoreWorkouts,
}: ExercisesListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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
          style={styles.searchBar}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setSearchQuery('');
          }}
          style={styles.clearBtn}>
          <Text style={styles.clearBtnTxt}>Clear Search</Text>
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
    backgroundColor: '#2e1aa9',
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
    backgroundColor: '#fff',
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
    color: '#fff',
    fontWeight: '500',
  },
});

export default ExercisesList;
