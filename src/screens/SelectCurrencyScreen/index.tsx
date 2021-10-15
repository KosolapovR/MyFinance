import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import Scroller from 'components/Scroller';
import {useCurrency} from 'hooks/index';
import {Text} from 'react-native';
import styled from 'styled-components/native';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SelectCurrencyScreen'
>;

const Container = styled.View`
  padding: 14px;
  height: 100%;
  background-color: white;
`;

function SelectCurrencyScreen({}: Props) {
  const {currencies} = useCurrency();

  return currencies ? (
    <Container>
      <Scroller
        items={currencies.map((c, index) => ({
          id: (c.currency_id || index).toString(),
          label: c.currency,
          actions: {
            onPress: () => {},
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
