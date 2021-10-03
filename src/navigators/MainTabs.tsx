import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {InvestmentsScreen, CreditsScreen, TargetScreen} from 'screens';
import {SettingsTopTabs} from 'navigators/SettingsTopTabs';
import TransactionsStack from 'navigators/TransactionsStack';

export type MainTabsParamList = {
  TargetScreen: undefined;
  InvestmentsScreen: undefined;
  CreditsScreen: undefined;
  TransactionsStack: undefined;
  SettingsTopTabs: undefined;
};

const Tab = createMaterialBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator
          initialRouteName="TransactionsStack"
          barStyle={{height: 54}}>
          <Tab.Screen
            name="InvestmentsScreen"
            component={InvestmentsScreen}
            options={{
              tabBarLabel: 'Investments',
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="briefcase"
                  color={color}
                  style={{opacity: focused ? 1 : 0.5}}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CreditsScreen"
            component={CreditsScreen}
            options={{
              tabBarLabel: 'Credits',
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="credit-card"
                  color={color}
                  style={{opacity: focused ? 1 : 0.5}}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="TransactionsStack"
            component={TransactionsStack}
            options={{
              tabBarLabel: 'Transactions',
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="wallet"
                  color={color}
                  style={{opacity: focused ? 1 : 0.5}}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="TargetScreen"
            component={TargetScreen}
            options={{
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="target"
                  color={color}
                  style={{opacity: focused ? 1 : 0.5}}
                  size={26}
                />
              ),
              tabBarLabel: 'Analytics',
            }}
          />
          <Tab.Screen
            name="SettingsTopTabs"
            component={SettingsTopTabs}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="cog"
                  color={color}
                  style={{opacity: focused ? 1 : 0.5}}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
