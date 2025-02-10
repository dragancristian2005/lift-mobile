import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { KContainer } from '../../components';
import { MainStackParamList } from '../../types/navigation/MainStack.types';
import { FrontMusclesSvg } from '../../components/svgs/FrontMusclesSvg';
import { BackMusclesSvg } from '../../components/svgs/BackMusclesSvg';
import { useWeeklyProgress } from '../../hooks/api/useWeeklyProgress';
import { useLatestWorkout } from '../../hooks/api/useLatestWorkout';
import { useTheme } from '../../contexts/theme/theme.context';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const HomeScreen = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const { width } = useWindowDimensions();
  const svgWidth = (width - 16) * 0.4;
  const svgHeight = (svgWidth * 648) / 432;

  const weeklyProgress = useWeeklyProgress();
  const { data, isPending, isError } = useLatestWorkout();

  const latestWorkoutDate =
    data?.date && format(new Date(data.date), 'EEEE, dd MMM yyyy');

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <KContainer>
      <View style={styles.container}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          Home
        </Text>
        <View style={styles.svgContainer}>
          <ImageBackground
            source={require('../../../photos/GymBackground.png')}
            style={styles.backgroundImg}>
            {weeklyProgress.isError ? (
              <Text>{weeklyProgress.error.message}</Text>
            ) : (
              <>
                {weeklyProgress.isPending ? (
                  <ActivityIndicator color="#2e1aa9" />
                ) : (
                  <FrontMusclesSvg
                    height={svgHeight}
                    width={svgWidth}
                    muscles={weeklyProgress.data}
                  />
                )}
                {weeklyProgress.isPending ? (
                  <ActivityIndicator color="#2e1aa9" />
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
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateWorkoutScreen')}
          style={[
            styles.newWorkoutBtn,
            { backgroundColor: currentTheme.colors.card },
          ]}>
          <View
            style={[
              styles.newWorkoutContainer,
              { backgroundColor: currentTheme.colors.primary },
            ]}>
            <Text
              style={[
                styles.newWorkoutBtnSymbol,
                { color: currentTheme.colors.background },
              ]}>
              +
            </Text>
          </View>
          <Text style={{ color: currentTheme.colors.text }}>
            Create new workout
          </Text>
        </TouchableOpacity>
        {isError ? (
          <Text style={{ color: currentTheme.colors.text }}>
            There was an error fetching latest workout.
          </Text>
        ) : isPending ? (
          <ActivityIndicator color={currentTheme.colors.primary} />
        ) : data === '' ? (
          <Text style={{ color: currentTheme.colors.text, fontSize: 24 }}>
            You don&#39;t have a latest workout.
          </Text>
        ) : (
          <View
            style={[
              styles.latestWorkoutContainer,
              { backgroundColor: currentTheme.colors.card },
            ]}>
            <Text style={{ fontSize: 24, color: currentTheme.colors.text }}>
              Latest Workout
            </Text>
            <View style={styles.latestWorkoutInfo}>
              <Text style={{ fontSize: 20, color: currentTheme.colors.text }}>
                {data.name}
              </Text>
              <View style={styles.outerMarkContainer}>
                <View
                  style={[
                    styles.innerMarkContainer,
                    { backgroundColor: currentTheme.colors.card },
                  ]}>
                  <Text style={{ fontSize: 30, color: 'green' }}>✓</Text>
                </View>
              </View>
              <Text style={{ fontSize: 18, color: currentTheme.colors.text }}>
                {latestWorkoutDate}
              </Text>
            </View>
          </View>
        )}
      </View>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 32,
  },
  newWorkoutBtn: {
    width: '100%',
    height: '12%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  newWorkoutContainer: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newWorkoutBtnSymbol: {
    fontSize: 34,
    lineHeight: 36,
  },
  svgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  backgroundImg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  latestWorkoutContainer: {
    width: '100%',
    height: '25%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  latestWorkoutInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  outerMarkContainer: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerMarkContainer: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
