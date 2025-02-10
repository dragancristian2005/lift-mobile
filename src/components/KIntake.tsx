import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useMemo, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import { useUserInfo } from '../hooks/api/useUserInfo';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KIntake = () => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;
  const { data, isError, isPending } = useUserInfo();
  const [option, setOption] = useState<'lose' | 'maintain' | 'gain'>(
    'maintain'
  );

  const calculateTDEE = (bmr: number) => bmr * 1.55;

  const calculateCalories = (
    tdee: number,
    goal: 'maintain' | 'gain' | 'lose'
  ) => {
    const calorieAdjustment = 500;
    if (goal === 'gain') return tdee + calorieAdjustment;
    if (goal === 'lose') return tdee - calorieAdjustment;
    return tdee;
  };

  const calculateMacros = (
    calories: number,
    goal: 'maintain' | 'gain' | 'lose'
  ) => {
    let proteinRatio;
    let carbRatio;
    let fatRatio;

    if (goal === 'gain') {
      proteinRatio = 0.3;
      carbRatio = 0.45;
      fatRatio = 0.25;
    } else if (goal === 'lose') {
      proteinRatio = 0.4;
      carbRatio = 0.35;
      fatRatio = 0.25;
    } else {
      proteinRatio = 0.26;
      carbRatio = 0.48;
      fatRatio = 0.3;
    }

    const proteinGrams = (calories * proteinRatio) / 4;
    const carbGrams = (calories * carbRatio) / 4;
    const fatGrams = (calories * fatRatio) / 9;

    return {
      proteinGrams: Math.round(proteinGrams),
      carbGrams: Math.round(carbGrams),
      fatGrams: Math.round(fatGrams),
    };
  };

  const calorieIntake = useMemo(() => {
    if (data) {
      const calculateBMR = (weight: number, height: number) =>
        468 + 11.3 * weight + 3.95 * height;
      return calculateCalories(
        calculateTDEE(calculateBMR(data.weight, data.height)),
        option
      );
    }
    return undefined;
  }, [data, option]);

  const macros = useMemo(() => {
    if (calorieIntake) return calculateMacros(calorieIntake, option);
    return undefined;
  }, [calorieIntake, option]);

  return isError ? (
    <Text style={{ color: currentTheme.colors.text }}>
      There was an error fetching user data.
    </Text>
  ) : isPending ? (
    <ActivityIndicator color={currentTheme.colors.primary} />
  ) : (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.info}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Height
          </Text>
          <Text
            style={[styles.miniTitle, { color: currentTheme.colors.border }]}>
            {data.height}cm
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Weight
          </Text>
          <Text
            style={[styles.miniTitle, { color: currentTheme.colors.border }]}>
            {data.weight}kg
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
            Body Fat
          </Text>
          <Text
            style={[styles.miniTitle, { color: currentTheme.colors.border }]}>
            {data.bodyFat}%
          </Text>
        </View>
      </View>
      <View style={styles.nutritionContainer}>
        <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
          Goal: {option.charAt(0).toUpperCase() + option.slice(1)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => setOption('lose')}
            style={[
              styles.selectBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}>
            <Text
              style={[
                styles.miniTitle,
                isDarkTheme
                  ? { color: currentTheme.colors.text }
                  : { color: currentTheme.colors.notification },
              ]}>
              Lose
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOption('maintain')}
            style={[
              styles.selectBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}>
            <Text
              style={[
                styles.miniTitle,
                isDarkTheme
                  ? { color: currentTheme.colors.text }
                  : { color: currentTheme.colors.notification },
              ]}>
              Maintain
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOption('gain')}
            style={[
              styles.selectBtn,
              { backgroundColor: currentTheme.colors.primary },
            ]}>
            <Text
              style={[
                styles.miniTitle,
                isDarkTheme
                  ? { color: currentTheme.colors.text }
                  : { color: currentTheme.colors.notification },
              ]}>
              Gain
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>
          Calorie Intake: {calorieIntake}
        </Text>
        <View style={styles.macros}>
          {macros && (
            <PieChart
              widthAndHeight={300}
              series={[
                { value: macros.carbGrams, color: '#2e1aa9' },
                { value: macros.fatGrams, color: '#c1b5ff' },
                { value: macros.proteinGrams, color: '#7c6aff' },
              ]}
              cover={{ radius: 0.7, color: currentTheme.colors.background }}
            />
          )}
          <View
            style={{
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <View style={styles.macrosContainer}>
              <View
                style={{
                  backgroundColor: '#7c6aff',
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                }}
              />
              <Text
                style={[styles.miniTitle, { color: currentTheme.colors.text }]}>
                Protein: {macros?.proteinGrams}g
              </Text>
            </View>
            <View style={styles.macrosContainer}>
              <View
                style={{
                  backgroundColor: '#2e1aa9',
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                }}
              />
              <Text
                style={[styles.miniTitle, { color: currentTheme.colors.text }]}>
                Carbs: {macros?.carbGrams}g
              </Text>
            </View>
            <View style={styles.macrosContainer}>
              <View
                style={{
                  backgroundColor: '#c1b5ff',
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                }}
              />
              <Text
                style={[styles.miniTitle, { color: currentTheme.colors.text }]}>
                Fats: {macros?.fatGrams}g
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  info: {
    alignItems: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 22,
  },
  miniTitle: {
    fontSize: 18,
  },
  nutritionContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
    gap: 12,
    paddingVertical: 10,
  },
  selectBtn: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  macros: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 100,
    gap: 10,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KIntake;
