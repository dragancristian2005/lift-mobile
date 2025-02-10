import { StyleSheet, Text, View } from 'react-native';
import KStreakDots from './KStreakDots';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KStreak = ({
  data,
  streakCount,
}: {
  data: Record<string, boolean>;
  streakCount: number;
}) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <View style={{ width: '100%' }}>
      <KStreakDots streakData={data} />
      <Text style={[styles.streakTxt, { color: currentTheme.colors.text }]}>
        You&#39;re on a{' '}
        <Text
          style={{ color: currentTheme.colors.primary, fontWeight: 'bold' }}>
          {streakCount}
        </Text>{' '}
        day&#39;s streak! Keep it going
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  streakTxt: {
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default KStreak;
