import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="Dashboard"
          // tabBar={props => <CustomBottomTabBar {...props} />}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'HomeTabs',
              // tabBarIcon: ({isFocused}) => (
              //   <ExchangeIcon
              //     height={26}
              //     width={26}
              //     style={{opacity: isFocused ? 1 : 0.5}}
              //   />
              // ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
