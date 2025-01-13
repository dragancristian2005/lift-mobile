import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '../types';
import {
  HomeScreen,
  LiftScreen,
  SettingsScreen,
  StreakScreen,
} from '../../screens';

const TabNavigator = createBottomTabNavigator<TabNavigatorParamList>();

export const Tabs = () => (
  <TabNavigator.Navigator>
    <TabNavigator.Screen name="HomeScreen" component={HomeScreen} />
    <TabNavigator.Screen name="LiftScreen" component={LiftScreen} />
    <TabNavigator.Screen name="StreakScreen" component={StreakScreen} />
    <TabNavigator.Screen name="SettingsScreen" component={SettingsScreen} />
  </TabNavigator.Navigator>
);
