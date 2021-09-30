import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInPasswordScreen from 'screens/SignInPasswordScreen';
import SignInPictureScreen from 'screens/SignInPictureScreen';
import SignInFingerScreen from 'screens/SignInFingerScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Stack.Navigator initialRouteName="AuthInitScreen">
          <Stack.Screen
            name="SignInPassword"
            component={SignInPasswordScreen}
          />
          <Stack.Screen
            name="SignInPictureScreen"
            component={SignInPictureScreen}
          />
          <Stack.Screen
            name="SignInFingerScreen"
            component={SignInFingerScreen}
          />
          <Stack.Screen name="AuthInitScreen" component={SignInFingerScreen} />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};
