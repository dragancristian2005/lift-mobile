import { StyleSheet, Text, View } from 'react-native';
import { KContainer } from '../../components';

const StreakScreen = () => (
  <KContainer>
    <View style={styles.container}>
      <Text style={styles.title}>Streak</Text>
    </View>
  </KContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default StreakScreen;
