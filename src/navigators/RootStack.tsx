import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainTabs} from './MainTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        <NativeStack.Screen name="Main" component={MainTabs} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
