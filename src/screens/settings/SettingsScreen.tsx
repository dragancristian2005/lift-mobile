import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { KContainer } from '../../components';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { useAuth } from '../../contexts/auth/auth.context';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import { UserInfo } from '../../types/user/UserInfo.types';
import { useSetUserInfo } from '../../hooks/api/setUserInfo';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modifiedUserInfo, setModifiedUserInfo] = useState<UserInfo>({
    weight: '',
    bodyFat: '',
    goalWeight: '',
    goalBodyFat: '',
  });

  const { signOut } = useAuth();
  const mutation = useSetUserInfo();

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const { data, isPending, isError } = useUserInfo();

  const prepareUserInfoForMutation = (userInfo: UserInfo) => ({
    weight: userInfo.weight === '' ? undefined : Number(userInfo.weight),
    bodyFat: userInfo.bodyFat === '' ? undefined : Number(userInfo.bodyFat),
    goalWeight:
      userInfo.goalWeight === '' ? undefined : Number(userInfo.goalWeight),
    goalBodyFat:
      userInfo.goalBodyFat === '' ? undefined : Number(userInfo.goalBodyFat),
  });

  const handleSave = () => {
    const numericUserInfo = prepareUserInfoForMutation(modifiedUserInfo);
    mutation.mutate(numericUserInfo);
  };

  useEffect(() => {
    if (data) {
      const { weight, bodyFat, goalWeight, goalBodyFat } = data;
      const stringData = {
        weight: weight.toString() ?? '',
        bodyFat: bodyFat.toString() ?? '',
        goalWeight: goalWeight.toString() ?? '',
        goalBodyFat: goalBodyFat.toString() ?? '',
      };
      setModifiedUserInfo(stringData);
    }
  }, [data]);

  return isError ? (
    <Text>Error fetching user info</Text>
  ) : isPending ? (
    <Text>Loading...</Text>
  ) : (
    <KContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Settings</Text>
          <ImagePickerComponent />
          <Text style={styles.greeting}>Hello, {data?.username}</Text>
          <Button title="save" onPress={handleSave} />
          <View style={styles.options}>
            <View style={styles.optionBtn}>
              <Text style={styles.optionBtnTxt}>Theme</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleSwitch}
                thumbColor={isDarkMode ? '#2e1aa9' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#363636' }}
              />
            </View>
            <View style={styles.optionBtn}>
              <Text style={styles.optionBtnTxt}>Weight</Text>
              <View style={styles.inputContainer}>
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
                />
                <Text style={styles.unitText}>kg</Text>
              </View>
            </View>
            <View style={styles.optionBtn}>
              <Text style={styles.optionBtnTxt}>Body Fat</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={modifiedUserInfo.bodyFat}
                  onChangeText={text =>
                    setModifiedUserInfo(prev => ({
                      ...prev,
                      bodyFat: text,
                    }))
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Text style={styles.unitText}>%</Text>
              </View>
            </View>
            <View style={styles.optionBtn}>
              <Text style={styles.optionBtnTxt}>Goal Weight</Text>
              <View style={styles.inputContainer}>
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
                />
                <Text style={styles.unitText}>kg</Text>
              </View>
            </View>
            <View style={styles.optionBtn}>
              <Text style={styles.optionBtnTxt}>Goal Body Fat</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={modifiedUserInfo.goalBodyFat}
                  onChangeText={text =>
                    setModifiedUserInfo(prev => ({
                      ...prev,
                      goalBodyFat: text,
                    }))
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Text style={styles.unitText}>%</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.optionBtn} onPress={signOut}>
              <Text style={styles.optionBtnTxt}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </KContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
  },
  options: {
    width: '95%',
    marginTop: 35,
  },
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderColor: 'rgba(46,26,169,0.5)',
  },
  optionBtnTxt: {
    fontSize: 22,
    paddingVertical: 10,
  },
  inputContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: 45,
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
  unitText: {
    marginLeft: 5,
    fontSize: 18,
  },
});

export default SettingsScreen;
