import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import Scroller from 'components/Scroller';
import {useCurrency} from 'hooks/index';
import {Text} from 'react-native';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SelectCurrencyScreen'
>;

function SelectCurrencyScreen({}: Props) {
  const {currencies} = useCurrency();

  return currencies ? (
    <Scroller
      items={currencies.map((c, index) => ({
        id: (c.currency_id || index).toString(),
        label: c.currency,
        actions: {
          onPress: () => {},
        },
      }))}
    />
  ) : (
    <Text>Loading</Text>
  );
}

export default SelectCurrencyScreen;
