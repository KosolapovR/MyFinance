import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import InvestmentsScreen from 'screens/InvestmentsScreen';
import CreditsScreen from 'screens/CreditsScreen';
import TransactionsScreen from 'screens/TransactionsScreen';
import SettingsScreen from 'screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator initialRouteName="Dashboard">
          <Tab.Screen
            name="AnalyticsScreen"
            component={AnalyticsScreen}
            options={{
              tabBarLabel: 'Analytics',
              // tabBarIcon: ({isFocused}) => (
              //   <ExchangeIcon
              //     height={26}
              //     width={26}
              //     style={{opacity: isFocused ? 1 : 0.5}}
              //   />
              // ),
            }}
          />
          <Tab.Screen
            name="InvestmentsScreen"
            component={InvestmentsScreen}
            options={{
              tabBarLabel: 'Investments',
            }}
          />
          <Tab.Screen
            name="CreditsScreen"
            component={CreditsScreen}
            options={{
              tabBarLabel: 'Credits',
            }}
          />
          <Tab.Screen
            name="TransactionsScreen"
            component={TransactionsScreen}
            options={{
              tabBarLabel: 'Transactions',
            }}
          />
          <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
