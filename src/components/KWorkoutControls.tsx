import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KWorkoutControlsProps } from '../types/workout/workout.types';

export const KWorkoutControls = ({
  search,
  setSearch,
}: KWorkoutControlsProps) => (
  <View style={styles.container}>
    <TextInput
      value={search}
      onChangeText={setSearch}
      style={styles.searchBar}
      placeholder="Search"
    />
    <TouchableOpacity style={styles.clearBtn}>
      <Text style={styles.clearBtnTxt}>Clear All</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    width: '65%',
    height: '100%',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
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
    backgroundColor: '#2e1aa9',
    height: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnTxt: {
    color: '#fff',
    fontSize: 15,
  },
});
