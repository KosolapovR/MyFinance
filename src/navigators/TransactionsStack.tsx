import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransactionsScreen, SingleTransactionScreen} from 'screens';

export type TransactionsStackParamList = {
  TransactionsScreen: undefined;
  SingleTransactionScreen: undefined;
};
const Stack = createStackNavigator<TransactionsStackParamList>();

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
          headerStyle: {backgroundColor: 'red'},
          headerTitle: 'Транзакция',
        }}
      />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
