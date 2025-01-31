import { View, Text, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();

  const icon: Record<string, (props: any) => JSX.Element> = {
    Home: (props: any) => (
      <Feather size={24} name="home" color="#2e1aa9" {...props} />
    ),
    Lift: (props: any) => (
      <MaterialCommunityIcons
        name="dumbbell"
        size={24}
        color="#2e1aa9"
        {...props}
      />
    ),
    Streak: (props: any) => (
      <Feather size={24} name="calendar" color="#2e1aa9" {...props} />
    ),
    Settings: (props: any) => (
      <Feather size={24} name="settings" color="#2e1aa9" {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const IconComponent =
          icon[route.name] ||
          ((props: any) => (
            <Feather size={24} name="help-circle" color="#2e1aa9" {...props} />
          ));

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}>
            <IconComponent color={isFocused ? '#2e1aa9' : '#222'} />
            <Text style={{ color: isFocused ? '#2e1aa9' : '#222' }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
