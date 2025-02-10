import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { KContainer } from '../../components';
import { MainStackParamList } from '../../types/navigation/MainStack.types';
import KWorkout from '../../components/KWorkout';
import { KWorkoutControls } from '../../components/KWorkoutControls';
import { useWorkouts } from '../../hooks/api/useWorkouts';
import { useAuth } from '../../contexts/auth/auth.context';

const LiftScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const [search, setSearch] = useState('');
  const { signIn } = useAuth();

  const workouts = useWorkouts();

  const loadMoreWorkouts = () => {
    if (workouts.hasNextPage && !workouts.isFetchingNextPage) {
      workouts.fetchNextPage();
    }
  };

  const allWorkouts = useMemo(
    () => workouts.data?.pages.flatMap(page => page) || [],
    [workouts.data?.pages]
  );

  const filteredWorkouts = useMemo(
    () =>
      allWorkouts.filter(workout =>
        workout.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allWorkouts, search]
  );

  useEffect(() => {
    workouts.refetch();
  }, [signIn, workouts]);

  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Workouts</Text>
        <KWorkoutControls search={search} setSearch={setSearch} />
        {filteredWorkouts.length === 0 ? (
          <Text>No workouts available.</Text>
        ) : (
          <FlatList
            data={filteredWorkouts}
            renderItem={({ item, index }) => (
              <View
                style={[
                  index === filteredWorkouts.length - 1
                    ? { marginBottom: 75 }
                    : {},
                  { marginHorizontal: 3 },
                ]}>
                <KWorkout navigation={navigation} item={item} />
              </View>
            )}
            keyExtractor={item => item.id}
            style={{ width: '95%' }}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreWorkouts}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  workouts: {
    width: '100%',
  },
});

export default LiftScreen;
