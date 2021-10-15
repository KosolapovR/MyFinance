import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import Scroller from 'components/Scroller';
import {useAppDispatch, useAppSelector} from 'hooks/index';
import {setSelectedCurrency} from 'features/currency/currencySlice';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SelectCurrencyScreen'
>;

const Container = styled.View`
  padding: 14px;
  height: 100%;
  background-color: white;
`;

function SelectCurrencyScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(state => state.currency.items);

  return currencies ? (
    <Container>
      <Scroller
        items={currencies.map((c, index) => ({
          id: (c.currency_id || index).toString(),
          label: c.currency,
          actions: {
            onPress: () => {
              dispatch(setSelectedCurrency(c));
              navigation.navigate('SingleTransactionScreen');
            },
          },
          leftText: c.alphabetic_code || undefined,
        }))}
      />
    </Container>
  ) : (
    <Text>Loading</Text>
  );
}

export default SelectCurrencyScreen;
