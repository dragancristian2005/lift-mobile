import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KWorkoutControlsProps } from '../types/workout/workout.types';
import { useTheme } from '../contexts/theme/theme.context';
import DarkTheme from '../theme/DarkTheme';
import LightTheme from '../theme/LightTheme';

export const KWorkoutControls = ({
  search,
  setSearch,
}: KWorkoutControlsProps) => {
  const { isDarkTheme } = useTheme();
  const currentTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchBar,
          {
            backgroundColor: currentTheme.colors.card,
            color: currentTheme.colors.text,
          },
        ]}
        placeholder="Search"
        placeholderTextColor={currentTheme.colors.text}
      />
      <TouchableOpacity
        style={[
          styles.clearBtn,
          { backgroundColor: currentTheme.colors.primary },
        ]}>
        <Text
          style={[
            styles.clearBtnTxt,
            { color: currentTheme.colors.notification },
          ]}>
          Clear All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '65%',
    height: '100%',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 15,
    height: 40,
  },
  clearBtn: {
    width: '30%',
    height: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnTxt: {
    fontSize: 15,
  },
});
