import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KContainer } from '../../components';
import { MainStackParamList } from '../../types/navigation/MainStack.types';
import { FrontMusclesSvg } from '../../components/svgs/FrontMusclesSvg';
import { BackMusclesSvg } from '../../components/svgs/BackMusclesSvg';
import { useWeeklyProgress } from '../../hooks/api/useWeeklyProgress';

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const svgWidth = (width - 16) * 0.4;
  const svgHeight = (svgWidth * 648) / 432;

  const weeklyProgress = useWeeklyProgress();

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Button
          title="Create Workout"
          onPress={() => navigation.navigate('CreateWorkoutScreen')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <ImageBackground
            source={require('../../../photos/GymBackground.png')}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {weeklyProgress.isError ? (
              <Text>{weeklyProgress.error.message}</Text>
            ) : (
              <>
                {weeklyProgress.isPending ? (
                  <ActivityIndicator />
                ) : (
                  <FrontMusclesSvg
                    height={svgHeight}
                    width={svgWidth}
                    muscles={weeklyProgress.data}
                  />
                )}
                {weeklyProgress.isPending ? (
                  <ActivityIndicator />
                ) : (
                  <BackMusclesSvg
                    height={svgHeight}
                    width={svgWidth}
                    muscles={weeklyProgress.data}
                  />
                )}
              </>
            )}
          </ImageBackground>
        </View>
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
});

export default HomeScreen;
