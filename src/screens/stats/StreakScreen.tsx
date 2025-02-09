import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMemo } from 'react';
import { KContainer } from '../../components';
import { useWeekStreak } from '../../hooks/api/useWeekStreak';
import KStreak from '../../components/KStreak';
import KGoals from '../../components/KGoals';
import KIntake from '../../components/KIntake';

const StreakScreen = () => {
  const { data, isError, isPending } = useWeekStreak();

  const streakCount = useMemo(
    () => data && Object.values(data).filter(streak => streak).length,
    [data]
  );

  return (
    <KContainer>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Streak</Text>
        {isError ? (
          <Text>There was an error fetching this week&#39;s streak</Text>
        ) : isPending ? (
          <ActivityIndicator color="#2e1aa9" />
        ) : (
          <KStreak data={data} streakCount={streakCount} />
        )}
        <View style={styles.goalsContainer}>
          <Text style={styles.subtitle}>Goals</Text>
          <KGoals />
        </View>
        <View style={styles.goalsContainer}>
          <Text style={styles.subtitle}>Recommended Calorie Intake</Text>
          <KIntake />
        </View>
      </ScrollView>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 28,
    marginBottom: 10,
  },
  goalsContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
});

export default StreakScreen;
