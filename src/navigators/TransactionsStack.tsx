import React from 'react';
import {
  TransactionsScreen,
  SingleTransactionScreen,
  SingleCategoryScreen,
} from 'screens';
import SelectCategoryScreen from 'screens/SelectCategoryScreen';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SelectCurrencyScreen from 'screens/SelectCurrencyScreen';

export type TransactionsStackParamList = {
  TransactionsScreen: undefined;
  SingleTransactionScreen: undefined;
  SingleCategoryScreen: {categoryId: string};
  SelectCategoryScreen: undefined;
  SelectCurrencyScreen: undefined;
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
      <Stack.Screen
        name="SelectCategoryScreen"
        component={SelectCategoryScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Выбрать категорию',
        }}
      />
      <Stack.Screen
        name="SelectCurrencyScreen"
        component={SelectCurrencyScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: 'Выбрать валюту',
        }}
      />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
