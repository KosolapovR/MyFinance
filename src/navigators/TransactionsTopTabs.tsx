import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TransactionsScreen from 'screens/TransactionsScreen';

const Tab = createMaterialTopTabNavigator();

export const TransactionsTopTabs = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen
            name="TransactionsAll"
            component={TransactionsScreen}
            options={{tabBarLabel: 'all'}}
          />
          <Tab.Screen
            name="TransactionsIncome"
            component={TransactionsScreen}
            options={{tabBarLabel: 'income'}}
          />
          <Tab.Screen
            name="TransactionsOutcome"
            component={TransactionsScreen}
            options={{tabBarLabel: 'outcome'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
