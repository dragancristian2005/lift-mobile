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
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const StreakScreen = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

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
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          Streak
        </Text>
        {isError ? (
          <Text>There was an error fetching this week&#39;s streak</Text>
        ) : isPending ? (
          <ActivityIndicator color={currentTheme.colors.primary} />
        ) : (
          <KStreak data={data} streakCount={streakCount} />
        )}
        <View style={styles.goalsContainer}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Goals
          </Text>
          <KGoals />
        </View>
        <View style={styles.goalsContainer}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Recommended Calorie Intake
          </Text>
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
