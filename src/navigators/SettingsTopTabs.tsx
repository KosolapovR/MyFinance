import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AnalyticsScreen, SettingsScreen} from 'screens';

const Tab = createMaterialTopTabNavigator();

export const SettingsTopTabs = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen
          name="SafetyScreen"
          component={SettingsScreen}
          options={{tabBarLabel: 'Safety'}}
        />
        <Tab.Screen
          name="AnalyticsScreen"
          component={AnalyticsScreen}
          options={{tabBarLabel: 'Analytics'}}
        />
      </Tab.Navigator>
    </View>
  );
};
