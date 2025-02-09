import { StyleSheet, Text, View } from 'react-native';

const KStreakDots = ({
  streakData,
}: {
  streakData: Record<string, boolean>;
}) => (
  <View style={styles.streakContainer}>
    {Object.keys(streakData).map(key => (
      <View key={key} style={{ alignItems: 'center', marginHorizontal: 5 }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: streakData[key] ? '#2e1aa9' : '#dddddd',
          }}
        />
        <Text style={{ marginTop: 8, color: '#444' }}>{key}</Text>
      </View>
    ))}
  </View>
);

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
