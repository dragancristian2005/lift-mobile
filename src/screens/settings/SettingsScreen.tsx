import {
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
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '../../contexts/theme/theme.context';
import { KContainer } from '../../components';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { useAuth } from '../../contexts/auth/auth.context';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import { UserInfo } from '../../types/user/UserInfo.types';
import { useSetUserInfo } from '../../hooks/api/setUserInfo';
import DarkTheme from '../../theme/DarkTheme';
import LightTheme from '../../theme/LightTheme';

const SettingsScreen = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  const [modifiedUserInfo, setModifiedUserInfo] = useState<UserInfo>({
    weight: '',
    bodyFat: '',
    goalWeight: '',
    goalBodyFat: '',
  });

  const { signOut } = useAuth();
  const mutation = useSetUserInfo();
  const queryClient = useQueryClient();

  const toggleSwitch = async () => setIsDarkTheme();

  const { data, isPending, isError } = useUserInfo();

  const prepareUserInfoForMutation = (userInfo: UserInfo) => ({
    weight: userInfo.weight === '' ? undefined : Number(userInfo.weight),
    bodyFat: userInfo.bodyFat === '' ? undefined : Number(userInfo.bodyFat),
    goalWeight:
      userInfo.goalWeight === '' ? undefined : Number(userInfo.goalWeight),
    goalBodyFat:
      userInfo.goalBodyFat === '' ? undefined : Number(userInfo.goalBodyFat),
  });

  const handleSave = async () => {
    const numericUserInfo = prepareUserInfoForMutation(modifiedUserInfo);
    mutation.mutate(numericUserInfo, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user-info'] });
      },
    });
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
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            Settings
          </Text>
          <ImagePickerComponent />
          <Text style={[styles.greeting, { color: currentTheme.colors.text }]}>
            Hello, {data?.username}
          </Text>
          <View style={styles.options}>
            <View
              style={[
                styles.optionBtn,
                { borderColor: currentTheme.colors.primary },
              ]}>
              <Text
                style={[
                  styles.optionBtnTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Theme
              </Text>
              <Switch
                value={isDarkTheme}
                onValueChange={toggleSwitch}
                thumbColor={
                  isDarkTheme ? currentTheme.colors.primary : '#f4f3f4'
                }
                trackColor={{ false: '#767577', true: '#363636' }}
              />
            </View>
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.userInfoTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Weight
              </Text>
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
                  style={[
                    styles.input,
                    {
                      color: currentTheme.colors.text,
                      backgroundColor: currentTheme.colors.card,
                    },
                  ]}
                  onBlur={handleSave}
                />
                <Text
                  style={[
                    styles.unitText,
                    { color: currentTheme.colors.text },
                  ]}>
                  kg
                </Text>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.userInfoTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Body Fat
              </Text>
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
                  style={[
                    styles.input,
                    {
                      color: currentTheme.colors.text,
                      backgroundColor: currentTheme.colors.card,
                    },
                  ]}
                  onBlur={handleSave}
                />
                <Text
                  style={[
                    styles.unitText,
                    { color: currentTheme.colors.text },
                  ]}>
                  %
                </Text>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.userInfoTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Goal Weight
              </Text>
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
                  style={[
                    styles.input,
                    {
                      color: currentTheme.colors.text,
                      backgroundColor: currentTheme.colors.card,
                    },
                  ]}
                  onBlur={handleSave}
                />
                <Text
                  style={[
                    styles.unitText,
                    { color: currentTheme.colors.text },
                  ]}>
                  kg
                </Text>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <Text
                style={[
                  styles.userInfoTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Goal Body Fat
              </Text>
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
                  style={[
                    styles.input,
                    {
                      color: currentTheme.colors.text,
                      backgroundColor: currentTheme.colors.card,
                    },
                  ]}
                  onBlur={handleSave}
                />
                <Text
                  style={[
                    styles.unitText,
                    { color: currentTheme.colors.text },
                  ]}>
                  %
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.optionBtn,
                { borderColor: currentTheme.colors.primary },
              ]}
              onPress={signOut}>
              <Text
                style={[
                  styles.optionBtnTxt,
                  { color: currentTheme.colors.text },
                ]}>
                Log Out
              </Text>
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
    borderBottomWidth: 2,
    marginBottom: 12,
    marginTop: 12,
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
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userInfoTxt: {
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default SettingsScreen;
