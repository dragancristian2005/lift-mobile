import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMemo } from 'react';
import { KContainer } from '../../components';
import KStreakDots from '../../components/KStreakDots';
import { useWeekStreak } from '../../hooks/api/useWeekStreak';

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
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.title}>Streak</Text>
        {isError ? (
          <Text>There was an error fetching this week&#39;s streak</Text>
        ) : isPending ? (
          <ActivityIndicator color="#2e1aa9" />
        ) : (
          <View>
            <KStreakDots streakData={data} />
            <Text style={styles.streakTxt}>
              You&#39;re on a{' '}
              <Text style={{ color: '#2e1aa9', fontWeight: 'bold' }}>
                {streakCount}
              </Text>{' '}
              day&#39;s streak! Keep it going
            </Text>
          </View>
        )}
        <View style={styles.goalsContainer}>
          <Text style={styles.subtitle}>Goals</Text>
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
  streakTxt: {
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    marginTop: 15,
  },
  goalsContainer: {
    marginTop: 25,
  },
});

export default StreakScreen;
