import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { UserInfo } from '../types/user/UserInfo.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

const KBodyFatGoals = ({
  modifiedUserInfo,
  setModifiedUserInfo,
  handleSave,
  savedUserInfo,
}: {
  modifiedUserInfo: UserInfo;
  setModifiedUserInfo: (updateFn: (prev: UserInfo) => UserInfo) => void;
  handleSave: () => void;
  savedUserInfo: UserInfo;
}) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const bodyFat = Number(savedUserInfo.bodyFat);
  const goalBodyFat = Number(savedUserInfo.goalBodyFat);

  const safeProgress =
    bodyFat > 0 && goalBodyFat > 0
      ? Math.min(bodyFat, goalBodyFat) / Math.max(bodyFat, goalBodyFat)
      : 0;

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.headerContainer}>
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>
          Body Fat
        </Text>
        <Text style={[styles.label, { color: currentTheme.colors.text }]}>
          Goal Body Fat
        </Text>
      </View>
      <View style={styles.weightContainer}>
        <View style={styles.unitContainer}>
          <TextInput
            value={modifiedUserInfo.bodyFat}
            onChangeText={text =>
              setModifiedUserInfo(prev => ({
                ...prev,
                bodyFat: text,
              }))
            }
            keyboardType="numeric"
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.colors.card,
                color: currentTheme.colors.text,
              },
            ]}
            onBlur={handleSave}
          />
          <Text
            style={{ marginHorizontal: 5, color: currentTheme.colors.text }}>
            kg
          </Text>
        </View>
        {safeProgress > 0 && (
          <Progress.Bar
            progress={safeProgress}
            width={225}
            height={15}
            color={currentTheme.colors.primary}
          />
        )}
        <View style={styles.unitContainer}>
          <TextInput
            value={modifiedUserInfo.goalBodyFat}
            onChangeText={text =>
              setModifiedUserInfo(prev => ({
                ...prev,
                goalBodyFat: text,
              }))
            }
            keyboardType="numeric"
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.colors.card,
                color: currentTheme.colors.text,
              },
            ]}
            onBlur={handleSave}
          />
          <Text
            style={{ marginHorizontal: 5, color: currentTheme.colors.text }}>
            %
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
    color: '#444',
  },
  weightContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 35,
    height: 30,
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.6,
    elevation: 4,
  },
  unitContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default KBodyFatGoals;
