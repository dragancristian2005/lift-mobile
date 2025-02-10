import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KStreakDots = ({
  streakData,
}: {
  streakData: Record<string, boolean>;
}) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <View style={styles.streakContainer}>
      {Object.keys(streakData).map(key => (
        <View key={key} style={{ alignItems: 'center', marginHorizontal: 5 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: streakData[key]
                ? currentTheme.colors.primary
                : currentTheme.colors.notification,
            }}
          />
          <Text style={{ marginTop: 8, color: '#444' }}>{key}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 15,
    height: 50,
  },
});

export default KStreakDots;
