import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsParamList } from '../../types/navigation/Tabs.types';
import {
  HomeScreen,
  LiftScreen,
  SettingsScreen,
  StreakScreen,
} from '../../screens';
import { TabBar } from '../../components/TabBar';

const TabNavigator = createBottomTabNavigator<TabsParamList>();

export const Tabs = () => (
  <TabNavigator.Navigator
    screenOptions={{ headerShown: false }}
    tabBar={props => <TabBar {...props} />}>
    <TabNavigator.Screen name="Home" component={HomeScreen} />
    <TabNavigator.Screen name="Lift" component={LiftScreen} />
    <TabNavigator.Screen name="Streak" component={StreakScreen} />
    <TabNavigator.Screen name="Settings" component={SettingsScreen} />
  </TabNavigator.Navigator>
);
