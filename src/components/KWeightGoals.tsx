import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { UserInfo } from '../types/user/UserInfo.types';

const KWeightGoals = ({
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
  const weight = Number(savedUserInfo.weight);
  const goalWeight = Number(savedUserInfo.goalWeight);

  const safeProgress =
    weight > 0 && goalWeight > 0
      ? Math.min(weight, goalWeight) / Math.max(weight, goalWeight)
      : 0;

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.label}>Goal Weight</Text>
      </View>
      <View style={styles.weightContainer}>
        <View style={styles.unitContainer}>
          <TextInput
            value={modifiedUserInfo.weight}
            onChangeText={text =>
              setModifiedUserInfo(prev => ({
                ...prev,
                weight: text,
              }))
            }
            keyboardType="numeric"
            style={styles.input}
            onBlur={handleSave}
          />
          <Text style={{ marginHorizontal: 5 }}>kg</Text>
        </View>
        {safeProgress > 0 && (
          <Progress.Bar
            progress={safeProgress}
            width={225}
            height={15}
            color="#2e1aa9"
          />
        )}
        <View style={styles.unitContainer}>
          <TextInput
            value={modifiedUserInfo.goalWeight}
            onChangeText={text =>
              setModifiedUserInfo(prev => ({
                ...prev,
                goalWeight: text,
              }))
            }
            keyboardType="numeric"
            style={styles.input}
            onBlur={handleSave}
          />
          <Text style={{ marginHorizontal: 5 }}>%</Text>
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
    backgroundColor: '#f4f3f4',
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

export default KWeightGoals;
