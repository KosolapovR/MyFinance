import React from 'react';
import {TransactionsScreen, SingleTransactionScreen} from 'screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type TransactionsStackParamList = {
  TransactionsScreen: undefined;
  SingleTransactionScreen: undefined;
};
const Stack = createNativeStackNavigator<TransactionsStackParamList>();

const TransactionsStack = () => {
  return (
    <Stack.Navigator initialRouteName="TransactionsScreen">
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleTransactionScreen"
        component={SingleTransactionScreen}
        options={{
          headerTitle: 'Транзакция',
        }}
      />
    </Stack.Navigator>
  );
};

export default TransactionsStack;