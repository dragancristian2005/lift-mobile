import { StyleSheet, Text, View } from 'react-native';
import KStreakDots from './KStreakDots';

const KStreak = ({
  data,
  streakCount,
}: {
  data: Record<string, boolean>;
  streakCount: number;
}) => (
  <View style={{ width: '100%' }}>
    <KStreakDots streakData={data} />
    <Text style={styles.streakTxt}>
      You&#39;re on a{' '}
      <Text style={{ color: '#2e1aa9', fontWeight: 'bold' }}>
        {streakCount}
      </Text>{' '}
      day&#39;s streak! Keep it going
    </Text>
  </View>
);

const styles = StyleSheet.create({
  streakTxt: {
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default KStreak;
