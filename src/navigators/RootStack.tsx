import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainTabs} from './MainTabs';
import {AuthStack} from './AuthStack';

import {createStackNavigator} from '@react-navigation/stack';
import {navigationTheme} from 'theme/navigationTheme';

const Stack = createStackNavigator();

const RootStack = ({isAuth}: {isAuth?: boolean}) => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuth ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
