import React from 'react';
import {
  TransactionsScreen,
  SingleTransactionScreen,
  SingleCategoryScreen,
} from 'screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type TransactionsStackParamList = {
  TransactionsScreen: undefined;
  SingleTransactionScreen: undefined;
  SingleCategoryScreen: {categoryId: string};
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
      <Stack.Screen
        name="SingleCategoryScreen"
        component={SingleCategoryScreen}
        options={({
          route: {
            params: {categoryId},
          },
        }) => ({
          headerTitle: categoryId
            ? 'Редактировать категорию'
            : 'Добавить категорию',
        })}
        initialParams={{categoryId: ''}}
      />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
